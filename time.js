// 현재 시간을 HTML에 표시하는 함수
function displayCurrentTime() {
  const now = new Date();
  const formattedTime = now.toLocaleTimeString();
  document.getElementById(
    "currentTime"
  ).innerText = `현재 시간: ${formattedTime}`;
}

// 페이지가 로드될 때 현재 시간을 표시하고 1초마다 업데이트
window.onload = () => {
  displayCurrentTime();
  setInterval(displayCurrentTime, 1000);
};
