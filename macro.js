const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = 4000;
app.get("/", (req, res) => {
  res.send("Hello, Puppeteer!");
});

app.listen(port, async () => {});
