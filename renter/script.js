document.addEventListener('DOMContentLoaded', () => {
    console.log('Renter Profile Dashboard Loaded!');

    // --- On-Scroll Animation Logic ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Animate numbers only when the parent section is visible
                if(entry.target.querySelector('.activity-grid')) {
                    animateCounters();
                }
                // Stop observing the element after it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });


    // --- Animated Counter Logic ---
    function animateCounters() {
        const counters = document.querySelectorAll('.activity-count');
        const speed = 200; // The lower the number, the faster the count

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Calculate the increment
                const inc = Math.ceil(target / speed);

                if (count < target) {
                    counter.innerText = Math.min(count + inc, target);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

});