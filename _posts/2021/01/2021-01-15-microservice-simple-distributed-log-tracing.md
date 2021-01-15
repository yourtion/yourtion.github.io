---
layout: post
date: 2021-01-15 14:56:06 +0800
slug: microservice-simple-distributed-log-tracing
title: "微服务实现简单的分布式日志追踪"
author: Yourtion
keywords: ["微服务", "分布式日志", "日志追踪", "RequestId"]
description: "通过 MDC 在日志中输出追踪的 ID，然后在 Feign 和 RestTemplate 中将请求 ID 在微服务中传递"
category: "开发笔记"
tags: ["微服务"]
---

{% include JB/setup %}

最近想给项目添加一个简单的分布式请求跟踪功能，从前端发起请求到网关，再从网关调用 SpringCloud 的微服务，这些过程中希望能从日志中看到一个分布式 ID 的链路，通过请求的 ID 可以追踪整一条链路，方便问题的排查。

现成的方案自然是使用 SkyWalking 、 Spring Cloud Sleuth 、Zipkin 之类的组件，但是想到主要的目的记录一个可以一直贯通各个服务的 ID，方便日志查询，也就不想引入太多复杂的组件，最终决定通过 MDC 在日志中输出追踪的 ID，然后在 Feign 和 RestTemplate 中将请求 ID 在微服务中传递。

主要包括几个步骤：

1. 从前端生成请求 ID 并加入请求头带入网关
2. 网关通过 WebFilter 拦截并加入 MDC 中，在 log 中输出
3. 在 Feign 和 RequestTemplate 中将请求 ID 在带到 HTTP 的 Header 中微服务传递
4. 各个微服务同样通过 WebFilter 实现拦截并加入 MDC，在 log 中输出

## MDC

MDC（Mapped Diagnostic Context，映射调试上下文）是 log4j 和 logback 提供的一种方便在多线程条件下记录日志的功能。 MDC 可以看成是一个与当前线程绑定的哈希表，可以往其中添加键值对。

MDC 的关键操作：

- 向 MDC 中设置值：`MDC.put(key, value);`
- 从 MDC 中取值：`MDC.get(key);`
- 将 MDC 中内容打印到日志中：`%X{key}`

## 新增 TraceId 工具类

先新增一个 TraceIdUtils 工具类，用于定义 TRACE_ID 的常量值以及设置及生成 TRACE_ID 的方法，后续代码中都是通过这个估计类进行操作

```java
import org.apache.commons.lang.RandomStringUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.MDC;

public class TraceIdUtils {
    public static final String TRACE_ID = "traceId";
    private static final int MAX_ID_LENGTH = 10;

    /**
     * 生成 traceId
     */
    private static String genTraceId() {
        return RandomStringUtils.randomAlphanumeric(MAX_ID_LENGTH);
    }

    /**
     * 设置 traceId
     */
    public static void setTraceId(String traceId) {
        // 如果参数为空，则生成新 ID
        traceId = StringUtils.isBlank(traceId) ? genTraceId() : traceId;
        // 将 traceId 放到 MDC 中
        MDC.put(TRACE_ID, StringUtils.substring(traceId, -MAX_ID_LENGTH));
    }

    /**
     * 获取 traceId
     */
    public static String getTraceId() {
        // 获取
        String traceId = MDC.get(TRACE_ID);
        // 如果 traceId 为空，则生成新 ID
        return StringUtils.isBlank(traceId) ? genTraceId() : traceId;
    }
}
```

## 通过 WebFilter 添加 TraceId 过滤器

新增一个 GenericFilterBean ，从请求头中获取 `TraceIdUtils.TRACE_ID` 对应的值，该值在前端发起请求或者微服务之间传递都会带上，如果没有，则 `TraceIdUtils.setTraceId` 会生成一个。

```java
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.GenericFilterBean;

@WebFilter(urlPatterns = "/*", filterName = "traceIdFilter")
@Order(1)
public class TraceIdFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        // traceId初始化
        HttpServletRequest req = (HttpServletRequest) request;
        String traceId = req.getHeader(TraceIdUtils.TRACE_ID);
        TraceIdUtils.setTraceId(traceId);
        // 执行后续过滤器
        filterChain.doFilter(request, response);
    }
}
```

不要忘记在 SpringBoot 的启动类加上 `@ServletComponentScan` 注解，否则自定义的 Filter 无法生效。其中 `"com.yourtion.trace.filter"` 是 `TraceIdFilter` 所在的包名。

```java
@ServletComponentScan(basePackages = "com.yourtion.trace.filter")
@SpringBootApplication
public class MyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```

## 在 feign 上添加 TraceId

因为 `@FeignClient` 的代理类在执行的时候，会去使用使用到 spring 上下文的 RequestInterceptor，所以自定义自己的拦截器，然后注入到 spring 上下文中，这样就可以在请求的上下文中添加自定义的请求头。

```java
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.stereotype.Service;

@Service
public class FeignInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate template) {
        template.header(TraceIdUtils.TRACE_ID, TraceIdUtils.getTraceId());
    }
}
```

## 在 RestTemplate 上添加 TraceId

还有一部分请求是通过 RestTemplate 发起的，之前我们是自己实现了 RestTemplateConfig 的配置类，这次在相关的配置上添加：

```java
RestTemplate restTemplate = builder.additionalInterceptors((request, body, execution) -> {
    request.getHeaders().add(TraceIdUtils.TRACE_ID, TraceIdUtils.getTraceId());
    return execution.execute(request, body);
}).build();
```

至此，链路上的 TraceId 添加已经完成，剩下的就是在日志中打印出来了。

## 修改 log4j2 的 layout 格式

```xml
修改日志的layout格式，将MDC中的traceId打印出来：

<!-- 原始格式 -->
<PatternLayout pattern="%5p %c:%L - %m %throwable{separator( --> )}%n"/>

<!-- 增加traceId的格式 -->
<PatternLayout pattern="%5p traceId:%X{traceId} %c:%L - %m %throwable{separator( --> )}%n"/>
```

至此，修改就大功告成了。

## 参考文章

- [SpringBoot 项目中通过 MDC 和自定义 Filter 操作 traceId 实现日志链路追踪](https://hanchao.blog.csdn.net/article/details/92107651)
- [为 springcloud feign 添加自定义 headers](https://bishion.github.io/2019/05/29/spring-feign-headers/#%E6%96%B9%E6%A1%88%E4%B8%80%E8%87%AA%E5%AE%9A%E4%B9%89-requestinterceptor)
- [Add my custom http header to Spring RestTemplate request / extend RestTemplate](https://stackoverflow.com/questions/32623407/add-my-custom-http-header-to-spring-resttemplate-request-extend-resttemplate)
