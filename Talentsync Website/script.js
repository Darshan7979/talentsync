document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const overlay   = document.getElementById('navOverlay');

  if (hamburger && navMenu && overlay) {
    function closeMenu() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      overlay.classList.remove('open');
    }

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', closeMenu);
  }

  document.querySelectorAll('.dropdown .dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        toggle.closest('.dropdown').classList.toggle('open');
      }
    });
  });

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObserver.observe(el); });

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(function () {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current.toLocaleString();
        }, 16);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(function (el) { statsObserver.observe(el); });
});