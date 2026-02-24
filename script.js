const heroVideo = "https://cdn.coverr.co/videos/coverr-african-women-dancing-1579/1080p.mp4";

async function includePartial(targetSelector, filePath) {
  const targets = document.querySelectorAll(targetSelector);
  if (!targets.length) return;

  const response = await fetch(filePath);
  if (!response.ok) throw new Error(`Failed to load ${filePath}`);
  const html = await response.text();
  targets.forEach((el) => {
    el.innerHTML = html;
  });
}

function setupHeroVideo() {
  const heroVideoEls = document.querySelectorAll('video[data-hero-video]');
  heroVideoEls.forEach((v) => {
    v.src = heroVideo;
  });
}

function setupActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page) link.classList.add('active-link');
  });
}

function setupMenuBehavior() {
  const nav = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  const dropdown = document.querySelector('[data-dropdown]');
  const dropdownToggle = document.querySelector('.dropdown-toggle');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(expanded));
    });
  }

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', () => {
      dropdown.classList.toggle('open');
      const expanded = dropdown.classList.contains('open');
      dropdownToggle.setAttribute('aria-expanded', String(expanded));
    });
  }
}

async function initLayout() {
  try {
    await includePartial('[data-include="header"]', 'header.html');
    await includePartial('[data-include="footer"]', 'footer.html');
    setupHeroVideo();
    setupActiveNav();
    setupMenuBehavior();
  } catch (error) {
    console.error(error);
  }
}

initLayout();
