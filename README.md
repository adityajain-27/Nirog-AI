# Nirog AI — AI-Powered Clinical Triage Platform

> A full-stack health assessment platform that enables doctors to run AI-powered triage, generate structured clinical notes, check drug interactions, and send patients smart intake forms — all from a single dashboard.

**Live Demo →** _add your link here_

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [AI Pipeline](#ai-pipeline)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Disclaimer](#disclaimer)

---

## Overview

Nirog AI is built around a **multi-agent AI pipeline** that processes patient symptoms through six specialised agents in sequence: clinical guideline retrieval (RAG), urgency triage, image analysis, dynamic follow-up questions, SOAP note generation, and drug interaction checking.

On the product side, doctors get a dashboard to manage patients, view AI-generated reports, and send tokenised intake links to patients via email. Patients open the link in their browser (no account required), fill in their symptoms, and the AI report is automatically pushed to the doctor's dashboard.

---

## Features

### Doctor-Facing
- **Patient Management** — Add and manage a patient list with demographics, medical history, and allergies stored per patient
- **AI Assessment** — Enter symptoms on behalf of a patient; the AI returns a triage colour, SOAP note, differential diagnosis with ICD-10 codes, drug interaction warnings, and red flags
- **Patient Intake via Email** — Send a secure, tokenised intake link to the patient's email; once submitted, the AI runs automatically and attaches the report to that patient's record
- **Assessment History** — Browse all past assessments per patient with full AI output preserved
- **Billing** — Subscription management via Razorpay integration

### Patient-Facing
- **Intake Form** — A mobile-friendly, branded form accessible via email link (no login required); expires after 7 days
- **Image Upload** — Patients can optionally attach a photo (rash, wound, eye) for visual analysis

### AI Capabilities
- **Triage Classification** — RED (emergency), YELLOW (urgent), GREEN (self-care), with a numeric urgency score and clinical reasoning
- **SOAP Notes** — Structured Subjective / Objective / Assessment / Plan output in clinical language
- **Differential Diagnosis** — Ranked list of likely conditions with ICD-10 codes and confidence levels
- **Follow-up Questions** — OPQRST-guided clarifying questions generated dynamically based on the presenting symptoms
- **Drug Interaction Checking** — Cross-references current medications and proposed treatments against the OpenFDA database, then synthesises results with an LLM to produce severity-ranked warnings (Minor / Moderate / Major)
- **Vision Analysis** — Image uploaded by the patient is analysed by Claude Vision; findings are injected into the assessment context
- **Medical Chatbot** — Standalone conversational assistant for general health questions

---

## Architecture

```
Browser (React + TypeScript)
        │
        │  HTTPS
        ▼
Node.js / Express API                    ← Render (free tier)
  ├── JWT Authentication
  ├── Patient & Assessment CRUD (MongoDB Atlas)
  ├── Intake token generation + SendGrid email
  └── Razorpay billing
        │
        │  HTTPS (internal service call)
        ▼
Python FastAPI — AI Server               ← Render (free tier)
  ├── [1] RAGAgent          ChromaDB · Clinical guideline retrieval
  ├── [2] TriageAgent       Rule-based regex → LLM triage (Groq)
  ├── [3] VisionAgent       Claude Vision · Image analysis
  ├── [4] FollowUpAgent     OPQRST follow-up question generation
  ├── [5] AssessmentAgent   SOAP note + differential diagnosis
  └── [6] DrugAgent         OpenFDA API + LLM interaction synthesis
        │
        ▼
  Structured JSON report returned to Node.js → saved to MongoDB → visible in dashboard
```

---

## Tech Stack

| Area | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, Sonner, Lucide |
| Backend | Node.js, Express 5, Mongoose, JWT (jsonwebtoken), bcrypt, SendGrid |
| Database | MongoDB Atlas |
| AI Server | Python 3.10+, FastAPI, Uvicorn |
| LLMs | Groq API (Llama 3.3 70B), Anthropic Claude (Vision) |
| Vector DB | ChromaDB / FAISS + sentence-transformers |
| Drug Data | OpenFDA REST API (no key required) |
| Payments | Razorpay |
| Hosting | Vercel (frontend), Render (backend + AI server) |

---

## Project Structure

```
Nirog-AI/
│
├── frontend/                        # React + TypeScript (Vite)
│   ├── src/app/
│   │   ├── pages/                   # 30+ route-level pages
│   │   │   ├── NewLandingPage.tsx
│   │   │   ├── DoctorDashboardPage.tsx
│   │   │   ├── PatientIntakePage.tsx
│   │   │   ├── DoctorBillingPage.tsx
│   │   │   └── ...
│   │   ├── components/              # Reusable UI components
│   │   ├── services/api.ts          # Centralised Axios/fetch API client
│   │   └── routes.tsx               # React Router config
│   ├── .env.local.example
│   └── package.json
│
├── backend/                         # Node.js + Express
│   ├── app.js                       # Express entry point + middleware
│   ├── routes/
│   │   ├── auth.js                  # Register, login, JWT issuing
│   │   ├── doctor.js                # /assess — AI assessment trigger
│   │   ├── patients.js              # Patient CRUD
│   │   ├── intake.js                # Intake send + token validation + submit
│   │   ├── contact.js               # Contact form
│   │   └── billing.js               # Razorpay order creation + verification
│   ├── models/
│   │   ├── user.js                  # Doctor schema
│   │   ├── doctorPatient.js         # Patient schema
│   │   ├── assessment.js            # AI report schema
│   │   └── intakeRequest.js         # Intake token schema
│   ├── middlewares/auth.js          # JWT verification middleware
│   ├── .env.example
│   └── package.json
│
└── files/                           # Python FastAPI AI server
    ├── api_server.py                # FastAPI app + endpoint definitions
    ├── requirements.txt
    ├── agents/
    │   ├── orchestrator.py          # Pipeline controller
    │   ├── rag_agent.py             # Vector DB retrieval
    │   ├── triage_agent.py          # RED/YELLOW/GREEN classification
    │   ├── vision_agent.py          # Image analysis (Claude)
    │   ├── followup_agent.py        # Follow-up question engine
    │   ├── assessment_agent.py      # SOAP note generation
    │   └── drug_agent.py            # Drug interaction checker
    └── utils/
        ├── session.py               # Shared state object across agents
        └── llm_client.py            # LLM wrapper (Groq / Claude)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Python ≥ 3.10
- A MongoDB Atlas cluster (free M0 works)
- A Groq API key — [console.groq.com](https://console.groq.com) (free)
- A SendGrid account — [sendgrid.com](https://sendgrid.com) (free tier)

### 1. Clone

```bash
git clone https://github.com/adityajain-27/Nirog-AI.git
cd Nirog-AI
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local    # then fill in the values
npm run dev                          # starts at http://localhost:5173
```

### 3. Backend

```bash
cd backend
npm install
cp .env.example .env                 # then fill in the values
npm run dev                          # starts at http://localhost:5000
```

### 4. Python AI Server

```bash
cd files
pip install -r requirements.txt
cp .env.example .env                 # add GROQ_API_KEY
uvicorn api_server:app --reload --port 8000
```

---

## Environment Variables

### `backend/.env`

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string used to sign JWTs |
| `PYTHON_AI_URL` | URL of the deployed Python AI server |
| `APP_URL` | Frontend URL — used to construct intake email links |
| `SENDGRID_API_KEY` | API key from your SendGrid dashboard |
| `SENDGRID_VERIFIED_SENDER` | The sender email verified in SendGrid |

### `files/.env`

| Variable | Description |
|---|---|
| `GROQ_API_KEY` | API key from console.groq.com |

### `frontend/.env.local`

| Variable | Description |
|---|---|
| `VITE_NODE_URL` | Backend base URL (e.g. `https://your-backend.onrender.com`) |
| `VITE_PYTHON_URL` | AI server base URL (e.g. `https://your-ai.onrender.com`) |

---

## AI Pipeline

When symptoms are submitted (either by the doctor or via patient intake), the pipeline runs as follows:

1. **RAG Agent** — Embeds the symptoms and retrieves the most relevant clinical guidelines from the vector knowledge base using cosine similarity
2. **Triage Agent** — First applies a regex rule-set to catch obvious emergencies instantly, then passes to the LLM with retrieved guidelines for nuanced cases. Outputs RED / YELLOW / GREEN with an urgency score (1–10) and reasoning
3. **Vision Agent** _(only if an image was uploaded)_ — Sends the image to Claude Vision with a structured clinical prompt. Outputs findings are appended to the session context
4. **Follow-up Agent** — Generates 3–5 OPQRST-guided follow-up questions based on the current symptom profile and preliminary triage. Questions are prioritised by their potential to change the diagnosis or triage level
5. **Assessment Agent** — Synthesises all context (symptoms, RAG results, vision findings, follow-up answers) into a full SOAP note and a differential diagnosis list with ICD-10 codes
6. **Drug Agent** — Queries OpenFDA for all current medications and proposed treatments, then uses the LLM to identify clinically significant interactions and rank by severity

---

## API Reference

### Python AI Server (port 8000)

```
POST  /assess              Full pipeline assessment (text input)
POST  /assess/image        Full pipeline assessment (text + image upload)
POST  /followup            Generate follow-up questions only (no full pipeline)
POST  /chat                Medical chatbot (conversational, stateless)
POST  /drug-check          Standalone drug interaction check
GET   /health              Service health check
```

**Example — run a full assessment:**
```bash
curl -X POST http://localhost:8000/assess \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "chest pain radiating to left arm, sweating for 30 minutes",
    "medications": ["warfarin 5mg", "metoprolol 50mg"],
    "followup_answers": {
      "Rate your pain from 1 to 10": "8",
      "Does the pain worsen when you breathe in?": "No"
    }
  }'
```

### Node.js Backend (port 5000)

```
POST  /api/auth/register              Doctor registration
POST  /api/auth/login                 Login → returns JWT

GET   /api/patients                   List all patients           [auth]
POST  /api/patients                   Create a patient            [auth]
PUT   /api/patients/:id               Update patient              [auth]
DELETE /api/patients/:id              Delete patient              [auth]

POST  /api/doctor/assess              Run AI assessment           [auth]
GET   /api/doctor/assessments         List assessment history     [auth]

POST  /api/intake/send                Email intake link to patient [auth]
GET   /api/intake/:token              Fetch intake info (public)
POST  /api/intake/:token/submit       Patient submits form (public)

POST  /api/contact                    Contact form submission
```

---

## Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Point root to `frontend/`; set `VITE_*` env vars in Vercel dashboard |
| Backend | Render (free) | Set all `backend/.env` variables in Render environment settings |
| AI Server | Render (free) | Set `GROQ_API_KEY`; start command: `uvicorn api_server:app --host 0.0.0.0 --port 8000` |
| Database | MongoDB Atlas | Free M0 cluster; whitelist Render IPs or allow all (`0.0.0.0/0`) |
| Email | SendGrid | Render's free tier blocks SMTP; SendGrid's HTTPS API works fine. Verify your sender in the SendGrid dashboard to avoid spam filters |

---

## Disclaimer

Nirog AI is for research and educational purposes only. It does not constitute medical advice and must not replace the judgment of a qualified healthcare professional. Always consult a licensed doctor for diagnosis and treatment.
