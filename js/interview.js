/* ============================================
   LIVE INTERVIEW ENGINE - interview.js
   ============================================ */

// ---- Question Banks (AI Placeholder) ----
const technicalQuestions = [
    "Explain the difference between a stack and a queue. Where would you use each one in real-world applications?",
    "What is the time complexity of Binary Search? Explain how it works step by step.",
    "Explain the concept of Object-Oriented Programming. What are its four pillars?",
    "What is the difference between TCP and UDP? Give examples of where each is used.",
    "Explain normalization in databases. What is the difference between 1NF, 2NF, and 3NF?",
    "What are processes and threads? How do they differ in an operating system?",
    "Explain how a hash map (dictionary) works internally. What happens during a collision?",
    "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
    "Explain the concept of virtual memory. Why is it important in modern operating systems?",
    "What is the OSI model? Briefly explain each of its 7 layers.",
    "What is a linked list? Compare it with an array in terms of performance.",
    "Explain deadlock in operating systems. What are the four necessary conditions for a deadlock?",
    "What is DNS? Explain how a URL gets resolved to an IP address step by step.",
    "Explain the ACID properties in database management systems with examples.",
    "What are design patterns? Explain the Singleton pattern and give a use case.",
    "What is the difference between dynamic programming and greedy algorithms? Give one example of each.",
    "Explain the concept of indexing in databases. How does it improve query performance?",
    "What is a binary search tree? What are its advantages and potential issues?",
    "Explain the difference between HTTP and HTTPS. Why is HTTPS important?",
    "What is polymorphism? Explain with a code example."
];

const hrQuestions = [
    "Tell me about yourself and walk me through your resume.",
    "What are your greatest strengths and how have they helped you succeed?",
    "Describe a challenging situation you faced and how you handled it.",
    "Why do you want to work at our company? What attracts you to this role?",
    "Where do you see yourself in 5 years? What are your career goals?",
    "Tell me about a time when you worked in a team. What was your role?",
    "How do you handle pressure and stressful situations? Give an example.",
    "What is your greatest weakness? How are you working to improve it?",
    "Describe a project you are most proud of. What was your contribution?",
    "How do you prioritize tasks when you have multiple deadlines?",
    "Tell me about a time you failed. What did you learn from it?",
    "How do you handle constructive criticism? Can you give an example?",
    "What motivates you to give your best at work?",
    "Describe a situation where you had to adapt to a major change.",
    "Why should we hire you? What makes you different from other candidates?",
    "Tell me about a time you showed leadership qualities.",
    "How do you stay updated with the latest trends in your field?",
    "Describe your ideal work environment.",
    "What do you know about our company and our products/services?",
    "Do you have any questions for us? (What questions would you ask?)"
];

// ---- AI Feedback Placeholder Templates ----
const feedbackTemplates = {
    excellent: [
        "Excellent answer! You demonstrated strong understanding of the concept with clear examples.",
        "Great response! Your explanation was well-structured and covered the key points thoroughly.",
        "Outstanding! You showed deep knowledge and provided practical insights."
    ],
    good: [
        "Good answer! You covered the main points well. Consider adding more specific examples.",
        "Solid response. The core concept is clear, but you could elaborate on edge cases.",
        "Nice explanation! Try to include real-world applications to make it even stronger."
    ],
    average: [
        "Decent attempt. You touched on the basics but missed some important details. Review the core concepts.",
        "Partially correct. You understand the fundamentals, but the explanation could be more structured.",
        "Fair response. Consider organizing your answer with a clear introduction, body, and conclusion."
    ],
    poor: [
        "This needs improvement. The answer is too brief and misses key concepts. Study the topic in depth.",
        "Incomplete response. Try to cover all aspects of the question with specific details and examples.",
        "The answer shows gaps in understanding. Review the fundamentals and practice with structured responses."
    ]
};

