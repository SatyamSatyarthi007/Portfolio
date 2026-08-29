// Single source of truth for all portfolio content.
// Edit this file to update the portfolio — every command reads from here.

// Tracks which sections were found in the markdown file.
// Commands check this before rendering — missing sections are hidden.
export const AVAILABLE_SECTIONS = new Set();

export const DATA = {
  personal: {
    name: 'Satyam Satyarthi',
    title: 'Cloud & DevOps Engineer',
    tagline: 'Automating Infrastructure, One Pipeline at a Time',
    location: 'Bengaluru, Karnataka, India',
    email: 'satyamsatyarthi007@gmail.com',
    phone: '+91 7352320895',
    availability: 'Open for Hiring',
    // ponytail: profile photo placeholder — add `photoUrl` here when ready
    photoUrl: null,
    summary: `DevOps engineer with internship experience building CI/CD pipelines using Jenkins and GitHub Actions, containerizing multi-service applications with Docker and Nginx, and deploying secure cloud infrastructure on AWS (EC2, VPC, IAM, CloudWatch) using Terraform. Skilled in Kubernetes orchestration and monitoring with Prometheus & Grafana. Comfortable working within Agile/Scrum-based iterative delivery cycles. Proven ability to automate deployments, reduce environment setup time, and ship end-to-end projects from development to production on Linux environments.`,
    primaryStack: ['Linux', 'Docker', 'Git', 'Kubernetes', 'AWS'],
    learning: ['Cloud Computing', 'DevOps', 'CyberSecurity'],
  },

  links: {
    github: 'https://github.com/SatyamSatyarthi007',
    linkedin: 'https://www.linkedin.com/in/satyam-satyarthi-shukla-093130277/',
    twitter: 'https://x.com/SatyamSaty2108',
    resume: 'https://drive.google.com/file/d/1B5vEnzPVSxa0PtDG5m_EEgo4Ks6blyDI/view?usp=sharing',
  },

  skills: {
    'Cloud Platforms':   ['AWS (EC2, S3, IAM, VPC, CloudWatch, Auto Scaling, ECS, EKS)'],
    'Containerization':  ['Docker', 'Docker Compose', 'Nginx'],
    'Orchestration':     ['Kubernetes (kubectl, Pods, Deployments, Services, Manifests)'],
    'CI/CD & IaC':       ['GitHub Actions', 'Jenkins', 'Terraform'],
    'Security & Quality':['SonarQube', 'Trivy', 'OWASP Dependency Check', 'Nexus'],
    'Monitoring':        ['Prometheus', 'Grafana', 'CloudWatch (Alarms, Metrics, SNS)'],
    'Scripting':         ['Bash', 'Python'],
    'Version Control':   ['Git', 'GitHub'],
    'Operating Systems': ['Linux (Ubuntu)'],
    'Methodologies':     ['Agile/Scrum'],
  },

  experience: [
    {
      company: 'JSpiders',
      title: 'DevOps Intern',
      type: 'Internship',
      duration: 'Feb 2026 – Jul 2026',
      responsibilities: [
        'Deployed two-tier architecture on AWS EC2 with custom VPC and security groups; containerized with Docker and Nginx reverse proxy, cutting environment setup time by 83% (~30 min → under 5 min).',
        'Migrated stack from Docker Compose to Kubernetes (manifests, Deployments, Services) and provisioned AWS infrastructure using Terraform for reusable IaC; set up Prometheus and Grafana dashboards for pod and service monitoring.',
        'Built GitHub Actions workflows (build, lint, DockerHub push, EC2 deploy) and a 3-stage Jenkins pipeline (lint → build → deploy) with branch-based gates, integrating SonarQube and Nexus as code quality gates.',
        'Configured IAM least-privilege roles, security group rules, and CloudWatch alarms (CPU/memory) for operational safety and proactive alerting.',
      ],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'GitHub Actions', 'Prometheus', 'Grafana', 'SonarQube', 'Nginx'],
      achievements: [
        '83% reduction in environment setup time',
        'End-to-end CI/CD pipeline with security gates',
        'Infrastructure as Code with Terraform',
      ],
    },
  ],

  projects: [
    {
      name: 'DevSecOps CI/CD — Secure Netflix Clone',
      year: '2026',
      description: 'Built a secure CI/CD pipeline for a Netflix clone with comprehensive security scanning at every stage.',
      problem: 'Needed a production-grade deployment pipeline with integrated security scanning to catch vulnerabilities before deployment.',
      technologies: ['Jenkins', 'Docker', 'Kubernetes', 'AWS EC2', 'SonarQube', 'Trivy', 'OWASP', 'Prometheus', 'Grafana'],
      contributions: [
        'Built declarative Jenkins pipeline integrating SonarQube static analysis, OWASP Dependency Check, and Trivy image scanning as security gates.',
        'Containerized the application with Docker and set up Kubernetes master/slave cluster on AWS EC2.',
        'Deployed Prometheus, Node Exporter, and Jenkins Prometheus plugin with Grafana dashboards for real-time monitoring.',
        'Configured Jenkins email notifications with automated build-scan report attachments.',
      ],
      github: null, // Add repo URL when available
      demo: null,
    },
    {
      name: 'Eldercare Connect',
      year: '2026',
      description: 'IoT + Cloud real-time health monitoring system for elderly care using Flutter, Firebase, and ESP32.',
      problem: 'Elderly patients need continuous health monitoring with instant alerts to caregivers when anomalies are detected.',
      technologies: ['Flutter', 'Firebase Firestore', 'ESP32', 'FCM', 'IoT Sensors'],
      contributions: [
        'Engineered real-time health monitoring system using Flutter, Firebase Firestore, and ESP32 microcontroller.',
        'Streamed IoT sensor data (heart rate, fall detection) to Firestore with sub-second latency.',
        'Integrated Firebase Cloud Messaging for instant caregiver push alerts.',
        'Designed scalable backend for concurrent IoT workloads with offline data caching.',
      ],
      github: null,
      demo: null,
    },
  ],

  certifications: [
    { name: 'Google Cloud Cybersecurity Professional Certificate', org: 'Coursera', year: '2026', status: 'Completed' },
    { name: 'Python for Beginners', org: 'Udemy', year: '2025', status: 'Completed' },
    { name: 'AWS Certified Cloud Practitioner (CLF-C02)', org: 'AWS', year: '2026', status: 'In Progress' },
    { name: 'AWS Networking Basics', org: 'AWS', year: '2026', status: 'Completed' },
  ],

  education: {
    degree: 'B.E. (IoT & CSBT)',
    college: 'East Point College of Engineering and Technology',
    university: 'Visvesvaraya Technological University (VTU)',
    duration: '2022 – Present',
    cgpa: '7.95',
  },

  // Pre-written answers for the `ask` command — keyword-matched
  assistantResponses: {
    'yourself': `I'm Satyam Satyarthi, a Cloud & DevOps Engineer based in Bengaluru. I specialize in building CI/CD pipelines, containerizing applications with Docker, orchestrating with Kubernetes, and deploying secure cloud infrastructure on AWS using Terraform. I'm passionate about automation and reducing manual toil in software delivery.`,
    'hire': `Here's why you should hire me:\n  ✓ Hands-on experience with production CI/CD pipelines (Jenkins, GitHub Actions)\n  ✓ Strong AWS fundamentals (EC2, VPC, IAM, CloudWatch, ECS, EKS)\n  ✓ Container orchestration with Docker & Kubernetes\n  ✓ Infrastructure as Code with Terraform\n  ✓ Security-first mindset (SonarQube, Trivy, OWASP)\n  ✓ Monitoring expertise (Prometheus, Grafana)\n  ✓ Fast learner — currently expanding into CyberSecurity`,
    'kubernetes': `In my internship at JSpiders, I migrated a Docker Compose stack to Kubernetes — writing manifests for Deployments, Services, and Pods. I also set up a Kubernetes master/slave cluster on AWS EC2 for the Netflix Clone project. I'm comfortable with kubectl, rolling updates, and monitoring pods with Prometheus.`,
    'aws': `I've worked extensively with AWS services including EC2, S3, IAM, VPC, CloudWatch, Auto Scaling, ECS, and EKS. I deployed two-tier architectures with custom VPCs and security groups, configured IAM least-privilege roles, and set up CloudWatch alarms for proactive monitoring. Currently pursuing AWS Cloud Practitioner certification.`,
    'terraform': `I used Terraform to provision reusable AWS infrastructure as code during my internship — VPCs, EC2 instances, security groups, and IAM roles. This made environment provisioning repeatable and version-controlled, eliminating manual AWS console clicking.`,
    'skills': `My core stack: Linux, Docker, Git, Kubernetes, AWS. I also work with Jenkins, GitHub Actions, Terraform, Prometheus, Grafana, and have scripting skills in Bash and Python. Currently learning CyberSecurity.`,
    'experience': `I completed a 6-month DevOps internship at JSpiders (Feb–Jul 2026) where I built CI/CD pipelines, containerized applications, deployed on AWS, and set up monitoring. I also built two end-to-end projects: a DevSecOps Netflix Clone and an IoT health monitoring system.`,
    'project': `My key projects:\n  1. DevSecOps CI/CD — Netflix Clone: Secure Jenkins pipeline with SonarQube, Trivy, OWASP scanning, Docker, and Kubernetes on AWS.\n  2. Eldercare Connect: IoT health monitoring with Flutter, Firebase, and ESP32 for real-time elderly care alerts.`,
  },

  // Fun quotes for the `fortune` command
  fortunes: [
    '"There is no place like 127.0.0.1" — Unknown',
    '"It works on my machine!" — Every developer ever',
    '"Automate all the things!" — DevOps Proverb',
    '"Infrastructure as Code, or it didn\'t happen." — Terraform Enthusiast',
    '"Docker: it works on my container." — Modern Developer',
    '"The cloud is just someone else\'s computer." — Reality Check',
    '"kubectl apply -f dreams.yaml" — Kubernetes Dreamer',
    '"CI/CD: Because manual deployment is a sin." — Jenkins Pipeline',
    '"Monitoring is not optional, it\'s oxygen." — SRE Wisdom',
    '"chmod 777 is not a security strategy." — Every sysadmin',
    '"There are only two hard things: cache invalidation and naming things." — Phil Karlton',
    '"Terraform plan before you terraform apply your life." — IaC Philosopher',
  ],
};

