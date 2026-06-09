(function(){
  function build(){
    var navin = document.querySelector('.nav .nav-in');
    if(!navin || navin.querySelector('.nav-burger')) return;
    var links = navin.querySelector('.nav-l');
    var burger = document.createElement('button');
    burger.className = 'nav-burger'; burger.type = 'button';
    burger.setAttribute('aria-label','Menü öffnen');
    burger.innerHTML = '<span></span><span></span><span></span>';
    navin.appendChild(burger);

    var drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    var darkWorld = document.documentElement.hasAttribute('data-theme');
    var wmSrc = darkWorld ? 'assets/arved/logo-wordmark-cream.svg' : 'assets/arved/logo-wordmark-dark.svg';
    var html = '<div class="top"><a class="mark" href="index.html"><img src="' + wmSrc + '" alt="ARVED Apartments · Lübeck"></a>'
             + '<button class="x" type="button" aria-label="Menü schließen">&times;</button></div>';
    if(links){
      links.querySelectorAll('a').forEach(function(a){
        html += '<a class="m" href="' + a.getAttribute('href') + '">' + a.textContent + '</a>';
      });
    }
    html += '<a class="m" href="https://booking2.softtec.software/arvedapartments" target="_blank" rel="noopener">Buchen</a>';
    html += '<div class="ct">Königstraße 1–3, 23552 Lübeck<br>'
          + '<a href="tel:+4945179073550">+49 (0) 451 7907 3550</a><br>'
          + '<a href="mailto:hello@arved-apartments.de">hello@arved-apartments.de</a></div>';
    drawer.innerHTML = html;
    document.body.appendChild(drawer);

    function open(){ document.body.classList.add('menu-open'); }
    function close(){ document.body.classList.remove('menu-open'); }
    burger.addEventListener('click', open);
    drawer.querySelector('.x').addEventListener('click', close);
    drawer.querySelectorAll('a.m').forEach(function(a){ a.addEventListener('click', close); });
    window.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();

/* Mobile: booking bar collapses to a single CTA that expands on tap */
(function(){
  function init(){
    var book = document.querySelector('.hero .book');
    if(!book) return;
    var go = book.querySelector('.bk-go');
    if(!go) return;
    var mq = window.matchMedia('(max-width:720px)');
    function sync(){
      if(mq.matches){ book.classList.add('collapsible'); }
      else { book.classList.remove('collapsible','open'); }
    }
    sync();
    if(mq.addEventListener) mq.addEventListener('change', sync); else mq.addListener(sync);
    go.addEventListener('click', function(e){
      if(mq.matches && book.classList.contains('collapsible') && !book.classList.contains('open')){
        e.preventDefault();
        book.classList.add('open');
      }
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
