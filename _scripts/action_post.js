const { render, getDate, createNewPost } = require("./utils");
const { POST_TEMPLATE } = require("./utils_const");
const program = require("commander");

const date = new Date();
function post(slug, options) {
  if (!slug) return;

  const data = {
    date: getDate(date) + " +08:00",
    slug: slug || "",
    title: program.title || "",
    keyword: program.keyword || "",
    desc: program.desc || "",
    cat: program.cat || "",
    tags: program.tags || "",
    img: program.img || ""
  };

  const content = render(POST_TEMPLATE, data);
  const { dir, fileName } = createNewPost(date, slug, content);
  console.log(dir + "/" + fileName);
}

module.exports = post;
