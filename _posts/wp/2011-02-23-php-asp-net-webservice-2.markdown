---
author: Yourtion
comments: true
date: 2011-02-23 08:58:34+00:00
excerpt: PHP调用ASP.NET的WebService
layout: post
slug: php-asp-net-webservice-2
title: PHP调用ASP.NET的WebService
wordpress_id: 1931
categories:
- ASP.NET
- PHP
tags:
- PHP
- WebService
---
{% include JB/setup %}

创建一个C#的web service，这个就不多说了，我用vs2008的wizard创建了一个最简单的，让它运行在：http://localhost/webservice1/service1.asmx

其中有个web method像这样的：

```
[WebMethod]
public string HelloWorld()
{
return "Hello World";
}
```

ok，一切就绪。在某php文件中如下写法：
php5本身就支持SOAP调用Web Service:

```
<?php
    //get localization strings from C# webservice
    $client = new SoapClient('http://localhost/webservice1/Localization.asmx?wsdl');

    echo "Call web service method from C# WebService:\n";
    $result = $client->GetLocalizationResource();

    if(!is_soap_fault($result))
    {    
        echo "return:\n", $result->GetLocalizationResourceResult;
    }
    else
    {
        echo "soap call fault";
    }
?>
```

这样就OK了，会继续介绍SOAP
