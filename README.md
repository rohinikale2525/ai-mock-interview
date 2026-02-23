# 🤖 AI Mock Interview Platform

An AI-powered mock interview practice platform built for college students preparing for **Technical** and **HR** interviews. Practice with 116+ questions, get instant AI scoring, and track your progress — all in the browser, no server needed.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 What Is This Project?

This is a **front-end web application** that simulates a real interview experience. Students can:

1. **Sign up** and create a profile
2. **Choose** between Technical or HR interview
3. **Answer questions** one-by-one with a countdown timer
4. **Get scored** by an AI engine that compares answers against predefined model answers
5. **View analytics** with detailed feedback, scores, and improvement tips

> **No backend or API needed** — everything runs 100% in the browser using localStorage.

---

## 🚀 How to Run

### Option 1: Just Open the File (Easiest)
```
Double-click index.html → Opens in your browser → Done!
```

### Option 2: Using VS Code Live Server
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **"Open with Live Server"**
3. Auto-refreshes when you edit files

### Option 3: Python Local Server
```bash
python -m http.server 3000
# Then open http://localhost:3000
```

---

## 📁 Project Structure

```
Assignment/
├── index.html              ← Landing page (hero, features, how-it-works)
├── signup.html              ← User registration
├── profile.html             ← Edit profile (name, course, skills)
├── dashboard.html           ← Stats overview + interview history
├── select-interview.html    ← Step-by-step interview configuration
├── interview.html           ← Live interview with timer
├── analytics.html           ← Score gauge, charts, feedback
│
├── css/
│   └── style.css            ← Complete design system (dark theme, glassmorphism)
│
├── js/
│   ├── app.js               ← Shared utilities (navbar, auth, particles)
│   ├── signup.js             ← Registration logic + validation
│   ├── profile.js            ← Profile save/load
│   ├── dashboard.js          ← Stats calculation + history
│   ├── select-interview.js   ← Interview type/course/duration/questions wizard
│   ├── model-answers.js      ← 116 predefined model answers with key concepts
│   └── interview.js          ← Question bank (66 Tech + 50 HR) + AI scoring engine
│
├── assets/
│   └── hero-illustration.svg ← Landing page illustration
│
├── vercel.json               ← Vercel deployment config
└── README.md                 ← You are here!
```

---

## 🔄 User Flow

```
Landing Page → Sign Up → Profile → Dashboard → Select Interview → Live Interview → Analytics
     ↑                                  ↑                                              |
     └──────────────────────────────────└──────────────── Back to Dashboard ────────────┘
```

**Step-by-step:**

1. **Landing Page** (`index.html`) — See features, click "Get Started Free"
2. **Sign Up** (`signup.html`) — Enter name, email, password → auto-login
3. **Profile** (`profile.html`) — Add course (B.Tech/BCA/etc.), year, skills
4. **Dashboard** (`dashboard.html`) — See stats, start new interview
5. **Select Interview** (`select-interview.html`) — Pick:
   - Interview Type: Technical or HR
   - Course: BTech CSE, BCA, or Other
   - Duration: 10 or 15 minutes
   - Questions: 10 or 15
6. **Live Interview** (`interview.html`) — Answer questions one-by-one with timer
7. **Analytics** (`analytics.html`) — See scores, feedback, strengths, improvements

---

## 🧠 How Answer Scoring Works

The platform uses a **model-answer-based evaluation system** — not random scoring!

### Scoring Breakdown (100 points)

| Component | Points | How It Works |
|-----------|--------|-------------|
| **Concept Matching** | 25 | Checks if your answer covers key concepts from the model answer |
| **Keyword Relevance** | 20 | Matches important technical/HR terms expected in the answer |
| **Answer Length** | 20 | Longer, detailed answers score higher |
| **Structure** | 15 | Well-formed sentences (5+ sentences = max points) |
| **Professional Language** | 20 | Uses terms like "for example", "therefore", "however" |

### Example

**Question:** *"What is the difference between TCP and UDP?"*

**Model Answer has these key concepts:**
- TCP is connection-oriented, UDP is connectionless
- TCP is reliable with guaranteed delivery
- UDP is faster but unreliable
- TCP uses three-way handshake
- TCP used in HTTP/email; UDP in streaming/gaming

| Your Answer | Score | Why |
|---|---|---|
| `"asdfgh random"` | **~3%** | Gibberish detected |
| `"I don't know"` | **~5%** | Too short, no concepts |
| `"TCP is reliable"` | **~15%** | Only 1 concept, too short |
| `"TCP is reliable and connection-oriented. UDP is connectionless and faster."` | **~45%** | Some concepts, decent length |
| `"TCP is a connection-oriented, reliable protocol that uses a three-way handshake for guaranteed delivery. For example, HTTP uses TCP. UDP is connectionless and faster but unreliable, used in video streaming and gaming."` | **~82%** | Most concepts covered, good length, structured, professional language |

