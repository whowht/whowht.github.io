const visitCountElement = document.getElementById("visit-count");
const visits = localStorage.getItem("visits");
const updatedVisits = visits ? parseInt(visits) + 1 : 1;
localStorage.setItem("visits", updatedVisits);
visitCountElement.textContent = updatedVisits;

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode")
    ? "🌙"
    : "☀️";
});

document.getElementById("projects-btn").addEventListener("click", () => {
  window.location.href = "./projects";
});

const socialBtn = document.getElementById("social-btn");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");

socialBtn.addEventListener("click", () => {
  const socialContent = `
    <h2>Social</h2>
    <ul>
      <li><a href="https://discord.com" target="_blank">Discord</a></li>
      <li><a href="https://facebook.com" target="_blank">Facebook</a></li>
      <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
    </ul>
  `;
  document.getElementById("modal-body").innerHTML = socialContent;
  modal.classList.add("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

document.addEventListener("click", (event) => {
  if (!modal.contains(event.target) && !socialBtn.contains(event.target)) {
    modal.classList.remove("active");
  }
});
