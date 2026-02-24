const heroVideo = "https://cdn.coverr.co/videos/coverr-african-women-dancing-1579/1080p.mp4";

async function includePartial(targetSelector, filePath) {
  const targets = document.querySelectorAll(targetSelector);
  if (!targets.length) return;

  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}`);
    const html = await response.text();
    targets.forEach((el) => {
      el.innerHTML = html;
    });
  } catch (error) {
    console.error(error);
  }
}

async function initLayout() {
  await includePartial('[data-include="header"]', 'header.html');
  await includePartial('[data-include="footer"]', 'footer.html');

  const heroVideoEls = document.querySelectorAll('video[data-hero-video]');
  heroVideoEls.forEach((v) => {
    v.src = heroVideo;
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.hamburger')) {
      const nav = document.querySelector('.nav-menu');
      if (nav) nav.classList.toggle('open');
    }
  });
}

initLayout();
