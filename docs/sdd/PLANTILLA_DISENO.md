# Documento de Diseño: [Nombre del Módulo o Pantalla]

**Diseñador / Front-end:** [Tu Nombre]
**Fecha:** [YYYY-MM-DD]
**Especificación Relacionada:** [Enlace a la especificación funcional, ej. ../specs/001-autenticacion.md]

## 1. Propósito del Diseño
*¿Qué problema visual, de experiencia de usuario (UX) o de arquitectura de interfaz estamos resolviendo aquí?*

## 2. Referencias Visuales y Assets
*Enlaces a las herramientas de diseño (Figma, Adobe XD, Penpot) o imágenes de referencia.*
- **Enlace a Maqueta (Mockup):** [URL del diseño]
- **Paleta de Colores Específica:** Primario (#HEX), Secundario (#HEX) (Si difiere o extiende el theme base).
- **Iconografía:** [Librería de iconos a usar, ej. Lucide-React].
- **Assets (Imágenes/Logos):** Dónde se encuentran (ej. carpeta `/public/assets/`).

## 3. Jerarquía y Estructura de Componentes
*Dibuja o lista cómo se van a estructurar los componentes de React visualmente. Esto ayuda a identificar qué componentes pueden ser reutilizables (Smart vs Dumb components).*

```text
- Página [NombrePágina]
  ├── HeaderPrincipal
  ├── ContenedorFormulario
  │   ├── CampoTexto (Reutilizable)
  │   ├── CampoPassword (Reutilizable)
  │   └── BotonPrimario (Reutilizable)
  └── Footer
```

## 4. Estados de la Interfaz (UI States)
*Es crucial definir cómo se verá la interfaz bajo diferentes situaciones.*
- **Estado Ideal (Happy Path):** Los datos cargaron perfectamente. ¿Cómo se ve la pantalla?
- **Estado de Carga (Loading):** ¿Usaremos un spinner global, skeletons locales o barra de progreso?
- **Estado Vacío (Empty State):** ¿Qué mostramos si no hay elementos en la lista (ej. "Aún no tienes tareas")?
- **Estado de Error:** ¿Cómo mostramos errores de validación o fallas de red (ej. Toast, texto rojo bajo el input)?

## 5. Comportamiento Responsivo (Responsive Design)
*Cómo se adapta la estructura según el dispositivo.*
- **Mobile (hasta 768px):** Ej. "El menú lateral se convierte en un menú hamburguesa. Los elementos van en 1 columna."
- **Tablet (768px - 1024px):** Ej. "Las tarjetas se acomodan en 2 columnas."
- **Desktop (>1024px):** Ej. "El menú lateral está siempre visible. Las tarjetas en 3 columnas."

## 6. Animaciones y Microinteracciones
*Detalles sobre cómo debe 'sentirse' la aplicación para dar una experiencia premium.*
- **Transiciones de Ruta:** ¿Hay fade-in al cambiar de página?
- **Interacciones de Botones (Hover/Active):** Cambio de sombra, escalado (ej. `framer-motion` scale 1.05).
- **Aparición de Modales:** Animación desde abajo (slide-up) o aparición gradual (opacity).
