const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const app = express();
const knex = require("knex");
const cors = require("cors");
const profile = require("./controllers/profile");
const register = require("./controllers/register");
const signIn = require("./controllers/signin");
const image = require("./controllers/image");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "leyyen132",
    database: "postgres"
  }
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signin", (req, res) => {
  signIn.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleAPI(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/*
/ --> res = this is working
/ sign in --> POST = success/fail
/register --> POST (add data) = user
/profile/:user --> GET = user
/image --> PUT --> user
*/
