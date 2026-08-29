// Entry point — boot sequence, then init terminal + particles + theme

import { startParticles } from './particles.js';
import { initTheme } from './themes.js';
import { initTerminal } from './terminal.js';
import { loadResumeData, AVAILABLE_SECTIONS } from './data.js';

const bootScreen    = document.getElementById('boot-screen');
const bootOutput    = document.getElementById('boot-output');
const skipBtn       = document.getElementById('skip-boot');
const termContainer = document.getElementById('terminal-container');

let skipBoot = false;

// --- Boot sequence messages ---
const bootLines = [
  { text: '$ sudo boot-portfolio.sh', cls: 'boot-cmd', delay: 140 },
  { text: '', delay: 105 },
  { text: '[ OK ] Initializing Portfolio Kernel v3.0...', cls: 'boot-ok', delay: 175 },
  { text: '[ OK ] Loading Skills Database...', cls: 'boot-ok', delay: 140 },
  { text: '[ OK ] Mounting Cloud Services (AWS, Docker, K8s)...', cls: 'boot-ok', delay: 155 },
  { text: '[ OK ] Fetching DevOps Projects...', cls: 'boot-ok', delay: 120 },
  { text: '[ OK ] Initializing CI/CD Pipelines...', cls: 'boot-ok', delay: 140 },
  { text: '[ OK ] Loading Certifications...', cls: 'boot-ok', delay: 105 },
  { text: '[ OK ] Starting Monitoring Services (Prometheus, Grafana)...', cls: 'boot-ok', delay: 155 },
  { text: '[ OK ] Security Scan Complete — All Clear.', cls: 'boot-ok', delay: 120 },
  { text: '[ OK ] Starting Portfolio Services...', cls: 'boot-ok', delay: 140 },
  { text: '', delay: 70 },
  { text: '[ OK ] Recruiter Access Granted.', cls: 'boot-yellow', delay: 175 },
  { text: '', delay: 105 },
  { text: 'Welcome to Satyam\'s Portfolio Terminal!', cls: 'boot-white', delay: 210 },
  { text: 'Type \'help\' to begin exploring.', cls: 'boot-cmd', delay: 0 },
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runBoot() {
  for (const line of bootLines) {
    if (skipBoot) break;

    const span = document.createElement('div');
    if (line.cls) span.className = line.cls;

    // Type out text char by char for realism
    bootOutput.appendChild(span);
    for (const char of line.text) {
      if (skipBoot) { span.textContent = line.text; break; }
      span.textContent += char;
      await sleep(3);
    }

    if (!skipBoot && line.delay > 0) {
      await sleep(line.delay);
    }
  }

  // Transition to terminal
  await sleep(skipBoot ? 0 : 300);
  bootScreen.classList.add('fade-out');
  await sleep(300);
  bootScreen.classList.add('hidden');
  termContainer.classList.remove('hidden');
  // Trigger reflow, then add visible class
  void termContainer.offsetHeight;
  termContainer.classList.add('visible');
}

function handleSkip() {
  skipBoot = true;
}

// --- Init ---
function init() {
  loadResumeData().finally(() => initializePortfolio());
}

function initializePortfolio() {
  initTheme();
  startParticles();

  // Skip boot if already seen this session
  const hasSeen = localStorage.getItem('portfolio-boot-seen');

  skipBtn.addEventListener('click', handleSkip);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') handleSkip();
  });

  if (hasSeen) {
    // Skip boot entirely
    bootScreen.classList.add('hidden');
    termContainer.classList.remove('hidden');
    termContainer.classList.add('visible');
    initTerminal();
  } else {
    runBoot().then(() => {
      localStorage.setItem('portfolio-boot-seen', '1');
      initTerminal();
    });
  }

  // ponytail: poll every 3s, re-parse a ~4KB file — negligible; swap to hash-compare if file grows
  const cmdToSection = { about: 'summary', skills: 'skills', projects: 'projects', experience: 'experience' };
  setInterval(async () => {
    await loadResumeData();
    document.querySelectorAll('.cmd-btn').forEach(btn => {
      const section = cmdToSection[btn.dataset.cmd];
      if (section) btn.style.display = AVAILABLE_SECTIONS.has(section) ? '' : 'none';
    });
  }, 3000);
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
