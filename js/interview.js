/* ============================================
   LIVE INTERVIEW ENGINE - interview.js
   ============================================ */

// ---- Question Banks (AI Placeholder) ----
const technicalQuestions = [
    // --- Data Structures ---
    "Explain the difference between a stack and a queue. Where would you use each one in real-world applications?",
    "What is a linked list? Compare it with an array in terms of performance.",
    "Explain how a hash map (dictionary) works internally. What happens during a collision?",
    "What is a binary search tree? What are its advantages and potential issues?",
    "Explain the difference between a singly linked list and a doubly linked list.",
    "What is a heap data structure? Explain the difference between min-heap and max-heap.",
    "What is a graph? Explain the difference between BFS and DFS traversal.",
    "Explain the concept of a trie data structure. Where is it commonly used?",
    "What is a priority queue? How is it different from a normal queue?",
    "Explain the difference between a tree and a graph data structure.",
    // --- Algorithms ---
    "What is the time complexity of Binary Search? Explain how it works step by step.",
    "What is the difference between dynamic programming and greedy algorithms? Give one example of each.",
    "Explain the concept of recursion. What are its advantages and disadvantages?",
    "What is the difference between Merge Sort and Quick Sort? Which one is better and why?",
    "Explain Big-O notation. What is the difference between O(n), O(log n), and O(n²)?",
    "What is a sorting algorithm? Compare Bubble Sort, Selection Sort, and Insertion Sort.",
    "Explain the concept of hashing. What makes a good hash function?",
    "What is the Two Pointer technique? Give an example of a problem it can solve.",
    "Explain the Sliding Window technique with an example.",
    "What is backtracking? Give an example of a problem solved using backtracking.",
    // --- OOPs ---
    "Explain the concept of Object-Oriented Programming. What are its four pillars?",
    "What is polymorphism? Explain with a code example.",
    "What is the difference between abstraction and encapsulation? Give real-world examples.",
    "Explain the concept of inheritance. What are its types?",
    "What is the difference between method overloading and method overriding?",
    "What are interfaces and abstract classes? When would you use each?",
    "Explain the SOLID principles in object-oriented design.",
    "What is the difference between a class and an object? Explain with an example.",
    // --- DBMS ---
    "Explain normalization in databases. What is the difference between 1NF, 2NF, and 3NF?",
    "What is the difference between SQL and NoSQL databases? When would you choose one over the other?",
    "Explain the ACID properties in database management systems with examples.",
    "Explain the concept of indexing in databases. How does it improve query performance?",
    "What is the difference between a primary key and a foreign key?",
    "Explain different types of SQL joins with examples.",
    "What is a stored procedure? How is it different from a function?",
    "Explain the difference between DELETE, TRUNCATE, and DROP commands in SQL.",
    "What is a transaction in a database? Explain commit and rollback.",
    "What are triggers in databases? Give an example of when you would use one.",
    // --- Operating Systems ---
    "What are processes and threads? How do they differ in an operating system?",
    "Explain the concept of virtual memory. Why is it important in modern operating systems?",
    "Explain deadlock in operating systems. What are the four necessary conditions for a deadlock?",
    "What are the different types of CPU scheduling algorithms? Compare FCFS, SJF, and Round Robin.",
    "Explain paging and segmentation in memory management.",
    "What is a semaphore? How does it help in process synchronization?",
    "What is the difference between multiprogramming, multitasking, and multithreading?",
    "Explain the concept of inter-process communication (IPC). What methods are used?",
    // --- Computer Networks ---
    "What is the difference between TCP and UDP? Give examples of where each is used.",
    "What is the OSI model? Briefly explain each of its 7 layers.",
    "What is DNS? Explain how a URL gets resolved to an IP address step by step.",
    "Explain the difference between HTTP and HTTPS. Why is HTTPS important?",
    "What is a firewall? Explain how it protects a network.",
    "Explain the difference between IPv4 and IPv6.",
    "What is subnetting? Why is it used in networking?",
    "What is the TCP three-way handshake? Explain each step.",
    "Explain the difference between a router, switch, and hub.",
    "What is ARP (Address Resolution Protocol)? How does it work?",
    // --- Web & System Design ---
    "What are design patterns? Explain the Singleton pattern and give a use case.",
    "What is REST API? Explain its principles and how it works.",
    "Explain the concept of MVC architecture. What are its components?",
    "What is caching? Explain different caching strategies.",
    "What is the difference between monolithic and microservices architecture?",
    "Explain what an API is. What is the difference between SOAP and REST?"
];

