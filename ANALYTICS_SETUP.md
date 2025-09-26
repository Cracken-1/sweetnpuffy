# Google Analytics Setup Guide for Sweet n' Puffy

## 🚀 Quick Setup

### Google Analytics Setup

1. **Create Google Analytics Account:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Sign in with your Google account
   - Click "Start measuring"
   - Enter account name: "Sweet n' Puffy"
   - Choose your country: Kenya

2. **Create Property:**
   - Property name: "Sweet n' Puffy Website"
   - Reporting time zone: "Africa/Nairobi"
   - Currency: "Kenyan Shilling (KES)"

3. **Get Measurement ID:**
   - After creating property, you'll get a Measurement ID (format: G-XXXXXXXXXX)
   - Your current ID: **G-9JJPBKHCL0** (already configured)

4. **Verification:**
   - Google Analytics is already installed on all pages
   - Tracking ID G-9JJPBKHCL0 is active
   - Enhanced tracking events are configured

## 📊 What You'll Track

### Google Analytics tracks:
- **Page Views:** Which pages are most popular
- **User Sessions:** How long visitors stay
- **Traffic Sources:** Where visitors come from (Google, social media, direct)
- **Device Types:** Mobile vs Desktop usage
- **Geographic Data:** Visitor locations (countries, cities)
- **Conversion Events:** Form submissions, WhatsApp clicks
- **Custom Events:** Modal opens, scroll depth, product interest
- **Real-time Data:** Current active users on your site

## 🔧 Advanced Tracking (Optional)

### Track WhatsApp Orders:
Add this code to track when users click WhatsApp buttons:

```javascript
// Add to js/script.js
function trackWhatsAppClick(productName) {
    // Google Analytics Event
    gtag('event', 'whatsapp_order', {
        'event_category': 'engagement',
        'event_label': productName,
        'value': 1
    });
    
    // Vercel Analytics Event
    if (window.va) {
        window.va('track', 'WhatsApp Order', { product: productName });
    }
}
```

### Track Form Submissions:
```javascript
// Track modal form submissions
function trackFormSubmission(formType) {
    gtag('event', 'form_submit', {
        'event_category': 'engagement',
        'event_label': formType
    });
}
```

## 📈 Viewing Your Data

### Google Analytics Dashboard:
1. Go to [analytics.google.com](https://analytics.google.com)
2. Select your property
3. View reports in:
   - **Realtime:** See current visitors
   - **Audience:** Visitor demographics
   - **Acquisition:** Traffic sources
   - **Behavior:** Page interactions
   - **Conversions:** Goal completions

### Enhanced Tracking Features:
- **WhatsApp Click Tracking:** Monitor order button clicks
- **Modal Interaction Tracking:** See which forms users engage with
- **Scroll Depth Tracking:** Understand content engagement
- **Product Interest Tracking:** Know which items get attention

## 🎯 Key Metrics to Monitor

### Business Metrics:
- **WhatsApp Clicks:** Order intent
- **Menu Page Views:** Product interest
- **Contact Form Submissions:** Lead generation
- **Mobile vs Desktop:** User preferences

### Performance Metrics:
- **Page Load Speed:** User experience
- **Bounce Rate:** Content engagement
- **Session Duration:** Site stickiness
- **Return Visitors:** Customer loyalty

## 🔒 Privacy & GDPR

The current setup is privacy-friendly:
- No personal data collection
- Anonymous user tracking
- No cookies for EU users (if needed)
- Compliant with basic privacy requirements

## 📞 Support

If you need help with analytics setup:
- Google Analytics Help: [support.google.com/analytics](https://support.google.com/analytics)
- Vercel Documentation: [vercel.com/docs/analytics](https://vercel.com/docs/analytics)

---

**Next Steps:**
1. Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID
2. Deploy to Vercel
3. Enable Vercel Analytics in dashboard
4. Start monitoring your bakery's online performance! 🎉