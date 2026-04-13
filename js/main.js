/* Estrellas del hero */
const starsContainer = document.getElementById('starsContainer');
for (let i = 0; i < 220; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  const size = Math.random() * 2 + 0.5;
  s.style.cssText = `
    width:${size}px; height:${size}px;
    top:${Math.random() * 75}%; left:${Math.random() * 100}%;
    --tw-dur:${(Math.random() * 4 + 2).toFixed(1)}s;
    --tw-del:${(Math.random() * 5).toFixed(1)}s;
    --tw-min:${(Math.random() * 0.3 + 0.1).toFixed(2)};
  `;
  starsContainer.appendChild(s);
}

/* Luciérnagas */
const ffContainer = document.getElementById('firefliesContainer');
for (let i = 0; i < 30; i++) {
  const f = document.createElement('div');
  f.className = 'firefly';
  const dx = (Math.random() - 0.5) * 40;
  const dy = -(Math.random() * 30 + 10);
  f.style.cssText = `
    bottom:${Math.random() * 28 + 1}%; left:${Math.random() * 100}%;
    --ff-dur:${(Math.random() * 4 + 3).toFixed(1)}s;
    --ff-del:${(Math.random() * 6).toFixed(1)}s;
    --ff-dx:${dx.toFixed(0)}px; --ff-dy:${dy.toFixed(0)}px;
    --ff-ex:${(dx * 0.3).toFixed(0)}px; --ff-ey:${(Math.random() * 10).toFixed(0)}px;
  `;
  ffContainer.appendChild(f);
}

/* Brillo en tarjetas al mover el cursor */
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

/* Scroll reveal */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
