/* Applies saved Tweaks (theme/surface/accent/font/glow) before paint, on every
   page, so the look chosen on the home page carries onto project detail pages.
   Runs synchronously in <head>. */
(function(){
  var FONT_MAP={Bricolage:'"Bricolage Grotesque"',Unbounded:'"Unbounded"',Grotesk:'"Space Grotesk"'};
  var t={};
  try{ t=JSON.parse(localStorage.getItem('yw-tweaks')||'{}'); }catch(e){}
  var html=document.documentElement;
  var themeVal=(t.theme==='Light')?'light':'dark';
  html.setAttribute('data-theme',themeVal);
  html.setAttribute('data-surface',(t.surface==='Glass')?'glass':'solid');
  if(t.accent) html.style.setProperty('--accent',t.accent);
  if(t.displayFont) html.style.setProperty('--display',FONT_MAP[t.displayFont]||FONT_MAP.Bricolage);
  if(typeof t.glow==='number') html.style.setProperty('--glow',(t.glow/100).toFixed(2));
  // body attrs once it exists
  document.addEventListener('DOMContentLoaded',function(){
    document.body.setAttribute('data-theme',themeVal);
    document.body.setAttribute('data-surface',(t.surface==='Glass')?'glass':'solid');
    if(t.animations===false) document.body.setAttribute('data-motion','off');
    if(t.grid===false) document.body.setAttribute('data-grid','off');
    document.body.setAttribute('data-work',(t.work==='Grid')?'grid':'stack');
  });
})();
