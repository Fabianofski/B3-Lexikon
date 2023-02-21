const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;

const sessions = [];

app.use(cookieParser());

app.use("/", (req, res, next) => {
    console.log()
    if(!req.cookies.token) {
        const sessionId = Math.floor(Math.random() * 10000);

        sessions.push(sessionId);

        res.cookie("token", sessionId);
    }   
    next();
})

app.use("/html/:plant", (req, res, next) => {
    const plant = req.params.plant.replace(".html", "");
    let count = parseInt(req.cookies[plant]) || 0;
    count++;
    res.cookie(plant, count.toString());
    next()
});

app.use("/", express.static("public"))

app.listen(PORT, () => console.log("Listening ..."));
