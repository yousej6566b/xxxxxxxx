// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Form submission with Discord webhook
document.getElementById('applicationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = document.querySelector('.submit-button');
    const buttonText = document.querySelector('.button-text');
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    buttonText.textContent = 'جاري الإرسال...';
    
    // Get form data
    const formData = new FormData(this);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    

    
    // Format the message for Discord
    const discordMessage = {
        embeds: [{
            title: "🛡️ طلب انضمام جديد للحرس الأميري",
            color: 0xFFD700,
            fields: [
                {
                    name: "📝 البيانات الشخصية",
                    value: `**الاسم الكامل:** ${data.fullName}\n**الايدي ب لعبه:** ${data.nationalId}\n**العمر:** ${data.age} سنة`,
                    inline: false
                },
                {
                    name: "💬 معلومات دسكورد",
                    value: `**اليوزر في دسكورد:** ${data.discordUsername}\n**معرف دسكورد (ID):** ${data.discordId}`,
                    inline: false
                },
                {
                    name: "⏰ مدة التواجد",
                    value: data.availability,
                    inline: false
                },
                {
                    name: "💼 الخبرات السابقة",
                    value: data.experience,
                    inline: false
                },
                {
                    name: "🎯 سبب الرغبة في الانضمام",
                    value: data.motivation,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: "نظام التقديم للحرس الأميري"
            }
        }]
    };
    
    try {
        // Send to Discord webhook
        const response = await fetch('https://discord.com/api/webhooks/1415383472800927866/FVBu8AgjRQaoJNzKOvJEVmFvZNYGVcgohfnRtiucz_1UYV3qauPJbSSDu8-Uf0QSrDNM', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(discordMessage)
        });
        
        if (response.ok) {
            // Show success modal
            document.getElementById('successModal').style.display = 'block';
            
            // Reset form
            this.reset();
        } else {
            throw new Error('فشل في إرسال الطلب');
        }
        
    } catch (error) {
        alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        console.error('Error:', error);
    } finally {
        // Reset button state
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
        buttonText.textContent = 'إرسال الطلب';
    }
});

// Helper functions for text conversion




// Modal functionality
const modal = document.getElementById('successModal');
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 20, 40, 0.98)';
    } else {
        header.style.background = 'rgba(0, 20, 40, 0.95)';
    }
});

// Form validation enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add real-time validation for Discord ID (should be numbers only)
    const discordIdInput = document.getElementById("discordId");
    discordIdInput.addEventListener("input", function() {
        // Allow numbers and negative sign at the beginning
        this.value = this.value.replace(/[^0-9-]/g, "");
        if (this.value.startsWith("-")) {
            this.value = "-" + this.value.substring(1).replace(/[^0-9]/g, "");
        }
    });
    

});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.about-card, .requirement-item, .application-form');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 215, 0, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    .hero { position: relative; overflow: hidden; }
`;
document.head.appendChild(style);

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

