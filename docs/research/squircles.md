# Investigación Técnica: Squircles (Curvatura Continua G2) y Aplicación en Berbi Music Academy

> Documento de investigación basado en especificaciones oficiales W3C, MDN Web Docs, Chrome Platform Status, Can I Use y repositorios de referencia de geometría Figma/Apple.

---

## 1. Fundamento Matemático y Óptico: G1 vs. G2

El `border-radius` clásico de CSS dibuja **arcos circulares o elípticos**. Geométricamente esto ofrece **continuidad $G^1$** (tangencial): la recta del borde y el arco comparten dirección en el punto de unión, pero su curvatura salta abruptamente de $0$ (línea recta) a $1/r$ (arco circular). Ese salto produce un "pellizco" óptico perceptible al ojo humano en tarjetas grandes, iconos de app y superficies oscuras sobre fondos claros.

Un **squircle** (superelipse) reemplaza el arco circular por una curva con **continuidad $G^2$** (continuidad de curvatura), donde la transición desde el tramo recto hacia la esquina acelera suavemente sin quiebre visual:

$$
\left|\frac{x}{a}\right|^n + \left|\frac{y}{b}\right|^n = 1 \quad (n > 2,\; \text{típicamente } n \approx 4 \text{ o exponente CSS } k = 2)
$$

* En **CSS Level 4**, `superellipse(k)` parametriza la curva mediante $k$ (donde $n = 2^k$): `superellipse(1)` equivale a `round` ($n=2$, círculo clásico) y `superellipse(2)` equivale a la palabra clave `squircle` ($n=4$).
* En **Figma / Apple HIG**, el suavizado de esquinas (*corner smoothing*) se expresa entre `0%` y `100%` (`0` a `1`), siendo `0.6` (`60%`) la aproximación estándar de iOS/macOS, modelada con segmentos cúbicos de Bézier y un tramo circular central para mantener tangencia y curvatura continua.

---

## 2. Comparativa de 3 Enfoques Técnicos en la Web (2025–2026)

| Criterio | 1. CSS Nativo `corner-shape: squircle` | 2. SVG `clip-path` (`figma-squircle` / JS) | 3. SVG `<path>` directo en activos exportables |
| :--- | :--- | :--- | :--- |
| **Estándar / API** | W3C CSS Borders & Box Decorations Level 4 (`corner-shape` + `superellipse()`) | `clip-path: url(#id)` o `clip-path: path(...)` con curvas Bézier calculadas por tamaño | `<path>` superelíptico fijo dentro de `viewBox="0 0 64 64"` |
| **Soporte de navegadores** | **Parcial:** Chrome / Edge / Chromium **139+** y Samsung Internet **30+**. **No soportado aún** en Safari ni Firefox (hacen fallback automático a `border-radius`). | **Universal** en todos los navegadores modernos (Chrome, Safari, Firefox, Edge). | **Universal (100%)** en navegadores, Figma, Canvas PNG y sistemas operativos. |
| **Compatibilidad con `border`, `box-shadow` y `outline`** | **Nativa:** el borde, el fondo, el recorte de hijos y las sombras siguen automáticamente el contorno squircle. | **Limitada:** `clip-path` recorta el `box-shadow` y los `border` CSS internos; obliga a usar wrappers externos con `filter: drop-shadow(...)` o bordes SVG superpuestos. | **N/A** (el propio activo vectorial define su relleno y contorno). |
| **Rendimiento / JS** | **0 KB de JS.** Cero recalculo al cambiar el viewport o el contenido. | Requiere `ResizeObserver` en tarjetas fluidas o responsive para recalcular el `path` cuando cambia `width`/`height` (un `objectBoundingBox` normalizado estira las esquinas de forma no uniforme en tarjetas rectangulares). | **0 KB de JS en runtime** para iconos, avatares y favicons. |

---

## 3. Estrategia Recomendada para *Berbi Music Academy Visual Identity*

Dado el diseño editorial suizo de este Brandbook (construido con **Astro + Tailwind + EmDash**) y las reglas de consistencia de formas del skill `gridlines` (no mezclar dos familias de esquinas en una misma barra de herramientas), la implementación óptima se divide en **3 niveles progresivos**:

