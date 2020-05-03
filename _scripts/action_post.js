const { renderPost, getDate, createNewPost } = require("./utils");
const program = require("commander");

const date = new Date();
async function post(slug, options) {
  if (!slug) return;

  const data = {
    date: getDate(date) + " +0800",
    slug: slug || "",
    title: program.title || "",
    keyword: program.keyword || "",
    desc: program.desc || "",
    cat: program.cat || "",
    tags: program.tags || "",
    img: program.img || ""
  };
  const content = renderPost(data, options.fast);
  const { dir, fileName } = await createNewPost(date, data.slug, content);
  console.log(dir + "/" + fileName);
}

module.exports = post;
