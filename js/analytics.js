/* ============================================
   ANALYTICS / RESULTS - analytics.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    renderNavbar('analytics');

    let result = null;

    // Check if viewing a specific result from history
    const viewIndex = sessionStorage.getItem('viewResultIndex');
    if (viewIndex !== null) {
        const history = getInterviewHistory();
        result = history[parseInt(viewIndex)];
        sessionStorage.removeItem('viewResultIndex');
    }

    // Or viewing latest result
    if (!result) {
        const latest = sessionStorage.getItem('latestResult');
        if (latest) {
            result = JSON.parse(latest);
            sessionStorage.removeItem('latestResult');
            // Trigger confetti for good scores
            if (result.overallScore >= 70) {
                setTimeout(() => launchConfetti(), 500);
            }
        }
    }

    // Fallback: show latest from history
    if (!result) {
        const history = getInterviewHistory();
        if (history.length > 0) {
            result = history[0];
        } else {
            document.querySelector('.page-content .container').innerHTML = `
        <div class="text-center" style="padding: 6rem 2rem;">
          <div style="font-size: 4rem; margin-bottom: var(--space-lg);">📊</div>
          <h2>No Results Yet</h2>
          <p class="text-secondary mt-sm mb-xl">Take your first interview to see analytics</p>
          <a href="select-interview.html" class="btn btn-primary btn-lg">Start Interview →</a>
        </div>
      `;
            return;
        }
    }

    renderResults(result);
    renderHistory();
});

function renderResults(result) {
    // Header
    document.getElementById('resultType').innerHTML =
        `${result.type === 'Technical' ? '💻' : '🗣️'} ${result.type} Interview`;
    document.getElementById('resultMeta').textContent =
        `${result.questionCount} Questions • ${result.course} • ${formatDate(result.date)}`;

    // Score gauge animation
    const score = result.overallScore;
    const scoreCircle = document.getElementById('scoreCircle');
    const circumference = 2 * Math.PI * 80; // r=80
    const offset = circumference - (score / 100) * circumference;

    setTimeout(() => {
        scoreCircle.style.strokeDashoffset = offset;
    }, 300);

    // Animate score counter
    animateCounter('scoreValue', score);

    // Score tag
    document.getElementById('scoreTag').innerHTML = getScoreTag(score);

    // Performance breakdown - group by score ranges
    const excellent = result.answers.filter(a => a.score >= 75).length;
    const good = result.answers.filter(a => a.score >= 50 && a.score < 75).length;
    const needsWork = result.answers.filter(a => a.score < 50).length;
    const total = result.answers.length;

    document.getElementById('performanceBreakdown').innerHTML = `
    <div>
      <div class="d-flex justify-between mb-xs" style="font-size: 0.85rem;">
        <span>✅ Excellent (75%+)</span>
        <span style="font-weight: 600; color: var(--accent-green);">${excellent}/${total}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width: ${(excellent / total) * 100}%; background: var(--accent-green);"></div></div>
    </div>
    <div>
      <div class="d-flex justify-between mb-xs" style="font-size: 0.85rem;">
        <span>👍 Good (50-74%)</span>
        <span style="font-weight: 600; color: var(--accent-cyan);">${good}/${total}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width: ${(good / total) * 100}%; background: var(--accent-cyan);"></div></div>
    </div>
    <div>
      <div class="d-flex justify-between mb-xs" style="font-size: 0.85rem;">
        <span>⚠️ Needs Work (&lt;50%)</span>
        <span style="font-weight: 600; color: var(--accent-amber);">${needsWork}/${total}</span>
      </div>
      <div class="progress-bar"><div class="progress-fill" style="width: ${(needsWork / total) * 100}%; background: var(--accent-amber);"></div></div>
    </div>
  `;

    // Quick stats
    const bestScore = Math.max(...result.answers.map(a => a.score));
    const lowestScore = Math.min(...result.answers.map(a => a.score));
    const attempted = result.answers.filter(a => a.answer !== '(Skipped)' && !a.answer.includes('Not answered')).length;

    document.getElementById('quickStats').innerHTML = `
    <div class="d-flex justify-between align-center">
      <span class="text-secondary" style="font-size: 0.9rem;">🏆 Best Score</span>
      <span style="font-weight: 700; color: var(--accent-green);">${bestScore}%</span>
    </div>
    <div class="d-flex justify-between align-center">
      <span class="text-secondary" style="font-size: 0.9rem;">📉 Lowest Score</span>
      <span style="font-weight: 700; color: var(--accent-amber);">${lowestScore}%</span>
    </div>
    <div class="d-flex justify-between align-center">
      <span class="text-secondary" style="font-size: 0.9rem;">📝 Attempted</span>
      <span style="font-weight: 700;">${attempted}/${total}</span>
    </div>
    <div class="d-flex justify-between align-center">
      <span class="text-secondary" style="font-size: 0.9rem;">⏱️ Duration</span>
      <span style="font-weight: 700;">${result.duration} mins</span>
    </div>
  `;

    // Bar chart - per question scores
    const barChart = document.getElementById('barChart');
    barChart.innerHTML = result.answers.map((a, i) => `
    <div class="bar-item">
      <div class="bar-value">${a.score}%</div>
      <div class="bar" style="height: ${Math.max(a.score, 4)}%; background: ${a.score >= 75 ? 'linear-gradient(to top, #10b981, #34d399)' :
            a.score >= 50 ? 'linear-gradient(to top, #06b6d4, #22d3ee)' :
                a.score >= 30 ? 'linear-gradient(to top, #f59e0b, #fbbf24)' :
                    'linear-gradient(to top, #ef4444, #f87171)'
        }"></div>
      <div class="bar-label">Q${i + 1}</div>
    </div>
  `).join('');

    // Strengths
    const strengthsList = document.getElementById('strengthsList');
    const topAnswers = [...result.answers]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .filter(a => a.score > 40);

    if (topAnswers.length > 0) {
        strengthsList.innerHTML = topAnswers.map(a => `
      <li>
        <div class="imp-icon" style="background: rgba(16, 185, 129, 0.15);">💪</div>
        <div>
          <div class="imp-title">${a.question.substring(0, 70)}...</div>
          <div class="imp-desc">Scored ${a.score}% — ${a.feedback}</div>
        </div>
      </li>
    `).join('');
    } else {
        strengthsList.innerHTML = '<li class="text-muted">Keep practicing to build your strengths!</li>';
    }

    // Improvements
    const improvementsList = document.getElementById('improvementsList');
    if (result.improvements && result.improvements.length > 0) {
        improvementsList.innerHTML = result.improvements.map(imp => `
      <li>
        <div class="imp-icon" style="background: rgba(245, 158, 11, 0.15);">🎯</div>
        <div>
          <div class="imp-title">${imp.title}</div>
          <div class="imp-desc">${imp.desc}</div>
        </div>
      </li>
    `).join('');
    }

    // Detailed Q&A feedback
    const feedbackList = document.getElementById('feedbackList');
    feedbackList.innerHTML = result.answers.map((a, i) => `
    <div class="card glass feedback-card" style="animation: fadeInUp 0.4s ease ${i * 0.08}s both;">
      <div class="q-header">
        <span class="q-number">Question ${i + 1}</span>
        <span class="q-score" style="color: ${getScoreColor(a.score)}">${a.score}% ${getScoreTag(a.score)}</span>
      </div>
      <div class="q-text">${a.question}</div>
      <div class="q-answer">
        <strong style="color: var(--text-muted); font-size: 0.8rem; display: block; margin-bottom: 4px;">YOUR ANSWER:</strong>
        ${a.answer}
      </div>
      <div class="q-feedback">
        <strong style="color: var(--accent-green); font-size: 0.8rem; display: block; margin-bottom: 4px;">🤖 AI FEEDBACK:</strong>
        ${a.feedback}
      </div>
    </div>
  `).join('');
}

function renderHistory() {
    const history = getInterviewHistory();
    if (history.length < 2) return;

    const section = document.getElementById('historySection');
    section.style.display = 'block';

    const chart = document.getElementById('historyChart');
    const recent = history.slice(0, 8).reverse(); // oldest to newest

    chart.innerHTML = recent.map((h, i) => `
    <div class="bar-item">
      <div class="bar-value">${h.overallScore}%</div>
      <div class="bar" style="height: ${Math.max(h.overallScore, 4)}%; background: var(--accent-gradient);"></div>
      <div class="bar-label">#${i + 1}</div>
    </div>
  `).join('');
}

function animateCounter(elementId, target) {
    const el = document.getElementById(elementId);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const interval = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        el.textContent = current;
    }, 30);
}
