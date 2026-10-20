/**
 * NAAZMEEN PORTFOLIO - VANILLA JAVASCRIPT
 * Handles theme switching, modals, filtering, search, copy triggers, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initTerminal();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModal();
  initResumeModal();
  initCopyButtons();
  initContactForm();
  initBackToTop();
});

/* ==========================================================================
   1. THEME SWITCHER (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = storedTheme ? storedTheme : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  if (theme === 'dark') {
    // Show Sun icon in dark mode
    themeToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    `;
    themeToggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    // Show Moon icon in light mode
    themeToggle.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>
    `;
    themeToggle.setAttribute('aria-label', 'Switch to dark mode');
  }
}

/* ==========================================================================
   2. NAVBAR SCROLL & ACTIVE SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  // Scroll blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightNavOnScroll();
  }, { passive: true });

  // Mobile menu toggle
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function highlightNavOnScroll() {
    const scrollPos = window.scrollY + 140;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }
}

/* ==========================================================================
   2.1. INTERACTIVE CODE TERMINAL
   ========================================================================== */
function initTerminal() {
  const tabs = document.querySelectorAll('.terminal-tab');
  const views = document.querySelectorAll('.code-view');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      views.forEach(v => {
        if (v.id === targetId) {
          v.classList.add('active');
        } else {
          v.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   3. SKILLS FILTER & LIVE SEARCH
   ========================================================================== */
function initSkillsFilter() {
  const tabButtons = document.querySelectorAll('.skills-tab-btn');
  const searchInput = document.getElementById('skills-search-input');
  const clearBtn = document.getElementById('skills-search-clear');
  const categoryGroups = document.querySelectorAll('.skills-category-group');

  function filterSkills() {
    const activeTab = document.querySelector('.skills-tab-btn.active')?.dataset.category || 'all';
    const query = (searchInput?.value || '').trim().toLowerCase();

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    categoryGroups.forEach(group => {
      const groupCat = group.dataset.category;
      const matchesCategory = (activeTab === 'all' || activeTab === groupCat);

      if (!matchesCategory) {
        group.style.display = 'none';
        return;
      }

      let visibleCountInGroup = 0;
      const cards = group.querySelectorAll('.skill-card');

      cards.forEach(card => {
        const name = (card.querySelector('.skill-name')?.textContent || '').toLowerCase();
        const usage = (card.querySelector('.skill-usage')?.textContent || '').toLowerCase();
        const matchesQuery = !query || name.includes(query) || usage.includes(query);

        if (matchesQuery) {
          card.style.display = 'flex';
          visibleCountInGroup++;
        } else {
          card.style.display = 'none';
        }
      });

      group.style.display = visibleCountInGroup > 0 ? 'block' : 'none';
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterSkills();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterSkills);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterSkills();
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   4. PROJECTS FILTER & LIVE SEARCH
   ========================================================================== */
function initProjectsFilter() {
  const tabButtons = document.querySelectorAll('.projects-tab-btn');
  const searchInput = document.getElementById('projects-search-input');
  const clearBtn = document.getElementById('projects-search-clear');
  const projectCards = document.querySelectorAll('.project-card');
  const emptyState = document.getElementById('projects-empty');

  function filterProjects() {
    const activeTab = document.querySelector('.projects-tab-btn.active')?.dataset.category || 'all';
    const query = (searchInput?.value || '').trim().toLowerCase();

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    let matchCount = 0;

    projectCards.forEach(card => {
      const categories = (card.dataset.categories || '').split(',');
      const matchesCategory = (activeTab === 'all' || categories.includes(activeTab));

      const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
      const subtitle = (card.querySelector('.project-subtitle')?.textContent || '').toLowerCase();
      const desc = (card.querySelector('.project-description')?.textContent || '').toLowerCase();
      const tech = (card.dataset.tech || '').toLowerCase();

      const matchesQuery = !query || title.includes(query) || subtitle.includes(query) || desc.includes(query) || tech.includes(query);

      if (matchesCategory && matchesQuery) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = matchCount === 0 ? 'block' : 'none';
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProjects);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterProjects();
      searchInput.focus();
    });
  }
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
const PROJECT_DATABASE = {
  'codeverse-ai': {
    title: 'CodeVerse AI',
    subtitle: 'AI-Powered Computer Science Learning Platform',
    categoryLabel: 'AI & Full-Stack',
    badge: 'Featured AI Project',
    technologies: ['Python', 'Flask', 'Google Gemini API', 'JavaScript', 'Three.js', 'Tailwind CSS', 'SQLite'],
    description: 'An intelligent Computer Science learning platform featuring interactive algorithm visualizations, memory and CPU hardware simulations, a live SQL playground, and real-time context-aware AI tutoring powered by the Google Gemini API.',
    highlights: [
      'Interactive 3D algorithm visualizers & CPU architecture simulations',
      'Context-aware tutoring using Google Gemini API for real-time code analysis',
      'In-browser live SQL playground with immediate schema feedback and query grading'
    ],
    keyFeatures: [
      'Real-time automated code hints without giving away complete solutions',
      'Visual execution trace for sorting, trees, and graph algorithms',
      'Interactive relational database sandbox running on lightweight SQLite',
      'Personalized CS progression tracker with adaptive practice problems'
    ],
    architecture: 'Client-side React and Three.js frontend communicating with a Python Flask REST backend. Gemini API calls are securely processed server-side with structured prompt engineering to generate guided CS explanations and evaluate student queries.',
    metrics: [
      { label: 'Tech Stack', value: '7 Tools' },
      { label: 'Completion', value: '3 Weeks' },
      { label: 'Impact Rating', value: '9.6 / 10' },
      { label: 'Tutoring Latency', value: '< 1.4s' }
    ],
    github: 'https://github.com/naazmeensyed313-bit/CodeVerseAI',
    demo: 'https://github.com/naazmeensyed313-bit/CodeVerseAI'
  },
  'findora-ai': {
    title: 'FindOra',
    subtitle: 'Smart College Lost & Found Portal with Automated Pairing',
    categoryLabel: 'Smart Automation & Systems',
    badge: 'Campus Innovation',
    technologies: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'SHA256 Hashing'],
    description: 'A comprehensive campus lost-and-found management portal built with secure cryptographic user authentication and a custom smart-matching heuristic algorithm that pairs lost and found reports by category, color, location, and description.',
    highlights: [
      'Custom smart-matching algorithm that scores lost/found item affinity',
      'Interactive analytics dashboard using Pandas for campus recovery insights',
      'Secure end-to-end recovery verification workflow with automated notifications'
    ],
    keyFeatures: [
      'Cryptographically secured user credentials via SHA256 hashing',
      'Categorized report filters for electronic devices, ID cards, bags, and books',
      'Item claim verification protocol preventing unauthorized collections',
      'Automated notification triggers when high-confidence matches are found'
    ],
    architecture: 'Streamlit-based reactive interface backed by SQLite database. Data processing pipelines implemented with Pandas calculate matching similarity metrics across multi-attribute feature vectors.',
    metrics: [
      { label: 'Tech Stack', value: '5 Tools' },
      { label: 'Timeline', value: '4 Weeks' },
      { label: 'Match Affinity', value: '94% Match' },
      { label: 'Auth Security', value: 'SHA-256' }
    ],
    github: 'https://github.com/naazmeensyed313-bit/FindOra-Smart-Lost-and-Found-Sytem',
    demo: 'https://github.com/naazmeensyed313-bit/FindOra-Smart-Lost-and-Found-Sytem'
  },
  'nexora': {
    title: 'Nexora',
    subtitle: 'AI-Powered Startup Idea Analyzer & Viability Visualizer',
    categoryLabel: 'Web Development',
    badge: 'Founder Tools',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Modern UI', 'Data Visualization'],
    description: 'An interactive web application that evaluates startup concepts and visualizes feasibility, market demand, competitive density, and execution risk through dynamic charts and intuitive UI components.',
    highlights: [
      'Visual feasibility, demand, and risk analytics with interactive charts',
      'Responsive, modern interface presenting actionable go-to-market insights',
      'Structured rubric scoring for founder idea validation'
    ],
    keyFeatures: [
      'Multi-variable risk assessment across market size, CAC, and regulatory hurdles',
      'Competitor landscape matrix mapping',
      'Actionable go-to-market milestone generator',
      'Clean PDF/JSON export of startup evaluation briefs'
    ],
    architecture: 'Engineered with vanilla JavaScript, modern DOM manipulation, and dynamic SVG chart renderers to provide lightweight, dependency-free execution.',
    metrics: [
      { label: 'Tech Stack', value: '5 Tools' },
      { label: 'Timeline', value: '2 Weeks' },
      { label: 'Risk Vectors', value: '8 Evaluated' },
      { label: 'Render Speed', value: '< 150ms' }
    ],
    github: 'https://github.com/naazmeensyed313-bit/NEXORA',
    demo: 'https://github.com/naazmeensyed313-bit/NEXORA'
  },
  'focusflow': {
    title: 'FocusFlow',
    subtitle: 'Virtual Study Room & Desktop Productivity Suite',
    categoryLabel: 'Python & Desktop Systems',
    badge: 'Offline First',
    technologies: ['Python', 'CustomTkinter', 'JSON Persistence', 'Threading'],
    description: 'A modular desktop productivity software with an integrated Pomodoro focus timer, task manager, notes system, streak tracker, and persistent local data storage using JSON.',
    highlights: [
      'Engineered with Python & CustomTkinter with modular architecture',
      'Integrated focus timer, streak counter, task priority matrix, and notes',
      'Zero-cloud offline-first persistent storage using structured JSON schemas'
    ],
    keyFeatures: [
      'Customizable work/break intervals with audio notifications',
      'Daily and weekly study streak tracking to build consistent habits',
      'Task categorization with urgent/important Eisenhower matrix sorting',
      'Fast search and tagging across study notes and reference snippets'
    ],
    architecture: 'Built using Python with CustomTkinter for native desktop controls. Implements asynchronous background timers using Python threading to prevent UI freezing during countdowns.',
    metrics: [
      { label: 'Tech Stack', value: '4 Tools' },
      { label: 'Timeline', value: '2 Weeks' },
      { label: 'Architecture', value: '100% Offline' },
      { label: 'Data Storage', value: 'JSON Local' }
    ],
    github: 'https://github.com/naazmeensyed313-bit/FocusFlow',
    demo: 'https://github.com/naazmeensyed313-bit/FocusFlow'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('project-modal-close');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = PROJECT_DATABASE[projectId];
    if (!data) return;

    document.getElementById('modal-project-badge').textContent = data.categoryLabel;
    document.getElementById('modal-project-title').textContent = data.title;
    document.getElementById('modal-project-subtitle').textContent = data.subtitle;
    document.getElementById('modal-project-desc').textContent = data.description;
    document.getElementById('modal-project-arch').textContent = data.architecture;

    // Tech chips
    const techBox = document.getElementById('modal-project-tech');
    techBox.innerHTML = data.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('');

    // Highlights
    const hlBox = document.getElementById('modal-project-highlights');
    hlBox.innerHTML = data.highlights.map(h => `
      <li class="project-highlight-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${h}</span>
      </li>
    `).join('');

    // Key Features
    const featBox = document.getElementById('modal-project-features');
    featBox.innerHTML = data.keyFeatures.map(f => `
      <li class="project-highlight-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 14 14"></polyline>
        </svg>
        <span>${f}</span>
      </li>
    `).join('');

    // Metrics
    const metricsBox = document.getElementById('modal-project-metrics');
    metricsBox.innerHTML = data.metrics.map(m => `
      <div class="metric-col">
        <div class="metric-title">${m.label}</div>
        <div class="metric-val">${m.value}</div>
      </div>
    `).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.project;
      openModal(id);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. RESUME VIEWER MODAL
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('resume-modal-close');
  const openButtons = document.querySelectorAll('.open-resume-btn');
  const tabButtons = document.querySelectorAll('.resume-tab-btn');
  const viewOverview = document.getElementById('resume-view-overview');
  const viewPdf = document.getElementById('resume-view-pdf');

  if (!modal) return;

  function openResume() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeResume);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeResume();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeResume();
    }
  });

  // Tab switching (Overview vs PDF)
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.dataset.tab;
      if (mode === 'pdf') {
        if (viewOverview) viewOverview.style.display = 'none';
        if (viewPdf) viewPdf.style.display = 'block';
      } else {
        if (viewOverview) viewOverview.style.display = 'block';
        if (viewPdf) viewPdf.style.display = 'none';
      }
    });
  });
}

