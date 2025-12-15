document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const resetBtn = document.getElementById('resetBtn');
    const submitBtn = document.getElementById('submitBtn');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
            time: new Date().toLocaleString()
        };

        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';


        emailjs.send('service_oy1huar', 'template_hk344ge', formData)
            .then(() => {
                showThankYou();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to send message. Please try again.');
                resetButton();
            });

        });

    function showThankYou() {
        contactForm.style.display = 'none';
        thankYouMessage.style.display = 'block';
        resetButton();

        thankYouMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function resetButton() {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }

    resetBtn.addEventListener('click', function() {
        contactForm.reset();
        contactForm.style.display = 'block';
        thankYouMessage.style.display = 'none';

        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

