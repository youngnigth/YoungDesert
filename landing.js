// script.js
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');
navToggle.addEventListener('click', () => { navList.classList.toggle('show'); });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); }); });

// Countdown Timer
(function() {
  const countdownEl = document.getElementById('countdown');
  const releaseDate = new Date('2026-06-01T00:00:00');
  function updateCountdown() {
    const now = new Date();
    const diff = releaseDate - now;
    if (diff <= 0) { countdownEl.textContent = "Now Available!"; clearInterval(interval); return; }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
})();

// Scroll animation trigger
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); }); });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Social share
function share(platform) { const url = encodeURIComponent(window.location.href); const text = encodeURIComponent("Pre-order 'Echoes of Tomorrow' now!"); let shareUrl = ''; switch(platform) { case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break; case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`; break; case 'linkedin': shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`; break; } window.open(shareUrl, '_blank'); }

// Carousel functionality
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
let currentIndex = 0;
const items = Array.from(track.children);
const itemWidth = items[0].getBoundingClientRect().width + parseInt(getComputedStyle(items[0]).marginRight);

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateCarousel();
});
nextBtn.addEventListener('click', () => {
  if (currentIndex < items.length - 1) currentIndex++;
  updateCarousel();
});

