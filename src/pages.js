/* ═══════════════════════════════════════════
   SUB-PAGES ENGINE — Menu, About, Book
   Premium Redesign v2
   ═══════════════════════════════════════════ */
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ── Lenis ── */
const lenis = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.75 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ── Header Auto-Hide ── */
(function initHeader() {
  const header = document.querySelector('.o-header');
  if (!header) return;
  let lastScroll = 0;
  ScrollTrigger.create({
    trigger: document.body, start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => {
      const scroll = self.scroll();
      if (scroll > 100) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      if (scroll > lastScroll && scroll > 80) header.classList.add('is-hidden');
      else header.classList.remove('is-hidden');
      lastScroll = scroll;
    }
  });
})();

/* ── Navigation (Full-Screen with GSAP) ── */
(function initNav() {
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const overlay = document.getElementById('menuOverlay');
  const links = document.querySelectorAll('.o-menu_list a');
  if (!btn || !menu) return;

  function open() {
    menu.classList.add('is-open');
    btn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(links, { y: '110%', opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.25 });
  }
  function close() {
    gsap.to(links, { y: '-110%', opacity: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in', onComplete: () => {
      menu.classList.remove('is-open');
      btn.classList.remove('is-active');
      document.body.style.overflow = '';
    }});
  }
  btn.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
  overlay?.addEventListener('click', close);
})();

/* ── Page Hero Entrance — Cinematic blur-fade ── */
gsap.from('.s-pageHero h1', { y: 60, opacity: 0, filter: 'blur(8px)', duration: 1.2, ease: 'power3.out', delay: 0.15 });
gsap.from('.s-pageHero p', { y: 30, opacity: 0, filter: 'blur(4px)', duration: 0.9, ease: 'power3.out', delay: 0.4 });

/* ── Scroll Reveals — Blur-fade ── */
document.querySelectorAll('.js-reveal').forEach(el => {
  gsap.set(el, { opacity: 0, y: 40, filter: 'blur(6px)' });
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: () => gsap.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' })
  });
});
document.querySelectorAll('.js-reveal-scale').forEach(el => {
  gsap.set(el, { opacity: 0, scale: 0.88, filter: 'blur(4px)' });
  ScrollTrigger.create({
    trigger: el, start: 'top 85%',
    onEnter: () => gsap.to(el, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' })
  });
});

/* ── Background Color Transitions ── */
document.querySelectorAll('[data-color]').forEach(section => {
  ScrollTrigger.create({
    trigger: section, start: 'top 55%', end: 'bottom 45%',
    onEnter: () => gsap.to('body', { backgroundColor: section.dataset.color, duration: 1.6, ease: 'power2.inOut' }),
    onEnterBack: () => gsap.to('body', { backgroundColor: section.dataset.color, duration: 1.6, ease: 'power2.inOut' }),
  });
});

/* ── Accordion (FAQ, Services) ── */
document.querySelectorAll('[data-accordion]').forEach(acc => {
  acc.querySelectorAll('.a-accordion_trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const wasActive = item.classList.contains('-active');
      acc.querySelectorAll('.a-accordion_item').forEach(i => i.classList.remove('-active'));
      if (!wasActive) item.classList.add('-active');
    });
  });
});

/* ── Booking Form Multi-Step ── */
window.goStep = function(step) {
  const currentActive = document.querySelector('.s-book_form.is-active');
  if (currentActive) {
    const inputs = currentActive.querySelectorAll('[required]');
    for (const input of inputs) {
      if (!input.value) {
        input.focus();
        input.style.borderColor = '#C77D9A';
        setTimeout(() => input.style.borderColor = '', 2000);
        return;
      }
    }
  }

  if (step === 3) {
    const summary = document.getElementById('reviewSummary');
    if (summary) {
      const fields = [
        ['Event Type', document.getElementById('eventType')?.value],
        ['Date', document.getElementById('eventDate')?.value],
        ['Guests', document.getElementById('guestCount')?.value],
        ['Location', document.getElementById('location')?.value],
        ['Details', document.getElementById('details')?.value || '—'],
        ['Name', document.getElementById('fullName')?.value],
        ['Email', document.getElementById('email')?.value],
        ['Phone', document.getElementById('phone')?.value || '—'],
      ];
      summary.innerHTML = fields.map(([label, val]) => `<dt>${label}</dt><dd>${val}</dd>`).join('');
    }
  }

  document.querySelectorAll('.s-book_form').forEach(f => f.classList.remove('is-active'));
  const target = document.querySelector(`.s-book_form[data-step="${step}"]`);
  if (target) {
    target.classList.add('is-active');
    // Animate form entrance
    gsap.from(target, { opacity: 0, y: 30, filter: 'blur(6px)', duration: 0.6, ease: 'power3.out' });
  }

  document.querySelectorAll('.s-book_step').forEach(s => {
    const sStep = parseInt(s.dataset.step);
    s.classList.remove('is-active', 'is-done');
    if (sStep === step) s.classList.add('is-active');
    if (sStep < step) s.classList.add('is-done');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.submitBooking = function() {
  document.querySelectorAll('.s-book_form').forEach(f => f.classList.remove('is-active'));
  const success = document.querySelector('.s-book_form[data-step="success"]');
  if (success) {
    success.classList.add('is-active');
    gsap.from(success, { scale: 0.9, opacity: 0, filter: 'blur(8px)', duration: 0.8, ease: 'power3.out' });
  }
  document.querySelectorAll('.s-book_step').forEach(s => s.classList.add('is-done'));
  document.querySelector('.s-book_steps')?.remove();
};

ScrollTrigger.refresh();
