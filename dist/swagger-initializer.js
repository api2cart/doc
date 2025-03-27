// �������: https://api2cart-5448ee.gitlab.io/de/index.html
  // window.location.pathname => "/de/index.html"
  // ����'��� ���� �� �������: ['', 'de', 'index.html']
  const pathSegments = window.location.pathname.split('/');
  let lang = pathSegments[1]; // "de" ��� "it" �� "fr"...

  // ���� �� ����� openapi �� ������������� (����������)
  let openapiUrl = "https://api2cart-5448ee.gitlab.io/openapi.json";

  // ������� �� lang ����������� ���� URL-������
  switch (lang) {
    case 'de':
      openapiUrl = "https://api2cart-5448ee.gitlab.io/de/de_openapi.json";
      break;
    case 'it':
      openapiUrl = "https://api2cart-5448ee.gitlab.io/it/it_openapi.json";
      break;
    case 'fr':
      openapiUrl = "https://api2cart-5448ee.gitlab.io/fr/fr_openapi.json";
      break;
    case 'es':
      openapiUrl = "https://api2cart-5448ee.gitlab.io/es/es_openapi.json";
      break;
    // ����� ������ ���� ���� / �����
    default:
      // ���� lang ������ ��� �� �������
      openapiUrl = "https://api2cart-5448ee.gitlab.io/openapi.json";
  }

  // ���������� Swagger
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