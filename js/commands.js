// All terminal commands. Each is a function receiving {printResult, printRaw, typeResult, clearOutput}.
// Reads from data.js for all content.

import { DATA, AVAILABLE_SECTIONS } from './data.js';
import { getThemes, applyTheme, getCurrentTheme } from './themes.js';
import { getHistory } from './terminal.js';

// Guard: returns true (and prints message) if section is unavailable
function sectionUnavailable(name, ctx) {
  if (AVAILABLE_SECTIONS.has(name)) return false;
  ctx.printResult(`<span class="c-dim">Section "${esc(name)}" is not in the resume.</span>`);
  return true;
}

// --- Helper ---
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function link(url, text) { return `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(text || url)}</a>`; }
function progressBar(pct, width = 20) {
  const filled = Math.round((pct / 100) * width);
  return `<span class="c-green">${'█'.repeat(filled)}</span><span class="c-dim">${'─'.repeat(width - filled)}</span> ${pct}%`;
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// --- Commands ---
export const COMMANDS = {
  help: async ({ printResult }) => {
    // Section commands — only shown if the section exists in the markdown
    const sectionCmds = [
      ['about', 'summary', 'Professional introduction'],
      ['skills', 'skills', 'DevOps tools grouped by category'],
      ['projects', 'projects', 'Featured projects with deployment sim'],
      ['experience', 'experience', 'Career timeline'],
      ['certifications', 'certifications', 'Cloud & DevOps certifications'],
      ['education', 'education', 'Academic background'],
    ];
    const sectionLines = sectionCmds
      .filter(([, section]) => AVAILABLE_SECTIONS.has(section))
      .map(([cmd, , desc]) => `   <span class="c-cyan">${cmd.padEnd(14)}</span> <span class="c-dim">—</span> ${desc}`)
      .join('\n');

    printResult(`<span class="section-header">📋 Available Commands</span>\n\n${sectionLines}
   <span class="c-cyan">resume</span>         <span class="c-dim">—</span> Download resume
   <span class="c-cyan">contact</span>        <span class="c-dim">—</span> Email, GitHub, LinkedIn, social links
   <span class="c-cyan">github</span>         <span class="c-dim">—</span> Open GitHub profile
   <span class="c-cyan">status</span>         <span class="c-dim">—</span> System status dashboard
   <span class="c-cyan">monitor</span>        <span class="c-dim">—</span> Real-time monitoring
   <span class="c-cyan">timeline</span>       <span class="c-dim">—</span> Achievement timeline
   <span class="c-cyan">kubernetes</span>     <span class="c-dim">—</span> Cluster visualization
   <span class="c-cyan">matrix</span>         <span class="c-dim">—</span> Matrix rain animation
   <span class="c-cyan">theme</span>          <span class="c-dim">—</span> Switch terminal theme
   <span class="c-cyan">assistant</span>      <span class="c-dim">—</span> AI portfolio assistant
   <span class="c-cyan">ask "&lt;question&gt;"</span> <span class="c-dim">—</span> Ask about me
   <span class="c-cyan">neofetch</span>       <span class="c-dim">—</span> System info
   <span class="c-cyan">clear</span>          <span class="c-dim">—</span> Clear terminal

   <span class="c-dim">Shell: whoami, pwd, ls, date, hostname, uname -a, echo, history</span>
   <span class="c-dim">Easter eggs: sudo hire-me, fortune, coffee, hack-the-planet</span>`);
  },

  about: async (ctx) => {
    if (sectionUnavailable('summary', ctx)) return;
    const { typeResult } = ctx;
    const d = DATA.personal;
    await typeResult(`<span class="section-header">👤 About Me</span>

  <span class="c-green">Name:</span>         ${esc(d.name)}
  <span class="c-green">Title:</span>        ${esc(d.title)}
  <span class="c-green">Location:</span>     ${esc(d.location)}
  <span class="c-green">Availability:</span> <span class="c-green">● ${esc(d.availability)}</span>

  <span class="c-cyan">"${esc(d.tagline)}"</span>
<div class="indent">${esc(d.summary)}</div>
  <span class="c-green">Primary Stack:</span> ${d.primaryStack.map(s => `<span class="c-cyan">${esc(s)}</span>`).join(' · ')}
  <span class="c-green">Learning:</span>      ${d.learning.map(s => `<span class="c-yellow">${esc(s)}</span>`).join(' · ')}`);
  },

  skills: async (ctx) => {
    if (sectionUnavailable('skills', ctx)) return;
    const { typeResult } = ctx;
    let out = `<span class="section-header">🛠️ Technical Skills</span>\n\n  <span class="c-cyan c-bold">DevOps</span>\n`;
    const cats = Object.entries(DATA.skills);
    for (let i = 0; i < cats.length; i++) {
      const [cat, tools] = cats[i];
      const isLast = i === cats.length - 1;
      const branch = isLast ? '└──' : '├──';
      out += `  <span class="c-dim">${branch}</span> <span class="c-green">${esc(cat)}</span>\n`;
      for (let j = 0; j < tools.length; j++) {
        const prefix = isLast ? '    ' : '│   ';
        const tbranch = j === tools.length - 1 ? '└──' : '├──';
        out += `  <span class="c-dim">${prefix}${tbranch}</span> ${esc(tools[j])}\n`;
      }
    }
    await typeResult(out, 4);
  },

  projects: async (ctx) => {
    if (sectionUnavailable('projects', ctx)) return;
    const { printResult } = ctx;
    for (const proj of DATA.projects) {
      let out = `<span class="section-header">📦 ${esc(proj.name)}</span> <span class="c-dim">(${esc(proj.year)})</span>`;
      out += `<div class="indent">${esc(proj.description)}</div>\n`;

      // Deployment simulation
      const steps = [
        ['Cloning Repository', 'git clone'],
        ['Building Docker Image', 'docker build'],
        ['Running Security Scans', 'trivy scan'],
        ['Deploying to Cluster', 'kubectl apply'],
        ['Health Check', 'curl /healthz'],
      ];
      for (const [label, cmd] of steps) {
        out += `  <span class="c-dim">$</span> <span class="c-cyan">${esc(cmd)}</span> <span class="c-dim">...</span> `;
        out += `<span class="c-green">✓ ${esc(label)}</span>\n`;
      }

      out += `<div class="indent"><span class="c-green">Problem:</span> ${esc(proj.problem)}</div>`;
      out += `  <span class="c-green">Tech:</span>     ${proj.technologies.map(t => `<span class="c-cyan">${esc(t)}</span>`).join(', ')}\n\n`;

      out += `  <span class="c-green">Contributions:</span>\n`;
      for (const c of proj.contributions) {
        out += `<div class="bullet"><span class="c-dim">▸</span> ${esc(c)}</div>`;
      }

      if (proj.github) out += `\n  <span class="c-green">GitHub:</span> ${link(proj.github)}\n`;
      if (proj.demo) out += `  <span class="c-green">Demo:</span>   ${link(proj.demo)}\n`;

      out += `\n<span class="c-dim">─────────────────────────────────────────────</span>\n`;
      printResult(out);
    }
  },

  experience: async (ctx) => {
    if (sectionUnavailable('experience', ctx)) return;
    const { typeResult } = ctx;
    let out = `<span class="section-header">💼 Professional Experience</span>\n`;
    for (const exp of DATA.experience) {
      out += `
  <span class="c-cyan c-bold">${esc(exp.title)}</span> <span class="c-dim">@</span> <span class="c-green">${esc(exp.company)}</span>
  <span class="c-dim">${esc(exp.type)} · ${esc(exp.duration)}</span>

  <span class="c-green">Responsibilities:</span>
`;
      for (const r of exp.responsibilities) {
        out += `<div class="bullet"><span class="c-dim">▸</span> ${esc(r)}</div>`;
      }
      out += `\n  <span class="c-green">Technologies:</span> ${exp.technologies.map(t => `<span class="c-cyan">${esc(t)}</span>`).join(' · ')}\n`;
      out += `\n  <span class="c-green">Key Achievements:</span>\n`;
      for (const a of exp.achievements) {
        out += `    <span class="c-yellow">★</span> ${esc(a)}\n`;
      }
    }
    await typeResult(out, 4);
  },

  certifications: async (ctx) => {
    if (sectionUnavailable('certifications', ctx)) return;
    const { printResult } = ctx;
    let out = `<span class="section-header">🏅 Certifications</span>\n\n`;
    for (const cert of DATA.certifications) {
      const statusColor = cert.status === 'In Progress' ? 'c-yellow' : 'c-green';
      const statusIcon = cert.status === 'In Progress' ? '◐' : '✓';
      out += `  <span class="${statusColor}">${statusIcon}</span> <span class="c-white">${esc(cert.name)}</span>\n`;
      out += `    <span class="c-dim">${esc(cert.org)} · ${esc(cert.year)} · </span><span class="${statusColor}">${esc(cert.status)}</span>\n\n`;
    }
    printResult(out);
  },

  education: async (ctx) => {
    if (sectionUnavailable('education', ctx)) return;
    const { printResult } = ctx;
    const e = DATA.education;
    printResult(`<span class="section-header">🎓 Education</span>

  <span class="c-cyan c-bold">${esc(e.degree)}</span>
  <span class="c-white">${esc(e.college)}</span>
  <span class="c-dim">${esc(e.university)}</span>
  <span class="c-dim">${esc(e.duration)}</span>
  <span class="c-green">CGPA: ${esc(e.cgpa)}</span>`);
  },

  resume: async ({ printResult }) => {
    window.open(DATA.links.resume, '_blank');
    printResult(`<span class="c-green">📄 Opening resume...</span>

  ${link(DATA.links.resume, 'Click here if it didn\'t open automatically')}

  <span class="c-dim">Resume opened in a new tab.</span>`);
  },

  contact: async ({ printResult }) => {
    const l = DATA.links;
    const d = DATA.personal;
    printResult(`<span class="section-header">📬 Contact Information</span>

  <span class="c-green">Email:</span>    ${link('mailto:' + d.email, d.email)}
  <span class="c-green">Phone:</span>    ${esc(d.phone)}
  <span class="c-green">GitHub:</span>   ${link(l.github, 'SatyamSatyarthi007')}
  <span class="c-green">LinkedIn:</span> ${link(l.linkedin, 'Satyam Satyarthi')}
  <span class="c-green">X:</span>        ${link(l.twitter, '@SatyamSaty2108')}

  <span class="c-dim">Feel free to reach out — I'm ${esc(d.availability)}!</span>`);
  },

  github: async ({ printResult }) => {
    window.open(DATA.links.github, '_blank');
    printResult(`<span class="c-green">Opening GitHub profile...</span> ${link(DATA.links.github)}`);
  },

  clear: async ({ clearOutput }) => {
    clearOutput();
  },

  theme: async ({ printResult }, args) => {
    const themes = getThemes();
    if (args && args.length > 0) {
      const name = args.join(' ').toLowerCase();
      if (themes.includes(name)) {
        applyTheme(name);
        printResult(`<span class="c-green">✓ Theme switched to: <span class="c-cyan">${esc(name)}</span></span>`);
      } else {
        printResult(`<span class="c-red">Unknown theme: "${esc(name)}"</span>\n\n  Available: ${themes.map(t => `<span class="c-cyan">${t}</span>`).join(', ')}`);
      }
    } else {
      const current = getCurrentTheme();
      printResult(`<span class="section-header">🎨 Themes</span>\n\n  Current: <span class="c-green">${esc(current)}</span>\n\n  Available:\n${themes.map(t => `    <span class="${t === current ? 'c-green' : 'c-cyan'}">${t === current ? '● ' : '  '}${t}</span>`).join('\n')}\n\n  <span class="c-dim">Usage: theme &lt;name&gt;</span>`);
    }
  },

  // --- Status dashboard ---
  status: async ({ printResult }) => {
    const d = DATA.personal;
    const uptime = getUptime();
    printResult(`<span class="section-header">📊 System Status</span>

  <span class="c-dim">┌──────────────────────────────────────────</span>
  <span class="c-dim">│</span>  <span class="c-green">ROLE</span>        <span class="c-dim">:</span> <span class="c-cyan">${esc(d.title)}</span>
  <span class="c-dim">│</span>  <span class="c-green">NAME</span>        <span class="c-dim">:</span> <span class="c-white">${esc(d.name)}</span>
  <span class="c-dim">│</span>  <span class="c-green">LOCATION</span>    <span class="c-dim">:</span> ${esc(d.location)}
  <span class="c-dim">│</span>  <span class="c-green">STATUS</span>      <span class="c-dim">:</span> <span class="c-green">● ${esc(d.availability)}</span>
  <span class="c-dim">│</span>  <span class="c-green">EXPERIENCE</span>  <span class="c-dim">:</span> ${DATA.experience.length} position(s)
  <span class="c-dim">│</span>  <span class="c-green">UPTIME</span>      <span class="c-dim">:</span> ${uptime}
  <span class="c-dim">│</span>  <span class="c-green">PROJECTS</span>    <span class="c-dim">:</span> ${DATA.projects.length}
  <span class="c-dim">│</span>  <span class="c-green">CERTS</span>       <span class="c-dim">:</span> ${DATA.certifications.length}
  <span class="c-dim">│</span>  <span class="c-green">SKILLS</span>      <span class="c-dim">:</span> ${Object.keys(DATA.skills).length} categories
  <span class="c-dim">└──────────────────────────────────────────</span>

  <span class="c-green">CPU Usage</span>    ${progressBar(45)}
  <span class="c-green">Memory</span>       ${progressBar(62)}
  <span class="c-green">Cloud</span>        <span class="c-green">● AWS Active</span>
  <span class="c-green">Portfolio</span>    <span class="c-green">● ONLINE</span>`);
  },

  monitor: async ({ printResult }) => {
    printResult(`<span class="section-header">📡 Real-Time Monitoring</span>

  <span class="c-green">CPU</span>         ${progressBar(65)}
  <span class="c-green">Memory</span>      ${progressBar(48)}
  <span class="c-green">Disk</span>        ${progressBar(32)}
  <span class="c-green">Network</span>     <span class="c-cyan">1.25 GB/sec</span>

  <span class="c-green">Docker</span>      <span class="c-dim">Running :</span> <span class="c-cyan">8 containers</span>
  <span class="c-green">Pods</span>        <span class="c-dim">Running :</span> <span class="c-cyan">14 pods</span>
  <span class="c-green">Services</span>    <span class="c-dim">Active  :</span> <span class="c-cyan">6 services</span>

  <span class="c-green">Portfolio</span>   <span class="c-green">● ONLINE</span>
  <span class="c-green">Uptime</span>      <span class="c-cyan">${getUptime()}</span>
  <span class="c-green">Last Deploy</span> <span class="c-dim">${new Date().toISOString().split('T')[0]}</span>`);
  },

  timeline: async ({ typeResult }) => {
    await typeResult(`<span class="section-header">📅 Achievement Timeline</span>

  <span class="c-cyan">2022</span>
  <span class="c-dim">  │</span>  Started B.E. (IoT & CSBT) at East Point College
  <span class="c-dim">  │</span>
  <span class="c-dim">  ↓</span>
  <span class="c-cyan">2025</span>
  <span class="c-dim">  │</span>  <span class="c-green">✓</span> Python for Beginners — Udemy
  <span class="c-dim">  │</span>
  <span class="c-dim">  ↓</span>
  <span class="c-cyan">2026</span>
  <span class="c-dim">  │</span>  <span class="c-green">✓</span> DevOps Intern @ JSpiders (Feb–Jul)
  <span class="c-dim">  │</span>  <span class="c-green">✓</span> DevSecOps CI/CD — Netflix Clone
  <span class="c-dim">  │</span>  <span class="c-green">✓</span> Eldercare Connect (IoT + Cloud)
  <span class="c-dim">  │</span>  <span class="c-green">✓</span> Google Cloud Cybersecurity Certificate
  <span class="c-dim">  │</span>  <span class="c-green">✓</span> AWS Networking Basics
  <span class="c-dim">  │</span>  <span class="c-yellow">◐</span> AWS Cloud Practitioner (In Progress)
  <span class="c-dim">  │</span>
  <span class="c-dim">  ↓</span>
  <span class="c-green">NEXT</span>
  <span class="c-dim">  │</span>  <span class="c-cyan">Cloud & DevOps Engineer — Open for Hiring</span>`, 5);
  },

  kubernetes: async ({ printResult }) => {
    printResult(`<span class="section-header">☸️  Kubernetes Cluster Visualization</span>

<span class="c-cyan">                    Cluster</span>
<span class="c-dim">                       │</span>
<span class="c-dim">               ┌───────┴───────┐</span>
<span class="c-dim">               │               │</span>
<span class="c-green">            Master</span>          <span class="c-green">Worker</span>
<span class="c-dim">               │               │</span>
<span class="c-dim">         ┌─────┴─────┐   ┌────┴────┐</span>
<span class="c-dim">         │           │   │         │</span>
<span class="c-cyan">      Pod-1</span>       <span class="c-cyan">Pod-2</span> <span class="c-cyan">Pod-3</span>     <span class="c-cyan">Pod-4</span>
<span class="c-green">      ● Running</span>  <span class="c-green">● Running</span> <span class="c-green">● Running</span> <span class="c-yellow">◐ Scaling</span>

  <span class="c-dim">Deployments: 3   Services: 6   Namespaces: 4</span>
  <span class="c-dim">Replicas: 4/4    Status: Healthy</span>`);
  },

  matrix: async ({ printResult }) => {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas.classList.contains('hidden')) {
      canvas.classList.remove('hidden');
      startMatrix(canvas);
      printResult(`<span class="c-green">Matrix mode: ON</span>  <span class="c-dim">(type 'matrix' again to stop)</span>`);
    } else {
      canvas.classList.add('hidden');
      stopMatrix();
      printResult(`<span class="c-dim">Matrix mode: OFF</span>`);
    }
  },

  assistant: async ({ printResult }) => {
    printResult(`<span class="section-header">🤖 Portfolio Assistant</span>

  Ask me anything! Usage: <span class="c-cyan">ask "&lt;your question&gt;"</span>

  <span class="c-green">Example questions:</span>
    <span class="c-dim">▸</span> ask "Tell me about yourself"
    <span class="c-dim">▸</span> ask "Why should we hire you?"
    <span class="c-dim">▸</span> ask "What is your AWS experience?"
    <span class="c-dim">▸</span> ask "Explain your Kubernetes project"
    <span class="c-dim">▸</span> ask "What are your strongest skills?"
    <span class="c-dim">▸</span> ask "Tell me about your experience"
    <span class="c-dim">▸</span> ask "Describe your Terraform project"

  <span class="c-dim">Responses are based on my actual experience and skills.</span>`);
  },

  // --- Linux shell commands ---
  whoami: async ({ printResult }) => {
    printResult('satyam');
  },

  pwd: async ({ printResult }) => {
    printResult('/home/satyam/portfolio');
  },

  ls: async ({ printResult }) => {
    printResult(`<span class="c-cyan">about/</span>  <span class="c-cyan">skills/</span>  <span class="c-cyan">projects/</span>  <span class="c-cyan">experience/</span>  <span class="c-cyan">certifications/</span>  <span class="c-cyan">contact/</span>  <span class="c-green">resume.pdf</span>  <span class="c-green">README.md</span>`);
  },

  hostname: async ({ printResult }) => {
    printResult('satyam-portfolio');
  },

  date: async ({ printResult }) => {
    printResult(new Date().toString());
  },

  history: async ({ printResult }) => {
    const h = getHistory();
    if (h.length === 0) {
      printResult('<span class="c-dim">No commands in history.</span>');
    } else {
      const lines = h.map((cmd, i) => `  <span class="c-dim">${String(i + 1).padStart(4)}</span>  ${esc(cmd)}`);
      printResult(lines.join('\n'));
    }
  },

  echo: async ({ printResult }, args) => {
    printResult(esc((args || []).join(' ')));
  },

  neofetch: async ({ printResult }) => {
    const d = DATA.personal;
    printResult(`
<span class="c-cyan">       .--.        </span>  <span class="c-green">${esc(d.name)}</span>
<span class="c-cyan">      |o_o |       </span>  <span class="c-dim">──────────────────</span>
<span class="c-cyan">      |:_/ |       </span>  <span class="c-green info-label">OS</span><span class="c-dim">:</span> Portfolio Linux
<span class="c-cyan">     //   \\ \\      </span>  <span class="c-green info-label">Kernel</span><span class="c-dim">:</span> v3.0-devops
<span class="c-cyan">    (|     | )     </span>  <span class="c-green info-label">Shell</span><span class="c-dim">:</span> bash 5.1
<span class="c-cyan">   /'\\_ _/\`\\       </span>  <span class="c-green info-label">Role</span><span class="c-dim">:</span> ${esc(d.title)}
<span class="c-cyan">   \\___)=(___/     </span>  <span class="c-green info-label">Location</span><span class="c-dim">:</span> ${esc(d.location)}
<span class="c-cyan">                   </span>  <span class="c-green info-label">Skills</span><span class="c-dim">:</span> ${d.primaryStack.join(', ')}
<span class="c-cyan">                   </span>  <span class="c-green info-label">Status</span><span class="c-dim">:</span> <span class="c-green">${esc(d.availability)}</span>
<span class="c-cyan">                   </span>  <span class="c-green info-label">Uptime</span><span class="c-dim">:</span> ${getUptime()}`);
  },

  // --- Easter eggs ---
  'sudo hire-me': async ({ typeResult }) => {
    await typeResult(`
<span class="c-green c-bold">  ╔══════════════════════════════════════╗
  ║        ACCESS GRANTED                ║
  ╚══════════════════════════════════════╝</span>

  <span class="c-cyan c-bold">Reasons to Hire ${esc(DATA.personal.name)}:</span>

  <span class="c-green">✓</span> Problem Solver — 83% env setup reduction
  <span class="c-green">✓</span> Automation Enthusiast — CI/CD everywhere
  <span class="c-green">✓</span> Cloud Native — AWS, Docker, Kubernetes
  <span class="c-green">✓</span> Security-First — SonarQube, Trivy, OWASP
  <span class="c-green">✓</span> Fast Learner — CyberSecurity, new certs
  <span class="c-green">✓</span> Team Player — Agile/Scrum experience

  <span class="c-yellow">📄 Downloading resume...</span>`, 10);

    setTimeout(() => window.open(DATA.links.resume, '_blank'), 1500);
  },

  fortune: async ({ printResult }) => {
    const f = DATA.fortunes;
    printResult(`<span class="c-yellow">${esc(f[Math.floor(Math.random() * f.length)])}</span>`);
  },

  coffee: async ({ printResult }) => {
    printResult(`<span class="c-yellow">
      ( (
       ) )
    .______.
    |      |]
    \\      /
     \`----'

  Here's your coffee! ☕
  Now get back to reviewing my portfolio 😄</span>`);
  },

  'sudo make-me-coffee': async ({ printResult }) => {
    printResult(`<span class="c-red">[sudo] password for recruiter: ****</span>
<span class="c-green">Brewing coffee... ☕</span>
<span class="c-yellow">Error: Coffee machine not found in Kubernetes cluster.</span>
<span class="c-dim">Suggestion: Try 'coffee' instead.</span>`);
  },

  'hack-the-planet': async ({ typeResult }) => {
    await typeResult(`<span class="c-green">
  ██░ ACCESSING MAINFRAME ░██

  [████████████████████] 100%

  <span class="c-cyan">SYSTEM COMPROMISED</span>

  Just kidding! 😄
  But seriously, check out my projects.
  Type <span class="c-cyan">'projects'</span> to see what I've built.</span>`, 15);
  },
};

