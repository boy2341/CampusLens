# CampusLens 🎓🔍

> **Your Campus, Understood by AI.**  
> A unified multimodal artificial intelligence companion for modern university life — built for Delhi Technological University (DTU).

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas%20Ready-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-3.5%20Flash%20Lite-8E75C2?logo=google&logoColor=white)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 👥 Team Information

- **Project:** CampusLens
- **Team Members:**
  - **Govind**
  - **Abhishank Singh**
  - **Sanidhya**
  - **Charvi**
- **Institution:** Delhi Technological University (DTU)

---

## 🎯 Problem Statement

Campus life is fragmented across disconnected WhatsApp groups, lost-and-found notice boards, paper maintenance registers, and scattered club flyers. Students waste hours looking for lost belongings, missing high-impact technical workshops, tolerating classroom infrastructure issues, or struggling to find academic mentorship.

**CampusLens** unites these campus workflows into a single intelligent platform powered by **Google Gemini Multimodal AI** and **MongoDB Atlas**. Students can describe issues in natural language, upload photos for visual AI analysis, discover university societies tailored to their interests, and get peer assistance in real time.

---

## 🌟 Core Modules & Capabilities

### 1. 🔎 LostLens — Multimodal Visual Retrieval
- **Visual Fingerprinting:** Upload an image or describe a misplaced belonging. Gemini extracts object geometry, surface reflectance, colorways, materials, and hardware details into a structured JSON fingerprint.
- **AI Similarity Matching:** Compares lost items against custody-registered found items with an AI similarity percentage and a transparent feature verification checklist (e.g. matching headband hinges, colorway congruence, location proximity).
- **Trial Presets:** Instant one-click presets with bundled high-res images:
  - 🎧 *Matte Black Wireless Over-Ear Headphones*
  - 💧 *Navy Insulated Hydro Flask Bottle*

### 2. 🎯 EventMatch & DTU Societies Directory
A directory of **47 verified DTU student societies, professional chapters, project teams, and management clubs**:
- **Cultural & Performing Arts (9):** Pratibimb (Dramatics), Vibe (Western Dance), Panache (Dance & Fashion), Bhangra, Parchhayi (Shadow Theatre), Nrityangana (Classical Dance), Madhurima (Music), Kalakriti (Fine Arts), Pradarshani (Theatricals - USME).
- **Technical Societies & Chapters (15):** IEEE DTU, IEEE CS, IEEE WIE, IEEE PES-IAS, IEEE CASS, CSI, IET, ASME, SAE, SEM, SPIE, ASHRAE, SPE, IOSD, Anusandhaan (Analytics & Research).
- **Project & Engineering Teams (6):** Team Solaris (Solar Car), Team Defianz (Formula Student), Team SMV (Supermileage EV), Team Mini Baja (Off-road Buggy), UAS/UAV DTU (Autonomous Drones), Team Raftar (Racing Telemetry).
- **Literary, Business & Management (12):** DTU Times (Student Media), E-Cell, ASSETS (Finance & Investment), Finesco (DSM Finance), M-Cube (DSM Marketing), Netritva (DSM HR), ITech (DSM IT), Arth (DSM Operations), DSM Chronicle, Alfaaz (Debating & Literary), Z-Axis (Photography), Sporticus (Sports).
- **Social & Welfare (5):** NSS DTU, Rotaract Club of DTU, International Students' Society (ISS), AIMS-DTU, Sanskriti (DSM Cultural Committee).
- **Smart Features:** Filter by interests (`Coding`, `Dance`, `Automotive`, `Finance`, `Robotics`, `AI`), live keyword search across campus venues (OAT, BR Ambedkar Auditorium, SAC, Mech Garage), and calendar RSVPs.

### 3. 🛠️ CampusFix — Autonomous Facilities Vision Triage
- **Multimodal Defect Analysis:** Snap a photo of a broken classroom fixture (e.g. bent ceiling fan blades, water leaks, damaged desks).
- **Automated Work Order:** In ~1.4 seconds, Gemini classifies defect severity (`HIGH`, `MEDIUM`, `LOW`), categorizes the maintenance domain, and generates a structured facilities ticket with technician assignment workflows.
- **Trial Preset:** Included 🌀 *Broken Classroom Ceiling Fan* sample image for instant live testing.

### 4. 🎓 EduConnect — Peer Mentorship & AI Doubt Solver
- **Semantic Mentor Matching:** Connects students with experienced senior mentors filtered by skills (React, Python AI, UI/UX Design, TypeScript) and response latency.
- **AI Doubt Solver:** Structured, step-by-step academic explanations tailored to undergraduate coursework and software engineering fundamentals.
- **Knowledge Vault:** Quick-reference roadmaps for frontend development, Gemini API prompt engineering, and hackathon playbooks.

### 5. 🧠 Ask AI — Multi-Intent Neural Nexus
- Single conversational input supporting natural language and multimodal image attachments.
- Detects user intent (`LOST_ITEM`, `FOUND_ITEM`, `EVENT_DISCOVERY`, `CAMPUS_ISSUE`, `EDUCONNECT`) and automatically routes context directly into the target tool with zero duplicate typing.

