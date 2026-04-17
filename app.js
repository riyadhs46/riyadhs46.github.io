// Mobile nav toggle
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  if (navLinks.classList.contains("open")) {
    navLinks.style.display = "flex";
    navLinks.style.position = "fixed";
    navLinks.style.top = "74px";
    navLinks.style.left = "20px";
    navLinks.style.right = "20px";
    navLinks.style.flexDirection = "column";
    navLinks.style.gap = "6px";
    navLinks.style.padding = "12px";
    navLinks.style.borderRadius = "18px";
    navLinks.style.background = "rgba(0,0,0,.75)";
    navLinks.style.border = "1px solid rgba(255,255,255,.12)";
    navLinks.style.backdropFilter = "blur(12px)";
  } else {
    navLinks.removeAttribute("style");
  }
});

// Active nav on scroll
const sections = document.querySelectorAll("section[id]");
const navA = document.querySelectorAll(".links a");

function setActive() {
  let current = "home";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.id;
  });

  navA.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${current}`);
  });
}
window.addEventListener("scroll", setActive);
setActive();

// Menu filter
const tabs = document.querySelectorAll("#menuTabs .tab");
const items = document.querySelectorAll("#menuGrid .menu-card");

tabs.forEach(btn => {
  btn.addEventListener("click", () => {
    tabs.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    items.forEach(card => {
      const cat = card.dataset.cat;
      const show = (filter === "all") || (cat === filter);
      card.style.display = show ? "block" : "none";
    });
  });
});

// Testimonials slider
const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let index = 0;
const total = slidesEl ? slidesEl.children.length : 0;

function renderDots() {
  if (!dotsEl) return;
  dotsEl.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const d = document.createElement("button");
    d.className = "dot" + (i === index ? " active" : "");
    d.addEventListener("click", () => goTo(i));
    dotsEl.appendChild(d);
  }
}

function goTo(i) {
  index = (i + total) % total;
  if (slidesEl) slidesEl.style.transform = `translateX(-${index * 100}%)`;
  renderDots();
}

prev?.addEventListener("click", () => goTo(index - 1));
next?.addEventListener("click", () => goTo(index + 1));

renderDots();
goTo(0);

// Forms (demo only)
document.getElementById("bookingForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Reservation request sent (demo). Connect this to a backend or email service.");
});

document.getElementById("newsForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Subscribed (demo).");
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
