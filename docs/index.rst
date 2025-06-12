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

   <html>
   <head>
      <title>API Documentation</title>
      <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui-bundle.js"></script>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist/swagger-ui.css" />
   </head>
   <body>
      <div id="swagger-ui"></div>
      <script>
         const ui = SwaggerUIBundle({
            url: "swagger.yaml",  # Вказуємо шлях до вашого swagger.yaml або swagger.json
            dom_id: "#swagger-ui",
         });
      </script>
   </body>
   </html>

Links to Documentation
----------------------
Here are the links to other sections of the API documentation.

- Overview
- Authentication
- Endpoints
