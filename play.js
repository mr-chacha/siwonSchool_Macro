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
      alert("챌린지 강의 듣기 시작");
    } else {
      alert("챌린지 강의 듣기 실패");
    }
  };

  await sendPlayRequest();

  // 특정 시간이 될 때까지 체크하는 함수
  const checkTimeAndSendRequest = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // 오전 12시 1분에 요청 보내기
    if (hours === 0 && minutes === 1) {
      sendPlayRequest();
      clearInterval(intervalId);
    }
  };

  // 1초마다 현재 시간을 체크합니다.
  const intervalId = setInterval(checkTimeAndSendRequest, 1000);
});
