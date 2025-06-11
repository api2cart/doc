# conf.py для Sphinx для Swagger документації

# Загальні налаштування
project = 'My Swagger API Documentation'
author = 'Your Name'
version = '1.0'
release = '1.0.0'

# Розширення для Sphinx
extensions = [
    'sphinx.ext.autodoc',  # Для автоматичного документування
    'sphinx.ext.viewcode',  # Для перегляду коду
    'sphinx.ext.githubpages',  # Для публікації на GitHub Pages
]

# Суфікс вихідних файлів
source_suffix = '.rst'

# Документ, що є головним
master_doc = 'index'

# Тема для побудови документації
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']  # Папка зі статичними файлами (якщо є)

# Інтеграція Swagger/OpenAPI через Swagger UI або Redoc
html_context = {
    'swagger_ui': 'swagger.yaml',  # Вказуємо шлях до вашого swagger.yaml або swagger.json
}
