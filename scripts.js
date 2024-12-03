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

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
});

document.getElementById("projects-btn").addEventListener("click", () => {
  const passcode = prompt("Enter the passcode to access the projects:");
  if (passcode === "7823") {
    window.open("https://github.com/WhoWht", "_blank");
  } else {
    alert("Incorrect passcode!");
  }
});

document.getElementById("social-btn").addEventListener("click", () => {
  const socialLinks = `
    <h2>Connect with me:</h2>
    <p><a href="https://facebook.com" target="_blank">Facebook</a></p>
    <p><a href="https://instagram.com" target="_blank">Instagram</a></p>
    <p><a href="https://discord.com" target="_blank">Discord</a></p>
    <button class="close-btn" id="close-social">Close</button>
  `;
  openModal(socialLinks);

  document.getElementById("close-social").addEventListener("click", closeModal);
});

document.getElementById("close-modal").addEventListener("click", closeModal);

function openModal(content) {
  const modal = document.getElementById("modal");
  document.getElementById("modal-body").innerHTML = content;
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
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

const objects = Array.from({ length: 50 }, createBall);
Matter.World.add(engine.world, objects);

Matter.Engine.run(engine);
Matter.Render.run(render);

window.addEventListener("resize", () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
});
