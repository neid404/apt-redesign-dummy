(function(){
  var KEY = 'arved-theme';
  function apply(t){
    if(t === 'nacht') document.documentElement.setAttribute('data-theme','nacht');
    else document.documentElement.removeAttribute('data-theme');
  }
  var saved = localStorage.getItem(KEY) || 'nacht';
  if(saved === 'salbei') saved = 'nacht';
  apply(saved);
  function build(){
    if(document.querySelector('.tw')) return;
    var w = document.createElement('div');
    w.className = 'tw';
    w.innerHTML =
      '<span class="lab">Farbwelt</span>' +
      '<button class="w-perg" type="button" title="Pergament" data-t="pergament" aria-label="Farbwelt Pergament"></button>' +
      '<button class="w-nacht" type="button" title="Nacht" data-t="nacht" aria-label="Farbwelt Nacht"></button>';
    document.body.appendChild(w);
    var btns = w.querySelectorAll('button');
    function sync(){
      var cur = localStorage.getItem(KEY) || 'nacht';
      if(cur === 'salbei') cur = 'nacht';
      btns.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-t') === cur); });
    }
    btns.forEach(function(b){
      b.addEventListener('click', function(){
        var t = b.getAttribute('data-t');
        localStorage.setItem(KEY, t);
        apply(t);
        sync();
      });
    });
    sync();
  }
  function buildNav(){
    var navIn = document.querySelector('.nav-in');
    if(!navIn || navIn.querySelector('.nav-burger')) return;
    var navL = navIn.querySelector('.nav-l');
    var bookBtn = navIn.querySelector('.btn-ink');

    var burger = document.createElement('button');
    burger.className = 'nav-burger';
    burger.type = 'button';
    burger.setAttribute('aria-label','Menü öffnen');
    burger.setAttribute('aria-expanded','false');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navIn.appendChild(burger);

    var links = '';
    if(navL){
      navL.querySelectorAll('a').forEach(function(a){
        var on = a.classList.contains('on') ? ' on' : '';
        links += '<a class="ml' + on + '" href="' + a.getAttribute('href') + '">' +
          a.textContent.trim() + '<span class="ar" aria-hidden="true">→</span></a>';
      });
    }
    var bookHref = bookBtn ? bookBtn.getAttribute('href') : '#';
    var bookTxt = bookBtn ? bookBtn.textContent.trim() : 'Buchen';

    var menu = document.createElement('div');
    menu.className = 'm-menu';
    menu.innerHTML =
      '<div class="ov"></div>' +
      '<div class="panel">' + links +
        '<a class="btn-ink m-book" href="' + bookHref + '" target="_blank" rel="noopener">' + bookTxt +
          ' <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>' +
        '<div class="m-foot"><a href="tel:+4945179073550">+49 451 790 735 50</a><span>Arved Apartments · Lübeck</span></div>' +
      '</div>';
    document.body.appendChild(menu);

    var root = document.documentElement;
    var navBar = document.querySelector('.nav');
    var panel = menu.querySelector('.panel');
    function close(){ root.classList.remove('m-open'); burger.setAttribute('aria-expanded','false'); }
    function open(){
      // clear whatever header height is currently on screen (util bar wraps on mobile,
      // and the util bar scrolls away while the nav stays sticky)
      if(navBar && panel){
        var b = navBar.getBoundingClientRect().bottom;
        panel.style.paddingTop = Math.max(b + 18, 76) + 'px';
      }
      root.classList.add('m-open'); burger.setAttribute('aria-expanded','true');
    }
    burger.addEventListener('click', function(){ root.classList.contains('m-open') ? close() : open(); });
    menu.querySelector('.ov').addEventListener('click', close);
    menu.querySelectorAll('.ml, .m-book').forEach(function(a){ a.addEventListener('click', close); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape' || e.keyCode === 27) close(); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 820) close(); });
  }

  function init(){ build(); buildNav(); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
