// --------------------- REGISTRO DEL SERVICE WORKER ---------------------
if ('serviceWorker' in navigator) {
  console.log('✔ Puedes usar Service Workers en este navegador.');

  navigator.serviceWorker
    .register('./sw.js')
    .then(res => console.log('✅ Service Worker registrado correctamente:', res))
    .catch(err => console.log('❌ Error al registrar el Service Worker:', err));
} else {
  console.log('⚠️ Este navegador no soporta Service Workers.');
}

// --------------------- SCROLL SUAVIZADO (Menú) ---------------------
$(document).ready(function () {
  $("#menu a").click(function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      800 // duración del efecto (milisegundos)
    );

    return false;
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('menu');

    if (hamburgerBtn && menu) {
        hamburgerBtn.addEventListener('click', () => {
            // Esto agrega o quita la clase 'open'
            menu.classList.toggle('open'); 
            hamburgerBtn.classList.toggle('open');
        });
        
        // ... (código para cerrar el menú al hacer clic en un enlace) ...
    }
    // ... (resto del código JS)
});