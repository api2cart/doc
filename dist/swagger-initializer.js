// Приклад: https://api2cart-5448ee.gitlab.io/de/index.html
  // window.location.pathname => "/de/index.html"
  // Розіб'ємо шлях на складові: ['', 'de', 'index.html']
  const pathSegments = window.location.pathname.split('/');
  let lang = pathSegments[1]; // "de" або "it" чи "fr"...

  // Шлях до файлу openapi за замовчуванням (англійський)
  let openapiUrl = "https://api2cart.github.io/doc/openapi.json";

  // Залежно від lang підставляємо іншу URL-адресу
  switch (lang) {
    case 'de':
      openapiUrl = "https://api2cart.github.io/doc/de/openapi.json";
      break;
    case 'it':
      openapiUrl = "https://api2cart.github.io/doc/it/openapi.json";
      break;
    case 'fr':
      openapiUrl = "https://api2cart.github.io/doc/fr/openapi.json";
      break;
    case 'es':
      openapiUrl = "https://api2cart.github.io/doc/es/openapi.json";
      break;
    // Можна додати інші мови / кейси
    default:
      // якщо lang порожнє або не співпадає
      openapiUrl = "https://api2cart.github.io/doc/openapi.json";
  }

  // Ініціалізуємо Swagger
  window.ui = SwaggerUIBundle({
    url: openapiUrl,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
};