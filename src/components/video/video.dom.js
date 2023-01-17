import domready from '../../js/domready';

async function video() {
  const videos = [...document.querySelectorAll('.ons-js-video')];

  if (videos.length) {
    const Video = (await import('./video')).default;

    videos.forEach(component => new Video(component));
  }
}

domready(video);
