// �������: https://api2cart-5448ee.gitlab.io/de/index.html
// window.location.pathname => "/de/index.html"
// ����'��� ���� �� �������: ['', 'de', 'index.html']
const pathSegments = window.location.pathname.split('/');
let lang = pathSegments[2]; // "de" ��� "it" �� "fr"...

// ���� �� ����� openapi �� ������������� (����������)
let openapiUrl = "openapi.json";



// ����������� Swagger
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