function cleanMarkdown(markdown) {
  return markdown
    .replace(/\r/g, '')
    .replace(/(\w)-\s*\n\s*(\w)/g, '$1$2')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\n{3,}/g, '\n\n');
}

function getSection(markdown, start, end) {
  let startIndex, matchLen;
  if (start instanceof RegExp) {
    const m = markdown.match(start);
    if (!m) return '';
    startIndex = m.index;
    matchLen = m[0].length;
  } else {
    startIndex = markdown.indexOf(start);
    if (startIndex < 0) return '';
    matchLen = start.length;
  }
  const content = markdown.slice(startIndex + matchLen);
  const endIndex = end ? content.search(end) : -1;
  return endIndex < 0 ? content : content.slice(0, endIndex);
}


function getBullets(section) {
  return section
    .split('\n')
    .map(line => line.trim().replace(/^[-*]\s+/, ''))
    .filter(line => line && !line.startsWith('#'));
}

function parseResume(markdown) {
  const text = cleanMarkdown(markdown);
  const parsed = {};

  // --- Summary: between "## Professional Summary" and the next "## " heading ---
  const summarySection = getSection(text, '## Professional Summary', /\n## /);
  if (summarySection) parsed.summary = summarySection.replace(/\s+/g, ' ').trim();

  // --- Skills: between "## Technical Skills" and the next "## " heading ---
  // Supports both "Key: val, val" and "**Key:** val, val" formats
  const skillsSection = getSection(text, '## Technical Skills', /\n## /);
  const skills = {};
  for (const line of skillsSection.split('\n')) {
    const m = line.trim().replace(/^[-*]\s+/, '').match(/^\*{0,2}([^:*]+)\*{0,2}:\s*(.+)$/);
    if (m) skills[m[1].trim()] = m[2].split(',').map(s => s.trim()).filter(Boolean);
  }
  if (Object.keys(skills).length) parsed.skills = skills;

  // --- Education: look for "### Bachelor..." or fall back to generic pattern ---
  const eduSection = getSection(text, '## Education', /\n## /);
  const eduMatch = eduSection.match(/###?\s*(.+?)\s*\|\s*(\d{4}\s*[–-]\s*\d{4})\s*\n+([\s\S]*)/);
  if (eduMatch) {
    const details = eduMatch[3];
    const collegeMatch = details.match(/(.+?),\s*(.+?)(?:\((.+?)\))?\s*$/m);
    const cgpaMatch = details.match(/CGPA:\s*([\d.]+)/i);
    parsed.education = {
      ...DATA.education,
      degree: eduMatch[1].trim(),
      duration: eduMatch[2].trim(),
      college: collegeMatch ? collegeMatch[1].trim() : '',
      university: collegeMatch && collegeMatch[3] ? collegeMatch[3].trim() : '',
      cgpa: cgpaMatch ? cgpaMatch[1] : '',
    };
  }

  // --- Projects: "### Name | Year" blocks ---
  const projectsSection = getSection(text, /## Projects/i, /\n## Education/i);
  const projectMatches = [...projectsSection.matchAll(/### ([^|\n]+)\|\s*([^\n]+)\n\n([\s\S]*?)(?=\n### |$)/g)];
  if (projectMatches.length) {
    parsed.projects = projectMatches.map(([, name, year, body]) => ({
      name: name.trim(),
      year: year.trim(),
      description: '',
      problem: '',
      technologies: [],
      contributions: getBullets(body),
      github: null,
      demo: null,
    }));
  }

  // --- Experience: "### Title — Company | Duration" or "### Title | Company | Duration" ---
  const expSection = getSection(text, /## Experience/i, /\n## /);
  if (expSection.trim()) {
    const expMatches = [...expSection.matchAll(/### ([^|\n]+?)\s*[—|]\s*([^|\n]+?)\s*\|\s*([^\n]+)\n\n([\s\S]*?)(?=\n### |$)/g)];
    if (expMatches.length) {
      parsed.experience = expMatches.map(([, title, company, duration, body]) => ({
        title: title.trim(),
        company: company.trim(),
        type: '',
        duration: duration.trim(),
        responsibilities: getBullets(body),
        technologies: [],
        achievements: [],
      }));
    }
  }

  // --- Certifications: "- Name — Org (Year)" lines ---
  const certSection = getSection(text, '## Certifications');
  const certifications = certSection
    .split('\n')
    .map(line => line.trim().replace(/^[-*]\s+/, ''))
    .filter(Boolean)
    .map(line => {
      const m = line.match(/^(.+?)\s+—\s+(.+?)\s+\((\d{4})\)$/);
      return m ? { name: m[1], org: m[2], year: m[3], status: 'Completed' } : null;
    })
    .filter(Boolean);
  if (certifications.length) parsed.certifications = certifications;

  return parsed;
}


// Section name → { dataKey, emptyValue } mapping for reset/populate
const SECTION_MAP = {
  summary:        { set: v => { DATA.personal.summary = v; }, empty: '' },
  skills:         { set: v => { DATA.skills = v; },           empty: {} },
  education:      { set: v => { DATA.education = v; },        empty: {} },
  experience:     { set: v => { DATA.experience = v; },       empty: [] },
  projects:       { set: v => { DATA.projects = v; },         empty: [] },
  certifications: { set: v => { DATA.certifications = v; },   empty: [] },
};

export async function loadResumeData() {
  try {
    const response = await fetch('./Satyam_Satyarthi_Resume_Updated_.md', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Resume request failed: ${response.status}`);
    const parsed = parseResume(await response.text());

    // Reset all sections, then populate only what the markdown provides
    AVAILABLE_SECTIONS.clear();
    for (const [key, { set, empty }] of Object.entries(SECTION_MAP)) {
      if (parsed[key]) {
        set(parsed[key]);
        AVAILABLE_SECTIONS.add(key);
      } else {
        set(empty);
      }
    }
  } catch (error) {
    // Markdown unavailable — fall back to hardcoded DATA, mark all available
    console.warn('Using built-in portfolio data; resume could not be loaded.', error);
    for (const key of Object.keys(SECTION_MAP)) AVAILABLE_SECTIONS.add(key);
  }
}
