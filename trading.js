/* trading.js */
// Mobile nav toggle
const trToggle = document.getElementById('tr-toggle');
const trList   = document.getElementById('tr-list');
trToggle.addEventListener('click',()=>trList.classList.toggle('show'));

// Smooth scroll
document.querySelectorAll('.tr-list a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{e.preventDefault();document.querySelector(link.getAttribute('href')).scrollIntoView({behavior:'smooth'});});
});
