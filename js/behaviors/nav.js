export function initMobileNav() {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      menu.classList.remove('hidden');
      menu.removeAttribute('hidden');
    } else {
      menu.classList.add('hidden');
      menu.setAttribute('hidden', '');
    }
  };

  btn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden') || menu.hasAttribute('hidden');
    setOpen(isHidden);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}

export function initNavbarScroll() {
  const header = document.getElementById('navbar');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('site-header--solid');
      header.classList.remove('site-header--at-top');
    } else {
      header.classList.remove('site-header--solid');
      header.classList.add('site-header--at-top');
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
