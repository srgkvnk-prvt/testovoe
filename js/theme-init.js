/* Sets the theme before first paint: saved choice → system preference → light. */
try {
  var saved = localStorage.getItem('isg-theme');
  document.documentElement.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
} catch (e) {}
