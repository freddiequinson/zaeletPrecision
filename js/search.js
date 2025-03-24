// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const searchOverlay = document.getElementById('search-overlay');
    const mobileSearchForm = document.getElementById('mobile-search-form');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const mobileSearchResults = document.getElementById('mobile-search-results');

    // Check if we're on a product page (to adjust URLs)
    const isProductPage = window.location.pathname.includes('/products/');
    const basePath = isProductPage ? '../' : '';

    // Product data for search
    const products = [
        { name: 'Zaelet F1 Pro', category: 'GNSS Receivers', url: basePath + 'products/gnss.html' },
        { name: 'Zaelet F1 Mini', category: 'GNSS Receivers', url: basePath + 'products/gnss.html#f1-mini' },
        { name: 'Zaelet R2 Total Station', category: 'Total Stations', url: basePath + 'products/total-station.html' },
        { name: 'Zaelet T3 Theodolite', category: 'Theodolites', url: basePath + 'products/theodolite.html' },
        { name: 'Zaelet L4 Digital Level', category: 'Levels', url: basePath + 'products/levels.html' },
        { name: 'UHF eRadio HX-DU8616D', category: 'Radio Communication', url: basePath + 'products/radios.html#hx-du8616d' },
        { name: 'ZR-450 UHF Radio', category: 'Radio Communication', url: basePath + 'products/radios.html#zr-450' },
        { name: 'ZR-200 Compact Radio', category: 'Radio Communication', url: basePath + 'products/radios.html#zr-200' },
        { name: 'Zaelet Survey Pro', category: 'Software', url: basePath + 'products/software.html' },
        { name: 'Zaelet Data Manager', category: 'Software', url: basePath + 'products/software.html' },
        { name: 'Zaelet GIS Processor', category: 'Software', url: basePath + 'products/software.html' }
    ];

    // Company information for search
    const companyInfo = [
        { name: 'About Zaelet', category: 'Company', url: basePath + 'index.html#about' },
        { name: 'Contact Us', category: 'Company', url: basePath + 'index.html#contact' },
        { name: 'Support', category: 'Services', url: basePath + 'index.html#support' },
        { name: 'News & Events', category: 'Company', url: basePath + 'index.html#news' }
    ];

    // All searchable items
    const searchItems = [...products, ...companyInfo];

    // Function to perform search
    function performSearch(query, isDesktop = true) {
        // Get the appropriate results container
        const resultsContainer = isDesktop ? searchResults : mobileSearchResults;
        
        if (!resultsContainer) return;
        
        if (!query || query.length < 2) {
            resultsContainer.innerHTML = '';
            resultsContainer.style.display = 'none';
            return;
        }

        query = query.toLowerCase();
        const results = searchItems.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );

        displayResults(results, query, resultsContainer);
    }

    // Function to display search results
    function displayResults(results, query, resultsContainer) {
        resultsContainer.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('p');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found';
            resultsContainer.appendChild(noResults);
            resultsContainer.style.display = 'block';
            return;
        }

        const resultsList = document.createElement('ul');
        resultsList.className = 'results-list';
        
        results.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'result-item';
            
            const link = document.createElement('a');
            link.href = item.url;
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'result-name';
            nameSpan.innerHTML = highlightMatch(item.name, query);
            
            const categorySpan = document.createElement('span');
            categorySpan.className = 'result-category';
            categorySpan.textContent = item.category;
            
            link.appendChild(nameSpan);
            link.appendChild(categorySpan);
            
            // Add click event to hide results when an item is clicked
            link.addEventListener('click', function() {
                hideSearchResults();
                searchInput.value = '';
                if (mobileSearchInput) mobileSearchInput.value = '';
            });
            
            listItem.appendChild(link);
            resultsList.appendChild(listItem);
        });
        
        resultsContainer.appendChild(resultsList);
        resultsContainer.style.display = 'block';
    }

    // Function to highlight matching text
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Function to hide search results
    function hideSearchResults() {
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        if (mobileSearchResults) {
            mobileSearchResults.style.display = 'none';
        }
        if (searchOverlay) {
            searchOverlay.classList.remove('active');
        }
    }

    // Event listener for desktop search input
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                performSearch(query, true);
                if (searchOverlay) {
                    searchOverlay.classList.add('active');
                }
            } else {
                hideSearchResults();
            }
        });
    }

    // Event listener for mobile search input
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                performSearch(query, false);
            } else {
                hideSearchResults();
            }
        });
    }

    // Event listener for desktop search button
    if (searchButton && searchForm) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                performSearch(query, true);
                if (searchOverlay) {
                    searchOverlay.classList.add('active');
                }
            }
        });
    }
    
    // Event listener for mobile search button
    if (mobileSearchButton && mobileSearchForm) {
        mobileSearchButton.addEventListener('click', function(e) {
            e.preventDefault();
            const query = mobileSearchInput.value.trim();
            if (query.length >= 2) {
                performSearch(query, false);
            }
        });
    }

    // Event listener for closing search results when clicking outside
    document.addEventListener('click', function(e) {
        if (searchResults && mobileSearchResults) {
            const isClickInsideDesktopSearch = searchResults.contains(e.target) || 
                                              e.target === searchInput || 
                                              e.target === searchButton;
                                              
            const isClickInsideMobileSearch = mobileSearchResults.contains(e.target) || 
                                             e.target === mobileSearchInput || 
                                             e.target === mobileSearchButton;
                                             
            if (!isClickInsideDesktopSearch && !isClickInsideMobileSearch) {
                hideSearchResults();
            }
        }
    });

    // Event listener for Enter key in desktop search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length >= 2) {
                    performSearch(query, true);
                    if (searchOverlay) {
                        searchOverlay.classList.add('active');
                    }
                }
            }
        });
    }

    // Event listener for Enter key in mobile search input
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length >= 2) {
                    performSearch(query, false);
                }
            }
        });
    }
    
    // Handle mobile search form submission
    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = mobileSearchInput.value.trim();
            if (query.length >= 2) {
                performSearch(query, false);
            }
        });
    }
});
