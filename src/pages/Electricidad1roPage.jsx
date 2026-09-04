import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Electricidad1roStyles.css';

const WEEKS_DATA = [
  {
    week: 1,
    unit: 'Unidad 1',
    unitName: 'Introducción a la Electricidad, Seguridad y Herramientas',
    title: 'Fundamentos de la Electricidad y Magnitudes Básicas',
    clase1: {
      num: 1,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Estructura Atómica, Carga Eléctrica y Diferencia de Potencial (Voltaje)',
      tempo: { teoria: 50, taller: 190, cierre: 30 },
      teoria: 'El átomo, electrones libres y conductores. Definición física de tensión (Voltio, V) como trabajo por unidad de carga. Demostración del uso seguro del voltímetro.',
      taller: 'Reconocimiento de fuentes de energía de baja tensión (pilas AA/AAA de 1.5V, baterías de 9V y fuentes reguladas). Calibración y escala del multímetro digital en DCV.',
      actividadTP: {
        consignaTeorica: 'Calcular el potencial resultante al conectar 2 y 4 pilas en serie. Diferenciar conductores de aislantes.',
        consignaPractica: 'Medir en banco de taller 5 fuentes de tensión continua, registrar valores en la libreta técnica y calcular el error porcentual respecto al valor nominal.',
        entregable: 'Planilla de relevamiento de tensiones con firma del profesor y verificación de polaridades.'
      }
    },
    clase2: {
      num: 2,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Corriente Eléctrica (Amperaje), Flujo de Electrones y CC vs CA',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Definición de corriente (Amperio, A) como caudal de electrones por segundo. Diferencias esenciales entre Corriente Continua (CC) y Corriente Alterna sinusoidal de red (CA 50Hz, 220V).',
      taller: 'Conexión de un circuito elemental con portapilas y micro-lámpara. Medición de tensión con carga conectada y observación de la caída por resistencia interna.',
      actividadTP: {
        consignaTeorica: 'Esquematizar el sentido convencional (positivo a negativo) vs sentido real de los electrones (negativo a positivo).',
        consignaPractica: 'Armar en banco un circuito testigo con llave basculante y lámpara. Comprobar la continuidad con el zumbador del tester.',
        entregable: 'Circuito funcional probado en banco y esquema normalizado dibujado en la carpeta de taller.'
      }
    },
    simRoute: '/electricidad-basica'
  },
  {
    week: 2,
    unit: 'Unidad 1',
    unitName: 'Introducción a la Electricidad, Seguridad y Herramientas',
    title: 'Normas de Seguridad en el Taller, EPP y Prevención de Riesgos',
    clase1: {
      num: 3,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Efectos de la Corriente en el Cuerpo Humano y Elementos de Protección Personal (EPP)',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Fisiopatología del choque eléctrico: umbral de percepción, tetanización muscular, asfixia y fibrilación ventricular. Uso obligatorio de EPP: calzado dieléctrico, gafas y ropa de algodón.',
      taller: 'Inspección técnica y prueba de aislamiento a 1000V de pinzas universales, alicates de corte y destornilladores. Protocolo de las 5 Reglas de Oro.',
      actividadTP: {
        consignaTeorica: 'Completar tabla de umbrales de corriente peligrosa (de 1 mA a 100 mA) y tiempos críticos de exposición.',
        consignaPractica: 'Verificación de herramientas de pañol: descarte de herramientas con mangos fisurados o aislamiento degradado.',
        entregable: 'Checklist técnico de EPP firmado y banco de trabajo habilitado bajo normas de seguridad.'
      }
    },
    clase2: {
      num: 4,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Dispositivos de Protección (Disyuntor y Fusible) y Extintores Clase C',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Principio del disyuntor diferencial toroidal (sensibilidad de 30 mA en 30 ms). Fusibles y termomagnéticas contra sobrecorrientes. Extintores de CO2 y polvo químico ABC (prohibición estricta de agua con tensión).',
      taller: 'Relevamiento del tablero eléctrico seccional del taller: accionamiento y prueba del botón de test del disyuntor. Simulación de corte de emergencia y medición de ausencia de tensión.',
      actividadTP: {
        consignaTeorica: 'Explicar por qué el agua salada o corriente agrava el riesgo de electrocución e identificar la señalética de extintores.',
        consignaPractica: 'Práctica guiada de desenergización, bloqueo preventivo y prueba con lámpara de prueba / multímetro.',
        entregable: 'Informe de seguridad del puesto de trabajo con plano de evacuación y ubicación del disyuntor.'
      }
    },
    simRoute: '/seguridad-epp'
  },
  {
    week: 3,
    unit: 'Unidad 2',
    unitName: 'Circuitos Eléctricos Básicos y Medición',
    title: 'Ley de Ohm y Elementos del Circuito Eléctrico',
    clase1: {
      num: 5,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Formulación de la Ley de Ohm (V = I · R) y Resistencia Eléctrica',
      tempo: { teoria: 50, taller: 190, cierre: 30 },
      teoria: 'Relación matemática fundamental V = I · R. El triángulo nemotécnico de Ohm. Unidad de resistencia (Ohmio, Ω) y resistividad de los materiales (cobre vs aluminio).',
      taller: 'Montaje en banco de un circuito serie simple (fuente 12V + resistencia de potencia + amperímetro analógico/digital).',
      actividadTP: {
        consignaTeorica: 'Resolver 4 problemas analíticos de cálculo de I conociendo V y R, y de R conociendo V e I.',
        consignaPractica: 'Variar la tensión de la fuente en 3V, 6V, 9V y 12V; medir la corriente resultante y graficar la recta V vs I confirmando la proporcionalidad directa.',
        entregable: 'Gráfico experimental de la Ley de Ohm en hoja milimetrada con los puntos medidos en banco.'
      }
    },
    clase2: {
      num: 6,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Ley de Joule, Disipación de Potencia Calorífica (W) y Fusibles',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Efecto Joule: P = V · I = I² · R. Calor generado en conductores y aparatos eléctricos. Selección de fusibles calibrados (1A / 2A) según la corriente nominal.',
      taller: 'Ensayo de carga con lámparas incandescentes de 12V (5W, 10W, 21W). Medición de corriente consumida y cálculo de potencia real.',
      actividadTP: {
        consignaTeorica: 'Calcular la potencia consumida y el calibre de fusible recomendado para una carga de 18W a 12V.',
        consignaPractica: 'Armar circuito con portafusible aéreo. Provocar una sobrecorriente controlada y observar la fusión instantánea del hilo fusible protegiendo la fuente.',
        entregable: 'Ficha de ensayo de efecto Joule con cálculo de energía calorífica y calibración de fusibles.'
      }
    },
    simRoute: '/ley-ohm'
  },
  {
    week: 4,
    unit: 'Unidad 2',
    unitName: 'Circuitos Eléctricos Básicos y Medición',
    title: 'Leyes de Kirchhoff: Circuitos en Serie y en Paralelo',
    clase1: {
      num: 7,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Circuito Serie y Ley de Tensiones de Kirchhoff (LVK)',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Circuito en Serie: misma corriente para todas las cargas, suma de tensiones parciales igual a la tensión total (V_T = V_1 + V_2). Comportamiento ante circuito abierto.',
      taller: 'Conexionado en protoboard y tablero de 2 portalámparas en serie. Medición con voltímetro de la caída de tensión en cada una y en bornes de la fuente.',
      actividadTP: {
        consignaTeorica: 'Demostrar matemáticamente que la resistencia total equivalente es R_eq = R_1 + R_2.',
        consignaPractica: 'Medir V_1 y V_2 con lámparas de igual y distinta potencia. Desconectar una lámpara y constatar la apertura total del circuito serie.',
        entregable: 'Tabla comparativa de valores teóricos calculados vs valores reales medidos con el multímetro.'
      }
    },
    clase2: {
      num: 8,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Circuito Paralelo y Ley de Corrientes de Kirchhoff (LCK)',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Circuito en Paralelo: misma tensión en todas las ramas, la corriente total se divide (I_T = I_1 + I_2). Por qué las instalaciones domiciliarias son en paralelo.',
      taller: 'Montaje de 3 portalámparas en paralelo conectadas a interruptores independientes. Medición de corrientes en cada rama intercalando el amperímetro.',
      actividadTP: {
        consignaTeorica: 'Aplicar la 1° Ley de Kirchhoff en el nodo principal (∑I_entrantes = ∑I_salientes). Calcular la R_eq en paralelo.',
        consignaPractica: 'Comprobar que al apagar una rama, las restantes continúan funcionando con brillo constante sin alteración.',
        entregable: 'Plano del circuito paralelo con medición de corrientes en cada nodo verificado en banco.'
      }
    },
    simRoute: '/kirchhoff'
  },
  {
    week: 5,
    unit: 'Unidad 3',
    unitName: 'Instalaciones Eléctricas y Empalmes',
    title: 'Conductores Eléctricos, Calibres y Código de Colores IRAM',
    clase1: {
      num: 9,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Estructura de Conductores, Secciones en mm² y Código de Colores IRAM 2183',
      tempo: { teoria: 50, taller: 190, cierre: 30 },
      teoria: 'Conductor multifilamento (cobre recocido IRAM 2183) vs alambre unifilar. Secciones comerciales (1.5mm², 2.5mm², 4mm²). Código de colores: Fase (marrón/negro/rojo), Neutro (celeste), Tierra (verde-amarillo).',
      taller: 'Práctica de medición de diámetros de hilos de cobre con calibre pie de rey y micrómetro para calcular la sección real en mm².',
      actividadTP: {
        consignaTeorica: 'Calcular la sección de un conductor a partir del diámetro medido: S = π · (d/2)².',
        consignaPractica: 'Identificar rollos de cable del pañol por color y calibre, y verificar que cumplan con la norma IRAM.',
        entregable: 'Informe técnico de medición dimensional de conductores con calibre.'
      }
    },
    clase2: {
      num: 10,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Técnicas de Desenvainado, Pelado Seguro y Conexión de Bornes',
      tempo: { teoria: 40, taller: 200, cierre: 30 },
      teoria: 'Procedimiento de pelado sin cortar filamentos de cobre (evitar muescas mecánicas que provocan rotura o sobrecalentamiento). Conexión en sentido horario en bornes bajo tornillo.',
      taller: 'Desenvainado de cable tipo taller (bipolar y tripolar con vaina exterior) y pelado de conductores individuales a 12mm y 35mm con pelacables y alicate.',
      actividadTP: {
        consignaTeorica: 'Explicar el riesgo de un terminal mal ajustado en un borne (punto caliente / efecto arco).',
        consignaPractica: 'Armar una ficha macho 2P+T con prensa-cable ajustado y borne de tierra conectado al cable verde-amarillo más largo.',
        entregable: 'Ficha armada y probada con zumbador de continuidad frente al profesor.'
      }
    },
    simRoute: '/circuitos-domiciliarios'
  },
  {
    week: 6,
    unit: 'Unidad 3',
    unitName: 'Instalaciones Eléctricas y Empalmes',
    title: 'Empalmes Normalizados y Aislamiento Seguro',
    clase1: {
      num: 11,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Empalme Cola de Rata (Rat-Tail) y Aislamiento con Cinta PVC',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Función del empalme cola de rata en cajas de paso y derivación. Técnica de torsión de espirales simétricas y doblado de punta de seguridad para no perforar el aislante. Cinta PVC autoextinguible con 50% de traslape.',
      taller: 'Confección manual de 4 empalmes cola de rata con 2 y 3 conductores de 1.5mm² y 2.5mm² utilizando pinza universal y pinza de punta.',
      actividadTP: {
        consignaTeorica: 'Detallar por qué el empalme cola de rata está prohibido en tendidos aéreos sometidos a tironeo.',
        consignaPractica: 'Pelar 4 cm de cable, retorcer apretando con pinza de fuerza, cortar la punta sobrante, doblar hacia atrás y encintar con 3 capas superpuestas.',
        entregable: 'Muestra de 2 empalmes cola de rata inspeccionados mecánicamente por el docente.'
      }
    },
    clase2: {
      num: 12,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Empalmes Western Union (Prolongación) y Derivación en T',
      tempo: { teoria: 40, taller: 200, cierre: 30 },
      teoria: 'Geometría del Western Union: traba central y espiras en ambos sentidos para máxima tracción. Técnica de la "ventana pelada" sin corte en el conductor principal para la derivación en T.',
      taller: 'Ejecución práctica en banco de un empalme Western Union y una derivación en T sobre cables de 2.5mm².',
      actividadTP: {
        consignaTeorica: 'Dibujar los esquemas constructivos paso a paso de ambos empalmes indicando longitudes de pelado.',
        consignaPractica: 'Prueba de tracción: someter el empalme Western Union a fuerza manual comprobando que no ceda ni deslice.',
        entregable: 'Muestrario técnico de empalmes normalizados montado sobre tabla o cartón rígido con etiquetas.'
      }
    },
    simRoute: '/herramientas-electricidad'
  },
  {
    week: 7,
    unit: 'Unidad 4',
    unitName: 'Electrónica Básica (Componentes)',
    title: 'Introducción a la Electrónica y Componentes Pasivos',
    clase1: {
      num: 13,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Diferencia Electricidad vs Electrónica y Código de Colores de Resistencias',
      tempo: { teoria: 50, taller: 190, cierre: 30 },
      teoria: 'Electricidad como potencia/transmisión de energía vs Electrónica como control y procesamiento de información. Resistencias fijas de carbón y código de 4 bandas (Dígito 1, Dígito 2, Multiplicador, Tolerancia oro/plata).',
      taller: 'Clasificación de resistores comerciales en cajoneras de pañol, lectura de código y medición con multímetro en escala de ohmios (200Ω, 2kΩ, 20kΩ, 200kΩ, 2MΩ).',
      actividadTP: {
        consignaTeorica: 'Calcular el valor nominal y el rango de tolerancia de 6 resistencias según sus bandas de color.',
        consignaPractica: 'Medir las 6 resistencias en el tester y comprobar si se encuentran dentro del rango de tolerancia especificado.',
        entregable: 'Planilla de calibración de resistencias con valor teórico, valor medido y error relativo.'
      }
    },
    clase2: {
      num: 14,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Condensadores (Capacitores), Inductores y Potenciómetros',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Condensadores electrolíticos (polarizados) y cerámicos. Unidades (µF, nF, pF). Almacenamiento de carga en campo electrostático. Potenciómetros lineales y logarítmicos.',
      taller: 'Armado en protoboard de un circuito divisor de tensión con potenciómetro para regular el brillo de una lámpara o velocidad de un mini-motor.',
      actividadTP: {
        consignaTeorica: 'Explicar el riesgo de inversión de polaridad en capacitores electrolíticos (rotura y desprendimiento de gas).',
        consignaPractica: 'Cargar un capacitor de 1000 µF a 9V y observar su curva de descarga lenta alimentando un LED testigo.',
        entregable: 'Circuito temporizador simple de descarga verificado en protoboard.'
      }
    },
    simRoute: '/codigos-resistencias'
  },
  {
    week: 8,
    unit: 'Unidad 4',
    unitName: 'Electrónica Básica (Componentes)',
    title: 'Componentes Activos: Diodos, LEDs y Transistores',
    clase1: {
      num: 15,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Diodos Semiconductores de Silicio (1N4007) y Diodos Emisores de Luz (LED)',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Materiales semiconductores P-N. Polarización directa e inversa. El LED: tensión de umbral (V_led = 1.8V - 3.2V) y polaridad (terminal largo ánodo +, chaflán cátodo -). Cálculo de R_limitadora = (V_fuente - V_led) / I_led.',
      taller: 'Comprobación de diodos y LEDs con la función Diodo del multímetro. Armado en protoboard de indicador luminoso alimentado a 9V.',
      actividadTP: {
        consignaTeorica: 'Calcular la resistencia para un LED verde (2.2V, 15mA) alimentado desde un puerto USB (5V) y desde una batería (9V).',
        consignaPractica: 'Montar ambos circuitos en protoboard, medir la corriente real con el miliamperímetro y verificar que no supere los 20mA.',
        entregable: 'Módulo indicador con LED y resistencia calculada funcionando en protoboard.'
      }
    },
    clase2: {
      num: 16,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Transistores BJT como Conmutadores y Primer Prototipo Ecobot Vibratorio',
      tempo: { teoria: 40, taller: 200, cierre: 30 },
      teoria: 'El transistor NPN (Base, Colector, Emisor) como llave estática activada por corriente. Robótica con reciclables: transformación de energía eléctrica a vibratoria mediante motor DC desbalanceado.',
      taller: 'Inicio de la construcción del primer Ecobot (Vibro-Bicho): armado del chasis con tapitas plásticas y patas elásticas con clips de papel.',
      actividadTP: {
        consignaTeorica: 'Esquematizar el circuito del Ecobot con interruptor basculante, portapila y motor DC.',
        consignaPractica: 'Fijar el micro-motor DC reciclado al chasis plástico, acoplar la masa excéntrica al eje y conectar los terminales.',
        entregable: 'Primer prototipo de Ecobot vibratorio funcionando en pista de pruebas del taller.'
      }
    },
    simRoute: '/componentes-electronica'
  },
  {
    week: 9,
    unit: 'Unidad 4',
    unitName: 'Circuitos Impresos y Soldadura',
    title: 'Placas de Circuito Impreso (PCB) y Placa de Islas (Perfboard)',
    clase1: {
      num: 17,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Sustratos Aislantes, Placas de Islas Perforadas y Disposición de Componentes',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Pertinax (FR2) y Fibra de vidrio (FR4). La placa de islas perforada (paso estándar 2.54 mm) para prototipos permanentes. Comparación con protoboard y PCB industrial grabado al ácido.',
      taller: 'Limpieza mecánica de la superficie de cobre con esponja de lana de acero fina y alcohol isopropílico para eliminar óxidos y grasitud.',
      actividadTP: {
        consignaTeorica: 'Diseñar en papel cuadriculado la distribución física (layout) de 4 componentes en placa de islas.',
        consignaPractica: 'Doblar terminales de resistencias y diodos a 90° usando pinza de punta e insertarlos en la placa sin forzar los pads.',
        entregable: 'Placa de islas con componentes premontados mecánicamente listos para soldar.'
      }
    },
    clase2: {
      num: 18,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Fundamentos de la Soldadura Blanda: El Cautín, Estaño 60/40 y el Flux',
      tempo: { teoria: 45, taller: 195, cierre: 30 },
      teoria: 'Soldador tipo lápiz de 30W-40W. Composición eutéctica Estaño 60% / Plomo 40% (punto de fusión 183°C). El rol de la resina/flux como limpiador y desoxidante químico en el momento de fundir.',
      taller: 'Puesta en marcha del cautín: limpieza en esponja vegetal humedecida y estañado previo de la punta caliente ("tinning"). Primeras pruebas de fundición controlada.',
      actividadTP: {
        consignaTeorica: 'Explicar las consecuencias de soldar con la punta oxidada o negra y por qué no se debe lijar una punta con baño cerámico/hierro.',
        consignaPractica: 'Realizar 5 puntos de aporte de estaño sobre islas vírgenes de prueba cronometrando exactamente 2 a 3 segundos.',
        entregable: 'Punta de cautín perfectamente estañada y primer test de gotas cónicas sobre placa de prueba.'
      }
    },
    simRoute: '/circuitos-impresos'
  },
  {
    week: 10,
    unit: 'Unidad 4',
    unitName: 'Circuitos Impresos y Soldadura',
    title: 'Práctica Intensiva de Soldadura en Placa de Islas y Desoldado',
    clase1: {
      num: 19,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Práctica Intensiva de Soldadura de Componentes en Placa de Islas',
      tempo: { teoria: 35, taller: 205, cierre: 30 },
      teoria: 'La técnica de los 4 pasos: calentar isla + terminal simultáneamente, aportar estaño en lado opuesto, retirar estaño y retirar cautín. Inspección visual: "Volcán brillante" vs soldadura fría vs puente entre islas.',
      taller: 'Soldadura de una matriz de 15 puntos conectando terminales de resistencias, puentes de alambre de cobre estañado y un diodo LED en placa de islas.',
      actividadTP: {
        consignaTeorica: 'Completar tabla de defectos de soldadura indicando causas y soluciones (soldadura fría, sobrecalentamiento, exceso de estaño).',
        consignaPractica: 'Soldar la placa asignada, cortar los excedentes de los terminales a 1 mm con alicate de corte al ras y limpiar con alcohol.',
        entregable: 'Placa de islas con 15 soldaduras evaluadas individualmente con lupa óptica por el docente.'
      }
    },
    clase2: {
      num: 20,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Técnicas de Desoldado con Extractor a Pistón y Malla de Cobre',
      tempo: { teoria: 35, taller: 205, cierre: 30 },
      teoria: 'Manejo del desoldador por succión (bomba a pistón con resorte): calentar la unión hasta licuar el estaño y disparar el gatillo de vacío. Malla de cobre trenzada con flux.',
      taller: 'Desoldado de componentes defectuosos en placa de prueba: extracción de terminales sin romper las islas de cobre y despejado del orificio central.',
      actividadTP: {
        consignaTeorica: 'Explicar cómo recuperar una isla de cobre levantada por exceso de calor y cómo evitar puentes de soldadura.',
        consignaPractica: 'Desoldar 3 resistencias, limpiar los pads y volver a soldar componentes nuevos verificando continuidad con tester.',
        entregable: 'Pieza desoldada limpiamente y reinstalada sin daño físico en el sustrato.'
      }
    },
    simRoute: '/soldadura'
  },
  {
    week: 11,
    unit: 'Proyecto Final',
    unitName: 'Robótica con Materiales Reciclables & Proyecto Integrador',
    title: 'Diseño y Construcción de Ecobots y Dispositivos Sustentables',
    clase1: {
      num: 21,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Mecanizado y Montaje Estructural del Proyecto Sustentable Seleccionado',
      tempo: { teoria: 35, taller: 205, cierre: 30 },
      teoria: 'Selección del proyecto del equipo: 1. Ecobot móvil (rodante/bípedo), 2. Luminaria sustentable de lata y CD, o 3. Mini-ventilador axial PET. Normas de seguridad en el corte y perforado de plásticos y metales reciclados.',
      taller: 'Acopio, trazado y mecanizado de las piezas recicladas (botellas, latas, CDs, tapitas y chasis). Ajuste de ejes, poleas y fijación mecánica.',
      actividadTP: {
        consignaTeorica: 'Elaborar el diagrama de despiece y croquis acotado del prototipo a construir.',
        consignaPractica: 'Mecanizar la estructura, balancear las aspas o ruedas y montar los soportes mecánicos del motor y portapilas.',
        entregable: 'Estructura mecánica armada y lista para la integración eléctrica.'
      }
    },
    clase2: {
      num: 22,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Cableado Eléctrico, Soldadura en Islas e Integración Electromecánica',
      tempo: { teoria: 30, taller: 210, cierre: 30 },
      teoria: 'Integración del circuito eléctrico: conexionado de interruptores miniatura, portapilas, resistencias limitadoras y fusibles de protección en placa de islas o mediante empalmes aislados.',
      taller: 'Soldadura y cableado definitivo del prototipo. Sujeción de conductores con precintos plásticos para evitar tirones sobre los terminales del motor o LED.',
      actividadTP: {
        consignaTeorica: 'Calcular el consumo de corriente total esperado y la autonomía de las baterías en horas de funcionamiento continuo.',
        consignaPractica: 'Soldar el circuito completo, encintar zonas expuestas y realizar la primera prueba de energización en banco.',
        entregable: 'Prototipo eléctrico-mecánico ensamblado y en funcionamiento preliminar.'
      }
    },
    simRoute: '/proyectos-reciclables'
  },
  {
    week: 12,
    unit: 'Proyecto Final',
    unitName: 'Evaluación de Aprendizajes e Integración',
    title: 'Puesta en Marcha de Proyectos y Trabajo Práctico Integrador Teórico',
    clase1: {
      num: 23,
      name: 'Clase 1 (Día 1 — 4.5 hc)',
      topic: 'Calibración, Ensayos de Pista y Feria de Exposición de Ecobots',
      tempo: { teoria: 35, taller: 205, cierre: 30 },
      teoria: 'Criterios de optimización: balance dinámico de masas, reducción de vibraciones parásitas, alineación de ejes y disipación térmica. Defensa técnica del proyecto.',
      taller: 'Pruebas de funcionamiento en pista de rodamiento para robots o medición de flujo lumínico/eólico. Ajuste final de componentes.',
      actividadTP: {
        consignaTeorica: 'Redactar la memoria técnica descriptiva del proyecto justificando el uso de materiales recuperados.',
        consignaPractica: 'Demostración de funcionamiento continuo ante el curso durante 5 minutos midiendo tensión y corriente en bornes.',
        entregable: 'Prototipo final terminado y calificado según rúbrica de funcionamiento, estética y seguridad.'
      }
    },
    clase2: {
      num: 24,
      name: 'Clase 2 (Día 2 — 4.5 hc)',
      topic: 'Resolución del Trabajo Práctico Integrador Teórico y Cierre del Ciclo',
      tempo: { teoria: 90, taller: 150, cierre: 30 },
      teoria: 'Repaso conceptual integrador de las 4 unidades: magnitudes, Ohm, Kirchhoff, normas de seguridad en el taller, código IRAM y técnicas de soldadura.',
      taller: 'Resolución individual en terminales o papel del Trabajo Práctico Integrador Teórico (12 preguntas). Devolución pedagógica docente y orden general de pañol.',
      actividadTP: {
        consignaTeorica: 'Rendir el TP Integrador Teórico interactivo alcanzando un mínimo del 60% para la acreditación técnica.',
        consignaPractica: 'Inspección final de bancos de trabajo, inventario y orden de herramientas del taller.',
        entregable: 'Certificado de Aprobación Oficial de Electricidad 1er Año emitido por la EST UTN San Miguel.'
      }
    },
    simRoute: '/proyectos-integradores'
  }
];

