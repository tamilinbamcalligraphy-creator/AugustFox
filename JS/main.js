document.addEventListener('DOMContentLoaded', function() {
    initializeFAQ();
    initializeSmoothScroll();
    initializeGalleryLoadMore();
});

function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            const currentItem = this.parentElement;

            faqItems.forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('active');
                }
            });

            currentItem.classList.toggle('active');
        });
    });
}

function initializeSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeGalleryLoadMore() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const itemsPerLoad = 10;
    let currentItems = 0;

    galleryCards.forEach(card => {
        card.classList.add('hidden');
    });

    function showMoreItems() {
        const hiddenCards = document.querySelectorAll('.gallery-card.hidden');
        const itemsToShow = Array.from(hiddenCards).slice(0, itemsPerLoad);

        itemsToShow.forEach(card => {
            card.classList.remove('hidden');
        });

        currentItems += itemsToShow.length;

        if (hiddenCards.length <= itemsPerLoad) {
            loadMoreBtn.classList.add('hidden');
        }
    }

    showMoreItems();

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            showMoreItems();
            
            setTimeout(() => {
                const firstNewItem = document.querySelectorAll('.gallery-card:not(.hidden)')[currentItems - itemsPerLoad];
                if (firstNewItem) {
                    firstNewItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
        });
    }
}