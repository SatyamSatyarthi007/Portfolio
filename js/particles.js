// Canvas particle background — floating dots + network lines
// ponytail: scales particle count with screen size for perf

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
let animId = null;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
}

function initParticles() {
  const area = canvas.width * canvas.height;
  // ~1 particle per 15000px² — keeps it subtle
  const count = Math.min(Math.floor(area / 15000), 80);
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
  }));
}

function getColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    dot: style.getPropertyValue('--particle-color').trim() || 'rgba(0,212,255,0.3)',
    line: style.getPropertyValue('--particle-line').trim() || 'rgba(0,212,255,0.08)',
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { dot, line } = getColors();
  const maxDist = 120;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Move
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    // Draw dot
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = dot;
    ctx.fill();

    // Draw lines to nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = line;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  animId = requestAnimationFrame(draw);
}

export function startParticles() {
  resize();
  window.addEventListener('resize', resize);
  draw();
}

export function stopParticles() {
  cancelAnimationFrame(animId);
  window.removeEventListener('resize', resize);
}
