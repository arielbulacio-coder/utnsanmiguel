# Guía de Desarrollo Guiado por Especificaciones (Spec-Driven Development - SDD)

Esta guía establece el flujo de trabajo para trabajar con el enfoque Spec-Driven Development (SDD) en nuestro proyecto. El objetivo principal de SDD es definir de forma clara y sin ambigüedades qué se debe construir *antes* de escribir una sola línea de código.

## 1. ¿Qué es SDD?
El Desarrollo Guiado por Especificaciones es una metodología donde el desarrollo de software comienza con la creación de una especificación detallada. Esta especificación actúa como un contrato técnico y funcional entre los desarrolladores, diseñadores y stakeholders. 

Al escribir primero las especificaciones, nos aseguramos de resolver los problemas de diseño y arquitectura en papel (o markdown) antes de invertir tiempo programando.

## 2. Flujo de Trabajo (Workflow)

El ciclo de vida de una nueva característica (feature) bajo el enfoque SDD consta de los siguientes pasos:

### Paso 1: Fase de Especificación (Design & Spec)
- Antes de programar, un desarrollador o líder técnico debe crear un documento de especificación usando la [Plantilla de Especificación](PLANTILLA_ESPECIFICACION.md).
- Este documento debe detallar: el problema, la solución propuesta, los criterios de aceptación, el impacto en la interfaz de usuario (UI) y las consideraciones técnicas (APIs, estado de React, nuevos componentes, dependencias).
- La especificación se guarda en la carpeta `docs/specs/` con estado "Borrador".

### Paso 2: Fase de Revisión (Review)
- El equipo revisa la especificación.
- Se discuten posibles casos borde (edge cases), viabilidad técnica y se refina el diseño.
- Una vez aprobada, el estado cambia a "Aprobado" y se considera lista para el desarrollo.

### Paso 3: Fase de Desarrollo (Implementation)
- El desarrollador escribe el código *estrictamente* basado en la especificación aprobada.
- Si durante el desarrollo surgen problemas imprevistos que obligan a cambiar el plan, **se debe actualizar primero la especificación** y comunicar el cambio, en lugar de improvisar en el código.

### Paso 4: Fase de Pruebas y Aprobación (Testing & QA)
- Las pruebas y la revisión de código (Code Review / Pull Request) se evalúan utilizando los *Criterios de Aceptación* definidos en la especificación.
- Si la implementación cumple con todos los criterios y pasa las pruebas, la característica se da por terminada.

## 3. Beneficios para nuestro proyecto (React + Vite)
- **Componentes mejor estructurados:** Al planificar el estado (useState, useEffect, Context) y las `props` antes de codificar, evitamos refactorizaciones dolorosas.
- **Mejor estimación de tiempos:** Saber exactamente qué componentes y endpoints se necesitan permite estimar el esfuerzo con mayor precisión.
- **Reducción de errores lógicos:** Pensar en los casos borde antes de codificar previene muchos bugs.
- **Documentación viva:** Las especificaciones sirven como documentación histórica de por qué se tomaron ciertas decisiones técnicas.

## 4. Estructura de Directorios
Recomendamos mantener todas las especificaciones organizadas en una carpeta dedicada:

```text
/
├── docs/
│   ├── sdd/
│   │   ├── GUIA_SDD.md                   <-- Esta guía
│   │   ├── PLANTILLA_ESPECIFICACION.md   <-- Plantilla de Especificación (Lógica y Requisitos)
│   │   ├── PLANTILLA_DISENO.md           <-- Plantilla de Diseño (UI/UX y Componentes)
│   │   ├── PLANTILLA_TAREA.md            <-- Plantilla para Tickets/Tareas
│   │   └── PLANTILLA_EJECUCION.md        <-- Plantilla de Bitácora para el Desarrollador
│   └── specs/
│       ├── 001-autenticacion-usuarios.md
│       ├── 002-dashboard-analiticas.md
│       └── ...
```
