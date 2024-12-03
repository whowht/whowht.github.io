const welcomeText = "Website";
let i = 0;
const typeText = () => {
  if (i < welcomeText.length) {
    document.getElementById("welcome-text").textContent += welcomeText.charAt(i);
    i++;
    setTimeout(typeText, 100);
  }
};
typeText();

const visitCountElement = document.getElementById("visit-count");
const visits = localStorage.getItem("visits");
const updatedVisits = visits ? parseInt(visits) + 1 : 1;
localStorage.setItem("visits", updatedVisits);
visitCountElement.textContent = updatedVisits;

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light-mode");
  themeToggle.textContent = isLightMode ? "🌙" : "☀️";
});

document.getElementById("projects-btn").addEventListener("click", () => {
  window.location.href = "./projects.html";
});

document.getElementById("social-btn").addEventListener("click", () => {
  const socialLinks = `
    <h2>Connect with me:</h2>
    <p><a href="https://discord.com" target="_blank">Discord<img src="discord-logo.png"></a></p>
    <p><a href="https://facebook.com" target="_blank">Facebook<img src="facebook-logo.png"></a></p>
    <p><a href="https://instagram.com" target="_blank">Instagram<img src="instagram-logo.png"></a></p>
  `;
  openModal(socialLinks);

  document.addEventListener("click", closeModalOnOutsideClick);
});

function openModal(content) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-body").innerHTML = content;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  document.removeEventListener("click", closeModalOnOutsideClick);
}

function closeModalOnOutsideClick(event) {
  const modal = document.querySelector(".modal-content");
  if (!modal.contains(event.target) && !event.target.closest("#social-btn")) {
    closeModal();
  }
}

const canvas = document.getElementById("background-canvas");
const engine = Matter.Engine.create();
const render = Matter.Render.create({
  canvas,
  engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "#121212",
  },
});

const createBall = () =>
  Matter.Bodies.circle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    Math.random() * 20 + 10,
    {
      restitution: 0.8,
      render: { fillStyle: `hsl(${Math.random() * 360}, 100%, 50%)` },
    }
  );

const mouse = Matter.Mouse.create(canvas);
const mouseConstraint = Matter.MouseConstraint.create(engine, { mouse });

Matter.World.add(engine.world, [mouseConstraint]);
Matter.World.add(engine.world, Array.from({ length: 50 }, createBall));
Matter.Engine.run(engine);
Matter.Render.run(render);

window.addEventListener("resize", () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
});
