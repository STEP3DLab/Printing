// js/theme_and_canvas.js

// Тема
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('light', savedTheme === 'light');
  themeIcon.textContent = savedTheme === 'light' ? '🌙' : '☀️';
} else {
  themeIcon.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  themeIcon.textContent = isLight ? '🌙' : '☀️';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Canvas-анимация
const canvas = document.getElementById('mouseEffectCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h;
  function resizeCanvas() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particles = [];
  class Particle {
    constructor(x, y, color='243,86,38') {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 8 + 2;
      this.alpha = 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = color;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= 0.01;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
      ctx.fill();
    }
  }

  canvas.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 768) return;
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      particles.push(
        new Particle(e.clientX - rect.left, e.clientY - rect.top, '243,86,38')
      );
    }
  });

  canvas.addEventListener('click', (e) => {
    if (window.innerWidth < 768) return;
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      particles.push(
        new Particle(e.clientX - rect.left, e.clientY - rect.top, '0,200,255')
      );
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
  }
  animate();
}
