function setupKeyboardShortcut() {
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'f') { //It is possible to change with other characters.
      e.preventDefault(); // Prevent default behavior
      var searchBar = document.querySelector('.search-bar');
      if (searchBar) {
        searchBar.focus();
      }
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupKeyboardShortcut);
} else {
  setupKeyboardShortcut();
}
