// Interacciones mínimas de la demo.

// Scroll suave para los anclajes de navegación.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Aparición de tarjetas y figuras al entrar en pantalla.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.card, .gallery figure, .tips li').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`;
  observer.observe(el);
});

// Newsletter (demo: no envía nada a ningún sitio).
const form = document.getElementById('newsletter-form');
const msg = document.getElementById('newsletter-msg');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  form.reset();
  msg.hidden = false;
});
