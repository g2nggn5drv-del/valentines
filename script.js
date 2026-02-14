const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const subtitle = document.getElementById("subtitle");
const chanceText = document.getElementById("chance");
const fill = document.getElementById("fill");
const finalScreen = document.getElementById("final");
const buttons = document.getElementById("buttons");
const againBtn = document.getElementById("againBtn");

let noCount = 0;
let chance = 72;

const noLines = [
  "No? Bold. 😭",
  "That button seems… broken. 🛠️",
  "You’re really gonna do me like that? 🥺",
  "Plot twist: you meant YES. 😌",
  "Okay you’re just here for the mini-game 😂",
  "Final boss activated. 🎮"
];

function setChance(newChance) {
  chance = Math.max(1, Math.min(99, newChance));
  chanceText.textContent = `${chance}%`;
  fill.style.width = `${chance}%`;
}

function moveNoButton() {
  noCount++;

  // Make it harder to say no 😌
  setChance(chance + 6);

  // Make YES more irresistible
  const scale = 1 + Math.min(0.35, noCount * 0.07);
  yesBtn.style.transform = `scale(${scale})`;

  result.textContent = noLines[Math.min(noCount - 1, noLines.length - 1)];

  // Random position inside the buttons container
  const rect = buttons.getBoundingClientRect();
  const maxX = rect.width - noBtn.offsetWidth;
  const maxY = rect.height - noBtn.offsetHeight;

  const x = Math.floor(Math.random() * Math.max(1, maxX));
  const y = Math.floor(Math.random() * Math.max(1, maxY));

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  // extra fun subtitle changes
  const subtitles = [
    "Choose wisely… I trained for this.",
    "This is getting competitive.",
    "Your mouse is fast but my love is faster.",
    "Okay okay… I respect the grind.",
    "Just press YES and we both win."
  ];
  subtitle.textContent = subtitles[Math.min(noCount, subtitles.length - 1)];
}

function confettiEmojis() {
  for (let i = 0; i < 30; i++) {
    const s = document.createElement("span");
    s.textContent = ["💖","✨","💘","🌹","💕","🥳"][Math.floor(Math.random()*6)];
    s.style.position = "fixed";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = "-10px";
    s.style.fontSize = (18 + Math.random()*18) + "px";
    s.style.transition = "transform 1.2s linear, opacity 1.2s linear";
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = `translateY(${115 + Math.random()*20}vh) rotate(${Math.random()*720}deg)`;
      s.style.opacity = "0";
    });

    setTimeout(() => s.remove(), 1300);
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  result.textContent = "";
  subtitle.textContent = "Correct choice 😌💞";
  buttons.classList.add("hidden");
  finalScreen.classList.remove("hidden");
  confettiEmojis();
});

againBtn.addEventListener("click", () => {
  // Reset everything
  noCount = 0;
  setChance(72);
  yesBtn.style.transform = "scale(1)";
  result.textContent = "";
  subtitle.textContent = "Choose wisely… I trained for this.";
  finalScreen.classList.add("hidden");
  buttons.classList.remove("hidden");

  // Put NO back in its corner
  noBtn.style.left = "";
  noBtn.style.top = "";
});