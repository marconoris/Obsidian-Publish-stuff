/* 
Marco Noris - https://lab.marconoris.com 
*/

// START HIDE SIDEBARS 

// Iconos SVG para los estados visible y oculto
const iconVisible = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`; // SVG para cuando las sidebars están visibles
const iconHidden = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minimize-2"><polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/></svg>`; // SVG para cuando las sidebars están ocultas

// Función para alternar la visibilidad de las sidebars, el pie de página y el .site-header
function toggleSidebarsAndFooter() {
  const rightSidebar = document.querySelector('.site-body-right-column');
  const leftSidebar = document.querySelector('.site-body-left-column');
  const siteFooter = document.querySelector('.site-footer');
  const siteHeader = document.querySelector('.site-header');
  const toggleButton = document.querySelector('#toggle-sidebar-btn');

  if (rightSidebar && leftSidebar && siteFooter && siteHeader && toggleButton) {
    const isHidden = rightSidebar.style.display === 'none';
    rightSidebar.style.display = isHidden ? '' : 'none';
    leftSidebar.style.display = isHidden ? '' : 'none';
    siteFooter.style.display = isHidden ? '' : 'none';
    
    // Alternar la clase 'header-visible' del .site-header
    if (isHidden) {
      siteHeader.classList.remove('header-visible');
    } else {
      siteHeader.classList.add('header-visible');
    }

    // Cambia el icono del botón según el estado de las sidebars
    toggleButton.innerHTML = isHidden ? iconVisible : iconHidden;
  }
}

// Función para verificar y aplicar el estado de visibilidad inicial
function applyInitialVisibilityState() {
  const rightSidebar = document.querySelector('.site-body-right-column');
  const leftSidebar = document.querySelector('.site-body-left-column');
  const siteFooter = document.querySelector('.site-footer');
  const siteHeader = document.querySelector('.site-header');
  const toggleButton = document.querySelector('#toggle-sidebar-btn');

  // Asumir que las sidebars deben estar visibles inicialmente
  rightSidebar.style.display = '';
  leftSidebar.style.display = '';
  siteFooter.style.display = '';
  siteHeader.classList.remove('header-visible');
  toggleButton.innerHTML = iconVisible;
}

// Función para crear y añadir el botón de alternar al .site-body-center-column
function addToggleButton() {
  const siteBodyCenterColumn = document.querySelector('.site-body-center-column');
  if (siteBodyCenterColumn) {
    // Crea el botón
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-sidebar-btn';
    toggleButton.setAttribute('aria-label', 'Toggle sidebars and footer');

    // Establece el icono inicial del botón
    toggleButton.innerHTML = iconVisible;

    // Añade el evento de clic al botón
    toggleButton.addEventListener('click', toggleSidebarsAndFooter);

    // Añade el botón al .site-body-center-column
    siteBodyCenterColumn.appendChild(toggleButton);
  }
}

// Función para iniciar el observador de mutaciones
function waitForSiteBodyCenterColumn() {
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector('.site-body-center-column')) {
      addToggleButton();
      applyInitialVisibilityState(); // Aplica el estado de visibilidad inicial
      obs.disconnect(); // Detiene el observador una vez que el .site-body-center-column ha sido encontrado
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Ejecuta la función waitForSiteBodyCenterColumn cuando el script se carga
waitForSiteBodyCenterColumn();
