// Redirect to another page when the button is clicked
document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', function() {
            window.location.href = 'main.html'; // Change to your target page
        });
    }
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNavLinks = document.getElementById('nav-links');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update button state based on current theme
    updateThemeButton(currentTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button state
        updateThemeButton(newTheme);
        
        // Add smooth transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    });
    
    function updateThemeButton(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    }
    
    // Mobile Menu Toggle Functionality
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenuToggle.classList.toggle('active');
        mobileNavLinks.classList.toggle('active');
        body.style.overflow = mobileNavLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinksList = mobileNavLinks.querySelectorAll('.nav-link');
    mobileNavLinksList.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileNavLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !mobileNavLinks.contains(event.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileNavLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mobileNavLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
    
    // Smooth scrolling for navigation links
    const allNavLinks = document.querySelectorAll('.nav-link');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const ctaButton = document.querySelector('.cta-button');
    
    if (searchInput && ctaButton) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // Simulate search functionality
                    console.log('Searching for:', searchTerm);
                    // You can add actual search logic here
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
        
        ctaButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                console.log('Starting stream for:', searchTerm);
                // Navigate to streaming page with search term
                window.location.href = `streaming.html?search=${encodeURIComponent(searchTerm)}`;
            } else {
                // Navigate to streaming page without search term
                window.location.href = 'streaming.html';
            }
        });
    }
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add pulse animation to CTA button
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
});

// Add CSS animation for pulse effect
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .loaded {
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    body {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Streaming Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the streaming page
    if (window.location.pathname.includes('streaming.html')) {
        initializeStreamingPage();
    }
});

function initializeStreamingPage() {
    // Load demo movie data
    loadDemoMovies();
    
    // Set up event listeners
    setupStreamingEventListeners();
    
    // Check for search parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        handleSearchResults(searchTerm);
    }
    
    // Hide loading overlay
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }, 1000);
}

