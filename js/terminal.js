// Terminal engine — input handling, history, autocomplete, typing animation, output

import { executeCommand, COMMANDS } from './commands.js';
import { AVAILABLE_SECTIONS } from './data.js';

const outputEl  = document.getElementById('output');
const inputEl   = document.getElementById('command-input');
const termEl    = document.getElementById('terminal');
const cursorEl  = document.querySelector('.cursor');

let history = [];
let historyIndex = -1;
let typingInProgress = false;

// Ordered command names for autocomplete
const cmdNames = Object.keys(COMMANDS).sort();

// --- Cursor position tracking ---
function updateCursorPosition() {
  if (!cursorEl || !inputEl) return;
  // Measure text width to position cursor
  const measure = document.createElement('span');
  measure.style.cssText = `
    font-family: inherit; font-size: inherit; visibility: hidden;
    position: absolute; white-space: pre;
  `;
  measure.textContent = inputEl.value.substring(0, inputEl.selectionStart);
  inputEl.parentElement.appendChild(measure);
  cursorEl.style.left = measure.offsetWidth + 'px';
  measure.remove();
}

// --- Output ---
function scrollToBottom() {
  termEl.scrollTop = termEl.scrollHeight;
}

export function printRaw(html) {
  const div = document.createElement('div');
  div.className = 'output-block';
  div.innerHTML = html;
  outputEl.appendChild(div);
  scrollToBottom();
}

export function printCommand(cmd) {
  const div = document.createElement('div');
  div.className = 'output-block';
  div.innerHTML = `<div class="cmd-echo"><span class="prompt"><span class="prompt-user">satyam</span><span class="prompt-at">@</span><span class="prompt-host">portfolio</span><span class="prompt-colon">:</span><span class="prompt-path">~</span><span class="prompt-dollar">$</span></span> ${escapeHtml(cmd)}</div>`;
  outputEl.appendChild(div);
  scrollToBottom();
}

export function printResult(html) {
  const div = document.createElement('div');
  div.className = 'output-block';
  div.innerHTML = `<div class="cmd-result">${html}</div>`;
  outputEl.appendChild(div);
  scrollToBottom();
}

// Typing animation for output
export async function typeResult(html, speed = 8) {
  typingInProgress = true;
  const div = document.createElement('div');
  div.className = 'output-block';
  const result = document.createElement('div');
  result.className = 'cmd-result';
  div.appendChild(result);
  outputEl.appendChild(div);

  // Parse HTML into nodes and type them out
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const text = temp.textContent || '';

  // For performance, type the plain text char by char, then swap in full HTML
  for (let i = 0; i < text.length; i++) {
    if (!typingInProgress) break; // Allow interruption
    result.textContent = text.substring(0, i + 1);
    scrollToBottom();
    if (text[i] === '\n') {
      await sleep(speed * 3);
    } else {
      await sleep(speed);
    }
  }

  // Replace with full HTML (preserves colors/links)
  result.innerHTML = html;
  typingInProgress = false;
  scrollToBottom();
}

export function clearOutput() {
  outputEl.innerHTML = '';
}

// --- Command execution ---
async function handleCommand(rawInput) {
  const input = rawInput.trim();
  if (!input) return;

  history.push(input);
  historyIndex = history.length;

  printCommand(input);
  inputEl.value = '';
  updateCursorPosition();

  // Disable input during execution
  inputEl.disabled = true;

  try {
    await executeCommand(input, { printResult, printRaw, typeResult, clearOutput });
  } catch (e) {
    printResult(`<span class="c-red">Error: ${escapeHtml(e.message)}</span>`);
  }

  inputEl.disabled = false;
  inputEl.focus();
  scrollToBottom();
}

// --- Autocomplete ---
function autocomplete(partial) {
  if (!partial) return null;
  const lower = partial.toLowerCase();
  return cmdNames.find(c => c.startsWith(lower));
}

// --- Key handling ---
function onKeyDown(e) {
  if (typingInProgress && e.key === 'Escape') {
    typingInProgress = false; // Skip typing animation
    return;
  }

  if (e.key === 'Enter') {
    e.preventDefault();
    handleCommand(inputEl.value);
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      inputEl.value = history[historyIndex];
      updateCursorPosition();
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < history.length - 1) {
      historyIndex++;
      inputEl.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      inputEl.value = '';
    }
    updateCursorPosition();
    return;
  }

  if (e.key === 'Tab') {
    e.preventDefault();
    const match = autocomplete(inputEl.value);
    if (match) {
      inputEl.value = match;
      updateCursorPosition();
    }
    return;
  }

  if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault();
    clearOutput();
    return;
  }
}

// --- Init ---
export function initTerminal() {
  inputEl.addEventListener('keydown', onKeyDown);
  inputEl.addEventListener('input', updateCursorPosition);
  inputEl.addEventListener('keyup', updateCursorPosition);
  inputEl.addEventListener('focus', updateCursorPosition);

  // Click anywhere in terminal focuses input
  termEl.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
      inputEl.focus();
    }
  });

  // Suggested command buttons
  const cmdToSection = { about: 'summary', skills: 'skills', projects: 'projects', experience: 'experience' };
  document.querySelectorAll('.cmd-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      inputEl.value = cmd;
      handleCommand(cmd);
    });
    // Hide buttons for sections missing from the markdown
    const section = cmdToSection[btn.dataset.cmd];
    if (section && !AVAILABLE_SECTIONS.has(section)) btn.style.display = 'none';
  });

  updateCursorPosition();
  inputEl.focus();

  // Show welcome
  printResult(`<span class="c-cyan">Welcome, Recruiter!</span>

Type <span class="c-green">'help'</span> to see available commands, or click a command below.
`);
}

export function getHistory() { return [...history]; }

// --- Helpers ---
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
