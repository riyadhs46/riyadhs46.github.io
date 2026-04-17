// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) navbar.classList.add('scrolled');
    else if (!navbar.classList.contains('force-scrolled')) navbar.classList.remove('scrolled');
  });
}

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
  });
}

// ── HERO SLIDER ──
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function goSlide(n) {
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  currentSlide = n;
  if (slides[n]) slides[n].classList.add('active');
  if (dots[n]) dots[n].classList.add('active');
}

if (slides.length) {
  setInterval(() => goSlide((currentSlide + 1) % slides.length), 4000);
}

// ── GALLERY FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.g-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    galleryItems.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) item.classList.remove('hidden');
      else item.classList.add('hidden');
    });
  });
});

// ── LIGHTBOX ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxLabel = document.getElementById('lightboxLabel');

function openLightbox(el) {
  const img = el.querySelector('img');
  const label = el.querySelector('.g-label');
  lightboxImg.src = img.src;
  lightboxLabel.textContent = label ? label.textContent : '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ── CONTACT FORM ──
function submitContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';
}

// ── RESERVATION ──
let selectedRoom = null;
const rooms = {
  ocean: { name: 'Ocean Breeze Suite', price: 320, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80' },
  palm:  { name: 'Palm Garden Villa',  price: 480, img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=600&q=80' },
  coral: { name: 'Coral Lagoon Room',  price: 210, img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80' }
};

function selectRoom(el) {
  document.querySelectorAll('.room-card.selectable').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedRoom = el.dataset.id;
  updateTotal();
}

function updateTotal() {
  const ci = document.getElementById('checkIn');
  const co = document.getElementById('checkOut');
  const totalBar = document.getElementById('totalBar');
  const stepHint = document.getElementById('stepHint');
  if (!ci || !co) return;
  if (selectedRoom && ci.value && co.value) {
    const nights = Math.max(1, Math.ceil((new Date(co.value) - new Date(ci.value)) / 86400000));
    const total = rooms[selectedRoom].price * nights;
    document.getElementById('nightsLabel').textContent = nights + ' night' + (nights > 1 ? 's' : '');
    document.getElementById('totalLabel').textContent = '$' + total;
    totalBar.style.display = 'flex';
    if (stepHint) stepHint.style.display = 'none';
  } else {
    totalBar.style.display = 'none';
    if (stepHint) stepHint.style.display = 'block';
  }
}

['checkIn','checkOut'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', updateTotal);
});

function goStep(n) {
  if (n === 1 && (!selectedRoom || !document.getElementById('checkIn')?.value || !document.getElementById('checkOut')?.value)) return;
  if (n === 2) buildSummary();
  [0,1,2].forEach(i => {
    const page = document.getElementById('page' + i);
    const step = document.getElementById('step-' + i);
    if (page) page.style.display = i === n ? (i === 0 ? 'block' : 'block') : 'none';
    if (step) { step.classList.toggle('active', i === n); }
  });
}

function buildSummary() {
  const room = rooms[selectedRoom];
  const ci = document.getElementById('checkIn').value;
  const co = document.getElementById('checkOut').value;
  const nights = Math.max(1, Math.ceil((new Date(co) - new Date(ci)) / 86400000));
  const total = room.price * nights;
  const fn = document.getElementById('firstName')?.value || '';
  const ln = document.getElementById('lastName')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const guests = document.getElementById('guests')?.value || '2';

  document.getElementById('summaryRoom').innerHTML = `
    <img src="${room.img}" alt="${room.name}"/>
    <div><h4>${room.name}</h4><div class="stars">★★★★★</div></div>`;

  document.getElementById('summaryRows').innerHTML = `
    <div class="summary-row"><span>Guest</span><span>${fn} ${ln}</span></div>
    <div class="summary-row"><span>Email</span><span>${email}</span></div>
    <div class="summary-row"><span>Check In</span><span>${ci}</span></div>
    <div class="summary-row"><span>Check Out</span><span>${co}</span></div>
    <div class="summary-row"><span>Guests</span><span>${guests}</span></div>
    <div class="summary-row"><span>Nights</span><span>${nights}</span></div>
    <div class="summary-row"><span>Rate/night</span><span>$${room.price}</span></div>
    <div class="summary-row total"><span>Total</span><span>$${total}</span></div>`;
}

function confirmBooking() {
  const room = rooms[selectedRoom];
  const ci = document.getElementById('checkIn').value;
  const co = document.getElementById('checkOut').value;
  const nights = Math.max(1, Math.ceil((new Date(co) - new Date(ci)) / 86400000));

  document.getElementById('confirmedDetails').innerHTML = `
    <div class="summary-row"><span>Room</span><span>${room.name}</span></div>
    <div class="summary-row"><span>Check In</span><span>${ci}</span></div>
    <div class="summary-row"><span>Check Out</span><span>${co}</span></div>
    <div class="summary-row total"><span>Total</span><span>$${room.price * nights}</span></div>`;

  [0,1,2].forEach(i => { const p = document.getElementById('page'+i); if(p) p.style.display='none'; });
  document.getElementById('pageConfirmed').style.display = 'block';
  document.getElementById('steps').style.display = 'none';
}