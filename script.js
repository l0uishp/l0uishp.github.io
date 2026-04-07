/* ============================================================
   PORTFOLIO CYBERSÉCURITÉ — script.js
   ============================================================ */

/* ------------------------------------------------------------
   1. SCROLL PROGRESS BAR
------------------------------------------------------------ */

const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
}, { passive: true });


/* ------------------------------------------------------------
   2. NAVBAR — scroll shrink + active link
------------------------------------------------------------ */

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.navbar a[data-section]');
const sections = document.querySelectorAll('section[id]');

function updateNav() {
  // Navbar background opacity on scroll
  if (window.scrollY > 60) {
    navbar.style.background = 'rgba(7, 9, 15, 0.97)';
  } else {
    navbar.style.background = 'rgba(7, 9, 15, 0.85)';
  }

  // Active link
  let current = '';
  // Si on est en bas de page, forcer la dernière section
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    current = [...sections].at(-1).getAttribute('id');
  } else {
    sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });
  }

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', updateNav, { passive: true });


/* ------------------------------------------------------------
   3. SMOOTH SCROLL
------------------------------------------------------------ */

document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      document.querySelector('.navbar ul')?.classList.remove('open');
    }
  });
});


/* ------------------------------------------------------------
   4. MOBILE MENU TOGGLE
------------------------------------------------------------ */

const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.querySelector('.navbar ul');

navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
});


/* ------------------------------------------------------------
   5. PARTICULES CYBER
------------------------------------------------------------ */

const particlesContainer = document.getElementById('particles');

function createParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  const size = Math.random() * 2.5 + 1;
  p.style.left    = Math.random() * 100 + 'vw';
  p.style.width   = size + 'px';
  p.style.height  = size + 'px';
  p.style.opacity = Math.random() * 0.6 + 0.1;
  p.style.animationDuration = (6 + Math.random() * 10) + 's';
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 16000);
}

setInterval(createParticle, 250);


/* ------------------------------------------------------------
   6. CANVAS HEX BACKGROUND
------------------------------------------------------------ */

const canvas  = document.getElementById('hex-bg');
const ctx     = canvas.getContext('2d');
let hexSize   = 30;
let animFrame;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function drawHex(x, y, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawHexGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(0, 255, 156, 0.8)';
  ctx.lineWidth   = 0.5;

  const w  = hexSize * 2;
  const h  = Math.sqrt(3) * hexSize;
  const cols = Math.ceil(canvas.width  / (w * 0.75)) + 2;
  const rows = Math.ceil(canvas.height / h) + 2;

  for (let col = -1; col < cols; col++) {
    for (let row = -1; row < rows; row++) {
      const x = col * w * 0.75;
      const y = row * h + (col % 2 === 0 ? 0 : h / 2);
      drawHex(x, y, hexSize - 1);
      ctx.stroke();
    }
  }
}

resizeCanvas();
drawHexGrid();

window.addEventListener('resize', () => {
  resizeCanvas();
  drawHexGrid();
});


/* ------------------------------------------------------------
   7. TYPED TEXT EFFECT (hero subtitle)
------------------------------------------------------------ */

const typedEl = document.querySelector('.typed-text');
const phrases = [
  'Junior Cybersecurity Engineer',
  'CTF Player',
  'OSINT Enthusiast',
];

let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingDelay = 100;

function typeEffect() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      typingDelay = 2200; // pause at end
    } else {
      typingDelay = 90 + Math.random() * 40;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50;
    if (charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
      typingDelay  = 300;
    }
  }

  setTimeout(typeEffect, typingDelay);
}

if (typedEl) setTimeout(typeEffect, 800);


/* ------------------------------------------------------------
   8. SKILL BARS — animate on visibility
------------------------------------------------------------ */

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in-section').forEach(el => {
  fadeObserver.observe(el);
});


/* ------------------------------------------------------------
   10. SKILL BARS — animate on visibility
------------------------------------------------------------ */

const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const level = bar.dataset.level || 0;
        bar.style.width = level + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);


/* ------------------------------------------------------------
   11. CARD — effet radial-gradient au survol
------------------------------------------------------------ */

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px,
      rgba(0,255,156,0.08), #0d1117 70%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});