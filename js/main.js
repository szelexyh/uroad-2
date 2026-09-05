// ===== 导航滚动变色（智能遮罩联动）=====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== 移动端菜单 =====
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===== 服务板块 Tab 切换 =====
document.querySelectorAll('.services-tabs li').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.services-tabs li').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ===== 数字滚动动画 =====
const nums = document.querySelectorAll('.num');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target, dur = 1600, t0 = performance.now();
    (function tick(t) {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    io.unobserve(el);
  });
}, { threshold: .5 });
nums.forEach(n => io.observe(n));
