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
