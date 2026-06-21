(function () {
  const html      = document.documentElement;
  const toggle    = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const nav       = document.querySelector('nav');

  let lang = 'en';


  function applyLang(l) {
    lang = l;
    html.setAttribute('lang', l === 'en' ? 'en' : 'pt-BR');
    langLabel.textContent = l === 'en' ? 'PT' : 'EN';

    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.getAttribute('data-' + l);
      if (val !== null) {
       
        if (el.tagName === 'P' && el.innerHTML.includes('<strong>')) {
          el.innerHTML = val;
        } else if (el.tagName === 'P' || el.tagName === 'H1' ||
                   el.tagName === 'H2' || el.tagName === 'H3' ||
                   el.tagName === 'SPAN' || el.tagName === 'EM' ||
                   el.tagName === 'A') {
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

  const fills = document.querySelectorAll('.bar-fill');
  fills.forEach(f => { f.style.width = '0'; });

  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.style.width = target.style.getPropertyValue('--w') || target.dataset.w;
        skillObserver.unobserve(target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => skillObserver.observe(f));

  const sections = document.querySelectorAll('section[id], div[id]');
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
})();