const hrQuestions = [
    // --- Self Introduction ---
    "Tell me about yourself and walk me through your resume.",
    "What would you like us to know about you that is not on your resume?",
    "How would your friends or colleagues describe you?",
    "Give me a brief overview of your educational background and how it prepared you for this role.",
    // --- Strengths & Weaknesses ---
    "What are your greatest strengths and how have they helped you succeed?",
    "What is your greatest weakness? How are you working to improve it?",
    "Tell me about a skill you recently learned and how you applied it.",
    "What technical or soft skills do you think set you apart from other candidates?",
    // --- Behavioral ---
    "Describe a challenging situation you faced and how you handled it.",
    "Tell me about a time when you worked in a team. What was your role?",
    "How do you handle pressure and stressful situations? Give an example.",
    "Tell me about a time you failed. What did you learn from it?",
    "How do you handle constructive criticism? Can you give an example?",
    "Describe a situation where you had to adapt to a major change.",
    "Tell me about a time you showed leadership qualities.",
    "Tell me about a time you disagreed with your manager or professor. How did you resolve it?",
    "Describe a situation where you had to meet a very tight deadline.",
    "Give an example of a time you went above and beyond what was expected.",
    "Tell me about a situation where you had to work with a difficult team member.",
    "Describe a time when you had to make a quick decision without all the information.",
    // --- Motivation & Goals ---
    "Why do you want to work at our company? What attracts you to this role?",
    "Where do you see yourself in 5 years? What are your career goals?",
    "What motivates you to give your best at work?",
    "Why should we hire you? What makes you different from other candidates?",
    "What is your dream job? How does this role align with it?",
    "What kind of work culture do you thrive in?",
    // --- Project & Experience ---
    "Describe a project you are most proud of. What was your contribution?",
    "Walk me through a problem you solved in your last project or internship.",
    "What is the most innovative idea you have ever implemented?",
    "Describe a time when you used data or analytics to make a decision.",
    "Tell me about a technical project where you had to learn a new technology quickly.",
    // --- Work Style & Skills ---
    "How do you prioritize tasks when you have multiple deadlines?",
    "How do you stay updated with the latest trends in your field?",
    "Describe your ideal work environment.",
    "How do you manage your time when working on multiple projects?",
    "What tools or methods do you use to stay organized and productive?",
    "Do you prefer working independently or in a team? Why?",
    // --- Situational ---
    "If you disagree with your team's approach to a problem, how would you handle it?",
    "If you were given a project with very little guidance, how would you start?",
    "How would you handle a situation where you made a mistake that affected the team?",
    "If a client or stakeholder kept changing requirements, how would you deal with it?",
    "How would you approach learning a completely new technology in one week?",
    // --- Company & Closing ---
    "What do you know about our company and our products/services?",
    "Do you have any questions for us? (What questions would you ask?)",
    "How do you handle work-life balance?",
    "What salary range are you expecting? How do you determine your value?",
    "Is there anything else you would like to add that we haven't discussed?",
    "Where else are you interviewing? How does this role compare?",
    "When would you be available to start if selected?",
    "How do you define success in a professional context?"
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
    // ===== TECHNICAL - Data Structures =====
    "stack": ["stack", "lifo", "last in first out", "push", "pop", "recursion", "undo", "backtrack"],
    "queue": ["queue", "fifo", "first in first out", "enqueue", "dequeue", "bfs", "scheduling", "printer"],
    "linked list": ["linked list", "node", "pointer", "next", "array", "dynamic", "insertion", "deletion", "traversal", "sequential", "singly", "doubly"],
    "hash map": ["hash", "map", "dictionary", "key", "value", "collision", "chaining", "probing", "bucket", "hash function"],
    "binary search tree": ["bst", "binary search tree", "left", "right", "inorder", "balanced", "avl", "node", "root", "search"],
    "heap": ["heap", "min-heap", "max-heap", "priority", "complete binary tree", "parent", "child", "heapify", "extract"],
    "graph": ["graph", "bfs", "dfs", "breadth first", "depth first", "vertex", "edge", "adjacency", "traversal", "visited", "node"],
    "trie": ["trie", "prefix", "autocomplete", "search", "character", "node", "dictionary", "word", "string"],
    "priority queue": ["priority queue", "heap", "priority", "dequeue", "highest", "lowest", "scheduling", "order"],
    "tree": ["tree", "graph", "root", "leaf", "child", "parent", "cycle", "hierarchical", "node", "edge", "connected"],

    // ===== TECHNICAL - Algorithms =====
    "binary search": ["binary search", "log n", "o(log", "sorted", "mid", "middle", "divide", "half", "left", "right"],
    "dynamic programming": ["dynamic programming", "greedy", "optimal", "subproblem", "memoization", "tabulation", "overlapping", "knapsack", "fibonacci"],
    "recursion": ["recursion", "recursive", "base case", "call stack", "stack overflow", "divide", "conquer", "function call", "return"],
    "merge sort": ["merge sort", "quick sort", "divide", "conquer", "pivot", "partition", "stable", "unstable", "o(n log", "comparison"],
    "big-o": ["big-o", "time complexity", "space complexity", "o(n)", "o(log", "o(n²)", "o(1)", "constant", "linear", "quadratic", "logarithmic"],
    "sorting algorithm": ["bubble sort", "selection sort", "insertion sort", "swap", "compare", "pass", "sorted", "unsorted", "stable", "in-place"],
    "hashing": ["hash", "hash function", "collision", "uniform", "distribution", "deterministic", "bucket", "modulo", "key", "digest"],
    "two pointer": ["two pointer", "left", "right", "converge", "sorted", "pair", "sum", "opposite", "index"],
    "sliding window": ["sliding window", "window", "subarray", "substring", "fixed", "variable", "expand", "shrink", "maximum", "minimum"],
    "backtracking": ["backtracking", "recursion", "constraint", "solution", "explore", "prune", "n-queen", "sudoku", "permutation", "combination"],

    // ===== TECHNICAL - OOPs =====
    "object-oriented": ["oop", "object oriented", "encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object"],
    "polymorphism": ["polymorphism", "overriding", "overloading", "runtime", "compile time", "method", "inherit", "virtual", "interface", "abstract"],
    "abstraction": ["abstraction", "encapsulation", "hide", "detail", "interface", "implementation", "access", "modifier", "private", "public", "abstract"],
    "inheritance": ["inheritance", "parent", "child", "base", "derived", "extends", "super", "single", "multiple", "multilevel", "hierarchical", "hybrid"],
    "overloading": ["overloading", "overriding", "compile time", "runtime", "same name", "parameter", "signature", "static", "dynamic", "binding"],
    "interface": ["interface", "abstract class", "implement", "extend", "contract", "method", "multiple inheritance", "pure virtual", "blueprint"],
    "solid": ["solid", "single responsibility", "open closed", "liskov", "interface segregation", "dependency inversion", "principle", "design"],
    "class": ["class", "object", "instance", "constructor", "method", "attribute", "property", "blueprint", "instantiate", "new"],

    // ===== TECHNICAL - DBMS =====
    "normalization": ["normalization", "1nf", "2nf", "3nf", "normal form", "redundancy", "dependency", "functional", "primary key", "partial"],
    "sql and nosql": ["sql", "nosql", "relational", "non-relational", "mongodb", "mysql", "schema", "flexible", "scalab", "table", "document", "structured"],
    "acid": ["acid", "atomicity", "consistency", "isolation", "durability", "transaction", "commit", "rollback", "database"],
    "indexing": ["index", "b-tree", "b+ tree", "query", "search", "performance", "primary", "secondary", "clustered", "faster"],
    "primary key": ["primary key", "foreign key", "unique", "reference", "constraint", "relationship", "table", "null", "candidate", "composite"],
    "join": ["join", "inner join", "left join", "right join", "full join", "cross join", "table", "on", "where", "combine", "matching"],
    "stored procedure": ["stored procedure", "function", "reusable", "parameter", "execute", "call", "sql", "performance", "precompiled", "return"],
    "delete": ["delete", "truncate", "drop", "remove", "table", "row", "data", "structure", "rollback", "where", "permanent", "undo"],
    "transaction": ["transaction", "commit", "rollback", "begin", "savepoint", "acid", "consistent", "atomic", "isolation", "database"],
    "trigger": ["trigger", "event", "before", "after", "insert", "update", "delete", "automatic", "fire", "table", "row"],

    // ===== TECHNICAL - Operating Systems =====
    "process": ["process", "thread", "scheduling", "context switch", "pcb", "multithreading", "concurrent", "parallel", "shared memory"],
    "virtual memory": ["virtual memory", "paging", "page table", "swap", "physical", "logical", "address", "ram", "disk", "page fault"],
    "deadlock": ["deadlock", "mutual exclusion", "hold and wait", "no preemption", "circular wait", "resource", "starvation", "banker"],
    "scheduling algorithm": ["fcfs", "sjf", "round robin", "priority", "scheduling", "preemptive", "non-preemptive", "burst", "waiting time", "turnaround"],
    "paging": ["paging", "segmentation", "page", "frame", "segment", "memory", "address", "table", "external", "internal", "fragmentation"],
    "semaphore": ["semaphore", "mutex", "synchronization", "wait", "signal", "critical section", "binary", "counting", "lock", "process"],
    "multiprogramming": ["multiprogramming", "multitasking", "multithreading", "concurrent", "parallel", "cpu", "time sharing", "process", "thread"],
    "inter-process": ["ipc", "inter-process", "pipe", "message queue", "shared memory", "socket", "signal", "communication", "process"],

    // ===== TECHNICAL - Computer Networks =====
    "tcp": ["tcp", "udp", "reliable", "unreliable", "connection", "connectionless", "handshake", "packet", "stream", "datagram"],
    "osi model": ["osi", "layer", "physical", "data link", "network", "transport", "session", "presentation", "application", "tcp/ip"],
    "dns": ["dns", "domain", "ip address", "resolver", "name server", "root", "query", "record", "a record", "cache", "url"],
    "http": ["http", "https", "ssl", "tls", "secure", "encryption", "certificate", "port 80", "port 443", "protocol"],
    "firewall": ["firewall", "security", "packet", "filter", "rule", "block", "allow", "traffic", "network", "intrusion", "protection"],
    "ipv4": ["ipv4", "ipv6", "address", "32-bit", "128-bit", "header", "nat", "shortage", "hexadecimal", "decimal"],
    "subnetting": ["subnet", "subnetting", "mask", "network", "host", "cidr", "divide", "ip address", "block", "range"],
    "three-way handshake": ["syn", "ack", "syn-ack", "handshake", "connection", "establish", "tcp", "sequence", "three-way", "step"],
    "router": ["router", "switch", "hub", "layer", "forward", "broadcast", "mac", "ip", "packet", "network", "collision domain"],
    "arp": ["arp", "address resolution", "mac", "ip", "broadcast", "request", "reply", "cache", "mapping", "layer 2"],

    // ===== TECHNICAL - Web & System Design =====
    "design pattern": ["design pattern", "singleton", "factory", "observer", "instance", "creational", "structural", "behavioral", "reusab"],
    "rest api": ["rest", "api", "endpoint", "get", "post", "put", "delete", "stateless", "resource", "json", "http", "url"],
    "mvc": ["mvc", "model", "view", "controller", "separation", "concern", "architecture", "request", "response", "route"],
    "caching": ["cache", "caching", "memory", "redis", "cdn", "hit", "miss", "ttl", "eviction", "lru", "performance", "store"],
    "microservices": ["monolithic", "microservices", "service", "deploy", "independent", "scalab", "api", "container", "docker", "distributed"],
    "soap": ["api", "soap", "rest", "interface", "request", "response", "endpoint", "xml", "json", "protocol", "web service"],

    // ===== HR - Self Introduction =====
    "tell me about yourself": ["name", "experience", "background", "education", "college", "university", "skills", "passionate", "career", "interest", "studying", "working"],
    "not on your resume": ["passion", "hobby", "personal", "value", "interest", "outside", "beyond", "character", "quality", "unique", "volunteer"],
    "friends": ["describe", "reliable", "hard-working", "fun", "honest", "dedicated", "supportive", "personality", "character", "think"],
    "educational background": ["education", "college", "university", "degree", "course", "subject", "study", "learn", "academic", "prepared", "knowledge"],

    // ===== HR - Strengths & Weaknesses =====
    "strengths": ["strength", "good at", "ability", "skill", "problem solving", "communication", "leader", "team", "quick learner", "analytical", "creative"],
    "weakness": ["weakness", "improve", "working on", "area", "learning", "feedback", "better", "growth", "developing", "overcome"],
    "skill you recently": ["learned", "skill", "new", "applied", "practice", "course", "online", "project", "technology", "improve"],
    "set you apart": ["unique", "different", "skill", "stand out", "experience", "ability", "strength", "advantage", "special", "value"],

    // ===== HR - Behavioral =====
    "challenging situation": ["challenge", "difficult", "problem", "solved", "overcame", "situation", "action", "result", "learned", "obstacle", "handled"],
    "team": ["team", "collaborate", "group", "together", "role", "contributed", "coordinate", "helped", "communication", "member"],
    "pressure": ["pressure", "stress", "calm", "prioritize", "deadline", "manage", "handle", "breath", "focus", "organized", "plan"],
    "failed": ["fail", "mistake", "learned", "lesson", "wrong", "setback", "improve", "experience", "growth", "realized"],
    "criticism": ["criticism", "feedback", "constructive", "improve", "accept", "learn", "change", "perspective", "open", "positive"],
    "adapt": ["adapt", "change", "flexible", "adjust", "new", "situation", "learn", "pivot", "transition", "evolve"],
    "leadership": ["leader", "leadership", "led", "guided", "initiative", "team", "decision", "responsibility", "organized", "mentor"],
    "disagreed": ["disagree", "conflict", "resolved", "discuss", "compromise", "perspective", "listen", "understand", "respect", "solution"],
    "tight deadline": ["deadline", "tight", "fast", "urgent", "time", "pressure", "prioritize", "deliver", "managed", "on time"],
    "above and beyond": ["extra", "beyond", "initiative", "voluntary", "exceeded", "above", "effort", "went further", "additional", "proactive"],
    "difficult team member": ["difficult", "conflict", "team", "resolve", "communicate", "understand", "patience", "perspective", "collaborate", "handle"],
    "quick decision": ["decision", "quick", "analyze", "intuition", "risk", "information", "judgment", "outcome", "confident", "result"],

    // ===== HR - Motivation & Goals =====
    "why do you want": ["company", "role", "position", "mission", "values", "culture", "growth", "opportunity", "align", "passion", "interested", "contribute"],
    "5 years": ["future", "goal", "career", "grow", "position", "role", "skills", "develop", "lead", "advance", "achieve", "vision"],
    "motivates": ["motivate", "passion", "drive", "inspired", "goal", "impact", "satisfaction", "challenge", "purpose", "achieve"],
    "hire you": ["unique", "skill", "value", "contribute", "experience", "qualified", "different", "strength", "bring", "proven"],
    "dream job": ["dream", "ideal", "passion", "goal", "align", "career", "aspire", "role", "fulfill", "long-term"],
    "work culture": ["culture", "collaborative", "team", "environment", "supportive", "innovative", "open", "value", "growth", "flexible"],

    // ===== HR - Project & Experience =====
    "project": ["project", "built", "developed", "created", "implemented", "designed", "team", "technology", "result", "contribution", "app", "system"],
    "problem you solved": ["problem", "solved", "solution", "approach", "analyze", "debug", "fix", "issue", "result", "overcame"],
    "innovative": ["innovative", "idea", "creative", "new", "solution", "approach", "different", "implemented", "unique", "original"],
    "data or analytics": ["data", "analytics", "analysis", "metric", "insight", "decision", "chart", "trend", "evidence", "information"],
    "learn a new technology": ["learn", "technology", "new", "quickly", "documentation", "tutorial", "practice", "hands-on", "project", "adapted"],

    // ===== HR - Work Style =====
    "prioritize": ["prioritize", "priority", "urgent", "important", "deadline", "schedule", "task", "manage", "organize", "list", "plan"],
    "updated": ["learn", "read", "blog", "course", "update", "trend", "news", "technology", "follow", "community", "conference"],
    "ideal work": ["work environment", "culture", "team", "collaborative", "growth", "support", "creative", "flexible", "innovative", "balance"],
    "manage your time": ["time management", "schedule", "plan", "organize", "deadline", "calendar", "prioritize", "efficient", "routine", "productive"],
    "tools or methods": ["tool", "method", "planner", "calendar", "notion", "trello", "list", "organize", "productive", "system"],
    "independently or in a team": ["independent", "team", "both", "self-motivated", "collaborate", "flexible", "depend", "situation", "prefer", "comfortable"],

    // ===== HR - Situational =====
    "disagree with your team": ["disagree", "team", "approach", "discuss", "evidence", "compromise", "perspective", "listen", "propose", "alternative"],
    "very little guidance": ["guidance", "self-directed", "research", "plan", "ask", "clarify", "goal", "break down", "initiative", "start"],
    "mistake that affected": ["mistake", "responsibility", "own up", "apologize", "fix", "learn", "honest", "transparent", "solution", "team"],
    "changing requirements": ["requirements", "change", "flexible", "adapt", "communicate", "agile", "prioritize", "scope", "stakeholder", "manage"],
    "new technology in one week": ["learn", "fast", "documentation", "tutorial", "practice", "hands-on", "focus", "dedicate", "resource", "project"],

    // ===== HR - Company & Closing =====
    "know about our": ["company", "product", "service", "mission", "industry", "founded", "customer", "market", "research", "known for"],
    "questions for us": ["question", "ask", "growth", "team", "culture", "role", "day-to-day", "expect", "opportunity", "challenge"],
    "work-life balance": ["balance", "boundary", "health", "time", "personal", "hobby", "recharge", "manage", "sustainable", "well-being"],
    "salary": ["salary", "value", "market", "research", "experience", "fair", "range", "compensation", "negotiate", "growth"],
    "anything else": ["add", "mention", "highlight", "strength", "passionate", "excited", "opportunity", "thank", "eager", "contribute"],
    "where else": ["interviewing", "opportunity", "compare", "interest", "first choice", "align", "explore", "option", "role", "company"],
    "available to start": ["available", "start", "immediately", "notice", "join", "ready", "week", "month", "transition", "date"],
    "define success": ["success", "goal", "impact", "growth", "value", "achieve", "measurable", "learn", "contribute", "improve"]
};

