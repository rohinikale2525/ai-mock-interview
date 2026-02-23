/* ============================================
   PROFILE - profile.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    renderNavbar('profile');

    const user = getCurrentUser();
    const form = document.getElementById('profileForm');

    // Populate header
    const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    document.getElementById('profileAvatar').textContent = initials;
    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;

    // Tags
    const tagsEl = document.getElementById('profileTags');
    if (user.course) {
        tagsEl.innerHTML += `<span class="tag tag-purple">${user.course}</span> `;
    }
    if (user.year) {
        tagsEl.innerHTML += `<span class="tag tag-cyan">${user.year}</span> `;
    }
    if (user.college) {
        tagsEl.innerHTML += `<span class="tag tag-green">📍 ${user.college}</span>`;
    }

    // Fill form
    document.getElementById('name').value = user.name || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('college').value = user.college || '';
    document.getElementById('course').value = user.course || '';
    document.getElementById('year').value = user.year || '';
    document.getElementById('phone').value = user.phone || '';
    document.getElementById('skills').value = user.skills || '';
    document.getElementById('bio').value = user.bio || '';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const updated = {
            ...user,
            name: document.getElementById('name').value.trim(),
            college: document.getElementById('college').value.trim(),
            course: document.getElementById('course').value,
            year: document.getElementById('year').value,
            phone: document.getElementById('phone').value.trim(),
            skills: document.getElementById('skills').value.trim(),
            bio: document.getElementById('bio').value.trim()
        };

        Store.set('mockInterviewUser', updated);

        // Update header
        const newInitials = updated.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        document.getElementById('profileAvatar').textContent = newInitials;
        document.getElementById('profileName').textContent = updated.name;

        tagsEl.innerHTML = '';
        if (updated.course) tagsEl.innerHTML += `<span class="tag tag-purple">${updated.course}</span> `;
        if (updated.year) tagsEl.innerHTML += `<span class="tag tag-cyan">${updated.year}</span> `;
        if (updated.college) tagsEl.innerHTML += `<span class="tag tag-green">📍 ${updated.college}</span>`;

        showToast('Profile saved successfully! ✨');
    });
});
