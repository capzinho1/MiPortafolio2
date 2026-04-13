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

/* Contact form handler */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('#contact-name').value.trim();
    const email = contactForm.querySelector('#contact-email').value.trim();
    const message = contactForm.querySelector('#contact-message').value.trim();
    
    // Validación básica
    if (!name || !email || !message) {
      alert('Por favor completa todos los campos');
      return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un correo electrónico válido');
      return;
    }
    
    // Construir mailto (alternativa simple sin backend)
    const subject = encodeURIComponent('Nuevo mensaje desde tu portafolio');
    const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
    const mailtoLink = `mailto:amunozpincheira@gmail.com?subject=${subject}&body=${body}`;
    
    // Mostrar feedback visual
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.textContent = '✓ Mensaje listo para enviar...';
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.opacity = '0.7';
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    // Resetear formulario
    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.pointerEvents = 'auto';
      submitBtn.style.opacity = '1';
    }, 1000);
  });
}

/* ─── SCROLL INDICATOR DOTS ─────────────────────── */
const scrollDots = document.querySelectorAll('.scroll-dot');
const sections = [
  { id: 'hero', dot: document.querySelector('[data-section="hero"]') },
  { id: 'heading-web', dot: document.querySelector('[data-section="web"]') },
  { id: 'heading-software', dot: document.querySelector('[data-section="software"]') },
  { id: 'heading-contact', dot: document.querySelector('[data-section="contact"]') }
];

// Actualizar dot activo según posición del scroll
const updateActiveDot = () => {
  let currentSection = 'hero';
  let minDistance = Infinity;

  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const distance = Math.abs(rect.top - window.innerHeight / 2);
      
      if (distance < minDistance) {
        minDistance = distance;
        currentSection = section.id;
      }
    }
  });

  // Remover clase activa de todos
  scrollDots.forEach(dot => dot.classList.remove('active'));
  
  // Agregar clase activa al dot correspondiente
  const activeDot = document.querySelector(`[data-section="${
    currentSection === 'hero' ? 'hero' :
    currentSection === 'heading-web' ? 'web' :
    currentSection === 'heading-software' ? 'software' :
    'contact'
  }"]`);
  
  if (activeDot) activeDot.classList.add('active');
};

// Actualizar al hacer scroll
window.addEventListener('scroll', updateActiveDot, { passive: true });

// Actualizar al cargar
updateActiveDot();

// Navegación con dots
scrollDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionMap = {
      'hero': 'hero',
      'web': 'heading-web',
      'software': 'heading-software',
      'contact': 'heading-contact'
    };
    
    const targetSection = sectionMap[dot.dataset.section];
    const element = document.getElementById(targetSection);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
