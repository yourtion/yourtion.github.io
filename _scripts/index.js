#!/usr/bin/env node

const program = require("commander");
const post = require("./action_post");
const mv = require("./action_mv");

program.version("0.0.1");
// 默认选项
program
  .option("-t, --title <title>", "Add title")
  .option("-k, --keyword <keyword>", "Add keyword")
  .option("-d, --desc <desc>", "Add desc")
  .option("-c, --cat <cat>", "Add cat");
// 文章发布
program.command("post <slug>")
.option("-f, --fast <template>", "use template")
.action(post);
// 迁移文章
program.command("mv <file> <slug>").action(mv);
program.parse(process.argv);
