/**
 * main.js - Interactive behaviors for Personal Portfolio
 * Santiago Rivera | Full-Stack Software Engineering Student (Lima, Perú)
 */

document.addEventListener('DOMContentLoaded', () => {
  initLimaClock();
  initTerminalTabs();
  initProjectModals();
  initContactForm();
  initCopyEmail();
  initMobileNav();
});

/* ==========================================================================
   1. Real-Time Lima, Peru Clock (UTC-5)
   ========================================================================== */
function initLimaClock() {
  const clockElement = document.getElementById('lima-time');
  if (!clockElement) return;

  function updateTime() {
    try {
      const options = {
        timeZone: 'America/Lima',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat('es-PE', options);
      clockElement.textContent = formatter.format(new Date());
    } catch {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const limaDate = new Date(utc - (3600000 * 5));
      const pad = (n) => n.toString().padStart(2, '0');
      clockElement.textContent = `${pad(limaDate.getHours())}:${pad(limaDate.getMinutes())}:${pad(limaDate.getSeconds())}`;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. Terminal / Code Preview Tab Switcher
   ========================================================================== */
const codeSnippets = {
  'controller': {
    filename: 'order-service.ts',
    lang: 'typescript',
    code: `<span class="text-blue-400">import</span> { Injectable, Logger } <span class="text-blue-400">from</span> <span class="text-emerald-300">'@nestjs/common'</span>;
<span class="text-blue-400">import</span> { PrismaService } <span class="text-blue-400">from</span> <span class="text-emerald-300">'../prisma.service'</span>;
<span class="text-blue-400">import</span> { RedisCache } <span class="text-blue-400">from</span> <span class="text-emerald-300">'../cache.service'</span>;

@Injectable()
<span class="text-blue-400">export class</span> <span class="text-amber-300">OrderProcessingService</span> {
  <span class="text-blue-400">private readonly</span> logger = <span class="text-blue-400">new</span> Logger(<span class="text-amber-300">OrderProcessingService</span>.name);

  <span class="text-blue-400">constructor</span>(
    <span class="text-blue-400">private</span> db: PrismaService,
    <span class="text-blue-400">private</span> cache: RedisCache,
  ) {}

  <span class="text-blue-400">async</span> <span class="text-amber-300">processCheckout</span>(orderId: <span class="text-purple-300">string</span>, userId: <span class="text-purple-300">string</span>) {
    <span class="text-slate-500">// Idempotency check with Redis (TTL: 10m)</span>
    <span class="text-blue-400">const</span> lockKey = <span class="text-emerald-300">\`order:lock:\${orderId}\`</span>;
    <span class="text-blue-400">const</span> acquired = <span class="text-blue-400">await</span> <span class="text-blue-400">this</span>.cache.setNx(lockKey, <span class="text-emerald-300">'LOCKED'</span>, 600);
    <span class="text-blue-400">if</span> (!acquired) <span class="text-blue-400">throw new</span> Error(<span class="text-emerald-300">'Pedido ya en procesamiento.'</span>);

    <span class="text-slate-500">// Atomic transaction with inventory decrement</span>
    <span class="text-blue-400">return await</span> <span class="text-blue-400">this</span>.db.$transaction(<span class="text-blue-400">async</span> (tx) => {
      <span class="text-blue-400">const</span> order = <span class="text-blue-400">await</span> tx.orders.update({
        where: { id: orderId, status: <span class="text-emerald-300">'PENDING'</span> },
        data: { status: <span class="text-emerald-300">'PAID'</span>, confirmedAt: <span class="text-blue-400">new</span> Date() },
      });
      <span class="text-blue-400">this</span>.logger.log(<span class="text-emerald-300">\`Orden \${orderId} confirmada con éxito.\`</span>);
      <span class="text-blue-400">return</span> { success: <span class="text-purple-300">true</span>, order };
    });
  }
}`
  },
  'schema': {
    filename: 'schema.sql',
    lang: 'sql',
    code: `<span class="text-slate-500">-- Schema relacional optimizado para PostgreSQL</span>
<span class="text-blue-400">CREATE TABLE</span> users (
    id <span class="text-purple-300">UUID PRIMARY KEY DEFAULT</span> gen_random_uuid(),
    email <span class="text-purple-300">VARCHAR(255) UNIQUE NOT NULL</span>,
    password_hash <span class="text-purple-300">TEXT NOT NULL</span>,
    location <span class="text-purple-300">VARCHAR(100) DEFAULT</span> <span class="text-emerald-300">'Lima, PE'</span>,
    created_at <span class="text-purple-300">TIMESTAMPTZ DEFAULT</span> clock_timestamp()
);

<span class="text-blue-400">CREATE TABLE</span> products (
    id <span class="text-purple-300">UUID PRIMARY KEY DEFAULT</span> gen_random_uuid(),
    sku <span class="text-purple-300">VARCHAR(50) UNIQUE NOT NULL</span>,
    name <span class="text-purple-300">VARCHAR(200) NOT NULL</span>,
    price_pen <span class="text-purple-300">NUMERIC(10, 2) NOT NULL CHECK</span> (price_pen > 0),
    stock <span class="text-purple-300">INTEGER NOT NULL DEFAULT</span> 0
);

<span class="text-slate-500">-- Índice B-Tree para búsquedas de alta concurrencia</span>
<span class="text-blue-400">CREATE INDEX</span> idx_orders_user_status <span class="text-blue-400">ON</span> orders(user_id, status);`
  },
  'docker': {
    filename: 'docker-compose.yml',
    lang: 'yaml',
    code: `<span class="text-blue-400">services:</span>
  <span class="text-amber-300">api:</span>
    <span class="text-purple-300">build:</span>
      <span class="text-emerald-300">context:</span> .
      <span class="text-emerald-300">dockerfile:</span> Dockerfile
    <span class="text-purple-300">ports:</span>
      - <span class="text-emerald-300">"3000:3000"</span>
    <span class="text-purple-300">environment:</span>
      - <span class="text-emerald-300">NODE_ENV=production</span>
      - <span class="text-emerald-300">DATABASE_URL=postgresql://postgres:secret@db:5432/app</span>
      - <span class="text-emerald-300">REDIS_URL=redis://cache:6379</span>
    <span class="text-purple-300">depends_on:</span>
      - <span class="text-emerald-300">db</span>
      - <span class="text-emerald-300">cache</span>

  <span class="text-amber-300">db:</span>
    <span class="text-purple-300">image:</span> postgres:16-alpine
    <span class="text-purple-300">volumes:</span>
      - <span class="text-emerald-300">pgdata:/var/lib/postgresql/data</span>

  <span class="text-amber-300">cache:</span>
    <span class="text-purple-300">image:</span> redis:7-alpine`
  }
};

function initTerminalTabs() {
  const tabButtons = document.querySelectorAll('.terminal-tab-btn');
  const codeContainer = document.getElementById('terminal-code-body');
  const filenameLabel = document.getElementById('terminal-filename');

  if (!tabButtons.length || !codeContainer) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabKey = btn.getAttribute('data-tab');
      if (!codeSnippets[tabKey]) return;

      tabButtons.forEach(b => {
        b.classList.remove('bg-slate-800', 'text-white', 'border-b-2', 'border-emerald-400');
        b.classList.add('text-slate-400');
      });

      btn.classList.add('bg-slate-800', 'text-white', 'border-b-2', 'border-emerald-400');
      btn.classList.remove('text-slate-400');

      if (filenameLabel) {
        filenameLabel.textContent = codeSnippets[tabKey].filename;
      }
      codeContainer.innerHTML = codeSnippets[tabKey].code;
    });
  });
}

