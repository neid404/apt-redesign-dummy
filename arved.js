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
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