### Nivel 1 — Progressive Enhancement Nativo en CSS (0 KB JS, sin romper Safari/Firefox)
Definir utilidades semánticas en `src/index.css` envueltas en `@supports (corner-shape: squircle)`.

> **Nota óptica clave de la especificación:** Un squircle ocupa mayor área visual en las esquinas que un círculo del mismo `border-radius`, por lo que al activar `corner-shape: squircle` conviene multiplicar el radio base por `~1.25–1.35` dentro del bloque `@supports` para conservar el mismo peso visual que el fallback `round`:

```css
.squircle-md {
  border-radius: 12px; /* Fallback limpio en Safari y Firefox */
}

.squircle-lg {
  border-radius: 16px;
}

@supports (corner-shape: squircle) {
  .squircle-md {
    border-radius: 16px;
    corner-shape: squircle;
  }

  .squircle-lg {
    border-radius: 22px;
    corner-shape: squircle;
  }
}
```

**Dónde aplicarlo en este sitio:**
1. **Hero Cover y tarjetas estructurales grandes (`squircle-lg`):** Hero de `FoundationSection`, Showcase de `MarksSection`, tarjetas de swatches de `ColorSection`, tarjetas de `ApplicationsSection` y el modal `CommandPalette`.
2. **Controles y miniaturas (`squircle-md`):** Tiles de `Symbol Geometry` en `BrandEditorDrawer`, cuadrícula 3×3 de `GraphicsSection` y previsualizaciones de `Isotype / Logotype / Profile pictures / Favicons` en `ExportsSection`.
3. **Regla Gridlines:** Aplicar la misma familia de esquina a todos los elementos hermanos dentro de cada contenedor (por ejemplo, todos los botones de `Starting Preset` o todos los cards de `Core palette`).

### Nivel 2 — Squircles Reales y Cross-Browser en Activos Exportables (`ExportsSection` & `assetExport.ts`)
Actualmente, `buildAvatarSvg` en `src/utils/assetExport.ts` genera un cuadrado redondeado simple (`<rect width="64" height="64" rx="12" ... />`).
* Reemplazar ese `<rect rx="12">` por un `<path>` squircle continuo (curvas cúbicas equivalentes a Figma `cornerSmoothing: 0.6` en `64×64`) logra que **todos** los avatares (`Profile pictures`), **Apple Touch Icons (`180px`)**, **PWA Icons (`192px`, `512px`)** y **Favicons** exportados desde el Brandbook sean squircles reales estilo Apple/Figma en el 100% de los dispositivos y navegadores.

### Nivel 3 — Opcional: Token Interactivo en `BrandConfig` y `BrandEditorDrawer`
* Añadir `cornerStyle: 'round' | 'squircle'` a `BrandConfig` (`src/types/brand.ts`) para que el cliente o diseñador pueda conmutar en vivo entre esquinas circulares (`round`) y continuas (`squircle`), exportando el valor en `CSS Tokens` (`--brand-corner-shape: squircle;`) y `JSON Tokens`.

---

## 4. Fuentes Primarias Consultadas

1. **W3C CSS Working Group — CSS Borders and Box Decorations Module Level 4 (`corner-shape` y `superellipse()`):** https://drafts.csswg.org/css-borders-4/#corner-shaping
2. **MDN Web Docs — `corner-shape`:** https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape
3. **MDN Web Docs — `superellipse()`:** https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/superellipse
4. **Can I Use — CSS `corner-shape` browser support:** https://caniuse.com/mdn-css_properties_corner-shape
5. **Chrome Platform Status — CSS `corner-shape` (Chromium 139+):** https://chromestatus.com/feature/5120829755359232
6. **`phamfoo/figma-squircle` (algoritmo de paridad con Figma corner smoothing):** https://github.com/phamfoo/figma-squircle
7. **`msurguy/squircle-path-kit` (generación de paths SVG con precisión subpíxel):** https://github.com/msurguy/squircle-path-kit
8. **`sanalabs/corner-smoothing` (componente React con CSS `clip-path`):** https://github.com/sanalabs/corner-smoothing
