Welcome to My API Documentation
=============================

This is the documentation for the Swagger API.

.. toctree::
   :maxdepth: 2
   :caption: Contents:

Introduction
-------------
This section introduces the API and gives an overview of its functionality.

API Reference
-------------
The API documentation can be found below. You can interact with the Swagger API using the interface below.

Swagger UI
-----------
To interact with the API, use the Swagger UI below. It will display the endpoints and allow you to try out the requests.

.. raw:: html

<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Swagger UI1</title>
    <link rel="stylesheet" type="text/css" href="dist/swagger-ui.css" />
    <link rel="stylesheet" type="text/css" href="dist/index.css" />
    <link rel="icon" type="image/png" href="dist/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="dist/favicon-16x16.png" sizes="16x16" />
  </head>

  <body>
    <div id="swagger-ui"></div>
    <script src="dist/swagger-ui-bundle.js" charset="UTF-8"> </script>
    <script src="dist/swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
    <script src="dist/swagger-initializer.js" charset="UTF-8"> </script>
  </body>
</html>
<script>
  window.onload = function() {
    // Initialize Swagger UI
    const ui = SwaggerUIBundle({
      url: "swagger.json",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout"
    });
  };


Links to Documentation
----------------------
Here are the links to other sections of the API documentation.

- Overview
- Authentication
- Endpoints
