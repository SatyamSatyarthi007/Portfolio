# Satyam Satyarthi

Bangalore, Karnataka, India | +91 7352320895 | satyamsatyarthi007@gmail.com

[LinkedIn](https://www.linkedin.com/) | [GitHub](https://github.com/SatyamSatyarthi007)

## Professional Summary

Aspiring DevSecOps Engineer combining an academic foundation in Cybersecurity with hands-on experience in distributed systems architecture, cloud automation, and reliability engineering. Proficient in designing resilient, asynchronous event-driven backends and CI/CD pipelines using Python, FastAPI, Docker, AWS, and Jenkins. Skilled in low-level Linux configuration and automating cloud infrastructure provisioning with Terraform to establish secure, observable containerized environments.

## Technical Skills

- Cloud & Infrastructure: AWS (EC2, S3, IAM, VPC), Terraform (IaC), Docker, Docker Compose, Kubernetes
- CI/CD & DevSecOps: Jenkins, GitHub Actions, SonarQube, Trivy, Prometheus, Grafana, Nexus
- Backend & Systems: Python, FastAPI, Asyncio, Redis Streams, PostgreSQL, MongoDB, Bash, Linux (Ubuntu)
- Security & IAM: JWT/RBAC, Least-Privilege IAM, OWASP Top 10, TLS
- Observability & Reliability: WebSockets, CloudWatch, Node Exporter, Rate Limiting, Backpressure/Load Shedding, Health Checks

## Projects & Technical Experience

### Incident Management System (DevOps & SRE Platform) | 2026

- Architected an asynchronous event-driven platform using FastAPI, Python, and React, implementing a pure-Python token-bucket rate limiter and decoupled queueing to separate high-speed signal ingestion from downstream database persistence.
- Engineered an SHA-256 deterministic debouncing mechanism to intelligently group duplicate monitoring signals into consolidated Work Items, significantly reducing alert fatigue during failure events.
- Designed a resilient multi-database persistence layer using PostgreSQL, MongoDB, and Redis Streams, with exponential backoff retries using `@with retry` to recover from transient downstream failures.
- Provisioned AWS EC2 infrastructure using Terraform (IaC) to deploy a five-tier containerized architecture through Docker Compose, enforcing strict health-check dependency ordering.
- Enforced a strict incident lifecycle state machine requiring mandatory Root Cause Analysis (RCA) submissions before ticket closure, alongside automated MTTR (Mean Time To Repair) tracking.

### Automated Cloud CI/CD & Observability Pipeline | July 2026

- Automated the provisioning of AWS EC2 infrastructure using Terraform to host a complete DevOps stack featuring Docker, Jenkins, a Kubernetes KinD cluster, SonarQube, and Trivy.
- Engineered declarative Jenkins CI/CD pipelines automating static code analysis, CVE vulnerability scanning, and multi-stage container deployments to Docker Hub and AWS.
- Integrated OWASP Dependency Check to prevent vulnerable third-party libraries from entering container builds.
- Configured Prometheus and Grafana dashboards alongside CloudWatch metric alarms for continuous cluster, pod, and service-level health monitoring.

### Linux From Scratch (LFS) Operating System Build | 2026

- Compiled a custom Linux operating system entirely from source code, building and configuring core software packages, toolchains, and kernel components.
- Configured system initialization scripts, file system hierarchies, and user permission controls to deepen low-level OS mechanics and security management.
- Hardened the custom environment by enforcing least-privilege principles and stripping unnecessary binaries to reduce the overall attack surface.

## Education

### Bachelor of Engineering in IoT, Cybersecurity, and Blockchain Technology | 2022–2026

East Point College of Engineering and Technology, Bangalore (VTU)  
CGPA: 7.88

## Certifications

- Google Cloud Cybersecurity Professional Certificate — Coursera (2026)
- The Complete Ethical Hacking Course — Udemy (2022)
- AWS Networking Basics — AWS (2026)