const ECOBOTS_MODELS = [
  {
    id: 'vibrobot',
    title: '1. Ecobot Vibro-Bicho (Vibrobot)',
    icon: '🦗',
    desc: 'Robot de reacción rápida con desplazamiento por vibración armónica mediante masa excéntrica acoplada al eje de un motor DC reciclado.',
    physics: 'Un contrapeso descentrado genera una fuerza centrífuga cíclica en rotación a más de 3000 RPM. Las patas elásticas inclinadas convierten esa oscilación caótica en un vector de avance horizontal neto.',
    materials: ['1 Micro-motor DC (de lectora de CD o cepillo eléctrico)', '2 Tapas plásticas de gaseosa', '1 Pila botón CR2032 o 2 pilas AAA', '3 Clips de papel (patas elásticas)', 'Masa excéntrica (media goma de borrar o pedacito de estaño en el eje)'],
    steps: [
      'Fijá los 3 clips de alambre bajo la tapa de plástico dándoles una ligera inclinación hacia atrás.',
      'Montá el motor DC en la parte superior con silicona caliente, dejando el eje libre.',
      'Colocá la masa excéntrica en el eje asegurándote de que no roce la estructura.',
      'Conectá el circuito simple en serie: Portapilas → Interruptor → Motor DC.',
      '¡Apoyalo sobre una superficie lisa y mirá cómo corretean las patas vibratorias!'
    ]
  },
  {
    id: 'bipedo',
    title: '2. Ecobot Rodante / Bípedo Simple',
    icon: '🤖',
    desc: 'Robot móvil tracción simple con chasis de envase plástico, eje de madera y ruedas de tapitas con bandas de goma para adherencia.',
    physics: 'Conversión directa de energía eléctrica en energía mecánica rotacional. El torque del motor impulsa las ruedas y vence la fricción estática del suelo gracias a las bandas de goma.',
    materials: ['1 Motor DC con reductor o polea', '1 Envase plástico liviano', '4 Tapitas perforadas con precisión', '2 Palitos de brochette de madera (ejes)', 'Bandas elásticas (neumáticos de goma)'],
    steps: [
      'Perforá los laterales del envase alineando los orificios para pasar los palitos de brochette.',
      'Fijá las tapitas en los extremos con silicona, agregando bandas elásticas alrededor.',
      'Acoplá el motor con una gomita elástica hacia el eje trasero a modo de polea reductora.',
      'Instalá el portapilas de 3V o 4.5V en el centro de gravedad del chasis para no desbalancear.',
      'Encendé el interruptor y verificá el sentido de avance en línea recta.'
    ]
  },
  {
    id: 'velador',
    title: '3. Luminaria / Velador Sustentable',
    icon: '💡',
    desc: 'Sistema de iluminación de estudio construido a partir de latas metálicas de conserva, CD en desuso como reflector parabólico y LED de alto rendimiento.',
    physics: 'Efecto fotoeléctrico inverso en el LED con semiconductores de arseniuro de galio. La resistencia limitadora de 220 Ω previene la avalancha térmica limitando la corriente a 15-20 mA desde un puerto USB de 5V.',
    materials: ['1 Lata de conserva limpia y pulida', '1 CD o DVD viejo para reflector', '1 LED blanco de alta luminosidad (3.2V, 20mA)', '1 Resistencia de 220 Ω (1/4 W)', '1 Cable USB reciclado pelado (hilos rojo +5V y negro GND)'],
    steps: [
      'Perforá el centro del CD y la base de la lata para el pasaje de conductores.',
      'Soldá la resistencia de 220 Ω al ánodo (pata larga) del LED y aislá con termocontraíble o cinta.',
      'Uní el terminal libre de la resistencia al cable rojo (+5V USB) y el cátodo al cable negro (GND).',
      'Montá el conjunto en el interior de la lata usando el CD como reflector que concentre el haz.',
      'Conectá a un cargador de celular reciclado y tené tu lámpara de lectura ecológica.'
    ]
  },
  {
    id: 'ventilador',
    title: '4. Mini Ventilador Axial de Escritorio',
    icon: '🌀',
    desc: 'Turbina de flujo axial para recirculación de aire, construida con motor DC reciclado y hélice moldeada a partir de plástico recuperado de botellas PET.',
    physics: 'Principio de Bernoulli y sustentación hidrodinámica: el perfil alar inclinado de las aspas genera una caída de presión por delante de la hélice, traccionando una columna de aire hacia el usuario.',
    materials: ['1 Motor DC rápido (de impresora o auto a radiocontrol)', '1 Fondo o cuerpo de botella PET cortado en 4 aspas', 'Tubo de cartón o botella de desodorante para columna', 'Cable USB y ficha o portapilas de 2 pilas AA'],
    steps: [
      'Recortá las 4 aspas en plástico PET con un ángulo de ataque constante de aprox. 30 grados.',
      'Fijá la hélice al eje del motor garantizando un centrado perfecto para evitar vibraciones destructivas.',
      'Montá el motor dentro del soporte cilíndrico de cartón o plástico reciclado.',
      'Conectá los terminales del motor al cable de alimentación, verificando que el sentido de giro impulse aire hacia adelante (si expulsa hacia atrás, invertí los dos cables).',
      '¡Disfrutá de una brisa fresca en tu banco de taller!'
    ]
  }
];

