// ===== CAR DATA =====
const cars = [
  {
    id: 1,
    name: "Tesla Model S",
    type: "luxury",
    tag: "Electric",
    seats: "5 Seats",
    range: "405 mi",
    speed: "0-60 in 2.3s",
    transmission: "Auto",
    price: 149,
    img: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=900&q=80",
    features: ["Full Self-Driving", "17\" Touchscreen", "Premium Sound", "Heated Seats", "Autopilot", "Supercharger Access", "Air Suspension", "Premium Interior"]
  },
  {
    id: 2,
    name: "BMW M4 Competition",
    type: "sports",
    tag: "Sports",
    seats: "4 Seats",
    range: "350 mi",
    speed: "0-60 in 3.8s",
    transmission: "Auto",
    price: 189,
    img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80",
    features: ["M Sport Package", "Carbon Fiber Trim", "Harman Kardon Audio", "Head-Up Display", "Active M Exhaust", "Adaptive Suspension", "Sport Seats", "Launch Control"]
  },
  {
    id: 3,
    name: "Range Rover Sport",
    type: "suv",
    tag: "SUV",
    seats: "5 Seats",
    range: "420 mi",
    speed: "0-60 in 5.1s",
    transmission: "Auto",
    price: 129,
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80",
    features: ["Terrain Response", "Panoramic Sunroof", "Meridian Sound", "Heated/Cooled Seats", "Air Suspension", "WiFi Hotspot", "360° Camera", "Off-Road Capability"]
  },
  {
    id: 4,
    name: "Porsche 911 Carrera",
    type: "sports",
    tag: "Sports",
    seats: "4 Seats",
    range: "340 mi",
    speed: "0-60 in 3.4s",
    transmission: "PDK",
    price: 249,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=80",
    features: ["Sport Chrono Package", "Bose Sound System", "Sport Exhaust", "Leather Interior", "PASM Suspension", "Sport Design Package", "PCM Navigation", "Rear-Axle Steering"]
  },
  {
    id: 5,
    name: "Mercedes GLE",
    type: "suv",
    tag: "SUV",
    seats: "7 Seats",
    range: "440 mi",
    speed: "0-60 in 5.6s",
    transmission: "9G-Tronic",
    price: 119,
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=80",
    features: ["Burmester Sound", "MBUX Infotainment", "Air Body Control", "Ambient Lighting", "Panoramic Roof", "Heated Seats", "Blind Spot Assist", "Active Brake Assist"]
  },
  {
    id: 6,
    name: "Bentley Continental",
    type: "luxury",
    tag: "Ultra Luxury",
    seats: "4 Seats",
    range: "490 mi",
    speed: "0-60 in 3.6s",
    transmission: "8-Speed",
    price: 349,
    img: "https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=900&q=80",
    features: ["Handcrafted Interior", "Naim Audio", "Diamond Knurling", "Rotating Display", "Massage Seats", "Night Vision", "All-Wheel Drive", "Personal Concierge"]
  },
  {
    id: 7,
    name: "Toyota Corolla",
    type: "economy",
    tag: "Economy",
    seats: "5 Seats",
    range: "380 mi",
    speed: "0-60 in 9.2s",
    transmission: "CVT",
    price: 39,
    img: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=900&q=80",
    features: ["Fuel Efficient", "Apple CarPlay", "Lane Departure Alert", "Backup Camera", "Bluetooth", "USB Charging", "Keyless Entry", "Pre-Collision System"]
  },
  {
    id: 8,
    name: "Audi Q8",
    type: "suv",
    tag: "Luxury SUV",
    seats: "5 Seats",
    range: "430 mi",
    speed: "0-60 in 5.3s",
    transmission: "8-Speed",
    price: 159,
    img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&q=80",
    gallery: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900&q=80",
    features: ["Virtual Cockpit", "Bang & Olufsen Audio", "Air Suspension", "Matrix LED", "Panoramic Sunroof", "Quattro AWD", "MMI Navigation", "Adaptive Cruise Control"]
  }
];

