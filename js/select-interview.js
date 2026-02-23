/* ============================================
   INTERVIEW SELECTION - select-interview.js
   ============================================ */

let currentStep = 1;
const totalSteps = 4;
const config = {
    type: null,
    course: null,
    duration: null,
    questions: null
};

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    renderNavbar('interview');
    updateStepUI();
});

function selectOption(card, field) {
    // Remove selected from siblings
    card.parentElement.querySelectorAll('.select-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    config[field] = card.dataset.value;

    // Show next button
    document.getElementById('nextBtn').classList.remove('hidden');

    // Auto-advance after a short delay
    setTimeout(() => {
        if (currentStep < totalSteps) {
            nextStep();
        } else {
            showSummary();
        }
    }, 400);
}

function nextStep() {
    if (!config[getFieldForStep(currentStep)]) {
        showToast('Please select an option first', 'error');
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateStepUI();
    } else {
        showSummary();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        document.getElementById('stepSummary').classList.add('hidden');
        updateStepUI();
    }
}

function getFieldForStep(step) {
    return ['type', 'course', 'duration', 'questions'][step - 1];
}

function updateStepUI() {
    // Hide all steps
    document.querySelectorAll('.interview-step').forEach(s => s.classList.add('hidden'));

    // Show current step
    const stepEl = document.getElementById('step' + currentStep);
    stepEl.classList.remove('hidden');
    stepEl.style.animation = 'fadeInUp 0.4s ease';

    // Update step indicator
    document.querySelectorAll('.step-dot').forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i + 1 < currentStep) dot.classList.add('completed');
        if (i + 1 === currentStep) dot.classList.add('active');
    });
    document.querySelectorAll('.step-line').forEach((line, i) => {
        line.classList.remove('completed');
        if (i + 1 < currentStep) line.classList.add('completed');
    });

    // Navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.classList.toggle('hidden', currentStep === 1);
    nextBtn.classList.add('hidden');
}

function showSummary() {
    document.querySelectorAll('.interview-step').forEach(s => s.classList.add('hidden'));

    // Mark all steps completed
    document.querySelectorAll('.step-dot').forEach(dot => {
        dot.classList.remove('active');
        dot.classList.add('completed');
    });
    document.querySelectorAll('.step-line').forEach(line => line.classList.add('completed'));

    const summaryEl = document.getElementById('stepSummary');
    summaryEl.classList.remove('hidden');
    summaryEl.style.animation = 'scaleIn 0.5s ease';

    document.getElementById('summaryGrid').innerHTML = `
    <div class="card" style="padding: var(--space-md); text-align: center;">
      <div style="font-size: 1.5rem; margin-bottom: 4px;">${config.type === 'Technical' ? '💻' : '🗣️'}</div>
      <div class="text-muted" style="font-size: 0.8rem;">Type</div>
      <div style="font-weight: 600;">${config.type}</div>
    </div>
    <div class="card" style="padding: var(--space-md); text-align: center;">
      <div style="font-size: 1.5rem; margin-bottom: 4px;">🎓</div>
      <div class="text-muted" style="font-size: 0.8rem;">Course</div>
      <div style="font-weight: 600;">${config.course === 'BTech' ? 'B.Tech' : 'Other Graduation'}</div>
    </div>
    <div class="card" style="padding: var(--space-md); text-align: center;">
      <div style="font-size: 1.5rem; margin-bottom: 4px;">⏱️</div>
      <div class="text-muted" style="font-size: 0.8rem;">Duration</div>
      <div style="font-weight: 600;">${config.duration} mins</div>
    </div>
    <div class="card" style="padding: var(--space-md); text-align: center;">
      <div style="font-size: 1.5rem; margin-bottom: 4px;">❓</div>
      <div class="text-muted" style="font-size: 0.8rem;">Questions</div>
      <div style="font-weight: 600;">${config.questions}</div>
    </div>
  `;

    document.getElementById('prevBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
}

function startInterview() {
    sessionStorage.setItem('interviewConfig', JSON.stringify(config));
    window.location.href = 'interview.html';
}
