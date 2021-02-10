const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/new", (req, res) => {
  // res.render("articles/new", { article: new Article() });
  res.send(new Article())
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  // res.render("articles/edit", { article: article });
  res.send(article)
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");
  // res.render("articles/show", { article: article });
  res.send(article)
});

router.post(
  "/",
  async (req, res, next) => {
    console.log("I'm here")
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
  );
  
  router.put(
    "/:id",
    async (req, res, next) => {
    console.log("Mai yaha hu..!")
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  // res.redirect("/");
  res.send({
    message: "This node has been deleted..!"
  })
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    console.log('req.article ', req.body.title)
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    try {
      article = await article.save();
      // res.redirect(`/articles/${article.slug}`);
      console.log('article', article)
      res.send({
        article: article,
        message: "Successfully " + path + " operation executed..!"
      })
    } catch (e) {
      // res.render(`articles/${path}`, { article: article });
      res.send({
        article: article,
        message: "Something fishy " + path + " operation executed..!"
      })
    }
  };
}

module.exports = router;
