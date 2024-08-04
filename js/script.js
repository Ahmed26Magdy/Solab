document.addEventListener('DOMContentLoaded', function() {
    // Handle scrolling functionality
    const handleScroll = (direction, targetId) => {
        const productsContainer = document.getElementById(targetId);
        if (productsContainer) {
            const productWidth = 220; // Width including margin
            const visibleProducts = 3; // Number of products visible at a time
            const scrollAmount = direction === 'next' ? productWidth * visibleProducts : -productWidth * visibleProducts;
            productsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            console.error('No element found with ID:', targetId);
        }
    };

    // Event listener for product scrolling
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            handleScroll('next', this.getAttribute('data-target'));
        });
    });

    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            handleScroll('prev', this.getAttribute('data-target'));
        });
    });

  

    // toggle dropdown
    const toggleDropdown = (dropdown, accountIcon, event) => {
        dropdown.classList.toggle('show');
        event.stopPropagation();
    };

    // handle outside click
    const handleOutsideClick = (dropdown, accountIcon, event) => {
        if (!dropdown.contains(event.target) && !accountIcon.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    };

    // handle logout
    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    };

    // Event listener for product scrolling
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function() {
            handleScroll('next', this.getAttribute('data-target'));
        });
    });

    document.querySelectorAll('.prev-btn').forEach(button => {
        button.addEventListener('click', function() {
            handleScroll('prev', this.getAttribute('data-target'));
        });
    });

    // Event listener for account dropdown toggle
    const accountIcon = document.querySelector('.header-right .account');
    const dropdown = document.querySelector('.account-dropdown');

    if (accountIcon && dropdown) {
        accountIcon.addEventListener('click', (event) => toggleDropdown(dropdown, accountIcon, event));

        window.addEventListener('click', (event) => handleOutsideClick(dropdown, accountIcon, event));
    }

    // Event listener for logout functionality
    const logoutConfirmButton = document.getElementById('logout-confirm');

    if (logoutConfirmButton) {
        logoutConfirmButton.addEventListener('click', handleLogout);
    }

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(product, price) {
        cart.push({ product, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product} has been added to the cart`);
    }

    // Display cart items in cart.html
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cartContainer && totalPriceElement) {
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            let totalPrice = 0;
            let cartHTML = '';
            cart.forEach((item, index) => {
                totalPrice += item.price;
                cartHTML += `
                    <div class="cart-item">
                        <p>${item.product} - $${item.price}</p>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            });
            cartContainer.innerHTML = cartHTML;
            totalPriceElement.innerText = totalPrice.toFixed(2);
        }
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();  // Reload the page to update the cart display
    };
});


