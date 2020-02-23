const { render, getDate, createNewPost, createImageDir } = require("./utils");
const { POST_TEMPLATE, IMAGE_PATTERN } = require("./utils_const");
const path = require("path");
const fs = require("fs");
const program = require("commander");

const PWD = process.cwd();
const date = new Date();

function processMdArr(arr) {
  const ret = [];
  let fullDir = "";
  let dir = "";
  let title = "";
  for (line of arr) {
    const r = IMAGE_PATTERN.exec(line);
    if (r) {
      const img = path.join(PWD, r[2]);
      const imgName = path.basename(img);
      let imgFile;
      const e = fs.existsSync(img);
      if (e) {
        if (!dir) {
          const ret = createImageDir(date);
          fullDir = ret.fullDir;
          dir = ret.dir;
        }
        imgFile = dir + "/" + imgName;
        fs.copyFileSync(img, path.resolve(fullDir, imgName));
      }
      // console.log(r[2], e);
      ret.push(`[![]({{ IMAGE_PATH }}${imgFile})]({{ IMAGE_PATH }}${imgFile})`);
    } else if (!title && line.indexOf("# ") === 0) {
      title = line.replace("# ", "");
    } else {
      ret.push(line);
    }
  }
  return { ret, title };
}
function mv(file, slug, options) {
  // console.log(file, slug);
  if (!slug || !file) return;
  if (path.extname(file) !== ".md") {
    console.log("need markdown");
    return;
  }
  let source = file;
  if (!path.isAbsolute(file)) {
    source = path.resolve(PWD, file);
  }
  const mdArr = fs
    .readFileSync(source)
    .toString()
    .split("\n");

  const { ret, title } = processMdArr(mdArr);

  const data = {
    date: getDate(date) + " +08:00",
    slug: slug || "",
    title: program.title || title || "",
    keyword: program.keyword || "",
    desc: program.desc || "",
    cat: program.cat || "",
    tags: program.tags || "",
    img: program.img || ""
  };

  const content = render(POST_TEMPLATE, data);
  const { dir, fileName } = createNewPost(date, slug, content + ret.join("\n"));

  console.log(dir + "/" + fileName);
}

module.exports = mv;