const SPLICES_DATA = [
  {
    id: 'cola_rata',
    title: 'Empalme Cola de Rata (Rat-Tail Splice)',
    icon: '🐀',
    use: 'Unión definitiva dentro de cajas de paso, derivación y bocas de techo donde los conductores NO están sometidos a esfuerzos de tracción mecánica.',
    method: '1. Pelar 3 a 5 cm de aislamiento en ambos conductores sin mellar el cobre.\n2. Colocar los dos conductores en forma de V con un ángulo de 60°.\n3. Retorcer los filamentos en espiral apretada hacia el extremo usando pinza universal y pinza de punta.\n4. Doblar suavemente la punta retorcida hacia atrás para evitar que perfore la cinta aislante.\n5. Cubrir con cinta aislante PVC con un traslape del 50%, extendiéndose 2 cm más allá del cobre.',
    advantages: 'Fácil ejecución, muy seguro dentro de cañerías y cajas octogonales/rectangulares.',
    disadvantages: 'Baja resistencia a la tracción; se desarma si los cables son tironeados.'
  },
  {
    id: 'derivacion_t',
    title: 'Empalme en T o Derivación Simple',
    icon: '┳',
    use: 'Tomar una línea secundaria o bajada de circuito desde un conductor principal continuo sin necesidad de seccionar la línea principal.',
    method: '1. Desnudar 3 cm de la línea principal en el punto deseado sin cortar ningún filamento.\n2. Pelar 5 cm del extremo del conductor derivado.\n3. Colocar el cable derivado perpendicular (90°) sobre el conductor principal.\n4. Arrollar los filamentos del cable derivado con vueltas juntas y firmes alrededor del cable principal hacia un lado.\n5. Ajustar con pinza universal y encintar completamente en forma de cruz.',
    advantages: 'Mantiene la continuidad eléctrica y mecánica del conductor principal.',
    disadvantages: 'Requiere destreza para pelar la ventana intermedia del cable principal sin dañarlo.'
  },
  {
    id: 'western_union',
    title: 'Empalme Western Union (De Prolongación)',
    icon: '🔗',
    use: 'Prolongación lineal de conductores donde existe esfuerzo mecánico o tracción (tendidos aéreos, canalizaciones largas). Desarrollado originariamente para líneas telegráficas.',
    method: '1. Pelar entre 6 y 8 cm de cada conductor.\n2. Cruzar los extremos pelados a la mitad formando una X a 90°.\n3. Realizar una vuelta completa entre ambos cables para trabar el nudo mecánico central.\n4. Arrollar firmemente el extremo de cada conductor sobre el tramo recto del otro conductor en espiras apretadas y contiguas (mínimo 4 a 5 vueltas).\n5. Cortar el sobrante y apretar con pinza universal antes de aplicar el encintado aislante.',
    advantages: 'Máxima resistencia mecánica a la tracción; la tensión aprieta aún más el contacto eléctrico.',
    disadvantages: 'Mayor tiempo de confección y longitud de cable desprovista de aislación original.'
  }
];

