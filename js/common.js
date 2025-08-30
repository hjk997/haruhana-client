const pages = {
  home: document.querySelector(".list"),
  settings: document.getElementById("settings-page")
};

const navButtons = document.querySelectorAll(".bottom-nav .nav-item");

navButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    // active 클래스 갱신
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // 페이지 전환
    Object.values(pages).forEach(p => p.style.display = "none");
    if (index === 2) { // 설정 메뉴
      pages.settings.style.display = "block";
    } else {
      pages.home.style.display = "block";
    }
  });
});

function showAlert(message) {
  const modal = document.getElementById("alert-modal");
  const msg = document.getElementById("alert-message");
  msg.textContent = message;
  modal.style.display = "flex";
}

function hideAlert() {
  const modal = document.getElementById("alert-modal");
  modal.style.display = "none";
}
