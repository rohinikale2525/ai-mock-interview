/* ============================================
   SHARED UTILITIES - app.js
   ============================================ */

// ---- LocalStorage Helpers ----
const Store = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

// ---- Auth ----
function getCurrentUser() {
  return Store.get('mockInterviewUser');
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'signup.html';
    return false;
  }
  return true;
}

function logout() {
  Store.remove('mockInterviewUser');
  window.location.href = 'index.html';
}

// ---- Navbar ----
function renderNavbar(activePage) {
  const user = getCurrentUser();
  const nav = document.getElementById('mainNavbar');
  if (!nav) return;

  const initials = user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '';

  if (user) {
    nav.innerHTML = `
      <div class="container">
        <a href="dashboard.html" class="navbar-brand">
          <span class="brand-icon">🎯</span>
          InterviewAI
        </a>
        <ul class="navbar-nav" id="navLinks">
          <li><a href="dashboard.html" class="${activePage === 'dashboard' ? 'active' : ''}">Dashboard</a></li>
          <li><a href="select-interview.html" class="${activePage === 'interview' ? 'active' : ''}">New Interview</a></li>
          <li><a href="analytics.html" class="${activePage === 'analytics' ? 'active' : ''}">Analytics</a></li>
          <li><a href="profile.html" class="${activePage === 'profile' ? 'active' : ''}">Profile</a></li>
        </ul>
        <div class="nav-user">
          <div class="nav-avatar" onclick="logout()" title="Click to logout">${initials}</div>
          <button class="nav-toggle" onclick="toggleNav()">☰</button>
        </div>
      </div>
    `;
  } else {
    nav.innerHTML = `
      <div class="container">
        <a href="index.html" class="navbar-brand">
          <span class="brand-icon">🎯</span>
          InterviewAI
        </a>
        <ul class="navbar-nav" id="navLinks">
          <li><a href="index.html" class="${activePage === 'home' ? 'active' : ''}">Home</a></li>
          <li><a href="signup.html" class="btn btn-primary btn-sm">Get Started</a></li>
        </ul>
        <button class="nav-toggle" onclick="toggleNav()">☰</button>
      </div>
    `;
  }
}

function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  if (navLinks) navLinks.classList.toggle('open');
}

// ---- Toast Notifications ----
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${type === 'success' ? '✅' : '❌'} ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ---- Confetti ----
function launchConfetti() {
  const colors = ['#7c3aed', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#ffffff'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.width = (Math.random() * 8 + 4) + 'px';
    piece.style.height = (Math.random() * 8 + 4) + 'px';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
}

// ---- Floating Particles ----
function initParticles() {
  const container = document.querySelector('.particles');
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.width = p.style.height = (Math.random() * 4 + 2) + 'px';
    container.appendChild(p);
  }
}

// ---- Intersection Observer for Animations ----
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
}

// ---- Interview History ----
function getInterviewHistory() {
  return Store.get('interviewHistory') || [];
}

function addInterviewResult(result) {
  const history = getInterviewHistory();
  history.unshift(result);
  Store.set('interviewHistory', history);
}

// ---- Format Date ----
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ---- Score Color ----
function getScoreColor(score) {
  if (score >= 80) return 'var(--accent-green)';
  if (score >= 60) return 'var(--accent-cyan)';
  if (score >= 40) return 'var(--accent-amber)';
  return 'var(--accent-red)';
}

function getScoreTag(score) {
  if (score >= 80) return '<span class="tag tag-green">Excellent</span>';
  if (score >= 60) return '<span class="tag tag-cyan">Good</span>';
  if (score >= 40) return '<span class="tag tag-amber">Average</span>';
  return '<span class="tag tag-red">Needs Work</span>';
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollAnimations();
});
