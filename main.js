const { app, BrowserWindow } = require("electron");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const serverApp = express();
const port = 4000;

// Body-parser 미들웨어 설정
serverApp.use(bodyParser.urlencoded({ extended: true }));
serverApp.use(bodyParser.json());

// 정적 파일 제공 설정
serverApp.use(express.static(path.join(__dirname)));

// 라우트 설정
serverApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let username;
let password;
let action;

serverApp.post("/login", (req, res) => {
  username = req.body.username;
  password = req.body.password;

  console.log("req,", req);
  console.log(`아이디: ${username}, 비밀번호: ${password}`);
  if (username && password) {
    res.status(200).send("로그인 정보가 전송되었습니다!");
  } else {
    res.status(400).send("로그인 정보전송이 실패되었습니다.");
  }
});

serverApp.post("/play", (req, res) => {
  action = req.body.action;
  console.log("action,", action);
  res.status(200).send("챌린지 듣기시작");
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
