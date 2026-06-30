// 인간은 어떻게 시간의 노예가 되었는가 — site interactions
document.addEventListener('DOMContentLoaded', function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('section.chapter, section.conclusion'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('nav.toc a'));

  // Highlight current chapter in the table of contents while scrolling
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        var link = navLinks.filter(function (a) {
          return a.getAttribute('href') === '#' + id;
        })[0];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // Gentle fade-up reveal for stat boxes and cards as they enter view
  var revealTargets = document.querySelectorAll('.stat, .factbox, .debate, .subchapter, .quote');
  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }
});
