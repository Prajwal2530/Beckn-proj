// Wait until DOM is loaded

document.addEventListener("DOMContentLoaded", function() {

    /************** Loader & Logo Animation **************/
    const logo = document.querySelector('.logo-animation');
    if (logo) {
        // When logo animation ends, allow it to scroll naturally
        logo.addEventListener('animationend', () => {
            logo.classList.add('scrolled'); // becomes relative and scrolls
        });
    }

    /************** Process Steps Scroll Animation **************/
    const processSteps = document.querySelectorAll('.process-step');
    if(processSteps.length > 0) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add('visible');
                    processObserver.unobserve(entry.target); // stop observing after animation
                }
            });
        }, { threshold: 0.1 });

        processSteps.forEach(step => processObserver.observe(step));
    }

    /************** Feature Cards Scroll Animation + Counter **************/
const featureCards = document.querySelectorAll('.feature-card');
if(featureCards.length > 0) {
    const cardsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                // Add visible class with staggered delay
                featureCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');

                        // Count animation inside card
                        const counters = card.querySelectorAll('.count');
                        counters.forEach(counter => {
                            const target = +counter.getAttribute('data-target');
                            let current = 0;
                            const increment = target / 50; // 50 steps
                            const interval = setInterval(() => {
                                current += increment;
                                if(current >= target){
                                    counter.textContent = target;
                                    clearInterval(interval);
                                } else {
                                    counter.textContent = Math.ceil(current);
                                }
                            }, 30);
                        });

                    }, index * 200); // 200ms stagger
                });

                observer.disconnect(); // stop observing all cards once animated
            }
        });
    }, { threshold: 0.3 });

    featureCards.forEach(card => cardsObserver.observe(card));
}

    
    /************** Optional: Mobile Menu Toggle **************/
    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector("nav ul");

    if(menuBtn && navMenu){
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("show"); // Add a 'show' class in CSS for mobile display
        });
    }

});
