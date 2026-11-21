# VYRA — Premium Fitness & Gym Website

**VYRA** is a modern, premium fitness and personal training website designed to deliver an engaging digital experience for a fitness brand. Built with React, Tailwind CSS, GSAP, and Lenis, it combines smooth scrolling, interactive animations, and a clean, high-impact visual identity.

🌐 **Live Demo:** [Visit VYRA](https://vyra---gym-website.kashyap-education2234.workers.dev/)

---

## ✨ Features

- **Premium UI/UX:** Modern, dark-themed fitness website with bold typography and a distinctive visual identity.
- **Animated Preloader:** Custom introductory loader with session-based visibility.
- **Smooth Scrolling:** Integrated Lenis for a fluid scrolling experience.
- **GSAP Animations:** Scroll-triggered reveal animations using GSAP and ScrollTrigger.
- **Dynamic Services:** Dedicated sections showcasing personal training, mobility, and performance coaching.
- **Pricing Plans:** Structured membership and coaching packages.
- **Booking Modal:** Interactive booking interface with service selection.
- **WhatsApp Integration:** Contact and booking interactions through WhatsApp.
- **Testimonials:** Dedicated section for customer feedback.
- **FAQ Section:** Frequently asked questions for visitors.
- **Responsive Layout:** Designed to provide a consistent experience across screen sizes.
- **Component-Based Architecture:** Reusable React components for maintainability.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI development |
| Vite | Development server and build tool |
| Tailwind CSS 4 | Styling and responsive design |
| GSAP | Animations and scroll interactions |
| ScrollTrigger | Scroll-based animation control |
| Lenis | Smooth scrolling |
| Lucide React | Icons |
| JavaScript (ES Modules) | Application logic |

## 📂 Project Structure

```text
VYRA/
├── public/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── BookingModal.jsx
│   │   ├── Contact.jsx
│   │   ├── Faq.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Loader.jsx
│   │   ├── Marquee.jsx
│   │   ├── Metrics.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pricing.jsx
│   │   ├── Services.jsx
│   │   ├── SmoothScroll.jsx
│   │   └── Testimonials.jsx
│   ├── config/
│   │   └── business.js
│   ├── data/
│   │   └── siteData.js
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/KashyapDas/VYRA---Gym-website-.git
```

### 2. Navigate to the Project

```bash
cd VYRA---Gym-website-
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

### 5. Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## ⚙️ Customization

The project keeps its business information and website content separate from the UI components.

**Business Configuration**

Update `src/config/business.js` to customize:

- Business name
- WhatsApp phone number
- Business address
- Google Maps URL
- Instagram profile

**Website Content**

Update `src/data/siteData.js` to customize:

- Training services
- Service pricing
- Membership plans
- Testimonials
- Frequently asked questions

This separation makes it easier to adapt VYRA for other fitness businesses without rewriting the main components.

## 📱 Booking Integration

VYRA includes an interactive booking experience with WhatsApp integration.

Visitors can select a service and initiate a booking conversation through WhatsApp.

**Note:** This is a frontend booking experience, not a complete booking management system. Database-backed reservations, availability management, and administrative controls would require a backend implementation.

## 🎯 Project Goals

- Build a premium digital presence for a fitness brand.
- Explore advanced frontend animations and interactions.
- Implement reusable and maintainable React components.
- Create a smooth and engaging browsing experience.
- Demonstrate how a modern frontend can support a real-world business concept.

## 🌐 Deployment

The project is deployed using **Cloudflare Workers**.

**Live Website:** https://vyra---gym-website.kashyap-education2234.workers.dev/

---

## 👨‍💻 Author

**Kashyap Jyoti Das**

Software Engineer | Full Stack Developer

- GitHub: [@KashyapDas](https://github.com/KashyapDas)
- LinkedIn: [Connect with me](https://www.linkedin.com/)

---

⭐ If you like this project, consider giving it a star!
