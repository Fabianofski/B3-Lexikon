const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;

const sessions = [];

app.set('view engine', 'ejs');

app.use(cookieParser());

app.use("/", (req, res, next) => {
    if(!req.cookies.token) {
        const sessionId = Math.floor(Math.random() * 10000);

        sessions.push(sessionId);

        res.cookie("token", sessionId);
    }   
    next();
})

app.get("/index.html", (req, res, next) => {
  res.redirect("/")
})

app.get("/", (req, res) => {
  const articles = req.cookies

  const filtered = Object.entries(articles)
  .filter(([key]) => key.startsWith('views-'));

  const mapped = filtered.map(([key, value]) => {
    const newKey = key.slice('views-'.length);
    return [newKey, value];
  });

  const sorted = mapped.sort(([, a], [, b]) => b - a);

  const firstThree = sorted.slice(0, 3);

  const resultObj = firstThree.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});

  const firstKey = Object.keys(resultObj)[0]
  const secondKey = Object.keys(resultObj)[1]
  const thirdKey = Object.keys(resultObj)[2]

  const topThree = { first: {
    name: firstKey,
    value: resultObj[firstKey],
  }, second: {
    name: secondKey,
    value: resultObj[secondKey],
  }, third: {
    name: thirdKey,
    value: resultObj[thirdKey],
  }
  }
  res.render('pages/index', {
    topThree: topThree
  })
})

app.use("/plants/:plant", (req, res, next) => {
  const plant = req.params.plant
  
  if (req.path !== "/" || plant.endsWith(".css")) {
    next()
    return
  }
  
  const cookieName = `views-${plant}`
  let count = parseInt(req.cookies[cookieName]) || 0;
  count++;
  res.cookie(cookieName, count.toString());
  next()
})

app.use("/", express.static("public"))

app.listen(PORT, () => console.log("Listening ..."))