function loadDemoMovies() {
    // Demo movie data for different categories
    const demoMovies = {
        'trending': [
            { id: 1, title: 'Mission Impossible: Dead Reckoning', poster: 'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=MI7', rating: 8.5, year: 2023, genre: 'Action, Thriller' },
            { id: 2, title: 'Oppenheimer', poster: 'https://via.placeholder.com/200x300/2a2a2a/ffffff?text=Oppen', rating: 8.9, year: 2023, genre: 'Drama, History' },
            { id: 3, title: 'Barbie', poster: 'https://via.placeholder.com/200x300/3a3a3a/ffffff?text=Barbie', rating: 7.3, year: 2023, genre: 'Comedy, Fantasy' },
            { id: 4, title: 'Dune: Part Two', poster: 'https://via.placeholder.com/200x300/4a4a4a/ffffff?text=Dune2', rating: 8.4, year: 2024, genre: 'Sci-Fi, Adventure' },
            { id: 5, title: 'The Super Mario Bros. Movie', poster: 'https://via.placeholder.com/200x300/5a5a5a/ffffff?text=Mario', rating: 7.5, year: 2023, genre: 'Animation, Comedy' },
            { id: 6, title: 'Guardians of the Galaxy Vol. 3', poster: 'https://via.placeholder.com/200x300/6a6a6a/ffffff?text=GOTG3', rating: 8.1, year: 2023, genre: 'Action, Comedy' }
        ],
        'action': [
            { id: 7, title: 'John Wick: Chapter 4', poster: 'https://via.placeholder.com/200x300/7a7a7a/ffffff?text=JW4', rating: 8.2, year: 2023, genre: 'Action, Crime' },
            { id: 8, title: 'Fast X', poster: 'https://via.placeholder.com/200x300/8a8a8a/ffffff?text=FastX', rating: 7.8, year: 2023, genre: 'Action, Thriller' },
            { id: 9, title: 'The Equalizer 3', poster: 'https://via.placeholder.com/200x300/9a9a9a/ffffff?text=Equal3', rating: 7.1, year: 2023, genre: 'Action, Crime' },
            { id: 10, title: 'Extraction 2', poster: 'https://via.placeholder.com/200x300/aa1a1a/ffffff?text=Extract2', rating: 7.6, year: 2023, genre: 'Action, Thriller' },
            { id: 11, title: 'The Gray Man', poster: 'https://via.placeholder.com/200x300/bb1a1a/ffffff?text=GrayMan', rating: 6.5, year: 2022, genre: 'Action, Thriller' },
            { id: 12, title: 'Top Gun: Maverick', poster: 'https://via.placeholder.com/200x300/cc1a1a/ffffff?text=TopGun2', rating: 8.3, year: 2022, genre: 'Action, Drama' }
        ],
        'drama': [
            { id: 13, title: 'The Whale', poster: 'https://via.placeholder.com/200x300/dd1a1a/ffffff?text=Whale', rating: 7.7, year: 2022, genre: 'Drama, History' },
            { id: 14, title: 'Everything Everywhere All at Once', poster: 'https://via.placeholder.com/200x300/ee1a1a/ffffff?text=EEAAO', rating: 8.0, year: 2022, genre: 'Drama, Sci-Fi' },
            { id: 15, title: 'The Banshees of Inisherin', poster: 'https://via.placeholder.com/200x300/ff1a1a/ffffff?text=Banshees', rating: 7.8, year: 2022, genre: 'Drama, Comedy' },
            { id: 16, title: 'Tár', poster: 'https://via.placeholder.com/200x300/1a2a2a/ffffff?text=Tar', rating: 7.4, year: 2022, genre: 'Drama, Music' },
            { id: 17, title: 'Triangle of Sadness', poster: 'https://via.placeholder.com/200x300/2a3a3a/ffffff?text=Triangle', rating: 7.2, year: 2022, genre: 'Drama, Comedy' },
            { id: 18, title: 'Women Talking', poster: 'https://via.placeholder.com/200x300/3a4a4a/ffffff?text=Women', rating: 7.3, year: 2022, genre: 'Drama, Thriller' }
        ],
        'comedy': [
            { id: 19, title: 'The Super Mario Bros. Movie', poster: 'https://via.placeholder.com/200x300/4a5a5a/ffffff?text=Mario', rating: 7.5, year: 2023, genre: 'Animation, Comedy' },
            { id: 20, title: 'Guardians of the Galaxy Vol. 3', poster: 'https://via.placeholder.com/200x300/5a6a6a/ffffff?text=GOTG3', rating: 8.1, year: 2023, genre: 'Action, Comedy' },
            { id: 21, title: 'Ant-Man and the Wasp: Quantumania', poster: 'https://via.placeholder.com/200x300/6a7a7a/ffffff?text=AntMan3', rating: 6.1, year: 2023, genre: 'Action, Comedy' },
            { id: 22, title: 'Shazam! Fury of the Gods', poster: 'https://via.placeholder.com/200x300/7a8a8a/ffffff?text=Shazam2', rating: 6.2, year: 2023, genre: 'Action, Comedy' },
            { id: 23, title: 'Cocaine Bear', poster: 'https://via.placeholder.com/200x300/8a9a9a/ffffff?text=Cocaine', rating: 6.3, year: 2023, genre: 'Comedy, Horror' },
            { id: 24, title: 'Renfield', poster: 'https://via.placeholder.com/200x300/9aaa1a/ffffff?text=Renfield', rating: 6.4, year: 2023, genre: 'Comedy, Horror' }
        ],
        'sci-fi': [
            { id: 25, title: 'Dune: Part Two', poster: 'https://via.placeholder.com/200x300/aa1a1a/ffffff?text=Dune2', rating: 8.4, year: 2024, genre: 'Sci-Fi, Adventure' },
            { id: 26, title: 'The Creator', poster: 'https://via.placeholder.com/200x300/bb2a2a/ffffff?text=Creator', rating: 7.2, year: 2023, genre: 'Sci-Fi, Action' },
            { id: 27, title: 'Poor Things', poster: 'https://via.placeholder.com/200x300/cc3a3a/ffffff?text=Poor', rating: 7.8, year: 2023, genre: 'Sci-Fi, Drama' },
            { id: 28, title: 'Everything Everywhere All at Once', poster: 'https://via.placeholder.com/200x300/dd4a4a/ffffff?text=EEAAO', rating: 8.0, year: 2022, genre: 'Sci-Fi, Drama' },
            { id: 29, title: 'Nope', poster: 'https://via.placeholder.com/200x300/ee5a5a/ffffff?text=Nope', rating: 7.0, year: 2022, genre: 'Sci-Fi, Horror' },
            { id: 30, title: 'Prey', poster: 'https://via.placeholder.com/200x300/ff6a6a/ffffff?text=Prey', rating: 7.2, year: 2022, genre: 'Sci-Fi, Action' }
        ],
        'horror': [
            { id: 31, title: 'Five Nights at Freddy\'s', poster: 'https://via.placeholder.com/200x300/1a7a7a/ffffff?text=FNAF', rating: 6.8, year: 2023, genre: 'Horror, Thriller' },
            { id: 32, title: 'Talk to Me', poster: 'https://via.placeholder.com/200x300/2a8a8a/ffffff?text=Talk', rating: 7.4, year: 2023, genre: 'Horror, Thriller' },
            { id: 33, title: 'Evil Dead Rise', poster: 'https://via.placeholder.com/200x300/3a9a9a/ffffff?text=Evil', rating: 6.9, year: 2023, genre: 'Horror, Thriller' },
            { id: 34, title: 'Scream VI', poster: 'https://via.placeholder.com/200x300/4aaa1a/ffffff?text=Scream6', rating: 7.1, year: 2023, genre: 'Horror, Thriller' },
            { id: 35, title: 'M3GAN', poster: 'https://via.placeholder.com/200x300/5aba2a/ffffff?text=M3GAN', rating: 6.4, year: 2022, genre: 'Horror, Sci-Fi' },
            { id: 36, title: 'Smile', poster: 'https://via.placeholder.com/200x300/6aca3a/ffffff?text=Smile', rating: 6.6, year: 2022, genre: 'Horror, Thriller' }
        ]
    };
    
    // Populate each category with movies
    Object.keys(demoMovies).forEach(category => {
        const grid = document.querySelector(`.${category}-grid`);
        if (grid) {
            demoMovies[category].forEach(movie => {
                const movieCard = createMovieCard(movie);
                grid.appendChild(movieCard);
            });
        }
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.setAttribute('data-movie-id', movie.id);
    
    movieCard.innerHTML = `
        <div class="movie-poster">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="movie-overlay">
                <button class="play-btn" data-movie-id="${movie.id}"><i class="fas fa-play"></i></button>
                <button class="info-btn" data-movie-id="${movie.id}"><i class="fas fa-info-circle"></i></button>
            </div>
        </div>
        <div class="movie-info">
            <h4>${movie.title}</h4>
            <p class="movie-genre">${movie.year} • ${movie.genre}</p>
            <div class="movie-rating">
                <span class="rating">${movie.rating}</span>
                <i class="fas fa-star"></i>
            </div>
        </div>
    `;
    
    return movieCard;
}

function setupStreamingEventListeners() {
    // Category filtering functionality
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.category-section');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter movies by category
            if (category === 'all') {
                categorySections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                categorySections.forEach(section => {
                    if (section.getAttribute('data-category') === category) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Movie card interactions (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.play-btn')) {
            const playBtn = e.target.closest('.play-btn');
            const movieId = playBtn.getAttribute('data-movie-id');
            handlePlayMovie(movieId);
        }
        
        if (e.target.closest('.info-btn')) {
            const infoBtn = e.target.closest('.info-btn');
            const movieId = infoBtn.getAttribute('data-movie-id');
            handleMovieInfo(movieId);
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    handleSearchResults(searchTerm);
                }
            }
        });
        
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                handleSearchResults(searchTerm);
            }
        });
    }
}

