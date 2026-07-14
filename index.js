const express = require("express");
const bcrypt = require("bcrypt");
require("./src/config");

const Collection = require("./models/User");

const app = express();

// Middleware
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  }),
);

// View engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("public"));

// Home/Login page
app.get("/", (req, res) => {
  res.render("login");
});

// Signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

// Register user
app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.username,
      password: req.body.password,
    };

    // Check existing user
    const existingUser = await Collection.findOne({
      name: data.name,
    });

    if (existingUser) {
      return res.send("User already exists. Please choose another username.");
    }

    // Hash password
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    // Save user
    const userdata = await Collection.create(data);

    console.log(userdata);

    res.send("Signup successful");
  } catch (error) {
    console.log(error);

    res.status(500).send("Something went wrong");
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Collection.findOne({
      name: username,
    });

    if (!user) {
      return res.send("Username not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.render("home");
    } else {
      res.send("Wrong password");
    }
  } catch (error) {
    console.log(error);

    res.send("Login error");
  }
});

// Server
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
