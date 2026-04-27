/* ═══════════════════════════════════════════
   MOTION ENGINE — Two Friends Coffee Co
   Premium Redesign v2 — Precision Timing
   ═══════════════════════════════════════════ */
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ── Loader ── */
function runLoader() {
  return new Promise(resolve => {
    const loader = document.getElementById('loader');
    const words = document.querySelectorAll('.o-loader_word');
    const counter = document.getElementById('loaderCounter');
    const bar = document.getElementById('loaderBar');
    if (!loader) { resolve(); return; }
    const tl = gsap.timeline({ onComplete: () => {
      // Cinematic exit: blur + scale instead of slide
      gsap.to(loader, {
        opacity: 0, scale: 1.05, filter: 'blur(20px)',
        duration: 0.9, ease: 'power3.inOut',
        onComplete: () => { loader.remove(); document.documentElement.classList.remove('is-loading'); resolve(); }
      });
    }});
    const obj = { val: 0 };
    tl.to(obj, { val: 100, duration: 2, ease: 'power2.inOut', onUpdate: () => {
      if (counter) counter.textContent = Math.round(obj.val);
      if (bar) bar.style.width = obj.val + '%';
    }}, 0);
    tl.to(words, { y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out' }, 0.3);
    tl.to(words, { y: '-110%', duration: 0.4, stagger: 0.03, ease: 'power3.in' }, 1.8);
  });
}

/* ── Cursor with Magnetic ── */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(hover:none)').matches) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  document.querySelectorAll('a, button, .f-projects_card, .f-community_item, .f-pill').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
  document.querySelectorAll('.a-btn, .o-header_menuBtn, .o-header_igBtn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      gsap.to(btn, { x: (e.clientX - r.left - r.width/2) * 0.25, y: (e.clientY - r.top - r.height/2) * 0.25, duration: 0.5, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,0.4)' }));
  });
  gsap.ticker.add(() => { cx += (mx - cx) * 0.1; cy += (my - cy) * 0.1; cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`; });
}

/* ── Lenis ── */
function initLenis() {
  const lenis = new Lenis({ lerp: 0.07, smoothWheel: true, wheelMultiplier: 0.75 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/* ── Header Auto-Hide ── */
function initHeader() {
  const header = document.querySelector('.o-header');
  if (!header) return;
  let lastScroll = 0;
  const threshold = 80;

  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const scroll = self.scroll();
      // Add glassmorphic bg after scrolling past hero
      if (scroll > 100) { header.classList.add('is-scrolled'); }
      else { header.classList.remove('is-scrolled'); }
      // Auto-hide on scroll down, show on scroll up
      if (scroll > lastScroll && scroll > threshold) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      lastScroll = scroll;
    }
  });
}

/* ── Scroll Progress ── */
function initScrollProgress() {
  const fill = document.getElementById('scrollFill');
  if (!fill) return;
  ScrollTrigger.create({
    trigger: document.body, start: 'top top', end: 'bottom bottom',
    onUpdate: s => { fill.style.height = (s.progress * 100) + '%'; }
  });
}

/* ── Navigation ── */
function initNav() {
  const btn = document.getElementById('menuBtn'), menu = document.getElementById('menu'), overlay = document.getElementById('menuOverlay');
  const links = document.querySelectorAll('.o-menu_list a');
  if (!btn || !menu) return;
  function open() {
    menu.classList.add('is-open'); btn.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    gsap.fromTo(links, { y: '110%', opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out', delay: 0.25 });
  }
  function close() {
    gsap.to(links, { y: '-110%', opacity: 0, duration: 0.35, stagger: 0.03, ease: 'power2.in',
      onComplete: () => { menu.classList.remove('is-open'); btn.classList.remove('is-active'); document.body.style.overflow = ''; }
    });
  }
  btn.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
  overlay?.addEventListener('click', close);
}

/* ── Background Color Morph ── */
function initBgTransitions() {
  const bg = document.getElementById('bg-layer');
  if (!bg) return;
  document.querySelectorAll('[data-color]').forEach(s => {
    ScrollTrigger.create({
      trigger: s, start: 'top 35%', end: 'bottom 55%',
      onEnter: () => gsap.to(bg, { backgroundColor: s.dataset.color, duration: 1.4, ease: 'power2.inOut' }),
      onEnterBack: () => gsap.to(bg, { backgroundColor: s.dataset.color, duration: 1.4, ease: 'power2.inOut' }),
    });
  });
}

/* ── Section Label ── */
function initSectionLabel() {
  const label = document.querySelector('#sectionLabel span');
  if (!label) return;
  document.querySelectorAll('[data-label]').forEach(s => {
    ScrollTrigger.create({
      trigger: s, start: 'top center', end: 'bottom center',
      onEnter: () => { gsap.to(label, { opacity: 0, y: -10, duration: 0.2, onComplete: () => { label.textContent = s.dataset.label; gsap.to(label, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }); }}); },
      onEnterBack: () => { gsap.to(label, { opacity: 0, y: 10, duration: 0.2, onComplete: () => { label.textContent = s.dataset.label; gsap.to(label, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }); }}); },
    });
  });
}

/* ── Case Card ── */
function initCaseCard() {
  const card = document.getElementById('caseCard');
  if (!card) return;
  const closeBtn = document.getElementById('caseCardClose');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      card.classList.add('is-dismissed');
    });
  }
  ScrollTrigger.create({ trigger: '#manifesto', start: 'top 90%',
    onEnter: () => card.classList.add('is-visible'),
    onLeaveBack: () => card.classList.remove('is-visible'),
  });
  ScrollTrigger.create({ trigger: '#cta', start: 'top 50%',
    onEnter: () => card.classList.remove('is-visible'),
    onLeaveBack: () => card.classList.add('is-visible'),
  });
}

/* ── Hero — Immediate entrance after loader ── */
function initHero() {
  const tl = gsap.timeline({ delay: 0 });
  // Lines reveal with blur-fade for cinematic feel
  tl.from('.f-hero_line', {
    y: '120%', filter: 'blur(6px)',
    duration: 1.3, stagger: 0.12, ease: 'power3.out'
  }, 0)
  // Images appear with staggered scale + rotation
  .from('.f-hero_img', {
    scale: 0.5, opacity: 0, rotation: 15, filter: 'blur(8px)',
    duration: 1.4, stagger: 0.15, ease: 'power3.out'
  }, 0.1);

  // Scroll-driven parallax only
  gsap.to('.f-hero_watermark', {
    y: -200, ease: 'none',
    scrollTrigger: { trigger: '.f-hero', start: 'top top', end: 'bottom top', scrub: true }
  });
  document.querySelectorAll('.f-hero_img').forEach(img => {
    const speed = parseFloat(img.style.getPropertyValue('--speed')) || 0.2;
    gsap.to(img, {
      y: () => -window.innerHeight * speed, rotation: '+=4',
      ease: 'none',
      scrollTrigger: { trigger: '.f-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  });
  gsap.to('.f-hero_title', {
    y: -80, opacity: 0.15,
    ease: 'none',
    scrollTrigger: { trigger: '.f-hero', start: 'top top', end: '70% top', scrub: true }
  });
}

/* ── Manifesto Scale Media ── */
function initManifesto() {
  const media = document.getElementById('manifestoMedia');
  if (!media) return;
  gsap.fromTo(media,
    { scale: 0.5, clipPath: 'inset(18% 18% 18% 18% round 24px)', filter: 'blur(4px)' },
    { scale: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)', filter: 'blur(0px)',
      scrollTrigger: { trigger: media, start: 'top 90%', end: 'top 20%', scrub: 1 }
    }
  );
  // Quote reveal
  const quote = document.querySelector('.f-manifesto_quote');
  if (quote) {
    gsap.from(quote, {
      y: 40, opacity: 0, filter: 'blur(6px)',
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: quote, start: 'top 85%', toggleActions: 'play none none none' }
    });
  }
}

/* ── Three-Column Sections ── */
function initThreeColAnimations() {
  document.querySelectorAll('.f-threeCol').forEach(col => {
    // Center image: scale + blur entrance
    const center = col.querySelector('.f-tiltImg');
    if (center) {
      gsap.from(center, {
        scale: 0.75, opacity: 0, rotation: -6, filter: 'blur(6px)',
        duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: col, start: 'top 85%', toggleActions: 'play none none none' }
      });
    }
    // Right column: stagger each child paragraph
    const rightChildren = col.querySelectorAll('.f-threeCol_right > *');
    if (rightChildren.length) {
      gsap.from(rightChildren, {
        x: 50, opacity: 0, filter: 'blur(4px)',
        duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: col, start: 'top 82%', toggleActions: 'play none none none' }
      });
    }
  });
  // Pills stagger with scale
  document.querySelectorAll('.f-pills').forEach(group => {
    const pills = group.querySelectorAll('.f-pill');
    gsap.from(pills, {
      scale: 0.6, opacity: 0, filter: 'blur(3px)',
      duration: 0.5, stagger: 0.05, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: group, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });
  // Inner image parallax
  document.querySelectorAll('.f-tiltImg img, .f-tiltImg video').forEach(el => {
    gsap.to(el, {
      y: '-10%', ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
}

/* ── Horizontal Scroll ── */
function initDrinksScroll() {
  const section = document.getElementById('drinks');
  const pin = document.getElementById('projectsPin');
  if (!section || !pin) return;
  window.addEventListener('load', () => { setTimeout(() => ScrollTrigger.refresh(), 150); });
  const getDistance = () => Math.max(pin.scrollWidth - window.innerWidth, 0);

  gsap.to(pin, {
    x: () => -getDistance(), ease: 'none',
    scrollTrigger: {
      trigger: section, start: 'top top',
      end: () => `+=${getDistance() + 600}`,
      pin: true, scrub: 1.2,
      invalidateOnRefresh: true, anticipatePin: 1
    }
  });

  // Cards stagger in as they enter viewport during scroll
  gsap.from('.f-projects_card', {
    y: 60, opacity: 0, scale: 0.9, filter: 'blur(4px)',
    duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' }
  });
}

/* ── Process Cards ── */
function initProcessCards() {
  document.querySelectorAll('.f-process_card').forEach((card, i) => {
    gsap.fromTo(card,
      { x: -40, opacity: 0, filter: 'blur(6px)' },
      { x: 0, opacity: 1, filter: 'blur(0px)',
        duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });
}

/* ── Community Gallery ── */
function initCommunity() {
  document.querySelectorAll('.f-community_item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 50, scale: 0.85, filter: 'blur(4px)' },
      { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
        duration: 0.9, delay: (i % 3) * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none none' }
      }
    );
  });
}

/* ── CTA ── */
function initCTA() {
  const c = document.querySelector('.f-cta_inner');
  if (c) {
    gsap.fromTo(c,
      { scale: 0.85, opacity: 0, filter: 'blur(8px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)',
        duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.f-cta', start: 'top 70%', toggleActions: 'play none none none' }
      }
    );
  }
}

/* ── Footer ── */
function initFooter() {
  const brand = document.querySelector('.f-footer_brand');
  if (!brand) return;
  gsap.from(brand, {
    y: 80, opacity: 0, filter: 'blur(8px)',
    duration: 1.4, ease: 'power3.out',
    scrollTrigger: { trigger: '.f-footer', start: 'top 80%', toggleActions: 'play none none none' }
  });
  const media = document.querySelector('.f-footer_media');
  if (media) {
    gsap.fromTo(media,
      { scale: 0.7, clipPath: 'inset(10% round 20px)', filter: 'blur(4px)' },
      { scale: 1, clipPath: 'inset(0% round 20px)', filter: 'blur(0px)',
        scrollTrigger: { trigger: '.f-footer', start: 'top 90%', end: 'top 30%', scrub: 1 }
      }
    );
  }
}

/* ═══ INIT ═══ */
async function init() {
  await runLoader();
  initLenis();
  initCursor();
  initHeader();
  initNav();
  initScrollProgress();
  initBgTransitions();
  initSectionLabel();
  initCaseCard();
  initHero();
  initManifesto();
  initThreeColAnimations();
  initDrinksScroll();
  initProcessCards();
  initCommunity();
  initCTA();
  initFooter();
  ScrollTrigger.refresh();
}
init();
