(function () {
  const html      = document.documentElement;
  const toggle    = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const nav       = document.querySelector('nav');
  const themeBtn  = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  let lang = 'en';

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('theme') || 'light';
  } catch (e) {
    console.warn('localStorage unavailable, defaulting to light theme:', e);
  }
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      console.warn('Could not persist theme:', e);
    }
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark'
      ? 'fa-solid fa-sun'
      : 'fa-solid fa-moon';
  }

  function applyLang(l) {
    lang = l;
    html.setAttribute('lang', l === 'en' ? 'en' : 'pt-BR');
    langLabel.textContent = l === 'en' ? 'PT' : 'EN';
    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + l);
      if (val !== null) {
        if (['P', 'H1', 'H2', 'H3', 'SPAN', 'EM', 'A'].includes(el.tagName)) {
          el.innerHTML = val;
        }
      }
    });
  }

  toggle.addEventListener('click', () => {
    applyLang(lang === 'en' ? 'pt' : 'en');
  });

  const menuBtn = document.createElement('button');
  menuBtn.className = 'menu-btn';
  menuBtn.setAttribute('aria-label', 'Toggle menu');
  menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  nav.parentElement.insertBefore(menuBtn, nav);

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    menuBtn.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  
  try {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-bar a[href^="#"]');
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(a => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + entry.target.id) {
              a.style.color = 'var(--accent)';
            }
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => navObserver.observe(s));
  } catch (e) {
    console.warn('IntersectionObserver not available, skipping scroll-spy:', e);
  }
})();