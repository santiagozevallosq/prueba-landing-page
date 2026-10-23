---
name: Engineering Slate
description: "Estética técnica editorial contemporánea para landing page personal de ingeniería de software en Lima, Perú"
colors:
  obsidian-ground: "#0b0f17"
  panel-surface: "#111827"
  panel-elevated: "#1a2234"
  border-subtle: "#1f293d"
  border-hover: "#334155"
  emerald-compile: "#10b981"
  emerald-dim: "rgba(16, 185, 129, 0.12)"
  sapphire-interactive: "#3b82f6"
  text-primary: "#f8fafc"
  text-secondary: "#94a3b8"
  text-muted: "#64748b"
  modal-backdrop: "rgba(5, 8, 14, 0.85)"
typography:
  display:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 2vw, 1.45rem)"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Sora, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.emerald-compile}"
    textColor: "#022c22"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "#1e293b"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
---

# Design System: Engineering Slate

## Overview

Una presencia técnica editorial contemporánea diseñada para comunicar rigor técnico, claridad arquitectónica y atención al detalle para un estudiante de programación de Lima, Perú. Se desmarca frontalmente de las plantillas genéricas sobrecargadas con degradados violeta o ilustraciones prediseñadas; en su lugar, prioriza la tipografía geométrica estructurada (Sora), código tipografiado con precisión monospaciada (JetBrains Mono), alto contraste (WCAG AA) y retroalimentación interactiva sobria.

## Colors

- **Obsidian Ground (`#0b0f17`)**: Lienzo base profundo que reduce la fatiga visual y establece una atmósfera nocturna técnica.
- **Panel Surface (`#111827`) & Elevated (`#1a2234`)**: Capas tonales para tarjetas, bloques de navegación y contenedores interactivos.
- **Border Subtle (`#1f293d`) & Hover (`#334155`)**: Separadores de 1px con contraste exacto para definir bordes sin saturar.
- **Emerald Compile (`#10b981`)**: Acento de éxito, estado de disponibilidad en vivo y llamadas a la acción principales.
- **Sapphire Interactive (`#3b82f6`)**: Acento secundario para enlaces, estados activos y badges de arquitectura.
- **Text Primary (`#f8fafc`) & Secondary (`#94a3b8`)**: Texto de alto contraste (≥4.5:1 contra el fondo) para lectura cómoda y fluida.

## Typography

- **Voz principal**: `Sora`, elegida por su geometría clara, legibilidad en pantallas retina y carácter técnico contemporáneo.
- **Voz de código & datos**: `JetBrains Mono`, empleada en fragmentos de código, tags tecnológicos, zona horaria y métricas de rendimiento.
- **Escala**: Escalado tipográfico pronunciado con ratios visuales definidos (`clamp()` fluido para h1 y h2) evitando jerarquías planas.

## Layout

- Contenedor principal centrado a `max-w-7xl` con gutters laterales fluidos (`px-4 sm:px-6 lg:px-8`).
- Cuadrícula asimétrica en el Hero (7 columnas para narrativa técnica / 5 columnas para la terminal de código interactiva).
- Separación generosa entre bloques (`py-20`), asegurando que cada sección mantenga un ritmo respirable y enfocado.

## Elevation & Depth

- Basado en estratificación tonal (`#0b0f17` -> `#111827` -> `#1e293b`) y bordes de 1px, evitando sombras falsas neobrutalistas o halos difusos.
- La ventana terminal utiliza una sombra de elevación suave con difuminado profundo (`box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7)`).

## Shapes

- Esquinas suavemente redondeadas (`rounded-lg` / 8px y `rounded-xl` / 12px) para paneles de contenido y tarjetas de proyectos.
- Badges con radio reducido (`rounded` / 4px) para una apariencia nítida de microetiquetas técnicas.

## Components

- **Barra de navegación**: Sticky superior con efecto translúcido sutil (`backdrop-blur-md`), reloj en vivo de Lima (`America/Lima`) y badge de disponibilidad con animación de pulso.
- **Terminal interactiva**: Contenedor de código con tabs funcionales para visualizar servicios backend, schemas SQL y configs Docker.
- **Tarjetas de proyectos**: Paneles con elevación reactiva (`hover:border-blue-500 hover:-translate-y-0.5`), tags técnicos monospaciados y botón de apertura modal para ver métricas completas.
- **Modal de arquitectura**: Drawer/dialog accesible centrado con blur oscuro, tecla Escape para cerrar y visualización profunda de retos técnicos.
- **Formulario de contacto interactivo**: Campos validados con `focus-visible` tematizado en esmeralda, estado de carga simulado y toast de confirmación flotante.

## Do's and Don'ts

### Do's
- Mantener siempre contraste estricto (≥4.5:1 en texto regular, ≥3:1 en títulos grandes).
- Utilizar iconos SVG con trazos uniformes y consistentes.
- Tematizar las superficies del navegador (`::selection`, scrollbars, focus rings y caret).
- Mantener nombres y métricas realistas en proyectos y ejemplos de código.

### Don'ts
- No utilizar texto con gradientes decorativos (`bg-clip-text text-transparent`).
- No colocar etiquetas "eyebrow" o "kickers" genéricos sobre los encabezados h1/h2.
- No emplear sombras duras con desplazamiento cero (`box-shadow: 4px 4px 0`) ni efectos de neón excesivos.
- No usar emojis como sustitutos de iconos de interfaz.
