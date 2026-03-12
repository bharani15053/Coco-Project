/* ============================================
   CodingHub Campus — Interactive Features
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============ DARK MODE TOGGLE ============
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Restore saved theme
  const savedTheme = localStorage.getItem('ch-theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  if (themeToggle) themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('ch-theme', next);
      themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
      // Add a subtle rotate animation
      themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => themeToggle.style.transform = '', 400);
    });
  }

  // ============ NAVBAR SCROLL EFFECT ============
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ============ HAMBURGER MENU ============
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = hamburgerBtn.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const spans = hamburgerBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ============ LOGIN MODAL ============
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.getElementById('modalClose');
  const loginForm = document.getElementById('loginForm');

  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
      loginModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (modalClose && loginModal) {
    modalClose.addEventListener('click', () => {
      loginModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginModal.classList.remove('active');
      document.body.style.overflow = '';
      showToast('Welcome Back!', 'You have successfully signed in to CodingHub Campus.');
    });
  }

  // ============ TOAST / POPUP ============
  function showToast(title, message, duration = 4000) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // ============ EVENT REGISTRATION ============
  document.querySelectorAll('.register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const eventName = btn.getAttribute('data-event') || 'Event';
      showToast('Registration Confirmed! 🎉', `You have successfully registered for "${eventName}". Check your email for details.`);
      btn.textContent = 'Registered ✓';
      btn.disabled = true;
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-ghost');
      btn.style.pointerEvents = 'none';
    });
  });

  // ============ BOOKMARK TOGGLE ============
  document.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('bookmarked');
      if (btn.classList.contains('bookmarked')) {
        btn.textContent = '★';
        showToast('Bookmarked! 🔖', 'Problem saved to your bookmarks.');
      } else {
        btn.textContent = '☆';
        showToast('Removed', 'Problem removed from your bookmarks.');
      }
    });
  });

  // ============ PROBLEM CATEGORY FILTER ============
  const filterBtns = document.querySelectorAll('.filter-btn');
  const problemsGrid = document.getElementById('problemsGrid');

  if (filterBtns.length && problemsGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const cards = problemsGrid.querySelectorAll('.problem-card');

        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
            card.style.animation = 'fadeInUp 0.4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ============ SEARCH FILTERING ============
  // Hero search and Problem search
  const heroSearchInput = document.getElementById('heroSearchInput');
  const problemSearchInput = document.getElementById('problemSearchInput');
  const navSearchInput = document.getElementById('navSearchInput');

  function filterProblems(query) {
    if (!problemsGrid) return;
    const cards = problemsGrid.querySelectorAll('.problem-card');
    const q = query.toLowerCase().trim();

    cards.forEach(card => {
      const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.problem-tag')).map(t => t.textContent.toLowerCase()).join(' ');
      const match = !q || title.includes(q) || tags.includes(q);
      card.style.display = match ? '' : 'none';
      if (match && q) card.style.animation = 'fadeInUp 0.3s ease';
    });
  }

  if (heroSearchInput) {
    heroSearchInput.addEventListener('input', (e) => filterProblems(e.target.value));
  }

  if (problemSearchInput) {
    problemSearchInput.addEventListener('input', (e) => filterProblems(e.target.value));
  }

  // Nav search — redirect to problems page with query (or filter on same page)
  if (navSearchInput) {
    navSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = navSearchInput.value.trim();
        if (q) {
          // If on index, scroll to practice section; if on problems page, filter
          if (problemsGrid) {
            filterProblems(q);
          } else {
            window.location.href = `problems.html?q=${encodeURIComponent(q)}`;
          }
        }
      }
    });
  }

  // Handle query param on problems page
  if (problemSearchInput) {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
      problemSearchInput.value = q;
      filterProblems(q);
    }
  }

  // ============ SMOOTH SCROLLING ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ============ LEADERBOARD HIGHLIGHT ANIMATION ============
  function animateLeaderboard() {
    const rows = document.querySelectorAll('.leaderboard-table tbody tr');
    rows.forEach((row, i) => {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-20px)';
      row.style.transition = `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.08}s`;
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const rows = entry.target.querySelectorAll('tbody tr');
          rows.forEach(row => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const table = document.querySelector('.leaderboard-table-wrap');
    if (table) observer.observe(table);
  }

  animateLeaderboard();

  // ============ SCROLL-REVEAL ANIMATIONS ============
  function setupScrollReveal() {
    const revealElements = document.querySelectorAll(
      '.path-card, .event-card, .project-card, .post-card, .dash-card, .mini-stat-card, .achievement'
    );

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger the reveal by finding the element's index among its siblings
          const parent = entry.target.parentElement;
          const siblings = Array.from(parent.children);
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  }

  setupScrollReveal();

  // ============ ANIMATED COUNTERS (Hero Stats) ============
  function animateCounters() {
    const statValues = document.querySelectorAll('.hero-stats .stat-value');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          const numMatch = text.match(/[\d,]+/);
          if (!numMatch) return;
          const target = parseInt(numMatch[0].replace(/,/g, ''));
          const suffix = text.replace(numMatch[0], '');
          const duration = 1500;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(target * ease);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => observer.observe(el));
  }

  animateCounters();

  // ============ PROGRESS BAR ANIMATION (Dashboard) ============
  function animateProgressBars() {
    const fills = document.querySelectorAll('.progress-fill');
    fills.forEach(fill => {
      const target = fill.style.width;
      fill.style.width = '0%';
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => { fill.style.width = target; }, 300);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(fill);
    });
  }

  animateProgressBars();

  // ============ KEYBOARD SHORTCUT ============
  // Press '/' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const search = document.getElementById('heroSearchInput') || document.getElementById('problemSearchInput') || document.getElementById('navSearchInput');
      if (search) search.focus();
    }
    // Escape closes modal
    if (e.key === 'Escape') {
      if (loginModal && loginModal.classList.contains('active')) {
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

});
