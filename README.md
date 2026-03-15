# GovHelpPortal – AI Assisted Pension Processing System

GovHelpPortal is a smart digital platform designed to assist CSC operators and citizens in applying for government welfare schemes such as pension programs. The system integrates rule-based validation and an AI Copilot to reduce application errors and improve processing efficiency.

---

## Problem

Government service applications often face:

- Incorrect or incomplete form submissions
- Long processing time
- Repeated rejections due to minor errors
- Lack of guidance for CSC operators

These issues slow down welfare delivery and frustrate citizens.

---

## Solution

GovHelpPortal introduces an **AI-assisted application system** that helps validate citizen information during the form-filling process.

Key idea:

```
Citizen Portal → Backend Validation → AI Copilot → Error Suggestions
```

The AI Copilot analyzes form data and gives real-time suggestions to prevent mistakes before submission.

---

## Features

- Citizen Login & Registration
- Pension Application Form
- QR Based Citizen Data Scanning
- Rule-Based Form Validation
- AI Copilot Suggestions
- FastAPI Backend API
- Next.js Frontend Interface
- SQLite Database
- Offline AI support using Ollama

---

## System Architecture

```
Frontend (Next.js)
        ↓
Backend API (FastAPI)
        ↓
Rule Validation Engine
        ↓
AI Copilot (Local LLM via Ollama)
        ↓
Database (SQLite)
```

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- FastAPI
- Python
- SQLite

### AI Layer
- Ollama
- Phi3 / Local LLM

### Tools
- Git
- GitHub
- VS Code

---

## Project Structure

```
gov-help-portal
│
├── Frontend
│   ├── app
│   ├── components
│   ├── hooks
│   └── lib
│
├── backend
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── ai_service.py
│   └── database.py
│
└── README.md
```

---

## How to Run the Project

### Backend

```bash
cd backend
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

API documentation:

```
http://127.0.0.1:8000/docs
```

---

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

## AI Copilot

The AI Copilot analyzes pension application data and suggests possible issues such as:

- Missing required fields
- Suspicious or unrealistic names
- Invalid address format
- Potentially incorrect phone numbers

This helps CSC operators reduce errors before submitting the form.

---

## Future Enhancements

- Aadhaar verification integration
- Fraud detection using ML
- Automatic eligibility checking for schemes
- Multi-language citizen support
- Cloud deployment

---

## Author

**Sakshi Singh**

B.Tech CSE (AI & ML)  
Kalinga University

GitHub:  
https://github.com/Sakshi-pyDev
