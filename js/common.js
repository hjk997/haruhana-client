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
