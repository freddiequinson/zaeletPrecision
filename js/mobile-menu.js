// Mobile Navigation Functionality
$(document).ready(function() {
    // Handle mobile navigation item clicks
    $('.mobile-nav-item').on('click', function() {
        // Remove active class from all items
        $('.mobile-nav-item').removeClass('active');
        
        // Add active class to clicked item
        $(this).addClass('active');
        
        // Handle dropdown for products
        if ($(this).attr('href') === '#products') {
            // Show products dropdown
            showProductsDropdown();
            return false; // Prevent default action
        }
    });
    
    // Function to show products dropdown
    function showProductsDropdown() {
        // Create dropdown if it doesn't exist
        if ($('#mobile-products-dropdown').length === 0) {
            var dropdown = $('<div id="mobile-products-dropdown" class="mobile-dropdown"></div>');
            var productLinks = [
                { href: 'products/gnss.html', text: 'GNSS Receivers' },
                { href: 'products/total-station.html', text: 'Total Stations' },
                { href: 'products/theodolite.html', text: 'Theodolites' },
                { href: 'products/levels.html', text: 'Levels' },
                { href: 'products/software.html', text: 'Software' }
            ];
            
            // Add heading
            dropdown.append('<h3>Products</h3>');
            
            // Add links
            var list = $('<ul></ul>');
            $.each(productLinks, function(i, product) {
                list.append('<li><a href="' + product.href + '">' + product.text + '</a></li>');
            });
            
            dropdown.append(list);
            
            // Add close button
            dropdown.append('<button id="close-dropdown" class="btn">Close</button>');
            
            // Add to body
            $('body').append(dropdown);
            
            // Handle close button
            $('#close-dropdown').on('click', function() {
                $('#mobile-products-dropdown').removeClass('active');
                setTimeout(function() {
                    $('#mobile-products-dropdown').hide();
                }, 300);
            });
        }
        
        // Show dropdown
        $('#mobile-products-dropdown').show();
        setTimeout(function() {
            $('#mobile-products-dropdown').addClass('active');
        }, 10);
    }
    
    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#mobile-products-dropdown, .mobile-nav-item[href="#products"]').length) {
            $('#mobile-products-dropdown').removeClass('active');
            setTimeout(function() {
                $('#mobile-products-dropdown').hide();
            }, 300);
        }
    });
    
    // Handle search functionality on mobile
    $('#search-form').on('submit', function(e) {
        e.preventDefault();
        // The search functionality is already implemented in search.js
    });
});
