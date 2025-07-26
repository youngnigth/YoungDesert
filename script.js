// script.js
window.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList   = document.getElementById('nav-list');

  // Ensure proper ARIA on load
  navToggle.setAttribute('aria-expanded', 'false');

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Smooth scroll for anchor links & auto-close menu
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile menu
      if (navList.classList.contains('show')) {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Auto-close menu on any scroll (up or down)
  let isTicking = false;
  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        if (navList.classList.contains('show')) {
          navList.classList.remove('show');
          navToggle.setAttribute('aria-expanded', 'false');
        }
        isTicking = false;
      });
      isTicking = true;
    }
  });

  // Web3Forms form submission (Option A)
  const form      = document.getElementById('contact-form');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled   = true;
    submitBtn.textContent = 'Sending...';

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        // Redirect on success
        window.location.href = 'thanks-you.html';
        return;
      } else {
        console.error('Web3Forms error:', result);
        alert('⚠️ Oops—something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('⚠️ Network error. Please check your connection and try again.');
    } finally {
      submitBtn.disabled   = false;
      submitBtn.textContent = 'Send Message';
    }
  });

// **Modal** logic:
  const modal           = document.getElementById('pdfModal');
  const closeBtn        = modal.querySelector('.close-button');
  const subscribeForm   = document.getElementById('subscribe-form');
  const downloadSection = document.getElementById('download-section');

  // 1) Show modal shortly after load
  setTimeout(() => modal.classList.add('show'), 500);

  // 2) Close handlers
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));
  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });

  // 3) Subscription form submit
  subscribeForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(subscribeForm);

    try {
      // if you want real data capture, send to Web3Forms:
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const json = await res.json();
      if (json.success) {
        // hide form, show download link
        subscribeForm.style.display   = 'none';
        downloadSection.style.display = 'block';
      } else {
        alert('Oops, something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try later.');
    }
  });
});
