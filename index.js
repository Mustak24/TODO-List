require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  fs.readFile("./Data/Notes.json", "utf8", (e, data) => {
    if (!e) res.render("home", { notes: JSON.parse(data) });
    else console.log(e);
  });
});

app.get("/note:name", (req, res) => {
  for (let note of require("./Data/Notes.json"))
    if (note.name == req.params.name) res.render("note", { note });
});

app.get("/edit/:note", (req, res) => {
  for (let note of require("./Data/Notes.json"))
    if (note.name == req.params.note) res.render("edit", { note });
});

app.post("/addnote", (req, res) => {
  fs.writeFile(
    "./Data/Notes.json",
    JSON.stringify(require("./Data/Notes.json").concat([req.body])),
    (err) => {
      if (err) res.render("/").status(500);
      res.redirect("/");
    }
  );
});

app.post("/updateNote/:note", (req, res) => {
  fs.writeFile(
    "./Data/Notes.json",
    JSON.stringify(
      require("./Data/Notes.json").map((e) =>
        e.name == req.params.note ? req.body : e
      )
    ),
    (e) => (e ? navigator: res.redirect("/"))
  );
});

app.listen(port);

