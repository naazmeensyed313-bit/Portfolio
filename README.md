# Naazmeen — Software Developer Portfolio

A modern, responsive, and high-performance personal portfolio website built with **pure HTML5, CSS3, and Vanilla JavaScript** (Zero build tools or dependencies required).

---

## 🌟 Highlights & Features

- **No Build Tools or Node Required**: Open `index.html` directly in any web browser by double-clicking it.
- **Dark Mode & Light Mode**: Seamless theme switching with system detection and persistence via `localStorage`.
- **ATS Resume Viewer & Download**: Interactive modal with ATS summary sheet, embedded PDF viewer, and 1-click download of `Naazmeen_Resume.pdf`.
- **Interactive Project Architecture Modals**: Click "View Specs & Arch" on any project to inspect system architecture, metrics, and technical highlights.
- **Live Filtering & Instant Search**:
  - **Skills**: Filter by category (Programming Languages, Web & Frameworks, AI & GenAI, Databases & Tools) or type to search.
  - **Projects**: Filter by category (AI & GenAI, Web, Python/Desktop) or type to search by technology/keyword.
- **1-Click Copy**: Copy Email and Phone with instant visual feedback ("Copied!").
- **Working Interactive Contact Form**: Client-side validation with pre-populated `mailto:` client launcher.
- **Mobile Responsive**: Smooth hamburger navigation drawer, touch-friendly layouts, and floating "Back to Top" button.

---

## 🚀 How to Run Locally

You don't need `npm` or any command line tools!

### Option A: Double-Click
Simply open your file manager and double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox.

### Option B: Local Live Server (Optional)
If you have Python installed, you can run a local test server:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 📁 File Structure

```
naazmeen-portfolio/
│
├── index.html            # Main semantic HTML structure & modals
├── Naazmeen_Resume.pdf   # Official resume document
├── css/
│   └── style.css         # Complete styling, CSS variables, dark/light themes
├── js/
│   └── script.js         # Theme toggle, live search, modals, form validation
└── vercel.json           # Zero-config static deployment settings
```

---

## 🌐 Free 1-Click Deployment

### 1. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `naazmeen-syed.github.io` or `portfolio`).
2. Go to **Settings > Pages**.
3. Under **Branch**, select `main` / `root` and click **Save**.
4. Your portfolio is live instantly!

### 2. Vercel
1. Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
2. Import your GitHub repository.
3. Framework Preset: **Other** (it will auto-detect static files).
4. Click **Deploy**.

---

&copy; 2026 Naazmeen. All rights reserved.
