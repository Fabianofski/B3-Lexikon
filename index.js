const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;

const sessions = [];
const favourites = {};
const comments = {};

app.set("view engine", "ejs");

app.use(cookieParser());

app.get("/", (req, res) => {
  const cookies = req.cookies;

  const articles = Object.entries(cookies).filter(([key]) => key.startsWith("views-"));

  const mapped = articles.map(([key, value]) => {
    const newKey = key.slice("views-".length);
    return [newKey, value];
  });
  const sorted = mapped.sort(([, a], [, b]) => b - a);

  let savedArticles = [];
  if (req.cookies["token"]) savedArticles = favourites[req.cookies["token"]] || [];

  res.render("pages/index", {
    mostViewed: sorted,
    favourites: savedArticles
  });
});

app.post("/favourite", (req, res, next) => {
  const article = req.query.article.toLowerCase();
  const token = req.cookies["token"];
  if (!token || article === "") next();

  if (favourites.hasOwnProperty(token) && !favourites[token].includes(article))
    favourites[token].push(article);
  else favourites[token] = [article];
  res.end();
});

app.delete("/favourite", (req, res, next) => {
  const article = req.query.article.toLowerCase();
  const token = req.cookies["token"];

  if (token && favourites[token]) {
    const index = favourites[token].indexOf(article);
    if (index > -1) favourites[token].splice(index, 1);
  }
  res.end();
});

app.get("/plants/:plant/", (req, res, next) => {
  const plant = req.params.plant;

  const cookieName = `views-${plant.toLowerCase()}`;
  let count = parseInt(req.cookies[cookieName]) || 0;
  count++;
  res.cookie(cookieName, count.toString());

  const token = req.cookies["token"];
  console.log(favourites);
  const isFavourite = token && favourites[token] && favourites[token].includes(plant);

  res.render(`plants/${plant}/${plant}`, {
    isFavourite: isFavourite
  });
});

app.use((req, res, next) => {
  if (!req.cookies["token"]) {
    const sessionId = Math.floor(Math.random() * 10000);

    sessions.push(sessionId);

    res.cookie("token", sessionId);
  }
  next();
});

app.use("/", express.static("public"));

app.listen(PORT, () => console.log("Listening ..."));

app.post("/comment", (req, res, next) => {
  const comment = req.query.comment;
  const name = req.query.name;
  const article = req.query.article.toLowerCase();
  const token = req.cookies["token"];
  if (!token || article === "") next();

  if (comments.hasOwnProperty(article))
    comments[article].push({
      name: name,
      comment: comment
    });
  else comments[article] = [{
      name: name,
      comment: comment,
    }
  ];

  console.log(comments);
  res.end();
});