### 6. 📊 Admin Control Center
- Live operational KPIs for campus management (open issues, lost/found match candidates, today's RSVPs, active mentors).
- Facilities ticket filter queue (`REPORTED`, `IN PROGRESS`, `RESOLVED`) with timestamped audit logs.

---

## 🏗️ System Architecture

```text
┌────────────────────────────────────────────────────────┐
│               CampusLens Frontend (React / Vite)       │
│  - Modern Glassmorphism UI & Responsive Design         │
│  - Multimodal Camera Intake & Image-to-Base64          │
│  - Client-side Fallbacks & Offline Demo Mode           │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON (Port 5000)
┌───────────────────────────▼────────────────────────────┐
│              CampusLens Backend (Node.js / Express)    │
│  - REST API Routing & Error Resiliency Layers          │
│  - Structured In-Memory & MongoDB Unified Data Store   │
└─────────────┬────────────────────────────┬─────────────┘
              │                            │
┌─────────────▼──────────────┐ ┌───────────▼─────────────┐
│  Google Gemini Vision API  │ │   MongoDB Atlas Database│
│  - Model:                  │ │   - Events Collection   │
│    gemini-3.5-flash-lite   │ │   - Lost Items          │
│  - Multimodal Vision       │ │   - Found Items         │
│  - Structured JSON Output  │ │   - Campus Issues       │
└────────────────────────────┘ └─────────────────────────┘
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, React Router DOM v6, Lucide Icons, Modern CSS Glassmorphism |
| **Backend** | Node.js (ES Modules), Express 4, CORS, dotenv |
| **AI / Machine Learning** | Google Gemini API (`@google/genai` / REST SDK, `gemini-3.5-flash-lite`) |
| **Database** | MongoDB Atlas, Mongoose ODM (with graceful in-memory store fallback) |
| **Tooling & Build** | Vite, npm scripts, Git, PowerShell / Bash |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- A **Google Gemini API Key** ([Get free key here](https://aistudio.google.com/app/apikey))
- *(Optional)* A **MongoDB Atlas** connection URI

---

### 2. Clone the Repository
```bash
git clone https://github.com/boy2341/CampusLens.git
cd CampusLens/campuslens
```

---

### 3. Install Dependencies
Install dependencies for both root, client, and server:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..

# Install server dependencies
cd server
npm install
cd ..
```

---

### 4. Configure Environment Variables

Create a `.env` file in the `server/` directory:
```bash
# In server/.env
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/campuslens?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_api_key_here
```

*(Optional)* Create a `.env` in `client/` if using a custom backend port:
```bash
# In client/.env
VITE_API_URL=http://localhost:5000/api
```

> **Note on Resiliency:** If `DATABASE_URL` is omitted, CampusLens seamlessly switches to high-speed in-memory store mode. If `GEMINI_API_KEY` is omitted or rate-limited, built-in heuristic AI simulators activate so UI demonstrations never crash.

---

### 5. Seed Database with 47 DTU Societies
Populate MongoDB Atlas with the complete DTU society database:
```bash
cd server
node --env-file=.env -e "
import('./src/config/db.js').then(async ({ connectDB }) => {
  await connectDB();
  const { EventModel } = await import('./src/models/schemas.js');
  const { initialEvents } = await import('./src/data/seedData.js');
  await EventModel.deleteMany({});
  await EventModel.insertMany(initialEvents);
  console.log('Seeded ' + initialEvents.length + ' DTU societies into MongoDB Atlas!');
  process.exit(0);
});
"
cd ..
```

---

### 6. Run the Application

Start both the backend server and frontend client:

**Terminal 1 (Backend Server):**
```bash
npm run dev:server
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
npm run dev:client
# Frontend runs on http://localhost:5173
```

Open your browser and navigate to **`http://localhost:5173`**.

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | System status, MongoDB connectivity, and Gemini API state |
| `POST` | `/api/ai/intent` | Synthesizes natural language requests into structured intent & route |
| `POST` | `/api/lostlens/lost` | Registers a lost item and extracts Gemini visual fingerprint |
| `POST` | `/api/lostlens/found` | Registers found item into campus registry with fingerprint |
| `POST` | `/api/lostlens/match` | Compares lost item against inventory using Gemini multimodal reasoning |
| `POST` | `/api/campusfix/triage` | Triages image & description into category, severity, and work order |
| `GET` | `/api/events` | Retrieves all 47 campus events and DTU societies |

---

## 🧪 Testing Trial Presets

CampusLens includes built-in bundled test assets located in `client/src/assets/demo/` for instant evaluation:
1. **LostLens:**
   - Click the preset button **"🎧 Black Headphones"** or **"💧 Hydro Flask"**.
   - Click **"Analyze & Find Matches"** to watch Gemini compute visual similarity and display matching details.
2. **CampusFix:**
   - Click **"🌀 Broken Ceiling Fan"** preset button.
   - Click **"Analyze with Gemini Vision"** to view real-time hazard severity triage and work order generation.
3. **Ask AI:**
   - Click quick prompt pills such as *"I lost something near the library"* or *"What should I attend today?"* to test intent routing.

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
