const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies middleware
app.use(cookieParser());

app.set("view engine", "ejs");

const user = require("./routes/user");
app.use(user);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("loginPage");
});
app.get("/signup", (req, res) => {
    res.render("signupPage");
});

module.exports = app;