// --- Ask command (pattern-matched) ---
function handleAsk(question, ctx) {
  const q = question.toLowerCase();
  const responses = DATA.assistantResponses;

  for (const [keyword, response] of Object.entries(responses)) {
    if (q.includes(keyword)) {
      ctx.typeResult(`<span class="c-cyan">🤖 Assistant:</span>\n\n  ${response.replace(/\n/g, '\n  ')}`);
      return;
    }
  }

  ctx.printResult(`<span class="c-yellow">🤖 I don't have a specific answer for that.</span>

  Try asking about:
  <span class="c-dim">▸</span> yourself, hire, kubernetes, aws, terraform, skills, experience, project

  <span class="c-dim">Or type 'assistant' for example questions.</span>`);
}

// --- Uname ---
function handleUname(args, ctx) {
  if (args.includes('-a') || args.includes('--all')) {
    ctx.printResult('Portfolio Linux satyam-portfolio 3.0.0-devops #1 SMP x86_64 GNU/Linux');
  } else {
    ctx.printResult('Portfolio Linux');
  }
}

// --- Command dispatcher ---
export async function executeCommand(rawInput, ctx) {
  const trimmed = rawInput.trim();

  // Handle 'sudo hire-me' as a special case (multi-word)
  const lowerTrimmed = trimmed.toLowerCase();
  if (lowerTrimmed === 'sudo hire-me') {
    return COMMANDS['sudo hire-me'](ctx);
  }
  if (lowerTrimmed === 'sudo make-me-coffee') {
    return COMMANDS['sudo make-me-coffee'](ctx);
  }
  if (lowerTrimmed === 'hack-the-planet') {
    return COMMANDS['hack-the-planet'](ctx);
  }

  // Parse command and args
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Handle 'ask' command
  if (cmd === 'ask') {
    const match = trimmed.match(/^ask\s+["'](.+?)["']\s*$/i) || trimmed.match(/^ask\s+(.+)$/i);
    if (match) {
      return handleAsk(match[1], ctx);
    }
    ctx.printResult(`<span class="c-dim">Usage: ask "your question"</span>`);
    return;
  }

  // Handle 'uname'
  if (cmd === 'uname') {
    return handleUname(args, ctx);
  }

  // Handle 'theme' with args
  if (cmd === 'theme') {
    return COMMANDS.theme(ctx, args);
  }

  // Handle 'echo' with args
  if (cmd === 'echo') {
    return COMMANDS.echo(ctx, args);
  }

  // Handle 'github stats'
  if (cmd === 'github' && args[0] === 'stats') {
    return fetchGithubStats(ctx);
  }

  // Standard commands
  if (COMMANDS[cmd]) {
    return COMMANDS[cmd](ctx);
  }

  // Unknown command
  ctx.printResult(`<span class="c-red">Command not found: ${esc(cmd)}</span>
<span class="c-dim">Type 'help' to see available commands.</span>`);
}

// --- GitHub stats (public API, no auth) ---
async function fetchGithubStats(ctx) {
  ctx.printResult(`<span class="c-dim">Fetching GitHub stats...</span>`);
  try {
    const res = await fetch('https://api.github.com/users/SatyamSatyarthi007');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const user = await res.json();

    ctx.printResult(`<span class="section-header">🐙 GitHub Stats — ${esc(user.login)}</span>

  <span class="c-green">Public Repos:</span>  <span class="c-cyan">${user.public_repos}</span>
  <span class="c-green">Followers:</span>     <span class="c-cyan">${user.followers}</span>
  <span class="c-green">Following:</span>     <span class="c-cyan">${user.following}</span>
  <span class="c-green">Created:</span>       <span class="c-dim">${new Date(user.created_at).toLocaleDateString()}</span>
  <span class="c-green">Profile:</span>       ${link(user.html_url)}

  <span class="c-dim">Public API — rate limited to 60 req/hr.</span>`);
  } catch (e) {
    ctx.printResult(`<span class="c-red">Failed to fetch GitHub stats: ${esc(e.message)}</span>
<span class="c-dim">Try visiting: </span>${link(DATA.links.github)}`);
  }
}

// --- Matrix rain ---
let matrixInterval = null;
function startMatrix(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF';
  const fontSize = 14;
  const cols = Math.floor(canvas.width / fontSize);
  const drops = Array(cols).fill(1);

  matrixInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 35);
}

function stopMatrix() {
  clearInterval(matrixInterval);
  matrixInterval = null;
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// --- Uptime helper ---
const startTime = Date.now();
function getUptime() {
  const diff = Date.now() - startTime;
  const s = Math.floor(diff / 1000) % 60;
  const m = Math.floor(diff / 60000) % 60;
  const h = Math.floor(diff / 3600000);
  return `${h}h ${m}m ${s}s`;
}
