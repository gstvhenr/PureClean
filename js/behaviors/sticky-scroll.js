const SCROLL_THRESHOLD = 300;

/**
 * Mostra o CTA sticky «Orçamento rápido» após scroll; oculta o FAB WhatsApp nesse intervalo.
 */
export function initStickyQuoteScroll() {
  const sticky = document.querySelector('pc-sticky-quote');
  const fabLink = document.querySelector('.whatsapp-fab');
  if (!sticky) return;

  const setStickyLinkFocus = (visible) => {
    const link = sticky.querySelector('a.sticky-quote__btn');
    if (!link) return;
    if (visible) {
      link.removeAttribute('tabindex');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  };

  const onScroll = () => {
    const show = window.scrollY >= SCROLL_THRESHOLD;
    sticky.classList.toggle('sticky-quote--visible', show);
    sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
    if (show) {
      sticky.removeAttribute('inert');
    } else {
      sticky.setAttribute('inert', '');
    }
    setStickyLinkFocus(show);

    if (fabLink) {
      fabLink.classList.toggle('whatsapp-fab--scroll-hidden', show);
      fabLink.setAttribute('aria-hidden', show ? 'true' : 'false');
      if (show) {
        fabLink.setAttribute('inert', '');
        fabLink.setAttribute('tabindex', '-1');
      } else {
        fabLink.removeAttribute('inert');
        fabLink.removeAttribute('tabindex');
      }
    }
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
