/**
 * Banco oficial de 100 Preguntas de Evaluación Teórica Integral
 * Curso: Creación de Aplicaciones Móviles con React Native & Expo
 * Universidad Nacional de Pilar - Tecnicatura Universitaria en Desarrollo de Software
 * Cátedra: Lic. Ariel Bulacio
 *
 * Estructura de cada ítem:
 * - id: Identificador único (1 al 100)
 * - unit: Unidad temática del programa analítico
 * - q: Enunciado de la pregunta teórica
 * - opts: Array con las 4 opciones de respuesta
 * - a: Índice de la opción correcta (0-3) en el array base (se desordena dinámicamente)
 * - exp: Justificación pedagógica profunda del concepto evaluado
 */

export const reactNativeExamQuestions = [
  // =========================================================================
  // UNIDAD 1.1: FUNDAMENTOS, ARQUITECTURA Y ENTORNO (Preguntas 1 a 10)
  // =========================================================================
  {
    id: 1,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: '¿Cuál es la diferencia fundamental entre el flujo administrado (Managed Workflow) de Expo y React Native CLI tradicional?',
    opts: [
      'Expo Managed gestiona el código nativo (Android/iOS) automáticamente sin necesidad de Xcode o Android Studio directos, mientras que RN CLI exige configurar y compilar ambos entornos nativos manualmente.',
      'React Native CLI compila a HTML5 y CSS3 nativo mientras que Expo solo funciona dentro de un WebView simulado.',
      'Expo Managed no permite escribir código JavaScript ni TypeScript, obligando a programar exclusivamente en Kotlin y Swift.',
      'RN CLI solo permite desplegar aplicaciones en Android, mientras que Expo está restringido únicamente al sistema operativo iOS.'
    ],
    a: 0,
    exp: 'El flujo administrado de Expo abstrae por completo las carpetas /android y /ios, permitiendo desarrollar con JavaScript/TypeScript puro y compilar en la nube con EAS Build, mientras que RN CLI requiere administrar directamente los proyectos nativos en Xcode y Android Studio.'
  },
  {
    id: 2,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: 'En la arquitectura tradicional de React Native, ¿cómo se comunican el hilo de JavaScript y el hilo nativo de la plataforma?',
    opts: [
      'A través del "Bridge" (Puente), un canal asíncrono que serializa y deserializa mensajes estructurados en formato JSON.',
      'Mediante acceso directo a memoria compartida a través de punteros de C++ sin serialización.',
      'A través de llamadas síncronas HTTP REST ejecutadas en el puerto local 8080 del dispositivo.',
      'Utilizando un WebSocket bidireccional constante conectado a los servidores centrales de Meta.'
    ],
    a: 0,
    exp: 'El Bridge clásico comunica JavaScript y Native mediante un bus asíncrono, por lotes y serializado en strings JSON, lo que en animaciones complejas o desplazamientos de listas de alta velocidad generaba cuellos de botella de rendimiento.'
  },
  {
    id: 3,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: '¿Qué componente clave introduce la Nueva Arquitectura (New Architecture) de React Native para eliminar el cuello de botella del Bridge?',
    opts: [
      'JavaScript Interface (JSI), que permite a JavaScript mantener referencias directas a objetos de C++ nativos e invocar sus métodos sincrónicamente.',
      'Un servidor Node.js embebido dentro del chip de la tarjeta gráfica (GPU).',
      'Un transpilador que convierte el código JSX en archivos binarios ensamblador x86_64 en tiempo real.',
      'La sustitución del motor nativo de Android por una máquina virtual Java exclusiva de Google Chrome.'
    ],
    a: 0,
    exp: 'JSI (JavaScript Interface) desacopla a React Native del Bridge tradicional. Permite que el motor JS invoque métodos C++ nativos de manera directa y síncrona sin sobrecarga de serialización JSON.'
  },
  {
    id: 4,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: 'En la Nueva Arquitectura de React Native, ¿cuál es la función de "Fabric"?',
    opts: [
      'Es el nuevo sistema de renderizado que unifica la gestión de la UI en C++, habilitando renderizado concurrente y medición de layouts síncrona.',
      'Es una biblioteca para coser componentes gráficos con texturas de tela en interfaces 3D.',
      'Es el servidor de emulación remota que reemplaza a Expo Go en dispositivos físicos.',
      'Es el compilador que transforma archivos TypeScript en archivos de base de datos SQLite.'
    ],
    a: 0,
    exp: 'Fabric es el motor de renderizado de la Nueva Arquitectura. Al operar sobre C++ y JSI, permite que React gestione los árboles de vistas con renderizado concurrente y elimine los parpadeos visuales en interfaces complejas.'
  },
  {
    id: 5,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: '¿Qué ventaja proporcionan los "TurboModules" frente a los Native Modules tradicionales de React Native?',
    opts: [
      'Cargan los módulos nativos de forma perezosa (lazy loading) solo cuando la aplicación los solicita, reduciendo el tiempo de inicio (TTV).',
      'Aumentan la frecuencia de reloj del procesador del teléfono al abrir la aplicación.',
      'Permiten usar librerías nativas sin necesidad de compilar la aplicación móvil.',
      'Duplican la memoria RAM disponible en el dispositivo mediante compresión por hardware.'
    ],
    a: 0,
    exp: 'A diferencia del modelo previo donde todos los módulos nativos se inicializaban obligatoriamente al arrancar la app, TurboModules se instancian bajo demanda (on-demand) vía JSI, optimizando drásticamente el arranque.'
  },
  {
    id: 6,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: '¿Por qué el motor JavaScript "Hermes", desarrollado por Meta, está optimizado específicamente para React Native en dispositivos móviles?',
    opts: [
      'Porque compila el código JavaScript a bytecode anticipadamente (AOT) durante el build, optimizando el tiempo de inicio, memoria y tamaño del APK.',
      'Porque incluye un motor de renderizado HTML5 más potente que el de Safari.',
      'Porque permite ejecutar aplicaciones de React Native sin instalar ningún motor en el sistema operativo.',
      'Porque sustituye el sistema de tipado de TypeScript por un compilador de lenguaje C puro.'
    ],
    a: 0,
    exp: 'Hermes compila JavaScript a bytecode optimizado en tiempo de compilación (Ahead-Of-Time compilation), eliminando la necesidad de parsear y compilar código en el dispositivo al iniciar la aplicación.'
  },
  {
    id: 7,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: '¿Cuál es la principal limitación que un desarrollador debe tener en cuenta al utilizar la aplicación de cliente móvil "Expo Go"?',
    opts: [
      'No permite ejecutar librerías de terceros que requieran código nativo personalizado (Kotlin/Swift) fuera del SDK base de Expo sin generar una Development Build.',
      'No permite mostrar imágenes en formato PNG ni reproducir tipografías personalizadas.',
      'Solo funciona cuando el teléfono está conectado mediante un cable USB físico a la computadora.',
      'Caduca automáticamente a los 5 minutos de uso continuo por restricciones de licencia de Apple.'
    ],
    a: 0,
    exp: 'Expo Go contiene un conjunto cerrado de módulos nativos preinstalados. Si se requiere una biblioteca con código nativo personalizado (como Bluetooth avanzado o SDKs propietarios), se debe generar una Development Build con `expo-dev-client`.'
  },
  {
    id: 8,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: '¿Qué comando de Expo permite generar y acceder explícitamente a las carpetas nativas `/android` e `/ios` manteniendo los beneficios de configuración continua?',
    opts: [
      'npx expo prebuild',
      'npx expo eject --force-destroy',
      'npx react-native create-native-folders',
      'npm run compile-system-core'
    ],
    a: 0,
    exp: '`npx expo prebuild` ejecuta el sistema de Continuous Native Generation (CNG), evaluando el archivo `app.json` y los Config Plugins para sintetizar de forma determinista las carpetas nativas `/android` e `/ios`.'
  },
  {
    id: 9,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: 'En el modelo de diseño de React Native, ¿en qué unidades de medida se expresan numéricamente los anchos, márgenes y paddings en los estilos?',
    opts: [
      'En puntos independientes de densidad (dp en Android, pt en iOS), escalados automáticamente según la densidad de píxeles del dispositivo.',
      'Exclusivamente en píxeles físicos de hardware de la pantalla (px).',
      'En centímetros y milímetros relativos calculados según el sensor acelerómetro.',
      'En porcentajes fijos respecto a la resolución estándar 1920x1080.'
    ],
    a: 0,
    exp: 'Los valores numéricos en React Native son adimensionales y representan píxeles lógicos independientes de la densidad (density-independent pixels: dp en Android / pt en iOS), garantizando tamaños físicos consistentes en diferentes pantallas.'
  },
  {
    id: 10,
    unit: 'Unidad 1.1: Fundamentos & Arquitectura',
    q: 'A diferencia de CSS en la Web donde `flexDirection` por defecto es `row`, ¿cuál es el valor por defecto de `flexDirection` en React Native y por qué?',
    opts: [
      'Es "column", porque las pantallas de los teléfonos móviles tienen una orientación vertical preponderante.',
      'Es "row", exactamente igual que en las especificaciones del W3C para navegadores web.',
      'Es "column-reverse" para forzar a que el teclado virtual no tape el contenido.',
      'Es "grid", emulando un sistema de cuadrícula de 12 columnas nativo.'
    ],
    a: 0,
    exp: 'React Native adopta `flexDirection: "column"` por defecto debido a que los smartphones se utilizan predominantemente en disposición vertical (portrait), apilando los elementos de arriba hacia abajo.'
  },

  // =========================================================================
  // UNIDAD 1.2: COMPONENTES CORE, ESTILOS Y MODELO DE VISTAS (Preguntas 11 a 20)
  // =========================================================================
  {
    id: 11,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿A qué componentes nativos del sistema operativo se mapea el componente `<View>` de React Native?',
    opts: [
      'A `UIView` en iOS y a `android.view.ViewGroup` en Android.',
      'A un elemento `<div>` dentro de un WebView oculto de WebKit.',
      'A una etiqueta `<canvas>` de aceleración gráfica OpenGL.',
      'A un proceso en segundo plano de NodeJS sin interfaz de usuario.'
    ],
    a: 0,
    exp: '`<View>` es el contenedor base de diseño de React Native y se mapea directamente a las vistas contenedoras nativas del sistema: `UIView` en iOS y `ViewGroup` en Android.'
  },
  {
    id: 12,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿Qué particularidad obligatoria tiene el componente `<Text>` en React Native en comparación con el desarrollo web?',
    opts: [
      'Cualquier cadena de texto debe estar obligatoriamente envuelta dentro de un componente `<Text>`; no se puede colocar texto plano directamente en un `<View>`.',
      'El texto solo puede mostrarse en mayúsculas sostenidas por restricciones del sistema de tipografías móviles.',
      'Los estilos de fuente aplicados a un `<View>` se heredan automáticamente a todos los textos hijos como en CSS.',
      'Solo admite fuentes del sistema y no permite cargar archivos tipográficos externos (.ttf o .otf).'
    ],
    a: 0,
    exp: 'En React Native no existe la herencia global de estilos tipográficos y colocar texto directamente dentro de un `<View>` provoca un error de ejecución inmediato. Todo texto debe residir en un `<Text>`.'
  },
  {
    id: 13,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: 'Al renderizar una imagen remota alojada en un servidor mediante el componente `<Image>`, ¿qué propiedad es estrictamente obligatoria definir en su estilo?',
    opts: [
      'El ancho (`width`) y el alto (`height`), ya que React Native no conoce las dimensiones intrínsecas de la imagen remota antes de descargarla.',
      'El filtro de desenfoque (`blurRadius`) para indicar la resolución de precarga.',
      'La propiedad `crossOrigin` configurada con el dominio exacto del servidor CDN.',
      'El número de compresión JPEG en bytes para reservar memoria en el dispositivo.'
    ],
    a: 0,
    exp: 'A diferencia de las imágenes locales (con `require()`) cuyo tamaño se infiere en tiempo de empaquetado, las imágenes remotas con `{ uri: "..." }` exigen definir `width` y `height` en su `style`, de lo contrario su tamaño colapsa a 0x0.'
  },
  {
    id: 14,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿Por qué la comunidad y la documentación moderna de React Native recomiendan el componente `<Pressable>` por encima de `<TouchableOpacity>`?',
    opts: [
      'Porque `<Pressable>` ofrece una API más flexible y moderna con soporte para estados dinámicos (pressed), retardo de pulsación (delayLongPress) y efecto ripple nativo en Android.',
      'Porque `<TouchableOpacity>` fue descontinuado y ya no compila en versiones de React Native 0.70+.',
      'Porque `<Pressable>` transforma automáticamente los botones en modelos tridimensionales.',
      'Porque `<TouchableOpacity>` requiere instalar un plugin externo de pago.'
    ],
    a: 0,
    exp: '`<Pressable>` es el componente moderno de interacciones táctiles de React Native. Ofrece callbacks precisos del ciclo de pulsación y permite definir estilos y contenidos como función del estado `{ pressed }`.'
  },
  {
    id: 15,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿Cuál es el beneficio de definir estilos mediante `StyleSheet.create({ ... })` en lugar de utilizar objetos literales en línea (inline styles)?',
    opts: [
      'Valida los nombres de propiedades y valores en tiempo de ejecución, optimiza el rendimiento enviando los estilos al puente nativo mediante IDs numéricos y evita reasignaciones de objetos en cada render.',
      'Convierte automáticamente las reglas CSS en archivos Sass en el disco rígido.',
      'Permite utilizar pseudo-clases de CSS como `:hover`, `:focus` y `:nth-child` de forma idéntica a la web.',
      'Aumenta la tasa de refresco de la pantalla a 120Hz por software.'
    ],
    a: 0,
    exp: '`StyleSheet.create()` congela las declaraciones de estilo, valida claves de propiedades y en el motor interno asigna identificadores numéricos referenciales, evitando crear nuevos objetos en memoria en cada ciclo de render.'
  },
  {
    id: 16,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿Para qué se utiliza la librería `react-native-safe-area-context` y su hook `useSafeAreaInsets`?',
    opts: [
      'Para obtener los márgenes seguros exactos que evitan que el contenido visual colisione con el "notch" (muesca), la cámara frontal o la barra de gestos inferior.',
      'Para bloquear la pantalla de la aplicación si el usuario introduce una contraseña bancaria incorrecta.',
      'Para encriptar las llamadas a APIs REST y proteger la memoria caché de ataques de inyección.',
      'Para asegurar que la aplicación móvil no consuma más del 50% de la carga de la batería.'
    ],
    a: 0,
    exp: '`useSafeAreaInsets` provee las dimensiones en tiempo real de las zonas protegidas del hardware (superior por notch/isla dinámica y barra de estado, inferior por la barra de navegación gestual).'
  },
  {
    id: 17,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: 'Si un contenedor tiene `flexDirection: "column"`, ¿qué eje controla la propiedad `justifyContent` y qué eje controla `alignItems`?',
    opts: [
      '`justifyContent` controla el eje principal vertical (Y), y `alignItems` controla el eje transversal horizontal (X).',
      '`justifyContent` controla el eje horizontal (X), y `alignItems` controla el eje vertical (Y).',
      'Ambas propiedades controlan exclusivamente el eje horizontal de izquierda a derecha.',
      '`justifyContent` define el tamaño de las fuentes y `alignItems` la separación de márgenes.'
    ],
    a: 0,
    exp: 'El eje principal (main axis) sigue la dirección definida en `flexDirection`. Al ser "column", el eje principal es vertical (`justifyContent`) y el eje secundario o transversal es horizontal (`alignItems`).'
  },
  {
    id: 18,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: 'Cuando un componente hijo tiene asignada la propiedad `flex: 1` dentro de un `<View>` padre con altura fija o también con `flex: 1`, ¿qué efecto visual produce?',
    opts: [
      'Se expande para ocupar todo el espacio disponible restante a lo largo del eje principal dentro de su contenedor padre.',
      'Fija el ancho del elemento exactamente a 1 centímetro en cualquier pantalla.',
      'Limita el tamaño del elemento al 1% del ancho del viewport del dispositivo.',
      'Superpone el elemento en una capa flotante fija similar a `position: fixed` de CSS.'
    ],
    a: 0,
    exp: '`flex: 1` indica que el componente flexible tiene un factor de crecimiento (flex-grow) de 1, expandiéndose para llenar todo el espacio libre que su contenedor padre le proporcione.'
  },
  {
    id: 19,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿Cómo permite el módulo `Platform` de React Native aplicar estilos o lógicas condicionales específicas para cada sistema operativo?',
    opts: [
      'A través del método `Platform.select({ ios: {...}, android: {...} })` o evaluando la propiedad `Platform.OS === "ios"`.',
      'Mediante media queries de CSS tradicionales `@media (os: android)`.',
      'Obligando a compilar dos proyectos de código fuente en repositorios Git totalmente separados.',
      'Mediante una directiva `#ifdef ANDROID` de C++ dentro del archivo JSX.'
    ],
    a: 0,
    exp: 'React Native expone `Platform.OS` (que devuelve "ios", "android", "web", etc.) y la utilidad de conveniencia `Platform.select()`, además de la convención de sufijos de archivo como `Boton.android.tsx` y `Boton.ios.tsx`.'
  },
  {
    id: 20,
    unit: 'Unidad 1.2: Componentes Core & Estilos',
    q: '¿Qué propiedad de estilo de React Native se utiliza para elevar una tarjeta en Android simulando la sombra Material Design mediante hardware?',
    opts: [
      'elevation',
      'boxShadowAndroid',
      'materialDepth',
      'zIndex3D'
    ],
    a: 0,
    exp: 'En Android, las sombras del sistema se gestionan mediante la propiedad `elevation` de Material Design, mientras que en iOS se configuran mediante las cuatro propiedades `shadowColor`, `shadowOffset`, `shadowOpacity` y `shadowRadius`.'
  },

  // =========================================================================
  // UNIDAD 1.2: ESTADO LOCAL, INMUTABILIDAD Y HOOKS (Preguntas 21 a 30)
  // =========================================================================
  {
    id: 21,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Por qué en React y React Native está terminantemente prohibido mutar el estado directamente (por ejemplo: `miLista.push(nuevoItem)`)?',
    opts: [
      'Porque React compara las referencias de los objetos para detectar cambios; si se muta el mismo objeto en memoria, la referencia no cambia y el componente no se re-renderiza.',
      'Porque JavaScript lanza un error de compilación de sintaxis de tipo `ImmutableMutationException`.',
      'Porque las mutaciones directas borran la memoria RAM asignada a la máquina virtual de Android.',
      'Porque solo se permite utilizar variables globales creadas con `var`.'
    ],
    a: 0,
    exp: 'El algoritmo de reconciliación de React utiliza comparación superficial por referencia (shallow equality). Si mutamos un array con `.push()`, la referencia sigue siendo la misma, por lo que React asume que nada cambió y omite el re-render.'
  },
  {
    id: 22,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Cuándo es imprescindible utilizar la forma funcional del actualizador de estado, como `setContador(prev => prev + 1)`?',
    opts: [
      'Cuando el nuevo valor del estado depende directamente del valor del estado previo o cuando se ejecuta dentro de closures asíncronos para evitar lecturas obsoletas (stale state).',
      'Únicamente cuando se manipulan números decimales de punto flotante.',
      'Solo cuando el componente es una función anónima sin nombre exportado.',
      'Cuando se desea transferir el estado a una base de datos Firebase sin conexión a internet.'
    ],
    a: 0,
    exp: 'La forma de función actualizadora `setValor(prev => ...)` garantiza acceder al valor más reciente del estado en la cola de procesamiento de React, evitando cierres obsoletos (stale closures) en callbacks o eventos rápidos.'
  },
  {
    id: 23,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Qué significa el concepto de "Automatic Batching" introducido a partir de React 18 en React Native?',
    opts: [
      'Que múltiples actualizaciones de estado desencadenadas dentro de una misma función o callback asíncrono se agrupan en un único ciclo de re-renderizado para maximizar el rendimiento.',
      'Que las aplicaciones se compilan en paquetes por lotes cada vez que se presiona guardar.',
      'Que las imágenes se comprimen por lotes de 10 archivos antes de enviarse a internet.',
      'Que los estilos CSS se combinan en un solo archivo plano al momento de la instalación.'
    ],
    a: 0,
    exp: 'Automatic Batching agrupa múltiples llamados a `setState` ocurridos en promesas, temporizadores o manejadores de eventos nativos en un único re-render, evitando renders intermedios innecesarios.'
  },
  {
    id: 24,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Cuál es la diferencia principal entre el hook `useState` y el hook `useRef`?',
    opts: [
      'Modificar el valor de un `useState` desencadena un re-renderizado del componente en la UI, mientras que modificar `.current` en un `useRef` almacena el valor de forma persistente sin provocar re-render.',
      '`useRef` solo almacena strings y `useState` solo admite números enteros.',
      '`useState` se destruye cada vez que el usuario hace scroll y `useRef` se guarda en el disco sólido.',
      'No existe ninguna diferencia; son alias intercambiables de la misma función.'
    ],
    a: 0,
    exp: '`useRef` retorna un objeto mutable `{ current: ... }` que persiste durante todo el ciclo de vida del componente. Modificar `ref.current` no dispara renderizado, siendo ideal para temporizadores, banderas de montaje o referencias a nodos nativos.'
  },
  {
    id: 25,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Qué ocurre si se omite por completo el array de dependencias en un hook `useEffect` (`useEffect(() => { ... })`)?',
    opts: [
      'El efecto se ejecutará incondicionalmente después de CADA ciclo de renderizado que experimente el componente.',
      'El efecto se ejecutará únicamente una sola vez cuando el componente se monte por primera vez.',
      'El efecto se ejecuta solo cuando la pantalla pierde el foco de navegación.',
      'React lanza un error crítico de sintaxis en la consola de Metro.'
    ],
    a: 0,
    exp: 'Sin segundo argumento, `useEffect` se invoca tras cada renderizado. Con un array vacío `[]`, se ejecuta solo en el montaje. Con dependencias `[a, b]`, se ejecuta cuando cambian `a` o `b`.'
  },
  {
    id: 26,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Para qué sirve la función de retorno (cleanup function) dentro de un `useEffect`?',
    opts: [
      'Para cancelar suscripciones a eventos, limpiar temporizadores (`clearTimeout`/`clearInterval`) o abortar peticiones HTTP activas antes de que el componente se desmonte o el efecto se vuelva a ejecutar.',
      'Para borrar la memoria caché de la tienda Google Play Store.',
      'Para formatear y limpiar el código fuente con Prettier automáticamente.',
      'Para reiniciar el estado del componente a sus valores iniciales por defecto.'
    ],
    a: 0,
    exp: 'La función devuelta por `useEffect` actúa como fase de desmontaje y limpieza. Evita fugas de memoria (memory leaks) e intentos de actualizar estado en componentes que ya no existen en el árbol visual.'
  },
  {
    id: 27,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Cuál es una causa habitual de un bucle infinito de renderizado ("Too many re-renders") en React Native?',
    opts: [
      'Ejecutar una función actualizadora de estado dentro del cuerpo principal del componente o dentro de un `useEffect` cuyas dependencias cambian con ese mismo estado.',
      'Usar `flexDirection: "row"` en pantallas de teléfonos con resolución HD.',
      'Definir más de tres componentes de texto dentro de una misma pantalla.',
      'Configurar una tipografía que contenga caracteres acentuados en español.'
    ],
    a: 0,
    exp: 'Si se llama a `setEstado()` sin envolver en un callback de evento o dentro de un `useEffect` que incluye a ese mismo estado como dependencia sin condición de corte, se genera un bucle recursivo de re-renderizado infinito.'
  },
  {
    id: 28,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Por qué las Reglas de los Hooks de React prohíben invocar hooks dentro de bloques condicionales (`if`), bucles (`for`) o funciones anidadas?',
    opts: [
      'Porque React confía en el orden determinista y secuencial en que los hooks son invocados en cada renderizado para asociar correctamente su estado interno.',
      'Porque el compilador de JavaScript ES6 no admite funciones que comiencen con el prefijo "use".',
      'Porque las condiciones lógicas consumen el doble de batería en teléfonos Android antiguos.',
      'Porque los procesadores móviles ARM no pueden evaluar comparaciones booleanas dentro de React.'
    ],
    a: 0,
    exp: 'React guarda el estado de los hooks en listas enlazadas indexadas por orden de llamada en cada render. Si un hook se ejecuta condicionalmente, los índices se desincronizan y React asigna el estado al hook equivocado.'
  },
  {
    id: 29,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Qué patrón se debe aplicar cuando dos componentes hermanos necesitan compartir y sincronizar el mismo estado local en una aplicación?',
    opts: [
      'Elevar el estado (Lifting State Up) al componente padre común más cercano y pasarlo como props junto con la función actualizadora.',
      'Crear una variable global en `window` para que ambos hermanos lean y escriban sin control.',
      'Duplicar el `useState` en ambos componentes y esperar a que el Garbage Collector los sincronice.',
      'Convertir obligatoriamente ambos componentes en clases de JavaScript heredadas.'
    ],
    a: 0,
    exp: 'El principio de "Lifting State Up" consiste en mover el estado al ancestro común más cercano, distribuyéndolo hacia abajo vía props junto con los callbacks para modificarlo.'
  },
  {
    id: 30,
    unit: 'Unidad 1.2: Estado & Inmutabilidad',
    q: '¿Cómo se debe agregar un nuevo elemento a un array de productos en el estado sin mutar el array original?',
    opts: [
      'setProductos(prev => [...prev, nuevoProducto]);',
      'productos.push(nuevoProducto); setProductos(productos);',
      'setProductos(productos.reverse().concat(nuevoProducto));',
      'setProductos(Object.assign(productos, nuevoProducto));'
    ],
    a: 0,
    exp: 'El operador de propagación (spread operator) `[...prev, nuevoProducto]` genera una nueva instancia de array en memoria con los elementos existentes más el nuevo, respetando la inmutabilidad requerida por React.'
  },

  // =========================================================================
  // UNIDAD 1.2: LISTAS OPTIMIZADAS Y VIRTUALIZACIÓN (Preguntas 31 a 40)
  // =========================================================================
  {
    id: 31,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Cuál es la diferencia crítica de rendimiento entre `<ScrollView>` y `<FlatList>` al mostrar una lista de 5.000 productos?',
    opts: [
      '`<ScrollView>` renderiza todos los 5.000 elementos en memoria simultáneamente provocando ralentización o cierre de la app (OOM), mientras que `<FlatList>` virtualiza y recicla únicamente los elementos visibles en pantalla.',
      '`<ScrollView>` solo funciona de manera horizontal y `<FlatList>` solo de manera vertical.',
      '`<FlatList>` requiere conexión a internet para descargar cada elemento y `<ScrollView>` funciona offline.',
      '`<ScrollView>` utiliza aceleración por hardware de la GPU y `<FlatList>` renderiza solo con texto plano.'
    ],
    a: 0,
    exp: '`<ScrollView>` crea los nodos nativos de toda la colección de golpe, colapsando la memoria en listas extensas. `<FlatList>` implementa virtualización: desmonta celdas que salen de la ventana de visualización y recicla vistas.'
  },
  {
    id: 32,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Por qué es una mala práctica utilizar el índice del array (`index`) como valor retornado en la propiedad `keyExtractor` de un `<FlatList>`?',
    opts: [
      'Porque si los elementos se reordenan, eliminan o filtran, las claves basadas en el índice causan bugs de renderizado, animaciones rotas y fallas en la conservación del estado interno de los ítems.',
      'Porque `keyExtractor` solo acepta números negativos y los índices son positivos.',
      'Porque el índice del array provoca que el recolector de basura de Android elimine el elemento de la pantalla.',
      'Porque la documentación oficial de React prohíbe el uso de números enteros en JavaScript.'
    ],
    a: 0,
    exp: 'Las keys permiten a React rastrear la identidad de cada nodo. Si se usa el índice y se elimina el primer elemento, el segundo pasa a tener el índice 0, engañando a React y reciclando incorrectamente estados internos de la UI.'
  },
  {
    id: 33,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: 'En el componente `<FlatList>`, ¿qué parámetros recibe como argumento el callback asignado a la propiedad `renderItem`?',
    opts: [
      'Un objeto desestructurado que contiene principalmente `{ item, index, separators }`.',
      'Exclusivamente la clave primaria de la base de datos como string numérico.',
      'El evento táctil de scroll del usuario con coordenadas X e Y.',
      'Una referencia a la instancia del componente contenedor padre.'
    ],
    a: 0,
    exp: '`renderItem` recibe un objeto de metadata de la celda donde `item` representa el elemento de datos del array en la posición actual, e `index` su posición ordinal en la colección.'
  },
  {
    id: 34,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Qué propiedad de `<FlatList>` permite mostrar un componente visual amigable (por ejemplo: "No hay productos encontrados") cuando el array `data` está vacío (`[]`)?',
    opts: [
      'ListEmptyComponent',
      'renderEmptyFallback',
      'emptyViewPlaceholder',
      'noDataFallbackComponent'
    ],
    a: 0,
    exp: '`ListEmptyComponent` acepta un componente funcional o elemento JSX que se renderiza automáticamente en el área de la lista cuando la longitud del array pasado en `data` es cero.'
  },
  {
    id: 35,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Cuál es la forma más limpia y recomendada de separar visualmente los ítems de un `<FlatList>` sin agregar márgenes que afecten el primer o último elemento?',
    opts: [
      'Utilizar la propiedad `ItemSeparatorComponent` pasándole una línea divisoria o un `<View>` separador.',
      'Aplicar un `marginBottom: 20` directamente en la tarjeta de cada fila.',
      'Insertar strings vacíos `""` intercalados manualmente dentro del array de datos.',
      'Configurar la propiedad `borderSpacing` en el contenedor padre de la lista.'
    ],
    a: 0,
    exp: '`ItemSeparatorComponent` renderiza el elemento separador únicamente ENTRE los ítems contiguos, omitiéndolo elegantemente en la parte superior del primer elemento y en la parte inferior del último.'
  },
  {
    id: 36,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Para qué sirve la propiedad `getItemLayout` en una lista `<FlatList>` con elementos de altura fija conocida?',
    opts: [
      'Permite a la lista calcular la posición exacta de cada elemento sin necesidad de medirlos dinámicamente en el render, habilitando desplazamientos instantáneos con `scrollToIndex` y optimizando la velocidad.',
      'Define el número de columnas para convertir la lista en un tablero tipo Pinterest.',
      'Permite aplicar estilos CSS externos mediante un archivo `.json` de diseño.',
      'Modifica el color de fondo de las celdas impares de la lista.'
    ],
    a: 0,
    exp: 'Al proveer `getItemLayout: (data, index) => ({ length: ALTO_FILA, offset: ALTO_FILA * index, index })`, FlatList salta la medición asíncrona de la UI nativa, optimizando el rendimiento de scroll dramáticamente.'
  },
  {
    id: 37,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Qué combinación de propiedades de `<FlatList>` permite implementar el patrón de "Infinite Scroll" (paginación al llegar al final)?',
    opts: [
      '`onEndReached` y `onEndReachedThreshold`',
      '`onScrollLimit` y `maxItemsPerPage`',
      '`onBottomTouch` y `bottomDistanceLimit`',
      '`onNextPageRequired` y `paginationOffset`'
    ],
    a: 0,
    exp: '`onEndReachedThreshold: 0.5` especifica a qué distancia del final (en unidades de la pantalla visible) debe dispararse el callback `onEndReached` para solicitar la siguiente página de datos al backend.'
  },
  {
    id: 38,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Qué componente nativo se asocia a la propiedad `refreshControl` de un `<FlatList>` para habilitar el gesto táctil de "Deslizar para refrescar" (Pull-to-Refresh)?',
    opts: [
      '<RefreshControl refreshing={cargando} onRefresh={cargarDatos} />',
      '<PullToReloadIndicator active={true} />',
      '<GestureRecognizer action="swipe-down" />',
      '<SpinnerOverlay visible={true} />'
    ],
    a: 0,
    exp: 'El componente estándar `<RefreshControl>` se vincula mediante la prop `refreshControl`, gestionando el indicador giratorio nativo de Pull-to-Refresh tanto en iOS (rueda estándar) como en Android (swipe refresh layout).'
  },
  {
    id: 39,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Cuándo es preferible utilizar el componente `<SectionList>` en lugar de `<FlatList>`?',
    opts: [
      'Cuando los datos deben organizarse en secciones lógicas agrupadas (por ejemplo: contactos agrupados por letra alfabética) con cabeceras de sección adhesivas (sticky headers).',
      'Únicamente cuando la aplicación se ejecuta en tabletas o pantallas de gran tamaño.',
      'Cuando los elementos de la lista son exclusivamente vídeos de YouTube.',
      'Cuando se requiere una lista que no permita interacción táctil ni scroll.'
    ],
    a: 0,
    exp: '`<SectionList>` está optimizado para colecciones estructuradas con secciones `{ title, data: [...] }`, soportando de forma nativa la propiedad `renderSectionHeader` y cabeceras fijas durante el scroll.'
  },
  {
    id: 40,
    unit: 'Unidad 1.2: Listas Optimizadas & FlatList',
    q: '¿Qué efecto tiene configurar `initialNumToRender={10}` y `windowSize={5}` en una lista `<FlatList>`?',
    opts: [
      'Determina la cantidad inicial de ítems que se montan en el primer render y el tamaño de la ventana de celdas que se mantienen en memoria fuera de pantalla para balancear velocidad y consumo de RAM.',
      'Limita a 10 el número máximo de consultas a la base de datos por segundo.',
      'Fuerza a que la aplicación solo se visualice en pantallas de 5 y 10 pulgadas.',
      'Configura la resolución de las fotos de los productos en 10 megapíxeles.'
    ],
    a: 0,
    exp: '`initialNumToRender` acelera el primer pintado montando solo los elementos estrictamente necesarios en pantalla, y `windowSize` controla cuántas pantallas de contenido hacia arriba y abajo retienen sus vistas en memoria.'
  },

  // =========================================================================
  // UNIDAD 1.3: NAVEGACIÓN CON EXPO ROUTER (Preguntas 41 a 50)
  // =========================================================================
  {
    id: 41,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿En qué paradigma de enrutamiento se basa Expo Router para definir las pantallas y la navegación en la aplicación?',
    opts: [
      'File-based routing (enrutamiento basado en archivos), donde la estructura de carpetas y archivos dentro del directorio `/app` define automáticamente las rutas disponibles.',
      'Enrutamiento centralizado exclusivo por XML similar al archivo de configuración de Struts 1.0.',
      'Enrutamiento imperativo manual obligatorio en un archivo gigantesco de constantes en `/routes.js`.',
      'Enrutamiento por DNS local configurado en el archivo `/etc/hosts` del teléfono.'
    ],
    a: 0,
    exp: 'Expo Router adopta el paradigma de enrutamiento basado en archivos (inspirado en frameworks como Next.js), donde cada archivo colocado dentro del directorio `app/` se transforma de manera determinista en una pantalla navegable.'
  },
  {
    id: 42,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: 'En Expo Router, ¿cuál es el propósito de los archivos especiales denominados `_layout.tsx`?',
    opts: [
      'Definen componentes contenedores compartidos (como navegadores `<Stack>`, `<Tabs>` o proveedores de contexto) que envuelven a todas las pantallas de su mismo nivel y subdirectorios.',
      'Son archivos de respaldo que solo se activan cuando la aplicación sufre una caída de red.',
      'Contienen las reglas de maquetación CSS para navegadores de escritorio antiguos.',
      'Son ejecutables binarios de C++ generados por el compilador de Android.'
    ],
    a: 0,
    exp: 'Los archivos `_layout` en Expo Router representan la capa estructural compartida. Permiten definir si un grupo de pantallas se organizará en una pila de navegación (`<Stack>`) o en pestañas inferiores (`<Tabs>`).'
  },
  {
    id: 43,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Cómo se define una ruta con parámetro dinámico en Expo Router (por ejemplo, para ver el detalle de un producto según su identificador único)?',
    opts: [
      'Nombrando el archivo con corchetes, por ejemplo: `app/producto/[id].tsx`.',
      'Creando un archivo llamado `app/producto/:id.tsx`.',
      'Creando una carpeta llamada `app/producto/param_id/screen.jsx`.',
      'Nombrando el archivo como `app/producto.id-dynamic.tsx`.'
    ],
    a: 0,
    exp: 'La convención de corchetes `[nombreParametro].tsx` indica una ruta dinámica en Expo Router. El parámetro capturado en la URL o navegación se obtiene luego mediante el hook `useLocalSearchParams()`.'
  },
  {
    id: 44,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Qué hook oficial de Expo Router permite leer los parámetros pasados a una ruta dinámica o por query params en la pantalla receptora?',
    opts: [
      'useLocalSearchParams()',
      'useUrlQueryReader()',
      'usePathArguments()',
      'useNavigationData()'
    ],
    a: 0,
    exp: '`const { id } = useLocalSearchParams();` extrae directamente y con soporte de tipado los parámetros de ruta dinámicos asignados a la pantalla en ese momento.'
  },
  {
    id: 45,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: 'En Expo Router, ¿para qué sirven las carpetas cuyo nombre está envuelto entre paréntesis, como `app/(tabs)` o `app/(auth)`?',
    opts: [
      'Son "Route Groups" (Grupos de Rutas) que organizan la estructura del proyecto y permiten aplicar diferentes layouts sin afectar la URL ni agregar segmentos a la ruta final.',
      'Son carpetas de acceso restringido a las que solo puede acceder el administrador mediante PIN.',
      'Son carpetas invisibles que no se empaquetan en el binario final de la aplicación.',
      'Son rutas destinadas exclusivamente a tests unitarios automatizados.'
    ],
    a: 0,
    exp: 'Los Route Groups con paréntesis permiten agrupar lógicamente pantallas (por ejemplo, pantallas protegidas vs pantallas de autenticación) y asignarles layouts diferentes sin que el nombre de la carpeta forme parte de la URL.'
  },
  {
    id: 46,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Cuál es la diferencia entre utilizar `router.push("/perfil")` y `router.replace("/perfil")` con el hook `useRouter()`?',
    opts: [
      '`push` apila una nueva pantalla encima de la actual permitiendo volver hacia atrás con el botón Back, mientras que `replace` sustituye la pantalla actual en la pila evitando que el usuario regrese a ella.',
      '`push` envía una notificación push al servidor y `replace` recarga la página web.',
      '`replace` solo funciona en emuladores y `push` solo en dispositivos físicos.',
      '`push` borra todo el historial de navegación previo de la sesión.'
    ],
    a: 0,
    exp: '`push` añade una nueva tarjeta al Stack de navegación conservando el historial. `replace` sobreescribe el nodo actual en el historial de navegación, técnica clave tras un inicio de sesión o cierre de sesión exitoso.'
  },
  {
    id: 47,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Qué componente declarativo proporciona Expo Router para crear enlaces de navegación accesibles similares a la etiqueta `<a>` de HTML?',
    opts: [
      '<Link href="/detalles">',
      '<Anchor to="/detalles">',
      '<RoutePointer target="/detalles">',
      '<NavigateLink path="/detalles">'
    ],
    a: 0,
    exp: 'El componente `<Link href="...">` de Expo Router ofrece navegación declarativa optimizada, gestionando eventos táctiles, accesibilidad nativa y precarga de rutas.'
  },
  {
    id: 48,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Cómo se oculta la barra de título superior (header) nativa en una pantalla administrada por un `<Stack>` en Expo Router?',
    opts: [
      'Configurando `<Stack.Screen options={{ headerShown: false }} />` o en la propiedad `screenOptions` del layout.',
      'Aplicando la propiedad de estilo `header: "display: none"` en el contenedor principal.',
      'Desinstalando la librería de iconos vectoriales del proyecto.',
      'Bloqueando el hilo de renderizado con una instrucción `sleep`.'
    ],
    a: 0,
    exp: 'La barra de cabecera nativa se controla a través del objeto `options` con la clave `headerShown: false`, ya sea a nivel global en el `<Stack screenOptions={{...}}>` o por pantalla específica con `<Stack.Screen>`. '
  },
  {
    id: 49,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Qué archivo especial dentro de una carpeta de ruta en Expo Router actúa como la pantalla inicial o raíz de ese segmento?',
    opts: [
      'index.tsx (o index.jsx)',
      'root.tsx',
      'main.tsx',
      'default.tsx'
    ],
    a: 0,
    exp: 'Al igual que en los servidores web y frameworks modernos, el archivo nombrado `index.tsx` representa el punto de entrada o ruta raíz (`/`) de ese directorio.'
  },
  {
    id: 50,
    unit: 'Unidad 1.3: Expo Router & Navegación',
    q: '¿Qué pantalla especial se debe definir para capturar y mostrar un error 404 amigable cuando el usuario intenta navegar a una ruta inexistente en Expo Router?',
    opts: [
      '+not-found.tsx',
      '404-error.tsx',
      'missing-page.jsx',
      '_errorBoundary.tsx'
    ],
    a: 0,
    exp: 'Expo Router reserva el archivo `+not-found.tsx` como ruta comodín (wildcard / fallback) global para capturar y presentar una interfaz amigable cuando no existe coincidencia de ruta en la app.'
  },

  // =========================================================================
  // UNIDAD 2.1: ESTADO GLOBAL, ZUSTAND Y TRABAJO EN EQUIPO CON GIT (Preguntas 51 a 60)
  // =========================================================================
  {
    id: 51,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Qué problema específico de la arquitectura de componentes de React se conoce como "Prop Drilling"?',
    opts: [
      'La necesidad de pasar propiedades (props) a través de múltiples niveles de componentes intermedios que no necesitan esos datos, únicamente para entregarlos a un componente descendiente profundo.',
      'Un ataque informático que satura la memoria del teléfono inyectando props maliciosas.',
      'La pérdida de tipos de TypeScript al exportar funciones en archivos separados.',
      'Un error de compilación que ocurre cuando un componente tiene más de 10 props diferentes.'
    ],
    a: 0,
    exp: 'Prop Drilling describe la molestia de enrutar datos a través de componentes intermedios que actúan meramente como puentes de transporte, degradando la legibilidad, mantenimiento y desacoplamiento del código.'
  },
  {
    id: 52,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Por qué para gestionar estado global en aplicaciones móviles React Native de mediano porte se suele preferir Zustand frente a Context API estándar?',
    opts: [
      'Porque Zustand permite a los componentes suscribirse mediante selectores granulares exactos, re-renderizando únicamente los componentes que consumen el valor modificado y no todo el árbol envuelto en el Provider.',
      'Porque Context API fue eliminado formalmente del core de React en la versión 18.',
      'Porque Zustand no requiere escribir código JavaScript y se programa mediante diagramas UML.',
      'Porque Context API solo permite almacenar números enteros y rechaza objetos complejos.'
    ],
    a: 0,
    exp: 'Cuando un valor de Context cambia, todos los componentes consumidores de ese Contexto se re-evalúan incondicionalmente. Zustand utiliza subscripciones basadas en selectores atómicos fuera del árbol de React, previniendo renders masivos.'
  },
  {
    id: 53,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Cómo se define un store básico con Zustand utilizando la función `create`?',
    opts: [
      'const useMiStore = create((set) => ({ contador: 0, incrementar: () => set(state => ({ contador: state.contador + 1 })) }));',
      'const useMiStore = new ZustandStore({ state: { contador: 0 } });',
      'const useMiStore = createStore(reducers, applyMiddleware(thunk));',
      'const useMiStore = useStateGlobal({ contador: 0 });'
    ],
    a: 0,
    exp: 'Zustand se caracteriza por su API minimalista y sin boilerplate: `create((set, get) => ({ estado, acciones }))` crea un hook personalizado que puede consumirse directamente en cualquier componente.'
  },
  {
    id: 54,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: 'Al consumir un store de Zustand en un componente de tarjeta de usuario, ¿cuál es la sintaxis óptima para evitar re-renderizados innecesarios si cambia otra propiedad del store?',
    opts: [
      'const nombreUsuario = useUserStore(state => state.nombreUsuario);',
      'const { nombreUsuario } = useUserStore();',
      'const todoElStore = useUserStore.getState();',
      'const state = useUserStore.subscribe();'
    ],
    a: 0,
    exp: 'Usar un selector `state => state.nombreUsuario` indica a Zustand que solo debe re-renderizar este componente cuando el valor específico de `nombreUsuario` cambie, ignorando cambios en otras propiedades del store.'
  },
  {
    id: 55,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Qué middleware oficial de Zustand permite guardar automáticamente el estado del store en el almacenamiento local del dispositivo para que persista al cerrar la app?',
    opts: [
      'persist, configurado con un motor de almacenamiento como AsyncStorage',
      'immerLoggerGlobalStorage',
      'devtoolsAutoSaver',
      'reactNativeCacheOptimizer'
    ],
    a: 0,
    exp: 'El middleware `persist` de Zustand serializa y sincroniza automáticamente las porciones seleccionadas del store con `AsyncStorage` (o `expo-secure-store`), rehidratando el estado de la app en su siguiente inicio.'
  },
  {
    id: 56,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: 'En el flujo de trabajo colaborativo profesional con Git (GitHub Flow), ¿cuál es la regla de oro respecto a la rama principal (`main` o `master`)?',
    opts: [
      'La rama `main` debe ser siempre estable y desplegable a producción; ningún desarrollador debe subir código directamente a ella sin pasar por una rama de funcionalidad (`feature`) y una Pull Request revisada.',
      'Todos los programadores deben commitear directamente sobre `main` al finalizar cada jornada.',
      'La rama `main` se debe eliminar y volver a crear al inicio de cada sprint semanal.',
      'Solo se deben subir archivos de texto plano y nunca código JavaScript a la rama principal.'
    ],
    a: 0,
    exp: 'En GitHub Flow, `main` representa el estado de producción verificado. Todo cambio debe originarse en una rama secundaria temática (`feature/login-zod`), validarse con pruebas y fusionarse mediante un Pull Request con code review.'
  },
  {
    id: 57,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Cuál es el propósito principal de una Pull Request (PR) en plataformas como GitHub o GitLab?',
    opts: [
      'Solicitar que los cambios de una rama sean revisados, discutidos y testeados por otros miembros del equipo antes de ser incorporados a la rama principal.',
      'Descargar las librerías de npm directamente a la memoria RAM del teléfono móvil.',
      'Enviar una notificación push a todos los usuarios finales que tienen instalada la aplicación.',
      'Comprimir el repositorio para ahorrar espacio en la nube de GitHub.'
    ],
    a: 0,
    exp: 'Una Pull Request es un espacio de revisión colaborativa y control de calidad donde los desarrolladores inspeccionan diffs de código, dejan comentarios de mejora y ejecutan pipelines de CI antes del merge.'
  },
  {
    id: 58,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Cuál es la diferencia conceptual entre `git merge` y `git rebase` al integrar cambios de una rama a otra?',
    opts: [
      '`git merge` preserva el historial cronológico exacto creando un commit de unión (merge commit), mientras que `git rebase` vuelve a aplicar los commits propios encima de la rama base produciendo un historial lineal.',
      '`git rebase` borra todos los archivos que no tengan comentarios JSDoc y `git merge` los conserva.',
      '`git merge` solo funciona en Windows y `git rebase` solo en distribuciones Linux o macOS.',
      '`git rebase` es una herramienta de pago y `git merge` es de código abierto.'
    ],
    a: 0,
    exp: '`merge` respeta la topología original de las ramas con un commit explícito de unión. `rebase` reescribe el punto de partida de la rama sobre la punta de la rama destino, logrando un historial de commits limpio y estrictamente lineal.'
  },
  {
    id: 59,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: '¿Qué significa el estándar de "Conventional Commits" en la gestión de proyectos de software (por ejemplo: `feat: add camera capture modal`)?',
    opts: [
      'Una convención estructurada para redactar mensajes de commit con prefijos estandarizados (`feat`, `fix`, `docs`, `refactor`, `chore`) que facilitan la lectura y la generación automática de changelogs.',
      'Una ley penal de propiedad intelectual aplicada a repositorios públicos de GitHub.',
      'Un algoritmo que comprime los commits usando el cifrado SHA-256.',
      'Una extensión de Visual Studio Code que prohíbe escribir commits de menos de 100 líneas.'
    ],
    a: 0,
    exp: 'Conventional Commits introduce una semántica unificada en el historial (`feat` para nuevas funciones, `fix` para corrección de bugs, `refactor` para mejoras sin cambio funcional), clave para Semantic Versioning automatizado.'
  },
  {
    id: 60,
    unit: 'Unidad 2.1: Estado Global & Zustand',
    q: 'Cuando dos desarrolladores modifican las mismas líneas de un archivo en ramas diferentes y tratan de fusionarlas, Git genera un "Merge Conflict". ¿Qué acción debe realizar el desarrollador?',
    opts: [
      'Abrir el archivo en conflicto, revisar los marcadores `<<<<<<<`, `=======`, `>>>>>>>`, consensuar la versión final correcta, guardar el archivo y completar el commit de resolución.',
      'Apagar la computadora inmediatamente para no corromper el servidor remoto de GitHub.',
      'Borrar el archivo en conflicto y pedirle al compañero que vuelva a programarlo desde cero.',
      'Forzar la subida con `git push --force --all` para sobreescribir los cambios del compañero.'
    ],
    a: 0,
    exp: 'Los conflictos de integración requieren resolución manual consciente. El desarrollador evalúa ambas propuestas delimitadas por las cabeceras de Git, selecciona o integra la lógica válida, elimina los marcadores y ejecuta `git add`.'
  },

  // =========================================================================
  // UNIDAD 2.2: PETICIONES ASÍNCRONAS, APIS REST Y CUSTOM HOOKS (Preguntas 61 a 70)
  // =========================================================================
  {
    id: 61,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: 'Al consumir una API REST en una pantalla móvil, ¿cuáles son los tres estados canónicos que se deben gestionar obligatoriamente para una buena experiencia de usuario (UX)?',
    opts: [
      'Carga (loading), Datos exitosos (data) y Error (error)',
      'Offline, Pause y Render',
      'Inactivo, Conectando y Cerrado',
      'Descargando, Comprimiendo y Desplegando'
    ],
    a: 0,
    exp: 'Una arquitectura mobile sólida siempre modela explícitamente: estado de carga (`isLoading` con un spinner/esqueleto), estado de éxito con datos (`data`), y estado de contingencia (`error` con mensaje y reintento amigable).'
  },
  {
    id: 62,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: 'Al utilizar la función nativa `fetch()` de JavaScript, ¿por qué un código de respuesta HTTP 404 (Not Found) o 500 (Server Error) NO dispara el bloque `catch` de la promesa?',
    opts: [
      'Porque `fetch()` solo rechaza la promesa si ocurre un fallo de red a nivel de socket o DNS; para capturar errores HTTP se debe comprobar explícitamente la propiedad `response.ok` (o `response.status`).',
      'Porque `fetch()` corrige los errores 404 inventando datos falsos de prueba.',
      'Porque el bloque `catch` en JavaScript solo captura errores sintácticos de punto y coma.',
      'Porque los errores 500 se consideran respuestas exitosas por el protocolo HTTP/2.'
    ],
    a: 0,
    exp: 'A diferencia de bibliotecas como Axios, `fetch()` resuelve la promesa con éxito siempre que el servidor devuelva una cabecera HTTP, incluso ante 404 o 500. El desarrollador debe validar `if (!response.ok) throw new Error(...)`.'
  },
  {
    id: 63,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Qué ventaja práctica ofrece la biblioteca `axios` frente a la API nativa `fetch` en aplicaciones React Native?',
    opts: [
      'Transformación automática de respuestas JSON, soporte nativo de interceptores de solicitudes/respuestas (ideal para inyectar tokens JWT) y rechazo automático de promesas en códigos HTTP >= 400.',
      'Permite conectarse a bases de datos relacionales SQL sin necesidad de un servidor intermedio.',
      'Funciona sin conexión a internet mediante ondas de radio AM/FM.',
      'Reduce a cero el consumo de datos móviles del usuario en todas las peticiones.'
    ],
    a: 0,
    exp: 'Axios serializa y deserializa JSON automáticamente, rechaza promesas en códigos fuera de rango 2xx y ofrece interceptores globales para anexar tokens `Bearer` de autenticación de forma centralizada.'
  },
  {
    id: 64,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Qué herramienta estándar de los navegadores y de Node.js se debe utilizar para cancelar una petición `fetch` pendiente si el usuario cambia de pantalla antes de que termine la descarga?',
    opts: [
      'AbortController y su propiedad signal (`fetch(url, { signal: controller.signal })`)',
      'ThreadKillerManager',
      'clearImmediate()',
      'NetworkStreamStop()'
    ],
    a: 0,
    exp: 'Pasar el `signal` de una instancia de `AbortController` al `fetch` permite invocar `controller.abort()` dentro de la función de cleanup del `useEffect`, abortando la conexión en tránsito y evitando actualizar estado descolgado.'
  },
  {
    id: 65,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Cuál es el beneficio de encapsular la lógica de consumo de una API dentro de un "Custom Hook" (por ejemplo: `useProductos()`)?',
    opts: [
      'Desacopla la lógica de obtención, caché y manejo de errores de la interfaz visual del componente, permitiendo reutilizar la misma llamada en múltiples pantallas y facilitando pruebas unitarias.',
      'Multiplica la velocidad de descarga de internet por dos gracias a multihilo.',
      'Convierte automáticamente la respuesta en un archivo PDF descargable en el teléfono.',
      'Elimina la necesidad de definir tipos en TypeScript.'
    ],
    a: 0,
    exp: 'Los Custom Hooks permiten componer y reutilizar lógica de estado compleja (fetching, loading, errores, mutaciones) manteniendo los componentes de UI puramente declarativos y enfocados en el diseño.'
  },
  {
    id: 66,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Qué librería del ecosistema de React se especializa en cachear, sincronizar en segundo plano y revalidar datos de peticiones de red evitando llamadas redundantes?',
    opts: [
      'TanStack Query (React Query) o SWR',
      'React Native SuperFetch Turbo',
      'Lodash DeepCache',
      'Babel Network Optimizer'
    ],
    a: 0,
    exp: 'TanStack Query (React Query) es el estándar de la industria para la gestión de estado asíncrono en cliente: provee caching automático, reintentos en fallas de red, deduplicación de llamadas y revalidación en foco.'
  },
  {
    id: 67,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Qué hook o librería se utiliza comúnmente en React Native para detectar en tiempo real si el dispositivo móvil perdió la conexión a internet o tiene conectividad celular/WiFi?',
    opts: [
      '@react-native-community/netinfo y su hook `useNetInfo()`',
      'navigator.onlineCheckerStatus()',
      'window.addEventListener("wifi-lost")',
      'Expo.getSignalStrengthAsync()'
    ],
    a: 0,
    exp: 'NetInfo (`@react-native-community/netinfo`) monitorea el estado de la conexión física (Wi-Fi, 4G/5G, sin conexión), permitiendo notificar al usuario con un banner de alerta offline o pausar sincronizaciones.'
  },
  {
    id: 68,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Por qué es fundamental tipar con TypeScript las respuestas esperadas de un endpoint API (`interface Usuario { id: string; email: string; }`)?',
    opts: [
      'Porque brinda autocompletado en el IDE, previene errores en tiempo de desarrollo al acceder a propiedades inexistentes o renombradas y documenta el contrato de datos.',
      'Porque TypeScript cifra los paquetes de red impidiendo que el operador de telefonía los lea.',
      'Porque si una variable no está tipada, el teléfono Android se niega a abrir la aplicación.',
      'Porque reduce el peso en megabytes de la base de datos remota.'
    ],
    a: 0,
    exp: 'El tipado estático de respuestas de red previene errores catastróficos tipo `Cannot read property of undefined` en tiempo de ejecución y garantiza consistencia entre el backend y las interfaces de usuario móviles.'
  },
  {
    id: 69,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: 'En una llamada HTTP de tipo `POST` para crear un nuevo usuario con `fetch()`, ¿qué cabecera `Content-Type` debe enviarse cuando el cuerpo es un string JSON?',
    opts: [
      "'Content-Type': 'application/json'",
      "'Content-Type': 'text/html; charset=utf-8'",
      "'Content-Type': 'multipart/binary-code'",
      "'Content-Type': 'application/x-www-form-urlencoded-raw'"
    ],
    a: 0,
    exp: 'El servidor receptor requiere la cabecera `Content-Type: application/json` para parsear correctamente el payload serializado enviado en `body: JSON.stringify(datos)`.'
  },
  {
    id: 70,
    unit: 'Unidad 2.2: Peticiones de Red & APIs',
    q: '¿Dónde se deben definir de forma segura las URLs base de las APIs y llaves públicas de servicios en un proyecto Expo?',
    opts: [
      'En variables de entorno (`.env`) y expuestas controladamente mediante `expo-constants` o prefijos `EXPO_PUBLIC_`.',
      'Escritas a mano directamente en el archivo `index.html` del navegador de pruebas.',
      'Publicadas en el archivo `README.md` del repositorio público de GitHub.',
      'Dentro del código de los estilos CSS de los botones principales.'
    ],
    a: 0,
    exp: 'Expo soporta variables de entorno nativas mediante prefijos `EXPO_PUBLIC_MI_VARIABLE` o configuradas en la clave `extra` de `app.config.js`, permitiendo alternar entornos de desarrollo, staging y producción con seguridad.'
  },

  // =========================================================================
  // UNIDAD 2.3: FORMULARIOS, VALIDACIÓN ZOD Y MANEJO DE TECLADO (Preguntas 71 a 80)
  // =========================================================================
  {
    id: 71,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Qué diferencia a un componente `<TextInput>` controlado de uno no controlado en React Native?',
    opts: [
      'En el controlado, el texto mostrado está determinado estrictamente por la propiedad `value` vinculada a un estado, y cualquier cambio dispara `onChangeText` para actualizar dicho estado.',
      'En el controlado, el usuario no puede escribir porque el teclado permanece bloqueado.',
      'En el no controlado, el teclado siempre muestra exclusivamente números de teléfono.',
      'No existe diferencia técnica en React Native; todos los inputs son forzosamente no controlados.'
    ],
    a: 0,
    exp: 'Un input controlado tiene una única fuente de verdad: el estado de React. Su valor visual se deriva de `value={texto}` y se sincroniza en cada pulsación de tecla a través de `onChangeText={(nuevo) => setTexto(nuevo)}`.'
  },
  {
    id: 72,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Por qué en React Native es necesario utilizar el componente `<Controller>` de la biblioteca React Hook Form en lugar de usar `register()` como en la web?',
    opts: [
      'Porque React Native no tiene elementos nativos `<input>` del DOM que admitan referencias (ref) HTML directas con métodos nativos de registro web.',
      'Porque `<Controller>` es el único componente que permite cambiar el color de fondo del teclado.',
      'Porque la función `register()` consume el 90% de la CPU en dispositivos móviles.',
      'Porque React Native exige que todos los formularios se programen con clases de ES5.'
    ],
    a: 0,
    exp: 'En React Web, `register` se acopla a las propiedades nativas del DOM. En React Native, los componentes nativos manejan eventos propios (`onChangeText` en lugar de `onChange`), requiriendo `<Controller>` como adaptador puente.'
  },
  {
    id: 73,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Qué es Zod en el contexto del desarrollo con TypeScript y React Native?',
    opts: [
      'Una biblioteca de declaración y validación de esquemas con inferencia estática de tipos en tiempo de desarrollo y ejecución.',
      'Un plugin de Gradle para acelerar la compilación de binarios Android.',
      'Un emulador de dispositivos móviles desarrollado por Apple para Linux.',
      'Un gestor de bases de datos relacionales basado en SQLite para iOS.'
    ],
    a: 0,
    exp: 'Zod es una biblioteca de validación de esquemas centrada en TypeScript: permite definir esquemas de validación de datos en tiempo de ejecución (runtime) e inferir automáticamente los tipos de TypeScript sin duplicar código.'
  },
  {
    id: 74,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Cómo se conecta un esquema de validación Zod con React Hook Form?',
    opts: [
      'Utilizando la propiedad `resolver: zodResolver(miEsquema)` provista por el paquete `@hookform/resolvers/zod` al inicializar `useForm()`.',
      'Importando Zod dentro del archivo `AndroidManifest.xml`.',
      'Configurando una regla en el archivo `tsconfig.json` con `"zodMode": true`.',
      'Pasándole el esquema como prop al contenedor `<View zodSchema={miEsquema}>`.'
    ],
    a: 0,
    exp: '`useForm({ resolver: zodResolver(esquema) })` integra la validación de Zod con el ciclo de vida del formulario: intercepta los envíos, valida tipos y restricciones, y popola el objeto de errores (`formState.errors`).'
  },
  {
    id: 75,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Cuál es la diferencia fundamental entre los métodos `schema.parse(datos)` y `schema.safeParse(datos)` en Zod?',
    opts: [
      '`parse` lanza una excepción (throw Error) si la validación falla, mientras que `safeParse` nunca lanza excepción y devuelve un objeto `{ success: true, data }` o `{ success: false, error }`.',
      '`safeParse` solo valida contraseñas y `parse` solo valida direcciones de correo.',
      '`safeParse` es síncrono y `parse` solo puede ejecutarse dentro de un WebWorker.',
      '`parse` elimina los campos inválidos de la memoria sin avisar al desarrollador.'
    ],
    a: 0,
    exp: '`safeParse` es el método idiomático para validar datos impredecibles (como entradas de formularios o respuestas de APIs) sin requerir bloques `try/catch`, facilitando el control de flujo con condicionales limpias.'
  },
  {
    id: 76,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Cómo se infiere automáticamente el tipo TypeScript de un formulario a partir de un esquema Zod sin tener que escribir una interfaz manual adicional?',
    opts: [
      'type FormularioType = z.infer<typeof miEsquema>;',
      'type FormularioType = Zod.extractType(miEsquema);',
      'interface FormularioType extends ZodSchema<miEsquema> {}',
      'type FormularioType = typeof miEsquema.typescript;'
    ],
    a: 0,
    exp: 'La utilidad `z.infer<typeof schema>` extrae de forma automática y fidedigna la estructura tipada resultante del esquema, evitando el error habitual de tener interfaces desfasadas respecto a las reglas de validación.'
  },
  {
    id: 77,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Qué componente nativo de React Native se utiliza para evitar que el teclado virtual del teléfono tape los campos de texto inferiores del formulario al desplegarse?',
    opts: [
      '<KeyboardAvoidingView>',
      '<ScreenKeyboardLocker>',
      '<VirtualKeypadResizer>',
      '<InputElevatorLayout>'
    ],
    a: 0,
    exp: '`<KeyboardAvoidingView>` ajusta automáticamente su tamaño, margen o posición basándose en la altura del teclado virtual desplegado, garantizando que los inputs permanezcan visibles para el usuario.'
  },
  {
    id: 78,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Qué valor suele asignarse a la propiedad `behavior` de `<KeyboardAvoidingView>` según la plataforma para un comportamiento visual suave?',
    opts: [
      'behavior={Platform.OS === "ios" ? "padding" : "height"} (o "height"/undefined en Android según el modo windowSoftInputMode)',
      'behavior="full-screen-lock" en todas las plataformas',
      'behavior="zoom-out" para empequeñecer el texto',
      'behavior={Platform.OS === "android" ? "ios-emulate" : "native"}'
    ],
    a: 0,
    exp: 'iOS no gestiona el desplazamiento de la ventana ante el teclado por defecto y requiere `behavior="padding"`. Android suele gestionar el ajuste a nivel de manifiesto (`windowSoftInputMode="adjustResize"`), por lo que suele convenir `"height"` o dejarlo por defecto.'
  },
  {
    id: 79,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Cómo se puede cerrar el teclado virtual de forma imperativa cuando el usuario toca fuera de los campos de texto en cualquier área de la pantalla?',
    opts: [
      'Envolviendo la pantalla con `<TouchableWithoutFeedback onPress={Keyboard.dismiss}>`',
      'Llamando a `window.hideKeyboard()`',
      'Configurando `pointerEvents="none"` en todos los `<TextInput>`',
      'Presionando una tecla de Escape física simulada en el código'
    ],
    a: 0,
    exp: 'El patrón canónico consiste en envolver el contenedor principal en `<TouchableWithoutFeedback onPress={Keyboard.dismiss}>`, de forma que cualquier pulsación en el fondo desencadena la función `Keyboard.dismiss()`.'
  },
  {
    id: 80,
    unit: 'Unidad 2.3: Formularios & Zod',
    q: '¿Qué propiedad de `<TextInput>` se debe configurar para ocultar los caracteres introducidos en un campo de contraseña mediante puntos o asteriscos?',
    opts: [
      'secureTextEntry={true}',
      'passwordMode={true}',
      'hideCharacters={true}',
      'maskInput="password-secret"'
    ],
    a: 0,
    exp: 'La propiedad booleana `secureTextEntry={true}` activa la ofuscación de caracteres nativa del sistema operativo en el campo de texto, imprescindible para el ingreso seguro de contraseñas o pines bancarios.'
  },

  // =========================================================================
  // UNIDAD 2.4: SENSORES, HARDWARE, PERMISOS Y ALMACENAMIENTO SEGURO (Preguntas 81 a 90)
  // =========================================================================
  {
    id: 81,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: 'En los sistemas operativos modernos (iOS 14+ y Android 11+), ¿en qué momento se deben solicitar los permisos de hardware como Cámara o GPS?',
    opts: [
      'En tiempo de ejecución (Runtime Permissions), solicitándolos de forma justificada e interactiva únicamente cuando el usuario va a utilizar la función que los requiere.',
      'De forma automática durante la compilación en la computadora del desarrollador.',
      'Solo una vez cuando el usuario compra el teléfono en la tienda física.',
      'Enviando una solicitud por correo postal a Google o Apple.'
    ],
    a: 0,
    exp: 'El modelo moderno de seguridad móvil exige Runtime Permissions: la aplicación debe pedir autorización en el instante contextual en que se necesita la funcionalidad, explicando claramente el motivo.'
  },
  {
    id: 82,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: 'Al utilizar `expo-camera`, ¿qué hook oficial se utiliza para consultar y solicitar los permisos de acceso a la cámara del dispositivo?',
    opts: [
      'useCameraPermissions()',
      'useHardwareCameraEnabler()',
      'useLensAuthorization()',
      'useDeviceCameraReady()'
    ],
    a: 0,
    exp: '`const [permission, requestPermission] = useCameraPermissions();` proporciona tanto el estado actual (`permission.granted`) como la función asíncrona para disparar el diálogo nativo del sistema (`requestPermission()`).'
  },
  {
    id: 83,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: 'Para que la cámara funcione en iOS al compilar una versión de producción con Expo, ¿qué clave descriptiva debe configurarse obligatoriamente en `app.json` dentro de `ios.infoPlist`?',
    opts: [
      'NSCameraUsageDescription',
      'CameraEnableOptionKey',
      'RequireHardwareCamera',
      'AppleDeviceCameraConsent'
    ],
    a: 0,
    exp: 'Apple exige de forma estricta la clave `NSCameraUsageDescription` en el `Info.plist`. Si una app intenta acceder a la cámara sin este texto explicativo para el usuario, el sistema operativo rechaza la aplicación o Apple la desaprueba en App Store.'
  },
  {
    id: 84,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: '¿Qué función de la biblioteca `expo-image-picker` se utiliza para permitir que el usuario elija una fotografía existente almacenada en la galería de su teléfono?',
    opts: [
      'launchImageLibraryAsync()',
      'pickPhotoFromMemory()',
      'openGalleryFileSelector()',
      'accessUserMediaPhoto()'
    ],
    a: 0,
    exp: '`launchImageLibraryAsync(options)` abre el selector de fotos nativo del sistema operativo para elegir una o varias imágenes de la galería, mientras que `launchCameraAsync()` abre la cámara para captura directa.'
  },
  {
    id: 85,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: 'Al obtener la posición geográfica con `expo-location`, ¿cuál es el impacto de configurar la precisión en `LocationAccuracy.Highest` o `BestForNavigation`?',
    opts: [
      'Proporciona la máxima precisión métrica mediante GPS activo y sensores de satélite, pero incrementa significativamente el consumo de batería y la latencia de respuesta.',
      'Desactiva el chip Wi-Fi del teléfono móvil.',
      'Solo funciona si el usuario se encuentra a menos de 100 metros del mar.',
      'Es obligatoria en todas las pantallas porque no consume nada de energía.'
    ],
    a: 0,
    exp: 'La precisión más alta activa los receptores GNSS/GPS continuamente, lo que agota la batería con rapidez. En apps donde solo se precisa la ciudad o barrio, se recomienda precisión equilibrada (`Balanced` o `Low`).'
  },
  {
    id: 86,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: '¿Cuál es la diferencia de seguridad crítica entre `@react-native-async-storage/async-storage` y `expo-secure-store`?',
    opts: [
      'AsyncStorage almacena los datos en texto plano sin cifrar en el almacenamiento interno de la app, mientras que Expo SecureStore cifra los datos con hardware nativo seguro (Keychain en iOS y Android Keystore).',
      'SecureStore almacena los datos en un servidor remoto de Google y AsyncStorage en el teléfono.',
      'AsyncStorage solo admite números y SecureStore solo admite imágenes.',
      'No existe ninguna diferencia; son la misma librería con diferente nombre.'
    ],
    a: 0,
    exp: '`AsyncStorage` NO es seguro para credenciales porque no cifra los datos (cualquier acceso root o volcado de memoria permite leerlos). `expo-secure-store` utiliza los enclaves de hardware criptográficos protegidos de cada sistema.'
  },
  {
    id: 87,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: '¿Qué límite de tamaño por ítem impone el sistema operativo sobre `expo-secure-store` debido a las restricciones de hardware del Keychain de iOS y Android Keystore?',
    opts: [
      'Aproximadamente 2048 bytes (2 KB), por lo que solo debe usarse para tokens JWT, contraseñas y claves criptográficas, no para bases de datos enteras.',
      'Un máximo estricto de 10 Megabytes por archivo.',
      'No tiene ningún límite de tamaño.',
      'Exactamente 1 bit de información por usuario.'
    ],
    a: 0,
    exp: 'Las bóvedas seguras de hardware móvil están optimizadas para pequeños secretos criptográficos (tokens de sesión, refresh tokens, PINs). Intentar guardar objetos o listas masivas de datos en `SecureStore` genera errores de desbordamiento.'
  },
  {
    id: 88,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: '¿Qué biblioteca oficial del ecosistema Expo permite autenticar al usuario mediante la huella dactilar o reconocimiento facial (FaceID / TouchID)?',
    opts: [
      'expo-local-authentication',
      'expo-biometrics-pro',
      'expo-fingerprint-scanner',
      'expo-face-detector-auth'
    ],
    a: 0,
    exp: '`expo-local-authentication` interactúa con los sensores biométricos nativos del dispositivo mediante métodos como `hasHardwareAsync()`, `isEnrolledAsync()` y `authenticateAsync()`, protegiendo operaciones críticas de la app.'
  },
  {
    id: 89,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: '¿Qué módulo se utiliza en Expo para planificar y emitir notificaciones locales programadas en el teléfono sin depender de un servidor externo?',
    opts: [
      'expo-notifications y su método `scheduleNotificationAsync()`',
      'expo-alerts-scheduler',
      'react-native-push-local',
      'expo-toast-manager'
    ],
    a: 0,
    exp: '`expo-notifications` administra tanto notificaciones remotas (Push vía FCM/APNs) como notificaciones locales programadas por tiempo o intervalos mediante `scheduleNotificationAsync()`, con control total de canales en Android.'
  },
  {
    id: 90,
    unit: 'Unidad 2.4: Hardware, Sensores & Permisos',
    q: 'Si un usuario deniega permanentemente un permiso en el diálogo nativo seleccionando "No volver a preguntar", ¿qué debe hacer la aplicación para permitirle recuperarlo?',
    opts: [
      'Detectar que el permiso no fue otorgado y guiar al usuario para abrir la configuración nativa del sistema mediante `Linking.openSettings()`.',
      'Cerrar la aplicación forzosamente con un error de pantalla azul.',
      'Reintentar la solicitud en un bucle infinito `while(true)` hasta que acepte.',
      'Reiniciar el teléfono móvil de manera remota.'
    ],
    a: 0,
    exp: 'Una vez denegado de forma permanente, el sistema operativo no vuelve a mostrar el diálogo nativo de permisos. La app debe mostrar una explicación cortés e invocar `Linking.openSettings()` para que el usuario lo habilite manualmente en Ajustes.'
  },

  // =========================================================================
  // UNIDAD 3.1: FIREBASE BACKEND, FIRESTORE Y SEGURIDAD (Preguntas 91 a 95)
  // =========================================================================
  {
    id: 91,
    unit: 'Unidad 3.1: Firebase Backend & Firestore',
    q: '¿Cuál es el modelo de base de datos que utiliza Cloud Firestore en Firebase?',
    opts: [
      'Base de datos NoSQL orientada a documentos agrupados dentro de colecciones, con soporte de subcolecciones y sincronización en tiempo real.',
      'Base de datos relacional pura basada en tablas, claves foráneas y comandos SQL SELECT.',
      'Base de datos de clave-valor simple en memoria RAM no persistente.',
      'Un archivo plano de texto con formato CSV sincronizado por FTP.'
    ],
    a: 0,
    exp: 'Cloud Firestore es una base de datos documental NoSQL flexible y escalable. Organiza la información en documentos (que contienen campos y valores) agrupados dentro de colecciones.'
  },
  {
    id: 92,
    unit: 'Unidad 3.1: Firebase Backend & Firestore',
    q: '¿Qué método de Firestore se debe utilizar para escuchar cambios en una colección o documento en tiempo real y actualizar la UI de inmediato sin necesidad de hacer polling?',
    opts: [
      'onSnapshot()',
      'getDocs()',
      'fetchRealtimeStream()',
      'listenToChangesAsync()'
    ],
    a: 0,
    exp: 'A diferencia de `getDocs()` o `getDoc()` que realizan una lectura única (one-shot), `onSnapshot()` abre un listener de WebSocket reactivo persistente que emite un snapshot cada vez que los datos cambian en la nube.'
  },
  {
    id: 93,
    unit: 'Unidad 3.1: Firebase Backend & Firestore',
    q: '¿Cuál es la diferencia entre utilizar `addDoc(collectionRef, data)` y `setDoc(doc(db, "coleccion", id), data)` en Firestore v9+?',
    opts: [
      '`addDoc` genera automáticamente un identificador alfanumérico único aleatorio para el nuevo documento, mientras que `setDoc` requiere especificar explícitamente la referencia al ID del documento.',
      '`addDoc` borra los documentos previos de la colección y `setDoc` los duplica.',
      '`setDoc` solo funciona en bases de datos locales SQLite.',
      '`addDoc` solo admite campos de tipo string y `setDoc` admite fechas.'
    ],
    a: 0,
    exp: '`addDoc` crea un documento nuevo con un ID autogenerado por Firestore. `setDoc` se utiliza cuando se conoce o se quiere controlar la clave primaria (por ejemplo, el UID del usuario provisto por Firebase Auth).'
  },
  {
    id: 94,
    unit: 'Unidad 3.1: Firebase Backend & Firestore',
    q: '¿Qué función de Firebase Authentication permite mantener la persistencia de sesión y reaccionar cuando el usuario inicia o cierra sesión en la app móvil?',
    opts: [
      'onAuthStateChanged(auth, (user) => { ... })',
      'checkIfUserIsLoggedNow()',
      'subscribeToLoginEvent()',
      'verifyUserSessionHeartbeat()'
    ],
    a: 0,
    exp: '`onAuthStateChanged()` es el observador estándar de Firebase Auth. Detecta tokens válidos en el almacenamiento local al iniciar la app y notifica inmediatamente cualquier cambio de autenticación.'
  },
  {
    id: 95,
    unit: 'Unidad 3.1: Firebase Backend & Firestore',
    q: 'En las Reglas de Seguridad (Security Rules) de Cloud Firestore, ¿cómo se garantiza que un usuario solo pueda leer y modificar sus propios documentos personales?',
    opts: [
      'allow read, write: if request.auth != null && request.auth.uid == userId;',
      'allow read, write: if true;',
      'allow access: when database.password == "1234";',
      'allow all: if user.role == "client";'
    ],
    a: 0,
    exp: 'Las Security Rules protegen el backend a nivel de servidor: `request.auth != null` comprueba que la petición provenga de un usuario autenticado, y `request.auth.uid == userId` restringe el acceso a su propio recurso.'
  },

  // =========================================================================
  // UNIDAD 3.2: PERFORMANCE, ANIMACIONES REANIMATED Y TESTING (Preguntas 96 a 98)
  // =========================================================================
  {
    id: 96,
    unit: 'Unidad 3.2: Performance & Reanimated',
    q: '¿Cuál es el rol específico de `React.memo` frente a `useCallback` en la optimización de rendimiento de componentes React Native?',
    opts: [
      '`React.memo` memoriza el componente visual completo para evitar que se re-renderice si sus props no cambiaron, mientras que `useCallback` memoriza la referencia de una función para que no cambie entre renders.',
      '`React.memo` se usa solo en listas y `useCallback` solo en formularios.',
      'Son idénticos y se pueden sustituir libremente uno por otro.',
      '`React.memo` guarda la pantalla en el disco rígido y `useCallback` en la memoria caché del procesador.'
    ],
    a: 0,
    exp: '`React.memo` evita re-renders del componente hijo si sus props son equivalentes. Sin embargo, si se le pasa una función callback creada en el padre sin `useCallback()`, cada render del padre genera una nueva referencia de función, invalidando la optimización de `React.memo`.'
  },
  {
    id: 97,
    unit: 'Unidad 3.2: Performance & Reanimated',
    q: '¿Por qué la biblioteca "FlashList" de Shopify supera en rendimiento y fluidez a la `<FlatList>` tradicional de React Native?',
    opts: [
      'Porque implementa un reciclado real de vistas y celdas nativas basado en `estimatedItemSize`, reduciendo drásticamente la creación y destrucción de nodos nativos en memoria durante el scroll rápido.',
      'Porque comprime los textos en formato binario comprimido.',
      'Porque elimina la necesidad de pasar un array de datos.',
      'Porque descarga el contenido antes de que el usuario abra la aplicación.'
    ],
    a: 0,
    exp: 'Shopify FlashList reutiliza de forma continua los componentes visuales nativos ya instanciados en lugar de desmontarlos y recrearlos desde cero, manteniendo una tasa constante de 60/120 FPS con mínimo uso de CPU.'
  },
  {
    id: 98,
    unit: 'Unidad 3.2: Performance & Reanimated',
    q: 'En React Native Reanimated 3, ¿qué es un "Worklet" y por qué permite animaciones ultra fluidas a 60/120 FPS?',
    opts: [
      'Es una función de JavaScript etiquetada con la directiva `"worklet"` que se ejecuta directamente en el hilo de la interfaz de usuario (UI Thread) sin cruzar el Bridge asíncrono en cada cuadro.',
      'Es un hilo de procesamiento en la nube que calcula los fotogramas en servidores de Amazon.',
      'Es un archivo de animación vectorial generado por Adobe After Effects en formato Lottie.',
      'Es una función que pausa la ejecución de la app para que el procesador no se caliente.'
    ],
    a: 0,
    exp: 'Los Worklets son pequeñas funciones JS que el compilador de Babel extrae para ser ejecutadas de forma síncrona en el UI Thread (hilo nativo), calculando transiciones y físicas en tiempo real sin saturar el JavaScript Thread.'
  },

  // =========================================================================
  // UNIDAD 3.3: DEVOPS, EAS BUILD Y DESPLIEGUE EN STORES (Preguntas 99 a 100)
  // =========================================================================
  {
    id: 99,
    unit: 'Unidad 3.3: DevOps, EAS & Despliegue',
    q: '¿Cuál es la diferencia entre compilar un binario en formato APK y un binario en formato AAB (Android App Bundle) mediante EAS Build?',
    opts: [
      'El APK es un binario autónomo para instalación directa (sideloading) o pruebas en dispositivos físicos, mientras que el AAB es el formato obligatorio exigido por Google Play Store para generar descargas optimizadas según el dispositivo del usuario.',
      'El APK es solo para teléfonos de marca Apple y el AAB solo para tabletas Android.',
      'El AAB es un archivo de texto editable y el APK es un archivo de audio.',
      'No existe ninguna diferencia; ambos formatos se suben indistintamente a Google Play Store.'
    ],
    a: 0,
    exp: 'Google Play exige Android App Bundle (.aab) para publicar: Google genera en sus servidores un APK optimizado y reducido a la medida exacta de la arquitectura y resolución de cada teléfono. El APK directo se usa para testing rápido o distribución interna.'
  },
  {
    id: 100,
    unit: 'Unidad 3.3: DevOps, EAS & Despliegue',
    q: '¿Qué tipo de cambios en una aplicación móvil pueden distribuirse a los usuarios instantáneamente mediante Expo Updates / EAS Update (OTA: Over-The-Air) sin pasar por la revisión de las tiendas de Google Play o App Store?',
    opts: [
      'Únicamente modificaciones en el código JavaScript/TypeScript, componentes React, lógica de negocio y recursos estáticos (imágenes/fuentes) que NO requieran modificar el código nativo ni añadir nuevas dependencias con plugins nativos.',
      'Cualquier cambio, incluyendo modificaciones profundas del kernel del sistema operativo.',
      'Solo cambios en la versión de Android y permisos de root del teléfono.',
      'Ningún cambio; Apple y Google prohíben totalmente cualquier actualización sin pasar por revisión de 48 horas.'
    ],
    a: 0,
    exp: 'Las actualizaciones OTA (Over-The-Air) sustituyen el bundle de JavaScript y assets en el dispositivo en tiempo de ejecución. Son ideales para corregir bugs de UI o lógica rápidamente, pero si se agrega una librería que requiere nuevo código nativo (Kotlin/Swift/permisos en manifest), se debe compilar y subir una nueva versión binaria a las tiendas.'
  }
];
