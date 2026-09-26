/* Videos de gameplay: si la persona pidió reducir el movimiento en su sistema,
   no se reproducen solos; quedan en el póster con controles para darles play. */
(function () {
  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var videos = document.querySelectorAll('video[autoplay]');
  for (var i = 0; i < videos.length; i++) {
    videos[i].removeAttribute('autoplay');
    videos[i].pause();
    videos[i].setAttribute('controls', '');
  }
})();
