document.getElementById("play").addEventListener("click", async function () {
  const sendPlayRequest = async () => {
    const response = await fetch("/play", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ action: "play" }),
    });

    if (response.ok) {
      alert("챌린지 강의 듣기 요청이 전송되었습니다.");
    } else {
      alert("챌린지 강의 듣기 요청에 실패했습니다.");
    }
  };

  await sendPlayRequest();
});

function scheduleClickAtEightAM() {
  const now = new Date();
  const eightAM = new Date();
  eightAM.setHours(8, 0, 0, 0);

  if (now > eightAM) {
    eightAM.setDate(eightAM.getDate() + 1);
  }

  const timeUntilEightAM = eightAM - now;

  setTimeout(() => {
    document.getElementById("play").click();
    // 이후 매일 오전 8시에 클릭하도록 설정
    setInterval(() => {
      document.getElementById("play").click();
    }, 24 * 60 * 60 * 1000); // 24시간(1일)마다 클릭
  }, timeUntilEightAM);
}

scheduleClickAtEightAM();
// 10초마다 'play'라는 ID를 가진 요소를 클릭합니다.
// setInterval(() => {
//   document.getElementById("play").click();
// }, 10000);
