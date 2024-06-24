const { app, BrowserWindow } = require("electron");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const serverApp = express();
const port = 4000;

const performLoginAndAction = require("./puppeteer");

serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(bodyParser.json());

serverApp.use(express.static(path.join(__dirname)));

serverApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let username;
let password;

serverApp.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;

  if (username && password) {
    res.status(200).send("로그인 정보가 전송되었습니다!");
  } else {
    res.status(400).send("로그인 정보전송이 실패되었습니다.");
  }
});

serverApp.post("/play", async (req, res) => {
  const action = req.body.action;
  if (action === "play") {
    try {
      await performLoginAndAction(username, password);
      res.status(200).send("Puppeteer 작업이 완료되었습니다!");
    } catch (error) {
      console.error("Puppeteer 작업 중 오류 발생:", error);
      res.status(500).send("Puppeteer 작업 중 오류가 발생했습니다.");
    }
  } else {
    res.status(400).send("잘못된 요청입니다.");
  }
  console.log("action,", action);
});

// Express 서버 시작
serverApp.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.loadURL(`http://localhost:${port}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
