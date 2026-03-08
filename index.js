// --- GESTION DU MENU ---
const menuBtn = document.getElementById('menu-btn');
const fullMenu = document.getElementById('full-menu');
const menuLinks = document.querySelectorAll('.menu-link');

const toggleMenu = () => {
  const isActive = fullMenu.classList.toggle('active');
  menuBtn.classList.toggle('active');
  // On affiche le menu avec un léger délai pour l'opacité CSS
  fullMenu.style.display = isActive ? 'flex' : 'none';
  if (isActive) setTimeout(() => fullMenu.style.opacity = '1', 10);
  else fullMenu.style.opacity = '0';
};

menuBtn.addEventListener('click', toggleMenu);

// Fermeture du menu au clic sur un lien
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (fullMenu.classList.contains('active')) toggleMenu();
  });
});

// --- LOADER & REVEAL ---
window.addEventListener('load', () => {
  const l = document.getElementById('loader');
  const m = document.getElementById('main-content');
  setTimeout(() => {
    l.style.opacity = '0';
    setTimeout(() => {
      l.style.display = 'none';
      m.style.visibility = 'visible';
    }, 800);
  }, 2300);
});

// --- PROTECTION CLIC DROIT GALERIE ---
document.querySelectorAll('.gallery-img-container').forEach(el => {
  el.addEventListener('contextmenu', e => e.preventDefault());
});

// --- LIGHTBOX ---
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-caption');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    lbImg.src = item.dataset.img;
    lbCap.innerText = item.dataset.title;
    lb.style.display = 'flex';
    setTimeout(() => lb.classList.add('active'), 10);
  });
});

const closeLb = () => {
  lb.classList.remove('active');
  setTimeout(() => lb.style.display = 'none', 500);
};
document.getElementById('close-lightbox').addEventListener('click', closeLb);
document.addEventListener('keydown', e => { if (e.key === "Escape") closeLb(); });

// --- OBSERVER ---
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.2 });
document.querySelectorAll('section').forEach(s => obs.observe(s));

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('section');
  
  const options = {
    threshold: 0.15 // Déclenche dès que le haut de la section apparaît
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const reveals = entry.target.querySelectorAll('.reveal');
      
      if (entry.isIntersecting) {
        // Apparition en cascade
        reveals.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('is-visible');
          }, index * 200); 
        });
      } else {
        // Disparition immédiate dès qu'on change de section
        reveals.forEach(el => {
          el.classList.remove('is-visible');
        });
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
});
