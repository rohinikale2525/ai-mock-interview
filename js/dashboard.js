/* ============================================
   DASHBOARD - dashboard.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    renderNavbar('dashboard');

    const user = getCurrentUser();
    const history = getInterviewHistory();

    // Welcome text
    document.getElementById('welcomeText').textContent = `Welcome back, ${user.name.split(' ')[0]}! 👋`;

    // Stats
    document.getElementById('totalInterviews').textContent = history.length;

    if (history.length > 0) {
        const avg = Math.round(history.reduce((sum, h) => sum + h.overallScore, 0) / history.length);
        document.getElementById('avgScore').textContent = avg + '%';

        // Best category
        const categories = {};
        history.forEach(h => {
            if (!categories[h.type]) categories[h.type] = [];
            categories[h.type].push(h.overallScore);
        });
        let best = '';
        let bestAvg = 0;
        for (const [cat, scores] of Object.entries(categories)) {
            const a = scores.reduce((s, v) => s + v, 0) / scores.length;
            if (a > bestAvg) { bestAvg = a; best = cat; }
        }
        document.getElementById('bestCategory').textContent = best || '—';
    }

    // History list
    const historyList = document.getElementById('historyList');
    if (history.length > 0) {
        historyList.innerHTML = history.slice(0, 5).map((item, i) => `
      <div class="history-item" style="animation: fadeInUp 0.4s ease ${i * 0.1}s both; cursor: pointer;" onclick="viewResult(${i})">
        <div class="history-info">
          <div class="history-icon" style="background: ${item.type === 'Technical' ? 'rgba(124, 58, 237, 0.15)' : 'rgba(6, 182, 212, 0.15)'}">
            ${item.type === 'Technical' ? '💻' : '🗣️'}
          </div>
          <div class="history-details">
            <h4>${item.type} Interview</h4>
            <p>${formatDate(item.date)} • ${item.questionCount} questions • ${item.course}</p>
          </div>
        </div>
        <div class="history-score" style="color: ${getScoreColor(item.overallScore)}">
          ${item.overallScore}%
        </div>
      </div>
    `).join('');
    }
});

function viewResult(index) {
    sessionStorage.setItem('viewResultIndex', index);
    window.location.href = 'analytics.html';
}
