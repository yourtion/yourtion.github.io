exports.POST_TEMPLATE = `---
layout: post
date: {{date}}
slug: {{slug}}
title: "{{title}}"
author: Yourtion
keywords: [{{keyword}}]
description: "{{desc}}"
category: "{{cat}}"
tags: [{{tags}}]
{{img}}
---
{% include JB/setup %}

`;
exports.IMAGE_PATTERN = /^!\[(.*)\]\((.*)\)$/;
exports.TEMPLATES = {
  leetcode: function(data) {
    return Object.assign(data, {
      slug: "leetcode-java-" + data.slug || "",
      title: "LeetCode 手记 " + data.slug || "",
      keyword: ["leetcode", "java"],
      cat: "学习",
      tags: ["LeetCode", "Java"]
    });
  }
};