// ===== RENDER CARS =====
function renderCars(filter = "all") {
  const grid = document.getElementById("carsGrid");
  const filtered = filter === "all" ? cars : cars.filter(c => c.type === filter);

  grid.innerHTML = "";
  filtered.forEach((car, i) => {
    const card = document.createElement("div");
    card.className = "car-card reveal";
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="car-card-img-wrapper">
        <img class="car-card-img" src="${car.img}" alt="${car.name}" loading="lazy"/>
        <span class="car-card-tag">${car.tag}</span>
        <button class="car-card-fav" onclick="event.stopPropagation(); this.classList.toggle('active'); this.innerHTML = this.classList.contains('active') ? '<i class=\\"fas fa-heart\\"></i>' : '<i class=\\"far fa-heart\\"></i>'">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="car-card-body">
        <h3 class="car-card-name">${car.name}</h3>
        <p class="car-card-type">${car.type}</p>
        <div class="car-specs">
          <span class="spec"><i class="fas fa-user-friends"></i>${car.seats}</span>
          <span class="spec"><i class="fas fa-gas-pump"></i>${car.range}</span>
          <span class="spec"><i class="fas fa-tachometer-alt"></i>${car.speed}</span>
          <span class="spec"><i class="fas fa-cog"></i>${car.transmission}</span>
        </div>
        <div class="car-card-footer">
          <div class="car-price">
            <span class="price-amount">$${car.price}</span>
            <span class="price-period">/day</span>
          </div>
          <button class="car-card-btn" onclick="openModal(${car.id})">View Details</button>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openModal(car.id));
    grid.appendChild(card);
  });

  observeReveal();
}

// ===== FILTER BUTTONS =====
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderCars(btn.dataset.filter);
  });
});

renderCars();

// ===== MODAL =====
function openModal(id) {
  const car = cars.find(c => c.id === id);
  if (!car) return;

  document.getElementById("modalContent").innerHTML = `
    <img class="modal-img" src="${car.gallery}" alt="${car.name}"/>
    <div class="modal-body">
      <div class="modal-header">
        <div>
          <h2 class="modal-title">${car.name}</h2>
          <p class="modal-subtitle">${car.type} · ${car.tag}</p>
        </div>
        <div>
          <div class="modal-price">$${car.price}<span>/day</span></div>
        </div>
      </div>
      <div class="modal-specs-grid">
        <div class="modal-spec">
          <i class="fas fa-user-friends"></i>
          <strong>${car.seats}</strong>
          <small>Capacity</small>
        </div>
        <div class="modal-spec">
          <i class="fas fa-gas-pump"></i>
          <strong>${car.range}</strong>
          <small>Range</small>
        </div>
        <div class="modal-spec">
          <i class="fas fa-bolt"></i>
          <strong>${car.speed}</strong>
          <small>Acceleration</small>
        </div>
        <div class="modal-spec">
          <i class="fas fa-cog"></i>
          <strong>${car.transmission}</strong>
          <small>Transmission</small>
        </div>
      </div>
      <div class="modal-features">
        <h4>Included Features</h4>
        <ul class="features-list">
          ${car.features.map(f => `<li><i class="fas fa-check-circle"></i>${f}</li>`).join("")}
        </ul>
      </div>
      <a href__="#booking" class="btn btn-primary btn-full" onclick="closeModal()">
        <i class="fas fa-calendar-check"></i> Book This Car
      </a>
    </div>
  `;

  document.getElementById("modalOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modalOverlay").classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalOverlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modalOverlay")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// ===== BOOKING FORM =====
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("bookingForm").classList.add("hidden");
  document.getElementById("bookingSuccess").classList.add("active");
  window.scrollTo({ top: document.getElementById("booking").offsetTop, behavior: "smooth" });
});

// ===== SCROLL REVEAL =====
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// Apply reveal to static sections
document.querySelectorAll(".car-card, .pricing-card, .location-card, .why-card, .info-card").forEach(el => {
  el.classList.add("reveal");
});

observeReveal();

// ===== SET DEFAULT DATES =====
const today = new Date();
const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
const nextWeek = new Date(today); nextWeek.setDate(today.getDate() + 7);

const fmt = d => d.toISOString().split("T")[0];
document.querySelectorAll('input[type="date"]').forEach((input, i) => {
  input.value = i % 2 === 0 ? fmt(tomorrow) : fmt(nextWeek);
  input.min = fmt(today);
});