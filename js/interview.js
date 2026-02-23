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

    // Score the answer using question-specific keyword matching
    const score = generateScore(answer, questions[currentQuestionIndex]);
    const feedback = generateFeedback(score, answer, questions[currentQuestionIndex]);

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

// ---- Question-Specific Keyword Map for Smart Scoring ----
const questionKeywords = {
    // Technical Questions
    "stack": ["stack", "lifo", "last in first out", "push", "pop", "recursion", "undo", "backtrack"],
    "queue": ["queue", "fifo", "first in first out", "enqueue", "dequeue", "bfs", "scheduling", "printer"],
    "binary search": ["binary search", "log n", "o(log", "sorted", "mid", "middle", "divide", "half", "left", "right"],
    "object-oriented": ["oop", "object oriented", "encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object"],
    "tcp": ["tcp", "udp", "reliable", "unreliable", "connection", "connectionless", "handshake", "packet", "stream", "datagram"],
    "normalization": ["normalization", "1nf", "2nf", "3nf", "normal form", "redundancy", "dependency", "functional", "primary key", "partial"],
    "process": ["process", "thread", "scheduling", "context switch", "pcb", "multithreading", "concurrent", "parallel", "shared memory"],
    "hash map": ["hash", "map", "dictionary", "key", "value", "collision", "chaining", "probing", "bucket", "hash function"],
    "sql and nosql": ["sql", "nosql", "relational", "non-relational", "mongodb", "mysql", "schema", "flexible", "scalab", "table", "document", "structured"],
    "virtual memory": ["virtual memory", "paging", "page table", "swap", "physical", "logical", "address", "ram", "disk", "page fault"],
    "osi model": ["osi", "layer", "physical", "data link", "network", "transport", "session", "presentation", "application", "tcp/ip"],
    "linked list": ["linked list", "node", "pointer", "next", "array", "dynamic", "insertion", "deletion", "traversal", "sequential"],
    "deadlock": ["deadlock", "mutual exclusion", "hold and wait", "no preemption", "circular wait", "resource", "starvation", "banker"],
    "dns": ["dns", "domain", "ip address", "resolver", "name server", "root", "query", "record", "a record", "cache", "url"],
    "acid": ["acid", "atomicity", "consistency", "isolation", "durability", "transaction", "commit", "rollback", "database"],
    "design pattern": ["design pattern", "singleton", "factory", "observer", "instance", "creational", "structural", "behavioral", "reusab"],
    "dynamic programming": ["dynamic programming", "greedy", "optimal", "subproblem", "memoization", "tabulation", "overlapping", "knapsack", "fibonacci"],
    "indexing": ["index", "b-tree", "b+ tree", "query", "search", "performance", "primary", "secondary", "clustered", "faster"],
    "binary search tree": ["bst", "binary search tree", "left", "right", "inorder", "balanced", "avl", "node", "root", "search"],
    "http": ["http", "https", "ssl", "tls", "secure", "encryption", "certificate", "port 80", "port 443", "protocol"],
    "polymorphism": ["polymorphism", "overriding", "overloading", "runtime", "compile time", "method", "inherit", "virtual", "interface", "abstract"],
    // HR Questions
    "tell me about yourself": ["name", "experience", "background", "education", "college", "university", "skills", "passionate", "career", "interest", "studying", "working"],
    "strengths": ["strength", "good at", "ability", "skill", "problem solving", "communication", "leader", "team", "quick learner", "analytical", "creative"],
    "challenging situation": ["challenge", "difficult", "problem", "solved", "overcame", "situation", "action", "result", "learned", "obstacle", "handled"],
    "why do you want": ["company", "role", "position", "mission", "values", "culture", "growth", "opportunity", "align", "passion", "interested", "contribute"],
    "5 years": ["future", "goal", "career", "grow", "position", "role", "skills", "develop", "lead", "advance", "achieve", "vision"],
    "team": ["team", "collaborate", "group", "together", "role", "contributed", "coordinate", "helped", "communication", "member"],
    "pressure": ["pressure", "stress", "calm", "prioritize", "deadline", "manage", "handle", "breath", "focus", "organized", "plan"],
    "weakness": ["weakness", "improve", "working on", "area", "learning", "feedback", "better", "growth", "developing", "overcome"],
    "project": ["project", "built", "developed", "created", "implemented", "designed", "team", "technology", "result", "contribution", "app", "system"],
    "prioritize": ["prioritize", "priority", "urgent", "important", "deadline", "schedule", "task", "manage", "organize", "list", "plan"],
    "failed": ["fail", "mistake", "learned", "lesson", "wrong", "setback", "improve", "experience", "growth", "realized"],
    "criticism": ["criticism", "feedback", "constructive", "improve", "accept", "learn", "change", "perspective", "open", "positive"],
    "motivates": ["motivate", "passion", "drive", "inspired", "goal", "impact", "satisfaction", "challenge", "purpose", "achieve"],
    "adapt": ["adapt", "change", "flexible", "adjust", "new", "situation", "learn", "pivot", "transition", "evolve"],
    "hire you": ["unique", "skill", "value", "contribute", "experience", "qualified", "different", "strength", "bring", "proven"],
    "leadership": ["leader", "leadership", "led", "guided", "initiative", "team", "decision", "responsibility", "organized", "mentor"],
    "updated": ["learn", "read", "blog", "course", "update", "trend", "news", "technology", "follow", "community", "conference"],
    "ideal work": ["work environment", "culture", "team", "collaborative", "growth", "support", "creative", "flexible", "innovative", "balance"],
    "know about our": ["company", "product", "service", "mission", "industry", "founded", "customer", "market", "research", "known for"],
    "questions for us": ["question", "ask", "growth", "team", "culture", "role", "day-to-day", "expect", "opportunity", "challenge"]
};