function handlePlayMovie(movieId) {
    // Get movie details and show play alert
    const movieCard = document.querySelector(`[data-movie-id="${movieId}"]`);
    if (movieCard) {
        const title = movieCard.querySelector('h4').textContent;
        const rating = movieCard.querySelector('.rating').textContent;
        const genre = movieCard.querySelector('.movie-genre').textContent;
        
        alert(`🎬 Now Playing: ${title}\n\n⭐ Rating: ${rating}/10\n🎭 Genre: ${genre}\n\nThis is a demo - in a real app, this would start the video player.`);
    }
}

function handleMovieInfo(movieId) {
    // Get movie details and show info alert
    const movieCard = document.querySelector(`[data-movie-id="${movieId}"]`);
    const title = movieCard.querySelector('h4').textContent;
    const rating = movieCard.querySelector('.rating').textContent;
    const genre = movieCard.querySelector('.movie-genre').textContent;
    
    alert(`📽️ Movie Information\n\n🎬 Title: ${title}\n⭐ Rating: ${rating}/10\n🎭 Genre: ${genre}\n\n📖 Synopsis: This is a placeholder synopsis for ${title}. In a real streaming service, you would see the actual movie description, cast information, and more details.`);
}

function handleSearchResults(searchTerm) {
    // Simple search through all movie cards
    const allMovies = document.querySelectorAll('.movie-card');
    const searchResults = [];
    
    allMovies.forEach(movieCard => {
        const title = movieCard.querySelector('h4').textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase())) {
            searchResults.push(movieCard);
        }
    });
    
    if (searchResults.length > 0) {
        // Update hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.textContent = `Search Results: ${searchTerm}`;
        }
        
        // Show search results
        showSearchResults(searchResults, searchTerm);
    } else {
        showNoSearchResults(searchTerm);
    }
}

