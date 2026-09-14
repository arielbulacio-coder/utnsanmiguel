export const reactNativeExamQuestions = [
  // --- CLASE 1: Fundamentos y Expo (14) ---
  {
    id: 1,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué es React Native?",
    opts: [
      "Un framework para crear apps móviles nativas con JS",
      "Un navegador web para móviles",
      "Un compilador de Java a Swift",
      "Una base de datos móvil"
    ],
    a: 0,
    exp: "React Native usa JS y React para renderizar interfaces nativas en iOS y Android."
  },
  {
    id: 2,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué ventaja principal ofrece Expo?",
    opts: [
      "Facilita la configuración y prueba rápida sin Android Studio ni Xcode",
      "Es obligatorio para programar en iOS",
      "Mejora el rendimiento un 500%",
      "Genera aplicaciones que ocupan menos de 1 MB"
    ],
    a: 0,
    exp: "Expo agiliza el desarrollo abstrayendo la configuración nativa compleja."
  },
  {
    id: 3,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué herramienta permite probar apps de Expo en un celular real al instante?",
    opts: [
      "Expo Go",
      "Android Emulator",
      "TestFlight",
      "React Inspector"
    ],
    a: 0,
    exp: "Expo Go ejecuta la app directamente en el dispositivo móvil leyendo un código QR."
  },
  {
    id: 4,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué motor de JavaScript se recomienda en React Native por su optimización?",
    opts: [
      "Hermes",
      "V8",
      "SpiderMonkey",
      "JavaScriptCore"
    ],
    a: 0,
    exp: "Hermes está optimizado para dispositivos móviles, reduciendo tiempos de carga y uso de memoria."
  },
  {
    id: 5,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué comando crea un nuevo proyecto de Expo desde cero?",
    opts: [
      "npx create-expo-app",
      "npm init react-native",
      "expo build start",
      "npx create-react-app"
    ],
    a: 0,
    exp: "npx create-expo-app genera la estructura inicial de una aplicación Expo moderna."
  },
  {
    id: 6,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué servidor de desarrollo empaqueta los archivos JS en React Native?",
    opts: [
      "Metro Bundler",
      "Webpack",
      "Vite",
      "Babel"
    ],
    a: 0,
    exp: "Metro es el bundler oficial de React Native que provee recarga rápida y empaquetado."
  },
  {
    id: 7,
    unit: "Clase 1: Fundamentos",
    q: "¿Cómo se llama el componente que renderiza texto en React Native?",
    opts: [
      "<Text>",
      "<p>",
      "<span>",
      "<Label>"
    ],
    a: 0,
    exp: "En React Native no existe <p>, todo texto debe ir envuelto en el componente Core <Text>."
  },
  {
    id: 8,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué componente equivale a un <div> web en React Native?",
    opts: [
      "<View>",
      "<Container>",
      "<Box>",
      "<Section>"
    ],
    a: 0,
    exp: "<View> es el bloque de construcción fundamental para agrupar elementos."
  },
  {
    id: 9,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué ocurre si no usas <View> y devuelves varios componentes sueltos en React?",
    opts: [
      "Dará error sintáctico, a menos que uses un Fragmento (<>...</>)",
      "Los renderiza todos en la misma línea",
      "Solo muestra el primer componente",
      "React Native creará automáticamente un contenedor"
    ],
    a: 0,
    exp: "JSX requiere devolver un único elemento padre o envolverlos en un Fragmento."
  },
  {
    id: 10,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué sintaxis de JS se usa para mezclar lógica y UI en React Native?",
    opts: [
      "JSX",
      "TypeScript",
      "JSON",
      "HTML5"
    ],
    a: 0,
    exp: "JSX (JavaScript XML) permite escribir etiquetas similares a HTML dentro de JavaScript."
  },
  {
    id: 11,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué método se usa para aplicar estilos en React Native de forma óptima?",
    opts: [
      "StyleSheet.create({})",
      "CSS externo (styles.css)",
      "Bootstrap",
      "Inline styles como cadenas de texto"
    ],
    a: 0,
    exp: "StyleSheet.create optimiza los estilos pasándolos al motor nativo eficientemente."
  },
  {
    id: 12,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué bandera de expo start permite saltear bloqueos de red local?",
    opts: [
      "--tunnel",
      "--offline",
      "--bypass",
      "--network"
    ],
    a: 0,
    exp: "El modo --tunnel crea una URL pública para acceder a la app sin compartir la misma WiFi local."
  },
  {
    id: 13,
    unit: "Clase 1: Fundamentos",
    q: "¿Qué pasa si ejecutas una app nativa con un error fatal no capturado?",
    opts: [
      "La aplicación se cierra abruptamente (Crash)",
      "Muestra una alerta en pantalla pero sigue funcionando",
      "Se reinicia el celular",
      "No se puede compilar el código"
    ],
    a: 0,
    exp: "Los errores fatales (Unhandled Exceptions) provocan el cierre inmediato de la app nativa."
  },
  {
    id: 14,
    unit: "Clase 1: Fundamentos",
    q: "¿React Native y ReactJS son exactamente lo mismo?",
    opts: [
      "No, RN es para móviles y usa componentes nativos, ReactJS es para web y usa el DOM",
      "Sí, el código funciona al 100% igual en ambos",
      "No, React Native no usa JavaScript",
      "Sí, pero React Native solo funciona en Apple"
    ],
    a: 0,
    exp: "Comparten el motor de React, pero los componentes (View, Text) son distintos de HTML (div, p)."
  },

  // --- CLASE 2: Componentes Core y Estilos (15) ---
  {
    id: 15,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Cuál es la orientación por defecto de Flexbox en React Native?",
    opts: [
      "column (vertical)",
      "row (horizontal)",
      "grid",
      "absolute"
    ],
    a: 0,
    exp: "A diferencia de la web, en móviles el flujo principal por defecto es vertical (column)."
  },
  {
    id: 16,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué valor de estilo hace que un elemento ocupe todo el espacio disponible?",
    opts: [
      "flex: 1",
      "width: '100%'",
      "expand: true",
      "fill: all"
    ],
    a: 0,
    exp: "flex: 1 le dice al elemento que crezca y ocupe el espacio residual de su contenedor padre."
  },
  {
    id: 17,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué propiedad centra elementos a lo largo del eje principal?",
    opts: [
      "justifyContent",
      "alignItems",
      "textAlign",
      "alignSelf"
    ],
    a: 0,
    exp: "justifyContent alinea los elementos en el eje principal (vertical por defecto en RN)."
  },
  {
    id: 18,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué componente permite a la pantalla ser desplazable si el contenido excede el alto?",
    opts: [
      "<ScrollView>",
      "<ViewScroll>",
      "<Container scroll={true}>",
      "<List>"
    ],
    a: 0,
    exp: "ScrollView envuelve su contenido para hacerlo deslizable cuando supera la pantalla."
  },
  {
    id: 19,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué componente es mucho más eficiente que ScrollView para listas muy largas?",
    opts: [
      "<FlatList>",
      "<LongList>",
      "<RecyclerListView>",
      "<VirtualView>"
    ],
    a: 0,
    exp: "FlatList solo renderiza en memoria los elementos visibles, ahorrando RAM y CPU."
  },
  {
    id: 20,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué propiedad es obligatoria en <FlatList> para renderizar cada fila?",
    opts: [
      "renderItem",
      "rowComponent",
      "dataItem",
      "viewItem"
    ],
    a: 0,
    exp: "renderItem recibe una función que indica cómo dibujar cada elemento individual."
  },
  {
    id: 21,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Para qué sirve keyExtractor en una FlatList?",
    opts: [
      "Asigna un identificador único a cada fila para optimizar actualizaciones",
      "Desencripta los datos de la lista",
      "Extrae la primera fila como cabecera",
      "Define la clave de búsqueda de la lista"
    ],
    a: 0,
    exp: "React usa la clave única para saber exactamente qué filas cambiar sin re-renderizar todas."
  },
  {
    id: 22,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Cuál es el tamaño mínimo recomendado para un botón táctil móvil?",
    opts: [
      "44x44 puntos",
      "10x10 puntos",
      "100x100 puntos",
      "Cualquier tamaño que quepa en pantalla"
    ],
    a: 0,
    exp: "El estándar de diseño indica 44pt o 48dp para evitar que el dedo pulse otros elementos por error."
  },
  {
    id: 23,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué componente táctil moderno se recomienda sobre TouchableOpacity?",
    opts: [
      "<Pressable>",
      "<Button>",
      "<Touchable>",
      "<ClickView>"
    ],
    a: 0,
    exp: "Pressable es más flexible, permite estilos basados en su estado (pressed) y detecta toques largos."
  },
  {
    id: 24,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué unidad de medida usan los estilos en React Native?",
    opts: [
      "Puntos independientes de densidad (dp/pt)",
      "Píxeles físicos",
      "Rem y Em",
      "Centímetros"
    ],
    a: 0,
    exp: "Los tamaños son adimensionales y se escalan automáticamente según la densidad de la pantalla."
  },
  {
    id: 25,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Cómo se aplica un arreglo de varios estilos a un mismo componente?",
    opts: [
      "style={[ styles.caja, styles.activa ]}",
      "style=\"styles.caja styles.activa\"",
      "style={{styles.caja, styles.activa}}",
      "style={styles.caja + styles.activa}"
    ],
    a: 0,
    exp: "En React Native se pasa un array [] de objetos de estilo, y el de la derecha tiene prioridad."
  },
  {
    id: 26,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué propiedad alinea elementos a lo ancho del eje transversal?",
    opts: [
      "alignItems",
      "justifyContent",
      "alignSelf",
      "marginHorizontal"
    ],
    a: 0,
    exp: "alignItems alinea los hijos en el eje perpendicular (horizontal si la dirección es column)."
  },
  {
    id: 27,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué hace la prop ListEmptyComponent en FlatList?",
    opts: [
      "Muestra una vista alternativa si la lista de datos está vacía",
      "Vacia la memoria de la lista",
      "Elimina todos los estilos del componente",
      "Oculta la lista completa temporalmente"
    ],
    a: 0,
    exp: "Permite renderizar fácilmente un mensaje de 'No hay resultados' o similar."
  },
  {
    id: 28,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Cómo se añade una imagen local en React Native?",
    opts: [
      "<Image source={require('./foto.png')} />",
      "<img src='./foto.png' />",
      "<Image source='./foto.png' />",
      "<Image src={require('./foto.png')} />"
    ],
    a: 0,
    exp: "Las imágenes estáticas locales requieren la función require() dentro del prop source."
  },
  {
    id: 29,
    unit: "Clase 2: Componentes y Estilos",
    q: "¿Qué indica la prop resizeMode en una <Image>?",
    opts: [
      "Cómo se ajusta la imagen si sus dimensiones no coinciden con las del contenedor",
      "La calidad de compresión de la imagen",
      "El filtro de color aplicado",
      "Si la imagen admite zoom táctil"
    ],
    a: 0,
    exp: "Admite valores como 'cover', 'contain' o 'stretch' para adaptar la imagen."
  },

  // --- CLASE 3: Navegación (Expo Router) (14) ---
  {
    id: 30,
    unit: "Clase 3: Navegación",
    q: "¿En Expo Router, cómo se definen las rutas de navegación de la app?",
    opts: [
      "Por la estructura de archivos en la carpeta /app",
      "Mediante un archivo routes.xml",
      "Con componentes <Route> en App.js",
      "Configurando el archivo app.json"
    ],
    a: 0,
    exp: "Expo Router usa 'File-based Routing': cada archivo en /app es automáticamente una pantalla."
  },
  {
    id: 31,
    unit: "Clase 3: Navegación",
    q: "¿Cuál es el componente de Expo Router que permite navegar al hacer click (similar a <a>)?",
    opts: [
      "<Link>",
      "<Href>",
      "<Navigate>",
      "<Anchor>"
    ],
    a: 0,
    exp: "El componente <Link href='/perfil'> envuelve un texto o botón para navegar a otra ruta."
  },
  {
    id: 32,
    unit: "Clase 3: Navegación",
    q: "¿Qué archivo define el contenedor o menú común para un grupo de rutas en Expo Router?",
    opts: [
      "_layout.tsx",
      "index.tsx",
      "_app.tsx",
      "layout.json"
    ],
    a: 0,
    exp: "El _layout.tsx engloba a las demás pantallas de la carpeta para aplicar menú o Stack común."
  },
  {
    id: 33,
    unit: "Clase 3: Navegación",
    q: "¿Qué patrón de navegación apila pantallas, útil para el flujo 'Ver Lista -> Ver Detalle'?",
    opts: [
      "Stack",
      "Tabs",
      "Drawer",
      "Modal"
    ],
    a: 0,
    exp: "Stack navigation apila las vistas permitiendo volver atrás con la flecha de retroceso."
  },
  {
    id: 34,
    unit: "Clase 3: Navegación",
    q: "¿Qué patrón de navegación muestra íconos en la parte inferior para saltar entre secciones principales?",
    opts: [
      "Tabs",
      "Stack",
      "Drawer",
      "Accordion"
    ],
    a: 0,
    exp: "Las Bottom Tabs son el estándar móvil para secciones primarias (Inicio, Buscar, Perfil)."
  },
  {
    id: 35,
    unit: "Clase 3: Navegación",
    q: "¿Cómo se llama el hook de Expo Router para navegar programáticamente (ej: tras un login)?",
    opts: [
      "useRouter()",
      "useNavigation()",
      "useNavigate()",
      "useLink()"
    ],
    a: 0,
    exp: "useRouter expone funciones como router.push() o router.replace()."
  },
  {
    id: 36,
    unit: "Clase 3: Navegación",
    q: "¿Qué nombre debe tener un archivo para capturar rutas dinámicas (ej: /user/42)?",
    opts: [
      "[id].tsx",
      "id.tsx",
      "_id.tsx",
      "{id}.tsx"
    ],
    a: 0,
    exp: "Los corchetes en el nombre del archivo indican que es un segmento de ruta dinámica."
  },
  {
    id: 37,
    unit: "Clase 3: Navegación",
    q: "¿Con qué hook obtenemos el parámetro dinámico recibido en la URL (ej: el id)?",
    opts: [
      "useLocalSearchParams()",
      "useParams()",
      "useRoute()",
      "useID()"
    ],
    a: 0,
    exp: "useLocalSearchParams() devuelve un objeto con los parámetros, ej: { id: 42 }."
  },
  {
    id: 38,
    unit: "Clase 3: Navegación",
    q: "¿Qué significa poner una carpeta entre paréntesis, como (tabs)?",
    opts: [
      "Es un grupo lógico que no altera la URL final de la ruta",
      "Es una carpeta que se ignora al compilar",
      "Es una ruta secreta protegida por contraseña",
      "Es un componente nativo de Android"
    ],
    a: 0,
    exp: "Los paréntesis permiten organizar _layouts (ej. (auth) o (tabs)) sin que figuren en el path."
  },
  {
    id: 39,
    unit: "Clase 3: Navegación",
    q: "¿Qué hace la función router.replace() a diferencia de router.push()?",
    opts: [
      "Reemplaza la pantalla actual, impidiendo volver atrás con la flecha",
      "Borra toda la base de datos de la app",
      "Navega más lento pero de forma más segura",
      "Cambia el idioma de la aplicación"
    ],
    a: 0,
    exp: "replace() sustituye el historial, ideal tras un Login para que 'Atrás' no regrese a la pantalla de login."
  },
  {
    id: 40,
    unit: "Clase 3: Navegación",
    q: "¿Qué componente define opciones de cabecera como título o colores dentro de una pantalla?",
    opts: [
      "<Stack.Screen options={{ title: 'Home' }} />",
      "<Header title='Home' />",
      "<NavBar name='Home' />",
      "<Title>Home</Title>"
    ],
    a: 0,
    exp: "Se puede usar Stack.Screen o Tabs.Screen dinámicamente para cambiar opciones del menú superior."
  },
  {
    id: 41,
    unit: "Clase 3: Navegación",
    q: "¿Qué patrón de navegación abre un menú lateral oculto al deslizar desde el borde?",
    opts: [
      "Drawer",
      "Tabs",
      "Modal",
      "BottomSheet"
    ],
    a: 0,
    exp: "El Drawer o Menú Hamburguesa oculta opciones secundarias en un panel lateral."
  },
  {
    id: 42,
    unit: "Clase 3: Navegación",
    q: "¿Cuál es la URL de la pantalla de inicio principal (`app/index.tsx`)?",
    opts: [
      "/",
      "/home",
      "/index",
      "/main"
    ],
    a: 0,
    exp: "El archivo index.tsx en la raíz de app corresponde a la ruta principal '/'"
  },
  {
    id: 43,
    unit: "Clase 3: Navegación",
    q: "¿Qué es el 'Deep Linking' soportado nativamente por Expo Router?",
    opts: [
      "Permite abrir enlaces web directamente dentro de una pantalla específica de la app nativa",
      "Escanear códigos QR en sitios profundos",
      "Un cifrado de datos profundo",
      "Conectar la base de datos con Firebase"
    ],
    a: 0,
    exp: "Expo Router maneja enlaces entrantes y abre automáticamente la ruta solicitada en la app."
  },

  // --- CLASE 4: Estado Global y Contexto (14) ---
  {
    id: 44,
    unit: "Clase 4: Estado Global",
    q: "¿Para qué se utiliza useState() en React?",
    opts: [
      "Para manejar el estado local dentro de un solo componente",
      "Para guardar datos permanentemente en la base de datos",
      "Para comunicar componentes hermanos sin relación",
      "Para crear rutas de navegación"
    ],
    a: 0,
    exp: "useState mantiene memoria de variables internas que al cambiar re-renderizan el componente."
  },
  {
    id: 45,
    unit: "Clase 4: Estado Global",
    q: "¿Qué problema genera el 'Prop Drilling'?",
    opts: [
      "Pasar props a través de muchos componentes intermedios que no las usan, solo para dárselas a un hijo profundo",
      "El celular vibra cada vez que se envía una propiedad",
      "La base de datos se corrompe por exceso de peticiones",
      "Se detiene la animación de las listas FlatList"
    ],
    a: 0,
    exp: "El prop drilling complica el código pasando estados manualmente por niveles intermedios (abuelo->padre->hijo)."
  },
  {
    id: 46,
    unit: "Clase 4: Estado Global",
    q: "¿Qué herramienta nativa de React resuelve el problema del Prop Drilling?",
    opts: [
      "Context API",
      "useReducer",
      "useEffect",
      "AsyncStorage"
    ],
    a: 0,
    exp: "React Context provee variables a nivel global a cualquier componente suscrito sin pasarlas por props."
  },
  {
    id: 47,
    unit: "Clase 4: Estado Global",
    q: "¿Qué se debe crear primero para usar Context API?",
    opts: [
      "Un objeto Context usando createContext()",
      "Un archivo SQL",
      "Un hook useReducer",
      "Una constante de Redux"
    ],
    a: 0,
    exp: "Se importa createContext de React y se genera el contenedor que mantendrá el estado global."
  },
  {
    id: 48,
    unit: "Clase 4: Estado Global",
    q: "¿Qué componente debe envolver (wrapear) a los hijos para proveerles el contexto?",
    opts: [
      "<Context.Provider>",
      "<Context.Consumer>",
      "<ProviderContext>",
      "<GlobalWrapper>"
    ],
    a: 0,
    exp: "El Provider expone la propiedad `value` con los datos o funciones a todos sus descendientes."
  },
  {
    id: 49,
    unit: "Clase 4: Estado Global",
    q: "¿Qué hook se usa dentro de un componente hijo para leer los valores de un contexto?",
    opts: [
      "useContext()",
      "useState()",
      "useGlobal()",
      "useContextData()"
    ],
    a: 0,
    exp: "useContext() recibe el objeto Context y retorna el valor provisto por el Provider más cercano."
  },
  {
    id: 50,
    unit: "Clase 4: Estado Global",
    q: "¿En Expo Router, dónde es el lugar ideal para colocar los Context.Provider globales?",
    opts: [
      "En el archivo _layout.tsx raíz de la aplicación",
      "En el archivo app.json",
      "En cada pantalla individual",
      "Dentro de los archivos de estilos CSS"
    ],
    a: 0,
    exp: "Al envolver el layout principal, todas las pantallas de la app comparten el estado global."
  },
  {
    id: 51,
    unit: "Clase 4: Estado Global",
    q: "¿En un Carrito de compras, qué método de array se usa típicamente para calcular el precio total sin usar un estado extra?",
    opts: [
      "reduce()",
      "map()",
      "filter()",
      "forEach()"
    ],
    a: 0,
    exp: "reduce acumula los valores (precio * cantidad) devolviendo un total único derivado del carrito."
  },
  {
    id: 52,
    unit: "Clase 4: Estado Global",
    q: "¿Por qué el estado en React debe tratarse siempre como Inmutable?",
    opts: [
      "Para que React detecte cambios de referencia y sepa que debe re-dibujar la pantalla",
      "Por seguridad contra ataques de inyección SQL",
      "Porque JavaScript no permite modificar variables",
      "Para ahorrar espacio en el disco duro del celular"
    ],
    a: 0,
    exp: "Si mutas un estado directamente (ej: array.push), React no nota el cambio y no re-renderiza."
  },
  {
    id: 53,
    unit: "Clase 4: Estado Global",
    q: "¿Qué sintaxis es correcta para agregar un nuevo elemento a un estado de array (carrito)?",
    opts: [
      "setCarrito([...carrito, nuevoElemento])",
      "carrito.push(nuevoElemento)",
      "carrito.add(nuevoElemento)",
      "setCarrito(nuevoElemento)"
    ],
    a: 0,
    exp: "El operador spread (...) crea un nuevo array fusionando los elementos previos con el nuevo."
  },
  {
    id: 54,
    unit: "Clase 4: Estado Global",
    q: "¿Qué alternativa más compleja a Context API existe para manejo de estado global (muy popular en empresas grandes)?",
    opts: [
      "Zustand o Redux",
      "Axios",
      "MongoDB",
      "Express"
    ],
    a: 0,
    exp: "Librerías como Redux o Zustand optimizan el estado a gran escala fuera del árbol de React."
  },
  {
    id: 55,
    unit: "Clase 4: Estado Global",
    q: "¿Es necesario meter todo el estado de la app en Context API?",
    opts: [
      "No, el estado local de UI (ej: inputs, modales) debe quedarse en useState() local",
      "Sí, centralizar todo mejora la seguridad",
      "No, React prohibe usar Context en componentes de más de 50 líneas",
      "Sí, useState local fue deprecado en 2021"
    ],
    a: 0,
    exp: "Solo debe globalizarse lo que realmente comparten pantallas lejanas (ej: Sesión, Tema, Carrito)."
  },
  {
    id: 56,
    unit: "Clase 4: Estado Global",
    q: "¿Qué hook memoriza funciones complejas para no volver a ejecutarlas en cada re-render?",
    opts: [
      "useMemo / useCallback",
      "useEffect",
      "useRef",
      "useContext"
    ],
    a: 0,
    exp: "useMemo guarda el resultado de cálculos pesados si las dependencias no han cambiado."
  },
  {
    id: 57,
    unit: "Clase 4: Estado Global",
    q: "Si necesitas acceder al Contexto pero no quieres importar createContext cada vez, ¿qué patrón se usa?",
    opts: [
      "Crear un Custom Hook (ej: useCart()) que envuelva a useContext",
      "Escribir una función asíncrona global",
      "Crear un archivo TXT con variables de entorno",
      "Heredar de una clase abstracta de Java"
    ],
    a: 0,
    exp: "Los hooks personalizados abstraen la lógica y facilitan el uso del contexto de forma limpia."
  },

  // --- CLASE 5: Datos Remotos y APIs (14) ---
  {
    id: 58,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué es una API REST?",
    opts: [
      "Una interfaz que permite comunicación entre cliente (app) y servidor mediante peticiones HTTP",
      "Una base de datos local del teléfono",
      "Un compilador de código nativo",
      "Una librería de componentes de interfaz"
    ],
    a: 0,
    exp: "API REST establece cómo pedir o enviar datos a un backend usando JSON y HTTP (GET, POST, etc)."
  },
  {
    id: 59,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué función nativa de JavaScript se utiliza para hacer peticiones a servidores remotos?",
    opts: [
      "fetch()",
      "getHTTP()",
      "requestData()",
      "pullServer()"
    ],
    a: 0,
    exp: "fetch() es la API estándar asíncrona para solicitar y enviar recursos por red."
  },
  {
    id: 60,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué palabras clave de JS se usan para esperar a que fetch() responda sin bloquear la app?",
    opts: [
      "async / await",
      "try / catch",
      "if / else",
      "let / const"
    ],
    a: 0,
    exp: "Al marcar una función como async, await detiene temporalmente esa función hasta que la red responda."
  },
  {
    id: 61,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué hace la función .json() al recibir una respuesta de fetch?",
    opts: [
      "Deserializa la cadena de texto JSON a objetos JavaScript utilizables",
      "Convierte la respuesta a formato de imagen JPEG",
      "Envia los datos a la consola de Google Chrome",
      "Cifra los datos por seguridad"
    ],
    a: 0,
    exp: "El body HTTP es texto; response.json() lo parsea asíncronamente a estructuras de JS (arreglos/objetos)."
  },
  {
    id: 62,
    unit: "Clase 5: Datos Remotos",
    q: "¿En qué hook se dispara normalmente la llamada inicial a una API al abrir una pantalla?",
    opts: [
      "useEffect() con array de dependencias vacío []",
      "useState() con un array vacío",
      "En el cuerpo principal del componente directamente",
      "En un hook useRef()"
    ],
    a: 0,
    exp: "El useEffect con array vacío asegura que la petición (efecto secundario) solo se dispare al montar el componente."
  },
  {
    id: 63,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué ocurre si ejecutas fetch() directamente dentro del render (sin useEffect)?",
    opts: [
      "Provoca un bucle infinito porque fetch actualiza estado y vuelve a renderizar",
      "No compila",
      "Funciona más rápido",
      "La base de datos rechaza la conexión"
    ],
    a: 0,
    exp: "Cada render hace fetch, el fetch cambia estado (setDatos), eso lanza un nuevo render, repitiendo sin fin."
  },
  {
    id: 64,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué se debe mostrar en pantalla mientras await fetch() está cargando?",
    opts: [
      "Un componente de carga, como <ActivityIndicator>",
      "Una pantalla en blanco o color rojo",
      "Un video musical temporal",
      "Nada, la pantalla se congela hasta que cargue"
    ],
    a: 0,
    exp: "La retroalimentación visual (spinner o skeleton) es vital para indicar que la app está descargando datos."
  },
  {
    id: 65,
    unit: "Clase 5: Datos Remotos",
    q: "¿Cómo se capturan fallos de red (sin internet o error 500) al usar async/await?",
    opts: [
      "Envolviendo el código con un bloque try...catch",
      "Con un if (network === false)",
      "El propio React ignora los errores de red",
      "Reiniciando automáticamente la aplicación"
    ],
    a: 0,
    exp: "Si el servidor falla o no hay conexión, fetch lanza un error que debe ser atrapado en el bloque catch."
  },
  {
    id: 66,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué método HTTP se utiliza por defecto en fetch() si no se especifica ninguno?",
    opts: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    a: 0,
    exp: "GET es el método para lectura/obtención de información desde un servidor."
  },
  {
    id: 67,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué método HTTP se usa convencionalmente para crear o enviar nueva información al servidor?",
    opts: [
      "POST",
      "GET",
      "OPTIONS",
      "HEAD"
    ],
    a: 0,
    exp: "POST envía datos (como credenciales de login o un nuevo artículo) en el cuerpo (body) de la solicitud."
  },
  {
    id: 68,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué popular librería de NPM se usa a menudo como alternativa a fetch por su sintaxis reducida y autoconversión JSON?",
    opts: [
      "Axios",
      "Mongoose",
      "Express",
      "Nodemailer"
    ],
    a: 0,
    exp: "Axios es un cliente HTTP muy usado que intercepta requests, lanza errores automáticos y ahorra líneas."
  },
  {
    id: 69,
    unit: "Clase 5: Datos Remotos",
    q: "¿Qué propiedad de FlatList provee recarga natural cuando los usuarios estiran la lista hacia abajo?",
    opts: [
      "onRefresh y refreshing",
      "onPull y pulling",
      "swipeToLoad={true}",
      "autoRefresh={1000}"
    ],
    a: 0,
    exp: "Integran la funcionalidad de Pull-to-refresh nativa para pedir a la API la última versión de los datos."
  },
  {
    id: 70,
    unit: "Clase 5: Datos Remotos",
    q: "Si la petición devuelve datos estáticos paginados, ¿qué evento de FlatList gatilla la descarga de la siguiente página?",
    opts: [
      "onEndReached",
      "onScrollDown",
      "onPageChange",
      "onListEnd"
    ],
    a: 0,
    exp: "onEndReached avisa cuando el scroll se acerca al final de la lista, activando el 'scroll infinito'."
  },
  {
    id: 71,
    unit: "Clase 5: Datos Remotos",
    q: "¿Cómo simulas peticiones lentas o Mock APIs cuando el backend real aún no existe?",
    opts: [
      "Usando servicios como JSONPlaceholder o setTimeout y datos falsos (Mocks)",
      "Creando bases de datos reales en AWS temporalmente",
      "Subiendo fotos gigantes a internet",
      "Configurando el teléfono en Modo Avión"
    ],
    a: 0,
    exp: "Servicios Mock como JSONPlaceholder permiten desarrollar la UI sin depender del backend real."
  },

  // --- CLASE 6: Formularios y CRUD (15) ---
  {
    id: 72,
    unit: "Clase 6: Formularios",
    q: "¿Qué componente de React Native se utiliza para permitir al usuario escribir texto en pantalla?",
    opts: [
      "<TextInput>",
      "<Input>",
      "<TextField>",
      "<input type='text'>"
    ],
    a: 0,
    exp: "TextInput es el equivalente móvil al <input> HTML nativo."
  },
  {
    id: 73,
    unit: "Clase 6: Formularios",
    q: "¿A qué prop se vincula el estado actual en un <TextInput> (Formularios Controlados)?",
    opts: [
      "value={estado}",
      "text={estado}",
      "val={estado}",
      "inputData={estado}"
    ],
    a: 0,
    exp: "Vincular `value` con un estado asegura que React sea la única fuente de verdad (Controlled Component)."
  },
  {
    id: 74,
    unit: "Clase 6: Formularios",
    q: "¿Qué evento actualiza el estado cada vez que se presiona una tecla en un <TextInput>?",
    opts: [
      "onChangeText={(texto) => setEstado(texto)}",
      "onKeyPress",
      "onType",
      "onChangeData"
    ],
    a: 0,
    exp: "onChangeText recibe directamente el texto tipeado (string), simplificando la actualización en RN."
  },
  {
    id: 75,
    unit: "Clase 6: Formularios",
    q: "¿Qué hace la propiedad keyboardType='email-address' en <TextInput>?",
    opts: [
      "Muestra el teclado numérico/alfabético especializado que incluye la '@' y '.com' a primera vista",
      "Valida que el correo exista usando inteligencia artificial",
      "Impide que el usuario escriba letras",
      "Abre el cliente de correo automáticamente"
    ],
    a: 0,
    exp: "Ajustar el teclado según el tipo de dato ahorra tiempo y mejora fuertemente la usabilidad."
  },
  {
    id: 76,
    unit: "Clase 6: Formularios",
    q: "¿Qué hace la propiedad secureTextEntry={true}?",
    opts: [
      "Oculta los caracteres tipeados (asteriscos/puntos) para contraseñas",
      "Cifra el texto con algoritmos bancarios en disco",
      "Evita que el texto sea leído por hackers por wifi",
      "Bloquea la edición del campo de texto"
    ],
    a: 0,
    exp: "Es indispensable para campos sensibles como Password o PIN."
  },
  {
    id: 77,
    unit: "Clase 6: Formularios",
    q: "¿Qué componente previene que el teclado nativo oculte el TextInput que el usuario está editando?",
    opts: [
      "<KeyboardAvoidingView>",
      "<AutoScrollForm>",
      "<KeyboardSafeView>",
      "<ScrollToInputView>"
    ],
    a: 0,
    exp: "KeyboardAvoidingView ajusta automáticamente el relleno (padding) inferior al aparecer el teclado."
  },
  {
    id: 78,
    unit: "Clase 6: Formularios",
    q: "¿Qué hace el componente utilitario TouchableWithoutFeedback con Keyboard.dismiss()?",
    opts: [
      "Oculta el teclado automáticamente si el usuario toca cualquier zona vacía fuera del formulario",
      "Bloquea el botón de apagado",
      "Impide todo tipo de interacción táctil en la pantalla",
      "Elimina todo el texto escrito hasta el momento"
    ],
    a: 0,
    exp: "Añadirlo como fondo mejora la experiencia, permitiendo salir de la edición al tocar el fondo vacío."
  },
  {
    id: 79,
    unit: "Clase 6: Formularios",
    q: "En el patrón C.R.U.D, ¿qué operación asienta los cambios sobre un registro ya existente?",
    opts: [
      "Update (Actualizar - PUT/PATCH)",
      "Create (Crear)",
      "Read (Leer)",
      "Delete (Eliminar)"
    ],
    a: 0,
    exp: "Update modifica la entidad. En APIs REST suele usarse el método PUT (todo) o PATCH (parcial)."
  },
  {
    id: 80,
    unit: "Clase 6: Formularios",
    q: "¿Para qué sirve el hook de Expo 'useLocalSearchParams()' al editar un registro (Update)?",
    opts: [
      "Recibir el ID del registro seleccionado para hacer el fetch específico o saber qué ítem actualizar",
      "Crear campos locales temporales",
      "Generar IDs aleatorios para bases de datos",
      "Ocultar la URL de la barra de direcciones"
    ],
    a: 0,
    exp: "Permite leer el parámetro que llega en la navegación, por ejemplo router.push(`/edit/${id}`)."
  },
  {
    id: 81,
    unit: "Clase 6: Formularios",
    q: "¿Qué librerías populares se usan para no manejar validaciones de formularios a mano en React?",
    opts: [
      "React Hook Form o Formik",
      "Redux Toolkit",
      "Axios y Fetch",
      "SQLite y AsyncStorage"
    ],
    a: 0,
    exp: "Formik o RHF simplifican la validación, errores y manejo de envíos pesados con menos re-renders."
  },
  {
    id: 82,
    unit: "Clase 6: Formularios",
    q: "¿Qué es Yup o Zod?",
    opts: [
      "Librerías de validación de esquemas (ej: que la edad sea mayor a 18 y el mail válido)",
      "Servidores web rápidos para NodeJS",
      "Herramientas de animación 3D nativa",
      "Módulos para controlar el Bluetooth"
    ],
    a: 0,
    exp: "Zod o Yup definen reglas de validación encadenadas que se integran fácil con React Hook Form."
  },
  {
    id: 83,
    unit: "Clase 6: Formularios",
    q: "¿Cómo indicas a fetch() que el body lleva información en formato JSON al hacer un POST?",
    opts: [
      "Enviando el header 'Content-Type': 'application/json'",
      "Renombrando el archivo a datos.json",
      "Pasando un parámetro booleano isJSON={true}",
      "El navegador lo detecta mágicamente analizando el texto"
    ],
    a: 0,
    exp: "El backend solo entenderá que le llega JSON si lo indicas explícitamente en las cabeceras HTTP."
  },
  {
    id: 84,
    unit: "Clase 6: Formularios",
    q: "¿Por qué el objeto JS debe pasarse por JSON.stringify() antes de enviar un POST?",
    opts: [
      "Porque HTTP es un protocolo de texto, no transporta objetos JS nativos directamente",
      "Para que el código quede ofuscado y seguro",
      "Para evitar alertas de virus del navegador",
      "Para transformar el JSON a sintaxis XML"
    ],
    a: 0,
    exp: "stringify serializa la memoria JS en una cadena de texto plana transferible por red."
  },
  {
    id: 85,
    unit: "Clase 6: Formularios",
    q: "¿Cuál de estos es un buen ejemplo de prevención de errores al hacer Delete (Eliminar)?",
    opts: [
      "Mostrar una ventana de Alerta (`Alert.alert`) de confirmación antes de eliminar permanentemente",
      "Borrar sin preguntar para hacer la app más ágil",
      "Ocultar el botón Delete bajo 4 submenús diferentes",
      "Forzar al usuario a apagar el teléfono"
    ],
    a: 0,
    exp: "Las acciones destructivas requieren una confirmación explícita (Principio de prevención de errores)."
  },
  {
    id: 86,
    unit: "Clase 6: Formularios",
    q: "¿Qué método HTTP se usa para Delete?",
    opts: [
      "DELETE",
      "POST",
      "REMOVE",
      "KILL"
    ],
    a: 0,
    exp: "El verbo estándar para eliminar recursos en arquitectura REST es DELETE."
  },

  // --- CLASE 7: Hardware y Permisos (14) ---
  {
    id: 87,
    unit: "Clase 7: Hardware",
    q: "¿Qué implica solicitar un 'Permiso en tiempo de ejecución' en móviles modernos?",
    opts: [
      "Mostrar un cuadro de diálogo al usuario (Aceptar/Denegar) justo cuando la app intenta usar la Cámara, GPS, etc.",
      "Comprar una licencia de Android en Google Play",
      "Ingresar un código PIN de administrador",
      "Pedir autorización al operador de telefonía (Claro/Personal)"
    ],
    a: 0,
    exp: "Los permisos sensibles no se conceden al instalar; se piden al momento exacto de uso para proteger la privacidad."
  },
  {
    id: 88,
    unit: "Clase 7: Hardware",
    q: "¿En Expo, cómo instalas módulos de hardware (ej: cámara, ubicación)?",
    opts: [
      "npx expo install expo-camera expo-location",
      "npm install android-camera-native",
      "Vienen todos instalados por defecto pesando 2GB",
      "Deben descargarse de foros externos a mano"
    ],
    a: 0,
    exp: "Expo modulariza el hardware: instalas y sumas al peso de la app solo lo que usas."
  },
  {
    id: 89,
    unit: "Clase 7: Hardware",
    q: "¿Qué indica la respuesta de la función useCameraPermissions() cuando 'status' es 'granted'?",
    opts: [
      "El usuario aprobó usar la cámara y el componente puede renderizarse libremente",
      "El dispositivo no posee cámara física",
      "La batería está demasiado baja para la cámara",
      "El usuario rechazó permanentemente el uso de cámara"
    ],
    a: 0,
    exp: "granted (concedido) es el estado feliz que habilita el renderizado visual de <CameraView>."
  },
  {
    id: 90,
    unit: "Clase 7: Hardware",
    q: "¿Qué debe hacer la app si el permiso de cámara fue denegado (status === 'denied')?",
    opts: [
      "Mostrar una pantalla con texto explicativo y un botón que sugiera abrir la Configuración del teléfono",
      "Iniciar la cámara a la fuerza mediante trucos de JavaScript",
      "Cerrar la aplicación instantáneamente por la fuerza (Crash)",
      "Llamar repetidamente a solicitar permiso en bucle infinito"
    ],
    a: 0,
    exp: "Si está denegado, Android/iOS impiden volver a pedirlo por código; el usuario debe ir a Ajustes manualmente."
  },
  {
    id: 91,
    unit: "Clase 7: Hardware",
    q: "¿Qué componente de Expo renderiza en pantalla lo que el lente físico de la cámara está capturando?",
    opts: [
      "<CameraView>",
      "<LensPreview>",
      "<NativeCamera>",
      "<HardwareLens>"
    ],
    a: 0,
    exp: "CameraView (antes Camera) abre la previsualización del visor del teléfono integrado en tu interfaz React."
  },
  {
    id: 92,
    unit: "Clase 7: Hardware",
    q: "¿Cómo se alterna entre cámara frontal y trasera?",
    opts: [
      "Cambiando el prop facing='front' a facing='back'",
      "Girando físicamente el teléfono 180 grados",
      "Es imposible en React Native, solo graba cámara trasera",
      "Solicitando el permiso 'expo-camera-front'"
    ],
    a: 0,
    exp: "El prop `facing` o `type` (en versiones viejas) reconfigura dinámicamente qué lente activa el SO."
  },
  {
    id: 93,
    unit: "Clase 7: Hardware",
    q: "¿Qué paso técnico permite guardar una foto tomada con Expo Camera en la Galería del usuario?",
    opts: [
      "Instalar expo-media-library, pedir permiso de almacenamiento, y usar MediaLibrary.saveToLibraryAsync()",
      "Se guarda sola, no hay que programar nada",
      "Hacer un fetch POST a 'localhost/galeria'",
      "Tomar captura de pantalla de la app (Screenshot)"
    ],
    a: 0,
    exp: "La memoria del teléfono es otro entorno seguro distinto a la cámara; MediaLibrary maneja el acceso al rollo de fotos."
  },
  {
    id: 94,
    unit: "Clase 7: Hardware",
    q: "¿Qué paquete nativo permite abrir el Selector de Fotos (Galería) sin pedir permisos complejos en nuevas versiones?",
    opts: [
      "expo-image-picker",
      "expo-gallery-viewer",
      "react-native-photos",
      "expo-camera-roll"
    ],
    a: 0,
    exp: "ImagePicker lanza el selector del sistema aislado, donde el usuario elige y devuelve solo las rutas (URIs) elegidas."
  },
  {
    id: 95,
    unit: "Clase 7: Hardware",
    q: "¿Qué devuelve el ImagePicker o la toma de foto cuando capturan una imagen?",
    opts: [
      "Un objeto con una URI temporal local (ej. file://ruta_interna_del_cache/foto.jpg)",
      "Un enlace público de Google Drive con la foto",
      "Una base de datos SQL entera insertada en memoria",
      "Un string Base64 infinito que se renderiza con <Text>"
    ],
    a: 0,
    exp: "Las imágenes se guardan temporalmente en el caché de la app, retornando un path local `file://...` para renderizar en <Image>."
  },
  {
    id: 96,
    unit: "Clase 7: Hardware",
    q: "¿Qué paquete usarías para obtener las coordenadas de latitud y longitud del smartphone?",
    opts: [
      "expo-location",
      "expo-maps",
      "expo-gps-tracker",
      "react-native-satellites"
    ],
    a: 0,
    exp: "expo-location interactúa con la antena GPS y sensores de red pidiendo antes LocationPermission."
  },
  {
    id: 97,
    unit: "Clase 7: Hardware",
    q: "¿Por qué obtener la ubicación precisa (getCurrentPositionAsync) tarda o falla si estás dentro de un edificio techado?",
    opts: [
      "Porque la señal GPS requiere línea de visión directa a los satélites geoestacionarios en el cielo",
      "Porque el Wi-Fi interfiere negativamente con la batería",
      "Porque React Native no soporta ubicaciones en interiores",
      "Porque el código de JavaScript bloquea el procesador de ubicación"
    ],
    a: 0,
    exp: "Hardware real: las antenas GPS no traspasan techos macizos. Dentro se suele recurrir a triangulación celular/WiFi (menos precisa)."
  },
  {
    id: 98,
    unit: "Clase 7: Hardware",
    q: "¿Qué herramienta permite generar persistencia simple de clave-valor sin armar una base de datos local pesada (como SQLite)?",
    opts: [
      "AsyncStorage",
      "MongoDB",
      "Firebase",
      "MySQL Local"
    ],
    a: 0,
    exp: "AsyncStorage guarda cadenas (strings) en el teléfono, ideal para IDs de sesión, temas oscuros o carritos chicos."
  },
  {
    id: 99,
    unit: "Clase 7: Hardware",
    q: "¿Se deben guardar contraseñas puras o tokens bancarios de alta sensibilidad en AsyncStorage?",
    opts: [
      "NO, porque no va encriptado. Se debe usar un almacenamiento seguro por hardware como expo-secure-store",
      "Sí, es totalmente irrastreable e indescifrable",
      "Solo si el teléfono está en modo seguro",
      "Solo si se declaran en variables con `const` en vez de `let`"
    ],
    a: 0,
    exp: "SecureStore usa el chip criptográfico (Keychain en iOS / Keystore en Android) para proteger datos críticos."
  },
  {
    id: 100,
    unit: "Clase 7: Hardware",
    q: "¿Qué paso debes seguir para compilar el APK o IPA para instalar en los celulares o subir a tiendas luego de probar en Expo Go?",
    opts: [
      "Usar Expo Application Services (EAS Build) o exportar en modo local con prebuild",
      "Nada, la app en Expo Go se publica automáticamente en Google Play sola",
      "Mandar un email a Apple con tu archivo App.js adjunto",
      "Tomar una foto del código y enviarla al servidor de Expo"
    ],
    a: 0,
    exp: "EAS Build compila el código nativo remotamente devolviendo el APK/AAB listo para distribución comercial."
  }
];
