import React from 'react';

export const CATEGORIES = [
  'Todos',
  'Pasivos',
  'Semiconductores',
  'Protección y Maniobra',
  'Fuentes y Medición',
  'Salidas y Actuadores',
  'Circuitos Integrados'
];

export const componentsData = [
  // ==========================================
  // PASIVOS
  // ==========================================
  {
    id: 'resistor',
    name: 'Resistencia Fija (Resistor)',
    designator: 'R',
    category: 'Pasivo',
    unit: 'Ohmios (Ω)',
    symbolStandard: 'IEC (Rectángulo) / ANSI (Zig-Zag)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        {/* Terminal izquierda */}
        <line x1="5" y1="30" x2="25" y2="30" />
        {/* Rectángulo IEC */}
        <rect x="25" y="20" width="50" height="20" fill="rgba(0, 43, 73, 0.05)" stroke="#002b49" strokeWidth="2.5" rx="2" />
        {/* Terminal derecha */}
        <line x1="75" y1="30" x2="95" y2="30" />
        <text x="50" y="34" textAnchor="middle" fill="#002b49" fontSize="9" fontWeight="bold" stroke="none">R</text>
      </svg>
    ),
    symbolAltSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        {/* Zig-Zag ANSI */}
        <line x1="5" y1="30" x2="22" y2="30" />
        <path d="M 22 30 L 29 16 L 41 44 L 53 16 L 65 44 L 73 16 L 78 30" />
        <line x1="78" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 120 70" width="100%" height="100%">
        {/* Alambres / Terminales */}
        <line x1="5" y1="35" x2="115" y2="35" stroke="#a0aec0" strokeWidth="3" strokeLinecap="round" />
        {/* Cuerpo de la resistencia (marrón claro cerámico) */}
        <path d="M 32 23 C 38 23 42 27 46 27 L 74 27 C 78 27 82 23 88 23 C 92 23 94 28 94 35 C 94 42 92 47 88 47 C 82 47 78 43 74 43 L 46 43 C 42 43 38 47 32 47 C 28 47 26 42 26 35 C 26 28 28 23 32 23 Z" fill="#d9b382" stroke="#8c6239" strokeWidth="1.5" />
        {/* Bandas de color (ej. Marrón, Negro, Rojo, Dorado = 1kΩ 5%) */}
        <rect x="36" y="23" width="6" height="24" fill="#6b3a0c" />
        <rect x="48" y="27" width="5" height="16" fill="#111" />
        <rect x="60" y="27" width="5" height="16" fill="#e53e3e" />
        <rect x="76" y="24" width="6" height="22" fill="#d4af37" />
      </svg>
    ),
    operation: 'Limita el flujo de corriente eléctrica disipando energía en forma de calor según el efecto Joule. Determina caídas de potencial en ramas del circuito.',
    terminals: ['Terminal 1 (Bidireccional)', 'Terminal 2 (No tiene polaridad)'],
    applications: ['Limitación de corriente para LEDs', 'Divisores de tensión', 'Polarización de transistores', 'Terminación de buses'],
    formula: 'V = I · R  (Ley de Ohm) | P = I² · R  (Disipación)',
    caution: 'Verificar la potencia nominal (1/4W, 1/2W, 1W, 5W) para evitar quemar el componente por sobrecalentamiento.'
  },
  {
    id: 'potentiometer',
    name: 'Potenciómetro (Resistencia Variable)',
    designator: 'POT / RV',
    category: 'Pasivo',
    unit: 'Ohmios (Ω, kΩ)',
    symbolStandard: 'IEC con flecha regulable',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="35" x2="25" y2="35" />
        <rect x="25" y="25" width="50" height="20" fill="rgba(0,43,73,0.05)" stroke="#002b49" strokeWidth="2" />
        <line x1="75" y1="35" x2="95" y2="35" />
        {/* Flecha del cursor central */}
        <line x1="50" y1="7" x2="50" y2="23" />
        <polygon points="46,19 50,25 54,19" fill="#002b49" stroke="none" />
        <circle cx="50" cy="7" r="2.5" fill="#002b49" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Carcasa cilíndrica metálica */}
        <circle cx="50" cy="38" r="28" fill="#a0aec0" stroke="#4a5568" strokeWidth="2" />
        <circle cx="50" cy="38" r="18" fill="#718096" />
        {/* Eje estriado giratorio */}
        <circle cx="50" cy="38" r="9" fill="#e2e8f0" stroke="#2d3748" strokeWidth="1.5" />
        <line x1="43" y1="38" x2="57" y2="38" stroke="#4a5568" strokeWidth="2" />
        {/* 3 Pines inferiores */}
        <rect x="34" y="66" width="5" height="12" fill="#cbd5e0" stroke="#4a5568" />
        <rect x="47.5" y="66" width="5" height="12" fill="#cbd5e0" stroke="#4a5568" />
        <rect x="61" y="66" width="5" height="12" fill="#cbd5e0" stroke="#4a5568" />
      </svg>
    ),
    operation: 'Resistencia de 3 terminales con un contacto móvil (cursor). Al rotar el eje se varía la resistencia entre el cursor y los extremos, creando un divisor de tensión regulable.',
    terminals: ['Pin 1: Extremo A', 'Pin 2: Cursor (Wiper)', 'Pin 3: Extremo B'],
    applications: ['Control de volumen de audio', 'Ajuste de brillo o velocidad PWM', 'Calibración de instrumentos'],
    formula: 'V_out = V_in · (R_cursor / R_total)',
    caution: 'Evitar conectar el cursor directamente a masa y a VCC sin resistencia en serie; podría causar un cortocircuito al llevarlo al tope.'
  },
  {
    id: 'ldr',
    name: 'Fotorresistencia (LDR)',
    designator: 'LDR',
    category: 'Pasivo',
    unit: 'Ohmios (Ω a MΩ)',
    symbolStandard: 'IEC con flechas de luz incidente',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <rect x="25" y="20" width="50" height="20" fill="rgba(255, 235, 59, 0.15)" stroke="#002b49" strokeWidth="2" />
        <line x1="75" y1="30" x2="95" y2="30" />
        {/* Flechas de luz */}
        <line x1="28" y1="6" x2="38" y2="17" stroke="#eab308" strokeWidth="2" />
        <polygon points="34,16 39,18 39,13" fill="#eab308" stroke="none" />
        <line x1="43" y1="6" x2="53" y2="17" stroke="#eab308" strokeWidth="2" />
        <polygon points="49,16 54,18 54,13" fill="#eab308" stroke="none" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Patillas */}
        <line x1="42" y1="50" x2="42" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="58" y1="50" x2="58" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Cabeza circular de resina */}
        <circle cx="50" cy="32" r="18" fill="#e28743" stroke="#873e23" strokeWidth="2" />
        <circle cx="50" cy="32" r="15" fill="#f6d55c" />
        {/* Pista sinuosa de sulfuro de cadmio */}
        <path d="M 40 24 Q 50 24 50 28 Q 50 32 40 32 Q 40 36 60 36 Q 60 40 42 40" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    operation: 'Resistencia cuyo valor óhmico disminuye drásticamente cuando incide luz sobre su superficie semiconductora (típicamente sulfuro de cadmio, CdS).',
    terminals: ['Terminal 1', 'Terminal 2 (Sin polaridad)'],
    applications: ['Luces crepusculares automáticas', 'Seguidores solares', 'Alarmas ópticas de corte'],
    formula: 'R = A · L^(-γ)  (A mayor luminosidad en lux, menor resistencia en Ω)',
    caution: 'Respuesta lenta (decenas de milisegundos); no apto para modulaciones ópticas de alta frecuencia.'
  },
  {
    id: 'thermistor',
    name: 'Termistor NTC / PTC',
    designator: 'TH / NTC',
    category: 'Pasivo',
    unit: 'Ohmios (Ω)',
    symbolStandard: 'IEC con símbolo de temperatura θ',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <rect x="25" y="20" width="50" height="20" fill="rgba(0,43,73,0.05)" stroke="#002b49" strokeWidth="2" />
        <line x1="75" y1="30" x2="95" y2="30" />
        {/* Línea diagonal indicadora de temperatura */}
        <line x1="22" y1="45" x2="40" y2="45" stroke="#002b49" strokeWidth="2" />
        <line x1="40" y1="45" x2="78" y2="12" stroke="#002b49" strokeWidth="2" />
        <text x="68" y="14" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">-t°</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <line x1="44" y1="48" x2="44" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="56" y1="48" x2="56" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Gota o disco cerámico epoxy azul/negro */}
        <ellipse cx="50" cy="34" rx="16" ry="14" fill="#1e3a8a" stroke="#172554" strokeWidth="1.5" />
        <ellipse cx="46" cy="30" rx="6" ry="3" fill="#3b82f6" opacity="0.6" />
      </svg>
    ),
    operation: 'Sensor resistivo de temperatura. En los NTC (Coeficiente de Temperatura Negativo) la resistencia disminuye al subir la temperatura; en los PTC aumenta.',
    terminals: ['Terminal 1', 'Terminal 2'],
    applications: ['Termómetros digitales', 'Impresoras 3D (cama y extrusor)', 'Protección contra corriente de arranque (Inrush Current)'],
    formula: '1/T = 1/T₀ + (1/β)·ln(R/R₀)  (Ecuación de Steinhart-Hart)',
    caution: 'La corriente que pasa a través de él puede generar auto-calentamiento (efecto Joule) y falsear la lectura si no se limita adecuadamente.'
  },
  {
    id: 'ceramic-cap',
    name: 'Capacitor Cerámico (No Polarizado)',
    designator: 'C',
    category: 'Pasivo',
    unit: 'Picofaradios (pF) a Nanofaradios (nF)',
    symbolStandard: 'IEC / ANSI (Dos placas paralelas)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="43" y2="30" />
        <line x1="43" y1="12" x2="43" y2="48" strokeWidth="3" />
        <line x1="57" y1="12" x2="57" y2="48" strokeWidth="3" />
        <line x1="57" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <line x1="42" y1="48" x2="42" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="58" y1="48" x2="58" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Disco cerámico lenteja naranja */}
        <circle cx="50" cy="34" r="18" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
        <text x="50" y="38" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">104</text>
      </svg>
    ),
    operation: 'Almacena cargas electrostáticas entre dos placas separadas por dieléctrico cerámico. No tiene polaridad y responde con excelente velocidad a altas frecuencias.',
    terminals: ['Terminal A', 'Terminal B (Cualquiera de los dos)'],
    applications: ['Desacoplo de ruido en pines VCC de microcontroladores (100nF)', 'Filtros RF', 'Circuitos sintonizadores'],
    formula: 'C = ε · (A / d) | X_c = 1 / (2π · f · C)',
    caution: 'Verificar la tensión máxima admisible de trabajo (50V, 100V, 1kV).'
  },
  {
    id: 'electrolytic-cap',
    name: 'Capacitor Electrolítico (Polarizado)',
    designator: 'C / CE',
    category: 'Pasivo',
    unit: 'Microfaradios (µF) a Milifaradios (mF)',
    symbolStandard: 'IEC (Placa curva negativa o placa con +)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        {/* Terminal positivo */}
        <line x1="5" y1="30" x2="40" y2="30" />
        <line x1="40" y1="12" x2="40" y2="48" strokeWidth="3" />
        <text x="25" y="22" fill="#e11d48" fontSize="16" fontWeight="bold" stroke="none">+</text>
        {/* Placa negativa (curva o blanca) */}
        <path d="M 58 12 Q 50 30 58 48" strokeWidth="3" />
        <line x1="54" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Patas (Ánodo más largo) */}
        <line x1="44" y1="52" x2="44" y2="78" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="56" y1="52" x2="56" y2="72" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Cilindro de aluminio con plástico negro/azul */}
        <rect x="34" y="10" width="32" height="42" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        {/* Tapa metálica superior con muesca en cruz */}
        <ellipse cx="50" cy="11" rx="16" ry="3" fill="#94a3b8" />
        {/* Franja blanca indicadora del polo negativo con signos '-' */}
        <rect x="54" y="12" width="10" height="40" fill="#e2e8f0" />
        <text x="59" y="24" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">-</text>
        <text x="59" y="36" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">-</text>
        <text x="59" y="48" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="bold">-</text>
      </svg>
    ),
    operation: 'Proporciona una gran capacidad en un volumen reducido gracias a una finísima capa dieléctrica de óxido metálico formada por electrólisis. ES ESTRICTAMENTE POLARIZADO.',
    terminals: ['Ánodo (+): Patilla más larga', 'Cátodo (-): Indicado por franja blanca en el cuerpo'],
    applications: ['Filtrado de rizado en fuentes de alimentación rectificadas', 'Acoplo de audio', 'Bancos de energía temporal'],
    formula: 'Q = C · V | E = 1/2 · C · V²',
    caution: '¡PELIGRO! Conectarlo con polaridad invertida o sobrepasar su voltaje causa explosión y emisión de gas corrosivo.'
  },
  {
    id: 'inductor',
    name: 'Inductor / Bobina de Choque',
    designator: 'L',
    category: 'Pasivo',
    unit: 'Henrios (H, mH, µH)',
    symbolStandard: 'IEC / ANSI (Espiras en serie)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="35" x2="20" y2="35" />
        {/* 4 Espiras */}
        <path d="M 20 35 C 20 20 35 20 35 35" />
        <path d="M 35 35 C 35 20 50 20 50 35" />
        <path d="M 50 35 C 50 20 65 20 65 35" />
        <path d="M 65 35 C 65 20 80 20 80 35" />
        <line x1="80" y1="35" x2="95" y2="35" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <line x1="30" y1="65" x2="30" y2="78" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="70" y1="65" x2="70" y2="78" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Núcleo de ferrita toroidal */}
        <ellipse cx="50" cy="40" rx="26" ry="24" fill="#334155" />
        <ellipse cx="50" cy="40" rx="14" ry="12" fill="#0f172a" />
        {/* Espiras de cobre esmaltado */}
        <path d="M 34 25 C 40 20 45 48 38 58" stroke="#b45309" strokeWidth="3.5" fill="none" />
        <path d="M 44 18 C 50 14 55 48 48 64" stroke="#d97706" strokeWidth="3.5" fill="none" />
        <path d="M 54 18 C 60 14 65 48 58 64" stroke="#b45309" strokeWidth="3.5" fill="none" />
        <path d="M 64 25 C 70 20 75 48 68 58" stroke="#d97706" strokeWidth="3.5" fill="none" />
      </svg>
    ),
    operation: 'Almacena energía en forma de campo magnético cuando circula corriente. Por ley de Lenz, se opone a cualquier variación abrupta de la intensidad de corriente.',
    terminals: ['Terminal 1', 'Terminal 2'],
    applications: ['Filtros LC y fuentes conmutadas (Buck/Boost)', 'Supresores de interferencias EMI', 'Antenas de radio'],
    formula: 'V = L · (di / dt) | X_L = 2π · f · L',
    caution: 'Al desconectar bruscamente una bobina con corriente se genera un pico inductivo de muy alto voltaje (CEMF) que destruye transistores si no se usa diodo volante (Flyback).'
  },
  {
    id: 'transformer',
    name: 'Transformador Eléctrico',
    designator: 'TR / T',
    category: 'Pasivo',
    unit: 'Voltamperios (VA) / Relación N1:N2',
    symbolStandard: 'IEC (Bobinados acoplados con núcleo)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' }}>
        {/* Primario */}
        <line x1="5" y1="15" x2="25" y2="15" />
        <path d="M 25 15 C 35 15 35 25 25 25 C 35 25 35 35 25 35 C 35 35 35 45 25 45" />
        <line x1="25" y1="45" x2="5" y2="45" />
        {/* Núcleo magnético (2 líneas paralelas) */}
        <line x1="48" y1="10" x2="48" y2="50" strokeWidth="2" strokeDasharray="3,2" />
        <line x1="52" y1="10" x2="52" y2="50" strokeWidth="2" strokeDasharray="3,2" />
        {/* Secundario */}
        <line x1="95" y1="15" x2="75" y2="15" />
        <path d="M 75 15 C 65 15 65 25 75 25 C 65 25 65 35 75 35 C 65 35 65 45 75 45" />
        <line x1="75" y1="45" x2="95" y2="45" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Núcleo de chapas de acero silicio en E-I */}
        <rect x="25" y="16" width="50" height="48" fill="#475569" stroke="#1e293b" strokeWidth="2" rx="3" />
        {/* Carrete central con bobinado envuelto en cinta amarilla aislante */}
        <rect x="33" y="24" width="34" height="32" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
        {/* Cables primario (rojos) y secundario (azules) */}
        <line x1="12" y1="28" x2="33" y2="28" stroke="#dc2626" strokeWidth="3" />
        <line x1="12" y1="52" x2="33" y2="52" stroke="#dc2626" strokeWidth="3" />
        <line x1="67" y1="28" x2="88" y2="28" stroke="#2563eb" strokeWidth="3" />
        <line x1="67" y1="52" x2="88" y2="52" stroke="#2563eb" strokeWidth="3" />
      </svg>
    ),
    operation: 'Transfiere energía eléctrica entre dos circuitos aislados mediante inducción electromagnética mutua. Permite elevar o reducir tensiones alternas (AC) manteniendo la potencia.',
    terminals: ['Devanado Primario (Entrada AC)', 'Devanado Secundario (Salida AC)'],
    applications: ['Fuentes de alimentación lineales (220V a 12V/24V)', 'Aislamiento galvánico de seguridad', 'Distribución en subestaciones eléctricas'],
    formula: 'Vp / Vs = Np / Ns = Is / Ip',
    caution: '¡Solo funciona con Corriente Alterna (AC)! Conectar un transformador a DC provoca cortocircuito e incendio por no haber variación de flujo.'
  },

  // ==========================================
  // SEMICONDUCTORES Y DIODOS
  // ==========================================
  {
    id: 'diode-rectifier',
    name: 'Diodo Rectificador (1N4007)',
    designator: 'D',
    category: 'Semiconductor',
    unit: 'Amperios (A) / Tensión Inversa (V)',
    symbolStandard: 'IEC / ANSI (Flecha hacia barrera)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="40" y2="30" />
        {/* Triángulo ánodo apuntando al cátodo */}
        <polygon points="40,15 40,45 65,30" fill="#002b49" />
        {/* Barra del cátodo */}
        <line x1="65" y1="15" x2="65" y2="45" strokeWidth="3.5" />
        <line x1="65" y1="30" x2="95" y2="30" />
        <text x="25" y="24" fill="#002b49" fontSize="9" fontWeight="bold" stroke="none">A</text>
        <text x="75" y="24" fill="#002b49" fontSize="9" fontWeight="bold" stroke="none">K</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 120 70" width="100%" height="100%">
        <line x1="8" y1="35" x2="112" y2="35" stroke="#a0aec0" strokeWidth="3" />
        {/* Encapsulado plástico DO-41 negro */}
        <rect x="36" y="22" width="48" height="26" rx="3" fill="#18181b" stroke="#09090b" strokeWidth="1.5" />
        {/* Banda plateada del cátodo */}
        <rect x="70" y="22" width="9" height="26" fill="#e4e4e7" />
        <text x="50" y="38" textAnchor="middle" fill="#71717a" fontSize="7" fontWeight="bold">1N4007</text>
      </svg>
    ),
    operation: 'Válvula unidireccional de corriente basada en una unión P-N. Permite el flujo en polarización directa (caída de 0.7V en silicio) y bloquea el flujo en inversa.',
    terminals: ['Ánodo (A): Entrada de corriente convencional', 'Cátodo (K): Marcado con la banda plateada'],
    applications: ['Puentes rectificadores AC a DC', 'Protección contra polaridad invertida', 'Diodo de rueda libre (Flyback)'],
    formula: 'I = I_s · (e^(qV / kT) - 1)  (Ecuación de Shockley)',
    caution: 'Respetar la corriente máxima continua (ej. 1A en 1N4007) y la tensión inversa de ruptura (PIV).'
  },
  {
    id: 'diode-zener',
    name: 'Diodo Zener',
    designator: 'DZ / ZD',
    category: 'Semiconductor',
    unit: 'Voltaje Zener (Vz, ej. 5.1V, 12V)',
    symbolStandard: 'IEC (Barrera en forma de Z)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="40" y2="30" />
        <polygon points="40,15 40,45 65,30" fill="#002b49" />
        {/* Barra con alas en Z */}
        <line x1="65" y1="15" x2="65" y2="45" strokeWidth="3" />
        <line x1="65" y1="15" x2="72" y2="15" strokeWidth="3" />
        <line x1="65" y1="45" x2="58" y2="45" strokeWidth="3" />
        <line x1="65" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 120 70" width="100%" height="100%">
        <line x1="8" y1="35" x2="112" y2="35" stroke="#a0aec0" strokeWidth="3" />
        {/* Encapsulado de vidrio DO-35 naranja/rojo */}
        <rect x="42" y="24" width="36" height="22" rx="4" fill="#f97316" opacity="0.9" stroke="#c2410c" strokeWidth="1.5" />
        {/* Chip semiconductor interno visible */}
        <rect x="54" y="32" width="6" height="6" fill="#1e293b" />
        {/* Banda negra del cátodo */}
        <rect x="68" y="24" width="7" height="22" fill="#18181b" />
      </svg>
    ),
    operation: 'Diseñado especialmente para trabajar en la zona de ruptura por avalancha inversa. Mantiene un voltaje prácticamente constante (Vz) entre sus terminales independientemente de las variaciones de corriente.',
    terminals: ['Ánodo (A)', 'Cátodo (K): Se conecta al potencial positivo en regulación'],
    applications: ['Reguladores de voltaje de referencia', 'Fijadores de nivel de señal (clamping)', 'Protección contra sobretensiones'],
    formula: 'P_z = V_z · I_z  (Requiere siempre resistor limitador en serie)',
    caution: 'Nunca conectar un Zener directamente a una fuente sin resistencia en serie; se destruirá instantáneamente al entrar en conducción.'
  },
  {
    id: 'led',
    name: 'Diodo LED (Emisor de Luz)',
    designator: 'LED',
    category: 'Semiconductor',
    unit: 'Color / Caída V_f (1.8V a 3.3V)',
    symbolStandard: 'IEC con flechas de radiación luminosa',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="38" y2="30" />
        <polygon points="38,15 38,45 62,30" fill="#0284c7" stroke="#002b49" />
        <line x1="62" y1="15" x2="62" y2="45" strokeWidth="3" />
        <line x1="62" y1="30" x2="95" y2="30" />
        {/* Flechas de emisión de luz hacia afuera */}
        <line x1="55" y1="15" x2="68" y2="4" stroke="#e11d48" strokeWidth="2" />
        <polygon points="63,3 69,4 68,9" fill="#e11d48" stroke="none" />
        <line x1="68" y1="20" x2="81" y2="9" stroke="#e11d48" strokeWidth="2" />
        <polygon points="76,8 82,9 81,14" fill="#e11d48" stroke="none" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Patas: Ánodo más largo (+) izquierda, Cátodo más corto (-) derecha */}
        <line x1="42" y1="46" x2="42" y2="78" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="58" y1="46" x2="58" y2="70" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Domo de 5mm con lado plano en cátodo */}
        <path d="M 32 46 L 32 28 C 32 12 68 12 68 28 L 68 46 Z" fill="#ef4444" opacity="0.9" stroke="#b91c1c" strokeWidth="1.5" />
        <path d="M 30 46 L 70 46 L 70 50 L 30 50 Z" fill="#dc2626" />
        {/* Reflejo brillante de la cúpula */}
        <path d="M 38 20 Q 50 14 60 20" stroke="#fca5a5" strokeWidth="2" fill="none" />
      </svg>
    ),
    operation: 'Semiconductor que emite fotones de luz visible o infrarroja por electroluminiscencia cuando los electrones se recombinan con huecos en polarización directa.',
    terminals: ['Ánodo (+): Patilla más larga / terminal interno pequeño', 'Cátodo (-): Patilla corta / borde biselado plano'],
    applications: ['Indicadores luminosos de encendido y estado', 'Pantallas alfanuméricas de 7 segmentos', 'Iluminación y optoelectrónica'],
    formula: 'R_lim = (V_fuente - V_led) / I_led  (Típicamente I_led = 10 a 20 mA)',
    caution: '¡NUNCA conectar a una fuente sin resistencia limitadora en serie! Se fundirá en milisegundos.'
  },
  {
    id: 'bjt-npn',
    name: 'Transistor BJT NPN (BC548 / 2N2222)',
    designator: 'Q / T',
    category: 'Semiconductor',
    unit: 'Ganancia hFE (β)',
    symbolStandard: 'IEC (Flecha en Emisor apuntando hacia afuera)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        {/* Base */}
        <line x1="5" y1="30" x2="35" y2="30" />
        <line x1="35" y1="12" x2="35" y2="48" strokeWidth="3.5" />
        {/* Colector */}
        <line x1="35" y1="20" x2="68" y2="6" />
        <line x1="68" y1="6" x2="68" y2="0" />
        <line x1="68" y1="0" x2="95" y2="0" />
        {/* Emisor con flecha saliente */}
        <line x1="35" y1="40" x2="68" y2="54" />
        <line x1="68" y1="54" x2="68" y2="60" />
        <line x1="68" y1="60" x2="95" y2="60" />
        <polygon points="56,43 68,54 54,52" fill="#002b49" stroke="none" />
        {/* Letras */}
        <text x="18" y="24" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">B</text>
        <text x="82" y="14" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">C</text>
        <text x="82" y="52" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">E</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* 3 Patas (C, B, E) */}
        <line x1="36" y1="44" x2="36" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="50" y1="44" x2="50" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="64" y1="44" x2="64" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Encapsulado TO-92 negro con cara plana frontal */}
        <path d="M 30 18 C 30 18 30 42 30 44 L 70 44 C 70 42 70 18 70 18 C 65 6 35 6 30 18 Z" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
        <text x="50" y="32" textAnchor="middle" fill="#a1a1aa" fontSize="7" fontWeight="bold">BC548</text>
      </svg>
    ),
    operation: 'Dispositivo controlado por corriente. Una pequeña corriente inyectada en la Base (I_b) permite controlar una corriente mucho mayor entre Colector y Emisor (I_c = β · I_b). Actúa como interruptor o amplificador.',
    terminals: ['Base (B): Control', 'Colector (C): Entrada de corriente principal (+)', 'Emisor (E): Salida (- con flecha)'],
    applications: ['Driver de relés y motores con Arduino', 'Amplificadores de audio', 'Compuertas lógicas discretas'],
    formula: 'I_c = β · I_b | V_be ≈ 0.7V en saturación/activa',
    caution: 'Consultar siempre la hoja de datos (Datasheet) del transistor específico; el orden de patas (CBE vs EBC) cambia según el modelo.'
  },
  {
    id: 'bjt-pnp',
    name: 'Transistor BJT PNP (BC557 / 2N3906)',
    designator: 'Q / T',
    category: 'Semiconductor',
    unit: 'Ganancia hFE (β)',
    symbolStandard: 'IEC (Flecha en Emisor apuntando hacia adentro)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="35" y2="30" />
        <line x1="35" y1="12" x2="35" y2="48" strokeWidth="3.5" />
        {/* Emisor arriba con flecha entrante */}
        <line x1="35" y1="20" x2="68" y2="6" />
        <line x1="68" y1="6" x2="95" y2="6" />
        <polygon points="46,18 35,20 42,27" fill="#002b49" stroke="none" />
        {/* Colector abajo */}
        <line x1="35" y1="40" x2="68" y2="54" />
        <line x1="68" y1="54" x2="95" y2="54" />
        <text x="18" y="24" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">B</text>
        <text x="82" y="16" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">E</text>
        <text x="82" y="50" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">C</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <line x1="36" y1="44" x2="36" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="50" y1="44" x2="50" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="64" y1="44" x2="64" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <path d="M 30 18 C 30 18 30 42 30 44 L 70 44 C 70 42 70 18 70 18 C 65 6 35 6 30 18 Z" fill="#18181b" stroke="#27272a" strokeWidth="1.5" />
        <text x="50" y="32" textAnchor="middle" fill="#a1a1aa" fontSize="7" fontWeight="bold">BC557</text>
      </svg>
    ),
    operation: 'Complementario del NPN. Conduce cuando la Base se encuentra a un potencial inferior al del Emisor (típicamente 0.7V por debajo). La corriente fluye de Emisor a Colector.',
    terminals: ['Base (B)', 'Emisor (E): Polo positivo', 'Colector (C): Polo negativo / carga'],
    applications: ['Etapas de salida push-pull clase AB', 'Conmutación por lado alto (High-side switch)'],
    formula: 'I_e = I_b + I_c | V_eb ≈ 0.7V',
    caution: 'La polaridad de voltajes y corrientes es opuesta a la del NPN.'
  },
  {
    id: 'mosfet-n',
    name: 'Transistor MOSFET Canal N (IRFZ44N)',
    designator: 'Q / M',
    category: 'Semiconductor',
    unit: 'Resistencia Rds(on) / Corriente Id',
    symbolStandard: 'IEC (Compuerta aislada G, Drenador D, Fuente S)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        {/* Gate */}
        <line x1="5" y1="40" x2="35" y2="40" />
        <line x1="35" y1="20" x2="35" y2="48" strokeWidth="3" />
        {/* Canal partido */}
        <line x1="43" y1="14" x2="43" y2="24" strokeWidth="3" />
        <line x1="43" y1="28" x2="43" y2="38" strokeWidth="3" />
        <line x1="43" y1="42" x2="43" y2="52" strokeWidth="3" />
        {/* Drain */}
        <line x1="43" y1="18" x2="70" y2="18" />
        <line x1="70" y1="18" x2="70" y2="8" />
        <line x1="70" y1="8" x2="95" y2="8" />
        {/* Source y sustrato con flecha entrante */}
        <line x1="43" y1="48" x2="70" y2="48" />
        <line x1="70" y1="48" x2="70" y2="56" />
        <line x1="70" y1="56" x2="95" y2="56" />
        <line x1="43" y1="33" x2="65" y2="33" />
        <line x1="65" y1="33" x2="65" y2="48" />
        <polygon points="56,33 46,29 46,37" fill="#002b49" stroke="none" />
        <text x="18" y="34" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">G</text>
        <text x="82" y="16" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">D</text>
        <text x="82" y="52" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">S</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* 3 Patas (G, D, S) */}
        <line x1="36" y1="48" x2="36" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <line x1="50" y1="48" x2="50" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <line x1="64" y1="48" x2="64" y2="76" stroke="#a0aec0" strokeWidth="3" />
        {/* Lengüeta metálica superior con orificio (TO-220) */}
        <rect x="28" y="10" width="44" height="18" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" rx="2" />
        <circle cx="50" cy="18" r="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
        {/* Cuerpo plástico negro */}
        <rect x="28" y="24" width="44" height="26" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        <text x="50" y="40" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold">IRFZ44N</text>
      </svg>
    ),
    operation: 'Transistor de efecto de campo controlado por VOLTAJE en la compuerta (Gate). Presenta una impedancia de entrada prácticamente infinita y una resistencia de conducción extremadamente baja (Rds_on), ideal para manejar grandes corrientes.',
    terminals: ['Gate (G): Compuerta', 'Drain (D): Drenador', 'Source (S): Fuente'],
    applications: ['Conmutación de alta velocidad en fuentes switching', 'Control de motores por PWM de alta potencia', 'Inversores solares'],
    formula: 'P_loss = I_d² · R_ds(on)',
    caution: 'La compuerta (Gate) es ultra sensible a la electricidad estática (ESD). Usar siempre una resistencia pull-down para asegurar el apagado.'
  },
  {
    id: 'scr',
    name: 'Tiristor (SCR)',
    designator: 'SCR / THY',
    category: 'Semiconductor',
    unit: 'Tensión / Corriente de cebado',
    symbolStandard: 'IEC (Diodo con terminal de compuerta Gate)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="38" y2="30" />
        <polygon points="38,15 38,45 62,30" fill="#002b49" />
        <line x1="62" y1="15" x2="62" y2="45" strokeWidth="3" />
        <line x1="62" y1="30" x2="95" y2="30" />
        {/* Terminal Gate oblicuo saliendo del cátodo */}
        <line x1="55" y1="34" x2="70" y2="52" strokeWidth="2.5" />
        <line x1="70" y1="52" x2="90" y2="52" strokeWidth="2.5" />
        <text x="20" y="24" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">A</text>
        <text x="82" y="24" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">K</text>
        <text x="82" y="48" fill="#002b49" fontSize="8" fontWeight="bold" stroke="none">G</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <line x1="36" y1="48" x2="36" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <line x1="50" y1="48" x2="50" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <line x1="64" y1="48" x2="64" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <rect x="28" y="10" width="44" height="18" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" rx="2" />
        <circle cx="50" cy="18" r="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
        <rect x="28" y="24" width="44" height="26" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        <text x="50" y="40" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold">BT151</text>
      </svg>
    ),
    operation: 'Rectificador controlado de silicio. Bloquea la corriente hasta que recibe un pulso positivo en su compuerta (Gate). Una vez cebado, permanece en conducción continua aunque se retire el pulso en Gate, hasta que la corriente caiga a cero.',
    terminals: ['Ánodo (A)', 'Cátodo (K)', 'Compuerta (G): Disparo'],
    applications: ['Arrancadores suaves de motores', 'Circuitos crowbar de protección contra sobrevoltaje', 'Control de rectificación industrial'],
    formula: 'I_ánodo > I_mantenimiento (Holding current)',
    caution: 'Para apagarlo en DC se requiere interrumpir mecánicamente la corriente o cortocircuitar momentáneamente ánodo con cátodo.'
  },
  {
    id: 'triac',
    name: 'TRIAC (Control de Potencia AC)',
    designator: 'TRC',
    category: 'Semiconductor',
    unit: 'Amperios RMS / Voltios AC',
    symbolStandard: 'IEC (Dos tiristores en antiparalelo con Gate)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="35" y2="30" />
        {/* Dos triángulos cruzados */}
        <polygon points="35,16 35,44 55,30" fill="#002b49" />
        <polygon points="55,16 55,44 35,30" fill="#002b49" />
        <line x1="55" y1="14" x2="55" y2="46" strokeWidth="2.5" />
        <line x1="35" y1="14" x2="35" y2="46" strokeWidth="2.5" />
        <line x1="55" y1="30" x2="95" y2="30" />
        {/* Gate saliendo de A1/A2 */}
        <line x1="48" y1="38" x2="62" y2="52" strokeWidth="2" />
        <line x1="62" y1="52" x2="85" y2="52" strokeWidth="2" />
        <text x="16" y="24" fill="#002b49" fontSize="7" fontWeight="bold" stroke="none">A1</text>
        <text x="80" y="24" fill="#002b49" fontSize="7" fontWeight="bold" stroke="none">A2</text>
        <text x="82" y="48" fill="#002b49" fontSize="7" fontWeight="bold" stroke="none">G</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <line x1="36" y1="48" x2="36" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <line x1="50" y1="48" x2="50" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <line x1="64" y1="48" x2="64" y2="76" stroke="#a0aec0" strokeWidth="3" />
        <rect x="28" y="10" width="44" height="18" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" rx="2" />
        <circle cx="50" cy="18" r="5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
        <rect x="28" y="24" width="44" height="26" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        <text x="50" y="40" textAnchor="middle" fill="#e2e8f0" fontSize="7" fontWeight="bold">BTA16</text>
      </svg>
    ),
    operation: 'Interruptor bidireccional de estado sólido para corriente alterna. Puede conducir corriente en ambos sentidos una vez que recibe un pulso de disparo en su compuerta (Gate), en cualquiera de los 4 cuadrantes.',
    terminals: ['Terminal Principal 1 (MT1 / A1)', 'Terminal Principal 2 (MT2 / A2)', 'Compuerta (Gate)'],
    applications: ['Dimmers reguladores de luz incandescente', 'Control de velocidad de taladros y amoladoras', 'Relés de estado sólido (SSR)'],
    formula: 'Ángulo de disparo α determina el Voltaje RMS entregado a la carga',
    caution: 'Requiere disipador térmico si maneja corrientes superiores a 2A y circuito Snubber (RC) para cargas inductivas.'
  },

  // ==========================================
  // PROTECCIÓN Y MANIOBRA
  // ==========================================
  {
    id: 'switch',
    name: 'Interruptor Unipolar (Llave de 1 Punto)',
    designator: 'SW / S',
    category: 'Protección y Maniobra',
    unit: 'Amperios (A) / Voltios (V)',
    symbolStandard: 'IEC (Contacto mecánico basculante)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="35" x2="30" y2="35" />
        <circle cx="33" cy="35" r="3" fill="#002b49" />
        {/* Brazo del interruptor abierto */}
        <line x1="33" y1="35" x2="65" y2="15" strokeWidth="3" />
        <circle cx="67" cy="35" r="3" fill="#fff" stroke="#002b49" strokeWidth="2" />
        <line x1="70" y1="35" x2="95" y2="35" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Bastidor de pared blanco */}
        <rect x="25" y="10" width="50" height="60" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        {/* Tecla basculante */}
        <rect x="36" y="22" width="28" height="36" rx="3" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="36" y1="40" x2="64" y2="40" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="50" cy="30" r="2.5" fill="#3b82f6" />
      </svg>
    ),
    operation: 'Dispositivo mecánico de maniobra que permite abrir o cerrar la continuidad de un conductor eléctrico de manera permanente hasta un nuevo accionamiento.',
    terminals: ['Borne de Entrada (Fase)', 'Borne de Salida (Retorno a la carga)'],
    applications: ['Encendido de luminarias en instalaciones domiciliarias', 'Corte general de equipos electrónicos'],
    formula: 'Abierto: R = ∞, I = 0 | Cerrado: R ≈ 0, V = 0',
    caution: 'En instalaciones eléctricas de 220V siempre debe cortar la FASE, nunca el neutro, para evitar riesgo de electrocución al cambiar lámparas.'
  },
  {
    id: 'push-button-no',
    name: 'Pulsador Normalmente Abierto (NA / NO)',
    designator: 'PB / NO',
    category: 'Protección y Maniobra',
    unit: 'Acción momentánea',
    symbolStandard: 'IEC (Pulsador NA con retorno por resorte)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="35" x2="35" y2="35" />
        <circle cx="35" cy="35" r="3" fill="#fff" stroke="#002b49" strokeWidth="2" />
        <circle cx="65" cy="35" r="3" fill="#fff" stroke="#002b49" strokeWidth="2" />
        <line x1="65" y1="35" x2="95" y2="35" />
        {/* Placa móvil suspendida arriba */}
        <line x1="30" y1="22" x2="70" y2="22" strokeWidth="3" />
        <line x1="50" y1="22" x2="50" y2="8" strokeWidth="2.5" />
        <line x1="42" y1="8" x2="58" y2="8" strokeWidth="2.5" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Pulsador táctil de 4 pines 6x6mm */}
        <line x1="24" y1="28" x2="16" y2="28" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="24" y1="52" x2="16" y2="52" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="76" y1="28" x2="84" y2="28" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="76" y1="52" x2="84" y2="52" stroke="#a0aec0" strokeWidth="2.5" />
        <rect x="24" y="16" width="52" height="48" rx="4" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
        <circle cx="50" cy="40" r="14" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        <circle cx="50" cy="40" r="10" fill="#dc2626" />
      </svg>
    ),
    operation: 'Permanece abierto en reposo. Al ser presionado mecánicamente une sus contactos cerrando el circuito. Al soltarlo, un resorte interno lo regresa a su posición abierta.',
    terminals: ['Terminales 1-2 y 3-4 (En botones táctiles vienen puenteados de a pares)'],
    applications: ['Timbres domiciliarios', 'Botón de arranque (Start) en contactores', 'Entradas digitales de Arduino (Reset / Input)'],
    formula: 'Estado en reposo: Lógico 0 o 1 según configuración Pull-up / Pull-down',
    caution: 'Sufre de efecto rebote mecánico (bouncing) que debe filtrarse por software o capacitor en microcontroladores.'
  },
  {
    id: 'fuse',
    name: 'Fusible de Protección',
    designator: 'F / FU',
    category: 'Protección y Maniobra',
    unit: 'Amperios (A, ej. 500mA, 2A, 10A)',
    symbolStandard: 'IEC (Rectángulo atravesado por línea)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <rect x="25" y="20" width="50" height="20" fill="rgba(0, 43, 73, 0.05)" stroke="#002b49" strokeWidth="2" />
        {/* Línea que lo atraviesa completamente */}
        <line x1="15" y1="30" x2="85" y2="30" strokeWidth="2" />
        <line x1="75" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 120 70" width="100%" height="100%">
        {/* Tubo de vidrio 5x20mm */}
        <rect x="30" y="24" width="60" height="22" rx="3" fill="#e0f2fe" opacity="0.8" stroke="#38bdf8" strokeWidth="1" />
        {/* Filamento interno fino de plomo/estaño */}
        <line x1="38" y1="35" x2="82" y2="35" stroke="#475569" strokeWidth="1.5" />
        {/* Casquillos metálicos en los extremos */}
        <rect x="24" y="22" width="16" height="26" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
        <rect x="80" y="22" width="16" height="26" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
      </svg>
    ),
    operation: 'Dispositivo de protección contra sobrecorrientes y cortocircuitos. Contiene un hilo metálico calibrado que se funde por efecto Joule cuando la corriente excede su valor nominal, interrumpiendo el paso de energía.',
    terminals: ['Terminal Entrada', 'Terminal Salida (Sin polaridad)'],
    applications: ['Protección de multímetros contra mala conexión', 'Fuentes de alimentación y electrodomésticos', 'Sistemas eléctricos del automotor'],
    formula: 'I² · t  (Energía de fusión)',
    caution: '¡NUNCA sustituir un fusible quemado por un alambre o un valor de mayor amperaje! Se corre riesgo inmediato de incendio.'
  },
  {
    id: 'circuit-breaker',
    name: 'Interruptor Termomagnético (Llave Térmica)',
    designator: 'PIA / Q',
    category: 'Protección y Maniobra',
    unit: 'Curva B/C/D - Calibre (10A, 16A, 25A, 32A)',
    symbolStandard: 'IEC (Térmico bimetal + Magnético bobina)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="35" x2="25" y2="35" />
        <circle cx="28" cy="35" r="2.5" fill="#002b49" />
        <line x1="28" y1="35" x2="60" y2="15" strokeWidth="2.5" />
        <circle cx="63" cy="35" r="2.5" fill="#fff" stroke="#002b49" />
        <line x1="66" y1="35" x2="95" y2="35" />
        {/* Símbolo térmico (rectángulo bimetal) y magnético (cruz/semicírculo) */}
        <path d="M 40 20 L 40 10 L 52 10 L 52 20 Z" strokeWidth="1.5" />
        <path d="M 54 8 C 60 8 60 2 54 2" strokeWidth="1.5" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Módulo DIN de riel blanco */}
        <rect x="30" y="8" width="40" height="64" rx="4" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
        {/* Palanca de accionamiento negra o naranja */}
        <rect x="42" y="24" width="16" height="22" rx="3" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
        <line x1="42" y1="35" x2="58" y2="35" stroke="#fff" strokeWidth="1.5" />
        {/* Marcado de datos técnicos */}
        <text x="50" y="58" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">C16</text>
        <text x="50" y="66" textAnchor="middle" fill="#64748b" fontSize="5">4500A 230V</text>
      </svg>
    ),
    operation: 'Protege las líneas y cables de una instalación contra sobrecargas prolongadas (mediante un bimetal térmico que se deforma con el calor) y contra cortocircuitos instantáneos (mediante un electroimán ultrarrápido).',
    terminals: ['Borne Superior (Entrada Red)', 'Borne Inferior (Salida al circuito protegido)'],
    applications: ['Tableros eléctricos domiciliarios, comerciales e industriales según norma IRAM 2183'],
    formula: 'Curva C: Disparo magnético entre 5 y 10 veces In',
    caution: 'El calibre de la térmica debe coordinarse estrictamente con la sección de los cables (ej. 10A para 1.5mm², 16A para 2.5mm², 20A para 4mm²).'
  },
  {
    id: 'rcd',
    name: 'Disyuntor Diferencial (Salvavita / ID)',
    designator: 'ID / DDR',
    category: 'Protección y Maniobra',
    unit: 'Sensibilidad IΔn (30 mA para humanos)',
    symbolStandard: 'IEC (Toroidal diferencial con botón de Test T)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="20" x2="30" y2="20" />
        <line x1="5" y1="40" x2="30" y2="40" />
        {/* Toroide sensor que abraza ambos conductores */}
        <ellipse cx="45" cy="30" rx="8" ry="18" stroke="#0284c7" strokeWidth="2.5" fill="none" />
        {/* Contactos */}
        <line x1="60" y1="20" x2="95" y2="20" />
        <line x1="60" y1="40" x2="95" y2="40" />
        <line x1="30" y1="20" x2="58" y2="12" strokeWidth="2" />
        <line x1="30" y1="40" x2="58" y2="32" strokeWidth="2" />
        <text x="75" y="55" fill="#e11d48" fontSize="8" fontWeight="bold" stroke="none">IΔn</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Módulo doble DIN 36mm */}
        <rect x="22" y="8" width="56" height="64" rx="4" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
        <rect x="30" y="24" width="20" height="22" rx="3" fill="#0f172a" />
        {/* Botón de TEST amarillo o azul */}
        <rect x="56" y="26" width="14" height="14" rx="2" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1" />
        <text x="63" y="36" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">T</text>
        <text x="50" y="60" textAnchor="middle" fill="#0f172a" fontSize="6" fontWeight="bold">30mA 25A</text>
      </svg>
    ),
    operation: 'Protección salvavidas. Compara continuamente la corriente entrante por la fase con la corriente saliente por el neutro. Si existe una diferencia superior a 30 mA (fuga a tierra o persona electrocutándose), corta en milisegundos.',
    terminals: ['Bornes 1 y N (Entrada Fase y Neutro)', 'Bornes 2 y N (Salida a térmicas)'],
    applications: ['Protección de personas contra electrocución y contactos directos/indirectos'],
    formula: 'I_fase - I_neutro = I_fuga > 30mA -> DISPARO',
    caution: '¡No reemplaza a la llave térmica! No protege contra sobrecargas ni cortocircuitos entre fase y neutro. Debe presionarse el botón TEST una vez al mes.'
  },
  {
    id: 'relay',
    name: 'Relé Electromecánico (Relay SPDT)',
    designator: 'RL / K',
    category: 'Protección y Maniobra',
    unit: 'Tensión Bobina (5V, 12V, 24V) / Contactos (10A 250VAC)',
    symbolStandard: 'IEC (Bobina electromagnética + contacto inversor)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        {/* Bobina izquierda */}
        <line x1="5" y1="18" x2="20" y2="18" />
        <rect x="20" y="12" width="22" height="36" fill="rgba(0,43,73,0.05)" stroke="#002b49" strokeWidth="2" />
        <line x1="20" y1="12" x2="42" y2="48" strokeWidth="1.5" />
        <line x1="5" y1="42" x2="20" y2="42" />
        {/* Línea de acople mecánico punteada */}
        <line x1="42" y1="30" x2="56" y2="30" stroke="#0284c7" strokeDasharray="2,2" strokeWidth="1.5" />
        {/* Contactos inversores (COM, NC, NO) */}
        <circle cx="58" cy="30" r="2.5" fill="#002b49" />
        <line x1="58" y1="30" x2="78" y2="18" strokeWidth="2.5" />
        {/* NC arriba */}
        <circle cx="80" cy="16" r="2.5" fill="#fff" stroke="#002b49" />
        <line x1="82" y1="16" x2="95" y2="16" />
        {/* NO abajo */}
        <circle cx="80" cy="42" r="2.5" fill="#fff" stroke="#002b49" />
        <line x1="82" y1="42" x2="95" y2="42" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Típico cubo azul tipo Songle SRD */}
        <rect x="22" y="16" width="56" height="48" rx="4" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
        <rect x="26" y="20" width="48" height="14" fill="#0369a1" rx="2" />
        <text x="50" y="30" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">SONGLE</text>
        <text x="50" y="46" textAnchor="middle" fill="#f0f9ff" fontSize="6">SRD-05VDC</text>
        <text x="50" y="56" textAnchor="middle" fill="#bae6fd" fontSize="5">10A 250VAC</text>
      </svg>
    ),
    operation: 'Interruptor accionado por un electroimán. Permite que un circuito de baja tensión y corriente (como un Arduino de 5V) controle con aislamiento galvánico cargas de alta potencia (motores, luces de 220V).',
    terminals: ['Bobina (Pines 1 y 2)', 'Común (COM)', 'Normal Cerrado (NC)', 'Normal Abierto (NA / NO)'],
    applications: ['Domótica, luces automáticas, control industrial de bombas y calefactores'],
    formula: 'Aislamiento galvánico > 1500V RMS',
    caution: 'Requiere siempre un diodo rectificador en paralelo con la bobina (Diodo Flyback) para neutralizar la contracorriente inductiva al apagarlo.'
  },

  // ==========================================
  // FUENTES, MEDICIÓN Y CONEXIONES
  // ==========================================
  {
    id: 'battery-dc',
    name: 'Batería / Pila Química (Fuente DC)',
    designator: 'BAT / B',
    category: 'Fuentes y Medición',
    unit: 'Voltios (V) / Amperios-hora (Ah)',
    symbolStandard: 'IEC (Placas larga positiva y corta gruesa negativa)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="35" y2="30" />
        {/* Placa positiva (larga y fina) */}
        <line x1="35" y1="10" x2="35" y2="50" strokeWidth="2" />
        <text x="24" y="22" fill="#e11d48" fontSize="14" fontWeight="bold" stroke="none">+</text>
        {/* Placa negativa (corta y gruesa) */}
        <line x1="45" y1="20" x2="45" y2="40" strokeWidth="4" />
        {/* Segundo vaso */}
        <line x1="55" y1="10" x2="55" y2="50" strokeWidth="2" />
        <line x1="65" y1="20" x2="65" y2="40" strokeWidth="4" />
        <line x1="65" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Pila cilíndrica AA / 9V */}
        <rect x="30" y="24" width="40" height="32" rx="3" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
        {/* Polo positivo saliente dorado */}
        <rect x="70" y="32" width="6" height="16" rx="1" fill="#f59e0b" />
        {/* Anillo dorado en el cuerpo */}
        <rect x="58" y="24" width="8" height="32" fill="#d97706" />
        <text x="44" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">1.5V</text>
        <text x="62" y="43" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">+</text>
      </svg>
    ),
    operation: 'Generador electroquímico que suministra fuerza electromotriz (FEM) continua y constante a expensas de la reacción química interna entre sus electrodos.',
    terminals: ['Polo Positivo (+) Ánodo', 'Polo Negativo (-) Cátodo'],
    applications: ['Equipos portátiles, linternas, mandos a distancia, respaldo de memoria'],
    formula: 'V_terminal = FEM - I · r_interna',
    caution: 'No recargar pilas no recargables (alcalinas comunes); pueden hincharse y derramar ácido de potasio cáustico.'
  },
  {
    id: 'source-ac',
    name: 'Fuente de Corriente Alterna (AC)',
    designator: 'V_AC / GEN',
    category: 'Fuentes y Medición',
    unit: 'Voltios RMS (V_rms, ej. 220V 50Hz)',
    symbolStandard: 'IEC (Círculo con senoide interior)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <circle cx="50" cy="30" r="24" strokeWidth="2.5" fill="rgba(0,43,73,0.05)" />
        {/* Onda senoidal interior ~ */}
        <path d="M 36 30 Q 43 16 50 30 Q 57 44 64 30" strokeWidth="2.5" />
        <line x1="75" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Tomacorriente Schuko / Binorma argentino 3 patas planas */}
        <circle cx="50" cy="40" r="28" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        {/* 2 Ranuras oblicuas (Fase y Neutro) y 1 vertical (Tierra) */}
        <line x1="40" y1="30" x2="45" y2="38" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        <line x1="60" y1="30" x2="55" y2="38" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="46" x2="50" y2="56" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    operation: 'Genera una tensión eléctrica cuya magnitud y sentido varían cíclicamente de forma sinusoidal a lo largo del tiempo (50Hz = 50 ciclos por segundo en Argentina).',
    terminals: ['Fase (Línea viva con potencial)', 'Neutro (Retorno referenciado a tierra)', 'Tierra (Protección)'],
    applications: ['Red de suministro eléctrico domiciliario e industrial, alternadores, generadores diésel'],
    formula: 'v(t) = V_pico · sen(2π · f · t) | V_rms = V_pico / √2',
    caution: '¡Riesgo letal de descarga eléctrica! 220V AC produce fibrilación ventricular. Respetar siempre las 5 reglas de oro.'
  },
  {
    id: 'ground-pe',
    name: 'Puesta a Tierra de Protección (PE)',
    designator: 'PE / GND',
    category: 'Fuentes y Medición',
    unit: 'Ohmios (Resistencia de jabalina < 10Ω)',
    symbolStandard: 'IEC (Líneas horizontales decrecientes)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="50" y1="5" x2="50" y2="25" />
        {/* 3 Barras decrecientes */}
        <line x1="25" y1="25" x2="75" y2="25" strokeWidth="3" />
        <line x1="35" y1="35" x2="65" y2="35" strokeWidth="2.5" />
        <line x1="44" y1="45" x2="56" y2="45" strokeWidth="2" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Jabalina de cobre clavada en la tierra con morceto */}
        <rect x="47" y="10" width="6" height="66" fill="#b45309" stroke="#78350f" strokeWidth="1" />
        {/* Morceto de bronce */}
        <rect x="42" y="20" width="16" height="12" rx="2" fill="#d97706" stroke="#92400e" strokeWidth="1" />
        {/* Cable verde y amarillo de 2.5/4mm */}
        <path d="M 42 26 C 25 26 20 10 10 10" fill="none" stroke="#16a34a" strokeWidth="3.5" />
        <path d="M 42 26 C 25 26 20 10 10 10" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="4,4" />
      </svg>
    ),
    operation: 'Conexión metálica de seguridad directa y de muy baja impedancia con la masa física de la Tierra (a través de una jabalina de acero-cobre). Deriva cualquier corriente de fuga por falla de aislación evitando que una persona reciba una descarga.',
    terminals: ['Borne PE: Cable verde con franja amarilla'],
    applications: ['Carcasas metálicas de lavarropas, heladeras, motores y tableros eléctricos'],
    formula: 'R_tierra < 10Ω según reglamentación AEA 90364',
    caution: 'La tierra física NUNCA debe desconectarse ni usarse como retorno de corriente de neutro.'
  },
  {
    id: 'voltmeter',
    name: 'Voltímetro (Instrumento)',
    designator: 'V',
    category: 'Fuentes y Medición',
    unit: 'Voltios (V, mV, kV)',
    symbolStandard: 'IEC (Círculo con V mayúscula)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <circle cx="50" cy="30" r="24" strokeWidth="2.5" fill="rgba(0, 43, 73, 0.05)" />
        <text x="50" y="38" textAnchor="middle" fill="#002b49" fontSize="22" fontWeight="bold" stroke="none">V</text>
        <line x1="75" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Tester / Multímetro digital amarillo/negro */}
        <rect x="28" y="10" width="44" height="62" rx="6" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <rect x="34" y="16" width="32" height="16" rx="2" fill="#0f172a" />
        <text x="50" y="28" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">220.4</text>
        <circle cx="50" cy="48" r="10" fill="#1e293b" />
      </svg>
    ),
    operation: 'Instrumento para medir la diferencia de potencial eléctrico (tensión o voltaje) entre dos puntos del circuito. Posee una resistencia interna extremadamente alta para no perturbar la medición.',
    terminals: ['Punta Roja (+)', 'Punta Negra (COM / -)'],
    applications: ['Verificación de fuentes, comprobación de caída de tensión en cargas'],
    formula: 'SE CONECTA SIEMPRE EN PARALELO al elemento a medir',
    caution: 'Conectarlo por error en serie con una carga cortará el circuito debido a su altísima resistencia interna (R_in ≈ 10 MΩ).'
  },
  {
    id: 'ammeter',
    name: 'Amperímetro (Instrumento)',
    designator: 'A',
    category: 'Fuentes y Medición',
    unit: 'Amperios (A, mA, µA)',
    symbolStandard: 'IEC (Círculo con A mayúscula)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <circle cx="50" cy="30" r="24" strokeWidth="2.5" fill="rgba(0, 43, 73, 0.05)" />
        <text x="50" y="38" textAnchor="middle" fill="#002b49" fontSize="22" fontWeight="bold" stroke="none">A</text>
        <line x1="75" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Pinza amperométrica roja */}
        <rect x="36" y="28" width="28" height="46" rx="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        {/* Mordaza toroidal superior */}
        <path d="M 40 28 C 40 10 60 10 60 28" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        <rect x="42" y="36" width="16" height="12" rx="2" fill="#0f172a" />
        <text x="50" y="45" textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold">1.85A</text>
      </svg>
    ),
    operation: 'Mide la intensidad del caudal de corriente eléctrica (electrones por segundo) que circula por una rama. Su resistencia interna es prácticamente nula (cortocircuito ideal).',
    terminals: ['Borne Entrada de Corriente', 'Borne Salida'],
    applications: ['Monitoreo de consumo de motores, diagnóstico de fugas'],
    formula: 'SE CONECTA SIEMPRE EN SERIE (abriendo el circuito)',
    caution: '¡PELIGRO! Conectar un amperímetro en paralelo con una fuente provocará un cortocircuito violento y quemará el fusible interno del tester.'
  },

  // ==========================================
  // SALIDAS, ACTUADORES Y CIRCUITOS INTEGRADOS
  // ==========================================
  {
    id: 'incandescent-lamp',
    name: 'Lámpara / Foco Incandescente',
    designator: 'LA / LP',
    category: 'Salidas y Actuadores',
    unit: 'Vatios (W) / Lúmenes',
    symbolStandard: 'IEC (Círculo con cruz interior en aspa)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        <circle cx="50" cy="30" r="24" strokeWidth="2.5" fill="rgba(255, 235, 59, 0.15)" />
        {/* Cruz en aspa X */}
        <line x1="33" y1="13" x2="67" y2="47" strokeWidth="2.5" />
        <line x1="33" y1="47" x2="67" y2="13" strokeWidth="2.5" />
        <line x1="75" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Ampolla de cristal */}
        <circle cx="50" cy="32" r="20" fill="#fef08a" opacity="0.8" stroke="#eab308" strokeWidth="1.5" />
        {/* Filamento de tungsteno */}
        <path d="M 46 36 L 48 24 L 52 24 L 54 36" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
        {/* Casquillo roscado E27 de aluminio */}
        <rect x="42" y="52" width="16" height="14" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" rx="1" />
        <line x1="42" y1="56" x2="58" y2="56" stroke="#475569" strokeWidth="1.5" />
        <line x1="42" y1="61" x2="58" y2="61" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="50" cy="67" rx="4" ry="2" fill="#1e293b" />
      </svg>
    ),
    operation: 'Convierte energía eléctrica en luz visible mediante la incandescencia producida por el calentamiento a más de 2500°C de un fino filamento de tungsteno encerrado al vacío.',
    terminals: ['Borne Central del Casquillo (Fase)', 'Rosca del Casquillo (Neutro)'],
    applications: ['Iluminación tradicional, lámpara serie para banco de pruebas de taller'],
    formula: 'P = V · I = V² / R',
    caution: 'La resistencia en frío es unas 10 veces menor que en caliente; al encenderse consume un fuerte pico de corriente transitorio.'
  },
  {
    id: 'buzzer',
    name: 'Zumbador / Buzzer Piezoeléctrico',
    designator: 'BZ / SPK',
    category: 'Salidas y Actuadores',
    unit: 'Decibeles (dB) / Frecuencia (Hz)',
    symbolStandard: 'IEC (Semicírculo con dos terminales)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' }}>
        <path d="M 35 15 L 65 15 C 65 35 35 35 35 15 Z" fill="rgba(0,43,73,0.08)" strokeWidth="2.5" />
        <line x1="40" y1="29" x2="40" y2="52" strokeWidth="2.5" />
        <line x1="60" y1="29" x2="60" y2="52" strokeWidth="2.5" />
        {/* Ondas acústicas */}
        <path d="M 72 18 C 76 22 76 28 72 32" stroke="#0284c7" strokeWidth="2" />
        <path d="M 78 14 C 84 20 84 30 78 36" stroke="#0284c7" strokeWidth="2" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Patillas */}
        <line x1="42" y1="52" x2="42" y2="76" stroke="#a0aec0" strokeWidth="2.5" />
        <line x1="58" y1="52" x2="58" y2="70" stroke="#a0aec0" strokeWidth="2.5" />
        {/* Cilindro plástico negro con orificio acústico central */}
        <circle cx="50" cy="34" r="22" fill="#18181b" stroke="#27272a" strokeWidth="2" />
        <circle cx="50" cy="34" r="6" fill="#09090b" />
        <text x="36" y="24" fill="#ef4444" fontSize="10" fontWeight="bold">+</text>
      </svg>
    ),
    operation: 'Transductor electroacústico. Al recibir una señal eléctrica hace vibrar un disco cerámico piezoeléctrico produciendo un sonido o pitido audible.',
    terminals: ['Polo Positivo (+): Patilla más larga', 'Polo Negativo (-)'],
    applications: ['Alarmas de intrusión, confirmación de pulsación en microondas y testers'],
    formula: 'f_resonancia típica = 2.4 kHz a 4 kHz',
    caution: 'Hay buzzers ACTIVOS (suenan con solo darles 5V DC) y PASIVOS (requieren una onda PWM con tono modulado).'
  },
  {
    id: 'motor-dc',
    name: 'Motor de Corriente Continua (Motor DC)',
    designator: 'M',
    category: 'Salidas y Actuadores',
    unit: 'RPM / Torque (N·m)',
    symbolStandard: 'IEC (Círculo con M central y contactos)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2.5, fill: 'none', strokeLinecap: 'round' }}>
        <line x1="5" y1="30" x2="25" y2="30" />
        {/* Escobillas */}
        <rect x="25" y="22" width="5" height="16" fill="#002b49" />
        <rect x="70" y="22" width="5" height="16" fill="#002b49" />
        <circle cx="50" cy="30" r="22" strokeWidth="2.5" fill="rgba(0,43,73,0.05)" />
        <text x="50" y="38" textAnchor="middle" fill="#002b49" fontSize="22" fontWeight="bold" stroke="none">M</text>
        <line x1="75" y1="30" x2="95" y2="30" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Eje metálico frontal */}
        <line x1="72" y1="40" x2="90" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        {/* Cilindro metálico del motor (ej. tipo Mabuchi 130 o 550) */}
        <rect x="25" y="22" width="48" height="36" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
        {/* Ranuras de ventilación / imanes */}
        <rect x="36" y="28" width="10" height="24" rx="2" fill="#475569" />
        {/* Terminales traseros con cable rojo y negro */}
        <line x1="14" y1="28" x2="25" y2="28" stroke="#ef4444" strokeWidth="3" />
        <line x1="14" y1="52" x2="25" y2="52" stroke="#1e293b" strokeWidth="3" />
      </svg>
    ),
    operation: 'Máquina eléctrica que convierte energía eléctrica en movimiento mecánico rotatorio por la interacción entre el campo de imanes permanentes y el bobinado del rotor.',
    terminals: ['Terminal A (+)', 'Terminal B (-): Invertir polaridad invierte el sentido de giro'],
    applications: ['Robots con tracción diferencial, ventiladores, elevalunas del automóvil'],
    formula: 'F = I · (L × B)  (Fuerza de Lorentz) | E = k · ω',
    caution: 'Al desacelerar o girar mecánicamente actúa como generador. Requiere puente H (L298N) con diodos de protección.'
  },
  {
    id: 'op-amp',
    name: 'Amplificador Operacional (Op-Amp)',
    designator: 'U / IC',
    category: 'Circuitos Integrados',
    unit: 'Ganancia en bucle abierto A_ol (> 100.000)',
    symbolStandard: 'IEC / ANSI (Triángulo con entradas + y -)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        {/* Entradas Inversora (-) y No Inversora (+) */}
        <line x1="5" y1="20" x2="30" y2="20" />
        <line x1="5" y1="40" x2="30" y2="40" />
        {/* Triángulo amplificador */}
        <polygon points="30,10 30,50 75,30" fill="rgba(0,43,73,0.05)" stroke="#002b49" strokeWidth="2.5" />
        {/* Salida */}
        <line x1="75" y1="30" x2="95" y2="30" />
        {/* Signos de entradas */}
        <text x="35" y="24" fill="#002b49" fontSize="13" fontWeight="bold" stroke="none">-</text>
        <text x="35" y="44" fill="#002b49" fontSize="13" fontWeight="bold" stroke="none">+</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Encapsulado DIP-8 con 8 patas */}
        <rect x="28" y="16" width="44" height="48" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="2" />
        {/* Muesca y punto pin 1 */}
        <path d="M 44 16 C 44 20 56 20 56 16" fill="#27272a" />
        <circle cx="36" cy="24" r="2.5" fill="#3f3f46" />
        <text x="50" y="44" textAnchor="middle" fill="#e4e4e7" fontSize="8" fontWeight="bold">LM358</text>
        {/* 4 Pines a cada lado */}
        <rect x="18" y="22" width="10" height="4" fill="#cbd5e1" />
        <rect x="18" y="32" width="10" height="4" fill="#cbd5e1" />
        <rect x="18" y="42" width="10" height="4" fill="#cbd5e1" />
        <rect x="18" y="52" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="22" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="32" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="42" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="52" width="10" height="4" fill="#cbd5e1" />
      </svg>
    ),
    operation: 'Bloque analógico versátil de ganancia altísima con entrada diferencial. Con realimentación negativa permite construir amplificadores con ganancia precisa, comparadores, sumadores y filtros activos.',
    terminals: ['Pin 2: Entrada Inversora (-)', 'Pin 3: Entrada No Inversora (+)', 'Pin 6: Salida', 'Alimentación V+ y V-'],
    applications: ['Acondicionamiento de señales de sensores analógicos, filtros de audio, comparadores con histéresis'],
    formula: 'V_out = A · (V_+ - V_-) | No inversor: G = 1 + (R_f / R_in)',
    caution: 'La tensión de salida jamás puede superar los rieles de alimentación suministrados (saturación).'
  },
  {
    id: 'ne555',
    name: 'Temporizador NE555 (Timer IC)',
    designator: 'U / IC',
    category: 'Circuitos Integrados',
    unit: 'Frecuencia (Hz) / Ciclo de trabajo (%)',
    symbolStandard: 'IEC (Bloque esquemático funcional con pines)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
        <rect x="25" y="8" width="50" height="44" rx="3" fill="rgba(0,43,73,0.06)" stroke="#002b49" strokeWidth="2" />
        <text x="50" y="26" textAnchor="middle" fill="#002b49" fontSize="9" fontWeight="bold" stroke="none">NE555</text>
        <text x="50" y="38" textAnchor="middle" fill="#0284c7" fontSize="7" stroke="none">TIMER</text>
        <line x1="5" y1="20" x2="25" y2="20" />
        <line x1="5" y1="40" x2="25" y2="40" />
        <line x1="75" y1="30" x2="95" y2="30" />
        <text x="18" y="18" fill="#002b49" fontSize="6" stroke="none">TRIG</text>
        <text x="82" y="28" fill="#002b49" fontSize="6" stroke="none">OUT</text>
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        <rect x="28" y="16" width="44" height="48" rx="3" fill="#18181b" stroke="#27272a" strokeWidth="2" />
        <path d="M 44 16 C 44 20 56 20 56 16" fill="#27272a" />
        <circle cx="36" cy="24" r="2.5" fill="#3f3f46" />
        <text x="50" y="44" textAnchor="middle" fill="#e4e4e7" fontSize="8" fontWeight="bold">NE555P</text>
        <rect x="18" y="22" width="10" height="4" fill="#cbd5e1" />
        <rect x="18" y="32" width="10" height="4" fill="#cbd5e1" />
        <rect x="18" y="42" width="10" height="4" fill="#cbd5e1" />
        <rect x="18" y="52" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="22" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="32" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="42" width="10" height="4" fill="#cbd5e1" />
        <rect x="72" y="52" width="10" height="4" fill="#cbd5e1" />
      </svg>
    ),
    operation: 'El circuito integrado más popular de la historia. Integra 2 comparadores, un biestable (flip-flop), un transistor de descarga y un divisor resistivo con 3 resistencias de 5kΩ. Funciona como oscilador (astable) o temporizador de un pulso (monoestable).',
    terminals: ['1: GND', '2: Trigger', '3: Output', '4: Reset', '5: Control', '6: Threshold', '7: Discharge', '8: VCC'],
    applications: ['Generadores de reloj para microcontroladores, intermitentes de luces, sirenas sonoras'],
    formula: 'Modo Astable: f = 1.44 / ((R1 + 2·R2) · C)',
    caution: 'En conmutación rápida puede provocar transitorios de consumo en la alimentación; usar siempre un capacitor cerámico de 100nF cerca de los pines 1 y 8.'
  },
  {
    id: 'optocoupler',
    name: 'Optoacoplador (PC817 / 4N35)',
    designator: 'OK / OPTO',
    category: 'Circuitos Integrados',
    unit: 'Aislamiento galvánico (kV)',
    symbolStandard: 'IEC (LED emisor + Fototransistor)',
    symbolSvg: (
      <svg viewBox="0 0 100 60" width="100%" height="100%" style={{ stroke: '#002b49', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' }}>
        {/* Caja de encapsulado */}
        <rect x="22" y="8" width="56" height="44" stroke="#002b49" strokeWidth="1.5" strokeDasharray="3,2" />
        {/* LED emisor izquierda */}
        <line x1="5" y1="20" x2="28" y2="20" />
        <polygon points="28,15 28,25 38,20" fill="#002b49" />
        <line x1="38" y1="15" x2="38" y2="25" strokeWidth="2" />
        <line x1="38" y1="20" x2="5" y2="20" />
        <line x1="28" y1="40" x2="5" y2="40" />
        <line x1="38" y1="20" x2="38" y2="40" />
        {/* Flechas de luz hacia el receptor */}
        <line x1="42" y1="26" x2="52" y2="30" stroke="#0284c7" strokeWidth="1.5" />
        {/* Fototransistor receptor derecha */}
        <line x1="62" y1="18" x2="62" y2="42" strokeWidth="2.5" />
        <line x1="62" y1="22" x2="78" y2="14" />
        <line x1="78" y1="14" x2="95" y2="14" />
        <line x1="62" y1="38" x2="78" y2="46" />
        <line x1="78" y1="46" x2="95" y2="46" />
      </svg>
    ),
    physicalSvg: (
      <svg viewBox="0 0 100 80" width="100%" height="100%">
        {/* Encapsulado DIP-4 blanco o negro */}
        <rect x="32" y="20" width="36" height="40" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="40" cy="28" r="2.5" fill="#64748b" />
        <text x="50" y="44" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">PC817</text>
        <rect x="22" y="26" width="10" height="4" fill="#cbd5e1" />
        <rect x="22" y="46" width="10" height="4" fill="#cbd5e1" />
        <rect x="68" y="26" width="10" height="4" fill="#cbd5e1" />
        <rect x="68" y="46" width="10" height="4" fill="#cbd5e1" />
      </svg>
    ),
    operation: 'Transmite señales eléctricas entre dos circuitos completamente aislados galvánicamente mediante un haz de luz infrarroja interno. Protege los microcontroladores de voltajes peligrosos de la red.',
    terminals: ['Entrada: Ánodo y Cátodo del LED', 'Salida: Colector y Emisor del Fototransistor'],
    applications: ['Módulos de relé para Arduino', 'Fuentes conmutadas (Feedback de regulación)', 'Entradas digitales de PLC industriales'],
    formula: 'CTR = (I_colector / I_led) · 100%  (Current Transfer Ratio)',
    caution: 'Nunca compartir la masa (GND) del lado emisor con la masa del lado receptor si se busca aislamiento galvánico de seguridad.'
  }
];
