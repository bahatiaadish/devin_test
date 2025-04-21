# NetSentinel (for ACI)

**NetSentinel (for ACI)** is an enterprise-grade, AI-powered analytics and observability module for Cisco ACI environments.  
It is part of the broader NetSentinel platform, which will include future modules for enterprise, firewall, wireless (WLC), and corporate network observability.

---

## 🔍 Key Features (Phase 1)
- 🌐 Online + Offline Cisco ACI support
- 🏢 Per-site snapshot structure for multi-fabric environments
- 🔍 Global search (by fault code, IP, MAC, etc.)
- 🧠 Modular logic engine (faults, EPGs, endpoints, compliance)
- 📊 Drill-down views: Fault → EPG → Contract → Tenant
- 📋 Audit logging and detailed event traces
- 🧱 Clean architecture, future-ready design

---

## 📁 Project Structure
```
netsentinel/
├── backend/           → FastAPI logic, ACI clients, schedulers, logic engine
├── data/              → JSON snapshots per site (online + offline)
├── docs/              → Markdown docs and internal guides
├── docker/            → Container setup
├── scripts/           → Utility scripts
└── frontend/          → (Future) UI components in React/Next.js
```

---

## 🧠 Platform Vision
To provide a unified, modular, AI-enhanced platform for deep observability across network infrastructure — starting with Cisco ACI and expanding to cover enterprise, security, and wireless domains.

---

## 🛠 Tech Stack
- **Python + FastAPI** (backend APIs)
- **PostgreSQL / SQLite** (data storage)
- **YAML / JSON** (config and snapshots)
- **React (planned)** (frontend UI)

---

## 📄 License
MIT