const improvementAreas = {
    Technical: [
        { title: "Data Structures", desc: "Practice implementing stacks, queues, trees, and graphs from scratch." },
        { title: "Algorithm Analysis", desc: "Focus on time/space complexity analysis and Big-O notation." },
        { title: "System Design", desc: "Study common design patterns and system architecture principles." },
        { title: "Database Concepts", desc: "Review SQL queries, normalization, and transaction management." },
        { title: "Networking Basics", desc: "Understand OSI model, TCP/IP, DNS, and HTTP protocols." },
        { title: "OS Fundamentals", desc: "Study process management, memory management, and scheduling algorithms." }
    ],
    HR: [
        { title: "STAR Method", desc: "Structure answers using Situation, Task, Action, Result framework." },
        { title: "Self-Awareness", desc: "Prepare specific examples that highlight your strengths and growth." },
        { title: "Communication Skills", desc: "Practice articulating thoughts clearly and concisely." },
        { title: "Research & Preparation", desc: "Learn about the company, role, and industry before interviews." },
        { title: "Body Language", desc: "Maintain eye contact, sit upright, and use confident gestures." },
        { title: "Asking Questions", desc: "Prepare thoughtful questions to ask the interviewer at the end." }
    ]
};

// ---- Interview State ----
let config = null;
let questions = [];
let currentQuestionIndex = 0;
let answers = [];
let timerInterval = null;
let timeRemaining = 0;

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    renderNavbar('interview');

    // Load config
    config = JSON.parse(sessionStorage.getItem('interviewConfig'));
    if (!config) {
        window.location.href = 'select-interview.html';
        return;
    }

    // Set up questions
    const bank = config.type === 'Technical' ? [...technicalQuestions] : [...hrQuestions];
    shuffleArray(bank);
    questions = bank.slice(0, parseInt(config.questions));

    // UI Labels
    document.getElementById('interviewType').textContent =
        (config.type === 'Technical' ? '💻 ' : '🗣️ ') + config.type;
    document.getElementById('interviewCourse').textContent =
        config.course === 'BTech' ? 'B.Tech' : 'Other Graduation';

    // Timer
    timeRemaining = parseInt(config.duration) * 60;
    startTimer();

    // Show first question
    showQuestion();

    // Character counter
    document.getElementById('answerInput').addEventListener('input', function () {
        document.getElementById('charCount').textContent = this.value.length + ' characters';
    });
});

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function startTimer() {
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            endInterview();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    const display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;

    const timerEl = document.getElementById('timer');
    timerEl.classList.remove('warning', 'danger');
    if (timeRemaining <= 60) timerEl.classList.add('danger');
    else if (timeRemaining <= 180) timerEl.classList.add('warning');
}

function showQuestion() {
    const total = questions.length;
    const idx = currentQuestionIndex + 1;
    const percent = Math.round((idx / total) * 100);

    document.getElementById('questionCounter').textContent = `Question ${idx} of ${total}`;
    document.getElementById('progressPercent').textContent = `${percent}%`;
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('questionLabel').textContent = `Question ${idx}`;
    document.getElementById('questionText').textContent = questions[currentQuestionIndex];
    document.getElementById('answerInput').value = '';
    document.getElementById('charCount').textContent = '0 characters';

    // Update button text on last question
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('submitBtn').textContent = '✅ Submit & Finish';
        document.getElementById('skipBtn').classList.add('hidden');
    }

    // Animate question card
    const card = document.getElementById('questionCard');
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'fadeInUp 0.4s ease';

    // Focus answer input
    setTimeout(() => document.getElementById('answerInput').focus(), 300);
}

function submitAnswer() {
    const answer = document.getElementById('answerInput').value.trim();

    if (!answer) {
        showToast('Please type an answer before submitting', 'error');
        document.getElementById('answerInput').focus();
        return;
    }

    // Score the answer (AI Placeholder - weighted random based on answer length & content)
    const score = generateScore(answer);
    const feedback = generateFeedback(score);

    answers.push({
        question: questions[currentQuestionIndex],
        answer: answer,
        score: score,
        feedback: feedback
    });

    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        finishInterview();
    } else {
        showQuestion();
        showToast('Answer submitted! Next question →');
    }
}

