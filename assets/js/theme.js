// Dark/light theme toggle
(function () {
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  function applyTheme(theme) {
    document.body.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
    if (icon) {
      icon.textContent = theme === 'light' ? '☀️' : '🌙';
    }
  }
  let current = localStorage.getItem('theme');
  if (!current) {
    current = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  applyTheme(current);
  if (toggle) {
    toggle.addEventListener('click', () => {
      current = document.body.classList.contains('light') ? 'dark' : 'light';
      applyTheme(current);
    });
  }
})();