const TP_QUESTIONS = [
  {
    id: 1,
    question: '1. ¿Cuál es la unidad de medida de la diferencia de potencial (tensión eléctrica) en el Sistema Internacional?',
    options: ['Amperio (A)', 'Voltio (V)', 'Ohmio (Ω)', 'Watt (W)'],
    correct: 1,
    explanation: 'El Voltio (V) mide la diferencia de potencial o tensión eléctrica que impulsa a los electrones a través de un conductor.'
  },
  {
    id: 2,
    question: '2. Si aplicamos una tensión de 12 V a un circuito con una resistencia de 4 Ω, ¿cuál será la corriente que circula según la Ley de Ohm?',
    options: ['0.33 A', '3 A', '48 A', '16 A'],
    correct: 1,
    explanation: 'Por la Ley de Ohm: I = V / R. Entonces: I = 12 V / 4 Ω = 3 A.'
  },
  {
    id: 3,
    question: '3. Según la 1° Ley de Kirchhoff (Ley de Corrientes en un nodo), si entran 5 A a un nodo y por una rama salen 2 A, ¿cuánta corriente sale por la otra rama?',
    options: ['7 A', '10 A', '3 A', '2.5 A'],
    correct: 2,
    explanation: 'La suma de las corrientes entrantes a un nodo es igual a la suma de las salientes (∑I_in = ∑I_out). 5 A = 2 A + I_2 ➔ I_2 = 3 A.'
  },
  {
    id: 4,
    question: '4. Según la Norma IRAM 2183 para instalaciones eléctricas en Argentina, ¿de qué color debe ser el conductor de Neutro?',
    options: ['Castaño o marrón', 'Celeste claro', 'Bicolor verde y amarillo', 'Negro'],
    correct: 1,
    explanation: 'En Argentina (Normas IRAM y AEA), el Neutro es estrictamente celeste claro, la Fase es marrón/negro/rojo, y la Tierra es verde-amarillo.'
  },
  {
    id: 5,
    question: '5. ¿Qué dispositivo de protección es mandatorio para salvar vidas humanas contra electrocución por fugas a tierra de 30 mA?',
    options: ['Fusible de alambre de plomo', 'Interruptor Termomagnético', 'Disyuntor Diferencial', 'Llave termomagnética trifásica'],
    correct: 2,
    explanation: 'El interruptor o disyuntor diferencial detecta la diferencia entre la corriente de fase y la de neutro producida por una derivación o contacto accidental con una persona y corta en milisegundos.'
  },
  {
    id: 6,
    question: '6. Ante un principio de incendio en un tablero eléctrico con presencia de tensión viva, ¿qué extintor está TOTALMENTE PROHIBIDO usar?',
    options: ['Extintor de CO2 (Dióxido de carbono)', 'Extintor de polvo químico seco Clase C', 'Extintor de agua presurizada o espuma hídrica', 'Manta ignífuga seca'],
    correct: 2,
    explanation: 'El agua conduce la corriente eléctrica, por lo que arrojar agua sobre equipos con tensión provoca electrocución letal inmediata al operador.'
  },
  {
    id: 7,
    question: '7. ¿Cuál es el empalme normalizado indicado para unir conductores dentro de una caja de paso donde no habrá tracción mecánica?',
    options: ['Empalme Western Union', 'Empalme Cola de Rata (Rat-Tail)', 'Empalme en T de tracción', 'Empalme de puente rígido'],
    correct: 1,
    explanation: 'El empalme Cola de Rata es el ideal y reglamentario para cajas octogonales y rectangulares ya que se aloja cómodamente sin sufrir tironeos.'
  },
  {
    id: 8,
    question: '8. ¿Cuál de los siguientes es un componente electrónico ACTIVO capaz de amplificar o conmutar señales?',
    options: ['Resistencia de carbón', 'Condensador cerámico', 'Transistor bipolar (BJT)', 'Inductor toroidal'],
    correct: 2,
    explanation: 'Los componentes activos (transistores, diodos, circuitos integrados) controlan el flujo de electrones mediante señales de control, a diferencia de los pasivos (R, L, C).'
  },
  {
    id: 9,
    question: '9. Una lámpara incandescente de taller conectada a 220 V consume una corriente de 0.5 A. ¿Cuál es su potencia eléctrica disipada?',
    options: ['110 W', '440 W', '220 W', '55 W'],
    correct: 0,
    explanation: 'La potencia eléctrica se calcula como P = V · I. Por ende: P = 220 V · 0.5 A = 110 W.'
  },
  {
    id: 10,
    question: '10. Para encender un LED rojo (tensión de trabajo 2 V, corriente 20 mA = 0.02 A) con una fuente de 9 V, ¿qué resistencia limitadora se requiere?',
    options: ['100 Ω', '350 Ω', '1000 Ω', '45 Ω'],
    correct: 1,
    explanation: 'La caída en la resistencia debe ser V_R = 9 V - 2 V = 7 V. Luego R = 7 V / 0.02 A = 350 Ω (valor comercial más cercano: 330 Ω o 390 Ω).'
  },
  {
    id: 11,
    question: '11. ¿Cuál es la composición clásica del hilo de estaño para soldadura electrónica blanda de taller y qué función tiene el flux?',
    options: [
      '100% Plomo puro para mayor resistencia mecánica',
      'Aleación 60% Estaño y 40% Plomo, con alma de resina/flux que limpia y desoxida el cobre durante el calentamiento',
      'Cobre 90% y Zinc 10% para alta temperatura',
      'Aluminio con fundente ácido'
    ],
    correct: 1,
    explanation: 'El estaño Sn60/Pb40 funde a 183-190 °C, y el flux limpia la oxidación superficial del cobre facilitando la adherencia molecular ("mojado").'
  },
  {
    id: 12,
    question: '12. En los proyectos de Robótica con Reciclables (Ecobots), ¿cómo se genera el movimiento vibratorio de avance?',
    options: [
      'Instalando imanes que repelen la superficie',
      'Acoplando una masa excéntrica (desbalanceada) en el eje del motor DC que gira a miles de RPM',
      'Conectando corriente alterna de 50 Hz directamente a las patas',
      'Cambiando la polaridad de la batería constantemente'
    ],
    correct: 1,
    explanation: 'La masa excéntrica genera fuerza centrífuga cíclica fuera del centro de rotación, provocando el temblor que las patas convierten en avance.'
  }
];