function findModelAnswer(question) {
    const lowerQ = question.toLowerCase();
    let bestMatch = null;
    let bestMatchLen = 0;
    for (const key of Object.keys(modelAnswers)) {
        const lowerKey = key.toLowerCase();
        if (lowerQ.includes(lowerKey) && lowerKey.length > bestMatchLen) {
            bestMatch = modelAnswers[key];
            bestMatchLen = lowerKey.length;
        }
    }
    return bestMatch;
}

function generateScore(answer, question) {
    const lowerAnswer = answer.toLowerCase();
    const lowerQuestion = question.toLowerCase();

    // ---- Step 1: Detect gibberish/fake answers (score 2-8%) ----
    const words = lowerAnswer.split(/\s+/).filter(w => w.length > 1);
    const uniqueWords = new Set(words);

    if (words.length < 3) return Math.floor(Math.random() * 5) + 2;
    if (uniqueWords.size < words.length * 0.3 && words.length > 5) return Math.floor(Math.random() * 6) + 3;

    const commonWords = ['the', 'is', 'a', 'an', 'it', 'in', 'to', 'of', 'and', 'for', 'that', 'this', 'with', 'are', 'was', 'be', 'have', 'has', 'can', 'will', 'not', 'but', 'or', 'which', 'when', 'where', 'how', 'what', 'they', 'we', 'you', 'my', 'its', 'from', 'by', 'on', 'at', 'as', 'use', 'used'];
    const realWordCount = words.filter(w => commonWords.includes(w) || w.length > 3).length;
    if (realWordCount / words.length < 0.25) return Math.floor(Math.random() * 7) + 2;

    // ---- Step 2: Model Answer Concept Matching (0-45 points) ----
    let conceptScore = 0;
    let totalKeywordsMatched = 0;
    const model = findModelAnswer(question);

    if (model) {
        // Check key concepts covered
        const conceptHits = model.concepts.filter(c => lowerAnswer.includes(c.toLowerCase())).length;
        // Check keyword matches
        const keywordHits = model.keywords.filter(k => lowerAnswer.includes(k)).length;
        totalKeywordsMatched = conceptHits + keywordHits;

        const conceptRatio = conceptHits / model.concepts.length;
        const keywordRatio = keywordHits / model.keywords.length;
        // Concepts worth 25 points, keywords worth 20 points
        conceptScore = (conceptRatio * 25) + (keywordRatio * 20);
    } else {
        // Fallback to questionKeywords if no model answer found
        for (const [topic, keywords] of Object.entries(questionKeywords)) {
            if (lowerQuestion.includes(topic)) {
                const hits = keywords.filter(k => lowerAnswer.includes(k)).length;
                totalKeywordsMatched += hits;
                conceptScore += (hits / keywords.length) * 45;
            }
        }
    }

    // If ZERO relevant content matched, cap score very low
    if (totalKeywordsMatched === 0) {
        return Math.floor(Math.random() * 6) + 10; // 10-15%
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

    // ---- Step 5: Professional language bonus (0-20 points) ----
    let professionalScore = 0;
    const proTerms = ['for example', 'such as', 'therefore', 'because', 'however', 'in addition',
        'first', 'second', 'third', 'finally', 'moreover', 'furthermore', 'in conclusion',
        'advantage', 'disadvantage', 'important', 'specifically', 'essentially', 'for instance'];
    const proHits = proTerms.filter(t => lowerAnswer.includes(t)).length;
    professionalScore = Math.min(proHits * 4, 20);

    // ---- Calculate total ----
    let total = Math.round(conceptScore + lengthScore + structureScore + professionalScore);
    total += Math.floor(Math.random() * 5) - 2; // ±2 variance
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

    // Add specific hints based on model answer
    if (score < 50) {
        const model = findModelAnswer(question);
        if (model) {
            const lowerAnswer = answer.toLowerCase();
            const missed = model.concepts.filter(c => !lowerAnswer.includes(c.toLowerCase()));
            if (missed.length > 0) {
                const hint = missed.slice(0, 2).join('" and "');
                feedback += ` Key concepts missed: "${hint}".`;
            }
        } else {
            const lowerQ = question.toLowerCase();
            if (lowerQ.includes('difference')) feedback += ' Make sure to clearly compare both concepts.';
            else if (lowerQ.includes('explain')) feedback += ' Provide a clear definition first, then elaborate with examples.';
            else feedback += ' Re-read the question carefully and address each part specifically.';
        }
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
