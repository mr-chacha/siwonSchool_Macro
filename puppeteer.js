const puppeteer = require("puppeteer");

async function performLoginAndAction(username, password) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });

  await page.goto("https://www.siwonschool.com/?s=challenge_refund");

  page.setDefaultTimeout(3000);

  await page.evaluate(
    (username, password) => {
      const idInput = document.querySelector("#input_id");
      const pwInput = document.querySelector("#input_pw");
      const loginBtn = document.querySelector("#bt_login");
      if (idInput) {
        idInput.value = username; // Replace with your actual username
      }
      if (pwInput) {
        pwInput.value = password; // Replace with your actual password
      }
      if (idInput || pwInput) {
        loginBtn.click();
      }
    },
    username,
    password
  );

  // Wait for navigation after login
  await page.waitForNavigation();

  // Navigate to the next URL
  await page.goto("https://www.siwonschool.com/?s=challenge_refund");

  await page.evaluate(() => {
    const btn = document.querySelector(".box");

    if (btn) {
      btn.click();
    }
  });

  await page.waitForSelector(".lec_box button");

  await page.evaluate(() => {
    const btn4 = document.querySelector(".lec_box");
    if (btn4) {
      btn4.querySelector("button").click();
    }
  });

  // Do not close the browser immediately
  // await browser.close();
}

module.exports = performLoginAndAction;
