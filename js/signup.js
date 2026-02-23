/* ============================================
   SIGN UP - signup.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, go to dashboard
    if (isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const form = document.getElementById('signupForm');
    const loginLink = document.getElementById('loginLink');

    // Login simulation
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('Enter your registered email:');
        if (!email) return;

        const users = Store.get('allUsers') || [];
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (user) {
            Store.set('mockInterviewUser', user);
            showToast('Welcome back, ' + user.name + '!');
            setTimeout(() => window.location.href = 'dashboard.html', 800);
        } else {
            showToast('No account found with that email. Please sign up.', 'error');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const college = document.getElementById('college');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // Reset errors
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        let valid = true;

        if (!name.value.trim()) {
            name.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (!email.value.trim() || !email.value.includes('@')) {
            email.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (!college.value.trim()) {
            college.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (password.value.length < 6) {
            password.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (confirmPassword.value !== password.value) {
            confirmPassword.closest('.form-group').classList.add('error');
            valid = false;
        }

        if (!valid) return;

        const user = {
            name: name.value.trim(),
            email: email.value.trim(),
            college: college.value.trim(),
            course: '',
            year: '',
            skills: '',
            createdAt: new Date().toISOString()
        };

        // Save to all users list
        const users = Store.get('allUsers') || [];
        users.push(user);
        Store.set('allUsers', users);

        // Set current user
        Store.set('mockInterviewUser', user);

        showToast('Account created successfully! 🎉');
        setTimeout(() => window.location.href = 'profile.html', 800);
    });

    // Real-time validation feedback
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.form-group').classList.remove('error');
        });
    });
});
