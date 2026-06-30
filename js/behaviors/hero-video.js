/**
 * Autoplay, reduced motion e save-data para o vídeo do hero.
 * @param {ParentNode} root
 */
let motionListenerBound = false;

export function initHeroVideos(root = document) {
  const videos = root.querySelectorAll('.media-frame__video--hero:not([data-hero-video-init])');
  if (!videos.length) return;

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const applyPlaybackPolicy = (video) => {
    const saveData = navigator.connection?.saveData === true;
    if (motionQuery.matches || saveData) {
      video.autoplay = false;
      video.pause();
      video.removeAttribute('autoplay');
      return;
    }

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.catch === 'function') {
      playAttempt.catch(() => {});
    }
  };

  videos.forEach((video) => {
    if (!(video instanceof HTMLVideoElement)) return;
    video.dataset.heroVideoInit = 'true';
    applyPlaybackPolicy(video);
  });

  const onMotionChange = () => {
    document.querySelectorAll('.media-frame__video--hero').forEach((video) => {
      if (video instanceof HTMLVideoElement) applyPlaybackPolicy(video);
    });
  };

  if (motionListenerBound) return;
  motionListenerBound = true;

  if (typeof motionQuery.addEventListener === 'function') {
    motionQuery.addEventListener('change', onMotionChange);
  } else if (typeof motionQuery.addListener === 'function') {
    motionQuery.addListener(onMotionChange);
  }
}