function showSearchResults(movies, searchTerm) {
    // Create search results section
    const moviesSection = document.querySelector('.movies-section');
    if (!moviesSection) return;
    
    // Remove existing search results
    const existingSearch = document.querySelector('.search-results');
    if (existingSearch) {
        existingSearch.remove();
    }
    
    const searchSection = document.createElement('div');
    searchSection.className = 'category-section search-results';
    searchSection.innerHTML = `
        <h3 class="category-heading">
            <i class="fas fa-search"></i> Search Results for "${searchTerm}"
            <span class="scroll-hint">← Scroll →</span>
        </h3>
        <div class="movies-scroll-container">
            <div class="movies-grid search-grid"></div>
        </div>
    `;
    
    const moviesGrid = searchSection.querySelector('.search-grid');
    
    // Add movie cards
    movies.forEach(movieCard => {
        const clonedCard = movieCard.cloneNode(true);
        moviesGrid.appendChild(clonedCard);
    });
    
    // Insert at the beginning
    moviesSection.insertBefore(searchSection, moviesSection.firstChild);
}

function showNoSearchResults(searchTerm) {
    const moviesSection = document.querySelector('.movies-section');
    if (!moviesSection) return;
    
    // Remove existing search results
    const existingSearch = document.querySelector('.search-results');
    if (existingSearch) {
        existingSearch.remove();
    }
    
    const noResultsSection = document.createElement('div');
    noResultsSection.className = 'category-section no-results';
    noResultsSection.innerHTML = `
        <h3 class="category-heading">
            <i class="fas fa-search"></i> No Results Found
        </h3>
        <p style="text-align: center; color: var(--text-secondary); font-size: 1.1rem; padding: 2rem;">
            No movies found for "${searchTerm}". Try searching for something else.
        </p>
    `;
}
