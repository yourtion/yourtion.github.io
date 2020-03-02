const {
  renderPost,
  getDate,
  createNewPost,
  createImageDir,
  copyFileAsync,
  readFileAsync,
  existsAsync
} = require("./utils");
const { IMAGE_PATTERN } = require("./utils_const");
const path = require("path");
const program = require("commander");
const tinify = require("tinify");
tinify.key = process.env.TINYPNG_KEY;
tinify.proxy = "http://127.0.0.1:8092";

function copyImg(source, dist, tiny) {
  if (tiny && tinify._key) {
    console.log("tinify image: " + source);
    return tinify.fromFile(source).toFile(dist);
  }
  return copyFileAsync(source, dist);
}

const PWD = process.cwd();
const date = new Date();

async function processMdArr(slug, arr, tiny) {
  const ret = [];
  let fullDir = "";
  let dir = "";
  let title = "";
  let c = 1;
  let headImage = "";
  for (line of arr) {
    const r = IMAGE_PATTERN.exec(line);
    if (r) {
      const img = path.join(PWD, r[2]);
      const imgName = `${slug}-${c++}${path.extname(img)}`;
      let imgFile;
      const e = await existsAsync(img);
      if (e) {
        if (!dir) {
          const ret = await createImageDir(date);
          fullDir = ret.fullDir;
          dir = ret.dir;
        }
        imgFile = dir + "/" + imgName;
        await copyImg(img, path.resolve(fullDir, imgName), tiny);
        if (!headImage) {
          headImage = imgFile;
        }
      }
      // console.log(r[2], e);
      ret.push(`[![]({{ IMAGE_PATH }}${imgFile})]({{ IMAGE_PATH }}${imgFile})`);
    } else if (!title && line.indexOf("# ") === 0) {
      title = line.replace("# ", "");
    } else {
      ret.push(line);
    }
  }
  return { ret, title, headImage };
}
async function mv(file, slug, options) {
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
  const md = await readFileAsync(source);
  const mdArr = md.toString().split("\n");

  const { ret, title, headImage } = await processMdArr(
    slug,
    mdArr,
    options.tiny
  );
  const data = {
    date: getDate(date) + " +08:00",
    slug: slug || "",
    title: program.title || title || "",
    keyword: program.keyword || "",
    desc: program.desc || "",
    cat: program.cat || "",
    tags: program.tags || "",
    img: program.img || headImage || ""
  };

  const content = renderPost(data);
  const { dir, fileName } = await createNewPost(
    date,
    data.slug,
    content + ret.join("\n")
  );

  console.log(dir + "/" + fileName);
}

module.exports = mv;
