const toggle = document.querySelector('#toggle-theme');
const root = document.documentElement;

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDark) {
  root.classList.add('dark');
}

const syncLabel = () => {
  toggle.textContent = root.classList.contains('dark') ? '切换到亮色' : '切换到暗色';
};

syncLabel();

toggle?.addEventListener('click', () => {
  root.classList.toggle('dark');
  syncLabel();
});
