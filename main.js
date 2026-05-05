/* ============================================================
   DJ RAYVON – main.js
   Features: sticky nav, mobile menu, media tabs,
             gallery filter, booking form validation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── STICKY NAVBAR ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── MOBILE NAV TOGGLE ─────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded',
        navLinks.classList.contains('open'));
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ── MEDIA TABS ────────────────────────────────────────────
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.media-tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });

  // ── GALLERY FILTER ────────────────────────────────────────
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ── BOOKING FORM VALIDATION ────────────────────────────────
  const form = document.getElementById('bookingForm');
  if (form) {
    const fields = {
      name:      { el: document.getElementById('name'),      err: document.getElementById('nameError'),  msg: 'Please enter your full name.' },
      email:     { el: document.getElementById('email'),     err: document.getElementById('emailError'), msg: 'Please enter a valid email address.' },
      eventDate: { el: document.getElementById('eventDate'), err: document.getElementById('dateError'),  msg: 'Please select your event date.' },
      eventType: { el: document.getElementById('eventType'), err: document.getElementById('typeError'),  msg: 'Please select an event type.' },
      message:   { el: document.getElementById('message'),   err: document.getElementById('msgError'),   msg: 'Please include a message or event details.' },
    };

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function clearErrors() {
      Object.values(fields).forEach(f => {
        f.err.textContent = '';
        f.el.classList.remove('error');
      });
    }

    function validateForm() {
      clearErrors();
      let valid = true;

      if (!fields.name.el.value.trim()) {
        fields.name.err.textContent = fields.name.msg;
        fields.name.el.classList.add('error');
        valid = false;
      }
      if (!validateEmail(fields.email.el.value.trim())) {
        fields.email.err.textContent = fields.email.msg;
        fields.email.el.classList.add('error');
        valid = false;
      }
      if (!fields.eventDate.el.value) {
        fields.eventDate.err.textContent = fields.eventDate.msg;
        fields.eventDate.el.classList.add('error');
        valid = false;
      }
      if (!fields.eventType.el.value) {
        fields.eventType.err.textContent = fields.eventType.msg;
        fields.eventType.el.classList.add('error');
        valid = false;
      }
      if (!fields.message.el.value.trim()) {
        fields.message.err.textContent = fields.message.msg;
        fields.message.el.classList.add('error');
        valid = false;
      }
      return valid;
    }

    // Real-time clearing of individual field errors
    Object.values(fields).forEach(f => {
      f.el.addEventListener('input', () => {
        f.err.textContent = '';
        f.el.classList.remove('error');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      // Show success (in production this would POST to Formspree)
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('successMsg').style.display = 'block';
      }, 1000);
    });
  }

});