const Electricidad1roPage = () => {
  const [activeTab, setActiveTab] = useState('cronograma');
  const [selectedWeekNum, setSelectedWeekNum] = useState(1);
  const [classFilter, setClassFilter] = useState('all'); // 'all', 'c1', 'c2'

  // Estados Práctica Ecobots
  const [selectedEcobot, setSelectedEcobot] = useState(ECOBOTS_MODELS[0]);
  const [ecobotRunning, setEcobotRunning] = useState(false);
  const [botSpeed, setBotSpeed] = useState(70);

  // Estados Práctica Empalmes y Circuitos
  const [selectedSplice, setSelectedSplice] = useState(SPLICES_DATA[0]);
  const [circuitSwitch, setCircuitSwitch] = useState(false);
  const [circuitFuseBlown, setCircuitFuseBlown] = useState(false);
  const [circuitLoadResistance, setCircuitLoadResistance] = useState(24); // ohms
  const circuitVoltage = 12; // V
  const circuitCurrent = circuitSwitch && !circuitFuseBlown ? (circuitVoltage / circuitLoadResistance) : 0;
  const circuitPower = circuitVoltage * circuitCurrent;

  // Estados Práctica Soldadura en Placa de Islas
  const [solderTime, setSolderTime] = useState(0);
  const [isHeating, setIsHeating] = useState(false);
  const [solderResult, setSolderResult] = useState(null);
  const [bridgeRisk, setBridgeRisk] = useState(false);

  // Estados TP Integrador Teórico
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [studentName, setStudentName] = useState('');

  const currentWeek = WEEKS_DATA.find(w => w.week === selectedWeekNum) || WEEKS_DATA[0];

  const handleStartHeating = () => {
    setIsHeating(true);
    setSolderResult(null);
  };

  const handleStopHeating = () => {
    setIsHeating(false);
    if (bridgeRisk) {
      setSolderResult('puente');
    } else if (solderTime < 1.8) {
      setSolderResult('fria');
    } else if (solderTime <= 3.8) {
      setSolderResult('perfecta');
    } else {
      setSolderResult('sobrecalentada');
    }
  };

  const handleCleanSolder = () => {
    setSolderTime(0);
    setSolderResult(null);
    setBridgeRisk(false);
  };

  const calculateScore = () => {
    let correctCount = 0;
    TP_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correct) correctCount++;
    });
    return {
      correctCount,
      total: TP_QUESTIONS.length,
      percentage: Math.round((correctCount / TP_QUESTIONS.length) * 100),
      grade: ((correctCount / TP_QUESTIONS.length) * 10).toFixed(1)
    };
  };

  const scoreData = calculateScore();

  return (
    <div className="elec-page">
      {/* Institutional Hero Banner */}
      <div className="elec-hero">
        <div className="elec-header-top">
          <div className="elec-badge-group">
            <span className="elec-tag elec-tag-utn">🏛️ EST UTN San Miguel</span>
            <span className="elec-tag elec-tag-year">⚡ 1er Año — Taller Troncal</span>
            <span className="elec-tag elec-tag-prof">👨‍🏫 Prof. Ariel Bulacio</span>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Ciclo Lectivo: <strong>2026</strong></span>
            <span style={{ fontSize: '0.85rem', background: 'rgba(0,242,255,0.2)', padding: '2px 8px', borderRadius: '6px', color: '#00f2ff', fontWeight: 'bold' }}>9hc Semanales · 2 Clases</span>
          </div>
        </div>

        <h1 className="elec-title">Taller de Electricidad y Electrónica General Básica</h1>
        <p className="elec-subtitle">
          Planificación pedagógica completa de <strong>12 Semanas con 2 Clases Semanales (24 clases en total)</strong>. 
          Cada clase cuenta con su <strong>actividad teórico-práctica</strong> específica y un <strong>tempo prioritario de taller en banco (más de 190 min)</strong>, 
          articulando las prácticas clave: <strong>Ecobots reciclables</strong>, <strong>Empalmes</strong>, 
          <strong>Soldadura en placa de islas</strong> y el <strong>TP Integrador Teórico</strong>.
        </p>

        <div className="elec-info-grid">
          <div className="elec-info-item">
            <span className="elec-info-label">Espacio Curricular</span>
            <span className="elec-info-val">Electricidad 1°</span>
          </div>
          <div className="elec-info-item">
            <span className="elec-info-label">Régimen Semanal</span>
            <span className="elec-info-val">2 Clases de 4.5 hc</span>
          </div>
          <div className="elec-info-item">
            <span className="elec-info-label">Tempo en Banco</span>
            <span className="elec-info-val">75% Práctica Hands-On</span>
          </div>
          <div className="elec-info-item">
            <span className="elec-info-label">Evaluación Final</span>
            <span className="elec-info-val">TP Integrador + Prototipo</span>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="elec-tabs-nav">
        <button
          className={`elec-tab-btn ${activeTab === 'cronograma' ? 'active' : ''}`}
          onClick={() => setActiveTab('cronograma')}
        >
          📅 Cronograma y 24 Clases
        </button>
        <button
          className={`elec-tab-btn ${activeTab === 'ecobots' ? 'active' : ''}`}
          onClick={() => setActiveTab('ecobots')}
        >
          🤖 Práctica 1: Ecobots Reciclables
        </button>
        <button
          className={`elec-tab-btn ${activeTab === 'empalmes' ? 'active' : ''}`}
          onClick={() => setActiveTab('empalmes')}
        >
          🔌 Práctica 2: Empalmes y Circuitos
        </button>
        <button
          className={`elec-tab-btn ${activeTab === 'soldadura' ? 'active' : ''}`}
          onClick={() => setActiveTab('soldadura')}
        >
          🧪 Práctica 3: Soldadura en Islas
        </button>
        <button
          className={`elec-tab-btn ${activeTab === 'tp' ? 'active' : ''}`}
          onClick={() => setActiveTab('tp')}
        >
          📝 Práctica 4: TP Integrador Teórico
        </button>
        <button
          className={`elec-tab-btn ${activeTab === 'institucional' ? 'active' : ''}`}
          onClick={() => setActiveTab('institucional')}
        >
          🏫 Programa Institucional
        </button>
      </div>

      {/* ────────────────── TAB 1: CRONOGRAMA 12 SEMANAS & 2 CLASES SEMANALES ────────────────── */}
      {activeTab === 'cronograma' && (
        <div>
          {/* Week Selector Chips */}
          <div className="elec-weeks-strip">
            {WEEKS_DATA.map(w => (
              <div
                key={w.week}
                className={`elec-week-chip ${selectedWeekNum === w.week ? 'active' : ''}`}
                onClick={() => setSelectedWeekNum(w.week)}
              >
                <div className="elec-chip-num">Semana {w.week}</div>
                <div className="elec-chip-name">{w.unit}</div>
              </div>
            ))}
          </div>

          <div className="elec-week-card">
            <div className="elec-week-card-header">
              <div>
                <span className="elec-unit-pill">{currentWeek.unit} — {currentWeek.unitName}</span>
                <h2 style={{ fontSize: '1.6rem', margin: '0.6rem 0 0.2rem 0', color: '#ffffff' }}>
                  Semana {currentWeek.week}: {currentWeek.title}
                </h2>
                <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  Carga horaria: <strong>9 horas cátedra semanales</strong> (distribuidas en 2 clases de 4.5 hc con actividad teórico-práctica cada una).
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', padding: '4px', borderRadius: '10px', display: 'flex', gap: '4px' }}>
                  <button
                    className="elec-btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: classFilter === 'all' ? 'var(--primary-color)' : 'transparent', color: classFilter === 'all' ? '#000' : '#fff' }}
                    onClick={() => setClassFilter('all')}
                  >
                    Ambas Clases
                  </button>
                  <button
                    className="elec-btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: classFilter === 'c1' ? 'var(--primary-color)' : 'transparent', color: classFilter === 'c1' ? '#000' : '#fff' }}
                    onClick={() => setClassFilter('c1')}
                  >
                    Clase 1
                  </button>
                  <button
                    className="elec-btn-secondary"
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: classFilter === 'c2' ? 'var(--primary-color)' : 'transparent', color: classFilter === 'c2' ? '#000' : '#fff' }}
                    onClick={() => setClassFilter('c2')}
                  >
                    Clase 2
                  </button>
                </div>

                {currentWeek.simRoute && (
                  <Link to={currentWeek.simRoute} className="elec-btn-action" style={{ textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    🧪 Simulador ↗
                  </Link>
                )}
              </div>
            </div>

            {/* Tempo Pedagógico Global del Taller */}
            <div className="elec-tempo-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>🟡 Fase Inicial & Demostración (45-50 min)</span>
                <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>🔵 Tempo Central en Banco de Taller Hands-On (190-205 min)</span>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>🟢 Cierre, Seguridad y Pañol (25-30 min)</span>
              </div>
              <div className="elec-tempo-bar">
                <div className="elec-tempo-segment" style={{ width: '18%', background: '#f59e0b' }} title="Teoría y demostración"></div>
                <div className="elec-tempo-segment" style={{ width: '72%', background: 'linear-gradient(90deg, #0284c7, #00f2ff)' }} title="Práctica intensiva en banco"></div>
                <div className="elec-tempo-segment" style={{ width: '10%', background: '#10b981' }} title="Orden y seguridad"></div>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
                * El 72% de la clase se consagra a la práctica real con herramientas, instrumentos, empalmes, soldadura o prototipado en banco.
              </div>
            </div>

            {/* Desglose de Clases Semanales */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* CLASE 1 */}
              {(classFilter === 'all' || classFilter === 'c1') && (
                <div className="elec-class-card">
                  <div className="elec-class-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span className="elec-class-badge">🏛️ {currentWeek.clase1.name}</span>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff' }}>
                        {currentWeek.clase1.topic}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      ⏱️ Demo: <strong>{currentWeek.clase1.tempo.teoria}m</strong> | 
                      🛠️ Taller: <strong style={{ color: 'var(--primary-color)' }}>{currentWeek.clase1.tempo.taller}m</strong> | 
                      🧹 Cierre: <strong>{currentWeek.clase1.tempo.cierre}m</strong>
                    </div>
                  </div>

                  <div className="elec-grid-2">
                    <div>
                      <h4 style={{ color: '#f59e0b', fontSize: '0.95rem', margin: '0 0 0.4rem 0' }}>📖 Eje Teórico & Demostración Docente</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                        {currentWeek.clase1.teoria}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--primary-color)', fontSize: '0.95rem', margin: '0 0 0.4rem 0' }}>🔨 Práctica Hands-On en Banco de Taller</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                        {currentWeek.clase1.taller}
                      </p>
                    </div>
                  </div>

                  {/* Actividad Teórico-Práctica Específica */}
                  <div className="elec-activity-box">
                    <h5>📝 Actividad Teórico-Práctica de la Clase {currentWeek.clase1.num}</h5>
                    <div className="elec-activity-item">
                      <strong>Consigna Teórica:</strong> {currentWeek.clase1.actividadTP.consignaTeorica}
                    </div>
                    <div className="elec-activity-item">
                      <strong>Consigna Práctica de Taller:</strong> {currentWeek.clase1.actividadTP.consignaPractica}
                    </div>
                    <div className="elec-activity-item" style={{ marginBottom: 0 }}>
                      <strong style={{ color: '#10b981' }}>Entregable y Evaluación:</strong> {currentWeek.clase1.actividadTP.entregable}
                    </div>
                  </div>
                </div>
              )}

              {/* CLASE 2 */}
              {(classFilter === 'all' || classFilter === 'c2') && (
                <div className="elec-class-card">
                  <div className="elec-class-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <span className="elec-class-badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', borderColor: 'rgba(245,158,11,0.4)' }}>
                        🛠️ {currentWeek.clase2.name}
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff' }}>
                        {currentWeek.clase2.topic}
                      </h3>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                      ⏱️ Demo: <strong>{currentWeek.clase2.tempo.teoria}m</strong> | 
                      🛠️ Taller: <strong style={{ color: '#f59e0b' }}>{currentWeek.clase2.tempo.taller}m</strong> | 
                      🧹 Cierre: <strong>{currentWeek.clase2.tempo.cierre}m</strong>
                    </div>
                  </div>

                  <div className="elec-grid-2">
                    <div>
                      <h4 style={{ color: '#f59e0b', fontSize: '0.95rem', margin: '0 0 0.4rem 0' }}>📖 Eje Teórico & Demostración Docente</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                        {currentWeek.clase2.teoria}
                      </p>
                    </div>

                    <div>
                      <h4 style={{ color: 'var(--primary-color)', fontSize: '0.95rem', margin: '0 0 0.4rem 0' }}>🔨 Práctica Hands-On en Banco de Taller</h4>
                      <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                        {currentWeek.clase2.taller}
                      </p>
                    </div>
                  </div>

                  {/* Actividad Teórico-Práctica Específica */}
                  <div className="elec-activity-box" style={{ borderColor: 'rgba(245,158,11,0.3)', background: 'linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(15,23,42,0.4) 100%)' }}>
                    <h5 style={{ color: '#f59e0b' }}>📝 Actividad Teórico-Práctica de la Clase {currentWeek.clase2.num}</h5>
                    <div className="elec-activity-item">
                      <strong>Consigna Teórica:</strong> {currentWeek.clase2.actividadTP.consignaTeorica}
                    </div>
                    <div className="elec-activity-item">
                      <strong>Consigna Práctica de Taller:</strong> {currentWeek.clase2.actividadTP.consignaPractica}
                    </div>
                    <div className="elec-activity-item" style={{ marginBottom: 0 }}>
                      <strong style={{ color: '#10b981' }}>Entregable y Evaluación:</strong> {currentWeek.clase2.actividadTP.entregable}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accesos directos a prácticas integradas */}
            <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                📌 Prácticas interactivas recomendadas para esta semana:
              </span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentWeek.week <= 4 && (
                  <button className="elec-btn-secondary" onClick={() => setActiveTab('empalmes')}>
                    Simulador de Empalmes y Circuitos
                  </button>
                )}
                {currentWeek.week >= 5 && currentWeek.week <= 6 && (
                  <button className="elec-btn-secondary" onClick={() => setActiveTab('empalmes')}>
                    Taller de Empalmes IRAM
                  </button>
                )}
                {currentWeek.week >= 7 && currentWeek.week <= 10 && (
                  <button className="elec-btn-secondary" onClick={() => setActiveTab('soldadura')}>
                    Taller de Soldadura en Placa de Islas
                  </button>
                )}
                {currentWeek.week >= 11 && (
                  <>
                    <button className="elec-btn-secondary" onClick={() => setActiveTab('ecobots')}>
                      Laboratorio Ecobots
                    </button>
                    <button className="elec-btn-action" onClick={() => setActiveTab('tp')}>
                      Rendir TP Integrador Teórico
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── TAB 2: ECOBOTS & ROBÓTICA RECICLABLE ────────────────── */}
      {activeTab === 'ecobots' && (
        <div className="elec-practice-container">
          <h2 className="elec-practice-title">
            <span>🤖</span> Práctica Especial: Ecobots y Robótica con Materiales Reciclables
          </h2>
          <p className="elec-practice-desc">
            Desarrollo de dispositivos electromecánicos educativos con conciencia ecológica. 
            Aprenderás la conversión de energía eléctrica en cinética mediante motores DC reciclados, tapitas, 
            envases plásticos y componentes de descarte.
          </p>

          <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
            {ECOBOTS_MODELS.map(m => (
              <button
                key={m.id}
                className={`elec-btn-secondary ${selectedEcobot.id === m.id ? 'active' : ''}`}
                style={{
                  background: selectedEcobot.id === m.id ? 'rgba(0,242,255,0.2)' : 'rgba(255,255,255,0.05)',
                  borderColor: selectedEcobot.id === m.id ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                  color: selectedEcobot.id === m.id ? '#ffffff' : 'var(--text-dim)',
                  fontWeight: selectedEcobot.id === m.id ? '700' : '500'
                }}
                onClick={() => {
                  setSelectedEcobot(m);
                  setEcobotRunning(false);
                }}
              >
                {m.icon} {m.title}
              </button>
            ))}
          </div>

          <div className="elec-workbench">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>
                {selectedEcobot.icon} {selectedEcobot.title} — Banco de Pruebas Virtual
              </h3>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Estado: <strong style={{ color: ecobotRunning ? '#10b981' : '#ef4444' }}>{ecobotRunning ? 'EN MARCHA' : 'DETENIDO'}</strong>
                </span>
                <button
                  className="elec-btn-action"
                  onClick={() => setEcobotRunning(!ecobotRunning)}
                  style={{ background: ecobotRunning ? '#ef4444' : 'linear-gradient(135deg, #0284c7, #00f2ff)' }}
                >
                  {ecobotRunning ? '⏹ Desconectar' : '▶ Conectar Circuito'}
                </button>
              </div>
            </div>

            {/* SVG Visualizer of the active Ecobot */}
            <div style={{ background: '#030712', borderRadius: '14px', padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '260px' }}>
              {selectedEcobot.id === 'vibrobot' && (
                <div className={ecobotRunning ? 'bot-vibrating' : ''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="220" height="180" viewBox="0 0 220 180">
                    <path d="M60 120 L30 170" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                    <path d="M160 120 L190 170" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                    <path d="M110 125 L110 175" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
                    
                    <ellipse cx="110" cy="115" rx="75" ry="30" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
                    <ellipse cx="110" cy="110" rx="65" ry="22" fill="#0369a1" />
                    
                    <rect x="85" y="45" width="50" height="50" rx="6" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
                    <rect x="95" y="30" width="30" height="15" fill="#475569" />
                    
                    <line x1="110" y1="30" x2="110" y2="10" stroke="#e2e8f0" strokeWidth="4" />
                    <g className={ecobotRunning ? 'spin-fan' : ''} style={{ transformOrigin: '110px 10px' }}>
                      <circle cx="125" cy="10" r="10" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                    </g>
                    
                    <circle cx="150" cy="105" r="14" fill="#d1d5db" stroke="#9ca3af" />
                    <path d="M135 70 Q 150 85 150 95" stroke="red" strokeWidth="3" fill="none" className={ecobotRunning ? 'wire-active' : ''} />
                    <path d="M85 70 Q 75 105 110 115" stroke="black" strokeWidth="3" fill="none" />
                  </svg>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {ecobotRunning ? '⚡ Rotación excéntrica a 3200 RPM activada' : 'Circuito abierto — esperando encendido'}
                  </span>
                </div>
              )}

              {selectedEcobot.id === 'bipedo' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="260" height="180" viewBox="0 0 260 180">
                    <rect x="50" y="55" width="160" height="65" rx="14" fill="rgba(6, 182, 212, 0.4)" stroke="#06b6d4" strokeWidth="3" />
                    <line x1="30" y1="125" x2="230" y2="125" stroke="#e2e8f0" strokeWidth="6" />
                    
                    <g className={ecobotRunning ? 'spin-fan' : ''} style={{ transformOrigin: '40px 125px' }}>
                      <circle cx="40" cy="125" r="32" fill="#ef4444" stroke="#991b1b" strokeWidth="4" />
                      <line x1="15" y1="125" x2="65" y2="125" stroke="#ffffff" strokeWidth="3" />
                      <line x1="40" y1="100" x2="40" y2="150" stroke="#ffffff" strokeWidth="3" />
                    </g>
                    
                    <g className={ecobotRunning ? 'spin-fan' : ''} style={{ transformOrigin: '220px 125px' }}>
                      <circle cx="220" cy="125" r="32" fill="#ef4444" stroke="#991b1b" strokeWidth="4" />
                      <line x1="195" y1="125" x2="245" y2="125" stroke="#ffffff" strokeWidth="3" />
                      <line x1="220" y1="100" x2="220" y2="150" stroke="#ffffff" strokeWidth="3" />
                    </g>
                    
                    <rect x="100" y="70" width="60" height="35" rx="4" fill="#334155" stroke="#94a3b8" />
                    <rect x="65" y="70" width="25" height="35" rx="3" fill="#10b981" />
                    <ellipse cx="130" cy="105" rx="18" ry="22" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray={ecobotRunning ? '4 2' : 'none'} />
                  </svg>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {ecobotRunning ? '🚗 Tracción activa — avance cinemático directo' : 'Motor apagado'}
                  </span>
                </div>
              )}

              {selectedEcobot.id === 'velador' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="240" height="200" viewBox="0 0 240 200">
                    <rect x="80" y="90" width="80" height="90" rx="6" fill="url(#metalGrad)" stroke="#94a3b8" strokeWidth="2" />
                    <ellipse cx="120" cy="85" rx="65" ry="18" fill="#e2e8f0" stroke="#38bdf8" strokeWidth="2" />
                    <ellipse cx="120" cy="85" rx="20" ry="6" fill="#0f172a" />
                    
                    <circle cx="120" cy="65" r="12" fill={ecobotRunning ? '#fef08a' : '#475569'} stroke="#f59e0b" strokeWidth="2" filter={ecobotRunning ? 'drop-shadow(0 0 16px #fde047)' : 'none'} />
                    
                    {ecobotRunning && (
                      <polygon points="120,65 30,0 210,0" fill="rgba(253, 224, 71, 0.25)" />
                    )}

                    <defs>
                      <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="50%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {ecobotRunning ? '💡 LED iluminando con reflector parabólico de CD' : 'Luminaria apagada'}
                  </span>
                </div>
              )}

              {selectedEcobot.id === 'ventilador' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="220" height="200" viewBox="0 0 220 200">
                    <rect x="70" y="160" width="80" height="25" rx="5" fill="#334155" />
                    <rect x="103" y="100" width="14" height="65" fill="#64748b" />
                    
                    <circle cx="110" cy="95" r="24" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    
                    <g className={ecobotRunning ? 'spin-fan' : ''} style={{ transformOrigin: '110px 95px' }}>
                      <path d="M110 95 Q 140 60 170 85 Q 140 100 110 95 Z" fill="#06b6d4" opacity="0.85" />
                      <path d="M110 95 Q 80 130 50 105 Q 80 90 110 95 Z" fill="#06b6d4" opacity="0.85" />
                      <path d="M110 95 Q 145 125 120 155 Q 105 125 110 95 Z" fill="#06b6d4" opacity="0.85" />
                      <path d="M110 95 Q 75 65 100 35 Q 115 65 110 95 Z" fill="#06b6d4" opacity="0.85" />
                      <circle cx="110" cy="95" r="8" fill="#f59e0b" />
                    </g>
                  </svg>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    {ecobotRunning ? '🌀 Turbina axial en giro — generando flujo de aire' : 'Ventilador detenido'}
                  </span>
                </div>
              )}
            </div>

            <div className="elec-controls-row">
              <div style={{ flex: 1, minWidth: '220px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Control de Potencia / Tensión de Entrada:</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={botSpeed}
                  onChange={(e) => setBotSpeed(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '0.4rem' }}
                />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                Tensión efectiva: <strong>{(botSpeed * 0.05).toFixed(1)} V</strong> | Frecuencia: <strong>{botSpeed * 40} RPM</strong>
              </div>
            </div>
          </div>

          <div className="elec-grid-2">
            <div className="elec-subcard">
              <h4>🔬 Fundamentos de Física e Ingeniería</h4>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.7', margin: 0 }}>
                {selectedEcobot.physics}
              </p>
            </div>

            <div className="elec-subcard">
              <h4>📦 Materiales Reciclados Requeridos</h4>
              <ul>
                {selectedEcobot.materials.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="elec-subcard" style={{ marginTop: '1.5rem' }}>
            <h4>📋 Guía de Construcción Paso a Paso</h4>
            <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>
              {selectedEcobot.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* ────────────────── TAB 3: EMPALMES Y CIRCUITOS ────────────────── */}
      {activeTab === 'empalmes' && (
        <div className="elec-practice-container">
          <h2 className="elec-practice-title">
            <span>🔌</span> Práctica Obligatoria: Empalmes y Circuitos Eléctricos Básicos
          </h2>
          <p className="elec-practice-desc">
            En esta práctica de taller aprenderás a confeccionar los 3 empalmes reglamentarios 
            (Cola de rata, En T y Western Union) respetando el código de colores IRAM 2183 y 
            realizarás la verificación funcional en un circuito serie de control y protección.
          </p>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {SPLICES_DATA.map(s => (
              <button
                key={s.id}
                className={`elec-btn-secondary ${selectedSplice.id === s.id ? 'active' : ''}`}
                style={{
                  background: selectedSplice.id === s.id ? 'rgba(0,242,255,0.2)' : 'rgba(255,255,255,0.05)',
                  borderColor: selectedSplice.id === s.id ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                  color: selectedSplice.id === s.id ? '#ffffff' : 'var(--text-dim)'
                }}
                onClick={() => setSelectedSplice(s)}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </div>

          <div className="elec-workbench">
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary-color)' }}>
              Esquema de Montaje: {selectedSplice.title}
            </h3>

            <div style={{ background: '#030712', borderRadius: '14px', padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              {selectedSplice.id === 'cola_rata' && (
                <svg width="400" height="150" viewBox="0 0 400 150">
                  <rect x="30" y="50" width="130" height="16" fill="#78350f" rx="3" />
                  <text x="40" y="42" fill="#d97706" fontSize="11">Fase (Marrón 1.5mm²)</text>
                  
                  <rect x="30" y="85" width="130" height="16" fill="#0284c7" rx="3" />
                  <text x="40" y="118" fill="#38bdf8" fontSize="11">Fase 2 / Retorno</text>
                  
                  <path d="M160 58 L 220 70 L 320 70" stroke="#f59e0b" strokeWidth="7" strokeLinecap="round" />
                  <path d="M160 93 L 220 75 L 320 70" stroke="#d97706" strokeWidth="7" strokeLinecap="round" />
                  
                  <circle cx="235" cy="70" r="8" fill="#b45309" />
                  <circle cx="255" cy="70" r="8" fill="#b45309" />
                  <circle cx="275" cy="70" r="8" fill="#b45309" />
                  <circle cx="295" cy="70" r="8" fill="#b45309" />
                  <circle cx="315" cy="70" r="7" fill="#b45309" />

                  <path d="M315 70 Q 330 70 325 60 L 305 60" stroke="#f59e0b" strokeWidth="5" fill="none" />
                  <text x="210" y="105" fill="#94a3b8" fontSize="11">Torsión apretada con pinza universal (5 cm)</text>
                </svg>
              )}

              {selectedSplice.id === 'derivacion_t' && (
                <svg width="420" height="170" viewBox="0 0 420 170">
                  <rect x="20" y="45" width="120" height="16" fill="#78350f" rx="3" />
                  <rect x="260" y="45" width="140" height="16" fill="#78350f" rx="3" />
                  
                  <line x1="140" y1="53" x2="260" y2="53" stroke="#f59e0b" strokeWidth="10" />
                  <text x="145" y="35" fill="#f59e0b" fontSize="11">Ventana pelada (3 cm)</text>

                  <rect x="192" y="115" width="16" height="50" fill="#0284c7" rx="3" />
                  <line x1="200" y1="115" x2="200" y2="60" stroke="#38bdf8" strokeWidth="8" />

                  <path d="M200 53 Q 215 35 225 53 Q 235 70 245 53" fill="none" stroke="#e0f2fe" strokeWidth="6" />
                  <text x="200" y="100" fill="#38bdf8" fontSize="11">Derivación arrollada</text>
                </svg>
              )}

              {selectedSplice.id === 'western_union' && (
                <svg width="440" height="150" viewBox="0 0 440 150">
                  <rect x="15" y="65" width="100" height="16" fill="#78350f" rx="3" />
                  <rect x="325" y="65" width="100" height="16" fill="#78350f" rx="3" />

                  <line x1="115" y1="73" x2="325" y2="73" stroke="#b45309" strokeWidth="8" />
                  
                  <path d="M130 65 L 140 81 M 145 65 L 155 81 M 160 65 L 170 81" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="220" cy="73" r="10" fill="#d97706" />
                  <path d="M270 65 L 280 81 M 285 65 L 295 81 M 300 65 L 310 81" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                  
                  <text x="140" y="45" fill="#f59e0b" fontSize="11">Tracción mecánica máxima — Estandarización Western Union</text>
                </svg>
              )}
            </div>

            <div className="elec-grid-2" style={{ marginTop: '1.2rem' }}>
              <div className="elec-subcard">
                <h4>🎯 Aplicación Principal</h4>
                <p style={{ color: 'var(--text-dim)', lineHeight: '1.6', margin: 0 }}>
                  {selectedSplice.use}
                </p>
              </div>

              <div className="elec-subcard">
                <h4>⚖️ Ventajas y Consideraciones</h4>
                <p style={{ color: '#10b981', margin: '0 0 0.4rem 0', fontSize: '0.9rem' }}>
                  <strong>Ventaja:</strong> {selectedSplice.advantages}
                </p>
                <p style={{ color: '#f59e0b', margin: 0, fontSize: '0.9rem' }}>
                  <strong>Cuidado:</strong> {selectedSplice.disadvantages}
                </p>
              </div>
            </div>
          </div>

          {/* Simulador Interactivo de Circuito Eléctrico Básico */}
          <div className="elec-workbench">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.2rem' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>
                  ⚡ Banco de Pruebas: Circuito Eléctrico Básico
                </h3>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Verificación de la Ley de Ohm, protección por fusible y caída de tensión.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button
                  className="elec-btn-action"
                  onClick={() => setCircuitSwitch(!circuitSwitch)}
                  style={{ background: circuitSwitch ? '#10b981' : 'rgba(255,255,255,0.1)', color: circuitSwitch ? '#000' : '#fff' }}
                >
                  {circuitSwitch ? '🟢 Interruptor CERRADO' : '⚪ Interruptor ABIERTO'}
                </button>
                {circuitFuseBlown && (
                  <button
                    className="elec-btn-secondary"
                    style={{ borderColor: '#ef4444', color: '#ef4444' }}
                    onClick={() => {
                      setCircuitFuseBlown(false);
                      setCircuitLoadResistance(24);
                    }}
                  >
                    🔄 Reemplazar Fusible Quemado
                  </button>
                )}
              </div>
            </div>

            <div style={{ background: '#020617', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <svg width="480" height="200" viewBox="0 0 480 200">
                <path
                  d="M60 100 L 60 40 L 160 40"
                  stroke={circuitCurrent > 0 ? '#38bdf8' : '#334155'}
                  strokeWidth="4"
                  fill="none"
                  className={circuitCurrent > 0 ? 'wire-active' : ''}
                />
                <path
                  d="M210 40 L 300 40 L 400 40 L 400 80"
                  stroke={circuitCurrent > 0 ? '#38bdf8' : '#334155'}
                  strokeWidth="4"
                  fill="none"
                  className={circuitCurrent > 0 ? 'wire-active' : ''}
                />
                <path
                  d="M400 120 L 400 160 L 60 160 L 60 100"
                  stroke={circuitCurrent > 0 ? '#0284c7' : '#1e293b'}
                  strokeWidth="4"
                  fill="none"
                  className={circuitCurrent > 0 ? 'wire-active' : ''}
                />

                <rect x="40" y="80" width="40" height="40" rx="4" fill="#0f172a" stroke="#00f2ff" strokeWidth="2" />
                <line x1="48" y1="95" x2="72" y2="95" stroke="#ef4444" strokeWidth="4" />
                <line x1="53" y1="105" x2="67" y2="105" stroke="#0284c7" strokeWidth="3" />
                <text x="35" y="140" fill="#00f2ff" fontSize="12" fontWeight="bold">12 V DC</text>

                <rect x="160" y="30" width="50" height="20" rx="4" fill="#1e293b" stroke={circuitFuseBlown ? '#ef4444' : '#f59e0b'} strokeWidth="2" />
                <line x1="165" y1="40" x2="205" y2="40" stroke={circuitFuseBlown ? '#ef4444' : '#ffffff'} strokeWidth="2" strokeDasharray={circuitFuseBlown ? '3 3' : 'none'} />
                <text x="160" y="24" fill={circuitFuseBlown ? '#ef4444' : '#f59e0b'} fontSize="11">
                  {circuitFuseBlown ? '💥 Fusible QUEMADO' : 'Fusible 1A'}
                </text>

                <circle cx="280" cy="40" r="5" fill="#f8fafc" />
                <circle cx="330" cy="40" r="5" fill="#f8fafc" />
                <line
                  x1="280"
                  y1="40"
                  x2={circuitSwitch ? '330' : '315'}
                  y2={circuitSwitch ? '40' : '15'}
                  stroke="#10b981"
                  strokeWidth="4"
                />
                <text x="280" y="65" fill="#94a3b8" fontSize="11">Interruptor</text>

                <circle cx="400" cy="100" r="22" fill={circuitCurrent > 0 ? '#fef08a' : '#1e293b'} stroke="#eab308" strokeWidth="2" filter={circuitCurrent > 0 ? 'drop-shadow(0 0 15px #facc15)' : 'none'} />
                <path d="M390 100 Q 400 90 400 105 Q 400 90 410 100" fill="none" stroke="#ca8a04" strokeWidth="2" />
                <text x="380" y="138" fill="#ffffff" fontSize="11">{circuitLoadResistance} Ω</text>
              </svg>
            </div>

            <div className="elec-info-grid" style={{ marginTop: '1rem', borderTop: 'none', paddingTop: 0 }}>
              <div className="elec-subcard" style={{ padding: '1rem' }}>
                <span className="elec-info-label">Voltaje Medido (V)</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                  {circuitSwitch && !circuitFuseBlown ? '12.0 V' : '0.0 V'}
                </span>
              </div>

              <div className="elec-subcard" style={{ padding: '1rem' }}>
                <span className="elec-info-label">Corriente Circulante (I = V/R)</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: circuitCurrent > 0.9 ? '#f59e0b' : '#10b981' }}>
                  {circuitCurrent.toFixed(2)} A
                </span>
              </div>

              <div className="elec-subcard" style={{ padding: '1rem' }}>
                <span className="elec-info-label">Potencia Disipada (P = V·I)</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>
                  {circuitPower.toFixed(2)} W
                </span>
              </div>
            </div>

            <div className="elec-controls-row">
              <div style={{ flex: 1, minWidth: '240px' }}>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Ajustar Resistencia de la Carga (Simular Sobrecarga):</span>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={circuitLoadResistance}
                  onChange={(e) => {
                    const r = Number(e.target.value);
                    setCircuitLoadResistance(r);
                    if (circuitSwitch && (circuitVoltage / r) > 1.0) {
                      setCircuitFuseBlown(true);
                    }
                  }}
                  style={{ width: '100%', marginTop: '0.4rem' }}
                />
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                {circuitLoadResistance < 12 ? (
                  <span style={{ color: '#ef4444' }}>⚠️ Resistencia muy baja: Corriente supera 1A (fusible salta).</span>
                ) : (
                  <span style={{ color: '#10b981' }}>✓ Rango seguro de operación continua.</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── TAB 4: SOLDADURA EN PLACA DE ISLAS ────────────────── */}
      {activeTab === 'soldadura' && (
        <div className="elec-practice-container">
          <h2 className="elec-practice-title">
            <span>🧪</span> Práctica Obligatoria: Soldadura en Placa de Islas (Perfboard)
          </h2>
          <p className="elec-practice-desc">
            Aprende a realizar uniones intermetálicas definitivas sobre placas de circuito perforadas con islas individuales de cobre. 
            Domina el control de temperatura del cautín (30W-40W), el punto exacto de fusión del estaño 60/40 y el uso del desoldador.
          </p>

          <div className="elec-workbench">
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--primary-color)' }}>
              Banco Interactivo de Soldadura en Isla Perforada
            </h3>

            <div style={{ background: '#030712', borderRadius: '14px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <svg width="360" height="200" viewBox="0 0 360 200">
                <rect x="30" y="130" width="300" height="40" fill="#92400e" stroke="#78350f" strokeWidth="2" rx="4" />
                <text x="40" y="165" fill="#fef3c7" fontSize="11" opacity="0.8">Placa de Islas (Perfboard paso 2.54 mm)</text>

                <rect x="70" y="124" width="45" height="8" fill="#b45309" rx="2" />
                <circle cx="92.5" cy="128" r="4" fill="#030712" />

                <rect x="155" y="124" width="50" height="8" fill="#ea580c" rx="2" stroke="#f97316" strokeWidth={isHeating ? '2' : '0'} />
                <circle cx="180" cy="128" r="4" fill="#030712" />

                <rect x="245" y="124" width="45" height="8" fill="#b45309" rx="2" />
                <circle cx="267.5" cy="128" r="4" fill="#030712" />

                <line x1="180" y1="40" x2="180" y2="128" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />

                <g transform={isHeating ? 'translate(0, 20)' : 'translate(0, 0)'} style={{ transition: 'transform 0.3s ease' }}>
                  <rect x="70" y="30" width="70" height="16" rx="4" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1" />
                  <rect x="140" y="34" width="40" height="8" fill="#64748b" />
                  <polygon points="180,38 215,48 180,58" fill={isHeating ? '#f97316' : '#94a3b8'} />
                  {isHeating && (
                    <circle cx="195" cy="48" r="14" fill="#ef4444" opacity="0.35" filter="drop-shadow(0 0 8px #f97316)" />
                  )}
                </g>

                {isHeating && (
                  <path d="M260 20 L 195 120" stroke="#9ca3af" strokeWidth="4" strokeLinecap="round" />
                )}

                {solderResult === 'fria' && (
                  <circle cx="180" cy="120" r="12" fill="#6b7280" stroke="#4b5563" strokeWidth="2" />
                )}
                {solderResult === 'perfecta' && (
                  <path d="M165 124 Q 180 95 180 85 Q 180 95 195 124 Z" fill="#e5e7eb" stroke="#ffffff" strokeWidth="1.5" filter="drop-shadow(0 0 6px #00f2ff)" />
                )}
                {solderResult === 'sobrecalentada' && (
                  <ellipse cx="180" cy="124" rx="20" ry="6" fill="#451a03" stroke="#ef4444" strokeWidth="2" />
                )}
                {solderResult === 'puente' && (
                  <path d="M155 124 Q 210 110 265 124 Z" fill="#cbd5e1" stroke="#f59e0b" strokeWidth="2" />
                )}
              </svg>

              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                {isHeating && (
                  <div style={{ color: '#f59e0b', fontWeight: 'bold', animation: 'pulse 1s infinite' }}>
                    🔥 Calentando unión y aportando estaño... Tiempo de contacto: {solderTime.toFixed(1)} s
                  </div>
                )}
                {!isHeating && solderResult && (
                  <div style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '10px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    background: solderResult === 'perfecta' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: solderResult === 'perfecta' ? '#10b981' : '#ef4444',
                    border: `1px solid ${solderResult === 'perfecta' ? '#10b981' : '#ef4444'}`
                  }}>
                    {solderResult === 'perfecta' && '✅ ¡Excelente! Soldadura cónica tipo "Volcán brillante" con ángulo de mojado perfecto.'}
                    {solderResult === 'fria' && '❄️ Soldadura Fría: Tiempo insuficiente (< 1.8s). Aspecto opaco y granuloso, riesgo de falso contacto.'}
                    {solderResult === 'sobrecalentada' && '🔥 Sobrecalentamiento: Demasiado tiempo (> 3.8s). La isla de cobre se despegó del pertinax y el flux se quemó.'}
                    {solderResult === 'puente' && '🌉 Cortocircuito: Puente accidental de estaño entre dos islas contiguas. Requiere desoldador.'}
                  </div>
                )}
              </div>
            </div>

            <div className="elec-controls-row">
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <button
                  className="elec-btn-action"
                  onMouseDown={handleStartHeating}
                  onMouseUp={handleStopHeating}
                  onTouchStart={handleStartHeating}
                  onTouchEnd={handleStopHeating}
                  style={{ background: isHeating ? '#ef4444' : 'linear-gradient(135deg, #0284c7, #00f2ff)' }}
                >
                  {isHeating ? '🔥 Manteniendo calor...' : '🔴 Mantener presionado para Soldar'}
                </button>

                <button
                  className="elec-btn-secondary"
                  onClick={() => setBridgeRisk(!bridgeRisk)}
                  style={{ borderColor: bridgeRisk ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}
                >
                  {bridgeRisk ? '⚠️ Modo Exceso de Estaño (Puente)' : '💧 Aporte normal de estaño'}
                </button>

                <button
                  className="elec-btn-secondary"
                  onClick={handleCleanSolder}
                >
                  🧹 Usar Desoldador / Limpiar Isla
                </button>
              </div>

              <div style={{ flex: 1, textAlign: 'right', minWidth: '180px' }}>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tiempo de contacto regulable: </span>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={solderTime}
                  onChange={(e) => setSolderTime(Number(e.target.value))}
                  style={{ verticalAlign: 'middle', marginLeft: '0.5rem' }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold', marginLeft: '0.5rem' }}>{solderTime.toFixed(1)}s</span>
              </div>
            </div>
          </div>

          <div className="elec-grid-2">
            <div className="elec-subcard">
              <h4>📋 El Procedimiento Técnico de los 4 Pasos</h4>
              <ol style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>
                <li><strong>Limpieza de punta:</strong> Pasar la punta caliente por esponja húmeda (debe quedar brillante con película fina de estaño).</li>
                <li><strong>Precalentamiento simultáneo:</strong> Tocar con la punta del cautín a 45° tanto la isla de cobre como el terminal durante 2 segundos.</li>
                <li><strong>Aporte de estaño:</strong> Acercar el hilo de estaño a la unión en el lado opuesto a la punta (el metal caliente debe fundir el estaño, no la punta directamente).</li>
                <li><strong>Retiro y enfriamiento:</strong> Retirar el estaño primero y el cautín un segundo después. Dejar enfriar sin mover ni soplar para evitar cristalización defectuosa.</li>
              </ol>
            </div>

            <div className="elec-subcard">
              <h4>🔍 Criterios de Evaluación y Errores Típicos</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>
                <li><strong>Cono o Volcán Brillante:</strong> Superficie cóncava, suave, plateada y brillante. Cubre toda la isla sin desbordar.</li>
                <li><strong>Soldadura Fría:</strong> Aspecto mate, bola rugosa. Sucede por falta de temperatura o mover el terminal mientras solidifica.</li>
                <li><strong>Exceso de Estaño / Puente:</strong> Se forma una gota esférica gigante que une dos islas contiguas generando cortocircuito.</li>
                <li><strong>Isla Levantada:</strong> Ocurre al mantener el soldador más de 4 o 5 segundos; el pegamento del pertinax se desintegra.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────── TAB 5: TP INTEGRADOR TEÓRICO ────────────────── */}
      {activeTab === 'tp' && (
        <div className="elec-quiz-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#f59e0b' }}>
                📝 Trabajo Práctico Integrador Teórico (12 Preguntas)
              </h2>
              <p style={{ color: 'var(--text-dim)', margin: '0.4rem 0 0 0' }}>
                Evaluación integral obligatoria sobre magnitudes, Ley de Ohm, Kirchhoff, normas de seguridad y buenas prácticas de taller.
              </p>
            </div>

            <div style={{ background: 'rgba(245,158,11,0.15)', padding: '0.6rem 1.2rem', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.4)', textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Progreso</span>
              <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ffffff' }}>
                {Object.keys(userAnswers).length} / {TP_QUESTIONS.length} Respondidas
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.04)', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Nombre y Apellido del Alumno:</span>
            <input
              type="text"
              placeholder="Ej. Juan Pérez"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.3)',
                color: '#fff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          {TP_QUESTIONS.map(q => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCorrect = userAnswers[q.id] === q.correct;

            return (
              <div
                key={q.id}
                className={`elec-quiz-qcard ${quizSubmitted ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              >
                <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', color: '#ffffff' }}>
                  {q.question}
                </h3>

                <div>
                  {q.options.map((opt, optIndex) => {
                    const isSelected = userAnswers[q.id] === optIndex;
                    let optClass = 'elec-quiz-opt';
                    if (isSelected) optClass += ' selected';
                    if (quizSubmitted) {
                      if (optIndex === q.correct) optClass += ' correct-answer';
                      else if (isSelected && !isCorrect) optClass += ' wrong-answer';
                    }

                    return (
                      <button
                        key={optIndex}
                        className={optClass}
                        disabled={quizSubmitted}
                        onClick={() => {
                          setUserAnswers(prev => ({ ...prev, [q.id]: optIndex }));
                        }}
                      >
                        {String.fromCharCode(65 + optIndex)}) {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div style={{ marginTop: '0.8rem', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', fontSize: '0.9rem', color: isCorrect ? '#10b981' : '#f87171' }}>
                    <strong>Explicación:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}

          {!quizSubmitted ? (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className="elec-btn-action"
                style={{ fontSize: '1.1rem', padding: '0.9rem 2.2rem', margin: '0 auto' }}
                onClick={() => {
                  if (Object.keys(userAnswers).length < TP_QUESTIONS.length) {
                    alert('Por favor responde todas las preguntas antes de entregar la evaluación.');
                    return;
                  }
                  setQuizSubmitted(true);
                }}
              >
                🏁 Finalizar y Calificar Trabajo Práctico
              </button>
            </div>
          ) : (
            <div className="elec-cert-box">
              <div className="elec-cert-seal">🎓</div>
              <h2 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem 0', color: '#f59e0b' }}>
                Constancia de Evaluación de Taller
              </h2>
              <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
                Escuela Técnica Preuniversitaria EST UTN SAN MIGUEL — Ciclo 2026
              </p>

              <div style={{ margin: '1.5rem 0', fontSize: '1.3rem' }}>
                Alumno: <strong>{studentName || 'Estudiante de 1er Año'}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', margin: '1.5rem 0' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Aciertos</span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#10b981' }}>
                    {scoreData.correctCount} / {scoreData.total}
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Porcentaje</span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary-color)' }}>
                    {scoreData.percentage}%
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 2rem', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>Calificación Final</span>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: scoreData.percentage >= 60 ? '#10b981' : '#ef4444' }}>
                    {scoreData.grade} / 10
                  </div>
                </div>
              </div>

              <p style={{ color: scoreData.percentage >= 60 ? '#10b981' : '#ef4444', fontWeight: 'bold', fontSize: '1.2rem' }}>
                {scoreData.percentage >= 60 
                  ? '🎉 ¡APROBADO! Felicitaciones, has superado con éxito el Trabajo Práctico Integrador Teórico.' 
                  : '⚠️ No alcanzaste el puntaje mínimo (60%). Te recomendamos repasar los contenidos y reintentar.'}
              </p>

              <button
                className="elec-btn-secondary"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setQuizSubmitted(false);
                  setUserAnswers({});
                }}
              >
                🔄 Reintentar Evaluación
              </button>
            </div>
          )}
        </div>
      )}

      {/* ────────────────── TAB 6: PROGRAMA INSTITUCIONAL ────────────────── */}
      {activeTab === 'institucional' && (
        <div className="elec-week-card">
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <span className="elec-tag elec-tag-utn">Documento Curricular Oficial</span>
            <h2 style={{ fontSize: '2rem', margin: '0.8rem 0 0.3rem 0', color: '#ffffff' }}>
              Fundamentación y Objetivos del Espacio Curricular
            </h2>
            <p style={{ color: '#94a3b8', margin: 0 }}>
              Asignatura: Taller de Electricidad y Electrónica General Básica | 1er Año | Prof. Ariel Bulacio | Carga: 9hc Semanales (2 Clases)
            </p>
          </div>

          <div className="elec-grid-2">
            <div className="elec-subcard">
              <h4>🎯 Fundamentación Pedagógica</h4>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', margin: 0 }}>
                La asignatura busca que los estudiantes desarrollen habilidades prácticas en la manipulación de herramientas, 
                instrumentos de medición y control, y comprendan los principios fundamentales de la electricidad. 
                Es esencial para la formación técnica, ya que fomenta la capacidad de interpretar esquemas eléctricos, 
                realizar instalaciones de baja complejidad y aplicar técnicas de soldadura en circuitos impresos y placas de islas.
              </p>
            </div>

            <div className="elec-subcard">
              <h4>🏆 Perfil del Egresado Técnico</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>
                <li><strong>Operar y Mantener:</strong> Instalaciones de baja tensión y diagnóstico de fallas de manera autónoma y segura.</li>
                <li><strong>Interpretar Documentación:</strong> Lectura rigurosa de planos unifilares, esquemas y normativas AEA/IRAM.</li>
                <li><strong>Aplicar Tecnología:</strong> Destreza en multímetros, pinzas amperimétricas y soldadura con cautín.</li>
                <li><strong>Responsabilidad y Seguridad:</strong> Código ético de prevención de riesgos y protección de la vida humana.</li>
              </ul>
            </div>
          </div>

          <div className="elec-grid-2" style={{ marginTop: '1.5rem' }}>
            <div className="elec-subcard">
              <h4>📖 Metodología Didáctica (ABP)</h4>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', margin: 0 }}>
                Se implementa el <strong>Aprendizaje Basado en Proyectos (ABP)</strong> y la Resolución de Problemas en Taller (Hands-on Learning). 
                La mayor parte de la carga horaria se destina a la práctica directa en bancos de trabajo, distribuyendo las 9 horas semanales 
                en 2 clases con más de 190 minutos de banco efectivo por clase.
              </p>
            </div>

            <div className="elec-subcard">
              <h4>📚 Bibliografía y Normativas de Referencia</h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-dim)', lineHeight: '1.8' }}>
                <li>Reglamento de la Asociación Electrotécnica Argentina (AEA 90364) para Inmuebles.</li>
                <li>Normas IRAM 2183 (Conductores eléctricos aislados) y afines.</li>
                <li>Boylestad / Dorf: <em>Análisis Introductorio de Circuitos Eléctricos</em>.</li>
                <li>Plataforma simutec.com.ar — Simuladores y material didáctico interactivo de la UTN.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Electricidad1roPage;
