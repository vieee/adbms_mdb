const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

const MONGO_URI =
  "mongodb+srv://Deepak:MongoDB%401234@cluster0-g1rdx.gcp.mongodb.net/mern-crud?retryWrites=true&w=majority";


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((_result) => {
    app.listen(5000);
    console.log("hello")
  })
  .catch((err) => console.log(err));
