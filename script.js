let musicStarted = false;

// Start experience (music + typing)
function startExperience() {
  playMusic();
  goToPage2();
}

// Music control
function playMusic() {
  if (!musicStarted) {
    document.getElementById("bgMusic").play();
    musicStarted = true;
  }
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}

// Page navigation
function goToPage2() {
  showPage("page2");
  startTyping();
}

function goToPage3() {
  showPage("page3");
  startTyping();
  startHearts();
}

function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// Typing animation
function startTyping() {
  document.querySelectorAll(".typing").forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = true;

    const text = el.dataset.text;
    // Use Array.from to iterate by full Unicode code points (preserves emoji and spaces)
    const chars = Array.from(text);
    el.innerText = "";
    let i = 0;

    const interval = setInterval(() => {
      el.innerText += chars[i];
      i++;
      if (i >= chars.length) clearInterval(interval);
    }, 60); // typing speed
  });
}

// NO button movement 🙈
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("touchstart", moveButton);
  noBtn.addEventListener("mouseover", moveButton);
}

function moveButton() {
  const x = Math.random() * 120 - 60;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

// Floating hearts 💖
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

function goToPage3() {
  showPage("page3");
  startTyping();
  startHearts();

  // Move to love letter after 3 seconds
setTimeout(() => {
  showPage("page4");
  startTyping();

  // Move to memory slideshow after love letter
  setTimeout(() => {
    showPage("page5");
    startTyping();
    startSlideshow();
  }, 6000);
}, 3000);

}

// Memory slideshow
const memoryImages = [
  "assets/memories/1.jpeg",
  "assets/memories/2.jpeg",
  "assets/memories/3.jpeg",
  "assets/memories/4.jpeg"
];

let currentSlide = 0;

function startSlideshow() {
  const bg = document.querySelector(".slideshow-bg");
  if (!bg) return;

  bg.style.backgroundImage = `url(${memoryImages[0]})`;

  setInterval(() => {
    currentSlide = (currentSlide + 1) % memoryImages.length;
    bg.style.backgroundImage = `url(${memoryImages[currentSlide]})`;
  }, 3500); // smooth & emotional pace
}
