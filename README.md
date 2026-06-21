# 💼 JobTrack — AI-Powered Job Application Tracker

<p align="center">
  <strong>Stop juggling spreadsheets. Start landing interviews.</strong>
</p>

<p align="center">
  A full-stack job application management system with JWT authentication, real-time analytics, and AI-powered resume scoring, interview preparation, and resume tailoring.
</p>

<p align="center">
  🔗 <a href="https://ai-jobtrack.vercel.app"><strong>Live Demo</strong></a> ·
  <a href="#features">Features</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a>
</p>

---

## 📖 About

JobTrack was built to solve a real problem faced by every job seeker — losing track of dozens of applications scattered across spreadsheets, emails, and sticky notes. It brings every application, interview, and follow-up into one clean dashboard, while an integrated AI assistant (powered by Google Gemini) helps tailor resumes and prepare for interviews.

This project was built end-to-end — backend API design, database modeling, authentication, frontend architecture, AI integration, and full cloud deployment.

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Authentication** | JWT-based register/login with BCrypt password hashing and stateless session management |
| 📊 **Visual Dashboard** | Real-time stats and a status pipeline across Applied, Shortlisted, Interview, Offer, and Rejected |
| 📋 **Application Management** | Full CRUD — add, edit, delete, and filter job applications with notes, links, and dates |
| 🤖 **AI Resume Scorer** | Paste any job description to get an instant match score, missing skills, and improvement tips |
| 🎤 **AI Interview Prep** | Generates role-specific technical, DSA, project, and HR interview questions on demand |
| ✍️ **AI Resume Tailor** | Produces a tailored professional summary and resume bullet points matched to a specific job |
| 📱 **Responsive UI** | Clean, modern interface built with a dedicated sidebar layout and reusable components |

## 🖥️ Screenshots

> _Add screenshots of the Landing Page, Dashboard, and AI Tools page here._

```
![Landing Page](screenshots/landing.png)
![Dashboard](screenshots/dashboard.png)
![AI Tools](screenshots/ai-tools.png)
```

## 🏗️ Architecture

```
┌─────────────────┐       REST API        ┌──────────────────┐       JPA       ┌──────────────┐
│  React (Vite)   │ ───────────────────▶  │  Spring Boot 3   │ ──────────────▶ │  PostgreSQL  │
│  + React Router │ ◀─────────────────── │  + Spring Security│                 │   (Neon)     │
└─────────────────┘     JWT in headers    └────────┬─────────┘                 └──────────────┘
                                                    │
                                                    │  WebClient
                                                    ▼
                                          ┌──────────────────┐
                                          │  Google Gemini   │
                                          │       API        │
                                          └──────────────────┘
```

## 🛠️ Tech Stack

**Backend**
- Java 17, Spring Boot 3.2
- Spring Security + JWT (JJWT)
- Spring Data JPA / Hibernate
- PostgreSQL
- Spring WebFlux (for non-blocking Gemini API calls)
- Maven

**Frontend**
- React 18 + Vite
- React Router DOM
- Axios
- Plain CSS-in-JS (no framework dependency)

**AI**
- Google Gemini API (`gemini-2.5-flash`)

**Deployment**
- Backend → [Render](https://render.com) (Dockerized)
- Frontend → [Vercel](https://vercel.com)
- Database → [Neon](https://neon.tech) (Serverless PostgreSQL)

## 📂 Project Structure

```
job-tracker/
├── backend/
│   ├── src/main/java/com/jobtracker/backend/
│   │   ├── auth/          # Register, login, JWT issuing
│   │   ├── user/          # User entity & repository
│   │   ├── job/           # Job application CRUD
│   │   ├── dashboard/     # Stats aggregation
│   │   ├── ai/            # Gemini AI integration
│   │   ├── security/      # JWT filter & utilities
│   │   └── config/        # Spring Security configuration
│   ├── Dockerfile
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── api/           # Axios instance with auth interceptor
    │   ├── context/       # Auth context (global state)
    │   ├── components/    # Navbar, modals, reusable UI
    │   └── pages/         # Landing, Login, Register, Dashboard, Applications, AI Tools
    └── vite.config.js
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/jobs` | Get all applications for current user | Yes |
| POST | `/api/jobs` | Add a new job application | Yes |
| PUT | `/api/jobs/{id}` | Update a job application | Yes |
| DELETE | `/api/jobs/{id}` | Delete a job application | Yes |
| GET | `/api/dashboard/stats` | Get aggregated dashboard stats | Yes |
| POST | `/api/ai/score` | Score resume against a job description | Yes |
| POST | `/api/ai/interview` | Generate interview questions | Yes |
| POST | `/api/ai/tailor` | Generate a tailored resume summary | Yes |

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL (local or cloud)
- A Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### Backend Setup

```bash
cd backend

# Set environment variables (or use application.properties defaults for local dev)
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/jobtracker
export SPRING_DATASOURCE_USERNAME=postgres
export SPRING_DATASOURCE_PASSWORD=your_password
export JWT_SECRET=your_jwt_secret
export GEMINI_API_KEY=your_gemini_api_key

./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup

```bash
cd frontend
npm install

# Create a .env file
echo "VITE_API_URL=http://localhost:8080" > .env

npm run dev
```

Frontend runs on `http://localhost:5173`

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `SPRING_DATASOURCE_URL` | PostgreSQL JDBC connection string |
| `SPRING_DATASOURCE_USERNAME` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRATION` | Token expiry in milliseconds |
| `GEMINI_API_KEY` | Google Gemini API key |
| `VITE_API_URL` | Backend base URL (frontend only) |

## 🗺️ Roadmap

- [ ] Email reminders for follow-ups
- [ ] Export application history as PDF
- [ ] Resume upload with PDF parsing
- [ ] Cross-model hallucination check for AI responses
- [ ] Dark mode

## 👤 Author

**Sandeep Yadav**

- GitHub: [@SY-SANDEEP](https://github.com/SY-SANDEEP)


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">⭐ If you found this project useful, consider giving it a star!</p>