/* ==========================================================================
   7. 1-CLICK COPY BUTTONS
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-trigger');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.dataset.copyText;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const feedbackEl = btn.querySelector('.copy-feedback') || btn;
        const originalHtml = feedbackEl.innerHTML;

        feedbackEl.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color: #10b981; font-weight: 700;">Copied!</span>
        `;

        setTimeout(() => {
          feedbackEl.innerHTML = originalHtml;
        }, 2200);
      }).catch(err => {
        console.error('Copy failed: ', err);
      });
    });
  });
}

/* ==========================================================================
   8. INTERACTIVE CONTACT FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-form-success');
  const mailtoLauncher = document.getElementById('form-mailto-launcher');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      showError('contact-name-error', 'Please enter your name (at least 2 characters).');
      isValid = false;
    } else {
      hideError('contact-name-error');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showError('contact-email-error', 'Please provide a valid email address.');
      isValid = false;
    } else {
      hideError('contact-email-error');
    }

    // Validate Subject
    if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
      showError('contact-subject-error', 'Please provide a subject (at least 3 characters).');
      isValid = false;
    } else {
      hideError('contact-subject-error');
    }

    // Validate Message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showError('contact-message-error', 'Please write a message with at least 10 characters.');
      isValid = false;
    } else {
      hideError('contact-message-error');
    }

    if (!isValid) return;

    // Build Mailto link
    const mailtoUrl = `mailto:naazmeensyed313@gmail.com?subject=${encodeURIComponent(
      subjectInput.value.trim()
    )}&body=${encodeURIComponent(
      `Hi Naazmeen,\n\n${messageInput.value.trim()}\n\nFrom: ${nameInput.value.trim()} (${emailInput.value.trim()})`
    )}`;

    if (mailtoLauncher) {
      mailtoLauncher.setAttribute('href', mailtoUrl);
    }

    // Display confirmation
    form.style.display = 'none';
    if (successBox) {
      successBox.style.display = 'block';
    }
  });

  function showError(elementId, msg) {
    const el = document.getElementById(elementId);
    if (el) {
      el.textContent = msg;
      el.style.display = 'block';
    }
  }

  function hideError(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
      el.style.display = 'none';
    }
  }
}

/* ==========================================================================
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

