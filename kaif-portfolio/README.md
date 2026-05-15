# Kaif Farooqui — DevOps Engineer Portfolio

A fully responsive, dark futuristic DevOps portfolio website built with **pure HTML, CSS, and Vanilla JavaScript** — no frameworks, no build tools, just open the file and go.

## 🚀 Live Demo
> Deploy to GitHub Pages — see instructions below.

---

## 📁 Folder Structure

```
kaif-portfolio/
├── index.html              ← Main HTML (all sections)
├── css/
│   ├── base.css            ← CSS variables, reset, loader, global styles
│   ├── navbar.css          ← Sticky glassmorphism navigation
│   ├── hero.css            ← Full-screen hero section
│   ├── sections.css        ← About, Skills, Projects, Experience, Certs, Contact, Footer
│   ├── components.css      ← Reusable buttons, social links
│   └── responsive.css      ← Mobile & tablet breakpoints
├── js/
│   ├── particles.js        ← Animated particle network canvas
│   ├── typing.js           ← Typewriter animation
│   ├── skills.js           ← Skills data, rendering & category filter
│   ├── animations.js       ← Scroll reveals, counters, tilt effects
│   └── main.js             ← Loader, navbar, cursor, menu, form, nav highlight
└── assets/
    └── resume.pdf          ← ⚠️ Add your resume PDF here
```

---

## ✨ Features

- **Loading screen** — animated progress bar with futuristic branding
- **Sticky glassmorphism navbar** — blurs on scroll, highlights active section
- **Cinematic hero** — typewriter animation, floating terminal windows, particle network
- **About** — animated counter stats + career timeline
- **Skills** — filterable category tabs with animated progress bars + 3D tilt
- **Projects** — glowing cards with tech badges, tilt on hover
- **Experience** — timeline cards with tech tags
- **Certifications** — shine-on-hover glass cards
- **Contact form** — glowing focus states + form validation
- **Footer** — quick links and social icons
- **Cursor glow** — follows mouse smoothly
- **Scroll progress bar** — top-of-page indicator
- **Fully responsive** — works on all screen sizes

---

## 🛠 How to Use

### Run locally
```bash
# No build step needed — just open in browser:
open index.html

# Or use VS Code Live Server extension for hot reload
```

### Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Your site will be live at `https://your-username.github.io/repo-name`

---

## 🎨 Customisation

### Update your info
Edit `index.html` — all content is clearly commented by section.

### Change colours
Open `css/base.css` and edit the `:root` variables:
```css
:root {
  --c1: #00f5ff;  /* Neon Cyan — primary accent */
  --c2: #7c3aed;  /* Electric Purple */
  --c3: #0ea5e9;  /* Sky Blue */
  --c4: #10b981;  /* Emerald */
}
```

### Add skills
Open `js/skills.js` and add to the `SKILLS` array:
```js
{ name: 'Ansible', icon: '⚙', cat: 'iac', pct: 75 },
```

### Add projects
Copy a `.project-card` block in `index.html` and update the content.

### Connect contact form
Replace the placeholder in `js/main.js` (`contactForm` submit handler) with:
- [Formspree](https://formspree.io) — free, no backend needed
- [EmailJS](https://emailjs.com) — send emails directly from JS

---

## 📄 License
MIT — free to use and modify.

---

*Built with ❤️ and pure web tech by Kaif Farooqui*