/* ==========================================================================
   3. Project Details Modal (Mock Architecture Explorer)
   ========================================================================== */
const projectData = {
  'intiramarket': {
    title: 'IntiMarket - Plataforma E-commerce & Facturación',
    tagline: 'Solución integral para mypes con pagos Culqi/Stripe y catálogos en tiempo real.',
    architecture: 'Arquitectura en capas (Clean Architecture) con Next.js 14 en el frontend y un API REST modular en Node.js/Express con TypeScript. Base de datos PostgreSQL con migraciones Prisma y caché Redis para productos frecuentes.',
    challenges: 'Garantizar idempotencia en la pasarela de pagos y evitar sobreventas bajo concurrencia utilizando transacciones ACID y bloqueos optimistas en base de datos.',
    metrics: ['Tiempo de respuesta p95: <110ms', 'Test coverage unitario: 94%', 'Lighthouse Performance: 98/100'],
    stack: ['TypeScript', 'Next.js 14', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'Tailwind CSS'],
    repoUrl: 'https://github.com/tu-usuario/intiramarket-ecommerce',
    liveUrl: 'https://intiramarket-demo.vercel.app'
  },
  'limatransit': {
    title: 'LimaTransit API - Microservicio de Rutas y Tráfico Metropolitano',
    tagline: 'Motor de cálculo de rutas óptimas para el sistema de buses de Lima.',
    architecture: 'Servicio en Go con algoritmo Dijkstra modificado para grafos de transporte urbano. Utiliza PostGIS para consultas geoespaciales avanzadas y Redis para cachear matrices de distancia comunes.',
    challenges: 'Modelar conexiones complejas de líneas y transbordos en horas punta minimizando el uso de memoria RAM a gran escala.',
    metrics: ['Throughput: 8,500 req/sec en cluster local', 'Consumo de memoria: <45MB en reposo', 'Documentación OpenAPI / Swagger al 100%'],
    stack: ['Go (Golang)', 'PostgreSQL / PostGIS', 'Redis', 'Docker Compose', 'GitHub Actions CI/CD'],
    repoUrl: 'https://github.com/tu-usuario/limatransit-core-api',
    liveUrl: 'https://limatransit-api.onrender.com/docs'
  },
  'devpulse': {
    title: 'DevPulse CLI - Auditor de Git y Calidad de Código',
    tagline: 'Herramienta de terminal para desarrolladores que audita métricas de commits y salud de repositorios.',
    architecture: 'CLI interactivo escrito en TypeScript ejecutable vía npx o binario standalone. Se conecta a la API GraphQL de GitHub y procesa historiales de commits locales usando streams.',
    challenges: 'Procesar repositorios con más de 10,000 commits en menos de 3 segundos sin saturar el garbage collector de V8.',
    metrics: ['Descargas simuladas: 1.2k/mes', 'Tiempo de análisis: 1.8s para 5k commits', 'Compatibilidad multiplataforma: Linux, macOS y Windows'],
    stack: ['TypeScript', 'Node.js CLI', 'GitHub GraphQL API', 'Chalk / Inquirer', 'Jest'],
    repoUrl: 'https://github.com/tu-usuario/devpulse-git-cli',
    liveUrl: 'https://www.npmjs.com/package/devpulse-cli'
  },
  'fintrack': {
    title: 'FinTrack PE - Dashboard Financiero Personal',
    tagline: 'Control de presupuestos con sincronización del tipo de cambio SUNAT en tiempo real.',
    architecture: 'Single Page Application con arquitectura basada en componentes reactivos y un backend serverless que consume la API de SUNAT diariamente a las 09:00 PET, persistiendo tipos de cambio históricos.',
    challenges: 'Diseño accesible y visualización de datos con gráficos de alto rendimiento sin librerías pesadas bloqueantes.',
    metrics: ['Carga inicial del bundle: <38KB gzip', 'Soporte offline completo con PWA Service Worker', '100% accesible (WCAG AA)'],
    stack: ['JavaScript (ES Modules)', 'Tailwind CSS', 'Chart.js micro', 'FastAPI (Python)', 'SQLite / Turso'],
    repoUrl: 'https://github.com/tu-usuario/fintrack-peru',
    liveUrl: 'https://fintrack-pe.web.app'
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-tagline').textContent = data.tagline;
    document.getElementById('modal-architecture').textContent = data.architecture;
    document.getElementById('modal-challenges').textContent = data.challenges;

    // Metrics list
    const metricsContainer = document.getElementById('modal-metrics');
    metricsContainer.innerHTML = '';
    data.metrics.forEach(metric => {
      const li = document.createElement('li');
      li.className = 'flex items-center text-sm text-slate-300';
      li.innerHTML = `<svg class="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${metric}`;
      metricsContainer.appendChild(li);
    });

    // Tech badges
    const stackContainer = document.getElementById('modal-stack');
    stackContainer.innerHTML = '';
    data.stack.forEach(tech => {
      const span = document.createElement('span');
      span.className = 'px-2.5 py-1 text-xs font-medium rounded bg-slate-800 text-slate-200 border border-slate-700';
      span.textContent = tech;
      stackContainer.appendChild(span);
    });

    // Links
    document.getElementById('modal-repo-link').setAttribute('href', data.repoUrl);
    document.getElementById('modal-live-link').setAttribute('href', data.liveUrl);

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. Contact Form Simulation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('toast-notification');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !toast) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Enviando mensaje...
      `;
    }

    setTimeout(() => {
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Enviar Mensaje`;
      }

      toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      }, 5000);
    }, 900);
  });
}

/* ==========================================================================
   5. Copy Email Helper
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('user-email-text');
  const copyStatus = document.getElementById('copy-status');

  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(textToCopy);
      if (copyStatus) {
        copyStatus.textContent = '¡Copiado!';
        copyStatus.classList.remove('hidden');
        setTimeout(() => {
          copyStatus.classList.add('hidden');
        }, 2000);
      }
    } catch {
      alert(`Correo para copiar: ${textToCopy}`);
    }
  });
}

/* ==========================================================================
   6. Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}
