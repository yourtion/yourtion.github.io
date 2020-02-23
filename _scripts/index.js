#!/usr/bin/env node

const program = require("commander");
const post = require("./action_post");
const mv = require("./action_mv");

program.version("0.0.1");
program
  .option("-t, --title <title>", "Add title")
  .option("-k, --keyword <keyword>", "Add keyword")
  .option("-d, --desc <desc>", "Add desc")
  .option("-c, --cat <cat>", "Add cat");
program.command("post <slug>").action(post);
program.command("mv <file> <slug>").action(mv);
program.parse(process.argv);
