# Tutorial: Metodología SDD y GitHub Spec Kit en Antigravity (Curso React Native)

Este tutorial está diseñado como un anexo para el **Curso de React Native**, con el fin de enseñar a los estudiantes cómo aplicar la metodología de Desarrollo Guiado por Especificaciones (SDD) utilizando herramientas modernas impulsadas por IA, específicamente **Antigravity** (Gemini) y **GitHub Spec Kit**.

---

## 1. ¿Qué es la metodología SDD?

El **Desarrollo Guiado por Especificaciones (Spec-Driven Development - SDD)** es una metodología ágil donde el desarrollo de código no comienza hasta que existe una especificación funcional y técnica detallada. 

En el contexto de trabajar con Agentes de IA (como Antigravity), el SDD evita el desarrollo a ciegas ("vibe coding"). En lugar de darle instrucciones ambiguas a la IA y esperar que adivine la arquitectura de tu app en React Native, tú le provees una especificación estricta. La IA asume el rol de un programador riguroso que sigue el plan al pie de la letra.

### Ventajas en React Native:
- Definición temprana del árbol de componentes, estado (Zustand/Redux/Context) y navegación (React Navigation).
- Reducción drástica de "alucinaciones" de la IA y refactorizaciones innecesarias.
- Generación de código que respeta las interfaces (Props y Tipos) previamente acordadas.

---

## 2. Instalación de GitHub Spec Kit en Antigravity

**GitHub Spec Kit** (`specify-cli`) es una herramienta de línea de comandos oficial que inyecta la metodología SDD en agentes como Antigravity (Gemini). Automatiza la creación de reglas (constitution), planes técnicos y división de tareas.

### Paso a Paso para la Instalación en Windows / Antigravity

1. **Instalar el gestor de paquetes `uv`**
   `uv` es un gestor de dependencias de Python ultra rápido (creado en Rust) que Spec Kit utiliza para su distribución.
   Abre una terminal (PowerShell) dentro de tu entorno de Antigravity y ejecuta:
   ```powershell
   pip install uv
   # Si prefieres la instalación directa de uv (recomendado):
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

2. **Instalar el CLI de Spec Kit**
   Una vez que `uv` esté instalado, utilízalo para instalar el ejecutable global de Spec Kit:
   ```powershell
   uv tool install specify-cli
   ```
   *(Nota: Asegúrate de que la ruta que indique `uv` al finalizar esté agregada a tu variable de entorno PATH, usualmente `C:\Users\TU_USUARIO\.local\bin`).*

3. **Inicializar el proyecto con Gemini**
   Navega a la carpeta de tu proyecto React Native en la terminal y ejecuta la inicialización forzando el uso de Gemini como agente (que es el motor de Antigravity):
   ```powershell
   specify init . --integration gemini
   ```
   *Si experimentas problemas porque el instalador no detecta el agente, puedes saltar la verificación con:*
   ```powershell
   specify init . --ignore-agent-tools --integration gemini
   ```

---

## 3. Flujo de Trabajo (Workflow) con Slash Commands

Tras la instalación, el Spec Kit genera comandos integrados en el chat de tu IDE (Antigravity). El flujo recomendado en tu día a día es el siguiente:

1. **/speckit.constitution**: Úsalo al inicio del proyecto para que la IA entienda tus estándares (por ej. usar React Functional Components, Tailwind, Axios, etc.).
2. **/speckit.specify**: Crea el documento inicial de requerimientos (puedes basarte en la `PLANTILLA_ESPECIFICACION.md`).
3. **/speckit.plan**: La IA tomará la especificación y generará la arquitectura (componentes a crear y modificar).
4. **/speckit.tasks**: Divide el plan en tareas atómicas ejecutables.
5. **/speckit.implement**: Le ordenas al agente que ejecute y programe una tarea en específico.

---

## 4. Bibliografía y Recursos Oficiales

Para profundizar en estas herramientas y metodologías, se recomienda consultar la documentación oficial:

- **Repositorio Oficial de GitHub Spec Kit:** 
  [https://github.com/github/spec-kit](https://github.com/github/spec-kit)
- **Documentación de astral-sh/uv:** 
  [https://docs.astral.sh/uv/](https://docs.astral.sh/uv/)
- **Metodología SDD en flujos de IA (Artículo introductorio):**
  [GitHub Blog: AI code generation and SDD](https://github.blog/)
- **Documentación de React Native:**
  [https://reactnative.dev/docs/getting-started](https://reactnative.dev/docs/getting-started)
