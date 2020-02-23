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
