// 导航滚动变色；无hero的内页直接实底
const header = document.getElementById('header');
if (!document.querySelector('.hero')) header.classList.add('scrolled');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// 移动端菜单
const btn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// 服务页Tab切换（支持 services.html#sea 这种锚点直达）
document.querySelectorAll('.services-tabs li').forEach(tab => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab));
});
function activateTab(id){
  document.querySelectorAll('.services-tabs li').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const tab = document.querySelector(`.services-tabs li[data-tab="${id}"]`);
  const panel = document.getElementById(id);
  if (tab) tab.classList.add('active');
  if (panel) panel.classList.add('active');
}
if (location.hash && document.getElementById(location.hash.slice(1))) {
  activateTab(location.hash.slice(1));
}

// 数字滚动动画
const nums = document.querySelectorAll('.num');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.target, dur = 1600, t0 = performance.now();
    (function tick(t){
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
    io.unobserve(el);
  });
}, { threshold: .5 });
nums.forEach(n => io.observe(n));
