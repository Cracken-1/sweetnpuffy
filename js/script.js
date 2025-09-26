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
    // Open the appropriate modal instead of direct WhatsApp
    switch(type) {
        case 'order_cake':
            openChatModal('order_cake');
            break;
        case 'check_pricing':
            openChatModal('check_pricing');
            break;
        case 'custom_design':
            openChatModal('custom_design');
            break;
        default:
            // For general inquiries, go directly to WhatsApp
            const message = `👋 Hello Sweet n' Puffy! I'm interested in your bakery services. Could you help me with information about your products and services? Thank you! 🙏`;
            const whatsappUrl = `https://wa.me/254704939844?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
    }
}

// Function to open chat-specific modals
function openChatModal(type) {
    let title = '';
    let content = '';
    
    switch(type) {
        case 'order_cake':
            title = '🎂 Order a Cake';
            content = `
                <div class="chat-modal-form">
                    <div class="form-group">
                        <label for="cakeType">What type of cake? *</label>
                        <select id="cakeType" required>
                            <option value="">Select cake type</option>
                            <option value="Birthday Cake">Birthday Cake</option>
                            <option value="Wedding Cake">Wedding Cake</option>
                            <option value="Anniversary Cake">Anniversary Cake</option>
                            <option value="Corporate Cake">Corporate Cake</option>
                            <option value="Graduation Cake">Graduation Cake</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cakeSize">How many people? *</label>
                            <input type="number" id="cakeSize" min="1" placeholder="e.g. 20" required>
                        </div>
                        <div class="form-group">
                            <label for="cakeFlavor">Preferred flavor? *</label>
                            <select id="cakeFlavor" required>
                                <option value="">Select flavor</option>
                                <option value="Chocolate">Chocolate</option>
                                <option value="Vanilla">Vanilla</option>
                                <option value="Red Velvet">Red Velvet</option>
                                <option value="Carrot">Carrot</option>
                                <option value="Black Forest">Black Forest</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="cakeDate">When do you need it? *</label>
                        <input type="date" id="cakeDate" required>
                    </div>
                    <div class="form-group">
                        <label for="cakeTheme">Theme/Design (Optional)</label>
                        <textarea id="cakeTheme" placeholder="Describe your preferred design, colors, decorations..."></textarea>
                    </div>
                </div>
            `;
            break;
            
        case 'check_pricing':
            title = '💰 Check Pricing';
            content = `
                <div class="chat-modal-form">
                    <div class="form-group">
                        <label for="priceProduct">What are you interested in? *</label>
                        <select id="priceProduct" required>
                            <option value="">Select product type</option>
                            <option value="Cakes">Cakes</option>
                            <option value="Cupcakes">Cupcakes</option>
                            <option value="Pastries">Pastries</option>
                            <option value="Bread & Rolls">Bread & Rolls</option>
                            <option value="Party Platters">Party Platters</option>
                            <option value="Wedding Package">Wedding Package</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="priceQuantity">Quantity needed</label>
                            <input type="text" id="priceQuantity" placeholder="e.g. 1 cake, 50 cupcakes">
                        </div>
                        <div class="form-group">
                            <label for="priceDate">Event date</label>
                            <input type="date" id="priceDate">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="priceBudget">Budget range (Optional)</label>
                        <select id="priceBudget">
                            <option value="">Select budget range</option>
                            <option value="Under KSh 2,000">Under KSh 2,000</option>
                            <option value="KSh 2,000 - 5,000">KSh 2,000 - 5,000</option>
                            <option value="KSh 5,000 - 10,000">KSh 5,000 - 10,000</option>
                            <option value="Above KSh 10,000">Above KSh 10,000</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="priceDetails">Additional details</label>
                        <textarea id="priceDetails" placeholder="Any specific requirements or questions..."></textarea>
                    </div>
                </div>
            `;
            break;
            
        case 'custom_design':
            title = '🎨 Custom Design';
            content = `
                <div class="chat-modal-form">
                    <div class="form-group">
                        <label for="designOccasion">What's the occasion? *</label>
                        <select id="designOccasion" required>
                            <option value="">Select occasion</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Corporate Event">Corporate Event</option>
                            <option value="Baby Shower">Baby Shower</option>
                            <option value="Graduation">Graduation</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="designSize">Size needed *</label>
                            <input type="text" id="designSize" placeholder="e.g. serves 50 people" required>
                        </div>
                        <div class="form-group">
                            <label for="designDate">Event date *</label>
                            <input type="date" id="designDate" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="designConcept">Design concept *</label>
                        <textarea id="designConcept" placeholder="Describe your vision: theme, colors, style, decorations..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="designBudget">Budget range</label>
                        <select id="designBudget">
                            <option value="">Select budget range</option>
                            <option value="KSh 5,000 - 10,000">KSh 5,000 - 10,000</option>
                            <option value="KSh 10,000 - 20,000">KSh 10,000 - 20,000</option>
                            <option value="KSh 20,000 - 50,000">KSh 20,000 - 50,000</option>
                            <option value="Above KSh 50,000">Above KSh 50,000</option>
                        </select>
                    </div>
                </div>
            `;
            break;
    }
    
    // Create and show the modal
    showChatModal(title, content, type);
}

// Function to show chat modal
function showChatModal(title, content, type) {
    // Create modal HTML
    const modalHTML = `
        <div id="chatModal" class="order-modal">
            <div class="order-modal-content">
                <div class="order-modal-header">
                    <h3>${title}</h3>
                    <button class="order-modal-close" onclick="closeChatModal()">&times;</button>
                </div>
                <div class="order-modal-body">
                    ${content}
                    <div class="form-group">
                        <label for="chatName">Your name *</label>
                        <input type="text" id="chatName" required>
                    </div>
                    <div class="form-group">
                        <label for="chatPhone">Your phone *</label>
                        <input type="tel" id="chatPhone" required>
                    </div>
                    <button type="button" class="order-submit-btn" onclick="submitChatForm('${type}')">
                        <i class="fab fa-whatsapp"></i>
                        Send via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('chatModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    document.getElementById('chatModal').style.display = 'block';
    
    // Set minimum date to today
    const dateInputs = document.querySelectorAll('#chatModal input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => input.setAttribute('min', today));
}

// Function to close chat modal
function closeChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.remove();
    }
}

