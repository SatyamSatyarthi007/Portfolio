<div align="center">

```
 ____        _                           ____        _                   _   _     _
/ ___|  __ _| |_ _   _  __ _ _ __ ___  / ___|  __ _| |_ _   _  __ _ _ | |_| |__ (_)
\___ \ / _` | __| | | |/ _` | '_ ` _ \ \___ \ / _` | __| | | |/ _` | '__| __| '_ \| |
 ___) | (_| | |_| |_| | (_| | | | | | | ___) | (_| | |_| |_| | (_| | |  | |_| | | | |
|____/ \__,_|\__|\__, |\__,_|_| |_| |_||____/ \__,_|\__|\__, |\__,_|_|   \__|_| |_|_|
                 |___/                                   |___/
```

# ⚡ Interactive Terminal Portfolio

**A fully interactive Linux terminal experience in your browser.**<br>
Type commands. Explore my career. Hire me.

[![Deploy](https://img.shields.io/badge/Deployed%20on-Vercel-000?style=for-the-badge&logo=vercel)](https://portfolio-satyamsatyarthi007.vercel.app)
[![Made With](https://img.shields.io/badge/Made%20With-Vanilla%20JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

</div>

---

## 🖥️ What Is This?

Not your average portfolio. This is a **fully functional Linux terminal** running in the browser — complete with a boot sequence, particle backgrounds, scanline effects, and 9 color themes. No frameworks. No dependencies. Just HTML, CSS, and vanilla JavaScript.

```bash
satyam@portfolio:~$ help
```

## ✨ Features

| Feature | Description |
|---|---|
| 🐧 **Boot Sequence** | Realistic Linux boot animation with skip option |
| 💻 **20+ Commands** | `about`, `skills`, `projects`, `experience`, `neofetch`, `kubernetes`, and more |
| 🎨 **9 Themes** | `dark` · `hacker` · `matrix` · `ubuntu` · `cyberpunk` · `dracula` · `nord` · `light` · `solarized` |
| 🤖 **AI Assistant** | `ask "why should we hire you?"` — keyword-matched Q&A |
| 📦 **Deployment Sim** | Projects render a live `docker build → kubectl apply` animation |
| ☸️ **K8s Visualizer** | ASCII Kubernetes cluster diagram |
| 🟢 **Matrix Rain** | Toggle full-screen Matrix animation |
| ⌨️ **Shell Emulation** | `whoami`, `pwd`, `ls`, `uname -a`, `history`, `echo` |
| 🥚 **Easter Eggs** | `sudo hire-me`, `fortune`, `coffee`, `hack-the-planet` |
| 📱 **Mobile-Ready** | Tap-friendly command buttons for touch devices |
| 📄 **Resume Sync** | Reads from a markdown resume file — edit once, portfolio updates |

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/SatyamSatyarthi007/Portfolio.git
cd Portfolio

# Serve (any static server works)
npx -y serve .
```

Open `http://localhost:3000` and start typing.

## 📂 Project Structure

```
Portfolio/
├── index.html                          # Shell — terminal UI
├── css/style.css                       # All styles + 9 theme definitions
├── js/
│   ├── main.js                         # Boot sequence + init
│   ├── terminal.js                     # Input handling, history, tab-complete
│   ├── commands.js                     # All 20+ command implementations
│   ├── data.js                         # Single source of truth for content
│   ├── themes.js                       # Theme switching (CSS custom props)
│   └── particles.js                    # Canvas particle background
├── Satyam_Satyarthi_Resume_Updated_.md # Resume (parsed at runtime)
└── vercel.json                         # Deployment config
```

## 🛠️ Commands Reference

```
 COMMAND          DESCRIPTION
 ─────────────────────────────────────────────
 about            Professional introduction
 skills           DevOps tools (tree view)
 projects         Featured projects + deploy sim
 experience       Career timeline
 certifications   Cloud & DevOps certs
 education        Academic background
 resume           Download resume (Google Drive)
 contact          Email, GitHub, LinkedIn, X
 github           Open GitHub profile
 github stats     Fetch live GitHub API stats
 status           System status dashboard
 monitor          Real-time monitoring panel
 timeline         Achievement timeline
 kubernetes       ASCII cluster visualization
 matrix           Toggle Matrix rain animation
 theme <name>     Switch terminal theme
 assistant        AI assistant usage guide
 ask "<question>" Ask about me (keyword-matched)
 neofetch         System info à la neofetch
 clear            Clear terminal
 ─────────────────────────────────────────────
 SHELL: whoami, pwd, ls, date, hostname,
        uname -a, echo, history
 EGGS:  sudo hire-me, fortune, coffee,
        hack-the-planet, sudo make-me-coffee
```

## 🎨 Themes

Switch anytime with `theme <name>`:

| Theme | Vibe |
|---|---|
| `dark` | Default — clean dark terminal |
| `hacker` | Green-on-black retro |
| `matrix` | Full Matrix aesthetic |
| `ubuntu` | Ubuntu terminal colors |
| `cyberpunk` | Neon pink/cyan |
| `dracula` | Dracula color scheme |
| `nord` | Arctic, muted palette |
| `light` | Light mode |
| `solarized` | Solarized color scheme |

## 🧰 Tech Stack

- **Zero dependencies** — no npm, no build step, no framework
- **Vanilla JS** (ES modules)
- **CSS custom properties** for theming
- **Canvas API** for particles + Matrix rain
- **Fira Code** + **Inter** from Google Fonts
- **Deployed on Vercel**

## 👤 About Me

**Satyam Satyarthi** — Cloud & DevOps Engineer based in Bengaluru, India.

Building CI/CD pipelines, containerizing apps, orchestrating with Kubernetes, and deploying secure cloud infrastructure on AWS with Terraform.

> *"Automating Infrastructure, One Pipeline at a Time"*

**Currently:** Open for Hiring

---

<div align="center">

**[📧 Email](mailto:satyamsatyarthi007@gmail.com)** · **[💼 LinkedIn](https://www.linkedin.com/in/satyam-satyarthi-shukla-093130277/)** · **[🐙 GitHub](https://github.com/SatyamSatyarthi007)** · **[𝕏 Twitter](https://x.com/SatyamSaty2108)**

```
satyam@portfolio:~$ sudo hire-me
[sudo] ACCESS GRANTED ✓
```

</div>