### Smart Feedback

When you score below 50%, the system tells you **exactly which concepts you missed:**

> *"Key concepts missed: 'TCP uses three-way handshake' and 'uses three-way handshake'."*

---

## 📊 Question Bank

### Technical Questions (66 total)

| Category | Count | Topics |
|----------|-------|--------|
| Data Structures | 10 | Stack, Queue, Linked List, Hash Map, BST, Heap, Graph, Trie, Priority Queue, Tree vs Graph |
| Algorithms | 10 | Binary Search, DP vs Greedy, Recursion, Merge/Quick Sort, Big-O, Sorting, Hashing, Two Pointer, Sliding Window, Backtracking |
| OOPs | 8 | OOP Concepts, Polymorphism, Abstraction vs Encapsulation, Inheritance, Overloading vs Overriding, Interfaces, SOLID, Class vs Object |
| DBMS | 10 | Normalization, SQL vs NoSQL, ACID, Indexing, Primary/Foreign Key, Joins, Stored Procedures, DELETE/TRUNCATE/DROP, Transactions, Triggers |
| Operating Systems | 8 | Process vs Thread, Virtual Memory, Deadlock, CPU Scheduling, Paging vs Segmentation, Semaphore, Multiprogramming, IPC |
| Computer Networks | 10 | TCP vs UDP, OSI Model, DNS, HTTP vs HTTPS, Firewall, IPv4 vs IPv6, Subnetting, Three-way Handshake, Router/Switch/Hub, ARP |
| Web & System Design | 6 | Design Patterns, REST API, MVC, Caching, Monolithic vs Microservices, API/SOAP |

### HR Questions (50 total)

| Category | Count | Topics |
|----------|-------|--------|
| Self Introduction | 4 | About yourself, Beyond resume, How friends describe you, Educational background |
| Strengths & Weaknesses | 4 | Greatest strength, Greatest weakness, Recently learned skill, What sets you apart |
| Behavioral | 12 | Challenging situation, Teamwork, Handling pressure, Failure, Criticism, Adaptability, Leadership, Disagreements, Deadlines, Going above and beyond, Difficult team member, Quick decisions |
| Motivation & Goals | 6 | Why this company, 5-year plan, What motivates you, Why hire you, Dream job, Work culture |
| Project & Experience | 5 | Proudest project, Problem solved, Innovation, Data/analytics, Learning new tech |
| Work Style | 6 | Prioritization, Staying updated, Ideal environment, Time management, Productivity tools, Solo vs team |
| Situational | 5 | Little guidance, Mistake impact, Changing requirements, Learning fast, Team disagreement |
| Company & Closing | 8 | Company knowledge, Questions for interviewer, Work-life balance, Salary, Anything else, Other interviews, Start date, Define success |

---

## ✨ Key Features

- 🎯 **116 unique questions** — different interview every time
- 🧠 **Model-answer-based scoring** — compares against predefined correct answers
- 💡 **Smart feedback** — tells you exactly which concepts you missed
- ⏱️ **Real-time timer** — countdown during interview (10 or 15 min)
- 📊 **Animated analytics** — score gauge, bar charts, per-question breakdown
- 🎨 **Dark glassmorphism UI** — premium design with animations
- 💾 **localStorage persistence** — all data saved in browser
- 📱 **Fully responsive** — works on mobile, tablet, desktop
- 🔒 **Client-side auth** — simulated login/signup with validation

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Page structure & semantic elements |
| **CSS3** | Custom properties, glassmorphism, animations, responsive grid |
| **Vanilla JavaScript** | All logic — scoring, navigation, data persistence |
| **localStorage** | Client-side data storage (no database needed) |
| **SVG** | Custom hero illustration |

> **No frameworks, no npm, no build tools** — pure HTML/CSS/JS for simplicity.

---

## 🌐 Deployment

### Deploy to Vercel (Free)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
3. Click **"New Project"** → Import this repository
4. Click **Deploy** — done! You get a live URL like `your-project.vercel.app`

### Deploy to GitHub Pages (Free)

1. Go to your repo on GitHub
2. Settings → Pages → Source: **Deploy from branch** → Branch: `main` → Save
3. Your site will be live at `https://username.github.io/repo-name/`

---

## 📝 Future Improvements

- [ ] Integrate **Gemini/OpenAI API** for real AI-powered evaluation
- [ ] Add **voice input** for more realistic interview experience
- [ ] Add **video recording** so students can review body language
- [ ] **Backend with database** for persistent user accounts
- [ ] **Admin panel** to add/edit questions
- [ ] **Leaderboard** to compare scores with other students

---

## 👨‍💻 Author

Built as a college assignment project for AI Mock Interview Platform.

---

## 📄 License

This project is for educational purposes. Feel free to use and modify.
