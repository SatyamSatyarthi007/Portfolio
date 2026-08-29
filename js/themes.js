// Theme switching — CSS custom properties via data-theme on <html>

const THEMES = ['dark', 'hacker', 'matrix', 'ubuntu', 'cyberpunk', 'dracula', 'nord', 'light', 'solarized'];

export function getThemes() { return THEMES; }

export function getCurrentTheme() {
  return localStorage.getItem('portfolio-theme') || 'dark';
}

export function applyTheme(name) {
  const theme = THEMES.includes(name) ? name : 'dark';
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  localStorage.setItem('portfolio-theme', theme);
  return theme;
}

export function initTheme() {
  applyTheme(getCurrentTheme());
}
