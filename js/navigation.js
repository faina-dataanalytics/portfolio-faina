document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Перемикання мобільного меню
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Закриття меню при кліку на посилання & Плавна прокрутка (Smooth Scroll)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }

      // Закриваємо мобільне меню після кліку
      if (navMenu && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // Закриття меню при кліку за його межами
  document.addEventListener('click', (event) => {
    const isClickInside = navMenu.contains(event.target) || navToggle.contains(event.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });
});
