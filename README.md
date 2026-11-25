# Berbi Music Academy — Visual Identity

Manual de identidad visual vivo (**Live Brand Guidelines / Brandbook**) de **Berbi Music Academy**, construido sobre **Astro + EmDash CMS** (SQLite + almacenamiento local en Node.js, listo para desplegar en Cloudflare D1/R2).

## Arquitectura

- **Frontend / Brandbook vivo:** [`src/pages/index.astro`](src/pages/index.astro) carga los ajustes de marca en tiempo de petición mediante [`src/lib/emdashBrandLoader.ts`](src/lib/emdashBrandLoader.ts) e hidrata la experiencia interactiva [`src/components/BrandbookApp.tsx`](src/components/BrandbookApp.tsx).
- **CMS EmDash (`/_emdash/admin/`):** Panel de administración real integrado en el sidebar (`← Admin panel`) con autenticación Passkey, Media Library local (`./uploads`), base SQLite (`./data.db`) y soporte MCP nativo.
- **Configuración de identidad:** [`src/config/brand.config.ts`](src/config/brand.config.ts) y [`src/config/presets.ts`](src/config/presets.ts) (`BERBI_PRESET`, `EDITORIAL_PRESET` y `EXPRESSIVE_PRESET`).

## Comandos

```bash
npm run dev       # Inicia Astro + EmDash en http://localhost:4321
npm test          # Ejecuta pruebas unitarias (colorMath y assetExport)
npm run build     # Compila el servidor SSR de Astro + EmDash
npm run typecheck # Verifica tipos con astro check
```

## Cómo adaptarlo a un nuevo cliente

1. **Desde el CMS (`/_emdash/admin/`):** Abre `http://localhost:4321/_emdash/admin/`, completa el asistente inicial (passkey) y edita el título/tagline del sitio o sube recursos multimedia.
2. **Desde el editor visual (`Customize brand`):** Ajusta nombre, símbolo, colores hexadecimales o cambia de preset al instante y descarga `brand.config.json`.
3. **Desde código:** Reemplaza [`src/config/brand.config.ts`](src/config/brand.config.ts) con los tokens de la nueva marca.

## Despliegue en producción (Cloudflare Workers)

Cambia `@astrojs/node` por `@astrojs/cloudflare` y `sqlite()` / `local()` por `d1()` / `r2()` en [`astro.config.mjs`](astro.config.mjs).

## Política de Alineación (Gridlines — 2026-11-25)

Líneas verticales canónicas registradas tras la auditoría con el skill `gridlines` (tolerancia `≤ 1px`):

- **Sidebar desktop/móvil (`248px` / `256px`):**
  - **Box line:** `12px` (`px-3` en contenedor, `px-2.5` en filas; controles con borde de `1px` usan `px-[9px]`).
  - **Icon column:** `22px` inicio / `32px` centro (`w-5` centrado) para marca, acciones, indicador activo de navegación y utilidades inferiores.
  - **Label line:** `52px` (`gap-2.5` después de `w-5`).
  - **Section headers:** `22px` (alineados al borde inicial de la columna de iconos).
  - **Trailing centre:** `35px` desde el borde derecho (`w-6` centrado).
- **Header móvil (`390px`):** márgenes de `20px` (`px-5`), botón de menú con compensación `-ml-1.5` para alinear el icono al margen del contenido y controles derechos uniformes de `32px` (`h-8`).
- **Command Palette (`⌘K`):** columna de iconos centrada a `30–31px`, línea de texto a `52–53px` y columna derecha (`X` / `→`) centrada a `30–31px` del borde derecho.
- **Drawer Editor (`448px`):** margen base `24px` (`p-6`) y botón de cierre con compensación `-mr-1.5`.
- **Tarjetas de Tipografía (`Type system`):** estructura uniforme en 4 bandas horizontales (`Band 1` rol/pesos `h-5`, `Band 2` nombre `h-9`, `Band 3` caja espécimen apilada sin desbordamiento, `Band 4` descripción alineada en el mismo eje Y) en `1440px` y `390px`.
- **Geometría de esquinas (Squircles G2):** clases `.squircle-sm` / `.squircle-md` / `.squircle-lg` con `corner-shape: squircle` bajo `@supports`, fallback circular homogéneo por contenedor, y exportación vectorial `<path>` en avatares/favicons (`buildAvatarSvg`). Documentado en [`docs/research/squircles.md`](docs/research/squircles.md).
