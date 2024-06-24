document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      console.log("response", response);
      alert("로그인 완료");
      document.getElementById("content").classList.remove("hidden");
      document.getElementById("loginForm").classList.add("hidden");
      document.getElementById("loginMessage").classList.remove("hidden");
    } else {
      alert("로그인 실패");
    }
  });
