const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;

const sessions = [];

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
  res.render("pages/index", {
    mostViewed: sorted
  });
});

app.get("/plants/:plant/", (req, res, next) => {
  const plant = req.params.plant;

  if (plant.endsWith(".css")) {
    next();
    return;
  }

  const cookieName = `views-${plant}`;
  let count = parseInt(req.cookies[cookieName]) || 0;
  count++;
  res.cookie(cookieName, count.toString());
  next();
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