function skipQuestion() {
    answers.push({
        question: questions[currentQuestionIndex],
        answer: '(Skipped)',
        score: 0,
        feedback: 'Question was skipped. Make sure to attempt all questions in a real interview.'
    });

    currentQuestionIndex++;

    if (currentQuestionIndex >= questions.length) {
        finishInterview();
    } else {
        showQuestion();
        showToast('Question skipped');
    }
}

function endInterview() {
    // Fill remaining with skipped
    while (currentQuestionIndex < questions.length) {
        answers.push({
            question: questions[currentQuestionIndex],
            answer: '(Not answered - time ran out)',
            score: 0,
            feedback: 'Time ran out before this question could be answered.'
        });
        currentQuestionIndex++;
    }
    finishInterview();
}

function generateScore(answer) {
    // AI Placeholder: Score based on answer quality heuristics
    let score = 30; // base score

    // Length bonus (more detailed answers score higher)
    if (answer.length > 300) score += 25;
    else if (answer.length > 150) score += 18;
    else if (answer.length > 80) score += 10;
    else if (answer.length > 30) score += 5;

    // Structure bonus (answers with multiple sentences)
    const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length >= 4) score += 15;
    else if (sentences.length >= 2) score += 8;

    // Keyword bonus (has technical or professional terms)
    const keywords = ['example', 'therefore', 'because', 'first', 'second',
        'advantage', 'disadvantage', 'important', 'used for', 'difference',
        'process', 'memory', 'data', 'algorithm', 'function', 'class',
        'experience', 'team', 'project', 'learned', 'challenge', 'result',
        'implemented', 'designed', 'developed', 'managed'];
    const lowerAnswer = answer.toLowerCase();
    const keywordHits = keywords.filter(k => lowerAnswer.includes(k)).length;
    score += Math.min(keywordHits * 3, 15);

    // Add some randomness (±10)
    score += Math.floor(Math.random() * 20) - 10;

    // Clamp between 10 and 98
    return Math.max(10, Math.min(98, score));
}

function generateFeedback(score) {
    let category;
    if (score >= 75) category = 'excellent';
    else if (score >= 55) category = 'good';
    else if (score >= 35) category = 'average';
    else category = 'poor';

    const templates = feedbackTemplates[category];
    return templates[Math.floor(Math.random() * templates.length)];
}

function finishInterview() {
    clearInterval(timerInterval);

    // Show overlay
    const overlay = document.getElementById('submittingOverlay');
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';

    // Calculate result
    const overallScore = Math.round(answers.reduce((sum, a) => sum + a.score, 0) / answers.length);

    // Strengths (top 3 questions)
    const sorted = [...answers].sort((a, b) => b.score - a.score);
    const strengths = sorted.slice(0, 3).filter(a => a.score > 50);

    // Pick random improvement areas
    const areas = improvementAreas[config.type];
    const shuffledAreas = [...areas].sort(() => Math.random() - 0.5).slice(0, 3);

    const result = {
        type: config.type,
        course: config.course === 'BTech' ? 'B.Tech' : 'Other Graduation',
        duration: config.duration,
        questionCount: questions.length,
        date: new Date().toISOString(),
        overallScore: overallScore,
        answers: answers,
        strengths: strengths.map(s => s.question.substring(0, 60) + '...'),
        improvements: shuffledAreas
    };

    // Save to history
    addInterviewResult(result);

    // Store current result for analytics page
    sessionStorage.setItem('latestResult', JSON.stringify(result));
    sessionStorage.removeItem('viewResultIndex');

    // Navigate after delay (simulate AI processing)
    setTimeout(() => {
        window.location.href = 'analytics.html';
    }, 2500);
}
