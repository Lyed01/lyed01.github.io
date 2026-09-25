/* Idioma del sitio (es / en).
   Se carga en el <head> sin defer: fija el idioma antes de pintar, así no hay parpadeo.
   Cada texto está escrito dos veces en el HTML (lang="es" y lang="en") y el CSS oculta el que no va.
   El <title> en inglés sale de <meta name="title-en">. */
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = saved === 'es' || saved === 'en'
    ? saved
    : ((navigator.language || 'es').slice(0, 2).toLowerCase() === 'es' ? 'es' : 'en');

  var titleEs = null;

  function apply(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l);
    var metaEn = document.querySelector('meta[name="title-en"]');
    if (metaEn) {
      if (titleEs === null) titleEs = document.title;
      document.title = l === 'en' ? metaEn.content : titleEs;
    }
    var btns = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', l === 'en' ? 'true' : 'false');
  }

  apply(lang);

  document.addEventListener('DOMContentLoaded', function () {
    apply(lang);
    var btns = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        lang = lang === 'es' ? 'en' : 'es';
        try { localStorage.setItem('lang', lang); } catch (e) {}
        apply(lang);
      });
    }
  });
})();
