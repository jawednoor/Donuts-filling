// Lightbox بسيط لعرض صور المعرض بحجم كبير
(function(){
  const grid = document.querySelector('.gallery-grid');
  if(!grid) return;

  // إنشاء عناصر اللايت بوكس
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="إغلاق">×</button>
      <img alt="صورة المنتج"/>
    </div>
  `;
  document.body.appendChild(overlay);
  const imgEl = overlay.querySelector('img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  // فتح اللايت بوكس عند الضغط على أي صورة في المعرض
  grid.addEventListener('click', (e)=>{
    const target = e.target;
    if(target && target.tagName === 'IMG'){
      imgEl.src = target.src;
      imgEl.alt = target.alt || 'صورة المنتج';
      overlay.classList.add('open');
    }
  });

  // إغلاق عند الضغط على الزر أو خارج المحتوى أو زر Escape
  function close(){ overlay.classList.remove('open'); }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });
})();

// تفعيل ScrollSpy بسيط لتحديد الرابط النشط في شريط التنقل
// ScrollSpy سابقًا لروابط الهيدر، نتخطيه الآن لعدم وجود هيدر
(function(){
  const links = Array.from(document.querySelectorAll('header .nav-link'));
  if(!links.length) return; // لا هيدر الآن
})();

// إظهار مقاطع بشكل فلاش/Reveal عند الظهور
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target);} });
    }, { rootMargin: '-10% 0px -10% 0px', threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  }
})();

// سلايدر بسيط لقسم "تشكيلاتنا"
(function(){
  const slider = document.querySelector('#showcase .slider');
  if(!slider) return;
  const track = slider.querySelector('.slides');
  const slides = Array.from(track.children);
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  let index = 0;

  function go(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index*100}%)`;
    slides.forEach((s,idx)=> s.classList.toggle('is-active', idx===index));
  }
  prev.addEventListener('click', ()=> go(index-1));
  next.addEventListener('click', ()=> go(index+1));
  let auto = setInterval(()=> go(index+1), 5000);
  slider.addEventListener('mouseenter', ()=> clearInterval(auto));
  slider.addEventListener('mouseleave', ()=> auto = setInterval(()=> go(index+1), 5000));
})();

// تأثير نقرة (Ripple) وروح hover لروابط الهيدر
// تأثير Ripple لروابط الهيدر غير مطلوب الآن

// سلايدر علوي: يتغير كل 4 ثواني، ويقرأ الصور من مجلد img إن توفرت بأسماء نمطية

(function(){
  const container = document.querySelector('.top-slides');
  if(!container) return;
  let wraps = Array.from(container.querySelectorAll('.slide-wrap'));
  if(!wraps.length) return;

  let idx = wraps.findIndex(w=> w.querySelector('.top-slide').classList.contains('is-active'));
  if(idx < 0){ idx = 0; }
  function updateSlides(activeIdx) {
    wraps.forEach((w,i)=>{
      w.classList.toggle('active', i===activeIdx);
      w.querySelector('.top-slide').classList.toggle('is-active', i===activeIdx);
      let txt = w.querySelector('.slide-flash-text');
      if(txt) txt.style.display = (i===activeIdx) ? 'block' : 'none';
    });
  }
  updateSlides(idx);

  setInterval(()=>{
    idx = (idx + 1) % wraps.length;
    updateSlides(idx);
  }, 4000);
})();
