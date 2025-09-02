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
    console.log('📄 DOM Content Loaded');
    console.log('📍 Current pathname:', window.location.pathname);
    
    // Check if we're on the streaming page
    if (window.location.pathname.includes('streaming.html')) {
        console.log('🎬 Streaming page detected, initializing...');
        initializeStreamingPage();
    } else {
        console.log('🏠 Not on streaming page, skipping initialization');
    }
});

function initializeStreamingPage() {
    console.log('🚀 Initializing streaming page...');
    
    // Load demo movie data
    loadDemoMovies();
    
    // Set up event listeners
    setupStreamingEventListeners();
    
    // Check for search parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        console.log(`🔍 Search term found: ${searchTerm}`);
        handleSearchResults(searchTerm);
    }
    
    // Hide loading overlay
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
            console.log('🎬 Loading overlay hidden');
        }
    }, 1000);
    
    console.log('✅ Streaming page initialization complete');
}

function loadDemoMovies() {
    console.log('🔄 Loading demo movies...');
    
    // Demo movie data for different categories
    const demoMovies = {
        'trending': [
            { id: 1, title: 'Sinners', poster: './sinners.jpeg', rating: 7.6, year: 2025, genre: 'Action, Horror', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: '#' },
            { id: 2, title: 'Weapons', poster: './weapons.jpeg', rating: 7.8, year: 2025, genre: 'Horror, Mystery', videoUrl: '#', downloadUrl: '#' },
            { id: 3, title: 'Thunderbolts', poster: './thunderbolts.jpeg', rating: 7.2, year: 2025, genre: 'Action, Adventure, Crime', videoUrl: '#', downloadUrl: '#' },
            { id: 4, title: 'Superman', poster: './superman.jpeg', rating: 7.3, year: 2025, genre: 'Action, Adventure, Sci-Fi', videoUrl: '#', downloadUrl: '#' },
            { id: 5, title: 'F1', poster: './f-1.jpeg', rating: 7.8, year: 2025, genre: 'Action, Drama, Sport', videoUrl: '#', downloadUrl: '#' },
            { id: 6, title: 'Jurassic World: Rebirth', poster: './jurassic.jpeg', rating: 5.9, year: 2025, genre: 'Action, Adventure, Sci-fi', videoUrl: '#', downloadUrl: '#' },
            { id: 7, title: 'Mission Impossible: Dead Reckoning', poster: './mission-impossible.jpeg', rating: 8.5, year: 2023, genre: 'Action, Thriller', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/og67u751hl1s/Mission.Impossible.-.The.Final.Reckoning.(NKIRI.COM).2025.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 8, title: 'Oppenheimer', poster: './oppenheimer.jpeg', rating: 8.9, year: 2023, genre: 'Drama, History', videoUrl: 'https://www.w3schools.com/html/movie.mp4', downloadUrl: 'https://downloadwella.com/i2udddfbfato/Oppenheimer.(NKIRI.COM).2023.BluRay.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 9, title: 'Barbie', poster: './barbie.jpeg', rating: 7.3, year: 2023, genre: 'Comedy, Fantasy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/wgd63oc9k87e/Barbie.(NKIRI.COM).2023.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 10, title: 'Dune: Part Two', poster: './dune.jpeg', rating: 8.4, year: 2024, genre: 'Sci-Fi, Adventure', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/4l4s5gt8myoy/Dune.Part.Two.(NKIRI.COM).2024.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 11, title: 'The Super Mario Bros. Movie', poster: './mario.jpeg', rating: 7.5, year: 2023, genre: 'Animation, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/pxm4qmjegwaa/Super.Mario.Bros.Movie.(NKIRI.COM).2023.AMZN.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 12, title: 'Guardians of the Galaxy Vol. 3', poster: './GOTG.jpeg', rating: 8.1, year: 2023, genre: 'Action, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/5rthk5bssrss/Guardians.of.the.Galaxy.Vol.3.(NKIRI.COM).2023.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' }
        ],
        'action': [
            { id: 13, title: 'The Fantastic Four: First Steps', poster: './fantasticfour.jpeg', rating: 7.3, year: 2025, genre: 'Action, Adventure, Sci-Fi', videoUrl: '#', downloadUrl: '#' },
            { id: 14, title: 'The Naked Gun', poster: './nakedgun.jpeg', rating: 6.9, year: 2025, genre: 'Action, Comedy, Crime', videoUrl: '#', downloadUrl: '#' },
            { id: 15, title: 'Nobody 2', poster: './nobody2.jpeg', rating: 6.7, year: 2025, genre: 'Action, Comedy, Crime', videoUrl: '#', downloadUrl: '#' },
            { id: 16, title: 'Ballerina', poster: './ballerina.jpeg', rating: 6.9, year: 2025, genre: 'Action, Thriller', videoUrl: '#', downloadUrl: '#' },
            { id: 17, title: 'John Wick: Chapter 4', poster: './john-wick.jpeg', rating: 8.2, year: 2023, genre: 'Action, Crime', videoUrl: 'https://www.w3schools.com/html/johnwick.mp4', downloadUrl: 'https://downloadwella.com/0pcd6mds5inw/John.Wick.Chapter.4.(NKIRI.COM).2023.WEB-DL.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 18, title: 'Fast X', poster: './fastX.jpeg', rating: 7.8, year: 2023, genre: 'Action, Thriller', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/707wgtgr3p8r/Fast.X.(NKIRI.COM).2023.AMZN.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html4' },
            { id: 29, title: 'The Equalizer 3', poster: './equilizer.jpeg', rating: 7.1, year: 2023, genre: 'Action, Crime', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/bm9u6zc2z9k4/The.Equalizer.3.(NKIRI.COM).2023.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 20, title: 'Extraction 2', poster: './Extraction.jpeg', rating: 7.6, year: 2023, genre: 'Action, Thriller', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/f8eog3il9rpg/Extraction.2.(NKIRI.COM).2023.NF.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 21, title: 'The Gray Man', poster: './grayman.jpeg', rating: 6.5, year: 2022, genre: 'Action, Thriller', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: '#' },
            { id: 22, title: 'The Amateur', poster: './amateur.jpeg', rating: 6.5, year: 2025, genre: 'Action, Thriller', videoUrl: '#', downloadUrl: '#' },
            { id: 23, title: 'Heads of State', poster: './heads-of-state.jpeg', rating: 6.4, year: 2025, genre: 'Action, Comedy, Thriller', videoUrl: '#', downloadUrl: '#' },
            { id: 24, title: 'Top Gun: Maverick', poster: './topgun.jpeg', rating: 8.3, year: 2022, genre: 'Action, Drama', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/cybkgpvpbhfa/Top.Gun.Maverick.(NKIRI.COM).2022.WEB-DL.DOWNLOADED.FROM.NKIRI.COM.mp4' }
        ],
        'drama': [
            { id: 25, title: 'Frankenstein', poster: './frankenstein.jpeg', rating: 7.4, year: 2025, genre: 'Drama, Fantasy, Horror', videoUrl: '#', downloadUrl: '#' },
            { id: 26, title: 'The Map That Leads to You', poster: './map-that-leads-to-you.jpeg', rating: 6.2, year: 2025, genre: 'Drama, Romance', videoUrl: '#', downloadUrl: '#' },
            { id: 27, title: 'Night Always Comes', poster: './night-always-comes.jpeg', rating: 5.9, year: 2025, genre: 'Crime, Drama, Thriller', videoUrl: '#', downloadUrl: '#' },
            { id: 28, title: 'Highest 2 Lowest', poster: './highest-two-lowest.jpeg', rating: 6.7, year: 2025, genre: 'Crime, Drama, Mystery', videoUrl: '#', downloadUrl: '#' },
            { id: 29, title: 'My Oxford Year', poster: './my-oxford-year.jpeg', rating: 5.9, year: 2025, genre: 'Drama, Romance, Comedy', videoUrl: '#', downloadUrl: '#' },
            { id: 30, title: 'Hallow Road', poster: './hallow-road.jpeg', rating: 6.0, year: 2025, genre: 'Drama, Horror, Thriller', videoUrl: '#', downloadUrl: '#' },
            { id: 31, title: 'The Whale', poster: './whale.jpeg', rating: 7.7, year: 2022, genre: 'Drama, History', videoUrl: 'https://www.w3schools.com/html/whale.mp4', downloadUrl: 'https://downloadwella.com/jsd3ha1ywuip/The.Whale.(NKIRI.COM).2022.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 32, title: 'Everything Everywhere All at Once', poster: './EEAAT.jpeg', rating: 8.0, year: 2022, genre: 'Drama, Sci-Fi', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/jsd3ha1ywuip/The.Whale.(NKIRI.COM).2022.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 33, title: 'The Banshees of Inisherin', poster: './banshee.jpeg', rating: 7.8, year: 2022, genre: 'Drama, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/27u50ttipp9a/The.Banshees.of.Inisherin.(NKIRI.COM).2022.AMZN.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 34, title: 'Tár', poster: 'https://via.placeholder.com/200x300/1a2a2a/ffffff?text=Tar', rating: 7.4, year: 2022, genre: 'Drama, Music', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: '#' },
            { id: 35, title: 'Triangle of Sadness', poster: './TOS.jpeg', rating: 7.2, year: 2022, genre: 'Drama, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://downloadwella.com/ukqvvzegftld/Triangle.of.Sadness.(NKIRI.COM).2022.WEBRip.DOWNLOADED.FROM.NKIRI.COM.mkv.html' },
            { id: 36, title: 'Women Talking', poster: './women-talking.jpeg', rating: 7.3, year: 2022, genre: 'Drama, Thriller', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: '#' }
        ],
        'comedy': [
            { id: 37, title: 'The Thursday Murder Club', poster: './thursday-murder-club.jpeg', rating: 6.6, year: 2025, genre: 'Comedy, Crime Mystery', videoUrl: '#', downloadUrl: '#' },
            { id: 38, title: 'Bugonia', poster: './bugonia.jpeg', rating: 7.1, year: 2025, genre: 'Comedy, Crime, Sci-Fi', videoUrl: '#', downloadUrl: '#' },
            { id: 39, title: 'Happy Gilmore 2', poster: './happy-gilmore-2.jpeg', rating: 6.1, year: 2025, genre: 'Comedy, Sport', videoUrl: '#', downloadUrl: '#' },
            { id: 40, title: 'Honey Do Not', poster: './honey-dont.jpeg', rating: 5.6, year: 2025, genre: 'Comedy, Crime, Mystery', videoUrl: '#', downloadUrl: '#' },
            { id: 41, title: 'The Bad Guys 2', poster: './bad-guys-2.jpeg', rating: 7.1, year: 2025, genre: 'Comdey, Action, Animation', videoUrl: '#', downloadUrl: '#' },
            { id: 42, title: 'The Super Mario Bros. Movie', poster: './mario.jpeg', rating: 7.5, year: 2023, genre: 'Animation, Comedy', videoUrl: 'https://www.w3schools.com/html/mario.mp4', downloadUrl: 'https://www.w3schools.com/html/mario.mp4' },
            { id: 43, title: 'Guardians of the Galaxy Vol. 3', poster: 'GOTG.jpeg', rating: 8.1, year: 2023, genre: 'Action, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 44, title: 'Ant-Man and the Wasp: Quantumania', poster: './antman.jpeg', rating: 6.1, year: 2023, genre: 'Action, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 45, title: 'Shazam! Fury of the Gods', poster: 'shazam.jpeg', rating: 6.2, year: 2023, genre: 'Action, Comedy', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 46, title: 'Cocaine Bear', poster: './cocaine.jpeg', rating: 6.3, year: 2023, genre: 'Comedy, Horror' },
            { id: 47, title: 'Renfield', poster: './renfield.jpeg', rating: 6.4, year: 2023, genre: 'Comedy, Horror' }
        ],
        'sci-fi': [
            { id: 25, title: 'Dune: Part Two', poster: './dune.jpeg', rating: 8.4, year: 2024, genre: 'Sci-Fi, Adventure', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', downloadUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
            { id: 26, title: 'The Creator', poster: 'https://via.placeholder.com/200x300/bb2a2a/ffffff?text=Creator', rating: 7.2, year: 2023, genre: 'Sci-Fi, Action' },
            { id: 27, title: 'Poor Things', poster: 'https://via.placeholder.com/200x300/cc3a3a/ffffff?text=Poor', rating: 7.8, year: 2023, genre: 'Sci-Fi, Drama' },
            { id: 28, title: 'Everything Everywhere All at Once', poster: './EEAAT.jpeg', rating: 8.0, year: 2022, genre: 'Sci-Fi, Drama' },
            { id: 29, title: 'Nope', poster: 'https://via.placeholder.com/200x300/ee5a5a/ffffff?text=Nope', rating: 7.0, year: 2022, genre: 'Sci-Fi, Horror' },
            { id: 30, title: 'Prey', poster: 'https://via.placeholder.com/200x300/ff6a6a/ffffff?text=Prey', rating: 7.2, year: 2022, genre: 'Sci-Fi, Action' }
        ],
        'horror': [
            { id: 31, title: 'Five Nights at Freddy\'s', poster: './fivenights.jpeg', rating: 6.8, year: 2023, genre: 'Horror, Thriller', videoUrl: 'https://www.w3schools.com/html/fivenights.mp4', downloadUrl: 'https://www.w3schools.com/html/fivenights.mp4' },
            { id: 32, title: 'Talk to Me', poster: './talk.jpeg', rating: 7.4, year: 2023, genre: 'Horror, Thriller' },
            { id: 33, title: 'Evil Dead Rise', poster: './evildead.jpeg', rating: 6.9, year: 2023, genre: 'Horror, Thriller' },
            { id: 34, title: 'Scream VI', poster: './screem.jpeg', rating: 7.1, year: 2023, genre: 'Horror, Thriller' },
            { id: 35, title: 'M3GAN', poster: './megan.jpeg', rating: 6.4, year: 2022, genre: 'Horror, Sci-Fi' },
            { id: 36, title: 'Smile', poster: './smile.jpeg', rating: 6.6, year: 2022, genre: 'Horror, Thriller' }
        ]
    };
    
    // Populate each category with movies
    Object.keys(demoMovies).forEach(category => {
        let gridSelector;
        if (category === 'sci-fi') {
            gridSelector = '.scifi-grid';
        } else {
            gridSelector = `.${category}-grid`;
        }
        
        console.log(`🔍 Looking for grid: ${gridSelector}`);
        const grid = document.querySelector(gridSelector);
        
        if (grid) {
            console.log(`✅ Found grid for ${category}, adding ${demoMovies[category].length} movies`);
            demoMovies[category].forEach(movie => {
                const movieCard = createMovieCard(movie);
                grid.appendChild(movieCard);
                console.log(`➕ Added movie: ${movie.title} with poster: ${movie.poster}`);
            });
        } else {
            console.error(`❌ Grid not found for category: ${category} (selector: ${gridSelector})`);
        }
    });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.setAttribute('data-movie-id', movie.id);
    
    // Ensure downloadUrl is present
    const downloadUrl = movie.downloadUrl || movie.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4';    movieCard.innerHTML = `
        <div class="movie-poster" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="movie-overlay">
                <button class="download-btn" data-download-url="${downloadUrl}"><i class="fas fa-download"></i></button>
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

        if (e.target.closest('.download-btn')) {
            const downloadBtn = e.target.closest('.download-btn');
            const movieId = downloadBtn.getAttribute('data-movie-id');
            handleDownloadMovie(movieId);
        }

        if (e.target.closest('.info-btn')) {
            const infoBtn = e.target.closest('.info-btn');
            const movieId = infoBtn.getAttribute('data-movie-id');
            handleMovieInfo(movieId);
        }
        
        if (e.target.classList.contains('download-btn')) {
            const downloadUrl = e.target.getAttribute('data-download-url');
            if (downloadUrl) {
                window.open(downloadUrl, '_blank');
            }
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

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('download-btn')) {
        const btn = e.target.closest('.download-btn');
        const downloadUrl = btn.getAttribute('data-download-url');
        if (downloadUrl) {
            window.open(downloadUrl, '_blank');
        }
    }
});