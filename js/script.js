// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initGalleryFilters();
    initMenuFilters();
    initMap();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Modern Gallery functionality
function initGalleryFilters() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-category');

            galleryCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Lightbox functionality
function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxOrder = document.getElementById('lightbox-order');
    
    lightboxImage.src = imageSrc;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
    lightboxOrder.href = `https://wa.me/254704939844?text=I'm interested in ${title}`;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside
window.addEventListener('click', function(event) {
    const lightbox = document.getElementById('lightbox');
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);



// WhatsApp Chat Widget
function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    const notification = document.querySelector('.chat-notification');
    
    chatPopup.classList.toggle('active');
    
    // Hide notification when chat is opened
    if (chatPopup.classList.contains('active')) {
        notification.style.display = 'none';
    }
}

function sendQuickReply(type) {
    let message = '';
    
    switch(type) {
        case 'order_cake':
            message = `🎂 Hello Sweet n' Puffy!

I would like to place an order for a cake. Here are my details:

📋 ORDER DETAILS:
• Cake Type: [Please specify - Birthday, Wedding, Anniversary, etc.]
• Size: [Number of people it should serve]
• Flavor: [Chocolate, Vanilla, Red Velvet, Carrot, etc.]
• Design/Theme: [Describe your preferred design]
• Special Requirements: [Any dietary restrictions or special requests]

📅 EVENT DETAILS:
• Event Date: [When do you need the cake]
• Pickup/Delivery: [Pickup from Kenyatta Road, Juja OR Delivery to your location]
• Budget Range: [Your preferred price range]

📞 CONTACT:
• Name: [Your full name]
• Phone: [Your contact number]
• Location: [Your area/address if delivery needed]

Please provide me with a quote and availability. Thank you! 🙏`;
            break;
            
        case 'check_pricing':
            message = `💰 Hello Sweet n' Puffy!

I would like to inquire about your pricing for the following:

🍰 PRICING INQUIRY:
• Product Type: [Cakes, Cupcakes, Pastries, Bread, etc.]
• Specific Item: [e.g., Wedding Cake, Birthday Cake, Croissants]
• Quantity/Size: [How many pieces or what size]
• Event Date: [When do you need it]

📋 ADDITIONAL INFO:
• Special Requirements: [Any customizations needed]
• Service Area: [Pickup or delivery location]
• Budget Considerations: [Any budget constraints]

Could you please share your current pricing and any package deals available? 

Looking forward to your response! 🙏`;
            break;
            
        case 'custom_design':
            message = `🎨 Hello Sweet n' Puffy!

I'm interested in a custom cake design and would like to discuss the possibilities:

🎂 CUSTOM DESIGN REQUEST:
• Occasion: [Birthday, Wedding, Anniversary, Corporate, etc.]
• Theme/Concept: [Describe your vision in detail]
• Size Requirements: [Number of servings needed]
• Preferred Flavors: [Cake and frosting flavors]
• Color Scheme: [Preferred colors for the design]
• Special Elements: [Flowers, figures, logos, text, etc.]

📅 PROJECT TIMELINE:
• Event Date: [When is your event]
• Consultation Preference: [In-person or phone discussion]
• Reference Images: [I can share inspiration photos]

💡 ADDITIONAL DETAILS:
• Budget Range: [Your investment level for this custom piece]
• Delivery/Pickup: [Location details]
• Special Dietary Needs: [Allergies, preferences, etc.]

I'd love to schedule a consultation to bring this vision to life! When would be a good time to discuss? 🌟`;
            break;
            
        default:
            message = `👋 Hello Sweet n' Puffy!

I'm interested in your bakery services and would like to learn more about your offerings.

Could you please provide information about:
• Available products and services
• Pricing and packages
• Ordering process
• Delivery options

Thank you for your time! 🙏`;
    }
    
    const whatsappUrl = `https://wa.me/254704939844?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Global variables for order modal
let currentProduct = '';
let currentPrice = '';

// Function to open order modal
function openOrderModal(productName, price) {
    currentProduct = productName;
    currentPrice = price;
    
    document.getElementById('modalTitle').textContent = `Order ${productName}`;
    document.getElementById('orderModal').style.display = 'block';
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').setAttribute('min', today);
}

// Function to close order modal
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
    document.getElementById('deliveryLocationGroup').style.display = 'none';
}

// Handle delivery option change
document.addEventListener('DOMContentLoaded', function() {
    const deliveryOption = document.getElementById('deliveryOption');
    const deliveryLocationGroup = document.getElementById('deliveryLocationGroup');
    
    if (deliveryOption) {
        deliveryOption.addEventListener('change', function() {
            if (this.value === 'delivery') {
                deliveryLocationGroup.style.display = 'block';
                document.getElementById('deliveryLocation').required = true;
            } else {
                deliveryLocationGroup.style.display = 'none';
                document.getElementById('deliveryLocation').required = false;
            }
        });
    }
    
    // Handle form submission
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitOrder();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('orderModal');
        if (e.target === modal) {
            closeOrderModal();
        }
    });
});

// Function to submit order and generate WhatsApp message
function submitOrder() {
    const formData = new FormData(document.getElementById('orderForm'));
    const data = Object.fromEntries(formData);
    
    // Get emoji based on product type
    let emoji = '🍰';
    if (currentProduct.toLowerCase().includes('cake')) emoji = '🎂';
    else if (currentProduct.toLowerCase().includes('cupcake')) emoji = '🧁';
    else if (currentProduct.toLowerCase().includes('croissant') || currentProduct.toLowerCase().includes('pastry')) emoji = '🥐';
    else if (currentProduct.toLowerCase().includes('bread') || currentProduct.toLowerCase().includes('roll')) emoji = '🍞';
    else if (currentProduct.toLowerCase().includes('cookie')) emoji = '🍪';
    else if (currentProduct.toLowerCase().includes('donut')) emoji = '🍩';
    
    // Create concise WhatsApp message
    let message = `${emoji} *ORDER REQUEST*\n\n`;
    message += `*Product:* ${currentProduct}\n`;
    message += `*Price:* ${currentPrice}\n`;
    message += `*Quantity:* ${data.orderQuantity}\n`;
    message += `*Customer:* ${data.customerName}\n`;
    message += `*Phone:* ${data.customerPhone}\n`;
    message += `*Needed by:* ${formatDate(data.eventDate)}\n`;
    message += `*Service:* ${data.deliveryOption === 'pickup' ? 'Pickup from Juja' : 'Delivery'}`;
    
    if (data.deliveryOption === 'delivery' && data.deliveryLocation) {
        message += `\n*Location:* ${data.deliveryLocation}`;
    }
    
    if (data.specialRequests) {
        message += `\n*Special requests:* ${data.specialRequests}`;
    }
    
    message += `\n\nPlease confirm availability and total cost. Thank you! 🙏`;
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/254704939844?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeOrderModal();
}

// Function to format date nicely
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Updated function for order buttons (now opens modal instead of direct WhatsApp)
function generateOrderMessage(productName, price) {
    openOrderModal(productName, price);
    return false; // Prevent default link behavior
}



// Menu filters functionality
function initMenuFilters() {
    const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    menuFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            menuFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            menuCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
}

// Map initialization
function initMap() {
    // Initialize the map - Juja coordinates
    const map = L.map('map').setView([-1.1048, 37.0067], 14); // Juja coordinates

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add marker for bakery location
    const bakeryMarker = L.marker([-1.1048, 37.0067]).addTo(map);
    
    // Custom popup content
    bakeryMarker.bindPopup(`
        <div style="text-align: center; padding: 10px;">
            <h3 style="color: #ed1c24; margin-bottom: 10px;">Sweet n' Puffy</h3>
            <p style="margin-bottom: 5px;"><strong>Address:</strong><br>Kenyatta Road<br>Juja, Kiambu County</p>
            <p style="margin-bottom: 5px;"><strong>Phone:</strong><br><a href="tel:0704939844" style="color: #ed1c24;">0704 939 844</a></p>
            <p><strong>Hours:</strong><br>Mon-Fri: 7AM-7PM<br>Sat: 8AM-8PM<br>Sun: 9AM-6PM</p>
        </div>
    `).openPopup();

    // Add click event to show directions
    map.on('click', function(e) {
        const userLat = e.latlng.lat;
        const userLng = e.latlng.lng;
        const bakeryLat = -1.1048;
        const bakeryLng = 37.0067;
        
        // Open Google Maps with directions
        const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${bakeryLat},${bakeryLng}`;
        window.open(directionsUrl, '_blank');
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('orderForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Create WhatsApp message and send
        setTimeout(() => {
            // Create WhatsApp message
            const message = createWhatsAppMessage(data);
            const whatsappUrl = `https://wa.me/254704939844?text=${encodeURIComponent(message)}`;
            
            // Open WhatsApp in new tab
            const whatsappWindow = window.open(whatsappUrl, '_blank');
            
            // Check if WhatsApp opened successfully
            if (whatsappWindow) {
                // Reset form
                form.reset();
                
                // Show success message
                showNotification('Redirecting to WhatsApp... Your order details have been prepared!', 'success');
            } else {
                // Fallback if popup blocked
                showNotification('Please allow popups to send your order via WhatsApp, or copy this link: ' + whatsappUrl, 'info');
            }
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Form validation
function validateForm(data) {
    const requiredFields = ['name', 'phone', 'email', 'orderType', 'eventDate', 'message'];
    const errors = [];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            errors.push(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (data.phone && !phoneRegex.test(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    // Date validation (must be future date)
    if (data.eventDate) {
        const eventDate = new Date(data.eventDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (eventDate < today) {
            errors.push('Event date must be in the future');
        }
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Create WhatsApp message
function createWhatsAppMessage(data) {
    const orderTypeFormatted = data.orderType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    return `🍰 *New Order Request - Sweet n' Puffy*

👤 *Customer Details:*
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

🎂 *Order Details:*
Type: ${orderTypeFormatted}
Event Date: ${data.eventDate}

📝 *Requirements:*
${data.message}

---
Please confirm availability and provide a quote. Thank you!`;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll('.gallery-item, .service-card, .menu-category, .feature, .contact-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}



// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Image lazy loading fallback for older browsers
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Performance optimization
window.addEventListener('load', function() {
    // Remove loading states
    document.body.classList.add('loaded');
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Preload critical images
    const criticalImages = ['assets/images/sample1.png', 'assets/images/sample2.png', 'assets/images/sample3.png'];
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
        e.target.alt = 'Image not available';
    }
}, true);