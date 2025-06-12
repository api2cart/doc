// URL: https://api2cart-5448ee.gitlab.io/de/index.html
// window.location.pathname => "/de/index.html"
// Сегменти шляху розділяються на: ['', 'de', 'index.html']
const pathSegments = window.location.pathname.split('/');

// Початковий URL для openapi.json (за замовчуванням)
let openapiUrl = "openapi.json";

// Залежно від мови в URL, змінюємо URL для openapi.json

openapiUrl = "openapi.json";

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