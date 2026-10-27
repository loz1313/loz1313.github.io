const btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
const setMenu=o=>{btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');nav.classList.toggle('open',o)};
btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
document.getElementById('yr').textContent=new Date().getFullYear();
const els=document.querySelectorAll('.reveal');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Count-up for the numbers band: final values are already in the HTML (no-JS / reduced motion show them as-is).
const countUp=el=>{const to=+el.dataset.to,t0=performance.now(),dur=1600;
 const step=t=>{const k=Math.min((t-t0)/dur,1),e=1-Math.pow(1-k,3);el.textContent=Math.round(to*e);if(k<1)requestAnimationFrame(step)};
 el.textContent='0';requestAnimationFrame(step)};
if('IntersectionObserver' in window&&!reduce){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('.count').forEach(countUp);io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -40px 0px'});
 els.forEach(el=>io.observe(el));
}else els.forEach(el=>el.classList.add('in'));
const f=document.getElementById('contact-form'),s=document.getElementById('form-status'),sb=f.querySelector('button[type=submit]');
// Web3Forms: JSON POST to the form's action URL.
f.addEventListener('submit',async e=>{e.preventDefault();
 if(!f.checkValidity()){s.textContent='Please fill in your name, a valid email and a message.';f.querySelector(':invalid').focus();return}
 sb.disabled=true;s.textContent='Sending…';
 try{const r=await fetch(f.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
  const j=await r.json().catch(()=>({}));
  if(!r.ok||j.success===false)throw new Error(r.status);
  s.textContent='Thank you, your message has been sent. I’ll be in touch soon.';f.reset();
 }catch(err){s.textContent='Sorry, something went wrong and your message wasn’t sent. Please try again shortly.'}
 finally{sb.disabled=false}
});
