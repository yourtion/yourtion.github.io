const { exists, readFile, writeFile, copyFile, mkdir } = require("fs");
const { promisify } = require("util");
const path = require("path");
const { POST_TEMPLATE, TEMPLATES } = require("./utils_const");

exports.existsAsync = promisify(exists);
exports.readFileAsync = promisify(readFile);
exports.writeFileAsync = promisify(writeFile);
exports.copyFileAsync = promisify(copyFile);
exports.mkdirAsync = promisify(mkdir);

/**
 * 渲染模版字符串
 * @param {String} template 模版字符串
 * @param {Record<string, any>} context 替换对象
 *
 * @example
 *
 * render("{{name}}很厉害，才{{age}}岁", { name: "yourtion", age: "15" })
 * // => yourtion很厉害，才15岁
 *
 */
exports.render = function render(template, context) {
  return template.replace(/\{\{(.*?)\}\}/g, (_, key) => context[key]);
};

exports.renderPost = function renderPost(data, fast) {
  data.keyword = data.keyword.split(",");
  data.tags = data.tags.split(",");

  if (fast && TEMPLATES[fast]) {
    data = TEMPLATES[fast](data);
  }

  data.keyword = `"${data.keyword.join('", "')}"`;
  data.tags = `"${data.tags.join('", "')}"`;
  data.img = data.img && "img: " + data.img;

  return exports.render(POST_TEMPLATE, data);
};

exports.leftPad = leftPad;
function leftPad(n, c) {
  let res = String(n);
  while (res.length < c) {
    res = "0" + res;
  }
  return res;
}

/**
 * 返回时间：19:43:24
 */
exports.getTime = getTime;
function getTime(d = new Date()) {
  return [
    leftPad(d.getHours(), 2),
    leftPad(d.getMinutes(), 2),
    leftPad(d.getSeconds(), 2)
  ].join(":");
}

/**
 * 返回日期：2020-01-12
 */
exports.getDay = getDay;
function getDay(d = new Date()) {
  return [
    leftPad(d.getFullYear(), 4),
    leftPad(d.getMonth() + 1, 2),
    leftPad(d.getDate(), 2)
  ].join("-");
}

/**
 * 返回日期时间：2020-01-12 19:43:24
 */
exports.getDate = getDate;
function getDate(d = new Date()) {
  return getDay(d) + " " + getTime(d);
}

/**
 * 创建新文档
 */
exports.createNewPost = createNewPost;
async function createNewPost(date, slug, content) {
  const day = getDay(date);
  const fileName = `${day}-${slug}.md`;
  const dir = `${date.getFullYear()}/${leftPad(date.getMonth() + 1, 2)}`;
  const fullDir = path.resolve(__dirname, "../_posts/", dir);
  exports.mkdirAsync(fullDir, { recursive: true });
  const fullFile = path.resolve(fullDir, fileName);
  if (await exports.existsAsync(fullFile)) {
    console.log("file exists:" + fullFile);
    return { dir, fileName };
  }
  await exports.writeFileAsync(fullFile, content);
  return { dir, fileName };
}

exports.createImageDir = createImageDir;
async function createImageDir(date) {
  const dir = `${date.getFullYear()}/${leftPad(date.getMonth() + 1, 2)}`;
  const fullDir = path.resolve(__dirname, "../images/", dir);
  await exports.mkdirAsync(fullDir, { recursive: true });
  return { dir, fullDir };
}
