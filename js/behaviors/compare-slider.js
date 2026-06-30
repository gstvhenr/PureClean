/**
 * Sincroniza posição do comparador antes/depois com input range e handle visual.
 */
export function initCompareSliders() {
  const sliders = document.querySelectorAll('.compare-slider');
  if (!sliders.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    sliders.forEach((root) => root.classList.add('compare-slider--stacked'));
  }

  sliders.forEach((root) => {
    const input = root.querySelector('.compare-slider__input');
    if (!input) return;

    const update = () => {
      const pct = Number(input.value);
      root.style.setProperty('--compare-pct', String(pct));
      input.setAttribute('aria-valuenow', String(pct));
      if (pct <= 5) {
        input.setAttribute('aria-valuetext', 'Quase totalmente antes da limpeza');
      } else if (pct >= 95) {
        input.setAttribute('aria-valuetext', 'Quase totalmente depois da limpeza');
      } else {
        input.setAttribute('aria-valuetext', `${pct}% depois visível`);
      }
    };

    input.addEventListener('input', update);
    update();
  });
}
