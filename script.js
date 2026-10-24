const btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
const setMenu=o=>{btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',o?'Close menu':'Open menu');nav.classList.toggle('open',o)};
btn.addEventListener('click',()=>setMenu(btn.getAttribute('aria-expanded')!=='true'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
document.getElementById('yr').textContent=new Date().getFullYear();
const els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
 els.forEach(el=>io.observe(el));
}else els.forEach(el=>el.classList.add('in'));
const f=document.getElementById('contact-form'),s=document.getElementById('form-status'),sb=f.querySelector('button[type=submit]');
// Netlify Forms: urlencoded POST to "/" (form-name hidden field identifies the form).
f.addEventListener('submit',async e=>{e.preventDefault();
 if(!f.checkValidity()){s.textContent='Please fill in your name, a valid email and a message.';f.querySelector(':invalid').focus();return}
 sb.disabled=true;s.textContent='Sending…';
 try{const r=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()});
  if(!r.ok)throw new Error(r.status);
  s.textContent='Thank you, your message has been sent. I’ll be in touch soon.';f.reset();
 }catch(err){s.textContent='Sorry, something went wrong and your message wasn’t sent. Please try again shortly.'}
 finally{sb.disabled=false}
});
