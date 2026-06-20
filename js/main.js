// ============ HEADER SCROLL STATE ============
const header = document.querySelector('.site-header');
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) header?.classList.add('scrolled');
  else header?.classList.remove('scrolled');

  if (backTop) {
    if (window.scrollY > 700) backTop.classList.add('show');
    else backTop.classList.remove('show');
  }
}, { passive: true });

backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============ MOBILE NAV ============
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
  document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ============ WING SVG ANIMATION (hero) ============
const wingSvg = document.querySelector('.wing-svg');
if (wingSvg) {
  requestAnimationFrame(() => {
    setTimeout(() => wingSvg.classList.add('animate'), 200);
  });
}

// ============ COUNT-UP STATS ============
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString('en-IN');
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString('en-IN'));
  }
  requestAnimationFrame(tick);
}

const countEls = document.querySelectorAll('[data-count]');
const countIo = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countIo.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
countEls.forEach(el => countIo.observe(el));

// ============ FAQ ACCORDION ============
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  q?.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ============ INTERNSHIP FILTERS ============
const filterChips = document.querySelectorAll('.filter-chip');
const internCards = document.querySelectorAll('.intern-card');
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    internCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.add('show');
      } else {
        card.classList.remove('show');
      }
    });
  });
});

// ============ DONATE TIER SELECT ============
const tierCards = document.querySelectorAll('.tier-card');
const customAmtInput = document.querySelector('#customAmount');
tierCards.forEach(card => {
  card.addEventListener('click', () => {
    tierCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    if (customAmtInput) customAmtInput.value = card.dataset.amount;
  });
});

// ============ IMPACT CALCULATOR (donate page) ============
const calcSlider = document.querySelector('#calcSlider');
const calcAmt = document.querySelector('#calcAmt');
const calcResult = document.querySelector('#calcResult');
function updateCalc() {
  if (!calcSlider) return;
  const val = parseInt(calcSlider.value);
  calcAmt.textContent = '₹' + val.toLocaleString('en-IN');
  const meals = Math.floor(val / 40);
  const kits = Math.floor(val / 120);
  let msg = '';
  if (val < 200) {
    msg = `That's roughly <strong>${meals} meals</strong> for a child in need.`;
  } else {
    msg = `That's roughly <strong>${meals} meals</strong> or <strong>${kits} sanitary hygiene kits</strong> for someone who needs them.`;
  }
  calcResult.innerHTML = msg;
}
calcSlider?.addEventListener('input', updateCalc);
if (calcSlider) updateCalc();

// ============ CONTACT / APPLICATION FORM ============
const appForm = document.querySelector('.app-form');
appForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formEl = e.target;
  const successEl = document.querySelector('.form-success');
  formEl.style.display = 'none';
  successEl?.classList.add('show');
});

// ============ ACTIVE NAV LINK ============
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});