function generateScore(answer, question) {
    const lowerAnswer = answer.toLowerCase();
    const lowerQuestion = question.toLowerCase();

    // ---- Step 1: Detect gibberish/fake answers (score 2-8%) ----
    // Check for nonsensical patterns
    const words = lowerAnswer.split(/\s+/).filter(w => w.length > 1);
    const uniqueWords = new Set(words);

    // If answer is too short (less than 3 words), it's definitely bad
    if (words.length < 3) {
        return Math.floor(Math.random() * 5) + 2; // 2-6%
    }

    // If most words are repeated (spam detection)
    if (uniqueWords.size < words.length * 0.3 && words.length > 5) {
        return Math.floor(Math.random() * 6) + 3; // 3-8%
    }

    // Check if answer has real English words (basic check)
    const commonWords = ['the', 'is', 'a', 'an', 'it', 'in', 'to', 'of', 'and', 'for', 'that', 'this', 'with', 'are', 'was', 'be', 'have', 'has', 'can', 'will', 'not', 'but', 'or', 'which', 'when', 'where', 'how', 'what', 'they', 'we', 'you', 'my', 'its', 'from', 'by', 'on', 'at', 'as', 'use', 'used'];
    const realWordCount = words.filter(w => commonWords.includes(w) || w.length > 3).length;
    const realWordRatio = realWordCount / words.length;

    if (realWordRatio < 0.25) {
        return Math.floor(Math.random() * 7) + 2; // 2-8% for gibberish
    }

    // ---- Step 2: Question-specific keyword relevance (0-50 points) ----
    let relevanceScore = 0;
    let matchedKeywordSets = 0;
    let totalKeywordsMatched = 0;

    for (const [topic, keywords] of Object.entries(questionKeywords)) {
        if (lowerQuestion.includes(topic)) {
            matchedKeywordSets++;
            const hits = keywords.filter(k => lowerAnswer.includes(k)).length;
            totalKeywordsMatched += hits;
            // Score based on percentage of keywords matched
            const hitRatio = hits / keywords.length;
            relevanceScore += hitRatio * 50;
        }
    }

    // If we found matching keyword sets, average them
    if (matchedKeywordSets > 0) {
        relevanceScore = relevanceScore / matchedKeywordSets;
    } else {
        // Fallback: extract key words from question and check if answer addresses them
        const questionWords = lowerQuestion.split(/\s+/).filter(w => w.length > 4 && !['which', 'where', 'would', 'about', 'their', 'other', 'explain', 'describe', 'briefly'].includes(w));
        const questionHits = questionWords.filter(w => lowerAnswer.includes(w)).length;
        relevanceScore = Math.min((questionHits / Math.max(questionWords.length, 1)) * 40, 40);
    }

    // If NO relevant keywords matched at all, cap the score very low
    if (totalKeywordsMatched === 0 && relevanceScore < 5) {
        // Answer is completely irrelevant to the question
        const maxScore = 12 + Math.floor(Math.random() * 6); // cap at 12-17%
        return Math.min(maxScore, 17);
    }

    // ---- Step 3: Length & detail bonus (0-20 points) ----
    let lengthScore = 0;
    if (answer.length > 400) lengthScore = 20;
    else if (answer.length > 250) lengthScore = 16;
    else if (answer.length > 150) lengthScore = 12;
    else if (answer.length > 80) lengthScore = 7;
    else if (answer.length > 40) lengthScore = 3;

    // ---- Step 4: Structure bonus (0-15 points) ----
    let structureScore = 0;
    const sentences = answer.split(/[.!?]+/).filter(s => s.trim().length > 5);
    if (sentences.length >= 5) structureScore = 15;
    else if (sentences.length >= 3) structureScore = 10;
    else if (sentences.length >= 2) structureScore = 5;

    // ---- Step 5: Professional language bonus (0-15 points) ----
    let professionalScore = 0;
    const proTerms = ['for example', 'such as', 'therefore', 'because', 'however', 'in addition',
        'first', 'second', 'third', 'finally', 'moreover', 'furthermore', 'in conclusion',
        'advantage', 'disadvantage', 'important', 'specifically', 'essentially'];
    const proHits = proTerms.filter(t => lowerAnswer.includes(t)).length;
    professionalScore = Math.min(proHits * 4, 15);

    // ---- Calculate total ----
    let total = Math.round(relevanceScore + lengthScore + structureScore + professionalScore);

    // Small random variance (±3)
    total += Math.floor(Math.random() * 7) - 3;

    // Clamp between 3 and 97
    return Math.max(3, Math.min(97, total));
}

function generateFeedback(score, answer, question) {
    let category;
    if (score >= 75) category = 'excellent';
    else if (score >= 50) category = 'good';
    else if (score >= 30) category = 'average';
    else category = 'poor';

    const templates = feedbackTemplates[category];
    let feedback = templates[Math.floor(Math.random() * templates.length)];

    // Add specific hints for poor/average scores
    if (score < 30) {
        const lowerQ = question.toLowerCase();
        if (lowerQ.includes('difference')) feedback += ' Make sure to clearly compare both concepts.';
        else if (lowerQ.includes('explain')) feedback += ' Provide a clear definition first, then elaborate with examples.';
        else if (lowerQ.includes('example')) feedback += ' Include at least one concrete, real-world example.';
        else feedback += ' Re-read the question carefully and address each part specifically.';
    }

    return feedback;
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
