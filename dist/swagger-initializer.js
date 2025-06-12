// URL: https://api2cart-5448ee.gitlab.io/de/index.html
// window.location.pathname => "/de/index.html"
// Сегменти шляху розділяються на: ['', 'de', 'index.html']
const pathSegments = window.location.pathname.split('/');
let lang = pathSegments[1]; // "de", "it", "fr", ...

// Початковий URL для openapi.json (за замовчуванням)
let openapiUrl = "https://api2cart.github.io/doc/openapi.json";

// Залежно від мови в URL, змінюємо URL для openapi.json
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
  // За замовчуванням використовуємо основний файл
  default:
    openapiUrl = "https://api2cart.github.io/doc/openapi.json";
}

// Ініціалізація Swagger UI
window.ui = SwaggerUIBundle({
  url: openapiUrl,  // Вказуємо правильний URL для документації OpenAPI
  dom_id: '#swagger-ui',  // Місце для рендерингу Swagger UI
  deepLinking: true,  // Дозволяє працювати з глибокими посиланнями
  presets: [
    SwaggerUIBundle.presets.apis,  // Налаштування для відображення API
    SwaggerUIStandalonePreset  // Стандартне розташування
  ],
  plugins: [
    SwaggerUIBundle.plugins.DownloadUrl  // Плагін для завантаження документації
  ],
  layout: "StandaloneLayout"  // Використовуємо стандартне розташування для Swagger
});