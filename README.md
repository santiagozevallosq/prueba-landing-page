# 🚀 Landing Page Personal & Portafolio de Software

> Portafolio web profesional de alto impacto para **Estudiante de Programación / Software Engineering** en **Lima, Perú**. Diseñado bajo principios de ingeniería de software, arquitectura moderna, rendimiento óptimo y accesibilidad (WCAG AA).

![Licencia MIT](https://img.shields.io/badge/license-MIT-emerald?style=flat-square)
![HTML5 Semántico](https://img.shields.io/badge/HTML5-Semántico-orange?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square)
![JavaScript Vanilla](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub_Pages-black?style=flat-square)

---

## 📋 Características Principales

- **⚡ Carga Instantánea & Cero Dependencias Pesadas**: Construido con HTML5 nativo, Tailwind CSS y Vanilla JS modular. No requiere pasos complejos de compilación o `npm install`.
- **🇵🇪 Contexto Local & Reloj en Tiempo Real**: Incorpora la zona horaria de Lima (UTC-5) y estado de disponibilidad laboral activa en el header.
- **💻 Terminal Interactiva**: Ventana de código con pestañas para previsualizar lógica backend (`order-service.ts`, `schema.sql`, `docker-compose.yml`).
- **🛠️ Proyectos con Enfoque en Arquitectura**: Proyectos mock con problemas reales, retos superados, stack y métricas demostrables con un visor modal interactivo.
- **📱 100% Responsivo**: Adaptado milimétricamente para smartphones, tablets y pantallas de escritorio.
- **♿ Accesibilidad & Theming Completo**: Contraste alto validado, selección de texto tematizada, scrollbars personalizados y anillos de foco visibles.
- **📬 Formulario Simulado**: Feedback interactivo con notificaciones Toast y botón de copiado rápido de correo al portapapeles.

---

## 📂 Estructura del Proyecto

```text
PRUEBA_AGY_LANDING_PAGE/
├── css/
│   └── style.css            # Estilos personalizados, tokens, accesibilidad y animaciones
├── js/
│   └── main.js              # Lógica interactiva (reloj Lima, terminal, modal, formulario)
├── .gitignore               # Archivos ignorados por Git
├── index.html               # Página principal semántica y accesible
├── PRODUCT.md               # Especificación y verdad de producto
└── README.md                # Documentación del proyecto y guía de despliegue
```

---

## 💻 Cómo Probarlo en Local

1. Simplemente haz **doble clic en el archivo `index.html`** para abrirlo en cualquier navegador (Chrome, Edge, Firefox, Brave, Safari).
2. O si utilizas Visual Studio Code, haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

---

## 🌐 Cómo Subir este Proyecto a GitHub

Tienes dos formas sencillas de subir este proyecto a tu cuenta de GitHub:

### Opción A: Cargar directamente desde la Web de GitHub (Sin instalar nada)

1. Ingresa a [github.com](https://github.com) e inicia sesión con tu cuenta.
2. Haz clic en el botón verde **"New"** (Nuevo repositorio).
3. Asigna un nombre al repositorio, por ejemplo: `mi-landing-page` o `portafolio-personal`.
4. Elige si prefieres que sea **Public** (Público, recomendado para portafolios) y haz clic en **"Create repository"**.
5. En la pantalla siguiente, verás la opción **"uploading an existing file"** (subir archivos existentes). Haz clic ahí.
6. **Arrastra y suelta todos los archivos y carpetas** de este proyecto (`index.html`, `README.md`, `.gitignore`, la carpeta `css/` y la carpeta `js/`) al navegador.
7. En la parte inferior escribe un mensaje de commit como `feat: initial commit landing page` y haz clic en **"Commit changes"**.

---

### Opción B: Subir mediante la Terminal / Git CLI

Si tienes Git instalado en tu computadora, abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# 1. Inicializar el repositorio Git
git init

# 2. Agregar todos los archivos preparados
git add .

# 3. Crear el primer commit
git commit -m "feat: initial commit landing page personal"

# 4. Renombrar la rama principal a main
git branch -M main

# 5. Conectar con tu repositorio remoto de GitHub (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# 6. Subir los archivos a GitHub
git push -u origin main
```

---

## 🚀 Cómo Activar GitHub Pages (Sitio Web Gratis y en Vivo)

Una vez que tus archivos estén en GitHub:

1. Ve a la pestaña **Settings** (Configuración) de tu repositorio en GitHub.
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Branch**, selecciona la rama `main` y la carpeta `/(root)`.
4. Haz clic en **Save**.
5. En unos segundos, GitHub te entregará un enlace público en vivo, similar a:
   `https://tu-usuario.github.io/tu-repositorio/`

---

## ✏️ Cómo Personalizar la Información Mock

Para adaptar los datos a tu perfil personal real, edita directamente `index.html`:

- **Tu Nombre y Titular**: Modifica el tag `<title>` y los `<h1>` en la sección `#hero`.
- **Tus Redes Sociales**: Busca los enlaces `https://github.com/tu-usuario` y `https://linkedin.com/in/tu-usuario` y cámbialos por tus perfiles reales.
- **Tu Correo**: Modifica el texto en el elemento con id `user-email-text`.
- **Tus Proyectos Reales**: Puedes cambiar los textos de las tarjetas en la sección `#projects` o editar la variable `projectData` en `js/main.js` para modificar los detalles del modal de arquitectura.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Eres libre de usarlo, modificarlo y compartirlo en tu propio portafolio profesional.
