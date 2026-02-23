/* ============================================
   MODEL ANSWERS & KEY CONCEPTS
   Used by the scoring engine to evaluate answers
   ============================================ */

const modelAnswers = {
    // ===== DATA STRUCTURES =====
    "Explain the difference between a stack and a queue": {
        concepts: ["stack is LIFO", "last in first out", "queue is FIFO", "first in first out", "push and pop", "enqueue and dequeue", "stack used in recursion or undo", "queue used in BFS or scheduling"],
        keywords: ["stack", "queue", "lifo", "fifo", "push", "pop", "enqueue", "dequeue", "recursion", "undo", "bfs", "scheduling", "order"]
    },
    "What is a linked list": {
        concepts: ["nodes connected by pointers", "each node has data and next pointer", "dynamic memory allocation", "insertion and deletion are O(1)", "no random access unlike arrays", "arrays have O(1) access but expensive insertion"],
        keywords: ["node", "pointer", "next", "dynamic", "memory", "insertion", "deletion", "array", "random access", "sequential", "traversal", "o(1)"]
    },
    "Explain how a hash map": {
        concepts: ["key-value pair storage", "hash function converts key to index", "collision happens when two keys map to same index", "chaining uses linked lists at each bucket", "open addressing probes for next empty slot", "average O(1) lookup time"],
        keywords: ["hash", "key", "value", "index", "collision", "chaining", "probing", "bucket", "function", "o(1)", "linked list", "array"]
    },
    "What is a binary search tree": {
        concepts: ["left child is smaller than parent", "right child is greater than parent", "inorder traversal gives sorted order", "search is O(log n) for balanced tree", "can degenerate to O(n) if unbalanced", "AVL and Red-Black trees solve balancing"],
        keywords: ["left", "right", "parent", "child", "sorted", "inorder", "balanced", "search", "o(log", "avl", "node", "root", "unbalanced"]
    },
    "difference between a singly linked list and a doubly linked list": {
        concepts: ["singly has only next pointer", "doubly has both next and prev pointer", "doubly allows backward traversal", "doubly uses more memory", "deletion is easier in doubly linked list", "singly is simpler and uses less space"],
        keywords: ["singly", "doubly", "next", "prev", "previous", "backward", "forward", "memory", "traversal", "pointer", "node", "deletion"]
    },
    "What is a heap data structure": {
        concepts: ["complete binary tree", "min-heap: parent smaller than children", "max-heap: parent larger than children", "used in priority queues", "insert and extract are O(log n)", "heapify operation maintains heap property"],
        keywords: ["heap", "min-heap", "max-heap", "parent", "child", "complete", "binary tree", "priority", "heapify", "extract", "log n"]
    },
    "What is a graph": {
        concepts: ["collection of vertices and edges", "BFS uses queue for level-order traversal", "DFS uses stack or recursion for deep traversal", "BFS finds shortest path in unweighted graphs", "DFS is useful for cycle detection", "can be directed or undirected"],
        keywords: ["graph", "vertex", "edge", "bfs", "dfs", "breadth", "depth", "queue", "stack", "traversal", "shortest path", "cycle", "directed", "undirected"]
    },
    "concept of a trie data structure": {
        concepts: ["tree-like structure for storing strings", "each node represents a character", "common prefixes share nodes", "used in autocomplete and spell checker", "search time is O(length of word)", "efficient for prefix-based searching"],
        keywords: ["trie", "prefix", "character", "string", "autocomplete", "spell", "search", "node", "word", "dictionary", "tree"]
    },
    "What is a priority queue": {
        concepts: ["elements have associated priorities", "highest priority element is dequeued first", "typically implemented using heap", "different from normal FIFO queue", "used in Dijkstra and scheduling", "insert and extract are O(log n)"],
        keywords: ["priority", "queue", "heap", "highest", "lowest", "order", "dequeue", "scheduling", "dijkstra", "element", "log n"]
    },
    "difference between a tree and a graph": {
        concepts: ["tree is acyclic connected graph", "tree has exactly n-1 edges for n nodes", "graph can have cycles", "tree has a root node", "graph can be disconnected", "tree is hierarchical, graph is network"],
        keywords: ["tree", "graph", "cycle", "acyclic", "root", "edge", "node", "connected", "hierarchical", "network", "parent", "child"]
    },

    // ===== ALGORITHMS =====
    "time complexity of Binary Search": {
        concepts: ["O(log n) time complexity", "works on sorted array", "compares middle element", "divides search space in half each step", "if target < mid go left, if > go right", "much faster than linear search O(n)"],
        keywords: ["o(log n)", "sorted", "middle", "mid", "divide", "half", "compare", "left", "right", "logarithmic", "array", "search"]
    },
    "difference between dynamic programming and greedy": {
        concepts: ["DP solves overlapping subproblems", "DP uses memoization or tabulation", "greedy makes locally optimal choices", "DP guarantees global optimal solution", "greedy doesn't always give optimal", "DP example: knapsack, greedy example: coin change"],
        keywords: ["dynamic programming", "greedy", "subproblem", "memoization", "tabulation", "optimal", "overlapping", "knapsack", "local", "global"]
    },
    "concept of recursion": {
        concepts: ["function calls itself", "needs a base case to stop", "uses call stack memory", "can cause stack overflow if too deep", "divide and conquer approach", "can be converted to iteration"],
        keywords: ["recursion", "recursive", "base case", "call stack", "stack overflow", "function", "itself", "divide", "conquer", "iteration", "return"]
    },
    "difference between Merge Sort and Quick Sort": {
        concepts: ["merge sort divides then merges", "quick sort uses pivot partitioning", "merge sort is O(n log n) always", "quick sort is O(n log n) average, O(n²) worst", "merge sort is stable", "quick sort is in-place, merge sort needs extra space"],
        keywords: ["merge sort", "quick sort", "pivot", "partition", "divide", "stable", "o(n log n)", "in-place", "space", "worst case"]
    },
    "Big-O notation": {
        concepts: ["describes algorithm efficiency as input grows", "O(1) is constant time", "O(log n) is logarithmic like binary search", "O(n) is linear time", "O(n²) is quadratic like nested loops", "ignores constants and lower order terms"],
        keywords: ["big-o", "time complexity", "o(1)", "o(n)", "o(log n)", "o(n²)", "constant", "linear", "logarithmic", "quadratic", "growth", "input"]
    },
    "sorting algorithm": {
        concepts: ["bubble sort compares adjacent elements and swaps", "selection sort finds minimum and places it", "insertion sort inserts element in correct position", "all three are O(n²) worst case", "insertion sort is best for nearly sorted data", "bubble sort is simplest but least efficient"],
        keywords: ["bubble sort", "selection sort", "insertion sort", "swap", "compare", "adjacent", "minimum", "position", "o(n²)", "sorted"]
    },
    "concept of hashing": {
        concepts: ["converts input to fixed-size hash value", "good hash function distributes uniformly", "deterministic - same input gives same output", "minimizes collisions", "used in hash tables and password storage", "fast O(1) average lookup"],
        keywords: ["hash", "function", "collision", "uniform", "deterministic", "distribute", "value", "key", "bucket", "o(1)", "index"]
    },
    "Two Pointer technique": {
        concepts: ["uses two pointers that move towards each other or same direction", "works on sorted arrays typically", "reduces O(n²) to O(n)", "example: finding pair with given sum", "left pointer starts at beginning, right at end", "pointers converge based on condition"],
        keywords: ["two pointer", "left", "right", "sorted", "pair", "sum", "converge", "array", "o(n)", "beginning", "end"]
    },
    "Sliding Window technique": {
        concepts: ["maintains a window of elements", "window slides over the array", "used for subarray or substring problems", "fixed or variable window size", "avoids recomputation by sliding", "example: maximum sum subarray of size k"],
        keywords: ["sliding window", "window", "subarray", "substring", "fixed", "variable", "slide", "maximum", "minimum", "sum", "size"]
    },
    "What is backtracking": {
        concepts: ["explores all possible solutions incrementally", "abandons a path when constraint is violated", "uses recursion to try options", "prunes invalid branches early", "example: N-Queens, Sudoku solver", "builds solution step by step"],
        keywords: ["backtracking", "recursion", "constraint", "prune", "solution", "explore", "n-queen", "sudoku", "permutation", "combination", "abandon"]
    },

    // ===== OOPs =====
    "concept of Object-Oriented Programming": {
        concepts: ["encapsulation hides internal data", "inheritance allows code reuse from parent class", "polymorphism means same method different behavior", "abstraction hides complexity shows only essentials", "class is blueprint, object is instance", "promotes modularity and reusability"],
        keywords: ["encapsulation", "inheritance", "polymorphism", "abstraction", "class", "object", "oop", "pillar", "reuse", "modular", "blueprint"]
    },
    "What is polymorphism": {
        concepts: ["same method behaves differently", "compile-time: method overloading", "runtime: method overriding", "overloading: same name different parameters", "overriding: child class redefines parent method", "enables flexibility and extensibility"],
        keywords: ["polymorphism", "overloading", "overriding", "compile", "runtime", "method", "parameter", "parent", "child", "behavior", "inherit"]
    },
    "difference between abstraction and encapsulation": {
        concepts: ["abstraction hides complexity, shows what", "encapsulation hides data, controls access", "abstraction achieved via abstract class or interface", "encapsulation achieved via access modifiers", "abstraction is design level", "encapsulation is implementation level"],
        keywords: ["abstraction", "encapsulation", "hide", "complexity", "access", "modifier", "private", "public", "interface", "abstract", "data", "design"]
    },
    "concept of inheritance": {
        concepts: ["child class inherits from parent class", "promotes code reusability", "types: single, multiple, multilevel, hierarchical, hybrid", "child can override parent methods", "uses extends keyword", "IS-A relationship"],
        keywords: ["inheritance", "parent", "child", "extends", "reuse", "single", "multiple", "multilevel", "hierarchical", "override", "super", "base", "derived"]
    },
    "difference between method overloading and method overriding": {
        concepts: ["overloading: same name different parameters in same class", "overriding: same signature in child class", "overloading is compile-time polymorphism", "overriding is runtime polymorphism", "overloading changes parameter list", "overriding requires inheritance"],
        keywords: ["overloading", "overriding", "compile time", "runtime", "parameter", "signature", "same name", "inheritance", "parent", "child", "static", "dynamic"]
    },
    "interfaces and abstract classes": {
        concepts: ["interface has only abstract methods (generally)", "abstract class can have both abstract and concrete methods", "class can implement multiple interfaces", "class can extend only one abstract class", "interface defines a contract", "abstract class provides partial implementation"],
        keywords: ["interface", "abstract class", "implement", "extend", "contract", "method", "multiple", "concrete", "pure", "blueprint", "abstract"]
    },
    "SOLID principles": {
        concepts: ["Single Responsibility: one class one purpose", "Open-Closed: open for extension closed for modification", "Liskov Substitution: child can replace parent", "Interface Segregation: small specific interfaces", "Dependency Inversion: depend on abstractions not concretions"],
        keywords: ["solid", "single responsibility", "open closed", "liskov", "interface segregation", "dependency inversion", "principle", "class", "design"]
    },
    "difference between a class and an object": {
        concepts: ["class is a blueprint or template", "object is an instance of a class", "class defines properties and methods", "object holds actual values", "one class can create many objects", "class is created using class keyword, object using new keyword"],
        keywords: ["class", "object", "blueprint", "instance", "template", "new", "property", "method", "create", "define", "constructor"]
    },

    // ===== DBMS =====
    "normalization in databases": {
        concepts: ["removes data redundancy", "1NF: atomic values, no repeating groups", "2NF: no partial dependency on composite key", "3NF: no transitive dependency", "each normal form builds on previous", "improves data integrity"],
        keywords: ["normalization", "1nf", "2nf", "3nf", "redundancy", "atomic", "partial dependency", "transitive", "normal form", "integrity", "functional dependency"]
    },
    "difference between SQL and NoSQL": {
        concepts: ["SQL is relational with tables", "NoSQL is non-relational (document, key-value, graph)", "SQL has fixed schema", "NoSQL has flexible schema", "SQL good for complex queries and ACID", "NoSQL good for scalability and big data"],
        keywords: ["sql", "nosql", "relational", "non-relational", "schema", "table", "document", "flexible", "scalab", "acid", "mongodb", "mysql"]
    },
    "ACID properties": {
        concepts: ["Atomicity: all or nothing transaction", "Consistency: database stays in valid state", "Isolation: concurrent transactions don't interfere", "Durability: committed data persists after failure", "ensures reliable database transactions"],
        keywords: ["atomicity", "consistency", "isolation", "durability", "transaction", "commit", "rollback", "reliable", "valid", "concurrent", "failure"]
    },
    "indexing in databases": {
        concepts: ["data structure that speeds up queries", "B-tree or B+ tree typically used", "primary index on primary key", "secondary index on non-key columns", "speeds up SELECT but slows INSERT/UPDATE", "tradeoff between read and write performance"],
        keywords: ["index", "b-tree", "query", "speed", "performance", "primary", "secondary", "column", "search", "select", "lookup", "clustered"]
    },
    "difference between a primary key and a foreign key": {
        concepts: ["primary key uniquely identifies each row", "foreign key references primary key of another table", "primary key cannot be null", "foreign key can be null", "primary key ensures entity integrity", "foreign key ensures referential integrity"],
        keywords: ["primary key", "foreign key", "unique", "reference", "null", "table", "row", "integrity", "relationship", "constraint", "identify"]
    },
    "types of SQL joins": {
        concepts: ["INNER JOIN returns matching rows from both tables", "LEFT JOIN returns all from left plus matching right", "RIGHT JOIN returns all from right plus matching left", "FULL JOIN returns all rows from both tables", "CROSS JOIN returns cartesian product", "joins combine data from related tables"],
        keywords: ["inner join", "left join", "right join", "full join", "cross join", "table", "matching", "row", "combine", "on", "where", "cartesian"]
    },
    "What is a stored procedure": {
        concepts: ["precompiled SQL code stored in database", "can accept parameters", "reusable and reduces network traffic", "function returns a value, procedure may not", "improves performance through precompilation", "encapsulates business logic"],
        keywords: ["stored procedure", "function", "precompiled", "parameter", "reusable", "sql", "execute", "call", "performance", "return", "database"]
    },
    "difference between DELETE, TRUNCATE, and DROP": {
        concepts: ["DELETE removes specific rows with WHERE clause", "TRUNCATE removes all rows, faster than DELETE", "DROP removes entire table structure", "DELETE can be rolled back", "TRUNCATE cannot be easily rolled back", "DROP is permanent and removes schema too"],
        keywords: ["delete", "truncate", "drop", "remove", "row", "table", "where", "rollback", "permanent", "structure", "schema", "data"]
    },
    "What is a transaction in a database": {
        concepts: ["unit of work that must complete fully or not at all", "follows ACID properties", "BEGIN starts a transaction", "COMMIT saves changes permanently", "ROLLBACK undoes changes on failure", "ensures data consistency"],
        keywords: ["transaction", "commit", "rollback", "begin", "acid", "unit", "complete", "save", "undo", "consistency", "atomic"]
    },
    "triggers in databases": {
        concepts: ["automatically executed code on table events", "fires on INSERT, UPDATE, or DELETE", "can be BEFORE or AFTER the event", "used for auditing and validation", "maintains data integrity automatically", "example: log changes to audit table"],
        keywords: ["trigger", "event", "insert", "update", "delete", "before", "after", "automatic", "fire", "audit", "log", "table"]
    },

    // ===== OPERATING SYSTEMS =====
    "processes and threads": {
        concepts: ["process is independent program in execution", "thread is lightweight unit within a process", "processes have separate memory space", "threads share memory within same process", "context switching between processes is expensive", "threads communicate faster via shared memory"],
        keywords: ["process", "thread", "memory", "independent", "lightweight", "share", "context switch", "concurrent", "parallel", "pcb", "scheduling"]
    },
    "concept of virtual memory": {
        concepts: ["allows execution of processes larger than physical RAM", "uses disk space as extension of RAM", "page table maps virtual to physical addresses", "page fault occurs when page not in RAM", "enables memory isolation between processes", "uses demand paging to load pages as needed"],
        keywords: ["virtual memory", "ram", "disk", "page", "page table", "page fault", "physical", "logical", "address", "swap", "demand paging"]
    },
    "deadlock in operating systems": {
        concepts: ["two or more processes waiting for each other", "mutual exclusion: resource held exclusively", "hold and wait: holding one, waiting for another", "no preemption: can't forcibly take resource", "circular wait: circular chain of waiting", "all four conditions must hold simultaneously"],
        keywords: ["deadlock", "mutual exclusion", "hold and wait", "no preemption", "circular wait", "resource", "process", "wait", "condition", "banker"]
    },
    "CPU scheduling algorithms": {
        concepts: ["FCFS: first come first served, simple but convoy effect", "SJF: shortest job first, optimal average wait time", "Round Robin: time quantum based, fair", "priority scheduling assigns priority to processes", "preemptive vs non-preemptive variants", "goal is to minimize waiting and turnaround time"],
        keywords: ["fcfs", "sjf", "round robin", "priority", "scheduling", "quantum", "preemptive", "waiting time", "turnaround", "burst", "convoy"]
    },
    "paging and segmentation": {
        concepts: ["paging divides memory into fixed-size pages/frames", "segmentation divides into variable-size logical segments", "paging eliminates external fragmentation", "segmentation can have external fragmentation", "page table maps pages to frames", "segments correspond to logical divisions like code, data, stack"],
        keywords: ["paging", "segmentation", "page", "frame", "segment", "fixed", "variable", "fragmentation", "external", "internal", "memory", "table"]
    },
    "What is a semaphore": {
        concepts: ["synchronization mechanism for processes", "binary semaphore acts like a lock (0 or 1)", "counting semaphore controls access to limited resources", "wait (P) decrements, signal (V) increments", "prevents race conditions in critical section", "used to solve producer-consumer problem"],
        keywords: ["semaphore", "mutex", "synchronization", "wait", "signal", "critical section", "binary", "counting", "lock", "race condition", "producer", "consumer"]
    },
    "difference between multiprogramming, multitasking, and multithreading": {
        concepts: ["multiprogramming: multiple programs in memory", "multitasking: CPU switches between tasks rapidly", "multithreading: multiple threads within one process", "multiprogramming maximizes CPU utilization", "multitasking gives illusion of parallelism", "multithreading enables concurrent execution within process"],
        keywords: ["multiprogramming", "multitasking", "multithreading", "cpu", "process", "thread", "concurrent", "parallel", "switch", "memory", "time sharing"]
    },
    "inter-process communication": {
        concepts: ["mechanisms for processes to communicate", "pipes for one-way parent-child communication", "message queues for asynchronous messaging", "shared memory for fastest communication", "sockets for network communication", "signals for notifications between processes"],
        keywords: ["ipc", "inter-process", "pipe", "message queue", "shared memory", "socket", "signal", "communication", "process", "synchronization"]
    },

    // ===== COMPUTER NETWORKS =====
    "difference between TCP and UDP": {
        concepts: ["TCP is connection-oriented, UDP is connectionless", "TCP is reliable with guaranteed delivery", "UDP is faster but unreliable", "TCP uses three-way handshake", "TCP used in HTTP, email; UDP in streaming, gaming", "TCP has flow control and error checking"],
        keywords: ["tcp", "udp", "connection", "reliable", "unreliable", "handshake", "fast", "streaming", "http", "packet", "guarantee", "flow control"]
    },
    "What is the OSI model": {
        concepts: ["7-layer network communication model", "Physical: bits over wire", "Data Link: frames, MAC address", "Network: routing, IP address", "Transport: TCP/UDP, port numbers", "Session: connection management", "Presentation: encryption, compression", "Application: HTTP, FTP, DNS"],
        keywords: ["osi", "layer", "physical", "data link", "network", "transport", "session", "presentation", "application", "model", "tcp", "ip"]
    },
    "What is DNS": {
        concepts: ["Domain Name System translates domain to IP", "browser checks local cache first", "queries recursive resolver", "resolver checks root, TLD, authoritative servers", "returns IP address to browser", "hierarchical distributed naming system"],
        keywords: ["dns", "domain", "ip address", "resolver", "name server", "root", "cache", "query", "translate", "hierarchical", "url"]
    },
    "difference between HTTP and HTTPS": {
        concepts: ["HTTP is unencrypted, HTTPS is encrypted", "HTTPS uses SSL/TLS for encryption", "HTTPS on port 443, HTTP on port 80", "HTTPS needs SSL certificate", "HTTPS protects against man-in-middle attacks", "HTTPS is required for secure transactions"],
        keywords: ["http", "https", "ssl", "tls", "encryption", "secure", "certificate", "port", "man-in-middle", "data", "protocol"]
    },
    "What is a firewall": {
        concepts: ["monitors and filters network traffic", "blocks unauthorized access", "uses rules to allow or deny traffic", "can be hardware or software", "types: packet filtering, stateful, application level", "acts as barrier between trusted and untrusted networks"],
        keywords: ["firewall", "traffic", "filter", "block", "allow", "rule", "security", "network", "packet", "unauthorized", "protection"]
    },
    "difference between IPv4 and IPv6": {
        concepts: ["IPv4 is 32-bit, IPv6 is 128-bit", "IPv4 has ~4.3 billion addresses", "IPv6 has virtually unlimited addresses", "IPv6 has simplified header", "IPv4 uses NAT due to address shortage", "IPv6 has built-in security (IPSec)"],
        keywords: ["ipv4", "ipv6", "32-bit", "128-bit", "address", "shortage", "nat", "header", "ipsec", "billion", "hexadecimal"]
    },
    "What is subnetting": {
        concepts: ["divides a network into smaller sub-networks", "uses subnet mask to define network and host portions", "improves security and reduces broadcast traffic", "CIDR notation like /24 specifies subnet size", "allows efficient IP address allocation", "each subnet is a separate broadcast domain"],
        keywords: ["subnet", "mask", "network", "host", "cidr", "divide", "broadcast", "ip address", "allocation", "domain"]
    },
    "TCP three-way handshake": {
        concepts: ["client sends SYN packet to server", "server replies with SYN-ACK", "client responds with ACK", "establishes reliable connection", "both sides agree on sequence numbers", "happens before data transfer begins"],
        keywords: ["syn", "ack", "syn-ack", "handshake", "connection", "establish", "tcp", "sequence", "client", "server", "three"]
    },
    "difference between a router, switch, and hub": {
        concepts: ["hub broadcasts to all ports (Layer 1)", "switch forwards to specific MAC address (Layer 2)", "router routes between different networks (Layer 3)", "hub has one collision domain", "switch has separate collision domains per port", "router uses IP addresses for routing"],
        keywords: ["router", "switch", "hub", "layer", "broadcast", "mac", "ip", "forward", "port", "collision domain", "network"]
    },
    "What is ARP": {
        concepts: ["Address Resolution Protocol maps IP to MAC address", "broadcasts ARP request on local network", "device with matching IP sends ARP reply with MAC", "maintains ARP cache/table", "works at Data Link layer", "essential for local network communication"],
        keywords: ["arp", "address resolution", "mac", "ip", "broadcast", "request", "reply", "cache", "table", "mapping", "layer"]
    },

    // ===== WEB & SYSTEM DESIGN =====
    "design patterns": {
        concepts: ["reusable solutions to common software problems", "Singleton ensures only one instance of a class", "use case: database connection, logger", "types: creational, structural, behavioral", "Factory pattern creates objects without specifying class", "promotes clean and maintainable code"],
        keywords: ["design pattern", "singleton", "instance", "factory", "creational", "structural", "behavioral", "reusable", "solution", "one instance"]
    },
    "What is REST API": {
        concepts: ["Representational State Transfer architectural style", "uses HTTP methods: GET, POST, PUT, DELETE", "stateless - each request contains all info", "resources identified by URLs", "responses usually in JSON format", "follows client-server architecture"],
        keywords: ["rest", "api", "get", "post", "put", "delete", "stateless", "resource", "url", "json", "http", "endpoint"]
    },
    "MVC architecture": {
        concepts: ["Model handles data and business logic", "View handles user interface display", "Controller handles input and updates model/view", "separates concerns for maintainability", "user interacts with view, controller processes", "widely used in web frameworks"],
        keywords: ["model", "view", "controller", "mvc", "separation", "concern", "data", "interface", "logic", "request", "architecture"]
    },
    "What is caching": {
        concepts: ["stores frequently accessed data in fast storage", "reduces database load and response time", "cache hit: data found in cache", "cache miss: data not in cache, must fetch", "strategies: LRU, LFU, FIFO eviction", "CDN caches content at edge locations"],
        keywords: ["cache", "memory", "fast", "hit", "miss", "lru", "eviction", "cdn", "redis", "store", "performance", "ttl"]
    },
    "difference between monolithic and microservices": {
        concepts: ["monolithic: entire app as single deployable unit", "microservices: small independent services", "monolithic simpler to develop and test initially", "microservices scale independently", "microservices can use different technologies", "microservices communicate via APIs"],
        keywords: ["monolithic", "microservices", "service", "independent", "deploy", "scale", "api", "single", "distributed", "container"]
    },
    "what an API is": {
        concepts: ["Application Programming Interface for software communication", "SOAP uses XML and strict standards", "REST uses HTTP and is lightweight", "REST is more popular for web services", "SOAP has built-in security (WS-Security)", "API enables integration between systems"],
        keywords: ["api", "soap", "rest", "interface", "xml", "json", "http", "web service", "request", "response", "protocol"]
    },

    // ===== HR - SELF INTRODUCTION =====
    "Tell me about yourself": {
        concepts: ["brief personal introduction", "educational background", "relevant skills and technologies", "key projects or experience", "career interests and passion", "why you're here today"],
        keywords: ["name", "education", "college", "university", "skill", "project", "experience", "interest", "career", "background", "passionate", "technology"]
    },
    "not on your resume": {
        concepts: ["personal qualities not listed on resume", "hobbies or volunteer work", "personal values and character", "unique perspective or interest", "soft skills or personality traits"],
        keywords: ["hobby", "personal", "volunteer", "interest", "quality", "character", "outside", "passion", "value", "unique", "beyond"]
    },
    "friends or colleagues describe you": {
        concepts: ["positive personality traits", "how others see your work ethic", "specific example of trait", "reliable and trustworthy", "team player or hard worker"],
        keywords: ["describe", "reliable", "hard-working", "dedicated", "supportive", "honest", "team", "personality", "helpful", "creative"]
    },
    "educational background": {
        concepts: ["degree and institution", "major subjects or courses", "how education relates to role", "academic achievements", "practical learning from courses"],
        keywords: ["education", "degree", "college", "university", "course", "subject", "learn", "academic", "knowledge", "prepared"]
    },

    // ===== HR - STRENGTHS & WEAKNESSES =====
    "greatest strengths": {
        concepts: ["specific strength with example", "how strength helped in real situation", "relevant to the job", "problem solving or communication", "demonstrate self-awareness"],
        keywords: ["strength", "skill", "problem solving", "communication", "team", "leader", "analytical", "creative", "example", "helped"]
    },
    "greatest weakness": {
        concepts: ["honest about a real weakness", "show self-awareness", "explain what you're doing to improve", "not a critical job requirement", "turn weakness into growth story"],
        keywords: ["weakness", "improve", "working on", "learning", "feedback", "growth", "aware", "developing", "better", "overcome"]
    },
    "skill you recently learned": {
        concepts: ["specific new skill", "how and where you learned it", "practical application", "motivation to learn", "result or impact"],
        keywords: ["learn", "new", "skill", "applied", "course", "project", "practice", "technology", "improve", "result"]
    },

    // ===== HR - BEHAVIORAL =====
    "challenging situation you faced": {
        concepts: ["specific situation described", "what made it challenging", "actions you took", "result or outcome", "what you learned", "use STAR method"],
        keywords: ["challenge", "situation", "action", "result", "learned", "problem", "solved", "overcame", "difficult", "outcome"]
    },
    "worked in a team": {
        concepts: ["specific team project", "your role in the team", "how you contributed", "teamwork and collaboration", "outcome of team effort"],
        keywords: ["team", "role", "collaborate", "group", "contributed", "together", "project", "communication", "result", "helped"]
    },
    "handle pressure and stressful situations": {
        concepts: ["specific stressful example", "techniques to manage stress", "staying calm and focused", "prioritizing tasks under pressure", "positive outcome despite pressure"],
        keywords: ["pressure", "stress", "calm", "focus", "prioritize", "deadline", "manage", "handle", "organized", "plan"]
    },
    "time you failed": {
        concepts: ["honest about a failure", "what went wrong", "what you learned from it", "how you improved after", "shows growth mindset"],
        keywords: ["fail", "mistake", "learn", "lesson", "wrong", "improve", "growth", "experience", "realized", "changed"]
    },
    "handle constructive criticism": {
        concepts: ["open to receiving feedback", "listen without being defensive", "use feedback to improve", "specific example", "appreciate the growth opportunity"],
        keywords: ["criticism", "feedback", "constructive", "improve", "accept", "listen", "change", "open", "learn", "positive"]
    },
    "adapt to a major change": {
        concepts: ["specific change situation", "initial reaction", "steps to adapt", "staying flexible", "positive outcome from adaptation"],
        keywords: ["adapt", "change", "flexible", "adjust", "new", "situation", "learn", "transition", "evolve", "positive"]
    },
    "showed leadership qualities": {
        concepts: ["specific leadership situation", "taking initiative", "guiding or mentoring others", "making decisions", "achieving a team goal"],
        keywords: ["leader", "initiative", "team", "guided", "decision", "responsibility", "organized", "goal", "led", "mentor"]
    },
    "disagreed with your manager": {
        concepts: ["respectful disagreement", "presented your viewpoint with evidence", "listened to their perspective", "found a compromise", "professional communication"],
        keywords: ["disagree", "respect", "evidence", "perspective", "compromise", "discuss", "listen", "resolve", "professional", "solution"]
    },
    "tight deadline": {
        concepts: ["specific deadline situation", "how you prioritized", "time management strategies", "delivered on time", "maintained quality"],
        keywords: ["deadline", "time", "prioritize", "deliver", "managed", "fast", "quality", "pressure", "organized", "plan"]
    },
    "above and beyond": {
        concepts: ["went beyond basic requirements", "took extra initiative", "helped others or added value", "positive impact recognized", "personal motivation to excel"],
        keywords: ["extra", "beyond", "initiative", "effort", "exceeded", "voluntary", "above", "impact", "help", "proactive"]
    },
    "difficult team member": {
        concepts: ["specific difficult situation", "tried to understand their perspective", "communicated openly", "found a resolution", "maintained professionalism"],
        keywords: ["difficult", "team", "communicate", "understand", "resolve", "patience", "perspective", "professional", "collaborate", "handle"]
    },
    "quick decision": {
        concepts: ["situation requiring fast action", "how you assessed the situation", "decision-making process", "outcome of the decision", "lessons learned"],
        keywords: ["decision", "quick", "fast", "analyze", "risk", "judgment", "outcome", "confident", "result", "situation"]
    },

    // ===== HR - MOTIVATION & GOALS =====
    "Why do you want to work at our company": {
        concepts: ["knowledge about the company", "alignment with company values", "excitement about the role", "how you can contribute", "growth opportunities"],
        keywords: ["company", "role", "values", "culture", "growth", "mission", "contribute", "opportunity", "passion", "align"]
    },
    "Where do you see yourself in 5 years": {
        concepts: ["career growth plan", "skill development goals", "leadership aspirations", "alignment with company trajectory", "realistic and ambitious"],
        keywords: ["future", "goal", "career", "grow", "skill", "develop", "lead", "role", "advance", "achieve", "vision"]
    },
    "What motivates you": {
        concepts: ["genuine sources of motivation", "intrinsic vs extrinsic motivation", "examples of motivated behavior", "alignment with job role", "passion for impact"],
        keywords: ["motivate", "passion", "drive", "goal", "impact", "challenge", "purpose", "satisfaction", "growth", "achieve"]
    },
    "Why should we hire you": {
        concepts: ["unique value proposition", "relevant skills and experience", "how you'd contribute to team", "what sets you apart", "enthusiasm for the role"],
        keywords: ["unique", "skill", "value", "contribute", "qualified", "experience", "different", "strength", "bring", "team"]
    },
    "dream job": {
        concepts: ["describe ideal role", "connection to current opportunity", "long-term career vision", "what fulfills you professionally", "realistic expectations"],
        keywords: ["dream", "ideal", "passion", "goal", "career", "align", "role", "fulfill", "aspire", "enjoy"]
    },

    // ===== HR - PROJECT & EXPERIENCE =====
    "project you are most proud of": {
        concepts: ["specific project description", "your role and contributions", "technologies or skills used", "challenges overcome", "impact or result"],
        keywords: ["project", "built", "developed", "contribution", "technology", "result", "team", "challenge", "impact", "designed"]
    },
    "problem you solved": {
        concepts: ["clear problem statement", "your approach to solving", "tools or methods used", "result achieved", "what you learned"],
        keywords: ["problem", "solved", "solution", "approach", "analyze", "fix", "result", "tool", "method", "learned"]
    },

    // ===== HR - WORK STYLE =====
    "How do you prioritize tasks": {
        concepts: ["prioritization framework", "urgent vs important distinction", "using lists or tools", "deadline management", "example of prioritizing"],
        keywords: ["prioritize", "urgent", "important", "deadline", "list", "plan", "organize", "task", "manage", "schedule"]
    },
    "stay updated with the latest trends": {
        concepts: ["specific sources of learning", "blogs, courses, communities", "following industry leaders", "applying new knowledge", "continuous learning mindset"],
        keywords: ["learn", "read", "blog", "course", "trend", "technology", "community", "follow", "update", "news"]
    },
    "ideal work environment": {
        concepts: ["preferred work culture", "collaboration preferences", "growth opportunities needed", "work-life balance importance", "type of team you thrive in"],
        keywords: ["environment", "culture", "team", "collaborative", "growth", "support", "flexible", "balance", "creative", "innovative"]
    },

    // ===== HR - SITUATIONAL =====
    "given a project with very little guidance": {
        concepts: ["self-directed approach", "research and gather information", "ask clarifying questions", "break down into smaller tasks", "seek feedback iteratively"],
        keywords: ["research", "plan", "ask", "clarify", "break down", "initiative", "self", "goal", "start", "guide"]
    },
    "mistake that affected the team": {
        concepts: ["take responsibility", "honest about the mistake", "immediate corrective action", "learned from it", "prevented recurrence"],
        keywords: ["mistake", "responsibility", "honest", "fix", "learn", "apologize", "solution", "own", "team", "prevent"]
    },
    "changing requirements": {
        concepts: ["stay flexible and adaptable", "communicate with stakeholders", "reprioritize accordingly", "agile mindset", "document changes"],
        keywords: ["change", "flexible", "adapt", "communicate", "agile", "prioritize", "stakeholder", "scope", "requirement", "manage"]
    },

    // ===== HR - COMPANY & CLOSING =====
    "know about our company": {
        concepts: ["company products or services", "company mission or values", "recent news or achievements", "market position", "why this company interests you"],
        keywords: ["company", "product", "service", "mission", "industry", "market", "research", "customer", "value", "interested"]
    },
    "questions for us": {
        concepts: ["thoughtful questions about the role", "questions about team and culture", "growth opportunities inquiry", "day-to-day responsibilities", "shows genuine interest"],
        keywords: ["question", "team", "culture", "growth", "role", "opportunity", "day-to-day", "expect", "project", "challenge"]
    },
    "work-life balance": {
        concepts: ["importance of boundaries", "strategies for balance", "healthy habits", "time management", "sustainable work pace"],
        keywords: ["balance", "boundary", "health", "personal", "time", "manage", "sustainable", "hobby", "recharge", "well-being"]
    },
    "salary range": {
        concepts: ["researched market rate", "based on skills and experience", "open to discussion", "focus on value not just money", "total compensation perspective"],
        keywords: ["salary", "market", "research", "value", "experience", "fair", "range", "negotiate", "compensation", "growth"]
    },
    "define success": {
        concepts: ["personal definition of success", "measurable outcomes", "growth and learning", "impact on team or company", "continuous improvement"],
        keywords: ["success", "goal", "impact", "growth", "achieve", "learn", "contribute", "measurable", "improve", "value"]
    }
};
