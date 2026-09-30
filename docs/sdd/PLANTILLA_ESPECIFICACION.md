# [Nombre de la Característica / Feature]

**Estado:** [Borrador | En Revisión | Aprobado | Implementado]
**Autor:** [Tu Nombre]
**Fecha:** [YYYY-MM-DD]

## 1. Resumen (Overview)
¿Cuál es el problema que estamos resolviendo o el valor que estamos aportando? Describe la característica de forma clara y concisa en 1 o 2 párrafos.

## 2. Objetivos y Casos de Uso (Goals & Use Cases)
*Enumera las acciones principales que los usuarios podrán realizar o los objetivos de negocio de esta característica.*
- [ ] El usuario debe poder...
- [ ] El sistema debe calcular o responder con...

## 3. Interfaz de Usuario y Experiencia (UI/UX)
*Describe los cambios visuales. Si es posible, incluye enlaces a Figma, capturas de pantalla de referencia, wireframes o describe el flujo de pantallas.*
- **Nuevas pantallas/rutas:** `/nueva-ruta`
- **Componentes afectados:** 
  - `Navbar`: Agregar nuevo botón de acceso.
  - `ModalConfirmacion` (Nuevo): Modal para confirmar la acción.

## 4. Diseño Técnico (Technical Design)
*Cómo se va a implementar a nivel de código en nuestro entorno de React.*

### 4.1. Estado y Datos (State & Data)
- **Estado de React:** ¿Qué variables de estado (`useState`, Context, Zustand/Redux) se necesitan y dónde van a vivir?
- **Estructura de Datos:** Formato de los objetos principales involucrados.
- **Endpoints / APIs:** ¿Qué peticiones de red se van a realizar?
  - `GET /api/recurso` -> Retorna la lista de recursos.
  - `POST /api/recurso` -> Crea un nuevo recurso. Payload: `{ nombre: string }`

### 4.2. Arquitectura de Componentes
*Lista los componentes principales que se crearán o modificarán, y cuáles serán sus responsabilidades.*
- `[NombreComponente].jsx`:
  - **Propósito:** Mostrar la lista de ítems.
  - **Props:** `{ items: Array, onSelect: function }`

### 4.3. Dependencias
- ¿Se necesita instalar alguna nueva librería (ej. `npm install react-chartjs-2`)?

## 5. Casos Borde y Consideraciones (Edge Cases)
*Piensa en lo que podría salir mal y cómo el sistema debe manejarlo.*
- ¿Qué pasa si la llamada a la API falla o tarda mucho tiempo? (Manejo de errores y loading states)
- ¿Qué pasa si el usuario no tiene permisos para realizar la acción?
- ¿Qué ocurre si la lista de datos a renderizar está vacía?

## 6. Criterios de Aceptación (Acceptance Criteria)
*Una lista de verificación (checklist) estricta que define cuándo esta característica está completamente terminada. Debe poder ser validada por alguien de QA o por otro desarrollador.*
- [ ] Si el usuario hace clic en el botón X, se abre el modal Y.
- [ ] Al guardar los datos, si hay éxito, se muestra una notificación verde y la lista se actualiza.
- [ ] Si la API devuelve un error 500, se muestra un mensaje de "Intente nuevamente más tarde".
- [ ] El diseño se ve correctamente en dispositivos móviles (responsive).

## 7. Plan de Pruebas (Testing Strategy)
- *Opcional:* ¿Se requieren pruebas unitarias específicas (ej. para funciones de cálculo complejas)?
- Puntos críticos a revisar manualmente antes de fusionar el código (merge).