// Function to submit chat form
function submitChatForm(type) {
    const name = document.getElementById('chatName').value;
    const phone = document.getElementById('chatPhone').value;
    
    if (!name || !phone) {
        alert('Please fill in your name and phone number');
        return;
    }
    
    let message = '';
    let emoji = '';
    
    switch(type) {
        case 'order_cake':
            emoji = '🎂';
            const cakeType = document.getElementById('cakeType').value;
            const cakeSize = document.getElementById('cakeSize').value;
            const cakeFlavor = document.getElementById('cakeFlavor').value;
            const cakeDate = document.getElementById('cakeDate').value;
            const cakeTheme = document.getElementById('cakeTheme').value;
            
            message = `${emoji} *CAKE ORDER REQUEST*\n\n`;
            message += `*Type:* ${cakeType}\n`;
            message += `*Size:* ${cakeSize} people\n`;
            message += `*Flavor:* ${cakeFlavor}\n`;
            message += `*Needed by:* ${formatDate(cakeDate)}\n`;
            if (cakeTheme) message += `*Design:* ${cakeTheme}\n`;
            message += `*Customer:* ${name}\n`;
            message += `*Phone:* ${phone}\n\n`;
            message += `Please provide quote and availability. Thank you! 🙏`;
            break;
            
        case 'check_pricing':
            emoji = '💰';
            const priceProduct = document.getElementById('priceProduct').value;
            const priceQuantity = document.getElementById('priceQuantity').value;
            const priceDate = document.getElementById('priceDate').value;
            const priceBudget = document.getElementById('priceBudget').value;
            const priceDetails = document.getElementById('priceDetails').value;
            
            message = `${emoji} *PRICING INQUIRY*\n\n`;
            message += `*Product:* ${priceProduct}\n`;
            if (priceQuantity) message += `*Quantity:* ${priceQuantity}\n`;
            if (priceDate) message += `*Event date:* ${formatDate(priceDate)}\n`;
            if (priceBudget) message += `*Budget:* ${priceBudget}\n`;
            if (priceDetails) message += `*Details:* ${priceDetails}\n`;
            message += `*Customer:* ${name}\n`;
            message += `*Phone:* ${phone}\n\n`;
            message += `Please share your pricing information. Thank you! 🙏`;
            break;
            
        case 'custom_design':
            emoji = '🎨';
            const designOccasion = document.getElementById('designOccasion').value;
            const designSize = document.getElementById('designSize').value;
            const designDate = document.getElementById('designDate').value;
            const designConcept = document.getElementById('designConcept').value;
            const designBudget = document.getElementById('designBudget').value;
            
            message = `${emoji} *CUSTOM DESIGN REQUEST*\n\n`;
            message += `*Occasion:* ${designOccasion}\n`;
            message += `*Size:* ${designSize}\n`;
            message += `*Event date:* ${formatDate(designDate)}\n`;
            message += `*Concept:* ${designConcept}\n`;
            if (designBudget) message += `*Budget:* ${designBudget}\n`;
            message += `*Customer:* ${name}\n`;
            message += `*Phone:* ${phone}\n\n`;
            message += `I'd love to discuss this design! When can we schedule a consultation? 🌟`;
            break;
    }
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/254704939844?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Close modal
    closeChatModal();
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
}, true);// Enha
nced Google Analytics Tracking
function trackEvent(eventName, category, label, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    }
}

// Track WhatsApp clicks
function trackWhatsAppClick(productName, source) {
    trackEvent('whatsapp_click', 'engagement', `${source}: ${productName}`, 1);
}

// Track modal opens
function trackModalOpen(modalType) {
    trackEvent('modal_open', 'engagement', modalType, 1);
}

// Track form submissions
function trackFormSubmission(formType) {
    trackEvent('form_submit', 'conversion', formType, 1);
}

// Enhanced order modal function with tracking
function openOrderModalWithTracking(productName, price) {
    trackModalOpen('product_order');
    trackEvent('product_interest', 'engagement', productName, 1);
    openOrderModal(productName, price);
}

// Enhanced chat modal function with tracking
function openChatModalWithTracking(type) {
    trackModalOpen(`chat_${type}`);
    openChatModal(type);
}

// Update existing functions to include tracking
const originalSubmitOrder = submitOrder;
submitOrder = function() {
    trackFormSubmission('product_order');
    trackWhatsAppClick(currentProduct, 'order_form');
    originalSubmitOrder();
};

const originalSubmitChatForm = submitChatForm;
submitChatForm = function(type) {
    trackFormSubmission(`chat_${type}`);
    trackWhatsAppClick(type, 'chat_form');
    originalSubmitChatForm(type);
};

// Track page views on load
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-9JJPBKHCL0', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            trackEvent('scroll_depth', 'engagement', `${scrollPercent}%`, scrollPercent);
        }
    });
});