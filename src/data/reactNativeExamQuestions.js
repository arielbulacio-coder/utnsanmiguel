/**
 * Banco oficial de 100 Preguntas de Evaluación Teórica Integral
 * Curso: Creación de Aplicaciones Móviles con React Native & Expo
 * Universidad Nacional de Pilar - Tecnicatura Universitaria en Desarrollo de Software
 * Cátedra: Lic. Ariel Bulacio
 *
 * Estructura de cada ítem:
 * - id: Identificador único (1 al 100)
 * - unit: Unidad temática del programa analítico (Unidad 1 y Unidad 2)
 * - q: Enunciado de la pregunta teórica
 * - opts: Array con las 4 opciones de respuesta
 * - a: Índice de la opción correcta (0-3) en el array base (se desordena dinámicamente)
 * - exp: Justificación pedagógica profunda con cita bibliográfica de los apuntes y libros oficiales (Unidad 1 y 2)
 */

export const reactNativeExamQuestions = [
  {
    "id": 1,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Cuál es la diferencia fundamental entre el flujo administrado (Managed Workflow) de Expo y React Native CLI tradicional?",
    "opts": [
      "Expo Managed gestiona el código nativo (Android/iOS) automáticamente sin necesidad de configurar compiladores nativos manuales, mientras que RN CLI exige configurar carpetas nativas en Xcode y Android Studio.",
      "React Native CLI compila a HTML5 y CSS3 nativo mientras que Expo solo funciona dentro de un WebView simulado.",
      "Expo Managed no permite escribir código JavaScript ni TypeScript, obligando a programar exclusivamente en Kotlin y Swift.",
      "RN CLI solo permite desplegar aplicaciones en Android, mientras que Expo está restringido únicamente al sistema operativo iOS."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 1 & 2] El flujo administrado de Expo abstrae las carpetas nativas /android y /ios, permitiendo desarrollar con JavaScript/TypeScript puro y compilar en la nube con EAS Build, mientras que RN CLI requiere administrar directamente los compiladores nativos."
  },
  {
    "id": 2,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "En la arquitectura tradicional de React Native, ¿cómo se comunican el hilo de JavaScript y el hilo nativo de la plataforma?",
    "opts": [
      "A través del \"Bridge\" (Puente), un canal asíncrono que serializa y deserializa mensajes estructurados en formato JSON.",
      "Mediante acceso directo a memoria compartida a través de punteros de C++ sin serialización.",
      "A través de llamadas síncronas HTTP REST ejecutadas en el puerto local 8080 del dispositivo.",
      "Utilizando un WebSocket bidireccional constante conectado a servidores externos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 1] El Bridge clásico comunica JavaScript y Native mediante un bus asíncrono por lotes serializado en cadenas JSON, lo que en animaciones complejas o desplazamientos de listas de alta velocidad generaba cuellos de botella."
  },
  {
    "id": 3,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Qué componente clave introduce la Nueva Arquitectura (New Architecture) de React Native para eliminar el cuello de botella del Bridge?",
    "opts": [
      "JavaScript Interface (JSI), que permite a JavaScript mantener referencias directas a objetos de C++ nativos e invocar sus métodos sincrónicamente.",
      "Un servidor Node.js embebido dentro del chip de la tarjeta gráfica (GPU).",
      "Un transpilador que convierte el código JSX en archivos binarios ensamblador x86_64 en tiempo real.",
      "La sustitución del motor nativo de Android por una máquina virtual Java exclusiva de Google Chrome."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 1] JSI (JavaScript Interface) desacopla a React Native del Bridge tradicional al permitir llamadas síncronas directas de JS a C++ nativo sin sobrecarga de serialización JSON."
  },
  {
    "id": 4,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Qué función cumple \"Fabric\" en la Nueva Arquitectura de React Native?",
    "opts": [
      "Es el nuevo motor de renderizado que unifica la creación de interfaces nativas calculando árboles de sombras (Shadow Trees) directamente en C++ con soporte de renderizado concurrente.",
      "Es una herramienta para diseñar logotipos e íconos en formato vectorial SVG.",
      "Es un protocolo de base de datos relacional para guardar contraseñas en el dispositivo.",
      "Es el emulador oficial de iOS para sistemas operativos Windows."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 1] Fabric es el sistema de renderizado concurrente de la New Architecture: genera la interfaz de usuario en C++ comunicándose directamente con las vistas nativas sin pasar por el Bridge."
  },
  {
    "id": 5,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Cuál es la ventaja de \"TurboModules\" frente a los módulos nativos tradicionales de React Native?",
    "opts": [
      "Permiten la carga perezosa (Lazy Loading) de módulos nativos bajo demanda solo cuando la aplicación realmente los necesita, acelerando el tiempo de inicio (TTV).",
      "Multiplican por 10 la velocidad de descarga de la conexión Wi-Fi del celular.",
      "Permiten ejecutar código PHP directamente en el microprocesador del teléfono.",
      "Eliminan la necesidad de solicitar permisos de cámara y ubicación."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 1] A diferencia del Bridge tradicional donde todos los módulos nativos se cargaban en el inicio de la app, TurboModules se instancian únicamente en el momento en que se invocan por primera vez."
  },
  {
    "id": 6,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Cuál es el rol del empaquetador Metro Bundler en el flujo de desarrollo de React Native?",
    "opts": [
      "Transpilar y unificar todos los archivos JavaScript, TypeScript y recursos estáticos en un único paquete optimizado (bundle) que transmite al dispositivo en tiempo real.",
      "Publicar la aplicación automáticamente en Google Play y Apple App Store.",
      "Convertir el código JavaScript en sentencias de bases de datos PostgreSQL.",
      "Configurar el chip Bluetooth del teléfono para transferir archivos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Setup Inicial & Toolchain PC] Metro Bundler es el servidor de desarrollo que corre en la PC (puerto 8081); compila el árbol de dependencias y envía el bundle por sockets al dispositivo con soporte de Fast Refresh."
  },
  {
    "id": 7,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Por qué la cátedra recomienda utilizar el motor JavaScript Hermes en lugar de JavaScriptCore (JSC) en Expo y React Native?",
    "opts": [
      "Porque precompila el código JavaScript en bytecode antes de la ejecución (AOT), logrando menor tiempo de inicio, menor consumo de memoria RAM y menor tamaño del APK.",
      "Porque Hermes permite conectar periféricos USB sin necesidad de drivers.",
      "Porque convierte automáticamente aplicaciones de React Native en videojuegos 3D.",
      "Porque elimina la necesidad de escribir hojas de estilos StyleSheet."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 1] Hermes es el motor JS optimizado por Meta para mobile: compila el código en bytecode durante la etapa de construcción, evitando la sobrecarga de compilación JIT en el dispositivo."
  },
  {
    "id": 8,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Qué ventaja didáctica y técnica ofrece la aplicación \"Expo Go\" a los estudiantes durante las clases prácticas?",
    "opts": [
      "Permite ejecutar y depurar la aplicación en un smartphone físico de inmediato escaneando un código QR, sin requerir instalar Android Studio SDK ni Xcode en la computadora.",
      "Permite publicar aplicaciones comerciales en las tiendas oficiales sin pagar la cuenta de desarrollador.",
      "Convierte el teléfono del estudiante en un servidor web Apache de acceso público.",
      "Elimina todos los errores sintácticos de JavaScript de manera automática."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Setup Inicial & Toolchain PC] Expo Go incluye el runtime y módulos nativos precompilados de Expo SDK; los estudiantes prueban en celulares reales sin lidiar con la configuración pesada de Android SDK o Gradle."
  },
  {
    "id": 9,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "¿Qué precaución indispensable debe tomarse al instalar Node.js en una computadora con Windows para comenzar el curso de React Native?",
    "opts": [
      "Asegurarse de que la casilla \"Add to PATH\" esté marcada en el asistente de instalación para poder invocar comandos como `node`, `npm` y `npx` desde la terminal.",
      "Desactivar por completo la tarjeta de red de la PC.",
      "Instalar una versión de Node.js de 32 bits obligatoriamente.",
      "Configurar la PC para que no use contraseñas de administrador."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Setup Inicial & Toolchain PC] Si no se agrega Node.js a la variable de entorno PATH, Windows no reconocerá las herramientas de terminal arrojando el error \"node no se reconoce como un comando interno o externo\"."
  },
  {
    "id": 10,
    "unit": "Unidad 1.1: Fundamentos & Arquitectura",
    "q": "Si la red Wi-Fi de la universidad tiene aislamiento de clientes (AP Isolation) e impide que el celular se conecte a la IP local de la PC, ¿qué comando de Expo resuelve este problema?",
    "opts": [
      "npx expo start --tunnel",
      "npx expo start --offline-only",
      "npx expo install wifi-bypass",
      "npx expo run:server --disable-network"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Setup Inicial & Toolchain PC] El modificador `--tunnel` crea un túnel seguro en la nube de Expo que interconecta la PC y el smartphone mediante URLs seguras, sin importar cortafuegos o aislamiento de clientes en la red local."
  },
  {
    "id": 11,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "¿Por qué en React Native no es posible utilizar etiquetas estándar del DOM web como `<div>` o `<p>`?",
    "opts": [
      "Porque React Native no renderiza sobre un navegador web; utiliza componentes puente (`<View>`, `<Text>`) que mapean a widgets nativos (ViewGroup/TextView en Android, UIView/UILabel en iOS).",
      "Porque React Native está escrito en Python y no reconoce lenguajes de etiquetas.",
      "Porque el consorcio W3C prohibió el uso de etiquetas HTML en teléfonos móviles.",
      "Porque las etiquetas `<div>` consumen el doble de batería que los componentes nativos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] React Native prescinde del DOM del navegador; `<View>` mapea a un contenedor nativo de plataforma y `<Text>` es el único componente válido para envolver texto en pantalla."
  },
  {
    "id": 12,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "¿Cuál es la orientación por defecto del eje principal (`flexDirection`) en un contenedor `<View>` en React Native?",
    "opts": [
      "'column' (de arriba hacia abajo), adaptado a la lectura vertical de las pantallas de smartphones.",
      "'row' (horizontal de izquierda a derecha), idéntico al estándar CSS de la web.",
      "'grid-matrix', distribuyendo los elementos en 4 cuadrantes iguales.",
      "'diagonal-right', alineando los componentes a 45 grados."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] A diferencia de la Web donde el valor predeterminado es `row`, en React Native `flexDirection` es `column` por defecto para optimizar la jerarquía vertical natural de los dispositivos móviles."
  },
  {
    "id": 13,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "¿Cuál es el beneficio técnico de declarar estilos mediante `StyleSheet.create({...})` en lugar de pasar objetos literales inline en la propiedad `style`?",
    "opts": [
      "Valida sintaxis en tiempo de desarrollo, genera IDs numéricos optimizados para el motor nativo y evita recrear nuevos objetos en memoria en cada renderizado.",
      "Traduce automáticamente las fuentes a tipografías de Apple sin permiso.",
      "Permite usar selectores CSS complejos como `:hover`, `:nth-child` y pseudoelementos.",
      "Comprime las imágenes asociadas al 50% de su peso original."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `StyleSheet.create` congela los estilos y asigna identificadores numéricos estables, optimizando el paso de propiedades al árbol nativo y evitando la recolección de basura innecesaria."
  },
  {
    "id": 14,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "¿En qué unidad de medida se expresan los valores numéricos de tamaño (ancho, alto, fuentes) en React Native (`width: 50`)?",
    "opts": [
      "Píxeles independientes de densidad (dp en Android, pt en iOS), escalados proporcionalmente según la densidad de píxeles (DPI) de la pantalla física.",
      "Centímetros físicos reales medidos sobre el cristal del dispositivo.",
      "Píxeles físicos absolutos de hardware sin escala (px).",
      "Porcentajes fijos del tamaño de la batería."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] Los tamaños en React Native son adimensionales y representan puntos lógicos (pt/dp), permitiendo que un botón de tamaño 50 se perciba visualmente igual en pantallas de baja o alta densidad (Retina / xxhdpi)."
  },
  {
    "id": 15,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "Según la ergonomía de interfaces móviles analizada por Cuello & Vittone, ¿qué es la \"Zona del Pulgar\" (Thumb Zone)?",
    "opts": [
      "El área de la pantalla del smartphone que el usuario puede alcanzar cómodamente con el dedo pulgar utilizando una sola mano, concentrada en el tercio inferior y central.",
      "La zona del lector de huellas dactilares ubicado en el dorso del teléfono.",
      "El borde superior izquierdo de la pantalla donde se ubica el botón de retroceso nativo.",
      "Una advertencia de ergonomía médica para no usar el teléfono más de 10 minutos continuos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 3] La \"Thumb Zone\" clasifica la pantalla en zonas de acceso cómodo, alcanzable y difícil; las acciones primarias y pestañas principales deben ubicarse en la zona cómoda inferior."
  },
  {
    "id": 16,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "¿Cuál es el tamaño mínimo de objetivo táctil (Touch Target) recomendado por las guías de diseño móvil (Apple HIG y Google Material Design) para evitar toques erróneos?",
    "opts": [
      "Entre 44x44 pt y 48x48 dp para garantizar un área táctil cómoda para la yema del dedo humano.",
      "Exactamente 10x10 píxeles para aprovechar el espacio de pantalla al máximo.",
      "Al menos 150x150 dp ocupando la mitad del ancho del teléfono.",
      "No existen recomendaciones de tamaño táctil en sistemas operativos móviles."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 3] Un touch target inferior a 44x44 pt o 48x48 dp provoca frustración y toques accidentales debido a la imprecisión de la yema del dedo frente a un cursor de mouse de escritorio."
  },
  {
    "id": 17,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "En un contenedor con `flexDirection: \"column\"`, ¿qué propiedad de Flexbox controla la alineación de los elementos en el eje horizontal (eje cruzado)?",
    "opts": [
      "alignItems",
      "justifyContent",
      "flexWrap",
      "alignContent"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `justifyContent` siempre alinea en el eje principal (vertical cuando es column), mientras que `alignItems` alinea en el eje cruzado perpendicular (horizontal)."
  },
  {
    "id": 18,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "¿Cuál es la ventaja de utilizar `<Pressable>` en lugar del componente tradicional `<TouchableOpacity>` en interfaces modernas de React Native?",
    "opts": [
      "Ofrece una API flexible con acceso directo al estado táctil `{ pressed }`, retardos configurables, efectos ripple en Android y mejor rendimiento.",
      "Garantiza que el botón nunca pueda ser presionado por error.",
      "Transforma cualquier texto en un archivo de audio audible.",
      "Obliga al usuario a ingresar su código PIN antes de ejecutar el toque."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] `<Pressable>` es el reemplazo moderno de los Touchable*: permite estilar dinámicamente según `({ pressed }) => [...]`, soporta hitSlop y eventos avanzados como `onLongPress`."
  },
  {
    "id": 19,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "Si un componente hijo dentro de una `<View>` padre tiene la propiedad `flex: 1`, ¿qué comportamiento adopta en pantalla?",
    "opts": [
      "Se expande para ocupar todo el espacio disponible residual del contenedor padre en el eje principal.",
      "Se comprime a un tamaño de 1 píxel de ancho.",
      "Se oculta de la pantalla haciéndose invisible.",
      "Fija su tamaño exactamente al 1% del ancho del teléfono."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `flex: 1` indica al algoritmo de Yoga que el componente debe crecer de forma proporcional para llenar el espacio libre disponible en su contenedor contenedor."
  },
  {
    "id": 20,
    "unit": "Unidad 1.2: Componentes Core & Estilos",
    "q": "Según los principios de diseño de interfaces de Ian Sommerville (Capítulo 16), ¿por qué es crítico proveer retroalimentación visual inmediata ante un toque táctil?",
    "opts": [
      "Porque confirma al usuario que el sistema ha detectado su acción, reduciendo la incertidumbre y evitando toques duplicados accidentales durante operaciones lentas.",
      "Porque de lo contrario el teléfono se bloquea automáticamente por seguridad.",
      "Para que la pantalla consuma menos batería durante la interacción.",
      "Porque los estándares de software prohíben interfaces con respuestas mayores a 1 milisegundo."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseño de Interfaces - Ian Sommerville, Cap. 16] El principio de retroalimentación establece que el usuario debe ser informado oportunamente del estado del sistema; un cambio de opacidad o spinner previene toques múltiples repetidos."
  },
  {
    "id": 21,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿Qué sucede internamente cuando se invoca la función modificadora de un hook `useState` (ej: `setContador(5)`) con un valor diferente al actual?",
    "opts": [
      "React programa un re-renderizado del componente para calcular el nuevo árbol virtual y sincronizar los cambios en la interfaz nativa.",
      "Se reinicia toda la aplicación móvil desde la pantalla de bienvenida.",
      "Se sobrescribe el código fuente del archivo en el disco de la computadora.",
      "El sistema operativo bloquea la ejecución de JavaScript hasta el siguiente día."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] `useState` notifica a React que el estado cambió, lo que desencadena un nuevo ciclo de renderizado para calcular las diferencias (reconciliación) y actualizar las vistas nativas."
  },
  {
    "id": 22,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "En React Native, ¿por qué está terminantemente prohibido mutar un array de estado directamente con métodos como `items.push(nuevoItem)`?",
    "opts": [
      "Porque mutar el array no cambia su referencia en memoria, impidiendo que React detecte el cambio y provocando que la interfaz de usuario no se actualice.",
      "Porque el compilador de TypeScript borra los elementos del array de forma automática.",
      "Porque el método `push()` solo existe en el lenguaje C++ y no en JavaScript.",
      "Porque los teléfonos Android arrojan una excepción de hardware al mutar arrays."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] React compara referencias mediante igualdad estricta (`Object.is`). Si se muta el array con `push()`, la referencia sigue siendo la misma y React asume que no hubo cambios, omitiendo el re-render."
  },
  {
    "id": 23,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿Cuál es la forma correcta e inmutable de agregar un nuevo elemento a un array en un estado `const [lista, setLista] = useState([])`?",
    "opts": [
      "setLista(prevLista => [...prevLista, nuevoElemento]) utilizando el operador spread (...) para generar un nuevo array.",
      "lista.push(nuevoElemento); setLista(lista);",
      "setLista(lista = lista + nuevoElemento);",
      "setLista(Object.assign(nuevoElemento, lista));"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] Crear un nuevo array con el operador spread `[...prevLista, nuevoElemento]` asegura una nueva referencia de memoria y garantiza inmutabilidad estricta."
  },
  {
    "id": 24,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "Si se ejecutan tres llamadas seguidas a `setContador(contador + 1)` dentro del mismo manejador de evento, ¿cuál será el incremento real del valor si `contador` valía 0?",
    "opts": [
      "El contador quedará en 1, porque las tres llamadas leyeron el mismo valor de `contador` capturado en la clausura (closure) del render actual.",
      "El contador aumentará a 3 de forma garantizada.",
      "El contador se multiplicará por 9.",
      "React arrojará un error de desbordamiento de pila (Stack Overflow)."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] En un mismo ciclo de renderizado, `contador` mantiene el valor 0 en su clausura. Para encadenar incrementos acumulativos se debe usar la forma funcional: `setContador(c => c + 1)`."
  },
  {
    "id": 25,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿En qué momento se ejecuta la función de efecto de `useEffect(..., [])` cuando su array de dependencias está completamente vacío?",
    "opts": [
      "Únicamente una sola vez, justo después de que el componente se monta por primera vez en la pantalla.",
      "En cada milisegundo de manera ininterrumpida.",
      "Antes de que el archivo JSX sea leído por el compilador.",
      "Solo cuando el usuario apaga la pantalla de su teléfono."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] Un array de dependencias vacío `[]` indica que el efecto no depende de ninguna prop ni estado, ejecutándose únicamente tras el primer montaje del componente (ideal para peticiones iniciales)."
  },
  {
    "id": 26,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿Para qué sirve la función de limpieza (cleanup function) que puede retornar un `useEffect` (`return () => { clearInterval(timer); }`)?",
    "opts": [
      "Para cancelar suscripciones, detener temporizadores o liberar listeners antes de que el componente se desmonte, evitando fugas de memoria (memory leaks).",
      "Para borrar el caché de la aplicación en el almacenamiento del dispositivo.",
      "Para reiniciar el teléfono celular al salir de la pantalla.",
      "Para formatear el código fuente aplicando reglas de Prettier."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] La función de limpieza se ejecuta al desmontarse el componente o antes de re-ejecutar el efecto si las dependencias cambiaron, evitando fugas de memoria por listeners huérfanos."
  },
  {
    "id": 27,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿Qué es el \"Estado Derivado\" y por qué se desaconseja duplicarlo en un `useState` adicional?",
    "opts": [
      "Es un valor que puede calcularse directamente a partir del estado existente (ej: total = items.reduce(...)); duplicarlo en otro estado genera desincronización y renders redundantes.",
      "Es un estado que solo funciona en componentes de clase antiguos.",
      "Es una función nativa de Android para calcular la carga de la batería.",
      "Es un tipo de base de datos relacional para guardar contraseñas."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] Si un valor puede computarse a partir de props o estados existentes, debe calcularse durante el render o memorizarse con `useMemo`, nunca almacenarse en un estado duplicado que pueda quedar desfasado."
  },
  {
    "id": 28,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿Por qué ejecutar `setEstado(nuevoValor)` directamente dentro del cuerpo principal de un componente funcional provoca un error de bucle infinito (\"Too many re-renders\")?",
    "opts": [
      "Porque cada ejecución del render dispara `setEstado`, el cual provoca un nuevo render, entrando en un ciclo infinito inmediato.",
      "Porque React Native limita las llamadas de estado a 10 por día.",
      "Porque el compilador de Babel bloquea las funciones que tienen más de 5 líneas.",
      "Porque se agota la memoria del emulador al primer intento."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] Las llamadas a actualización de estado dentro del cuerpo de render provocan un nuevo render inmediatamente. Deben estar dentro de manejadores de eventos o de `useEffect` condicionados."
  },
  {
    "id": 29,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "¿Cuál es la diferencia primordial entre el hook `useRef` y el hook `useState`?",
    "opts": [
      "Modificar la propiedad `.current` de `useRef` NO provoca un re-renderizado del componente, mientras que modificar un estado con `useState` sí lo provoca.",
      "`useRef` solo permite guardar números y `useState` solo guarda textos.",
      "`useRef` borra su valor cada vez que la pantalla cambia de orientación.",
      "No existe diferencia técnica; son alias del mismo método en React."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 3] `useRef` persiste un valor mutable a lo largo de los renders sin desencadenar una nueva renderización visual al cambiar `.current`, ideal para referencias a componentes o contadores de control."
  },
  {
    "id": 30,
    "unit": "Unidad 1.2: Estado & Inmutabilidad",
    "q": "En el diseño de interfaces según Sommerville, ¿qué principio de interacción se aplica al deshabilitar el botón de envío mientras un estado `isSubmitting` es verdadero?",
    "opts": [
      "Prevención y tolerancia a fallos: evita que el usuario envíe formularios duplicados o genere peticiones concurrentes conflictivas ante lentitud de red.",
      "Principio de sorpresa mínima al obligar al usuario a reiniciar la app.",
      "Principio de diversidad de usuarios permitiendo accesos sin contraseña.",
      "Principio de recuperación rápida cerrando la conexión Wi-Fi."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseño de Interfaces - Ian Sommerville, Cap. 16] La prevención de errores de interacción es una directriz básica: deshabilitar controles y mostrar estado de carga previene transacciones duplicadas del usuario."
  },
  {
    "id": 31,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Por qué `<FlatList>` es enormemente superior a `<ScrollView>` al renderizar colecciones de cientos o miles de elementos?",
    "opts": [
      "Porque `<FlatList>` implementa virtualización: solo monta en memoria las celdas que están visibles en la pantalla, reciclando nodos nativos a medida que el usuario hace scroll.",
      "Porque `<FlatList>` comprime las imágenes a blanco y negro para ahorrar batería.",
      "Porque `<ScrollView>` solo permite mostrar un máximo de 5 elementos en Android.",
      "Porque `<FlatList>` envía los datos al navegador web antes de dibujarlos en pantalla."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `<ScrollView>` renderiza todos sus hijos simultáneamente agotando la memoria RAM con listas largas. `<FlatList>` virtualiza y desmonta celdas fuera del viewport para mantener 60 FPS estables."
  },
  {
    "id": 32,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Cuál es la función crítica de la propiedad `keyExtractor` en una `<FlatList>`?",
    "opts": [
      "Asignar una clave única y estable a cada elemento para que el algoritmo de reconciliación de React identifique con precisión qué elementos se agregaron, cambiaron o eliminaron.",
      "Cifrar los datos bancarios del usuario utilizando una clave pública RSA.",
      "Establecer el orden alfabético de la lista de forma obligatoria.",
      "Determinar el color de fondo de cada fila en modo nocturno."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] Proporcionar claves estables con `keyExtractor={(item) => item.id}` permite a React reutilizar componentes sin re-renderizar toda la lista ante cambios menores."
  },
  {
    "id": 33,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Por qué nunca se debe utilizar el índice del array (`(item, index) => index.toString()`) como clave en `keyExtractor` si la lista permite filtrar, ordenar o eliminar elementos?",
    "opts": [
      "Porque si el orden de los elementos cambia, los índices cambian de posición, confundiendo a React y provocando animaciones erróneas o pérdida de estado en las celdas.",
      "Porque los índices solo admiten números negativos en teléfonos móviles.",
      "Porque React Native prohíbe el uso de números enteros como claves.",
      "Porque el índice del array ocupa 10 veces más memoria que un string UUID."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] Usar el índice como key causa desajustes visuales graves en listas mutables: al eliminar el primer elemento, el segundo hereda la clave 0 y mantiene el estado interno del anterior."
  },
  {
    "id": 34,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Qué impacto de rendimiento tiene configurar la prop `initialNumToRender={10}` en una `<FlatList>`?",
    "opts": [
      "Define cuántos elementos iniciales se renderizan en el primer lote, reduciendo drásticamente el tiempo de carga visual de la pantalla.",
      "Limita la lista a solo 10 elementos bloqueando permanentemente el scroll.",
      "Obliga a descargar 10 megabytes de datos por segundo.",
      "Borra los primeros 10 elementos si la batería del celular está baja."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `initialNumToRender` controla el tamaño del primer lote de montaje. Un valor ajustado a la pantalla acelera la respuesta inicial visual (First Contentful Paint)."
  },
  {
    "id": 35,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "En el análisis de usabilidad de Dialnet (Capítulo 2), ¿qué riesgo ergonómico se detecta al diseñar listas móviles con alta densidad de información y celdas muy pequeñas?",
    "opts": [
      "Disminuye la precisión táctil, aumenta la carga cognitiva del usuario y eleva la tasa de pulsaciones erróneas en botones adyacentes.",
      "El teléfono se recalienta provocando reinicios espontáneos.",
      "La pantalla del celular pierde brillo progresivamente.",
      "El sistema operativo Android suspende el proceso por falta de memoria."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Usabilidad en Aplicaciones Móviles - Dialnet / Univ. de Zaragoza, Cap. 2] La sobrecarga informativa y la falta de espaciado táctil reducen la velocidad de escaneo del ojo y generan errores de selección con los dedos."
  },
  {
    "id": 36,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Qué propiedad de `<FlatList>` permite renderizar una interfaz personalizada cuando el array de datos está vacío (`data={[]}`)?",
    "opts": [
      "ListEmptyComponent",
      "renderEmptyFallback",
      "emptyViewPlaceholder",
      "fallbackWhenZero"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `ListEmptyComponent` renderiza un componente visual (icono, mensaje explicativo o botón de reintentar) cuando el array proporcionado en `data` no contiene elementos."
  },
  {
    "id": 37,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Cómo se implementa el patrón de desplazamiento infinito (Infinite Scrolling) para paginación de datos en una `<FlatList>`?",
    "opts": [
      "Utilizando la propiedad `onEndReached` combinada con `onEndReachedThreshold` para disparar la carga de la siguiente página al acercarse al final del scroll.",
      "Creando un bucle infinito `while(true)` dentro de un componente `<View>`.",
      "Aumentando el tamaño de la pantalla física del teléfono con CSS.",
      "Descargando toda la base de datos completa de un solo intento al iniciar."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `onEndReached` detecta cuando el usuario se encuentra a cierta distancia del pie de la lista (definida por `onEndReachedThreshold`), permitiendo encadenar peticiones paginadas."
  },
  {
    "id": 38,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Qué optimización de rendimiento permite la propiedad `getItemLayout` en una `<FlatList>`?",
    "opts": [
      "Permite omitir el cálculo dinámico de dimensiones si los elementos tienen una altura fija conocida, acelerando el salto inmediato a índices lejanos (`scrollToIndex`).",
      "Convierte automáticamente las listas verticales en círculos tridimensionales.",
      "Permite renderizar elementos sin definir un componente visual.",
      "Calcula el precio total de una lista de compras sin usar JavaScript."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] Al proveer `getItemLayout: (data, index) => ({ length, offset, index })`, FlatList no necesita medir en tiempo de ejecución cada celda, permitiendo scroll instantáneo de alto rendimiento."
  },
  {
    "id": 39,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Cómo se agrega el gesto de \"deslizar para actualizar\" (Pull-to-Refresh) en una `<FlatList>`?",
    "opts": [
      "Mediante las propiedades `refreshing={isRefreshing}` y `onRefresh={cargarNuevosDatos}`, o pasando un componente `<RefreshControl>` en `refreshControl`.",
      "Configurando el acelerómetro para que detecte sacudidas del teléfono.",
      "Presionando dos veces el botón físico de encendido del dispositivo.",
      "Escribiendo `style={{ refresh: \"pull-down\" }}` en el contenedor."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `<RefreshControl>` provee el indicador nativo giratorio de recarga al estirar la lista desde el tope, sincronizándose con el estado booleano de actualización."
  },
  {
    "id": 40,
    "unit": "Unidad 1.2: Listas Optimizadas & FlatList",
    "q": "¿Cuál es la mejor práctica para separar celdas en una lista sin añadir márgenes que provoquen espacios vacíos indeseados al principio o al final?",
    "opts": [
      "Utilizar la propiedad `ItemSeparatorComponent={() => <View style={styles.separador} />}`.",
      "Agregar `marginBottom: 20` a todos los elementos del array de datos.",
      "Poner un elemento de texto `<Text>---</Text>` manual en cada fila.",
      "Usar un `setTimeout` que pause el renderizado entre cada celda."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 4] `ItemSeparatorComponent` se dibuja exclusivamente entre elementos adyacentes, omitiendo el separador antes del primer elemento y después del último."
  },
  {
    "id": 41,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿En qué consiste el paradigma de \"File-based Routing\" adoptado por Expo Router v3+?",
    "opts": [
      "La estructura de archivos y carpetas dentro del directorio `app/` define automáticamente las rutas, pantallas y jerarquías de navegación de la aplicación móvil.",
      "Obliga al usuario a navegar abriendo archivos de texto desde el explorador de archivos del teléfono.",
      "Requiere declarar manualmente todas las rutas en un archivo XML externo.",
      "Convierte cada archivo JavaScript en una aplicación independiente separada."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Expo Router & Navegación] Inspirado en la web moderna, Expo Router mapea la estructura de carpetas de `app/` directamente a pantallas nativas, sincronizando URLs profundas (Deep Linking) automáticamente."
  },
  {
    "id": 42,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Cuál es el rol del archivo especial `_layout.tsx` en una carpeta dentro de Expo Router?",
    "opts": [
      "Define el contenedor de navegación compartido (Stack, Tabs o Drawer) que envuelve a todas las pantallas hijas ubicadas en ese nivel de la estructura.",
      "Es un archivo para definir los colores primarios del CSS global exclusivamente.",
      "Es el archivo donde se guardan las contraseñas de la base de datos de usuarios.",
      "Es un archivo de respaldo que se crea cuando la app se cuelga."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Expo Router & Navegación] `_layout.tsx` actúa como el layout común de un grupo o carpeta: define cabeceras, pestañas `<Tabs>`, animaciones de transición y mantiene la coherencia de estado entre pantallas hijas."
  },
  {
    "id": 43,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "Según Cuello & Vittone (Capítulo 4), ¿cuándo es recomendable utilizar un patrón de pestañas inferiores (Bottom Tabs) en una aplicación móvil?",
    "opts": [
      "Para las secciones principales e independientes de la aplicación (entre 3 y 5 destinos) que el usuario necesita alternar con un solo toque ergonómico en la pantalla.",
      "Solo cuando la aplicación tenga más de 50 secciones diferentes.",
      "Para formularios de pago donde se debe ocultar el botón de confirmación.",
      "Exclusivamente en tabletas de más de 12 pulgadas."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 4] Las pestañas inferiores son el patrón móvil por excelencia para los destinos de nivel superior: ofrecen visibilidad permanente de ubicación y acceso directo con el pulgar."
  },
  {
    "id": 44,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Cómo se define una ruta dinámica en Expo Router para capturar un parámetro como el identificador de un producto (`/producto/45`)?",
    "opts": [
      "Nombrando el archivo con corchetes: `app/producto/[id].tsx` y recuperando el valor mediante `useLocalSearchParams()`.",
      "Creando 100 archivos estáticos llamados `producto1.tsx`, `producto2.tsx`, etc.",
      "Escribiendo `producto{id}.tsx` con llaves cuadradas.",
      "Declarando una variable global en el archivo `index.html`."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Expo Router & Navegación] La convención de corchetes `[id].tsx` marca una ruta parametrizada; `useLocalSearchParams()` expone el valor capturado (`{ id }`) dentro del componente."
  },
  {
    "id": 45,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Qué significa que una carpeta en Expo Router esté nombrada entre paréntesis, como `app/(auth)/` o `app/(tabs)/`?",
    "opts": [
      "Es un grupo de rutas que permite organizar la estructura y layouts sin que el nombre del grupo figure en la URL de navegación final.",
      "Indica que la carpeta está oculta y no se incluirá en el compilado final del APK.",
      "Es una carpeta experimental que se borrará en la siguiente versión de Expo.",
      "Indica que todas las pantallas de esa carpeta solo funcionan en modo avión."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Expo Router & Navegación] Los nombres entre paréntesis son grupos lógicos organizacionales: agrupan pantallas bajo un `_layout` propio (ej: auth o tabs) sin alterar el path de las rutas resultantes."
  },
  {
    "id": 46,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Cómo funciona la navegación de tipo Pila (`<Stack>`) en aplicaciones móviles según los patrones de Cuello & Vittone?",
    "opts": [
      "Funciona como una pila LIFO (Last In, First Out): cada nueva pantalla se apila sobre la anterior, y al retroceder se desapila revelando la pantalla previa.",
      "Muestra todas las pantallas de la aplicación abiertas en mosaico simultáneamente.",
      "Obliga al usuario a reiniciar la aplicación para ver la pantalla anterior.",
      "Solo permite moverse de derecha a izquierda en un carrusel infinito."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 4] El patrón Stack modela la navegación jerárquica: al hacer click en un detalle se apila la nueva vista, y el botón \"Atrás\" desapila volviendo al estado anterior intacto."
  },
  {
    "id": 47,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Qué diferencia visual y funcional introduce una pantalla configurada con `options={{ presentation: \"modal\" }}` en un Stack?",
    "opts": [
      "Se desliza desde la parte inferior cubriendo parcial o totalmente la pantalla, orientada a tareas breves y autocontenidas que el usuario puede descartar hacia abajo.",
      "Borra el historial de navegación para que el usuario no pueda volver.",
      "Bloquea la pantalla con una alerta sonora que no se puede apagar.",
      "Convierte el texto de la pantalla en un mensaje de voz en segundo plano."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 4] Las vistas modales interrumpen el flujo principal para una subtarea puntual (ej: filtros, confirmación, nuevo ítem); se cierran con una acción explícita de \"Cancelar\" o deslizamiento."
  },
  {
    "id": 48,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Cómo se implementa una redirección declarativa y segura en Expo Router si el usuario no tiene una sesión activa?",
    "opts": [
      "Renderizando el componente `<Redirect href=\"/login\" />` dentro del layout o de la pantalla protegida.",
      "Llamando a `window.location.reload()` repetidamente.",
      "Cerrando el proceso de la aplicación con `exit(0)`.",
      "Mostrando un texto que le pida al usuario que escriba la URL a mano."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Expo Router & Navegación] `<Redirect href=\"...\" />` redirige de forma declarativa y segura antes de que se monte la pantalla protegida, garantizando que usuarios no autenticados no visualicen datos privados."
  },
  {
    "id": 49,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "¿Cuál es la diferencia entre navegar con `router.push(\"/perfil\")` y navegar con `router.replace(\"/perfil\")`?",
    "opts": [
      "`push` agrega la nueva pantalla sobre la pila permitiendo volver atrás, mientras que `replace` sustituye la pantalla actual en el historial sin permitir retroceder a ella.",
      "`push` solo funciona en iOS y `replace` solo funciona en Android.",
      "`replace` reinicia la base de datos y `push` la guarda.",
      "No existe ninguna diferencia; son métodos sinónimos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Expo Router & Navegación] `router.replace` se utiliza comúnmente tras un Login o Logout exitoso para evitar que el usuario vuelva a la pantalla anterior al presionar el botón de retroceso nativo."
  },
  {
    "id": 50,
    "unit": "Unidad 1.3: Expo Router & Navegación",
    "q": "Según Ian Sommerville (Capítulo 16), ¿por qué es fundamental mantener la coherencia y orientación del usuario en la navegación de un sistema?",
    "opts": [
      "Porque si la navegación es impredecible o carece de indicadores de ubicación actual, el usuario experimenta desorientación espacial, incrementando la tasa de abandono.",
      "Porque los procesadores móviles consumen más energía al procesar rutas inconsistentes.",
      "Para que la aplicación ocupe menos espacio en la memoria interna del teléfono.",
      "Porque las tiendas de aplicaciones exigen que todas las pantallas tengan exactamente el mismo título."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseño de Interfaces - Ian Sommerville, Cap. 16] El principio de modelo mental establece que el usuario debe saber en todo momento \"dónde está\", \"cómo llegó allí\" y \"cómo regresar\" con facilidad."
  },
  {
    "id": 51,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Cuál es la principal ventaja de Zustand como gestor de estado global frente a Redux tradicional en React Native?",
    "opts": [
      "Es sumamente ligero, tiene una API minimalista basada en hooks, no requiere configurar reducers/actions complejos ni envolver la aplicación en múltiples `<Provider>`.",
      "Está programado en lenguaje ensamblador para ejecutarse 100 veces más rápido.",
      "Permite omitir la creación de componentes visuales en la app.",
      "Descarga los productos del servidor sin necesidad de tener internet."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] Zustand elimina el boilerplate excesivo de Redux (actions, reducers, dispatchers) permitiendo crear almacenes globales mediante una función simple `create()` consumible directamente con hooks."
  },
  {
    "id": 52,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Cómo se define un store básico de carrito de compras utilizando la función `create` de Zustand?",
    "opts": [
      "const useCartStore = create((set) => ({ items: [], addItem: (item) => set((state) => ({ items: [...state.items, item] })) }));",
      "const useCartStore = new DatabaseStore({ tables: [\"items\"] });",
      "const useCartStore = useState([]);",
      "const useCartStore = createStore(item => item.save());"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] Zustand recibe una función que inyecta `set`. Las funciones modificadoras usan `set(state => ({ ... }))` combinando el nuevo estado inmutable de forma concisa."
  },
  {
    "id": 53,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Por qué en Zustand es una buena práctica utilizar selectores al consumir un valor (`const total = useCartStore(state => state.total)`) en lugar de extraer todo el store?",
    "opts": [
      "Porque el selector suscribe al componente únicamente a los cambios de esa propiedad específica, evitando re-renderizados innecesarios cuando otras propiedades cambian.",
      "Porque sin un selector el store se borra de la memoria del teléfono.",
      "Porque los selectores convierten los números en palabras automáticamente.",
      "Porque React Native arroja un error si se extraen más de dos variables a la vez."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] Los selectores atómicos previenen renders masivos: si cambia el nombre de un ítem, un componente que solo lee `total` no se re-renderiza gracias a la igualdad de selector."
  },
  {
    "id": 54,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Por qué el Context API nativo de React puede provocar problemas de rendimiento en aplicaciones con actualizaciones de estado frecuentes (como carritos o contadores)?",
    "opts": [
      "Porque cualquier cambio en el valor del Context re-renderiza a TODOS los componentes que consumen dicho Contexto, sin importar si usan o no la propiedad modificada.",
      "Porque Context API solo funciona en computadoras de escritorio y no en celulares.",
      "Porque Context API borra los datos cada vez que la app pasa a segundo plano.",
      "Porque no permite guardar arrays ni objetos complejos en su valor."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] React Context no tiene mecanismos nativos de suscripción granular fina; cualquier mutación en el Provider dispara el renderizado de todos los consumidores suscritos al contexto."
  },
  {
    "id": 55,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Cómo se logra que el estado de Zustand persista al cerrar y reabrir la app móvil en el dispositivo?",
    "opts": [
      "Utilizando el middleware `persist` de Zustand configurado con `@react-native-async-storage/async-storage` como motor de almacenamiento.",
      "Dejando la aplicación abierta permanentemente en segundo plano.",
      "Enviando los datos por correo electrónico al usuario antes de salir.",
      "Activando el modo nocturno del sistema operativo."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] El middleware `persist` intercepta las mutaciones del store y las serializa automáticamente en AsyncStorage, restaurándolas de forma transparente durante el arranque de la app."
  },
  {
    "id": 56,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Es posible ejecutar operaciones asíncronas (como llamadas a una API REST) directamente dentro de las acciones de un store de Zustand?",
    "opts": [
      "Sí, las acciones de Zustand pueden ser funciones `async` que realizan peticiones con `fetch` o `axios` y luego invocan `set({ data })` al completar.",
      "No, Zustand prohíbe terminantemente el uso de promesas o código asíncrono.",
      "Solo si se instala un middleware adicional complejo como Redux-Saga.",
      "Únicamente si la llamada tarda menos de 10 milisegundos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] A diferencia de Redux que requería thunks externos, en Zustand las acciones son funciones JavaScript ordinarias que soportan `async/await` de forma nativa y directa."
  },
  {
    "id": 57,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "En un store de Zustand, ¿cómo se elimina un producto del carrito respetando la inmutabilidad?",
    "opts": [
      "set((state) => ({ items: state.items.filter(item => item.id !== idEliminar) }))",
      "set((state) => { delete state.items[idEliminar]; return state; })",
      "state.items.splice(idEliminar, 1);",
      "set((state) => { state.items = null; })"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] `Array.prototype.filter()` produce un nuevo array con una nueva referencia que excluye el elemento seleccionado, cumpliendo el principio de inmutabilidad de React."
  },
  {
    "id": 58,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "Según Sommerville (Capítulo 16), ¿qué problema de interacción resuelve contar con una única fuente de verdad (Single Source of Truth) en el estado global?",
    "opts": [
      "Garantiza consistencia visual y de datos en toda la interfaz: si el usuario añade un ítem, el contador del encabezado y la lista del carrito se sincronizan sin desfasajes.",
      "Evita que el usuario tenga que recordar su contraseña de ingreso.",
      "Permite que la app funcione sin batería conectada a un cargador.",
      "Hace que las imágenes se descarguen en menos de 1 segundo."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Diseño de Interfaces - Ian Sommerville, Cap. 16] La consistencia del sistema exige que dos vistas de un mismo modelo reflejen la misma información; un store global centralizado garantiza sincronización total en tiempo real."
  },
  {
    "id": 59,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "¿Cómo se puede leer el valor actual de un store de Zustand fuera del árbol de componentes de React (por ejemplo, en un interceptor de red o función utilitaria)?",
    "opts": [
      "Invocando `useCartStore.getState()`.",
      "Escribiendo `window.store.data` en la consola.",
      "Importando el archivo `.env` de nuevo.",
      "No es posible leer un store de Zustand fuera de componentes de React."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Estado Global con Zustand] Zustand expone `useStore.getState()` y `useStore.setState()`, permitiendo acceder o actualizar el estado desde interceptores de Axios, servicios o eventos nativos sin hooks."
  },
  {
    "id": 60,
    "unit": "Unidad 2.1: Estado Global & Zustand",
    "q": "En el modelado de requisitos del sistema de carrito según Kendall & Kendall, ¿qué validación de negocio debe realizar el store antes de incrementar la cantidad de un ítem?",
    "opts": [
      "Verificar que la cantidad solicitada no supere el stock disponible del producto en la base de datos.",
      "Comprobar que el usuario tenga saldo positivo en su cuenta de Spotify.",
      "Verificar que el teléfono móvil esté cargado al 100%.",
      "Exigir que el producto tenga un número par de caracteres en su nombre."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Análisis y Diseño de Sistemas - Kendall & Kendall, Cap. 13] Las reglas de negocio de integridad de datos exigen validar límites de stock en el cliente y en el servidor antes de comprometer la orden de compra."
  },
  {
    "id": 61,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Cuál es el flujo estándar para realizar una petición HTTP GET y procesar su respuesta JSON con `fetch` en React Native?",
    "opts": [
      "const res = await fetch(url); if (!res.ok) throw new Error(); const data = await res.json();",
      "const data = fetch(url).parseXml();",
      "const data = await fetch(url).toDatabase();",
      "const res = fetch.get(url); const data = res.data;"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 7] `fetch` retorna una promesa con el objeto `Response`. Se debe validar `res.ok` (códigos 200-299) y luego invocar `await res.json()` para parsear el flujo asíncrono."
  },
  {
    "id": 62,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Por qué una llamada con `fetch()` NO entra al bloque `catch` cuando el servidor responde con un código de error HTTP 404 (Not Found) o 500 (Internal Server Error)?",
    "opts": [
      "Porque `fetch` solo rechaza la promesa si ocurre un error de red a nivel físico o DNS; para errores HTTP el servidor sí respondió, requiriendo verificar `res.ok === false`.",
      "Porque los errores 404 y 500 son considerados respuestas exitosas por el navegador.",
      "Porque el bloque `catch` solo funciona con peticiones de tipo POST.",
      "Porque React Native oculta los errores del servidor para que el usuario no se asuste."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 7] A diferencia de Axios, `fetch` resuelve la promesa positivamente ante cualquier respuesta HTTP válida del servidor. Se debe verificar explícitamente `if (!res.ok)` para lanzar el error."
  },
  {
    "id": 63,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Cuáles son los tres estados esenciales que deben gestionarse en la interfaz móvil durante una consulta asíncrona a un backend?",
    "opts": [
      "Carga (loading = true con spinner/skeleton), Éxito (data con la lista de datos) y Error (error con mensaje claro y botón de reintentar).",
      "Inicio, Pausa y Apagado.",
      "Descargando, Instalando y Reiniciando.",
      "Solo se debe gestionar el estado de éxito; los errores nunca deben mostrarse."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 7] El manejo de los tres estados asíncronos (`loading`, `data`, `error`) es la base del diseño robusto en mobile: guía al usuario durante la espera y ofrece recuperación ante fallas."
  },
  {
    "id": 64,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "Según la arquitectura REST descrita en Kendall & Kendall, ¿qué método HTTP se debe emplear para actualizar parcialmente los campos de un recurso existente?",
    "opts": [
      "PATCH",
      "GET",
      "POST",
      "DELETE"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Análisis y Diseño de Sistemas - Kendall & Kendall, Cap. 13] `PATCH` está diseñado para modificaciones parciales (ej: actualizar solo el precio o stock), mientras que `PUT` reemplaza el documento completo y `POST` crea un recurso nuevo."
  },
  {
    "id": 65,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Qué código de estado HTTP indica que una creación de un nuevo producto se completó con éxito en el servidor?",
    "opts": [
      "201 (Created)",
      "200 (OK)",
      "404 (Not Found)",
      "503 (Service Unavailable)"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Análisis y Diseño de Sistemas - Kendall & Kendall, Cap. 13] El estándar HTTP reserva `201 Created` para responder a peticiones POST que dieron origen a un nuevo registro persistente con identificador propio."
  },
  {
    "id": 66,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Cuál es la cabecera (Header) obligatoria que debe enviarse en una petición POST con `fetch` cuando el cuerpo transporta datos serializados en formato JSON?",
    "opts": [
      "'Content-Type': 'application/json'",
      "'Content-Type': 'text/plain'",
      "'Accept-Encoding': 'gzip-only'",
      "'Authorization': 'allow-all'"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 7] La cabecera 'Content-Type': 'application/json' informa al parser del backend que el cuerpo debe interpretarse y deserializarse como un objeto JSON estructurado."
  },
  {
    "id": 67,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Cómo se cancela una petición de red con `fetch` para evitar fugas de memoria o actualizar componentes desmontados si el usuario sale de la pantalla rápidamente?",
    "opts": [
      "Utilizando la API estándar `AbortController` y pasando su señal en `fetch(url, { signal: controller.signal })`.",
      "Desconectando el cable de red de la computadora.",
      "Llamando a `fetch.cancelAllNow()`.",
      "Escribiendo `return false` en el componente."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 7] `AbortController` permite cancelar peticiones en vuelo invocando `controller.abort()` dentro de la función de limpieza del `useEffect` al desmontar la vista."
  },
  {
    "id": 68,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Por qué es fundamental tipar con TypeScript las respuestas esperadas de un endpoint API (`interface Producto { id: number; nombre: string; }`)?",
    "opts": [
      "Porque provee autocompletado en el editor, valida en tiempo de compilación y previene errores críticos al acceder a propiedades inexistentes o mal nombradas.",
      "Porque TypeScript cifra los datos para que el proveedor de internet no los lea.",
      "Porque los celulares Android no admiten código JavaScript sin tipar.",
      "Porque reduce el peso de la base de datos remota a la mitad."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 7] El tipado de contratos API previene errores de ejecución tipo `Cannot read properties of undefined` y documenta de forma explícita el esquema de intercambio entre frontend y backend."
  },
  {
    "id": 69,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "En el estudio de usabilidad móvil de Dialnet (Capítulo 3), ¿qué técnica visual se recomienda para reducir la percepción de latencia de red durante la carga de datos?",
    "opts": [
      "Utilizar pantallas esqueleto (Skeleton Screens) que simulan la estructura del contenido antes de su llegada, en lugar de pantallas en blanco o spinners estáticos aislados.",
      "Ocultar la barra de estado del teléfono.",
      "Aumentar el tamaño de las fuentes al triple.",
      "Reproducir música de fondo mientras se espera la respuesta."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Usabilidad en Aplicaciones Móviles - Dialnet / Univ. de Zaragoza, Cap. 3] Las Skeleton Screens reducen la carga de espera percibida al anticipar el layout visual del contenido final, manteniendo al usuario entretenido cognitivamente."
  },
  {
    "id": 70,
    "unit": "Unidad 2.2: Peticiones de Red & APIs",
    "q": "¿Cómo deben definirse las URLs base de los servidores y llaves públicas de servicios en Expo para que estén disponibles en el código de forma segura?",
    "opts": [
      "En un archivo `.env` utilizando el prefijo oficial `EXPO_PUBLIC_` (ej: `EXPO_PUBLIC_API_URL=https://api.com`).",
      "Escritas a mano dentro de los estilos CSS de los componentes.",
      "Publicadas en el archivo `package.json` en la sección de dependencias.",
      "Dentro del código de un comentario en el archivo `App.tsx`."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 1: Apuntes de Cátedra - Setup Inicial & Toolchain PC] Expo soporta variables de entorno embebidas en el bundle mediante el prefijo `EXPO_PUBLIC_`, permitiendo alternar entornos de desarrollo y producción con total prolijidad."
  },
  {
    "id": 71,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Qué es Supabase y cuál es su motor de base de datos principal para aplicaciones React Native?",
    "opts": [
      "Una plataforma BaaS (Backend as a Service) de código abierto basada en PostgreSQL que expone automáticamente APIs REST instantáneas vía PostgREST y soporte en tiempo real.",
      "Un motor de base de datos NoSQL exclusivo de Google basado en MongoDB.",
      "Un emulador de teléfonos Android desarrollado para correr en terminales Linux.",
      "Un compilador de código Swift para teléfonos con sistema operativo Windows."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] Supabase proporciona una base de datos relacional PostgreSQL completa en la nube y genera automáticamente endpoints REST seguros a partir de las tablas creadas mediante la tecnología PostgREST."
  },
  {
    "id": 72,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Cómo se inicializa el cliente de Supabase en un proyecto React Native / Expo?",
    "opts": [
      "import { createClient } from \"@supabase/supabase-js\"; export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);",
      "const supabase = new PostgresDriver(\"localhost:5432\");",
      "const supabase = importSupabasePackage();",
      "const supabase = createDatabaseConnection(\"sqlite://database.db\");"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] El SDK oficial `@supabase/supabase-js` se inicializa invocando `createClient` con la URL del proyecto y la anon key pública, configurando opcionalmente AsyncStorage para la persistencia."
  },
  {
    "id": 73,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Cuál es la sintaxis correcta para realizar una consulta de lectura (READ) ordenada en la tabla `productos` con Supabase?",
    "opts": [
      "const { data, error } = await supabase.from('productos').select('*').order('id', { ascending: false });",
      "const data = await supabase.query('SELECT ALL FROM productos');",
      "const res = await supabase.readTable('productos');",
      "const { data } = await supabase.get('productos').reverse();"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] En Supabase se usa la sintaxis fluida `.from(\"tabla\").select(\"columnas\").order(...)`. Esto genera internamente la consulta SQL en PostgreSQL y retorna `{ data, error }`."
  },
  {
    "id": 74,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Cómo se inserta un nuevo registro (CREATE) en Supabase y se recupera el objeto recién creado con su ID asignado?",
    "opts": [
      "const { data, error } = await supabase.from('productos').insert([{ nombre: 'Multímetro', precio: 4500 }]).select();",
      "const data = await supabase.createRow('productos', { nombre: 'Multímetro' });",
      "const res = await supabase.push('productos', ['Multímetro', 4500]);",
      "supabase.from('productos').add({ nombre: 'Multímetro' });"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] `.insert([...])` inserta una o varias filas en la tabla SQL. Encadenar `.select()` al final le indica al motor de PostgreSQL que ejecute `RETURNING *`, devolviendo la fila creada con su ID generado."
  },
  {
    "id": 75,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Cómo se ejecuta una actualización (UPDATE) de precio y stock de un producto específico por su ID en Supabase?",
    "opts": [
      "const { data, error } = await supabase.from('productos').update({ precio: 5200, stock: 15 }).eq('id', productoId);",
      "const res = await supabase.modify('productos').where('id', productoId).set({ precio: 5200 });",
      "supabase.from('productos').patch(productoId, { precio: 5200 });",
      "const data = await supabase.from('productos').change({ precio: 5200 });"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] `.update({ ... }).eq(\"id\", productoId)` aplica los cambios exclusivamente a las filas que coincidan con la condición de igualdad `.eq()`, equivalente a `UPDATE productos SET ... WHERE id = ...`."
  },
  {
    "id": 76,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Cuál es la función para eliminar un registro (DELETE) por su identificador primario en Supabase?",
    "opts": [
      "const { error } = await supabase.from('productos').delete().eq('id', productoId);",
      "supabase.from('productos').remove(productoId);",
      "const { data } = await supabase.dropRow('productos', productoId);",
      "supabase.truncate('productos').where('id', productoId);"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] `.delete().eq(\"id\", productoId)` elimina las filas que cumplen la condición. Si no hubo errores, `error` será `null` y la fila desaparecerá de la base de datos PostgreSQL."
  },
  {
    "id": 77,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Qué es \"Row Level Security\" (RLS) en PostgreSQL Supabase y por qué debe habilitarse en las tablas de producción?",
    "opts": [
      "Es un mecanismo de seguridad a nivel de motor SQL que controla qué filas puede leer, insertar o modificar cada usuario según políticas (Policies) basadas en roles o su UID.",
      "Es un algoritmo que apaga la pantalla del celular si alguien mira de reojo.",
      "Es una función para encriptar los cables de red de la universidad.",
      "Es un plugin para que los botones de la interfaz se dibujen con bordes redondeados."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] Row Level Security (RLS) aplica reglas granulares a nivel de fila en la base de datos SQL. Si una tabla no tiene políticas RLS configuradas, ningún usuario no autorizado podrá leer o escribir desde el cliente."
  },
  {
    "id": 78,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Cómo traduce PostgREST las consultas de la aplicación móvil hacia la base de datos PostgreSQL en Supabase?",
    "opts": [
      "Transforma las peticiones HTTP REST recibidas en consultas SQL parametrizadas nativas ejecutadas directamente por PostgreSQL, serializando la respuesta en JSON de alto rendimiento.",
      "Convierte cada consulta en un archivo de texto en disco y lo lee con Python.",
      "Envía las consultas por correo electrónico al administrador del sistema.",
      "Guarda los datos en la memoria RAM del celular y nunca los envía a internet."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Supabase PostgreSQL & APIs REST] PostgREST es el servidor web que expone PostgreSQL directamente como una API RESTful limpia, convirtiendo verbos HTTP en sentencias SQL eficientes y seguras."
  },
  {
    "id": 79,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "¿Para qué se utiliza la biblioteca `@react-native-async-storage/async-storage` en el desarrollo móvil con React Native?",
    "opts": [
      "Para persistir datos de manera local en el almacenamiento interno del dispositivo en formato clave-valor de forma asíncrona (ej: tokens, preferencias, caché offline).",
      "Para formatear discos duros externos conectados por USB.",
      "Para aumentar la velocidad del reloj del microprocesador móvil.",
      "Para compilar aplicaciones de React Native a archivos binarios de Windows."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] AsyncStorage es el almacenamiento clave-valor persistente estándar en React Native; los datos sobreviven al cierre de la app y reinicio del dispositivo."
  },
  {
    "id": 80,
    "unit": "Unidad 2.2: Supabase PostgreSQL & CRUD",
    "q": "En el diseño de modelos de bases de datos según Kendall & Kendall, ¿por qué es fundamental definir claves primarias (Primary Keys) autoincrementales o UUIDs en las tablas relacionales?",
    "opts": [
      "Para garantizar la unicidad de cada entidad, facilitar relaciones con claves foráneas y permitir operaciones de actualización y borrado inequívocas.",
      "Para que la base de datos sea compatible con teléfonos de pantalla pequeña.",
      "Para que los usuarios puedan iniciar sesión sin ingresar su correo.",
      "Para que las tablas no tengan más de 10 columnas."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Análisis y Diseño de Sistemas - Kendall & Kendall, Cap. 13] Toda tabla relacional en PostgreSQL debe contar con una clave primaria única que distinga cada registro e impida inconsistencias y duplicaciones en operaciones CRUD."
  },
  {
    "id": 81,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Qué diferencia a un componente `<TextInput>` controlado de uno no controlado en React Native?",
    "opts": [
      "En el controlado, el texto mostrado está determinado por la prop `value` vinculada al estado, y cualquier cambio dispara `onChangeText` para actualizar dicho estado.",
      "En el controlado, el usuario no puede escribir porque el teclado permanece bloqueado.",
      "En el no controlado, el teclado siempre muestra exclusivamente números de teléfono.",
      "No existe diferencia técnica; todos los inputs en React Native son forzosamente no controlados."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 6] Un input controlado tiene una única fuente de verdad: el estado de React. Su valor visual se deriva de `value={texto}` y se sincroniza en cada pulsación con `onChangeText`."
  },
  {
    "id": 82,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "Según las pautas de diseño de formularios móviles de Cuello & Vittone (Capítulo 5), ¿por qué es crucial configurar la propiedad `keyboardType` adecuada (ej: \"email-address\", \"numeric\")?",
    "opts": [
      "Porque despliega el teclado nativo con los caracteres pertinentes directamente accesibles (arroba para emails o teclado numérico para precios), agilizando la entrada y reduciendo errores.",
      "Porque si no se define, el celular cobra un recargo monetario por cada letra escrita.",
      "Porque el teclado por defecto no permite escribir vocales con acento.",
      "Para evitar que el usuario use emojis en el formulario."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 5] Adaptar el teclado al tipo de dato esperado (`keyboardType=\"numeric\"`, `\"email-address\"`, `\"phone-pad\"`) reduce drásticamente la fricción y el tiempo de completado del formulario."
  },
  {
    "id": 83,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Qué problema resuelve el componente `<KeyboardAvoidingView>` en pantallas con formularios en React Native?",
    "opts": [
      "Ajusta automáticamente la posición o padding de la pantalla cuando el teclado virtual del dispositivo se abre, impidiendo que el teclado tape los campos de texto inferiores.",
      "Bloquea el teclado para que no aparezca en pantalla.",
      "Traduce el texto escrito al idioma inglés en tiempo real.",
      "Corrige automáticamente las faltas de ortografía del usuario."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 6] Al abrirse el teclado virtual, la pantalla física pierde hasta el 50% de su espacio visible. `<KeyboardAvoidingView behavior=\"padding\">` desplaza la vista para mantener el input enfocado a la vista."
  },
  {
    "id": 84,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Por qué en React Native es necesario utilizar el componente `<Controller>` de React Hook Form en lugar de la función `register()` habitual de la web?",
    "opts": [
      "Porque los componentes móviles nativos manejan eventos propios (`onChangeText` en lugar de `onChange`) y no admiten referencias ref directas del DOM HTML.",
      "Porque `<Controller>` es el único componente que permite cambiar el color del cursor.",
      "Porque la función `register()` consume el 90% de la CPU en dispositivos móviles.",
      "Porque React Native exige programar todos los formularios con clases de ES5."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Formularios & Validación con Zod] En la web, `register()` se enlaza a elementos nativos del DOM. En React Native, los componentes nativos no tienen DOM HTML, requiriendo `<Controller>` como adaptador puente reactivo."
  },
  {
    "id": 85,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Qué es Zod y qué ventaja diferencial ofrece en aplicaciones React Native con TypeScript?",
    "opts": [
      "Una biblioteca de declaración y validación de esquemas que valida datos en tiempo de ejecución (runtime) e infiere automáticamente los tipos estáticos de TypeScript (`z.infer<typeof Schema>`).",
      "Un plugin de compilación para generar binarios de Android más pequeños.",
      "Un emulador de dispositivos móviles desarrollado por Apple para Windows.",
      "Un gestor de bases de datos relacionales SQLite local."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Formularios & Validación con Zod] Zod permite definir reglas de validación en tiempo de ejecución (mínimo de caracteres, emails válidos, números positivos) y generar automáticamente los tipos de TypeScript sin duplicar código."
  },
  {
    "id": 86,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Cómo se conecta un esquema de validación Zod con React Hook Form?",
    "opts": [
      "Mediante el resolvedor `zodResolver(miEsquemaZod)` pasado en la propiedad `resolver` de `useForm({ resolver: zodResolver(...) })`.",
      "Escribiendo `import ZodFromHookForm` en el archivo `index.js`.",
      "Guardando el esquema en una variable global en el teléfono.",
      "No se pueden conectar; son herramientas incompatibles."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Apuntes de Cátedra - Formularios & Validación con Zod] `@hookform/resolvers/zod` provee el adaptador oficial `zodResolver`, interceptando el submit y validando el formulario antes de ejecutar la función de guardado."
  },
  {
    "id": 87,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Qué propiedad de `<TextInput>` debe activarse para ocultar los caracteres ingresados en un campo de contraseña bancaria o PIN de seguridad?",
    "opts": [
      "secureTextEntry={true}",
      "passwordMask=\"asterisk\"",
      "hideCharactersMode={true}",
      "privacyProtect=\"enable\""
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 6] `secureTextEntry={true}` enmascara los caracteres ingresados sustituyéndolos por puntos o asteriscos nativos en iOS y Android para proteger la privacidad."
  },
  {
    "id": 88,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "¿Cómo se puede cerrar el teclado virtual cuando el usuario toca cualquier área vacía de la pantalla fuera del formulario?",
    "opts": [
      "Envolviendo la pantalla en un `<TouchableWithoutFeedback onPress={Keyboard.dismiss}>`.",
      "Presionando tres veces la tecla de volumen hacia abajo.",
      "Apagando la pantalla del dispositivo.",
      "Ejecutando un bucle infinito en JavaScript."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 6] El patrón estándar de UX móvil en React Native consiste en envolver el contenedor en `<TouchableWithoutFeedback onPress={Keyboard.dismiss}>` para ocultar el teclado al tocar fuera."
  },
  {
    "id": 89,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "En el análisis de requisitos de Kendall & Kendall, ¿por qué es fundamental validar los datos en el cliente móvil antes de enviarlos a la base de datos?",
    "opts": [
      "Para proporcionar retroalimentación inmediata al usuario sin consumir ancho de banda de red ni sobrecargar el servidor con peticiones destinadas a fallar.",
      "Para evitar que el usuario tenga que usar un teclado en el teléfono.",
      "Para que los datos se guarden sin necesidad de tener una base de datos.",
      "Porque los servidores no tienen capacidad de validar datos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Análisis y Diseño de Sistemas - Kendall & Kendall, Cap. 13] La validación en el cliente mejora la experiencia de usuario con feedback instantáneo y protege al backend de tráfico innecesario, aunque el servidor siempre debe re-validar por seguridad."
  },
  {
    "id": 90,
    "unit": "Unidad 2.3: Formularios & Zod",
    "q": "Según Cuello & Vittone (Capítulo 5), ¿cómo deben presentarse los mensajes de error de validación en un formulario móvil para respetar la accesibilidad?",
    "opts": [
      "Ubicados de forma adyacente y visible junto al campo infractor, con texto descriptivo claro y color contrastante (no depender únicamente del color rojo para daltónicos).",
      "En una ventana emergente que bloquee la pantalla y obligue a reiniciar la app.",
      "Ocultos en la consola del desarrollador para no molestar al usuario.",
      "Enviados por mensaje de texto SMS al teléfono del usuario."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 5] La accesibilidad móvil exige mensajes de error contextualmente ubicados debajo del campo con iconos y texto explicativo, evitando ambigüedades."
  },
  {
    "id": 91,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "¿Qué son los permisos en tiempo de ejecución (Runtime Permissions) en sistemas operativos móviles modernos (Android 6+ e iOS)?",
    "opts": [
      "Permisos sensibles (cámara, ubicación, micrófono) que la aplicación debe solicitar al usuario mediante un diálogo interactivo en el momento exacto en que se van a utilizar.",
      "Permisos que se compran en la tienda de aplicaciones al descargar la app.",
      "Permisos que solo se otorgan a los ingenieros de software de Google y Apple.",
      "Permisos para instalar juegos en la memoria del teléfono."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Usabilidad en Aplicaciones Móviles - Dialnet / Univ. de Zaragoza, Cap. 4] Los sistemas operativos móviles exigen solicitar permisos sensibles en tiempo de ejecución de manera interactiva para proteger la privacidad del usuario."
  },
  {
    "id": 92,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "Según el estudio de Dialnet sobre usabilidad móvil, ¿cuál es la mejor práctica antes de solicitar un permiso sensible de hardware?",
    "opts": [
      "Mostrar previamente una pantalla o mensaje explicativo que aclare el beneficio directo que obtendrá el usuario al conceder el permiso (solicitud contextualizada).",
      "Solicitar todos los permisos posibles juntos en la pantalla de bienvenida sin dar explicaciones.",
      "Acceder al sensor en secreto sin pedir permiso.",
      "Bloquear el teléfono hasta que el usuario acepte todos los términos."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Usabilidad en Aplicaciones Móviles - Dialnet / Univ. de Zaragoza, Cap. 4] La solicitud contextualizada y transparente de permisos incrementa la confianza del usuario y eleva significativamente la tasa de aceptación frente a peticiones abruptas."
  },
  {
    "id": 93,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "¿Qué módulo oficial de Expo se utiliza para capturar fotos, escanear códigos de barras y grabar video mediante la lente del dispositivo?",
    "opts": [
      "expo-camera",
      "expo-image-processor",
      "react-native-lens-core",
      "expo-video-scanner-native"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] `expo-camera` provee el componente nativo `<CameraView>` para previsualización en vivo, captura de fotografías, control de flash y lectura de códigos QR / códigos de barras."
  },
  {
    "id": 94,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "En el módulo `expo-location`, ¿cuál es la diferencia entre solicitar permisos de primer plano (`requestForegroundPermissionsAsync`) y de segundo plano (`requestBackgroundPermissionsAsync`)?",
    "opts": [
      "El de primer plano solo permite leer coordenadas GPS mientras la aplicación está abierta en pantalla; el de segundo plano permite rastreo cuando la app está minimizada o con la pantalla apagada.",
      "El de primer plano es solo para teléfonos Android y el de segundo plano es solo para iPhones.",
      "El de primer plano es gratuito y el de segundo plano tiene costo por kilómetro.",
      "No existe diferencia técnica; son llamadas equivalentes."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] Por estrictas políticas de privacidad y batería, los sistemas móviles aíslan el acceso a geolocalización en segundo plano, exigiendo justificación exhaustiva en las tiendas de apps."
  },
  {
    "id": 95,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "¿Qué librería de Expo permite al usuario seleccionar imágenes o videos existentes almacenados en la galería de su teléfono móvil?",
    "opts": [
      "expo-image-picker",
      "expo-photo-disk",
      "expo-gallery-explorer",
      "react-native-album-reader"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] `expo-image-picker` y su método `launchImageLibraryAsync()` abren el selector nativo del sistema permitiendo escoger archivos multimedia con opciones de recorte y compresión."
  },
  {
    "id": 96,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "Si un usuario deniega permanentemente un permiso sensible marcando \"No volver a preguntar\", ¿qué debe hacer la aplicación móvil para permitirle recuperarlo?",
    "opts": [
      "Detectar el estado denegado y ofrecer un botón que invoque `Linking.openSettings()` para abrir la configuración nativa de la app en los Ajustes del sistema operativo.",
      "Cerrar la aplicación forzosamente con un error de pantalla azul.",
      "Reintentar la solicitud en un bucle infinito `while(true)` hasta que acepte.",
      "Reiniciar el teléfono móvil de manera remota."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] Una vez denegado permanentemente, el sistema operativo no vuelve a mostrar el diálogo nativo. La app debe guiar al usuario educadamente con `Linking.openSettings()` a los Ajustes del teléfono."
  },
  {
    "id": 97,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "¿Qué módulo de Expo permite leer datos físicos de movimiento y orientación desde el acelerómetro, giroscopio y magnetómetro del teléfono?",
    "opts": [
      "expo-sensors",
      "expo-motion-detector",
      "react-native-gyro-hardware",
      "expo-physics-reader"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] `expo-sensors` expone APIs uniformes para suscribirse en tiempo real a los sensores inerciales del dispositivo (Accelerometer, Gyroscope, Barometer, Magnetometer)."
  },
  {
    "id": 98,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "Según Cuello & Vittone (Capítulo 7), ¿qué valor de diseño aporta utilizar respuestas hápticas (`expo-haptics`) en botones o acciones clave de la app?",
    "opts": [
      "Provee confirmación física táctil sutil mediante el motor de vibración del teléfono, reforzando la sensación de respuesta y realismo al tocar elementos virtuales.",
      "Aumenta el volumen del altavoz del teléfono.",
      "Permite que el celular flote sobre la mesa.",
      "Elimina los virus informáticos del sistema operativo."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 7] El feedback háptico (`Haptics.impactAsync()`, `notificationAsync()`) estimula el sentido del tacto, confirmando al usuario que la acción fue registrada con éxito."
  },
  {
    "id": 99,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "¿Por qué para almacenar tokens de autenticación JWT o credenciales sensibles en React Native se debe utilizar `expo-secure-store` en lugar de `AsyncStorage`?",
    "opts": [
      "Porque `expo-secure-store` cifra los datos utilizando el enclave seguro del hardware nativo (Keychain en iOS y Android Keystore), mientras que AsyncStorage almacena texto plano sin cifrar.",
      "Porque AsyncStorage solo permite almacenar hasta 10 letras por archivo.",
      "Porque `expo-secure-store` guarda los datos en servidores de la NASA.",
      "Porque AsyncStorage borra los datos cada vez que se reinicia el teléfono."
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Learning React Native - Bonnie Eisenman (O'Reilly), Cap. 8] `AsyncStorage` no es seguro para secretos; en dispositivos rooteados o con acceso al filesystem puede ser leído. `expo-secure-store` utiliza las bóvedas de cifrado por hardware del teléfono."
  },
  {
    "id": 100,
    "unit": "Unidad 2.4: Hardware & Permisos",
    "q": "¿Qué módulo se utiliza en Expo para planificar y emitir notificaciones locales programadas en el dispositivo sin depender de un servidor externo?",
    "opts": [
      "expo-notifications y su método `scheduleNotificationAsync()`",
      "expo-alerts-scheduler",
      "react-native-push-local",
      "expo-toast-manager"
    ],
    "a": 0,
    "exp": "[📚 Bibliografía Unidad 2: Diseñando Apps para Móviles - Javier Cuello & José Vittone, Cap. 7] `expo-notifications` administra notificaciones locales programadas por tiempo o intervalos (`scheduleNotificationAsync`), con control de canales en Android y disparadores basados en fechas."
  }
];
