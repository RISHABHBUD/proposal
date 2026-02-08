let musicStarted = false;
let noClickCount = 0;

const noMessages = [
  "Heyyy 🙈 don’t be shy",
  "Are you sure? 🥹",
  "My heart says YES 💖",
  "Pariiii 😭",
  "Okay okay… I know it’s YES 😍"
];

// Start experience
function startExperience() {
  playMusic();
  showPage("page2");
  startTyping();
}

// Music
function playMusic() {
  if (!musicStarted) {
    document.getElementById("bgMusic").play();
    musicStarted = true;
  }
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  music.paused ? music.play() : music.pause();
}

// Page handler
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// Typing
function startTyping() {
  document.querySelectorAll(".typing").forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = true;

    const chars = Array.from(el.dataset.text);
    el.innerText = "";
    let i = 0;

    const interval = setInterval(() => {
      el.innerText += chars[i++];
      if (i >= chars.length) clearInterval(interval);
    }, 60);
  });
}

// YES flow
function goToYesFlow() {
  showPage("page3");
  startTyping();
  startHearts();

  setTimeout(() => {
    showPage("page4");
    startTyping();

    setTimeout(() => {
      showPage("page5");
      startTyping();
      startSlideshow();
    }, 6000);
  }, 3000);
}

// NO logic
const noBtn = document.getElementById("noBtn");
const noMsg = document.getElementById("noMessage");
const yesBtn = document.getElementById("yesBtn");

if (noBtn) {
  noBtn.addEventListener("click", handleNo);
  noBtn.addEventListener("touchstart", handleNo);
}

function handleNo(e) {
  e.preventDefault();
  noClickCount++;

  // Small playful shake movements (never overlaps)
  const moves = [
    "translateX(-60px)",
    "translateX(60px)",
    "translateY(-20px)",
    "translateY(20px)"
  ];

  noBtn.style.transform = moves[noClickCount % moves.length];

  burstHearts(noBtn);

  showNoMessage(
    noMessages[Math.min(noClickCount - 1, noMessages.length - 1)]
  );

  yesBtn.classList.add("glow");

  if (noClickCount >= 5) {
    noBtn.style.display = "none";
    showNoMessage("I know it’s YES 😍💖");
  }
}




function showNoMessage(text) {
  noMsg.innerText = text;
  noMsg.classList.remove("hidden");
  noMsg.classList.add("pop");

  setTimeout(() => noMsg.classList.remove("pop"), 700);
}

// Floating hearts
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }, 300);
}

// Heart burst near NO
function burstHearts(btn) {
  const rect = btn.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.className = "heart burst";
    heart.innerText = "💖";
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1200);
  }
}

// Slideshow
const memoryImages = [
  "assets/memories/1.png",
  "assets/memories/2.png",
  "assets/memories/3.png",
  "assets/memories/4.png"
];

let currentSlide = 0;

function startSlideshow() {
  const bg = document.querySelector(".slideshow-bg");
  bg.style.backgroundImage = `url(${memoryImages[0]})`;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % memoryImages.length;
    bg.style.backgroundImage = `url(${memoryImages[currentSlide]})`;
  }, 3500);
}
