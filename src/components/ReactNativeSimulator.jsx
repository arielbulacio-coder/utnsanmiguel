import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Babel from '@babel/standalone';
import {
    Play, RotateCcw, Copy, Check, Smartphone, Terminal,
    ShoppingCart, ShoppingBag, Package, Trash2, Plus, Minus, Search, ArrowLeft,
    Layers, List, Navigation, ShieldCheck, Database, Camera,
    Zap, Sparkles, ChevronRight, ExternalLink, BookOpen, CheckCircle2, Lightbulb,
    AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Server, Edit3, Filter,
    FileText, FolderOpen
} from 'lucide-react';

if (typeof window !== 'undefined') {
    window.React = React;
}

// PRESETS EDUCATIVOS DEL CURSO
export const SIMULATOR_PRESETS = [
    {
        id: 'expo_setup',
        unit: 'Unidad 1.1 • Setup Inicial',
        title: 'Tutorial: Comenzar Proyecto Expo & Setup PC',
        icon: <Terminal size={18} />,
        summary: 'Guía paso a paso: instalación de Node.js, VS Code, Git, emuladores/Expo Go y comandos iniciales create-expo-app.',
        code: `// =======================================================
// TUTORIAL INICIAL: SETUP DE PC & COMANDOS EXPO
// Cátedra Creación de Aplicaciones Móviles • UNPilar / UTN
// =======================================================

// 1. VERIFICAR HERRAMIENTAS PREVIAS EN TU PC
// Asegúrate de tener Node.js (LTS v20+) y Git instalados:
node -v      # Debe responder v20.x o superior
git --version # Debe responder git version 2.x

// 2. CREAR TU NUEVO PROYECTO EXPO
// Crea una aplicación moderna con navegación por pestañas (Tabs):
npx create-expo-app@latest mi-primera-app --template tabs

// 3. ACCEDER A LA CARPETA DEL PROYECTO
cd mi-primera-app

// 4. INSTALAR DEPENDENCIAS ADICIONALES DEL CURSO
npx expo install @react-navigation/native zustand zod lucide-react-native

// 5. INICIAR EL SERVIDOR DE DESARROLLO METRO BUNDLER
npx expo start

// =======================================================
// ATAJOS DE TECLADO EN LA TERMINAL METRO:
// -------------------------------------------------------
//   a  -> Abrir en Emulador Android (Android Studio / AVD)
//   i  -> Abrir en Simulador iOS (Xcode en macOS)
//   w  -> Abrir en Navegador Web (Chrome / Edge)
//   r  -> Recargar la app en vivo (Fast Refresh / Reload)
//   m  -> Abrir Menú de Desarrollador en el teléfono
//   c  -> Limpiar caché de Metro (npx expo start -c)
//   s  -> Alternar entre Expo Go y Development Build
// =======================================================`,
        renderSimulator: ({ log }) => {
            const [step, setStep] = useState(1);
            const [copied, setCopied] = useState(false);
            const [metroLog, setMetroLog] = useState([
                'VITE / METRO BUNDLER v51.0.0 ready in 820ms',
                'Waiting on exp://192.168.1.45:8081',
                'Scan the QR code with Expo Go app'
            ]);

            const triggerHotkey = (key, desc) => {
                log(`[Metro Terminal] Presionaste '${key}' -> ${desc}`);
                setMetroLog(prev => [...prev.slice(-4), `> Key '${key}': ${desc}`]);
            };

            const copyCommand = (cmd) => {
                navigator.clipboard?.writeText(cmd);
                setCopied(true);
                log(`[Clipboard] Copiado: "${cmd}"`);
                setTimeout(() => setCopied(false), 2000);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', overflow: 'hidden' }}>
                    {/* Header del Tutorial */}
                    <div style={{ padding: '12px 14px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span>🚀 Setup Expo en PC</span>
                            </div>
                            <div style={{ fontSize: '9px', color: '#94a3b8' }}>Guía Interactiva para Alumnos</div>
                        </div>
                        <span style={{ fontSize: '9px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                            Paso {step} de 4
                        </span>
                    </div>

                    {/* Selector de Pasos */}
                    <div style={{ display: 'flex', background: '#131b2e', padding: '4px', borderBottom: '1px solid #1f2937', gap: '2px' }}>
                        {[
                            { id: 1, label: '1. Herramientas' },
                            { id: 2, label: '2. Crear App' },
                            { id: 3, label: '3. Terminal' },
                            { id: 4, label: '4. QR & Go' }
                        ].map(s => (
                            <button
                                key={s.id}
                                onClick={() => { setStep(s.id); log(`[Tutorial] Navegando a Paso ${s.id}`); }}
                                style={{
                                    flex: 1,
                                    padding: '5px 2px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: step === s.id ? '#0284c7' : 'transparent',
                                    color: step === s.id ? '#fff' : '#94a3b8',
                                    fontSize: '9px',
                                    fontWeight: step === s.id ? '800' : '600',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>

                    {/* PASO 1: HERRAMIENTAS NECESARIAS */}
                    {step === 1 && (
                        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8', marginBottom: '2px' }}>
                                💻 Software Obligatorio en tu Computadora:
                            </div>

                            {[
                                { name: 'Node.js (LTS v20+)', desc: 'Runtime esencial para Metro Bundler y npm.', status: 'Instalado ✓', link: 'nodejs.org' },
                                { name: 'Visual Studio Code', desc: 'Editor recomendado con extensión Expo Tools.', status: 'Instalado ✓', link: 'code.visualstudio.com' },
                                { name: 'Git CLI', desc: 'Control de versiones para entregas de la cátedra.', status: 'Instalado ✓', link: 'git-scm.com' },
                                { name: 'App Expo Go (en Teléfono)', desc: 'Descárgala gratis en Google Play o iOS App Store.', status: 'Móvil Listo ✓', link: 'expo.dev/go' }
                            ].map((tool, idx) => (
                                <div key={idx} style={{ background: '#151d30', border: '1px solid #23304e', borderRadius: '8px', padding: '8px 10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#f1f5f9' }}>{tool.name}</span>
                                        <span style={{ fontSize: '8px', color: '#10b981', fontWeight: '800', background: 'rgba(16,185,129,0.15)', padding: '1px 5px', borderRadius: '4px' }}>
                                            {tool.status}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px' }}>{tool.desc}</div>
                                </div>
                            ))}

                            <button
                                onClick={() => setStep(2)}
                                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', marginTop: '4px' }}
                            >
                                Siguiente: Crear Proyecto ➔
                            </button>
                        </div>
                    )}

                    {/* PASO 2: CREAR PROYECTO */}
                    {step === 2 && (
                        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8' }}>
                                📦 Comando para crear tu aplicación:
                            </div>

                            <div style={{ background: '#0e1526', border: '1px solid #334155', borderRadius: '8px', padding: '10px' }}>
                                <div style={{ fontSize: '9px', color: '#64748b', marginBottom: '4px' }}>TERMINAL / POWERSHELL:</div>
                                <code style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '800', display: 'block', wordBreak: 'break-all' }}>
                                    npx create-expo-app@latest mi-app --template tabs
                                </code>
                            </div>

                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                    onClick={() => copyCommand('npx create-expo-app@latest mi-app --template tabs')}
                                    style={{ flex: 1, background: copied ? '#10b981' : '#1e293b', border: '1px solid #334155', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                                >
                                    {copied ? '✓ Copiado al Portapapeles' : '📋 Copiar Comando'}
                                </button>
                                <button
                                    onClick={() => { log('[Terminal] Ejecutando: npx create-expo-app@latest mi-app...'); alert('Creando estructura de carpetas app/ con Expo Router...'); setStep(3); }}
                                    style={{ flex: 1, background: '#0284c7', border: 'none', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                                >
                                    Simular Creación ➔
                                </button>
                            </div>

                            <div style={{ background: '#151d30', border: '1px solid #23304e', borderRadius: '8px', padding: '8px', fontSize: '9px', color: '#cbd5e1', lineHeight: '1.4' }}>
                                <strong style={{ color: '#fff' }}>¿Qué crea este comando?</strong>
                                <br />
                                • Carpeta <code style={{ color: '#38bdf8' }}>app/</code> con Expo Router basado en archivos.
                                <br />
                                • <code style={{ color: '#38bdf8' }}>app/(tabs)/index.tsx</code> y <code style={{ color: '#38bdf8' }}>_layout.tsx</code>.
                                <br />
                                • Archivo <code style={{ color: '#38bdf8' }}>app.json</code> de configuración nativa.
                            </div>
                        </div>
                    )}

                    {/* PASO 3: TERMINAL Y ATAJOS METRO */}
                    {step === 3 && (
                        <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8' }}>
                                ⌨️ Atajos Interactivos en Metro Bundler:
                            </div>

                            {/* Consola simulada */}
                            <div style={{ background: '#080c16', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px', fontFamily: 'monospace', fontSize: '9px', color: '#10b981', minHeight: '65px' }}>
                                {metroLog.map((l, i) => (
                                    <div key={i} style={{ marginBottom: '2px' }}>{l}</div>
                                ))}
                            </div>

                            {/* Botones de atajos */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                                <button
                                    onClick={() => triggerHotkey('a', 'Iniciando en Emulador Android (AVD)...')}
                                    style={{ background: '#151d30', border: '1px solid #23304e', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '9px', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}
                                >
                                    <span style={{ color: '#38bdf8', fontWeight: '900' }}>[ a ]</span> Android Emulator
                                </button>
                                <button
                                    onClick={() => triggerHotkey('w', 'Abriendo en Navegador Web (Chrome)...')}
                                    style={{ background: '#151d30', border: '1px solid #23304e', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '9px', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}
                                >
                                    <span style={{ color: '#38bdf8', fontWeight: '900' }}>[ w ]</span> Abrir en Web
                                </button>
                                <button
                                    onClick={() => triggerHotkey('r', 'Fast Refresh ejecutado a 60 FPS.')}
                                    style={{ background: '#151d30', border: '1px solid #23304e', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '9px', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}
                                >
                                    <span style={{ color: '#10b981', fontWeight: '900' }}>[ r ]</span> Recargar (Reload)
                                </button>
                                <button
                                    onClick={() => triggerHotkey('c', 'Borrando caché de Metro Bundler...')}
                                    style={{ background: '#151d30', border: '1px solid #23304e', color: '#fff', padding: '6px', borderRadius: '6px', fontSize: '9px', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}
                                >
                                    <span style={{ color: '#f59e0b', fontWeight: '900' }}>[ c ]</span> Limpiar Caché
                                </button>
                            </div>

                            <button
                                onClick={() => setStep(4)}
                                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                            >
                                Siguiente: Escanear QR en tu Teléfono ➔
                            </button>
                        </div>
                    )}

                    {/* PASO 4: ESCANEAR QR Y FAST REFRESH */}
                    {step === 4 && (
                        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px' }}>
                            <div style={{ width: '64px', height: '64px', background: '#1e293b', border: '2px solid #38bdf8', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
                                📱
                            </div>
                            <div style={{ fontSize: '12px', fontWeight: '900', color: '#38bdf8' }}>
                                ¡Listo para programar en tu smartphone!
                            </div>
                            <p style={{ fontSize: '9px', color: '#cbd5e1', lineHeight: '1.4', margin: 0, maxWidth: '220px' }}>
                                1. Conecta la PC y tu celular al <strong>mismo Wi-Fi</strong>.
                                <br />
                                2. Abre la app <strong>Expo Go</strong> y escanea el código QR de la terminal.
                                <br />
                                3. Cada vez que guardes en VS Code (<code style={{ color: '#38bdf8' }}>Ctrl + S</code>), la pantalla se actualizará instantáneamente.
                            </p>

                            <button
                                onClick={() => { log('[Tutorial] Alumno completó el tutorial de Setup inicial'); alert('¡Felicitaciones! Ahora puedes experimentar con Flexbox, Estado y los Proyectos Finales en el simulador.'); }}
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: '800', cursor: 'pointer', marginTop: '6px' }}
                            >
                                ¡Entorno Configurado con Éxito! ✓
                            </button>
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{ padding: '6px 12px', background: '#0e1526', borderTop: '1px solid #1e293b', fontSize: '9px', color: '#64748b', textAlign: 'center' }}>
                        💡 Tip: Si la red de la facultad bloquea puertos, corre: <code style={{ color: '#38bdf8' }}>npx expo start --tunnel</code>
                    </div>
                </div>
            );
        }
    },
    {
        id: 'flexbox',
        unit: 'Unidad 1.1',
        title: 'Flexbox & Layout Móvil',
        icon: <Layers size={18} />,
        summary: 'Aprende el modelo de caja y alineación en React Native con StyleSheet.',
        code: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Flexbox Móvil</Text>
        <Text style={styles.subtitle}>React Native por defecto usa flexDirection: 'column'</Text>
      </View>

      <View style={styles.boxRow}>
        <View style={[styles.box, { backgroundColor: '#3b82f6' }]}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#10b981' }]}>
          <Text style={styles.boxText}>Box 2</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#f59e0b' }]}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Propiedades Clave:</Text>
        <Text style={styles.bullet}>• justifyContent: Distribuye en eje principal</Text>
        <Text style={styles.bullet}>• alignItems: Alinea en eje cruzado</Text>
        <Text style={styles.bullet}>• gap: Espaciado moderno entre hijos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    gap: 8,
  },
  box: {
    width: 75,
    height: 75,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeading: {
    color: '#f8fafc',
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 14,
  },
  bullet: {
    color: '#cbd5e1',
    fontSize: 12,
    marginBottom: 4,
  }
});`,
        renderSimulator: ({ config, log }) => {
            const [direction, setDirection] = useState('row');
            const [justify, setJustify] = useState('space-around');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', background: '#0f172a', color: '#fff', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8' }}>📱 Flexbox Móvil</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                            React Native (flexDirection: '{direction}')
                        </div>

                        {/* Interactive Controls inside phone */}
                        <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', fontSize: '11px' }}>
                            <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>INTERACTÚA CON FLEXBOX:</div>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                                <button
                                    onClick={() => { setDirection(d => d === 'row' ? 'column' : 'row'); log(`flexDirection: ${direction === 'row' ? 'column' : 'row'}`); }}
                                    style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: '700' }}
                                >
                                    Dir: {direction}
                                </button>
                                <button
                                    onClick={() => {
                                        const next = justify === 'space-around' ? 'center' : (justify === 'center' ? 'flex-end' : 'space-around');
                                        setJustify(next);
                                        log(`justifyContent: ${next}`);
                                    }}
                                    style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#6366f1', color: '#fff', fontSize: '11px', fontWeight: '700' }}
                                >
                                    Justify: {justify.slice(0, 7)}
                                </button>
                            </div>
                        </div>

                        {/* Visual Boxes Container */}
                        <div style={{
                            display: 'flex',
                            flexDirection: direction,
                            justifyContent: justify,
                            alignItems: 'center',
                            minHeight: '160px',
                            background: '#1e293b',
                            borderRadius: '14px',
                            padding: '12px',
                            marginTop: '12px',
                            border: '1px dashed #475569',
                            gap: '8px'
                        }}>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 1
                            </motion.div>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 2
                            </motion.div>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 3
                            </motion.div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #334155', borderRadius: '10px', padding: '10px', fontSize: '11px', color: '#cbd5e1' }}>
                        <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '2px' }}>💡 Consejo Docente:</div>
                        En React Native todo contenedor tiene <code style={{ color: '#f43f5e' }}>display: 'flex'</code> por defecto. ¡No existe display inline o block!
                    </div>
                </div>
            );
        }
    },
    {
        id: 'state',
        unit: 'Unidad 1.2',
        title: 'Estado con useState & Eventos',
        icon: <Zap size={18} />,
        summary: 'Manejo de estado reactivo, inmutabilidad y eventos táctiles onPress.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterApp() {
  // 1. Declaración de la variable de estado reactiva
  const [count, setCount] = useState(0);

  // 2. Función que incrementa la variable
  const increment = () => {
    setCount(prev => prev + 1);
    console.log('Variable count incrementada a:', count + 1);
  };

  // 3. Función que reinicia la variable a cero
  const reset = () => {
    setCount(0);
    console.log('Variable count reiniciada a 0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>UNIDAD 1.2 • REACT STATE</Text>

      {/* Monitor en vivo del código y la variable en memoria */}
      <View style={styles.codeCard}>
        <Text style={styles.codeTitle}>// Variable que se incrementa:</Text>
        <Text style={styles.codeDecl}>
          const [<Text style={styles.varHighlight}>count</Text>, setCount] = useState({count});
        </Text>
        <View style={styles.stateRow}>
          <Text style={styles.codeLabel}>Valor en memoria:</Text>
          <Text style={styles.varBadge}>count = {count}</Text>
        </View>
        <Text style={styles.codeAction}>Código: setCount({count} + 1)</Text>
      </View>

      <Text style={styles.number}>{count}</Text>
      <Text style={styles.label}>Toques registrados en la variable count</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.btnPrimary} onPress={increment}>
          <Text style={styles.btnText}>+ Incrementar Variable count</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={reset}>
          <Text style={styles.btnSecondaryText}>Reiniciar count a 0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  badge: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(56,189,248,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 14,
    letterSpacing: 1,
  },
  codeCard: {
    width: '100%',
    backgroundColor: '#111827',
    borderWidth: 1.5,
    borderColor: '#38bdf8',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  codeTitle: {
    color: '#94a3b8',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  codeDecl: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: 'bold',
  },
  varHighlight: {
    color: '#38bdf8',
    fontWeight: '900',
  },
  stateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  codeLabel: {
    color: '#cbd5e1',
    fontSize: 11,
  },
  varBadge: {
    color: '#34d399',
    backgroundColor: 'rgba(16,185,129,0.15)',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontWeight: '900',
    fontSize: 12,
  },
  codeAction: {
    color: '#fbbf24',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  number: {
    fontSize: 52,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 58,
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    color: '#cbd5e1',
    marginBottom: 20,
  },
  buttonGroup: {
    width: '100%',
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: '#0284c7',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 12,
  },
});`,
        renderSimulator: ({ log }) => {
            const [count, setCount] = useState(0);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', background: '#0a0f1d', color: '#fff', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '1px', fontWeight: '800', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '4px 10px', borderRadius: '999px', marginBottom: '12px' }}>
                        UNIDAD 1.2 • REACT STATE
                    </div>

                    {/* Monitor en vivo de la variable */}
                    <div style={{ width: '100%', background: '#111827', border: '1.5px solid #38bdf8', borderRadius: '12px', padding: '10px', marginBottom: '14px', textAlign: 'left', fontFamily: 'monospace', fontSize: '11px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '10px', fontWeight: 'bold', marginBottom: '4px' }}>// Variable que se incrementa:</div>
                        <div style={{ color: '#f8fafc', fontWeight: 'bold' }}>
                            const [<span style={{ color: '#38bdf8', fontWeight: '900' }}>count</span>, setCount] = useState({count});
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '4px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                            <span style={{ color: '#cbd5e1' }}>Valor en memoria:</span>
                            <span style={{ color: '#34d399', background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>count = {count}</span>
                        </div>
                        <div style={{ color: '#fbbf24', marginTop: '4px', fontWeight: 'bold' }}>
                            Código: setCount({count} + 1)
                        </div>
                    </div>

                    <motion.div
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}
                    >
                        {count}
                    </motion.div>

                    <div style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '4px', marginBottom: '18px' }}>
                        Toques registrados en la variable <code style={{ color: '#38bdf8' }}>count</code>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '8px' }}>
                        <button
                            onClick={() => {
                                setCount(c => c + 1);
                                log(`[State] setCount(${count} + 1) -> variable count = ${count + 1}`);
                            }}
                            style={{ width: '100%', padding: '11px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7, #06b6d4)', color: '#fff', fontWeight: '800', fontSize: '13px', boxShadow: '0 4px 15px rgba(2,132,199,0.4)', border: 'none', cursor: 'pointer' }}
                        >
                            + Incrementar Variable count
                        </button>

                        <button
                            onClick={() => {
                                setCount(0);
                                log(`[State] setCount(0) -> variable count reseteada a 0`);
                            }}
                            style={{ width: '100%', padding: '9px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#cbd5e1', fontWeight: '600', fontSize: '12px', border: 'none', cursor: 'pointer' }}
                        >
                            Reiniciar count a 0
                        </button>
                    </div>
                </div>
            );
        }
    },
    {
        id: 'flatlist',
        unit: 'Unidad 1.2',
        title: 'Colecciones con FlatList',
        icon: <List size={18} />,
        summary: 'Renderizado virtualizado de alto rendimiento vs ScrollView ordinario.',
        code: `import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CURSOS = [
  { id: '1', nombre: 'Fundamentos de React Native', tag: 'Básico', icon: '⚛️' },
  { id: '2', nombre: 'Expo Router & Navegación', tag: 'Intermedio', icon: '🧭' },
  { id: '3', nombre: 'Zustand & Global State', tag: 'Avanzado', icon: '🐻' },
  { id: '4', nombre: 'Firebase Firestore en Tiempo Real', tag: 'Backend', icon: '🔥' },
  { id: '5', nombre: 'Acceso a Cámara y GPS', tag: 'Nativo', icon: '📸' },
  { id: '6', nombre: 'Build & EAS Deploy en Tiendas', tag: 'DevOps', icon: '🚀' },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.tag}>{item.tag}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={CURSOS}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '700',
  },
  tag: {
    color: '#38bdf8',
    fontSize: 11,
    marginTop: 2,
  }
});`,
        renderSimulator: ({ log }) => {
            const [items] = useState([
                { id: '1', nombre: 'React Native & Expo', tag: 'Semana 1', icon: '⚛️', color: '#38bdf8' },
                { id: '2', nombre: 'Expo Router (Tabs)', tag: 'Semana 3', icon: '🧭', color: '#818cf8' },
                { id: '3', nombre: 'Zustand State Store', tag: 'Semana 5', icon: '🐻', color: '#fbbf24' },
                { id: '4', nombre: 'Firebase Cloud Firestore', tag: 'Semana 8', icon: '🔥', color: '#f97316' },
                { id: '5', nombre: 'Cámara & Sensores GPS', tag: 'Semana 10', icon: '📸', color: '#34d399' },
                { id: '6', nombre: 'EAS Build & Deploy APK', tag: 'Semana 14', icon: '🚀', color: '#ec4899' },
            ]);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#090d16', color: '#fff', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px 8px', borderBottom: '1px solid #1e293b', background: '#0e1526' }}>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: '#38bdf8' }}>📚 Lista Virtualizada</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>Renderizado eficiente con <code style={{ color: '#a855f7' }}>FlatList</code></div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => log(`[FlatList] Click en item ID ${item.id}: "${item.nombre}"`)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 12px',
                                    background: '#151d30',
                                    borderRadius: '12px',
                                    border: '1px solid #23304e',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#f1f5f9' }}>{item.nombre}</div>
                                    <span style={{ fontSize: '9px', fontWeight: '800', color: item.color, background: `${item.color}15`, padding: '2px 6px', borderRadius: '4px' }}>
                                        {item.tag}
                                    </span>
                                </div>
                                <ChevronRight size={14} color="#64748b" />
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '8px 12px', background: '#0e1526', borderTop: '1px solid #1e293b', fontSize: '10px', color: '#64748b', textAlign: 'center' }}>
                        Solo renderiza los elementos visibles en el viewport móvil
                    </div>
                </div>
            );
        }
    },
    {
        id: 'router',
        unit: 'Unidad 1.3',
        title: 'Navegación con Expo Router',
        icon: <Navigation size={18} />,
        summary: 'Enrutamiento basado en archivos: _layout.tsx, Tabs y Stack.',
        code: `import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#38bdf8' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <Ionicons name="search" color={color} />
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" color={color} />
        }}
      />
    </Tabs>
  );
}`,
        renderSimulator: ({ log }) => {
            const [tab, setTab] = useState('inicio');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0b1120', color: '#fff' }}>
                    {/* Header Stack */}
                    <div style={{ padding: '12px 16px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8' }}>
                            {tab === 'inicio' ? '🏠 Feed Principal' : (tab === 'explorar' ? '🔍 Búsqueda & Explorar' : '👤 Perfil de Alumno')}
                        </div>
                        <span style={{ fontSize: '10px', background: '#1f2937', padding: '2px 8px', borderRadius: '999px', color: '#94a3b8' }}>app/(tabs)/{tab}.tsx</span>
                    </div>

                    {/* Content Screen */}
                    <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                        >
                            <div style={{ fontSize: '40px' }}>
                                {tab === 'inicio' ? '📱' : (tab === 'explorar' ? '🧭' : '🎓')}
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: '800' }}>
                                {tab === 'inicio' ? 'Bienvenido a SimuTec Mobile' : (tab === 'explorar' ? 'Catálogo de Recursos' : 'Estudiante: Tec. Software')}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '200px' }}>
                                Expo Router maneja las pantallas según la estructura del sistema de archivos.
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div style={{ height: '56px', background: '#111827', borderTop: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px' }}>
                        {[
                            { id: 'inicio', label: 'Inicio', icon: '🏠' },
                            { id: 'explorar', label: 'Explorar', icon: '🔍' },
                            { id: 'perfil', label: 'Perfil', icon: '👤' },
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTab(t.id);
                                    log(`[Expo Router] Navegando a /(tabs)/${t.id}`);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    color: tab === t.id ? '#38bdf8' : '#64748b',
                                    fontSize: '10px',
                                    fontWeight: tab === t.id ? '800' : '500',
                                    padding: '4px 16px',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>{t.icon}</span>
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'form',
        unit: 'Unidad 2.3',
        title: 'Formularios & Zod Validation',
        icon: <ShieldCheck size={18} />,
        summary: 'Inputs controlados, schema validation con Zod y teclado móvil adaptativo.',
        code: `import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Email inválido (@unpilar.edu.ar)'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const result = userSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
      alert('¡Validación exitosa con Zod!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Iniciar Sesión</Text>
      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}
      <View style={styles.field}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="alumno@unpilar.edu.ar"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button title="Ingresar al Sistema" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 16 },
  field: { marginBottom: 14 },
  label: { color: '#cbd5e1', fontSize: 12, marginBottom: 4 },
  input: { backgroundColor: '#1e293b', padding: 10, borderRadius: 8, color: '#fff', fontSize: 13 },
  errorText: { color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', padding: 8, borderRadius: 6, marginBottom: 12, fontSize: 12 }
});`,
        renderSimulator: ({ log }) => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [error, setError] = useState(null);
            const [success, setSuccess] = useState(false);

            const validate = (e) => {
                e.preventDefault();
                if (!email.includes('@') || !email.includes('.')) {
                    setError('Ingresa un email institucional válido.');
                    setSuccess(false);
                    log('[Zod Error] Email inválido');
                    return;
                }
                if (password.length < 6) {
                    setError('La contraseña debe tener mínimo 6 caracteres.');
                    setSuccess(false);
                    log('[Zod Error] Password menor a 6 chars');
                    return;
                }
                setError(null);
                setSuccess(true);
                log(`[Zod Success] Credenciales validadas: ${email}`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', background: '#0a0f1d', color: '#fff', justifyContent: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8', marginBottom: '4px' }}>
                        🔐 Acceso Estudiantes
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>
                        Validado con <code style={{ color: '#34d399' }}>zod.safeParse()</code>
                    </div>

                    <form onSubmit={validate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: '700' }}>EMAIL:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alumno@unpilar.edu.ar"
                                style={{ width: '100%', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: '700' }}>CONTRASEÑA (MIN 6):</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                            />
                        </div>

                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '8px', borderRadius: '8px', fontSize: '11px' }}>
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#86efac', padding: '8px', borderRadius: '8px', fontSize: '11px' }}>
                                ✅ ¡Formulario validado correctamente!
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{ marginTop: '8px', padding: '12px', background: '#3b82f6', color: '#fff', borderRadius: '10px', fontWeight: '800', fontSize: '13px' }}
                        >
                            Validar y Continuar
                        </button>
                    </form>
                </div>
            );
        }
    },
    {
        id: 'firebase',
        unit: 'Unidad 3.1',
        title: 'Firebase Firestore en Tiempo Real',
        icon: <Database size={18} />,
        summary: 'CRUD con addDoc, deleteDoc y sincronización reactiva onSnapshot.',
        code: `import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FirebaseTaskApp() {
  const [tasks, setTasks] = useState([
    { id: '1', titulo: 'Configurar Expo Router', done: true },
    { id: '2', titulo: 'Crear store con Zustand', done: false },
    { id: '3', titulo: 'Testear en Expo Go', done: false },
  ]);
  const [newTitle, setNewTitle] = useState('');

  const agregarTarea = () => {
    if (!newTitle.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), titulo: newTitle.trim(), done: false }]);
    setNewTitle('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Cloud Firestore</Text>
      <Text style={styles.subtitle}>Sincronización reactiva /tareas</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea móvil..."
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TouchableOpacity style={styles.addBtn} onPress={agregarTarea}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => toggleTask(item.id)}>
            <Text style={styles.checkIcon}>{item.done ? '✅' : '⬜'}</Text>
            <Text style={[styles.taskText, item.done && styles.taskDone]}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1d', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#f97316' },
  subtitle: { fontSize: 11, color: '#94a3b8', marginBottom: 14 },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: { flex: 1, backgroundColor: '#1e293b', borderRadius: 8, padding: 8, color: '#fff', fontSize: 12 },
  addBtn: { backgroundColor: '#f97316', paddingHorizontal: 14, borderRadius: 8, justifyContent: 'center' },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  taskItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 10, borderRadius: 8, marginBottom: 6 },
  checkIcon: { marginRight: 8, fontSize: 12 },
  taskText: { color: '#fff', fontSize: 12, flex: 1 },
  taskDone: { textDecorationLine: 'line-through', color: '#64748b' }
});`,
        renderSimulator: ({ log }) => {
            const [tasks, setTasks] = useState([
                { id: '1', title: 'Configurar proyecto con Expo Router', done: true },
                { id: '2', title: 'Crear store con Zustand', done: false },
                { id: '3', title: 'Testear en dispositivo con Expo Go', done: false },
            ]);
            const [newTitle, setNewTitle] = useState('');

            const addTask = () => {
                if (!newTitle.trim()) return;
                const newTask = { id: Date.now().toString(), title: newTitle.trim(), done: false };
                setTasks(prev => [...prev, newTask]);
                log(`[Firestore Mock] addDoc("tareas", { title: "${newTitle}" }) -> onSnapshot() emitido`);
                setNewTitle('');
            };

            const toggle = (id) => {
                setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
                log(`[Firestore Mock] updateDoc("tareas/${id}") sincronizado`);
            };

            const remove = (id) => {
                setTasks(prev => prev.filter(t => t.id !== id));
                log(`[Firestore Mock] deleteDoc("tareas/${id}")`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div>
                            <div style={{ fontSize: '15px', fontWeight: '800', color: '#f97316' }}>🔥 Firebase Firestore</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Colección en tiempo real: <code style={{ color: '#fbbf24' }}>/tareas</code></div>
                        </div>
                        <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                            ● Conectado
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            placeholder="Nueva tarea móvil..."
                            style={{ flex: 1, padding: '8px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                        />
                        <button
                            onClick={addTask}
                            style={{ padding: '8px 12px', background: '#f97316', color: '#fff', borderRadius: '8px', fontWeight: '800', fontSize: '11px' }}
                        >
                            +
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {tasks.map(t => (
                            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#151d30', borderRadius: '8px', border: '1px solid #23304e' }}>
                                <input
                                    type="checkbox"
                                    checked={t.done}
                                    onChange={() => toggle(t.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span style={{ flex: 1, fontSize: '11px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#f1f5f9' }}>
                                    {t.title}
                                </span>
                                <button
                                    onClick={() => remove(t.id)}
                                    style={{ background: 'none', color: '#ef4444', fontSize: '11px', padding: '2px 4px' }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'hardware',
        unit: 'Unidad 2.4',
        title: 'Hardware & Sensores (GPS/Cámara)',
        icon: <Camera size={18} />,
        summary: 'Permisos del sistema operativo y acceso a expo-camera y expo-location.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { CameraView } from 'expo-camera';

export default function SensorCameraApp() {
  const [coords, setCoords] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);

  const requestGps = async () => {
    setCoords({ lat: -34.4586, lng: -58.9142 });
  };

  const snapPhoto = () => {
    setPhotoCount(c => c + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Hardware & Sensores</Text>
      <Text style={styles.subtitle}>Cámara y GPS con Expo</Text>

      <CameraView style={styles.camera}>
        <Text style={styles.cameraLabel}>
          {photoCount > 0 ? \`Fotos tomadas: \${photoCount}\` : '📷 Visor de Cámara'}
        </Text>
      </CameraView>

      <TouchableOpacity style={styles.camBtn} onPress={snapPhoto}>
        <Text style={styles.btnText}>Tomar Foto</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Sensor GPS:</Text>
        {coords ? (
          <Text style={styles.gpsText}>Lat: {coords.lat}, Lng: {coords.lng}</Text>
        ) : (
          <TouchableOpacity style={styles.gpsBtn} onPress={requestGps}>
            <Text style={styles.btnText}>Obtener Ubicación</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1d', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#34d399' },
  subtitle: { fontSize: 11, color: '#94a3b8', marginBottom: 12 },
  camera: { height: 130, backgroundColor: '#1e293b', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  cameraLabel: { color: '#94a3b8', fontSize: 12 },
  camBtn: { backgroundColor: '#059669', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  card: { backgroundColor: '#1e293b', padding: 12, borderRadius: 8 },
  cardTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  gpsBtn: { backgroundColor: '#0284c7', padding: 8, borderRadius: 6, alignItems: 'center' },
  gpsText: { color: '#38bdf8', fontSize: 12 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});`,
        renderSimulator: ({ log }) => {
            const [hasGps, setHasGps] = useState(false);
            const [coords, setCoords] = useState(null);
            const [flash, setFlash] = useState(false);
            const [photoCount, setPhotoCount] = useState(0);

            const requestGps = () => {
                log('[Permissions] Location.requestForegroundPermissionsAsync() -> GRANTED');
                setHasGps(true);
                setCoords({ lat: -34.4586, lng: -58.9142, city: 'Pilar, Prov. Buenos Aires' });
                log('[Location] Coordenadas UNPilar obtenidas: -34.4586, -58.9142');
            };

            const snapPhoto = () => {
                setFlash(true);
                setTimeout(() => setFlash(false), 200);
                setPhotoCount(c => c + 1);
                log(`[Camera] Foto capturada #${photoCount + 1} guardada en cache`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050811', color: '#fff', padding: '14px', position: 'relative' }}>
                    {flash && (
                        <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 10, pointerEvents: 'none' }} />
                    )}

                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#34d399', marginBottom: '2px' }}>
                        📡 Sensores del Dispositivo
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '12px' }}>
                        Permisos nativos en runtime (Android & iOS)
                    </div>

                    {/* Camera Mock Viewfinder */}
                    <div style={{
                        flex: 1,
                        background: '#111c2e',
                        borderRadius: '12px',
                        border: '2px dashed #334155',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '12px',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <Camera size={36} color="#38bdf8" style={{ marginBottom: '6px' }} />
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>Visor de Cámara Simulado</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Fotos tomadas: {photoCount}</div>

                        <button
                            onClick={snapPhoto}
                            style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '999px', background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '800' }}
                        >
                            📸 Disparar Obturador
                        </button>
                    </div>

                    {/* GPS Widget */}
                    <div style={{ marginTop: '10px', background: '#0e1626', padding: '10px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                        {!hasGps ? (
                            <button
                                onClick={requestGps}
                                style={{ width: '100%', padding: '8px', background: '#10b981', color: '#fff', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}
                            >
                                📍 Solicitar Permiso de Ubicación
                            </button>
                        ) : (
                            <div style={{ fontSize: '10px' }}>
                                <div style={{ color: '#34d399', fontWeight: '800' }}>✓ Permiso GPS Concedido</div>
                                <div style={{ color: '#cbd5e1', marginTop: '2px' }}>Lat: {coords.lat} | Lng: {coords.lng}</div>
                                <div style={{ color: '#94a3b8', fontSize: '9px' }}>{coords.city}</div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'animations',
        unit: 'Unidad 3.2',
        title: 'Animaciones con Reanimated 3',
        icon: <Sparkles size={18} />,
        summary: 'Microinteracciones fluidas a 60 FPS corriendo directamente en el UI Thread.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function BounceBox() {
  const [active, setActive] = useState(false);

  const onPress = () => {
    setActive(a => !a);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>UNIDAD 3.2 • REANIMATED</Text>
      <TouchableOpacity
        style={[styles.box, active && styles.boxActive]}
        onPress={onPress}
      >
        <Text style={styles.boxText}>{active ? '🚀 60 FPS' : '✨ Tócame'}</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Microinteracción fluida ejecutada en el hilo nativo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090d16', alignItems: 'center', justifyContent: 'center', padding: 20 },
  badge: { color: '#a855f7', fontSize: 11, fontWeight: 'bold', backgroundColor: 'rgba(168,85,247,0.1)', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 999, marginBottom: 20 },
  box: { width: 110, height: 110, backgroundColor: '#a855f7', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  boxActive: { backgroundColor: '#ec4899', borderRadius: 30 },
  boxText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  info: { color: '#94a3b8', fontSize: 11, textAlign: 'center', marginTop: 20 }
});`,
        renderSimulator: ({ log }) => {
            const [active, setActive] = useState(false);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#090d16', color: '#fff', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#a855f7', background: 'rgba(168,85,247,0.1)', padding: '3px 10px', borderRadius: '999px', marginBottom: '14px' }}>
                        UNIDAD 3.2 • UI THREAD
                    </div>

                    <motion.div
                        animate={{
                            scale: active ? 1.25 : 1,
                            rotate: active ? 10 : 0,
                            borderRadius: active ? '30px' : '16px'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        onClick={() => {
                            setActive(a => !a);
                            log(`[Reanimated 3] withSpring(scale: ${active ? 1 : 1.25}) ejecutado en UI Thread nativo`);
                        }}
                        style={{
                            width: '110px',
                            height: '110px',
                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(168,85,247,0.4)',
                            userSelect: 'none'
                        }}
                    >
                        <Sparkles size={28} color="#fff" />
                        <span style={{ fontSize: '11px', fontWeight: '900', marginTop: '4px' }}>Tócame</span>
                    </motion.div>

                    <div style={{ marginTop: '20px', fontSize: '11px', color: '#94a3b8', maxWidth: '200px' }}>
                        ¡No bloquea el hilo de JavaScript! Corre a 60/120 FPS sin caídas de frames.
                    </div>
                </div>
            );
        }
    },
    {
        id: 'api',
        unit: 'Unidad 2.2',
        title: 'Consumo de APIs (Fetch)',
        icon: <Database size={18} />,
        summary: 'Peticiones de red asíncronas para obtener y mostrar datos remotos.',
        code: `import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function ApiExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0284c7" style={{marginTop: 50}}/>;

  return (
    <FlatList 
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { color: 'gray' }
});`,
        renderSimulator: ({ log }) => {
            const [users, setUsers] = useState([]);
            const [loading, setLoading] = useState(false);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Usuarios Remotos</div>
                        <button 
                            onClick={() => {
                                setLoading(true);
                                log('[Fetch] Requesting GET https://jsonplaceholder.typicode.com/users...');
                                setTimeout(() => {
                                    setUsers([{id:1, name: 'Leanne Graham', email: 'Sincere@april.biz'}, {id:2, name: 'Ervin Howell', email: 'Shanna@melissa.tv'}, {id:3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net'}]);
                                    setLoading(false);
                                    log('[Fetch] Status 200 OK - 3 users received');
                                }, 1200);
                            }}
                            style={{ marginTop: '10px', padding: '8px 12px', background: '#0284c7', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', width: '100%' }}
                        >
                            {loading ? 'Cargando...' : 'Obtener Usuarios (fetch)'}
                        </button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {loading && <div style={{ textAlign: 'center', padding: '20px', color: '#0284c7' }}>cargando...</div>}
                        {!loading && users.map(u => (
                            <div key={u.id} style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                                <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>{u.name}</div>
                                <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>{u.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    },
    {
        id: 'supabase_crud',
        unit: 'Unidad 2.2 • APIs REST & Base de Datos',
        title: 'CRUD PostgreSQL en la Nube con Supabase',
        icon: <Database size={18} />,
        summary: 'Conexión y gestión completa de inventario con PostgreSQL en Supabase: funciones select, insert, update y delete con PostgREST y SQL en vivo.',
        code: `// =======================================================
// CONEXIÓN A API & CRUD POSTGRESQL CON SUPABASE
// Cátedra Creación de Aplicaciones Móviles • UNPilar / UTN
// =======================================================

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator, Alert, Modal
} from 'react-native';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. INICIALIZACIÓN DEL CLIENTE SUPABASE CON ASYNCSTORAGE
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOi...';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// 2. MODELO DE DATOS
// Campos: id, nombre, categoria, precio, stock, activo, created_at

export default function SupabaseCrudScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  // Formulario modal
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('IoT');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    fetchProductos();
  }, [filtroCategoria]);

  // =====================================================
  // FUNCIÓN 1: READ (Obtener Productos de PostgreSQL)
  // =====================================================
  const fetchProductos = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('productos')
        .select('*')
        .order('id', { ascending: false });

      if (filtroCategoria !== 'Todos') {
        query = query.eq('categoria', filtroCategoria);
      }

      const { data, error } = await query;
      if (error) throw error;
      setProductos(data || []);
    } catch (err) {
      Alert.alert('Error READ PostgreSQL', err.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FUNCIÓN 2: CREATE (Insertar Registro con PostgREST)
  // =====================================================
  const crearProducto = async () => {
    if (!nombre.trim() || !precio || !stock) {
      Alert.alert('Validación', 'Completa todos los campos.');
      return;
    }

    try {
      setLoading(true);
      const nuevo = {
        nombre: nombre.trim(),
        categoria,
        precio: parseFloat(precio),
        stock: parseInt(stock, 10),
        activo: true
      };

      const { data, error } = await supabase
        .from('productos')
        .insert([nuevo])
        .select(); // Retorna el registro con ID generado

      if (error) throw error;
      Alert.alert('Éxito', 'Registro insertado en PostgreSQL.');
      setModalVisible(false);
      setNombre('');
      setPrecio('');
      setStock('');
      fetchProductos();
    } catch (err) {
      Alert.alert('Error INSERT', err.message);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FUNCIÓN 3: UPDATE (Actualizar Stock o Precio)
  // =====================================================
  const actualizarStock = async (id, nuevoStock) => {
    try {
      const { error } = await supabase
        .from('productos')
        .update({ stock: nuevoStock })
        .eq('id', id);

      if (error) throw error;
      // Actualizar estado local inmediatamente
      setProductos(prev => prev.map(p => p.id === id ? { ...p, stock: nuevoStock } : p));
    } catch (err) {
      Alert.alert('Error UPDATE', err.message);
    }
  };

  // =====================================================
  // FUNCIÓN 4: DELETE (Eliminar Fila de PostgreSQL)
  // =====================================================
  const eliminarProducto = async (id) => {
    try {
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProductos(prev => prev.filter(p => p.id !== id));
      Alert.alert('Eliminado', 'Producto borrado de PostgreSQL.');
    } catch (err) {
      Alert.alert('Error DELETE', err.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Lista de productos y controles */}
    </View>
  );
}

// =======================================================
// SCRIPT SQL PARA SUPABASE SQL EDITOR:
// -------------------------------------------------------
// CREATE TABLE public.productos (
//   id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
//   nombre TEXT NOT NULL,
//   categoria TEXT NOT NULL DEFAULT 'General',
//   precio NUMERIC(10,2) NOT NULL DEFAULT 0.00,
//   stock INT NOT NULL DEFAULT 0,
//   activo BOOLEAN DEFAULT TRUE,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Acceso Publico" ON public.productos FOR ALL USING (true);
// =======================================================`,
        renderSimulator: ({ log }) => {
            const [items, setItems] = useState([
                { id: 101, nombre: 'ESP32 NodeMCU Wi-Fi + Bluetooth', categoria: 'IoT', precio: 12500, stock: 24, activo: true },
                { id: 102, nombre: 'Sensor Ultrasónico HC-SR04', categoria: 'Sensores', precio: 3200, stock: 45, activo: true },
                { id: 103, nombre: 'Kit Chasis Robot 2WD con Motores', categoria: 'Robótica', precio: 28900, stock: 8, activo: true },
                { id: 104, nombre: 'Soldador tipo Lápiz 60W Cerámico', categoria: 'Herramientas', precio: 18400, stock: 12, activo: true },
                { id: 105, nombre: 'Tester Multímetro Digital Auto-Rango', categoria: 'Herramientas', precio: 34500, stock: 5, activo: true }
            ]);
            const [selectedCategory, setSelectedCategory] = useState('Todos');
            const [searchQuery, setSearchQuery] = useState('');
            const [showModal, setShowModal] = useState(false);
            const [nuevoNombre, setNuevoNombre] = useState('');
            const [nuevaCategoria, setNuevaCategoria] = useState('IoT');
            const [nuevoPrecio, setNuevoPrecio] = useState('');
            const [nuevoStock, setNuevoStock] = useState('');
            const [lastSql, setLastSql] = useState({
                verb: 'SELECT',
                endpoint: 'GET /rest/v1/productos?select=*&order=id.desc',
                sql: 'SELECT * FROM public.productos ORDER BY id DESC;',
                latency: '34ms',
                status: '200 OK'
            });
            const [activeTab, setActiveTab] = useState('lista'); // 'lista' | 'sql'

            const categories = ['Todos', 'IoT', 'Sensores', 'Robótica', 'Herramientas'];

            const filteredItems = items.filter(it => {
                const matchCat = selectedCategory === 'Todos' || it.categoria === selectedCategory;
                const matchSearch = it.nombre.toLowerCase().includes(searchQuery.toLowerCase());
                return matchCat && matchSearch;
            });

            // CREATE
            const handleCreate = () => {
                if (!nuevoNombre.trim() || !nuevoPrecio || !nuevoStock) {
                    alert('Por favor completa todos los campos del producto.');
                    return;
                }
                const newId = Math.max(...items.map(i => i.id), 100) + 1;
                const newItem = {
                    id: newId,
                    nombre: nuevoNombre.trim(),
                    categoria: nuevaCategoria,
                    precio: parseFloat(nuevoPrecio) || 0,
                    stock: parseInt(nuevoStock, 10) || 0,
                    activo: true
                };
                setItems([newItem, ...items]);
                setLastSql({
                    verb: 'INSERT',
                    endpoint: 'POST /rest/v1/productos',
                    sql: `INSERT INTO public.productos (nombre, categoria, precio, stock, activo)\nVALUES ('${newItem.nombre}', '${newItem.categoria}', ${newItem.precio}, ${newItem.stock}, true)\nRETURNING *;`,
                    latency: '42ms',
                    status: '201 Created'
                });
                log(`[PostgreSQL INSERT] ID #${newId} insertado: "${newItem.nombre}" (HTTP 201 Created)`);
                setShowModal(false);
                setNuevoNombre('');
                setNuevoPrecio('');
                setNuevoStock('');
            };

            // UPDATE (Stock)
            const handleUpdateStock = (id, delta) => {
                const item = items.find(i => i.id === id);
                if (!item) return;
                const updatedStock = Math.max(0, item.stock + delta);
                setItems(items.map(i => i.id === id ? { ...i, stock: updatedStock } : i));
                setLastSql({
                    verb: 'UPDATE',
                    endpoint: `PATCH /rest/v1/productos?id=eq.${id}`,
                    sql: `UPDATE public.productos SET stock = ${updatedStock} WHERE id = ${id}; (delta: ${delta > 0 ? '+' + delta : delta})`,
                    latency: '28ms',
                    status: '200 OK'
                });
                log(`[PostgreSQL UPDATE] ID #${id} nuevo stock: ${updatedStock} (HTTP 200 OK)`);
            };

            // DELETE
            const handleDelete = (id, nombre) => {
                if (!window.confirm(`¿Eliminar de PostgreSQL el registro #${id} ("${nombre}")?`)) return;
                setItems(items.filter(i => i.id !== id));
                setLastSql({
                    verb: 'DELETE',
                    endpoint: `DELETE /rest/v1/productos?id=eq.${id}`,
                    sql: `DELETE FROM public.productos WHERE id = ${id};`,
                    latency: '24ms',
                    status: '204 No Content'
                });
                log(`[PostgreSQL DELETE] ID #${id} eliminado de la base de datos (HTTP 204 No Content)`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', overflow: 'hidden' }}>
                    {/* Header Supabase */}
                    <div style={{ padding: '12px 14px', background: '#0f172a', borderBottom: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                                <span style={{ fontSize: '12px', fontWeight: '900', color: '#38bdf8' }}>Supabase PostgreSQL</span>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <button
                                    onClick={() => setActiveTab('lista')}
                                    style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', border: 'none', background: activeTab === 'lista' ? '#0284c7' : 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer' }}
                                >
                                    📱 App Móvil
                                </button>
                                <button
                                    onClick={() => setActiveTab('sql')}
                                    style={{ padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '800', border: 'none', background: activeTab === 'sql' ? '#10b981' : 'rgba(255,255,255,0.08)', color: '#fff', cursor: 'pointer' }}
                                >
                                    🖥️ SQL Monitor
                                </button>
                            </div>
                        </div>

                        {/* Top bar search and action */}
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <input
                                type="text"
                                placeholder="🔍 Buscar producto en PostgreSQL..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '6px 10px', color: '#fff', fontSize: '11px', outline: 'none' }}
                            />
                            <button
                                onClick={() => setShowModal(true)}
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '8px', padding: '0 10px', color: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            >
                                <span>➕</span> Crear
                            </button>
                        </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div style={{ display: 'flex', gap: '4px', padding: '8px 12px', background: '#0a0f1d', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSelectedCategory(cat);
                                    log(`[PostgreSQL READ] Filtrar categoría = "${cat}"`);
                                }}
                                style={{
                                    padding: '3px 9px',
                                    borderRadius: '12px',
                                    fontSize: '10px',
                                    fontWeight: '700',
                                    border: '1px solid',
                                    borderColor: selectedCategory === cat ? '#38bdf8' : 'rgba(255,255,255,0.1)',
                                    background: selectedCategory === cat ? 'rgba(56,189,248,0.15)' : 'transparent',
                                    color: selectedCategory === cat ? '#38bdf8' : '#94a3b8',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* VISTA 1: APP MÓVIL (LISTA DE PRODUCTOS) */}
                    {activeTab === 'lista' && (
                        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {filteredItems.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
                                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔍</div>
                                    <div style={{ fontSize: '12px', fontWeight: '700' }}>No hay registros en la tabla</div>
                                    <div style={{ fontSize: '10px' }}>Prueba con otro filtro o haz click en "Crear"</div>
                                </div>
                            ) : (
                                filteredItems.map(item => (
                                    <div
                                        key={item.id}
                                        style={{
                                            background: '#111827',
                                            border: '1px solid #1f2937',
                                            borderRadius: '10px',
                                            padding: '10px 12px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '6px'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                                                    <span style={{ fontSize: '9px', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '1px 5px', borderRadius: '4px', fontWeight: '800' }}>
                                                        #{item.id}
                                                    </span>
                                                    <span style={{ fontSize: '9px', background: 'rgba(168,85,247,0.15)', color: '#c084fc', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                                                        {item.categoria}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: '12px', fontWeight: '800', color: '#f8fafc' }}>
                                                    {item.nombre}
                                                </div>
                                            </div>
                                            <div style={{ fontSize: '13px', fontWeight: '900', color: '#10b981' }}>
                                                $${item.precio.toLocaleString()}
                                            </div>
                                        </div>

                                        {/* Acciones de Edición de Stock & Delete */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '6px', borderTop: '1px solid #1e293b' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <span style={{ fontSize: '10px', color: '#94a3b8' }}>Stock:</span>
                                                <span style={{ fontSize: '11px', fontWeight: '800', color: item.stock <= 5 ? '#f43f5e' : '#fff' }}>
                                                    {item.stock} un.
                                                </span>
                                                <div style={{ display: 'flex', gap: '2px', marginLeft: '4px' }}>
                                                    <button
                                                        onClick={() => handleUpdateStock(item.id, -1)}
                                                        style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid #334155', background: '#1e293b', color: '#cbd5e1', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStock(item.id, 1)}
                                                        style={{ width: '20px', height: '20px', borderRadius: '4px', border: '1px solid #334155', background: '#1e293b', color: '#cbd5e1', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(item.id, item.nombre)}
                                                style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', borderRadius: '6px', padding: '3px 8px', fontSize: '10px', fontWeight: '800', cursor: 'pointer' }}
                                            >
                                                🗑️ Borrar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* VISTA 2: MONITOR SQL POSTGRESQL & POSTGREST */}
                    {activeTab === 'sql' && (
                        <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#050813' }}>
                            <div style={{ background: '#0b1120', border: '1px solid #1e293b', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <span style={{ fontSize: '10px', fontWeight: '900', color: '#38bdf8' }}>Última Petición REST (PostgREST)</span>
                                    <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '1px 6px', borderRadius: '4px', fontWeight: '800' }}>
                                        {lastSql.status} • {lastSql.latency}
                                    </span>
                                </div>
                                <code style={{ fontSize: '11px', color: '#f59e0b', fontFamily: 'monospace', display: 'block' }}>
                                    {lastSql.endpoint}
                                </code>
                            </div>

                            <div style={{ background: '#0b1120', border: '1px solid #1e293b', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ fontSize: '10px', fontWeight: '900', color: '#10b981', marginBottom: '6px' }}>
                                    Sentencia SQL PostgreSQL Ejecutada en Cloud
                                </div>
                                <pre style={{ margin: 0, fontSize: '10px', color: '#38bdf8', fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                                    {lastSql.sql}
                                </pre>
                            </div>

                            <div style={{ background: '#0b1120', border: '1px solid #1e293b', borderRadius: '10px', padding: '10px' }}>
                                <div style={{ fontSize: '10px', fontWeight: '900', color: '#c084fc', marginBottom: '4px' }}>
                                    Esquema de Tabla en Supabase
                                </div>
                                <div style={{ fontSize: '9px', color: '#94a3b8', lineHeight: 1.4 }}>
                                    • <code>id</code> (bigint primary key autoincremental)<br />
                                    • <code>nombre</code> (text not null)<br />
                                    • <code>categoria</code> (text not null default 'General')<br />
                                    • <code>precio</code> (numeric(10,2) not null)<br />
                                    • <code>stock</code> (int not null default 0)<br />
                                    • <code>activo</code> (boolean default true)
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal Crear Producto */}
                    {showModal && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px', zIndex: 100 }}>
                            <div style={{ background: '#111827', border: '1px solid #334155', borderRadius: '14px', padding: '14px', width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#38bdf8' }}>Nuevo Producto (INSERT)</span>
                                    <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>✕</button>
                                </div>
                                <div>
                                    <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '2px' }}>Nombre:</div>
                                    <input
                                        type="text"
                                        placeholder="Ej: Arduino Uno R3"
                                        value={nuevoNombre}
                                        onChange={e => setNuevoNombre(e.target.value)}
                                        style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '5px 8px', color: '#fff', fontSize: '11px' }}
                                    />
                                </div>
                                <div>
                                    <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '2px' }}>Categoría:</div>
                                    <select
                                        value={nuevaCategoria}
                                        onChange={e => setNuevaCategoria(e.target.value)}
                                        style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '5px 8px', color: '#fff', fontSize: '11px' }}
                                    >
                                        <option value="IoT">IoT</option>
                                        <option value="Sensores">Sensores</option>
                                        <option value="Robótica">Robótica</option>
                                        <option value="Herramientas">Herramientas</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '2px' }}>Precio ($):</div>
                                        <input
                                            type="number"
                                            placeholder="1500"
                                            value={nuevoPrecio}
                                            onChange={e => setNuevoPrecio(e.target.value)}
                                            style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '5px 8px', color: '#fff', fontSize: '11px' }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: '9px', color: '#94a3b8', marginBottom: '2px' }}>Stock:</div>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            value={nuevoStock}
                                            onChange={e => setNuevoStock(e.target.value)}
                                            style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '6px', padding: '5px 8px', color: '#fff', fontSize: '11px' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1px solid #475569', background: 'transparent', color: '#cbd5e1', fontSize: '11px', cursor: 'pointer' }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleCreate}
                                        style={{ flex: 1, padding: '6px', borderRadius: '6px', border: 'none', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                                    >
                                        Guardar SQL
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer con estado de conexión */}
                    <div style={{ padding: '6px 12px', background: '#0e1526', borderTop: '1px solid #1e293b', fontSize: '9px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>PostgreSQL v16 Cloud</span>
                        <span style={{ color: '#10b981' }}>● PostgREST Conectado</span>
                    </div>
                </div>
            );
        }
    },
    {
        id: 'eas',
        unit: 'Unidad 3.3',
        title: 'EAS Build & Deploy',
        icon: <Zap size={18} />,
        summary: 'Compilación en la nube de binarios para Android (APK/AAB) e iOS (IPA).',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EasDashboard() {
  const [status, setStatus] = useState('idle');

  const buildApk = () => {
    setStatus('building');
    setTimeout(() => setStatus('done'), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 EAS Build Dashboard</Text>
      <Text style={styles.subtitle}>Perfil de compilación: preview (APK)</Text>

      {status === 'idle' && (
        <TouchableOpacity style={styles.btn} onPress={buildApk}>
          <Text style={styles.btnText}>Compilar APK en la Nube</Text>
        </TouchableOpacity>
      )}

      {status === 'building' && (
        <View style={styles.terminal}>
          <Text style={styles.log}>[✔] Configuración eas.json cargada</Text>
          <Text style={styles.log}>[✔] Subiendo archivos del proyecto...</Text>
          <Text style={styles.logPending}>[⚙] Compilando con Gradle en la nube...</Text>
        </View>
      )}

      {status === 'done' && (
        <View style={styles.terminal}>
          <Text style={styles.logSuccess}>[✔] Compilación exitosa!</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🤖 Android APK Generado</Text>
            <Text style={styles.cardLink}>https://expo.dev/artifacts/eas/app.apk</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#10b981' },
  subtitle: { fontSize: 11, color: '#94a3b8', marginBottom: 16 },
  btn: { backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 13 },
  terminal: { backgroundColor: '#111827', padding: 12, borderRadius: 8, gap: 6 },
  log: { color: '#10b981', fontSize: 11 },
  logPending: { color: '#f59e0b', fontSize: 11 },
  logSuccess: { color: '#10b981', fontWeight: 'bold', fontSize: 13 },
  card: { backgroundColor: '#1f2937', padding: 10, borderRadius: 6, marginTop: 8 },
  cardTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cardLink: { color: '#38bdf8', fontSize: 10, marginTop: 4 }
});`,
        renderSimulator: ({ log }) => {
            const [status, setStatus] = useState('idle');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#10b981', fontFamily: 'monospace', padding: '16px', fontSize: '11px' }}>
                    <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '16px' }}>$ eas build -p android --profile preview</div>
                    
                    {status === 'idle' && (
                        <button 
                            onClick={() => {
                                setStatus('building');
                                log('[EAS] Iniciando Job de compilación en los servidores de Expo');
                                setTimeout(() => { setStatus('done'); log('[EAS] Build exitoso. APK generado.'); }, 2000);
                            }}
                            style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Ejecutar Build
                        </button>
                    )}
                    {status === 'building' && (
                        <div>
                            <div>[✔] Project initialized</div>
                            <div style={{ marginTop: '8px' }}>[✔] Uploading project files...</div>
                            <div style={{ marginTop: '8px' }}>[⚙] Building Android app (Gradle)...</div>
                            <div style={{ color: '#f59e0b', marginTop: '8px' }}><div className="spinner" style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</div> Compilando en la nube (Queue: 1)</div>
                        </div>
                    )}
                    {status === 'done' && (
                        <div>
                            <div style={{ color: '#10b981' }}>[✔] Build successful!</div>
                            <div style={{ marginTop: '16px', background: '#111', padding: '10px', borderRadius: '6px', border: '1px solid #333' }}>
                                <div style={{ color: '#fff' }}>🤖 Android APK</div>
                                <div style={{ color: '#3b82f6', marginTop: '6px' }}>https://expo.dev/artifacts/eas/123456.apk</div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    },
    {
        id: 'ai',
        unit: 'Unidad 3.4',
        title: 'Asistencia con IA',
        icon: <Terminal size={18} />,
        summary: 'Uso de LLMs para resolver bugs, refactorizar o generar boilerplate de RN.',
        code: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AiAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('¡Hola! Soy tu tutor IA. Pregúntame sobre componentes, estado o navegación.');

  const ask = () => {
    if (!query.trim()) return;
    setResponse(\`💡 Respuesta sobre "\${query}": En React Native todo contenedor usa Flexbox por defecto y los estilos se optimizan con StyleSheet.\`);
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Asistente IA React Native</Text>
      <View style={styles.chatCard}>
        <Text style={styles.chatText}>{response}</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Pregunta sobre React Native..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.btn} onPress={ask}>
          <Text style={styles.btnText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1d', padding: 16, justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8', marginBottom: 12 },
  chatCard: { flex: 1, backgroundColor: '#1e293b', borderRadius: 10, padding: 14, marginBottom: 12 },
  chatText: { color: '#f8fafc', fontSize: 12, lineHeight: 18 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#1e293b', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, color: '#fff', fontSize: 12 },
  btn: { backgroundColor: '#38bdf8', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 14 }
});`,
        renderSimulator: ({ log }) => {
            const [query, setQuery] = useState('');
            const [response, setResponse] = useState('');

            return (
                <div style={{ flex: 1, background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px', background: '#0f172a', borderBottom: '1px solid #334155', color: '#fff', fontWeight: 'bold' }}>
                        ✨ Asistente IA (Mock)
                    </div>
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                        {response && (
                            <div style={{ background: '#334155', padding: '12px', borderRadius: '8px', color: '#f8fafc', fontSize: '13px', lineHeight: 1.5 }}>
                                {response}
                            </div>
                        )}
                    </div>
                    <div style={{ padding: '12px', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
                        <input 
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Haz una pregunta de React Native..."
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: 'none', background: '#0f172a', color: '#fff', fontSize: '12px', outline: 'none' }}
                        />
                        <button 
                            onClick={() => {
                                if(!query.trim()) return;
                                log(`[IA] Procesando query: "${query}"`);
                                setResponse('En React Native, puedes usar KeyboardAvoidingView para evitar que el teclado oculte los inputs. Por ejemplo:\\n\\n<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>\\n ... \\n</KeyboardAvoidingView>');
                                setQuery('');
                            }}
                            style={{ background: '#38bdf8', border: 'none', borderRadius: '20px', padding: '0 16px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            ↗
                        </button>
                    </div>
                </div>
            )
        }
    }
,
    {
        id: 'ecommerce_cart',
        unit: 'Unidad 2 & 3 • App Completa',
        title: 'Tienda Móvil con Carro de Compras',
        icon: <ShoppingCart size={18} />,
        summary: 'Arquitectura completa con Zustand: catálogo de productos, carrito reactivo con badge, incremento/decremento, cálculo de total y checkout.',
        code: `import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native';
// En un proyecto real: import { create } from 'zustand';

// 1. MODELO DE DATOS Y STORE GLOBAL
// El store gestiona los items agregados, cantidades y el cálculo del total
export const useCartStore = {
  // Estado inicial simulado:
  // items: [{ id: '1', nombre: 'Arduino Uno R4', precio: 28500, qty: 1 }]
  // addItem(producto), removeItem(id), updateQty(id, delta), clearCart()
};

const PRODUCTOS = [
  { id: '1', nombre: 'Arduino Uno R4 WiFi', categoria: 'Placas', precio: 28500, stock: 12, icono: '🤖' },
  { id: '2', nombre: 'ESP32-CAM OV2640', categoria: 'IoT', precio: 14200, stock: 18, icono: '📷' },
  { id: '3', nombre: 'Kit Chasis Robot 2WD', categoria: 'Robótica', precio: 19900, stock: 7, icono: '🏎️' },
  { id: '4', nombre: 'Sensor Línea TCRT5000', categoria: 'Sensores', precio: 6500, stock: 25, icono: '📡' },
  { id: '5', nombre: 'Display LCD 16x2 I2C', categoria: 'Pantallas', precio: 5800, stock: 14, icono: '📟' },
  { id: '6', nombre: 'Módulo Relay 4 Canales', categoria: 'Actuadores', precio: 8200, stock: 9, icono: '⚡' },
];

export default function TiendaConCarritoApp() {
  const [tab, setTab] = useState('catalogo'); // 'catalogo' | 'carrito' | 'checkout'
  const [categoria, setCategoria] = useState('Todos');
  const [carrito, setCarrito] = useState([
    { id: '1', nombre: 'Arduino Uno R4 WiFi', precio: 28500, qty: 1, icono: '🤖' }
  ]);

  // Funciones de mutación del carrito
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...producto, qty: 1 }];
    });
  };

  const modificarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(p => {
      if (p.id === id) {
        const nuevaQty = p.qty + delta;
        return nuevaQty > 0 ? { ...p, qty: nuevaQty } : null;
      }
      return p;
    }).filter(Boolean));
  };

  const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.qty), 0);
  const descuento = subtotal * 0.10; // 10% descuento alumno
  const total = subtotal - descuento;
  const totalItems = carrito.reduce((acc, item) => acc + item.qty, 0);

  return (
    <View style={styles.container}>
      {/* Barra superior con Badge del Carrito */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>⚡ ElectroTech UTN</Text>
        <TouchableOpacity style={styles.cartBadgeBtn} onPress={() => setTab('carrito')}>
          <Text style={styles.cartIconText}>🛒</Text>
          {totalItems > 0 && (
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Navegación por pestañas */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, tab === 'catalogo' && styles.tabActive]} onPress={() => setTab('catalogo')}>
          <Text style={[styles.tabText, tab === 'catalogo' && styles.tabTextActive]}>Catálogo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, tab === 'carrito' && styles.tabActive]} onPress={() => setTab('carrito')}>
          <Text style={[styles.tabText, tab === 'carrito' && styles.tabTextActive]}>Carrito ({totalItems})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem, tab === 'checkout' && styles.tabActive]} onPress={() => setTab('checkout')}>
          <Text style={[styles.tabText, tab === 'checkout' && styles.tabTextActive]}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Pantalla 1: Catálogo de Productos */}
      {tab === 'catalogo' && (
        <FlatList
          data={PRODUCTOS.filter(p => categoria === 'Todos' || p.categoria === categoria)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemIcon}>{item.icono}</Text>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemPrice}>\${item.precio.toLocaleString('es-AR')}</Text>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={() => agregarAlCarrito(item)}>
                <Text style={styles.addBtnText}>+ Agregar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Pantalla 2: Carrito con Incremento/Decremento */}
      {tab === 'carrito' && (
        <View style={styles.cartView}>
          <FlatList
            data={carrito}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartRow}>
                <Text style={styles.itemIcon}>{item.icono}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cartItemName}>{item.nombre}</Text>
                  <Text style={styles.cartItemPrice}>\${(item.precio * item.qty).toLocaleString('es-AR')}</Text>
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity style={styles.stepperBtn} onPress={() => modificarCantidad(item.id, -1)}>
                    <Text style={styles.stepperText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.stepperVal}>{item.qty}</Text>
                  <TouchableOpacity style={styles.stepperBtn} onPress={() => modificarCantidad(item.id, 1)}>
                    <Text style={styles.stepperText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Final (con desc. UTN):</Text>
            <Text style={styles.totalAmount}>\${total.toLocaleString('es-AR')}</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => setTab('checkout')}>
              <Text style={styles.checkoutBtnText}>Proceder al Pago ➔</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Pantalla 3: Checkout y Confirmación */}
      {tab === 'checkout' && (
        <View style={styles.checkoutView}>
          <Text style={styles.checkoutTitle}>Resumen de Orden</Text>
          <Text style={styles.checkoutSummary}>Artículos: {totalItems} unidades</Text>
          <Text style={styles.checkoutSummary}>Total a pagar: \${total.toLocaleString('es-AR')}</Text>
          <TouchableOpacity style={styles.confirmBtn} onPress={() => alert('¡Compra confirmada! Orden #UTN-2026')}>
            <Text style={styles.confirmBtnText}>Confirmar Pedido 🚀</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120', padding: 16 },
  navbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  navTitle: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8' },
  cartBadgeBtn: { position: 'relative', padding: 6 },
  cartIconText: { fontSize: 20 },
  badgePill: { position: 'absolute', top: 0, right: 0, backgroundColor: '#ef4444', borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  tabBar: { flexDirection: 'row', backgroundColor: '#1e293b', borderRadius: 10, padding: 4, marginBottom: 12 },
  tabItem: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8 },
  tabActive: { backgroundColor: '#0284c7' },
  tabText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151d30', padding: 12, borderRadius: 12, marginBottom: 8, gap: 10 },
  itemIcon: { fontSize: 24 },
  itemInfo: { flex: 1 },
  itemName: { color: '#f1f5f9', fontWeight: 'bold', fontSize: 13 },
  itemPrice: { color: '#10b981', fontSize: 12, marginTop: 2 },
  addBtn: { backgroundColor: '#0284c7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cartView: { flex: 1, justifyContent: 'space-between' },
  cartRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151d30', padding: 10, borderRadius: 10, marginBottom: 8, gap: 10 },
  cartItemName: { color: '#f1f5f9', fontSize: 12, fontWeight: 'bold' },
  cartItemPrice: { color: '#38bdf8', fontSize: 11 },
  stepper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', borderRadius: 6 },
  stepperBtn: { paddingHorizontal: 10, paddingVertical: 4 },
  stepperText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  stepperVal: { color: '#fff', fontSize: 12, fontWeight: 'bold', paddingHorizontal: 4 },
  totalBox: { backgroundColor: '#1e293b', padding: 14, borderRadius: 12, marginTop: 10 },
  totalLabel: { color: '#94a3b8', fontSize: 12 },
  totalAmount: { color: '#10b981', fontSize: 20, fontWeight: 'bold', marginVertical: 4 },
  checkoutBtn: { backgroundColor: '#10b981', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 8 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold' },
  checkoutView: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  checkoutTitle: { fontSize: 18, fontWeight: 'bold', color: '#f1f5f9', marginBottom: 12 },
  checkoutSummary: { color: '#94a3b8', fontSize: 14, marginBottom: 6 },
  confirmBtn: { backgroundColor: '#0284c7', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 10, marginTop: 16 },
  confirmBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});`,
        renderSimulator: ({ log }) => {
            const [tab, setTab] = useState('catalogo');
            const [categoria, setCategoria] = useState('Todos');
            const [carrito, setCarrito] = useState([
                { id: '1', nombre: 'Arduino Uno R4 WiFi', categoria: 'Placas', precio: 28500, qty: 1, icono: '🤖' }
            ]);
            const [orderSuccess, setOrderSuccess] = useState(false);

            const PRODUCTOS = [
                { id: '1', nombre: 'Arduino Uno R4 WiFi', categoria: 'Placas', precio: 28500, stock: 12, icono: '🤖' },
                { id: '2', nombre: 'ESP32-CAM OV2640', categoria: 'IoT', precio: 14200, stock: 18, icono: '📷' },
                { id: '3', nombre: 'Kit Chasis Robot 2WD', categoria: 'Robótica', precio: 19900, stock: 7, icono: '🏎️' },
                { id: '4', nombre: 'Sensor Línea TCRT5000', categoria: 'Sensores', precio: 6500, stock: 25, icono: '📡' },
                { id: '5', nombre: 'Display LCD 16x2 I2C', categoria: 'Pantallas', precio: 5800, stock: 14, icono: '📟' },
                { id: '6', nombre: 'Módulo Relay 4 Canales', categoria: 'Actuadores', precio: 8200, stock: 9, icono: '⚡' },
            ];

            const totalItems = carrito.reduce((acc, item) => acc + item.qty, 0);
            const subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.qty), 0);
            const descuento = Math.round(subtotal * 0.10);
            const total = subtotal - descuento;

            const agregarAlCarrito = (producto) => {
                setCarrito(prev => {
                    const existe = prev.find(p => p.id === producto.id);
                    if (existe) {
                        log(`[CartStore] ADD_ITEM: "${producto.nombre}" (ID: ${producto.id}). Cantidad incrementada a ${existe.qty + 1}`);
                        return prev.map(p => p.id === producto.id ? { ...p, qty: p.qty + 1 } : p);
                    }
                    log(`[CartStore] ADD_ITEM: "${producto.nombre}" agregado al carrito por primera vez.`);
                    return [...prev, { ...producto, qty: 1 }];
                });
            };

            const modificarCantidad = (id, delta) => {
                setCarrito(prev => {
                    const target = prev.find(p => p.id === id);
                    if (!target) return prev;
                    const nuevaQty = target.qty + delta;
                    if (nuevaQty <= 0) {
                        log(`[CartStore] REMOVE_ITEM: "${target.nombre}" (ID: ${id}) eliminado del carrito.`);
                        return prev.filter(p => p.id !== id);
                    }
                    log(`[CartStore] UPDATE_QTY: "${target.nombre}" cantidad actualizada a ${nuevaQty}`);
                    return prev.map(p => p.id === id ? { ...p, qty: nuevaQty } : p);
                });
            };

            const vaciarCarrito = () => {
                setCarrito([]);
                log('[CartStore] CLEAR_CART: Carrito vaciado.');
            };

            const confirmarPedido = () => {
                const orderId = '#UTN-' + Math.floor(1000 + Math.random() * 9000);
                log(`[CartStore] PLACE_ORDER: Pedido confirmado ${orderId}. Total: ${total.toLocaleString('es-AR')}. Carrito sincronizado con backend.`);
                setOrderSuccess(orderId);
                setCarrito([]);
                setTab('success');
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', overflow: 'hidden' }}>
                    {/* Header de la App */}
                    <div style={{ padding: '12px 14px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span>⚡ ElectroTech UTN</span>
                            </div>
                            <div style={{ fontSize: '9px', color: '#94a3b8' }}>Tienda Móvil con Carro de Compras</div>
                        </div>

                        <button
                            onClick={() => { setTab('carrito'); log('[Navigation] Navegando a pantalla de Carrito'); }}
                            style={{
                                position: 'relative',
                                background: tab === 'carrito' ? 'rgba(56,189,248,0.2)' : '#1e293b',
                                border: '1px solid #334155',
                                borderRadius: '8px',
                                padding: '6px 10px',
                                color: '#f1f5f9',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <span style={{ fontSize: '14px' }}>🛒</span>
                            <span style={{ fontSize: '11px', fontWeight: '800' }}>Carrito</span>
                            {totalItems > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    background: '#ef4444',
                                    color: '#fff',
                                    borderRadius: '999px',
                                    padding: '1px 5px',
                                    fontSize: '9px',
                                    fontWeight: '900',
                                    boxShadow: '0 2px 5px rgba(239,68,68,0.5)'
                                }}>
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Barra de Pestañas de Navegación */}
                    <div style={{ display: 'flex', background: '#131b2e', padding: '4px', borderBottom: '1px solid #1f2937' }}>
                        {[
                            { id: 'catalogo', label: '📱 Catálogo' },
                            { id: 'carrito', label: `🛒 Carrito (${totalItems})` },
                            { id: 'checkout', label: '💳 Checkout' }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => { setTab(t.id); log(`[Navigation] Tab activado: ${t.id}`); }}
                                style={{
                                    flex: 1,
                                    padding: '6px 4px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    background: tab === t.id ? '#0284c7' : 'transparent',
                                    color: tab === t.id ? '#fff' : '#94a3b8',
                                    fontSize: '10px',
                                    fontWeight: tab === t.id ? '800' : '600',
                                    cursor: 'pointer'
                                }}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* CONTENIDO 1: CATÁLOGO */}
                    {tab === 'catalogo' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
                            {/* Filtro por Categorías */}
                            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '8px' }}>
                                {['Todos', 'Placas', 'IoT', 'Robótica', 'Sensores'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategoria(cat)}
                                        style={{
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            border: '1px solid',
                                            borderColor: categoria === cat ? '#38bdf8' : '#334155',
                                            background: categoria === cat ? 'rgba(56,189,248,0.15)' : '#1e293b',
                                            color: categoria === cat ? '#38bdf8' : '#94a3b8',
                                            fontSize: '9px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Lista de Productos */}
                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '2px' }}>
                                {PRODUCTOS.filter(p => categoria === 'Todos' || p.categoria === categoria).map(prod => {
                                    const inCart = carrito.find(c => c.id === prod.id);
                                    return (
                                        <div
                                            key={prod.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                background: '#151d30',
                                                border: '1px solid #23304e',
                                                borderRadius: '10px',
                                                padding: '8px 10px'
                                            }}
                                        >
                                            <span style={{ fontSize: '22px' }}>{prod.icono}</span>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: '11px', fontWeight: '800', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {prod.nombre}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                                                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#10b981' }}>
                                                        ${prod.precio.toLocaleString('es-AR')}
                                                    </span>
                                                    <span style={{ fontSize: '8px', color: '#64748b', background: '#0e1526', padding: '1px 4px', borderRadius: '4px' }}>
                                                        {prod.stock} disp.
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => agregarAlCarrito(prod)}
                                                style={{
                                                    background: inCart ? '#10b981' : '#0284c7',
                                                    border: 'none',
                                                    color: '#fff',
                                                    padding: '5px 9px',
                                                    borderRadius: '6px',
                                                    fontSize: '10px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '3px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {inCart ? `✓ (${inCart.qty})` : '+ Agregar'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* CONTENIDO 2: CARRITO */}
                    {tab === 'carrito' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
                            {carrito.length === 0 ? (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
                                    <span style={{ fontSize: '36px', marginBottom: '8px' }}>🛒</span>
                                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#f1f5f9' }}>Tu carrito está vacío</div>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', margin: '4px 0 12px' }}>Agrega componentes desde el catálogo para calcular tu pedido</div>
                                    <button
                                        onClick={() => setTab('catalogo')}
                                        style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                                    >
                                        Explorar Catálogo
                                    </button>
                                </div>
                            ) : (
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
                                    {/* Lista de productos en carrito */}
                                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px', paddingRight: '2px' }}>
                                        {carrito.map(item => (
                                            <div
                                                key={item.id}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    background: '#151d30',
                                                    border: '1px solid #23304e',
                                                    borderRadius: '8px',
                                                    padding: '6px 8px'
                                                }}
                                            >
                                                <span style={{ fontSize: '18px' }}>{item.icono}</span>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {item.nombre}
                                                    </div>
                                                    <div style={{ fontSize: '10px', color: '#38bdf8', fontWeight: '700' }}>
                                                        ${(item.precio * item.qty).toLocaleString('es-AR')}
                                                    </div>
                                                </div>

                                                {/* Stepper (+ / -) */}
                                                <div style={{ display: 'flex', alignItems: 'center', background: '#0e1526', border: '1px solid #334155', borderRadius: '6px' }}>
                                                    <button
                                                        onClick={() => modificarCantidad(item.id, -1)}
                                                        style={{ background: 'none', border: 'none', color: '#ef4444', padding: '2px 6px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}
                                                    >
                                                        -
                                                    </button>
                                                    <span style={{ fontSize: '10px', fontWeight: '800', color: '#fff', minWidth: '16px', textAlign: 'center' }}>
                                                        {item.qty}
                                                    </span>
                                                    <button
                                                        onClick={() => modificarCantidad(item.id, 1)}
                                                        style={{ background: 'none', border: 'none', color: '#10b981', padding: '2px 6px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Resumen del Carrito */}
                                    <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '8px', marginTop: '8px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginBottom: '2px' }}>
                                            <span>Subtotal:</span>
                                            <span>${subtotal.toLocaleString('es-AR')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#10b981', marginBottom: '2px' }}>
                                            <span>Descuento UTN (10%):</span>
                                            <span>-${descuento.toLocaleString('es-AR')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '900', color: '#fff', borderTop: '1px solid #334155', paddingTop: '4px', marginTop: '4px' }}>
                                            <span>Total a Pagar:</span>
                                            <span style={{ color: '#38bdf8' }}>${total.toLocaleString('es-AR')}</span>
                                        </div>

                                        <button
                                            onClick={() => { setTab('checkout'); log('[Navigation] Procediendo a Checkout'); }}
                                            style={{
                                                width: '100%',
                                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                                border: 'none',
                                                color: '#fff',
                                                padding: '7px',
                                                borderRadius: '8px',
                                                fontSize: '11px',
                                                fontWeight: '800',
                                                cursor: 'pointer',
                                                marginTop: '6px',
                                                boxShadow: '0 4px 10px rgba(16,185,129,0.3)'
                                            }}
                                        >
                                            Iniciar Checkout ({totalItems} items) ➔
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* CONTENIDO 3: CHECKOUT */}
                    {tab === 'checkout' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '12px', overflowY: 'auto' }}>
                            <div>
                                <div style={{ fontSize: '13px', fontWeight: '900', color: '#38bdf8', marginBottom: '8px' }}>
                                    💳 Finalizar Compra
                                </div>
                                <div style={{ background: '#151d30', border: '1px solid #23304e', borderRadius: '10px', padding: '10px', marginBottom: '10px' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px' }}>Datos de Entrega en Sede:</div>
                                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#fff' }}>Pañol / Laboratorio de Electrónica</div>
                                    <div style={{ fontSize: '9px', color: '#64748b' }}>Sede San Miguel • Sin costo de envío</div>
                                </div>

                                <div style={{ background: '#151d30', border: '1px solid #23304e', borderRadius: '10px', padding: '10px' }}>
                                    <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px' }}>Resumen del Pago:</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#cbd5e1' }}>
                                        <span>Total Artículos:</span>
                                        <span>{totalItems} unid.</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#10b981', marginTop: '4px' }}>
                                        <span>Importe Final:</span>
                                        <span>${total.toLocaleString('es-AR')}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={confirmarPedido}
                                disabled={carrito.length === 0}
                                style={{
                                    width: '100%',
                                    background: carrito.length === 0 ? '#334155' : 'linear-gradient(135deg, #0284c7, #38bdf8)',
                                    border: 'none',
                                    color: '#fff',
                                    padding: '9px',
                                    borderRadius: '10px',
                                    fontSize: '12px',
                                    fontWeight: '900',
                                    cursor: carrito.length === 0 ? 'not-allowed' : 'pointer',
                                    marginTop: '12px'
                                }}
                            >
                                Confirmar y Emitir Pedido 🚀
                            </button>
                        </div>
                    )}

                    {/* CONTENIDO 4: ÉXITO */}
                    {tab === 'success' && (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '999px', background: 'rgba(16,185,129,0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '10px' }}>
                                ✓
                            </div>
                            <div style={{ fontSize: '14px', fontWeight: '900', color: '#10b981' }}>¡Pedido Realizado con Éxito!</div>
                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>{orderSuccess}</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8', margin: '6px 0 16px', maxWidth: '200px' }}>
                                Se reservaron los componentes en el pañol. Recibirás confirmación en tu correo institucional.
                            </div>
                            <button
                                onClick={() => { setTab('catalogo'); log('[Navigation] Volviendo al catálogo'); }}
                                style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                            >
                                Volver al Catálogo
                            </button>
                        </div>
                    )}

                    {/* Footer Didáctico */}
                    <div style={{ padding: '6px 12px', background: '#0a0f1d', borderTop: '1px solid #1f2937', fontSize: '9px', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Store: Zustand Global (Memory)</span>
                        <span style={{ color: '#10b981' }}>● Sync Activo</span>
                    </div>
                </div>
            );
        }
    },
    {
        id: 'ecommerce_nocart',
        unit: 'Unidad 1 & 2 • Arquitectura Directa',
        title: 'Catálogo Técnico (Sin Carrito)',
        icon: <BookOpen size={18} />,
        summary: 'Arquitectura directa y ligera basada en navegación Stack y paso de parámetros, sin sobrecarga de estado global de carrito.',
        code: `import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// En Expo Router: import { useRouter, useLocalSearchParams } from 'expo-router';

// ARQUITECTURA DIRECTA SIN ESTADO DE CARRITO:
// 1. No consume memoria para un store global (Zustand/Redux).
// 2. Navegación lineal Stack: app/catalogo/index.tsx -> app/catalogo/[id].tsx
// 3. Paso de parámetros directo por ruta: router.push('/catalogo/' + item.id)

const COMPONENTES = [
  {
    id: 'esp32',
    nombre: 'ESP32-WROOM-32D',
    modelo: 'SoC Xtensa Dual-Core 240MHz',
    categoria: 'Microcontroladores',
    icono: '📡',
    voltaje: '3.3V (Regulado a 5V)',
    interfaz: 'I2C / SPI / UART / PWM (32 GPIOs)',
    consumo: '80mA activo / 10µA Deep Sleep',
    disponibles: 24,
    descripcion: 'Módulo IoT de alto rendimiento con Wi-Fi 802.11 b/g/n y Bluetooth 4.2 BLE. Ideal para proyectos de robótica conectada.'
  },
  {
    id: 'hcsr04',
    nombre: 'Sensor Ultrasónico HC-SR04',
    modelo: 'Transductor Piezoeléctrico 40kHz',
    categoria: 'Sensores',
    icono: '📏',
    voltaje: '5V DC',
    interfaz: 'Trigger & Echo (Digital)',
    consumo: '15mA',
    disponibles: 38,
    descripcion: 'Medición de distancias sin contacto de 2cm a 400cm con precisión de 3mm. Utilizado en robots evasores de obstáculos.'
  },
  {
    id: 'sg90',
    nombre: 'Micro Servomotor SG90 9g',
    modelo: 'Actuador con Reducción de Engranajes',
    categoria: 'Actuadores',
    icono: '🦾',
    voltaje: '4.8V a 6.0V',
    interfaz: 'PWM (Pulso 1ms a 2ms a 50Hz)',
    consumo: '100mA en movimiento / 550mA bloqueo',
    disponibles: 42,
    descripcion: 'Giro de 180 grados con torque de 1.8 kg-cm. Esencial para articulaciones de brazos robóticos y dirección de vehículos autónomos.'
  },
  {
    id: 'mpu6050',
    nombre: 'Sensor IMU MPU-6050',
    modelo: 'Acelerómetro + Giroscopio 6-DoF',
    categoria: 'Sensores',
    icono: '🧭',
    voltaje: '3.3V - 5V (I2C)',
    interfaz: 'Protocolo I2C estándar (0x68)',
    consumo: '3.9mA',
    disponibles: 16,
    descripcion: 'Medición de inclinación, aceleración angular y orientación espacial para robots bípedos y estabilización.'
  }
];

export default function CatalogoTecnicoSinCarritoApp() {
  const [selectedId, setSelectedId] = useState(null);
  const [filtro, setFiltro] = useState('Todos');

  const selectedItem = COMPONENTES.find(c => c.id === selectedId);

  return (
    <View style={styles.container}>
      {/* Header Directo sin Carrito */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔬 Pañol de Electrónica UTN</Text>
        <Text style={styles.headerSubtitle}>Catálogo Técnico Directo • Sin Estado Global</Text>
      </View>

      {/* Pantalla 1: Ficha Técnica Detallada (Si se seleccionó un item) */}
      {selectedItem ? (
        <ScrollView style={styles.detailCard}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setSelectedId(null)}>
            <Text style={styles.backBtnText}>⬅ Volver al Catálogo</Text>
          </TouchableOpacity>

          <Text style={styles.detailIcon}>{selectedItem.icono}</Text>
          <Text style={styles.detailName}>{selectedItem.nombre}</Text>
          <Text style={styles.detailModel}>{selectedItem.modelo}</Text>
          <Text style={styles.detailDesc}>{selectedItem.descripcion}</Text>

          <View style={styles.specsTable}>
            <Text style={styles.tableTitle}>Especificaciones Técnicas:</Text>
            <Text style={styles.tableRow}>• Voltaje: {selectedItem.voltaje}</Text>
            <Text style={styles.tableRow}>• Interfaz: {selectedItem.interfaz}</Text>
            <Text style={styles.tableRow}>• Consumo: {selectedItem.consumo}</Text>
            <Text style={styles.tableRow}>• Stock en Pañol: {selectedItem.disponibles} unidades</Text>
          </View>

          <TouchableOpacity style={styles.actionBtn} onPress={() => alert('Datasheet descargado')}>
            <Text style={styles.actionBtnText}>📥 Descargar Datasheet Oficial (PDF)</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        /* Pantalla 2: Lista de Componentes */
        <FlatList
          data={COMPONENTES.filter(c => filtro === 'Todos' || c.categoria === filtro)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => setSelectedId(item.id)}>
              <Text style={styles.itemIcon}>{item.icono}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.nombre}</Text>
                <Text style={styles.itemCategory}>{item.categoria} • {item.disponibles} disp.</Text>
              </View>
              <Text style={styles.arrowText}>Ver Ficha ➔</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 16 },
  header: { marginBottom: 14 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8' },
  headerSubtitle: { fontSize: 11, color: '#94a3b8', marginTop: 2 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 12, borderRadius: 12, marginBottom: 8, gap: 10 },
  itemIcon: { fontSize: 24 },
  itemName: { color: '#f1f5f9', fontWeight: 'bold', fontSize: 13 },
  itemCategory: { color: '#94a3b8', fontSize: 11, marginTop: 2 },
  arrowText: { color: '#38bdf8', fontSize: 11, fontWeight: 'bold' },
  detailCard: { backgroundColor: '#1e293b', padding: 16, borderRadius: 14 },
  backBtn: { marginBottom: 12 },
  backBtnText: { color: '#38bdf8', fontWeight: 'bold', fontSize: 13 },
  detailIcon: { fontSize: 36, textAlign: 'center', marginVertical: 8 },
  detailName: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  detailModel: { fontSize: 12, color: '#94a3b8', textAlign: 'center', marginBottom: 10 },
  detailDesc: { color: '#cbd5e1', fontSize: 12, lineHeight: 18, marginBottom: 14 },
  specsTable: { backgroundColor: '#0f172a', padding: 12, borderRadius: 10, marginBottom: 14 },
  tableTitle: { color: '#38bdf8', fontWeight: 'bold', fontSize: 12, marginBottom: 6 },
  tableRow: { color: '#cbd5e1', fontSize: 11, marginBottom: 4 },
  actionBtn: { backgroundColor: '#0284c7', padding: 12, borderRadius: 8, alignItems: 'center' },
  actionBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
});`,
        renderSimulator: ({ log }) => {
            const [selectedId, setSelectedId] = useState(null);
            const [filtro, setFiltro] = useState('Todos');

            const COMPONENTES = [
                {
                    id: 'esp32',
                    nombre: 'ESP32-WROOM-32D',
                    modelo: 'SoC Xtensa Dual-Core 240MHz',
                    categoria: 'Microcontroladores',
                    icono: '📡',
                    voltaje: '3.3V (Regulado a 5V)',
                    interfaz: 'I2C / SPI / UART / PWM (32 GPIOs)',
                    consumo: '80mA activo / 10µA Deep Sleep',
                    disponibles: 24,
                    descripcion: 'Módulo IoT de alto rendimiento con Wi-Fi 802.11 b/g/n y Bluetooth 4.2 BLE. Ideal para proyectos de robótica conectada.'
                },
                {
                    id: 'hcsr04',
                    nombre: 'Sensor Ultrasónico HC-SR04',
                    modelo: 'Transductor Piezoeléctrico 40kHz',
                    categoria: 'Sensores',
                    icono: '📏',
                    voltaje: '5V DC',
                    interfaz: 'Trigger & Echo (Digital)',
                    consumo: '15mA',
                    disponibles: 38,
                    descripcion: 'Medición de distancias sin contacto de 2cm a 400cm con precisión de 3mm. Utilizado en robots evasores de obstáculos.'
                },
                {
                    id: 'sg90',
                    nombre: 'Micro Servomotor SG90 9g',
                    modelo: 'Actuador con Reducción de Engranajes',
                    categoria: 'Actuadores',
                    icono: '🦾',
                    voltaje: '4.8V a 6.0V',
                    interfaz: 'PWM (Pulso 1ms a 2ms a 50Hz)',
                    consumo: '100mA en movimiento / 550mA bloqueo',
                    disponibles: 42,
                    descripcion: 'Giro de 180 grados con torque de 1.8 kg-cm. Esencial para articulaciones de brazos robóticos y dirección de vehículos autónomos.'
                },
                {
                    id: 'mpu6050',
                    nombre: 'Sensor IMU MPU-6050',
                    modelo: 'Acelerómetro + Giroscopio 6-DoF',
                    categoria: 'Sensores',
                    icono: '🧭',
                    voltaje: '3.3V - 5V (I2C)',
                    interfaz: 'Protocolo I2C estándar (0x68)',
                    consumo: '3.9mA',
                    disponibles: 16,
                    descripcion: 'Medición de inclinación, aceleración angular y orientación espacial para robots bípedos y estabilización.'
                }
            ];

            const selectedItem = COMPONENTES.find(c => c.id === selectedId);

            const abrirDetalle = (item) => {
                setSelectedId(item.id);
                log(`[Stack Navigation] router.push('/catalog/${item.id}'). Pantalla de Ficha Técnica abierta para: "${item.nombre}" (Sin overhead de store global).`);
            };

            const volverAtras = () => {
                setSelectedId(null);
                log('[Stack Navigation] router.back(). Volviendo a la lista de catálogo.');
            };

            const descargarDatasheet = (item) => {
                log(`[Expo FileSystem] Descargando datasheet: ${item.id}_datasheet.pdf (Cache local).`);
                alert(`Descargando ficha técnica oficial de ${item.nombre}`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', overflow: 'hidden' }}>
                    {/* Header Limpio sin Carrito */}
                    <div style={{ padding: '12px 14px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '900', color: '#38bdf8' }}>
                                🔬 Pañol de Electrónica UTN
                            </div>
                            <div style={{ fontSize: '9px', color: '#94a3b8' }}>Catálogo Técnico • Sin Carrito</div>
                        </div>
                        <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>
                            Stateless (RAM 8MB)
                        </span>
                    </div>

                    {/* VISTA 1: FICHA DETALLADA */}
                    {selectedItem ? (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', padding: '12px' }}>
                            <button
                                onClick={volverAtras}
                                style={{
                                    alignSelf: 'flex-start',
                                    background: 'none',
                                    border: 'none',
                                    color: '#38bdf8',
                                    fontSize: '11px',
                                    fontWeight: '800',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '2px 0 10px 0'
                                }}
                            >
                                <span>⬅ Volver al Catálogo</span>
                            </button>

                            <div style={{ background: '#151d30', border: '1px solid #23304e', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                                <span style={{ fontSize: '38px', display: 'block', marginBottom: '6px' }}>{selectedItem.icono}</span>
                                <div style={{ fontSize: '14px', fontWeight: '900', color: '#f1f5f9' }}>{selectedItem.nombre}</div>
                                <div style={{ fontSize: '10px', color: '#38bdf8', marginTop: '2px', fontWeight: '700' }}>{selectedItem.modelo}</div>
                                <p style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: '1.4', margin: '8px 0 12px', textAlign: 'left' }}>
                                    {selectedItem.descripcion}
                                </p>

                                {/* Tabla de Especificaciones */}
                                <div style={{ background: '#0e1526', border: '1px solid #334155', borderRadius: '10px', padding: '10px', textAlign: 'left' }}>
                                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#38bdf8', marginBottom: '6px' }}>
                                        📋 Especificaciones Técnicas:
                                    </div>
                                    <div style={{ fontSize: '9px', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                        <div>• <strong style={{ color: '#fff' }}>Voltaje:</strong> {selectedItem.voltaje}</div>
                                        <div>• <strong style={{ color: '#fff' }}>Interfaz:</strong> {selectedItem.interfaz}</div>
                                        <div>• <strong style={{ color: '#fff' }}>Consumo:</strong> {selectedItem.consumo}</div>
                                        <div>• <strong style={{ color: '#10b981' }}>Disponibilidad:</strong> {selectedItem.disponibles} en pañol</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                                    <button
                                        onClick={() => descargarDatasheet(selectedItem)}
                                        style={{
                                            background: '#0284c7',
                                            border: 'none',
                                            color: '#fff',
                                            padding: '8px',
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                            fontWeight: '800',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        📥 Descargar Datasheet (PDF)
                                    </button>
                                    <button
                                        onClick={() => { log(`[Pañol UTN] Solicitud de préstamo registrada para: ${selectedItem.nombre}`); alert('Solicitud registrada en pañol de alumnos.'); }}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #334155',
                                            color: '#cbd5e1',
                                            padding: '7px',
                                            borderRadius: '8px',
                                            fontSize: '10px',
                                            fontWeight: '700',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        💬 Solicitar para Práctica de Taller
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* VISTA 2: LISTA DE CATÁLOGO */
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '10px' }}>
                            {/* Filtros */}
                            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '8px' }}>
                                {['Todos', 'Microcontroladores', 'Sensores', 'Actuadores'].map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setFiltro(cat)}
                                        style={{
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            border: '1px solid',
                                            borderColor: filtro === cat ? '#38bdf8' : '#334155',
                                            background: filtro === cat ? 'rgba(56,189,248,0.15)' : '#1e293b',
                                            color: filtro === cat ? '#38bdf8' : '#94a3b8',
                                            fontSize: '9px',
                                            fontWeight: '700',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Cards de componentes */}
                            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '2px' }}>
                                {COMPONENTES.filter(c => filtro === 'Todos' || c.categoria === filtro).map(comp => (
                                    <div
                                        key={comp.id}
                                        onClick={() => abrirDetalle(comp)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            background: '#151d30',
                                            border: '1px solid #23304e',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            cursor: 'pointer',
                                            transition: 'border-color 0.2s'
                                        }}
                                    >
                                        <span style={{ fontSize: '22px' }}>{comp.icono}</span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: '11px', fontWeight: '800', color: '#f1f5f9' }}>
                                                {comp.nombre}
                                            </div>
                                            <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '2px' }}>
                                                {comp.categoria} • <span style={{ color: '#10b981' }}>{comp.disponibles} disp.</span>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: '10px', color: '#38bdf8', fontWeight: '800' }}>
                                            Ficha ➔
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer Didáctico */}
                    <div style={{ padding: '6px 12px', background: '#0e1526', borderTop: '1px solid #1e293b', fontSize: '9px', color: '#64748b', textAlign: 'center' }}>
                        💡 Arquitectura Directa: Ideal para catálogos, portfolios y fichas técnicas sin transacciones.
                    </div>
                </div>
            );
        }
    },
];

const flattenStyle = (s) => {
    if (!s) return {};
    let res = {};
    if (Array.isArray(s)) {
        s.forEach(item => {
            if (item) Object.assign(res, flattenStyle(item));
        });
    } else if (typeof s === 'object') {
        res = { ...s };
    }
    if (res.paddingVertical !== undefined) {
        res.paddingTop = res.paddingVertical;
        res.paddingBottom = res.paddingVertical;
        delete res.paddingVertical;
    }
    if (res.paddingHorizontal !== undefined) {
        res.paddingLeft = res.paddingHorizontal;
        res.paddingRight = res.paddingHorizontal;
        delete res.paddingHorizontal;
    }
    if (res.marginVertical !== undefined) {
        res.marginTop = res.marginVertical;
        res.marginBottom = res.marginVertical;
        delete res.marginVertical;
    }
    if (res.marginHorizontal !== undefined) {
        res.marginLeft = res.marginHorizontal;
        res.marginRight = res.marginHorizontal;
        delete res.marginHorizontal;
    }
    if (res.borderWidth !== undefined && !res.borderStyle) {
        res.borderStyle = 'solid';
    }
    if (res.elevation !== undefined && !res.boxShadow) {
        res.boxShadow = `0 ${Math.min(res.elevation, 8)}px ${res.elevation * 2}px rgba(0,0,0,0.35)`;
        delete res.elevation;
    }
    return res;
};

const RN_MOCKS = {
    View: ({ style, children, ...rest }) => (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            {children}
        </div>
    ),
    Text: ({ style, children, ...rest }) => (
        <span style={{ fontSize: '14px', boxSizing: 'border-box', color: '#fff', ...flattenStyle(style) }} {...rest}>
            {children}
        </span>
    ),
    TouchableOpacity: ({ style, onPress, children, activeOpacity = 0.6, ...rest }) => {
        const [isDown, setIsDown] = useState(false);
        return (
            <div
                onClick={onPress}
                onMouseDown={() => setIsDown(true)}
                onMouseUp={() => setIsDown(false)}
                onMouseLeave={() => setIsDown(false)}
                style={{ cursor: 'pointer', transition: 'opacity 0.15s', opacity: isDown ? activeOpacity : 1, userSelect: 'none', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(style) }}
                {...rest}
            >
                {children}
            </div>
        );
    },
    TextInput: ({ style, value, onChangeText, placeholder, placeholderTextColor = '#64748b', secureTextEntry, ...rest }) => (
        <input
            type={secureTextEntry ? 'password' : 'text'}
            value={value ?? ''}
            onChange={(e) => onChangeText && onChangeText(e.target.value)}
            placeholder={placeholder}
            style={{ fontSize: '13px', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box', ...flattenStyle(style) }}
            {...rest}
        />
    ),
    Button: ({ title, onPress, color = '#0284c7', disabled }) => (
        <button
            onClick={onPress}
            disabled={disabled}
            style={{ background: color, color: '#fff', padding: '10px 16px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, width: '100%' }}
        >
            {title}
        </button>
    ),
    ScrollView: ({ style, contentContainerStyle, children, ...rest }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            <div style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(contentContainerStyle) }}>
                {children}
            </div>
        </div>
    ),
    FlatList: ({ data = [], renderItem, keyExtractor, style, contentContainerStyle, ListHeaderComponent, ListEmptyComponent }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box', ...flattenStyle(style) }}>
            <div style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(contentContainerStyle) }}>
                {ListHeaderComponent && (typeof ListHeaderComponent === 'function' ? <ListHeaderComponent /> : ListHeaderComponent)}
                {data.length === 0 && ListEmptyComponent && (typeof ListEmptyComponent === 'function' ? <ListEmptyComponent /> : ListEmptyComponent)}
                {data.map((item, index) => {
                    const key = keyExtractor ? keyExtractor(item, index) : (item.id ?? index);
                    return <React.Fragment key={key}>{renderItem({ item, index })}</React.Fragment>;
                })}
            </div>
        </div>
    ),
    Image: ({ source, style, ...rest }) => {
        const src = typeof source === 'string' ? source : (source?.uri || '');
        return <img src={getAssetUrl(src)} onError={(e) => handleImageError(e, src)} alt="rn-img" style={{ objectFit: 'cover', display: 'block', ...flattenStyle(style) }} {...rest} />;
    },
    ActivityIndicator: ({ size = 'small', color = '#38bdf8', style }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', gap: '8px', color, fontSize: size === 'large' ? '15px' : '12px', ...flattenStyle(style) }}>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span> Cargando...
        </div>
    ),
    SafeAreaView: ({ style, children, ...rest }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '8px', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            {children}
        </div>
    ),
    KeyboardAvoidingView: ({ style, children, ...rest }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            {children}
        </div>
    ),
    StyleSheet: { create: (s) => s, flatten: flattenStyle },
    Platform: { OS: 'ios', select: (obj) => obj.ios ?? obj.default },
    Dimensions: { get: () => ({ width: 290, height: 520 }) },
    Alert: { alert: (title, msg) => window.alert(`${title}${msg ? '\n' + msg : ''}`) }
};

const EXPO_ICONS_MOCKS = {
    Ionicons: ({ name, size = 18, color = '#38bdf8', style }) => {
        const iconMap = {
            home: '🏠',
            search: '🔍',
            person: '👤',
            camera: '📸',
            settings: '⚙️',
            star: '★',
            refresh: '🔄'
        };
        return (
            <span style={{ fontSize: `${size}px`, color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, ...flattenStyle(style) }}>
                {iconMap[name] || '★'}
            </span>
        );
    }
};

const TabsComponent = ({ children, screenOptions }) => {
    const screens = React.Children.toArray(children).filter(c => React.isValidElement(c));
    const [activeTab, setActiveTab] = useState(screens[0]?.props?.name || 'index');
    const activeScreen = screens.find(s => s.props?.name === activeTab) || screens[0];
    const activeColor = screenOptions?.tabBarActiveTintColor || '#38bdf8';

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#0b1120' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {activeScreen?.props?.children || (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '42px', marginBottom: '12px' }}>
                            {activeTab === 'index' || activeTab === 'inicio' ? '🏠' : (activeTab === 'explorar' ? '🔍' : '👤')}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                            {activeScreen?.props?.options?.title || activeTab}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                            Ruta activa: app/(tabs)/{activeTab}.tsx
                        </div>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #1f2937', background: '#111827', padding: '8px 0' }}>
                {screens.map(screen => {
                    const name = screen.props?.name;
                    const title = screen.props?.options?.title || name;
                    const isSelected = activeTab === name;
                    const iconFn = screen.props?.options?.tabBarIcon;
                    return (
                        <div
                            key={name}
                            onClick={() => setActiveTab(name)}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', opacity: isSelected ? 1 : 0.6 }}
                        >
                            {iconFn ? iconFn({ color: isSelected ? activeColor : '#94a3b8', size: 18 }) : <span style={{ fontSize: '16px' }}>📱</span>}
                            <span style={{ fontSize: '10px', color: isSelected ? activeColor : '#94a3b8', marginTop: '2px', fontWeight: isSelected ? 'bold' : 'normal' }}>
                                {title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
TabsComponent.Screen = () => null;

const EXPO_ROUTER_MOCKS = {
    Tabs: TabsComponent,
    Stack: ({ children }) => <div style={{ flex: 1 }}>{children}</div>,
    useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
    Link: ({ children }) => <span style={{ color: '#38bdf8', cursor: 'pointer' }}>{children}</span>
};

const createZodMock = () => {
    const stringBuilder = () => {
        const rules = [];
        const obj = {
            rules,
            email: (msg) => { rules.push({ type: 'email', msg }); return obj; },
            min: (minLen, msg) => { rules.push({ type: 'min', minLen, msg }); return obj; },
            max: (maxLen, msg) => { rules.push({ type: 'max', maxLen, msg }); return obj; },
            optional: () => obj,
            nullable: () => obj,
            regex: () => obj,
            refine: (fn, msg) => { rules.push({ type: 'refine', fn, msg }); return obj; }
        };
        return obj;
    };

    const numberBuilder = () => {
        const rules = [];
        const obj = {
            rules,
            min: (minVal, msg) => { rules.push({ type: 'numMin', minVal, msg }); return obj; },
            max: (maxVal, msg) => { rules.push({ type: 'numMax', maxVal, msg }); return obj; },
            positive: () => obj,
            int: () => obj,
            optional: () => obj,
            nullable: () => obj
        };
        return obj;
    };

    const zBase = {
        string: stringBuilder,
        number: numberBuilder,
        boolean: () => ({ optional: () => ({}) }),
        any: () => ({ optional: () => ({}) }),
        object: (shape) => ({
            shape,
            safeParse: (data) => {
                for (let k in shape) {
                    const val = data ? data[k] : '';
                    if (shape[k]?.rules) {
                        for (let rule of shape[k].rules) {
                            if (rule.type === 'email' && (!val || !val.includes('@') || !val.includes('.'))) {
                                return { success: false, error: { errors: [{ message: rule.msg || 'Email inválido' }] } };
                            }
                            if (rule.type === 'min' && (!val || val.length < rule.minLen)) {
                                return { success: false, error: { errors: [{ message: rule.msg || `Mínimo ${rule.minLen} caracteres` }] } };
                            }
                            if (rule.type === 'max' && val && val.length > rule.maxLen) {
                                return { success: false, error: { errors: [{ message: rule.msg || `Máximo ${rule.maxLen} caracteres` }] } };
                            }
                            if (rule.type === 'refine' && rule.fn && !rule.fn(val)) {
                                return { success: false, error: { errors: [{ message: typeof rule.msg === 'function' ? rule.msg(val) : (rule.msg || 'Valor inválido') }] } };
                            }
                        }
                    }
                }
                return { success: true, data };
            },
            parse: (data) => {
                const res = zBase.object(shape).safeParse(data);
                if (!res.success) throw new Error(res.error.errors[0].message);
                return res.data;
            }
        }),
        infer: () => ({})
    };

    return {
        z: zBase,
        ...zBase,
        default: { z: zBase, ...zBase },
        __esModule: true
    };
};

const ZOD_MOCKS = createZodMock();

const REANIMATED_MOCKS = {
    Animated: { View: RN_MOCKS.View, Text: RN_MOCKS.Text, Image: RN_MOCKS.Image, ScrollView: RN_MOCKS.ScrollView },
    default: { View: RN_MOCKS.View, Text: RN_MOCKS.Text, Image: RN_MOCKS.Image, ScrollView: RN_MOCKS.ScrollView },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withSpring: (val) => val,
    withTiming: (val) => val
};

const FIRESTORE_MOCKS = {
    collection: (db, name) => name,
    onSnapshot: (col, cb) => {
        setTimeout(() => {
            cb({
                docs: [
                    { id: '1', data: () => ({ titulo: 'Configurar Expo Router', done: true }) },
                    { id: '2', data: () => ({ titulo: 'Crear store con Zustand', done: false }) },
                    { id: '3', data: () => ({ titulo: 'Testear con Expo Go', done: false }) }
                ]
            });
        }, 50);
        return () => {};
    },
    addDoc: async (col, data) => ({ id: Date.now().toString(), ...data }),
    deleteDoc: async () => {},
    doc: () => ({})
};

const LOCATION_MOCKS = {
    requestForegroundPermissionsAsync: async () => ({ status: 'granted' }),
    getCurrentPositionAsync: async () => ({ coords: { latitude: -34.4586, longitude: -58.9142 } })
};

const CAMERA_MOCKS = {
    CameraView: ({ style, children }) => (
        <div style={{ background: '#1e293b', border: '1px dashed #475569', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '130px', color: '#94a3b8', fontSize: '12px', ...flattenStyle(style) }}>
            📷 Cámara Móvil Simulada
            {children}
        </div>
    ),
    useCameraPermissions: () => [{ granted: true }, async () => ({ status: 'granted' })]
};

class LiveErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error) {
        if (this.props.onError) this.props.onError(error);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
            this.setState({ hasError: false, error: null });
        }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ flex: 1, padding: '16px', background: '#3b0712', color: '#fca5a5', fontSize: '11px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                    <div style={{ fontWeight: '800', color: '#f87171', fontSize: '12px' }}>⚠️ Error en Tiempo de Ejecución:</div>
                    <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: '#fecdd3', lineHeight: 1.4 }}>
                        {this.state.error?.toString()}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            style={{ padding: '6px 12px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
                        >
                            🔄 Reintentar Renderizado
                        </button>
                        <div style={{ fontSize: '10px', color: '#fda4af' }}>
                            Modifica el código para corregir el error o presiona Resetear.
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const LiveSimulatorRunner = ({ code, log, resetKey }) => {
    const [compState, setCompState] = useState({ Comp: null, version: 0 });
    const [compileError, setCompileError] = useState(null);

    useEffect(() => {
        if (!code) return;
        const timer = setTimeout(() => {
            try {
                // Sanitizar comentarios bash (#) para evitar errores en Babel si el usuario los pega
                const cleanedCode = code.replace(/^#([^\n]*)/gm, '//$1');
                const res = Babel.transform(cleanedCode, {
                    presets: [
                        ['env', { modules: 'commonjs' }],
                        ['react', { runtime: 'classic' }]
                    ]
                });

                const exportsObj = {};
                const customRequire = (moduleName) => {
                    if (moduleName === 'react') return { ...React, default: React, __esModule: true };
                    if (moduleName === 'react-native') return { ...RN_MOCKS, default: RN_MOCKS, __esModule: true };
                    if (moduleName === '@expo/vector-icons') return { ...EXPO_ICONS_MOCKS, default: EXPO_ICONS_MOCKS, __esModule: true };
                    if (moduleName === 'expo-router') return { ...EXPO_ROUTER_MOCKS, default: EXPO_ROUTER_MOCKS, __esModule: true };
                    if (moduleName === 'zod') return ZOD_MOCKS;
                    if (moduleName === 'react-native-reanimated') return { ...REANIMATED_MOCKS, default: REANIMATED_MOCKS, __esModule: true };
                    if (moduleName === 'firebase/firestore') return { ...FIRESTORE_MOCKS, default: FIRESTORE_MOCKS, __esModule: true };
                    if (moduleName.includes('firebaseConfig')) return { db: {}, default: { db: {} }, __esModule: true };
                    if (moduleName === 'expo-location') return { ...LOCATION_MOCKS, default: LOCATION_MOCKS, __esModule: true };
                    if (moduleName === 'expo-camera') return { ...CAMERA_MOCKS, default: CAMERA_MOCKS, __esModule: true };
                    if (moduleName === '@supabase/supabase-js') {
                        return {
                            createClient: () => ({
                                from: () => ({
                                    select: () => ({ order: () => Promise.resolve({ data: [], error: null }), eq: () => Promise.resolve({ data: [], error: null }) }),
                                    insert: () => ({ select: () => Promise.resolve({ data: [{ id: 999, nombre: 'Producto Creado' }], error: null }) }),
                                    update: () => ({ eq: () => Promise.resolve({ error: null }) }),
                                    delete: () => ({ eq: () => Promise.resolve({ error: null }) })
                                })
                            }),
                            __esModule: true
                        };
                    }
                    if (moduleName === '@react-native-async-storage/async-storage') {
                        return {
                            default: {
                                getItem: () => Promise.resolve(null),
                                setItem: () => Promise.resolve(),
                                removeItem: () => Promise.resolve()
                            },
                            __esModule: true
                        };
                    }
                    return {};
                };

                const fn = new Function('require', 'exports', 'React', res.code);
                fn(customRequire, exportsObj, React);
                const ExportedComp = exportsObj.default || exportsObj.App;

                if (typeof ExportedComp === 'function') {
                    setCompState(prev => ({ Comp: () => <ExportedComp />, version: prev.version + 1 }));
                    setCompileError(null);
                    if (log) log('[Metro] Fast Refresh aplicado con éxito.');
                } else {
                    setCompileError('No se encontró un "export default function Componente() { ... }" en el código.');
                }
            } catch (err) {
                setCompileError(err.message || String(err));
            }
        }, 120);

        return () => clearTimeout(timer);
    }, [code, resetKey]);

    if (compileError) {
        return (
            <div style={{ flex: 1, padding: '16px', background: '#1e1b4b', borderLeft: '4px solid #f43f5e', color: '#f8fafc', fontSize: '11px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                <div style={{ fontWeight: '800', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>⚠️</span> Error de Sintaxis (Babel):
                </div>
                <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: '#fda4af', lineHeight: 1.4 }}>
                    {compileError}
                </div>
                <div style={{ marginTop: 'auto', fontSize: '10px', color: '#94a3b8' }}>
                    El código se compila en vivo mientras escribes. Corrige la sintaxis para actualizar el teléfono.
                </div>
            </div>
        );
    }

    const { Comp, version } = compState;
    if (!Comp) {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#94a3b8', fontSize: '11px' }}>
                Compilando aplicación...
            </div>
        );
    }

    return (
        <LiveErrorBoundary key={`${version}-${resetKey}`}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden', background: '#020617', color: '#fff' }}>
                <Comp />
            </div>
        </LiveErrorBoundary>
    );
};

const PRESET_EXPLANATIONS = {
    supabase_crud: {
        badge: 'Base de Datos PostgreSQL Cloud • Supabase',
        catedraDoc: {
          "unit": "Unidad 2",
          "topic": "Clase 6 • Formularios, Validación y CRUD Relacional PostgreSQL",
          "folderLink": "https://drive.google.com/drive/folders/1PzTCpnSOltKfVa83nIjYIAslABSDCQvV?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 6 - Formularios, Validación y CRUD (PDF)",
          "docLink": "https://drive.google.com/file/d/1mJSYzX0lDvjJJc9K7HemcvgeQcmH0Kpc/view?usp=sharing",
          "presentationTitle": "Presentación Clase 6: Teclados, Zod y CRUD",
          "presentationLink": "https://drive.google.com/file/d/1Fx6BwJCiwC7MSRgIKlKh_Ecp22oRySHx/view?usp=sharing"
},
        concept: 'Supabase es la alternativa open-source a Firebase basada en PostgreSQL relacional. A través de la tecnología PostgREST, traduce automáticamente llamadas de la app móvil en consultas SQL seguras (SELECT, INSERT, UPDATE, DELETE). Permite definir esquemas relacionales estrictos, relaciones con claves foráneas y protección a nivel de fila mediante Row Level Security (RLS).',
        image: '/images/rn_supabase_postgres_crud.jpg',
        imageCaption: '🐘 Diagrama Didáctico con IA: Arquitectura de Conexión React Native & Supabase PostgreSQL — 1) Interfaz móvil React Native disparando operaciones CRUD. 2) Capa API PostgREST resolviendo verbos HTTP (GET, POST, PATCH, DELETE) con autenticación Bearer Token. 3) Motor PostgreSQL ejecutando sentencias SQL relacionales sobre la tabla productos protegida por Row Level Security (RLS). 4) Bus de WebSockets en tiempo real para sincronización instantánea entre múltiples dispositivos.',
        stepByStep: [
            'Paso 1: Crear un proyecto gratuito en supabase.com y abrir la pestaña "SQL Editor" para crear la tabla de productos.',
            'Paso 2: Ejecutar la sentencia CREATE TABLE con campos id, nombre, categoria, precio y stock, y habilitar Row Level Security (RLS).',
            'Paso 3: Instalar los paquetes oficiales: npx expo install @supabase/supabase-js @react-native-async-storage/async-storage',
            'Paso 4: Crear el cliente en supabase.ts configurando EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY con AsyncStorage.',
            'Paso 5: Implementar las 4 funciones CRUD: select() para leer, insert() para crear, update() para modificar y delete() para eliminar.'
        ],
        sections: [
            {
                title: '1. ¿Por qué PostgreSQL con Supabase en Mobile?',
                desc: 'Base de datos relacional sólida frente a almacenes NoSQL.',
                detail: 'A diferencia de Firebase Firestore (NoSQL documental), PostgreSQL provee integridad referencial estricta, claves foráneas, tipos numéricos de precisión (numeric/decimal), transacciones ACID y consultas complejas con JOINs y funciones almacenadas.'
            },
            {
                title: '2. Las 4 Operaciones CRUD en Código',
                desc: 'Select (Read), Insert (Create), Update (Modificar), Delete (Borrar)',
                detail: '• READ: supabase.from("productos").select("*").order("id", { ascending: false })\n• CREATE: supabase.from("productos").insert([{ nombre, precio, stock }]).select()\n• UPDATE: supabase.from("productos").update({ stock: 20 }).eq("id", 101)\n• DELETE: supabase.from("productos").delete().eq("id", 101)'
            },
            {
                title: '3. PostgREST y Row Level Security (RLS)',
                desc: 'Seguridad a nivel de fila directamente en el motor SQL.',
                detail: 'PostgREST lee el esquema de PostgreSQL y expone una API REST limpia. Con Row Level Security (RLS), configuras políticas como: "CREATE POLICY on productos FOR SELECT USING (true);" para lectura pública, o restringir escrituras a usuarios autenticados.'
            },
            {
                title: '4. Suscripciones en Tiempo Real (Realtime)',
                desc: 'supabase.channel("productos-live").on("postgres_changes", ...)',
                detail: 'Supabase escucha el Change Data Capture (WAL) de PostgreSQL y emite eventos WebSockets en tiempo real hacia React Native, permitiendo actualizar la UI automáticamente cuando otro cliente modifica la base de datos.'
            }
        ],
        pitfalls: [
            '❌ Olvidar crear una política RLS tras activar "ENABLE ROW LEVEL SECURITY" (la tabla no devolverá ningún registro porque PostgreSQL deniega todo por defecto).',
            '❌ Usar la clave secreta "service_role" en el código móvil (nunca debe incluirse en la app; solo debe usarse la "anon public key").',
            '❌ Enviar valores de precio o stock como cadenas de texto "1500" en lugar de parsearlos con parseFloat() o parseInt().'
        ],
        selfCheck: {
            q: '¿Cuál es la diferencia fundamental entre el modelo de datos de Firebase Firestore y el de Supabase?',
            a: 'Firestore es una base de datos NoSQL documental donde la información se almacena en colecciones y documentos semiestructurados tipo JSON sin esquema fijo. Supabase es una base de datos relacional PostgreSQL con tablas, columnas tipadas, integridad referencial (claves primarias y foráneas), sentencias SQL completas y políticas RLS nativas.'
        },
        webVsNative: 'En la Web el cliente de Supabase guarda la sesión en localStorage del navegador. En React Native debemos pasar explícitamente AsyncStorage en la configuración de "auth.storage" para que la sesión de login persista al cerrar la aplicación.',
        tip: 'Crea índices en PostgreSQL para las columnas por las que tu app filtre o busque frecuentemente (ej: CREATE INDEX idx_productos_cat ON productos(categoria);) para lograr respuestas de red ultra rápidas en menos de 20ms.'
    },
    expo_setup: {
        badge: 'Setup Inicial & Toolchain PC',
        catedraDoc: {
          "unit": "Unidad 1",
          "topic": "Clase 0 • Setup Inicial de Entorno & Configuración PC",
          "folderLink": "https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link",
          "docTitle": "Guía de Entorno: Configuración PC, Node y VS Code",
          "docLink": "https://drive.google.com/file/d/1BEO-WvkCmEEJ9O_MVyeuMiVZELpsryG6/view?usp=sharing",
          "presentationTitle": "Presentación Clase 0: UX/UI y Expo",
          "presentationLink": "https://drive.google.com/file/d/1_biMOkVlaF4dg_r0Gs4M0R5Oh9VrpGS5/view?usp=sharing"
},
        concept: 'Comenzar un proyecto React Native moderno con Expo elimina la necesidad de configurar manualmente compiladores nativos C++, Gradle o CocoaPods. Todo el ciclo de desarrollo se orquesta mediante Node.js, Visual Studio Code y el empaquetador Metro Bundler, permitiendo ejecutar código en tiempo real en smartphones físicos vía Expo Go.',
        image: '/images/rn_expo_pc_setup_guide.jpg',
        imageCaption: '🛠️ Diagrama Didáctico con IA: Entorno de Desarrollo y Setup en PC — 1) Instalación de software base en la PC (Node.js, VS Code, Git CLI). 2) Creación del proyecto con npx create-expo-app@latest. 3) Servidor Metro Bundler con atajos de terminal interactivos ([a] Android, [i] iOS, [w] Web, [r] Reload). 4) Conexión en tiempo real con Expo Go vía Wi-Fi para Fast Refresh instantáneo.',
        stepByStep: [
            'Paso 1: Instalar Node.js LTS (v20 o superior) desde nodejs.org marcando la opción "Add to PATH".',
            'Paso 2: Instalar Visual Studio Code y agregar la extensión oficial "Expo Tools" para tipado y autocompletado.',
            'Paso 3: Abrir PowerShell o la terminal de VS Code y ejecutar: npx create-expo-app@latest mi-app --template tabs',
            'Paso 4: Entrar a la carpeta con cd mi-app e iniciar el empaquetador con npx expo start.',
            'Paso 5: Descargar Expo Go en el smartphone (Google Play o App Store) y escanear el código QR sobre la misma red Wi-Fi.'
        ],
        sections: [
            {
                title: '1. Herramientas Necesarias en la PC',
                desc: 'Node.js (LTS), VS Code, Git y Expo Go.',
                detail: '• Node.js: Provee el motor V8 para ejecutar el empaquetador Metro y gestionar dependencias npm.\n• Visual Studio Code: Editor líder con soporte de TypeScript, formateador Prettier y snippets.\n• Git: Sistema de control de versiones para clonar repositorios y realizar Pull Requests en la cátedra.\n• Expo Go: Cliente móvil precompilado que ejecuta tu código JavaScript/TypeScript en tu celular sin compilar binarios.'
            },
            {
                title: '2. Comando create-expo-app',
                desc: 'npx create-expo-app@latest mi-app --template tabs',
                detail: 'Descarga e inicializa la plantilla oficial con Expo Router (enrutamiento por carpetas en app/), TypeScript configurado, iconos vectoriales y soporte multiplataforma listo para usar.'
            },
            {
                title: '3. Atajos de Teclado en Metro Bundler',
                desc: 'a (Android), i (iOS), w (Web), r (Reload), c (Clean Cache)',
                detail: 'Al presionar "a", Metro busca un emulador de Android Studio activo o un teléfono conectado por USB con ADB. "r" fuerza una recarga total en caliente. "c" purga la memoria caché en caso de errores de caché residual.'
            },
            {
                title: '4. Modo Túnel para Redes Universitarias',
                desc: 'npx expo start --tunnel',
                detail: 'Si la red Wi-Fi de la universidad o de tu hogar posee aislamiento de clientes (AP Isolation) y el celular no encuentra la IP de la PC, el modificador --tunnel crea un túnel seguro en la nube para conectar ambos dispositivos.'
            }
        ],
        pitfalls: [
            '❌ Instalar Node.js sin marcar "Add to PATH", lo que provocará el error "node no se reconoce como un comando interno".',
            '❌ Intentar conectar el celular estando en datos móviles 4G/5G mientras la PC está en Wi-Fi (deben estar en la misma red o usar --tunnel).',
            '❌ Usar espacios o caracteres especiales en el nombre de la carpeta del proyecto (ej: "mi proyecto final!" fallará en npm).'
        ],
        selfCheck: {
            q: '¿Por qué la cátedra utiliza Expo SDK en lugar de React Native CLI puro para iniciar el curso?',
            a: 'Porque Expo permite comenzar a programar en 2 minutos sin necesidad de descargar gigabytes de Android Studio SDK, NDK ni configurar variables complejas de Gradle. Además, Expo Go permite probar en iPhones y iPads reales desde computadoras con Windows sin requerir una Mac.'
        },
        webVsNative: 'En desarrollo Web creas un proyecto con Vite o Create-React-App y abres localhost:5173. En móviles, Expo Metro Bundler compila tu código y lo transmite por sockets a la máquina virtual Hermes dentro de tu celular.',
        tip: 'Usa "npx expo install <paquete>" en lugar de "npm install" cuando instales librerías con código nativo (como cámaras o sensores) para que Expo seleccione automáticamente la versión testeada compatible con tu SDK.'
    },
    ecommerce_cart: {
        badge: 'Arquitectura Completa E-Commerce',
        catedraDoc: {
          "unit": "Unidad 1 y Unidad 3",
          "topic": "Proyecto Integrador • De Requisitos a MVP & App E-Commerce Completa",
          "folderLink": "https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link",
          "docTitle": "Guía Cátedra: De Requisitos a MVP",
          "docLink": "https://drive.google.com/file/d/1c7WQNJuAF_gP9JHGJ93loktZKNrfszsZ/view?usp=sharing",
          "presentationTitle": "Presentación Clase 10: UNP Final Firebase",
          "presentationLink": "https://drive.google.com/file/d/1elVMLpJR3UrTrdhsIPIHutfypdWfgdnp/view?usp=sharing"
},
        concept: 'Una aplicación móvil de comercio electrónico completa requiere coordinar múltiples pantallas (Catálogo, Carrito y Checkout) mediante un Store Centralizado (Zustand). El store sincroniza el badge de la barra de navegación, actualiza cantidades de items en tiempo real y calcula subtotales y descuentos sin acoplar los componentes.',
        image: '/images/rn_ecommerce_full_architecture.jpg',
        imageCaption: '🛒 Diagrama Didáctico con IA: Arquitectura Completa E-Commerce — 1) Catálogo de productos virtualizado con FlatList. 2) Store Centralizado (Zustand) que mantiene el estado global inmutable. 3) Carrito interactivo con badge contador en tiempo real y selectores atómicos. 4) Flujo de Checkout con resumen de orden y confirmación.',
        stepByStep: [
            'Paso 1: Se crea el Store global con create() de Zustand, definiendo items: [], addItem, removeItem y updateQty.',
            'Paso 2: En la barra superior, un selector atómico useCartStore(s => s.items.length) actualiza el badge rojo en tiempo real.',
            'Paso 3: En el Catálogo, cada botón "+ Agregar" despacha addItem(producto); si el producto ya existe en el carrito incrementa qty, evitando duplicados.',
            'Paso 4: En el Carrito, los botones (+) y (-) ejecutan updateQty(id, delta); si la cantidad llega a 0, el item es removido automáticamente.',
            'Paso 5: El Total a Pagar se deriva síncronamente mediante un reduce() sobre los items, aplicando automáticamente el descuento de estudiante UTN.'
        ],
        sections: [
            {
                title: '1. Store Centralizado vs Prop Drilling',
                desc: 'export const useCartStore = create<CartStore>((set) => ({ ... }));',
                detail: 'En aplicaciones móviles complejas, pasar el carrito como props a través de stacks de navegación (Prop Drilling) es frágil y costoso. Zustand desacopla la lógica de negocio y permite a cualquier pantalla o botón acceder al carrito de forma atómica.'
            },
            {
                title: '2. Sincronización del Badge en el Navbar',
                desc: 'const totalItems = useCartStore(state => state.items.reduce(...));',
                detail: 'El badge rojo sobre el ícono de carrito refleja el conteo exacto de artículos sin recargar la pantalla. Gracias a los selectores de Zustand, solo el botón del navbar se re-renderiza cuando el total cambia.'
            },
            {
                title: '3. Inmutabilidad y Funciones Puras',
                desc: 'items: prev.map(p => p.id === id ? { ...p, qty: p.qty + delta } : p)',
                detail: 'Nunca se debe hacer array.push() o mutar un objeto directamente en React Native. Usar spread operator ({ ...p }) y .map() garantiza que React detecte la nueva referencia en memoria y actualice la vista a 60 FPS.'
            },
            {
                title: '4. Flujo de Checkout & Limpieza de Estado',
                desc: 'clearCart: () => set({ items: [] })',
                detail: 'Una vez que el usuario confirma el pedido y la API remota devuelve OK, el carrito debe limpiarse inmediatamente y navegar al estado de confirmación con el identificador de orden generado.'
            }
        ],
        pitfalls: [
            '❌ Mutar el arreglo de items directamente (ej: state.items.push(item)) en vez de retornar un nuevo arreglo con spread [...state.items].',
            '❌ Permitir que la cantidad sea negativa o 0 sin eliminar el producto del carrito.',
            '❌ Suscribir componentes enteros a todo el store en lugar de usar selectores atómicos, provocando renders innecesarios en toda la app.'
        ],
        selfCheck: {
            q: '¿Por qué Zustand es más recomendable que React Context API para el carrito de compras en React Native?',
            a: 'Porque Context API re-renderiza a TODOS los consumidores del contexto ante cualquier cambio de valor, lo que en pantallas pesadas como FlatLists causa caídas de frames (lag). Zustand permite selectores atómicos precisos: solo los componentes que observan la propiedad modificada se re-renderizan.'
        },
        webVsNative: 'En la Web el carrito suele persistirse en localStorage o cookies de sesión. En React Native se utiliza AsyncStorage o MMKV (motor en C++ ultra rápido) para persistir la compra en el almacenamiento seguro del smartphone.',
        tip: 'Implementa debounce en los botones de incremento (+) y decremento (-) para evitar disparar múltiples cálculos pesados si el usuario presiona repetidamente a gran velocidad.'
    },
    ecommerce_nocart: {
        badge: 'Arquitectura Directa (Sin Carrito)',
        catedraDoc: {
          "unit": "Unidad 1 y Unidad 3",
          "topic": "Proyecto Integrador • Catálogo Informativo & Especificación de Requisitos",
          "folderLink": "https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link",
          "docTitle": "Guía Cátedra: De Requisitos a MVP (Etapas 1, 2 y 3)",
          "docLink": "https://drive.google.com/file/d/1c7WQNJuAF_gP9JHGJ93loktZKNrfszsZ/view?usp=sharing",
          "presentationTitle": "Plantilla de Documentación MVP (Word)",
          "presentationLink": "https://drive.google.com/file/d/1bAJ-egjDlYjJcenGAbMRLgNpkyj2pdkI/view?usp=sharing"
},
        concept: 'No todas las aplicaciones móviles requieren un carrito de compras. Aplicaciones de catálogo, consulta técnica, portfolios o pañoles universitarios se benefician de una Arquitectura Directa basada puramente en Navegación Stack y paso de parámetros, reduciendo el consumo de memoria RAM y simplificando el mantenimiento.',
        image: '/images/rn_catalog_vs_cart.jpg',
        imageCaption: '⚖️ Diagrama Didáctico con IA: Comparativa de Arquitecturas — Izquierda: Arquitectura Directa / Catálogo (Sin Carrito) con navegación Stack lineal, paso de parámetros por ruta [id].tsx, memoria ultraliviana (8MB RAM) y sin sincronización global. Derecha: E-Commerce con Carro que exige Store Centralizado (Zustand/Redux), persistencia en disco y cálculo continuo de totales.',
        stepByStep: [
            'Paso 1: La pantalla principal app/catalog/index.tsx renderiza la lista de componentes técnicos en un FlatList ligero.',
            'Paso 2: Al pulsar sobre un componente, router.push(`/catalog/${item.id}`) navega apilando la pantalla de detalle en el Stack nativo.',
            'Paso 3: La pantalla de detalle app/catalog/[id].tsx lee el parámetro con useLocalSearchParams() y busca el item en la colección de datos.',
            'Paso 4: Se muestra la ficha técnica completa con pinout, consumos y especificaciones sin requerir ningún store global.',
            'Paso 5: El botón atrás ejecuta router.back() desapilando la pantalla y liberando inmediatamente la memoria.'
        ],
        sections: [
            {
                title: '1. ¿Cuándo prescindir del Carrito de Compras?',
                desc: 'Catálogos de consulta, pañoles universitarios, manuales técnicos y portfolios.',
                detail: 'Si la aplicación no realiza transacciones multiproducto ni pagos combinados, incluir un carrito de compras introduce complejidad innecesaria, consumo de memoria y posibles bugs de sincronización.'
            },
            {
                title: '2. Navegación Stack con Expo Router',
                desc: 'router.push({ pathname: "/catalog/[id]", params: { id: item.id } });',
                detail: 'Aprovecha las transiciones nativas del sistema operativo (deslizamiento horizontal en iOS y fundido/elevación en Android). Las pantallas anteriores quedan pausadas en la pila conservando su posición de scroll.'
            },
            {
                title: '3. Parámetros de Ruta con useLocalSearchParams()',
                desc: 'const { id } = useLocalSearchParams<{ id: string }>();',
                detail: 'Permite desacoplar pantallas mediante URLs nativas seguras. Además, habilita enlaces profundos (Deep Linking) para que un alumno pueda abrir la ficha técnica directamente desde un código QR pegado en el componente del laboratorio.'
            },
            {
                title: '4. Rendimiento y Huella de Memoria',
                desc: 'Stateless UI (~8MB RAM) vs Global Store Sync (~35MB RAM)',
                detail: 'Al no tener listeners reactivos permanentes ni stores globales en segundo plano, el recolector de basura de JavaScript (Hermes GC) trabaja de forma óptima en smartphones de gama baja.'
            }
        ],
        pitfalls: [
            '❌ Pasar objetos gigantescos serializados en los parámetros de la ruta (ej: JSON.stringify(componente)). Pasa únicamente el ID string y búscalo en el modelo de datos.',
            '❌ Intentar forzar un carrito en apps donde el usuario solo necesita solicitar una unidad o consultar un datasheet.',
            '❌ No manejar el estado cuando el parámetro [id] no existe o es inválido en rutas dinámicas.'
        ],
        selfCheck: {
            q: '¿Por qué pasar únicamente el ID en la URL de navegación es mejor que pasar todo el objeto del producto?',
            a: 'Porque las URLs nativas tienen límites de longitud y pueden fallar con caracteres especiales. Pasar el ID garantiza que si el usuario comparte la ruta o la abre desde un Deep Link / código QR, la pantalla siempre cargará la información fresca y actualizada desde la fuente de datos.'
        },
        webVsNative: 'En Web se usa react-router o Next.js con useParams(). En React Native Expo Router ofrece la misma semántica moderna pero compilada a controladores nativos de UINavigationController (iOS) y FragmentActivity (Android).',
        tip: 'Si deseas permitir al usuario marcar favoritos sin carrito, usa AsyncStorage con un array simple de IDs de componentes [ "esp32", "sg90" ].'
    },
    flexbox: {
        badge: 'Arquitectura de Layout',
        catedraDoc: {
          "unit": "Unidad 1",
          "topic": "Clase 1 • Kickoff, Setup y JSX en React Native",
          "folderLink": "https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 1 - Código y Fundamentos (PDF)",
          "docLink": "https://drive.google.com/file/d/1bouOw36F31onGQuBQIkHaga7sgm-yQ3T/view?usp=sharing",
          "presentationTitle": "Presentación Clase 1: Kickoff y Arquitectura",
          "presentationLink": "https://drive.google.com/file/d/1IqZ2vZxUf-C6EQk2z_IFS0H1n1_dtx__/view?usp=sharing"
},
        concept: 'En React Native, TODO componente contenedor utiliza Flexbox por defecto con flexDirection: "column" y display: "flex". No existen "block", "inline" ni floats.',
        image: '/images/rn_flexbox_diagram.jpg',
        imageCaption: '📐 Diagrama Didáctico con IA: Arquitectura Flexbox en Móviles — El Eje Principal (Main Axis) es vertical por defecto en smartphones ("column") y el Eje Secundario (Cross Axis) es horizontal. Observa cómo justifyContent distribuye el espacio en el eje vertical y alignItems alinea en el eje horizontal.',
        stepByStep: [
            'Línea 1-2: Importa View (contenedor nativo UIView/ViewGroup), Text (tipografía nativa obligatoria) y StyleSheet.',
            'Línea 4: Declara el componente funcional App() que sirve como pantalla raíz.',
            'Línea 6: Aplica styles.container con flex: 1 para ocupar el 100% del alto y ancho disponible del smartphone.',
            'Líneas 10-18: Renderiza las tarjetas usando flexDirection: "column" y gap: 12 para espaciado táctil ergonómico.',
            'Líneas 24-38: StyleSheet.create() compila los estilos en IDs numéricos nativos inmutables de alto rendimiento.'
        ],
        sections: [
            {
                title: '1. Imports Principales de React Native',
                desc: 'import { View, Text, StyleSheet } from "react-native";',
                detail: '• View: El equivalente nativo a un <div> (se compila a UIView en iOS y ViewGroup/FrameLayout en Android).\n• Text: Imprescindible para renderizar cualquier texto. En React Native no puedes colocar texto libre dentro de una View sin envolverlo en <Text>.\n• StyleSheet: Módulo optimizado de estilos nativos que valida las propiedades y las envía al hilo nativo mediante identificadores numéricos.'
            },
            {
                title: '2. Estructura del Componente',
                desc: 'export default function App() { return <View style={styles.container}>...</View>; }',
                detail: 'El componente principal debe ser exportado por defecto ("export default"). Renderiza un árbol de Views anidadas organizadas con flexbox.'
            },
            {
                title: '3. Reglas de Flexbox en Móviles',
                desc: 'flexDirection, justifyContent y alignItems',
                detail: '• flexDirection: Por defecto es "column" (eje vertical principal). En web es "row".\n• justifyContent: "space-between" distribuye el espacio sobrante equitativamente en el eje principal.\n• gap: Espaciado automático entre elementos hijos sin recurrir a márgenes manuales.'
            },
            {
                title: '4. El objeto StyleSheet.create',
                desc: 'const styles = StyleSheet.create({ container: { flex: 1, ... } });',
                detail: 'flex: 1 hace que el contenedor ocupe el 100% del alto y ancho disponible en la pantalla del smartphone. Las unidades no llevan "px", son píxeles independientes de la densidad (dp en Android / puntos en iOS).'
            }
        ],
        pitfalls: [
            '❌ Escribir texto suelto dentro de <View>texto</View> sin envolverlo en <Text> lanzará un error fatal en tiempo de ejecución.',
            '❌ Asumir que flexDirection es "row" como en CSS web. En React Native siempre es "column" por diseño móvil.',
            '❌ Usar unidades con "px" en StyleSheet (ej: fontSize: "16px"). En React Native los valores deben ser números puros (dp / puntos).'
        ],
        selfCheck: {
            q: '¿Por qué en React Native no podemos utilizar un <div> o escribir texto suelto dentro de <View>?',
            a: 'Porque React Native compila a componentes nativos del sistema operativo (UIKit en iOS y Android Views en Android). Los <div> de HTML no existen en los kernels móviles, y las vistas nativas no admiten cadenas de texto sin una vista especializada como UITextView / TextView (representada por <Text>).'
        },
        webVsNative: 'En Web usas <div> y CSS tradicional con cascada. En React Native no hay cascada (no-inheritance), los estilos son scoped a cada elemento, y no existen bordes o textos directos en contenedores genéricos.',
        tip: 'Usa siempre StyleSheet.create() en lugar de objetos literales inline en JSX para evitar que el Garbage Collector recolecte y recree objetos en cada frame.'
    },
    state: {
        badge: 'Gestión Reactiva de Estado',
        catedraDoc: {
          "unit": "Unidad 2",
          "topic": "Clase 4 • Estado Global y Contexto (UNPilar Reescrita)",
          "folderLink": "https://drive.google.com/drive/folders/1PzTCpnSOltKfVa83nIjYIAslABSDCQvV?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 4 - Estado Global y Contexto (PDF)",
          "docLink": "https://drive.google.com/file/d/1vsb1Z-1J9rnJlbFMnqiGBI-AK1iOdudc/view?usp=sharing",
          "presentationTitle": "Presentación Clase 4: Prop Drilling y Stores",
          "presentationLink": "https://drive.google.com/file/d/1xSztWe-cKcP18enp5FQLUEr-5BH0joNm/view?usp=sharing"
},
        concept: 'El manejo de estado en móviles gobierna la interactividad táctil sin recargar la pantalla. Cada mutación con useState() re-renderiza el árbol de componentes a 60 FPS mediante el motor JavaScript Hermes y el renderer Fabric.',
        image: '/images/rn_state_loop.jpg',
        imageCaption: '🔄 Diagrama Didáctico con IA: Ciclo de Vida y Render Loop — Paso 1: El usuario realiza un gesto táctil físico (onPress). Paso 2: Se invoca setCount() y se actualiza el registro en memoria en el motor Hermes. Paso 3: React calcula la diferencia en el Árbol Virtual (Diffing). Paso 4: Fabric envía la instrucción nativa para actualizar la vista en Android (View) e iOS (UIView).',
        stepByStep: [
            'Línea 1: Importa el Hook useState desde React para crear una variable reactiva con memoria local persistente.',
            'Línea 5: const [count, setCount] = useState(0); Inicializa "count" en 0 y crea la función despachadora "setCount".',
            'Líneas 9-18: Monitor en vivo del código que inspecciona en tiempo real el valor de "count" en memoria y la sentencia de mutación.',
            'Línea 21: TouchableOpacity captura el toque físico del usuario mediante el subsistema táctil nativo.',
            'Línea 22: setCount(c => c + 1) encola el nuevo valor inmutable; React Native programa un re-render eficiente sin parpadeos a 60 FPS.'
        ],
        sections: [
            {
                title: '1. Hook useState & Reactividad Inmutable',
                desc: 'const [count, setCount] = useState(0);',
                detail: 'Define el estado local reactivo. Al invocar setCount(prev => prev + 1), React programa un re-render del componente móvil actualizando únicamente los nodos afectados.'
            },
            {
                title: '2. Eventos Táctiles con TouchableOpacity',
                desc: '<TouchableOpacity onPress={increment}>',
                detail: 'A diferencia de la Web (onClick), los smartphones responden a gestos táctiles. TouchableOpacity proporciona retroalimentación háptica y visual reduciendo la opacidad al pulsar (feedback activo de toque).'
            },
            {
                title: '3. Funciones Manejadoras (Handlers Funcionales)',
                desc: 'const increment = () => { setCount(prev => prev + 1); };',
                detail: 'Se recomienda usar la forma funcional setCount(prev => prev + 1) para garantizar que se opera sobre el valor más reciente del estado ante múltiples toques rápidos consecutivos.'
            },
            {
                title: '4. Estilos Nativos Adaptados al Pulgar',
                desc: 'container, badge, number, buttonGroup, btnPrimary',
                detail: 'Define un diseño móvil centrado con justifyContent: "center" y alignItems: "center". Los botones utilizan borderRadius: 12 y paddingVertical: 12 adaptados a la zona ergonómica del pulgar (Thumb Zone).'
            }
        ],
        pitfalls: [
            '❌ Intentar mutar la variable directamente con count = count + 1. React NO detectará el cambio y el celular nunca se actualizará.',
            '❌ Olvidar usar la forma funcional setCount(c => c + 1) cuando ocurren toques táctiles ultra rápidos consecutivos.',
            '❌ Confundir onClick (evento del ratón web) con onPress (evento de gesto táctil nativo en smartphones).'
        ],
        selfCheck: {
            q: '¿Qué sucede exactamente en memoria cuando el usuario presiona "+ Incrementar Variable count"?',
            a: 'El botón TouchableOpacity captura el evento nativo de touch. Se ejecuta setCount(c => c + 1), el motor Hermes actualiza el registro en memoria de la variable "count", programa un ciclo de renderizado, y el renderer Fabric sincroniza la nueva vista nativa con el nuevo valor numérico.'
        },
        webVsNative: 'En Web usas <button onClick={...}>. En React Native usas <TouchableOpacity onPress={...}> o <Pressable> para controlar eventos touchstart, touchend y respuesta táctil.',
        tip: 'Para listas largas o estados compartidos entre múltiples pantallas, se recomienda Zustand o Redux Toolkit en lugar de prop drilling.'
    },
    flatlist: {
        badge: 'Listas Virtualizadas',
        catedraDoc: {
          "unit": "Unidad 1",
          "topic": "Clase 2 • Componentes Core, Estilos y Listas Optimizadas",
          "folderLink": "https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 2 - Componentes y Layout",
          "docLink": "https://drive.google.com/file/d/1dNn8hVjAyjH6mOtzfbVChJEoTNoJr2Ki/view?usp=sharing",
          "presentationTitle": "Presentación Clase 2: ScrollView vs FlatList",
          "presentationLink": "https://drive.google.com/file/d/14y-HoTb8_AAQ8ROnlW0at3QivQF_9rlY/view?usp=sharing"
},
        concept: 'FlatList es el componente estándar de React Native para renderizar colecciones de cientos o miles de elementos con mínimo consumo de memoria RAM mediante reciclaje de vistas (Windowing/Virtualization).',
        image: '/images/rn_flatlist_recycling.jpg',
        imageCaption: '⚡ Diagrama Didáctico con IA: Virtualización y Reciclaje de Celdas — ScrollView carga 1,000 elementos simultáneamente disparando el uso de memoria RAM (200MB+) y provocando caídas de frames. FlatList virtualiza el scroll: mantiene un pool de solo 10-15 celdas activas en pantalla y recicla las que salen del viewport, logrando 60 FPS estables y consumo mínimo de RAM (20MB).',
        stepByStep: [
            'Línea 1: Importa FlatList, el componente optimizado de alto rendimiento para colecciones móviles.',
            'Línea 12: Define la colección de datos "data={CURSOS}" con objetos JavaScript que contienen IDs únicos.',
            'Línea 15: keyExtractor={item => item.id} provee una clave única de tipo string para rastreo y reciclado de celdas.',
            'Líneas 16-25: renderItem={({ item }) => ...} función de renderizado que devuelve la plantilla nativa de cada fila visible.',
            'Línea 26: contentContainerStyle={{ padding: 16 }} evita que el último elemento sea tapado por la barra de inicio o navegación.'
        ],
        sections: [
            {
                title: '1. Prop data',
                desc: 'data={CURSOS}',
                detail: 'Un arreglo de objetos JavaScript con la información a mostrar. FlatList observa este arreglo para determinar qué filas pintar.'
            },
            {
                title: '2. Prop keyExtractor',
                desc: 'keyExtractor={item => item.id}',
                detail: 'Extrae una clave única de tipo string para cada elemento. Es vital para que React Native rastree los elementos agregados, eliminados o reordenados sin re-renderizar la lista completa.'
            },
            {
                title: '3. Prop renderItem',
                desc: 'renderItem={({ item }) => <View style={styles.card}>...</View>}',
                detail: 'Función que devuelve la plantilla visual para cada fila. Recibe { item, index }. Las filas fuera de pantalla son recicladas para ahorrar memoria.'
            },
            {
                title: '4. contentContainerStyle',
                desc: 'contentContainerStyle={{ padding: 16 }}',
                detail: 'Aplica padding interno al contenido desplazable de la lista, evitando cortar las sombras o bordes de los elementos finales al hacer scroll.'
            }
        ],
        pitfalls: [
            '❌ Usar array.map() dentro de un <ScrollView> para listas con más de 50 elementos provocará caídas de frames y eventual crash por falta de RAM.',
            '❌ Devolver números en lugar de strings en keyExtractor (ej: item.id número sin convertir a String).',
            '❌ Definir renderItem como una función anónima inline pesada que se recree en cada render del padre.'
        ],
        selfCheck: {
            q: '¿Por qué una lista de 5,000 elementos corre fluida en FlatList pero congelaría la app en un ScrollView?',
            a: 'ScrollView crea 5,000 vistas nativas en memoria de forma simultánea consumiendo cientos de megabytes de RAM. FlatList crea un "pool" de apenas unas 10 a 15 celdas y reutiliza las mismas vistas a medida que el usuario hace scroll (Virtualización).'
        },
        webVsNative: 'En Web solemos hacer array.map() dentro de un div con scroll. En móviles esto provocaría un "Out of Memory" (OOM) crash con listas largas. FlatList solo mantiene en memoria los elementos visibles.',
        tip: 'Si necesitas aún más rendimiento en listas masivas (10,000+ items), la librería de Shopify llamada FlashList es hasta 10 veces más rápida que FlatList.'
    },
    router: {
        badge: 'Enrutamiento Basado en Archivos',
        catedraDoc: {
          "unit": "Unidad 1",
          "topic": "Clase 3 • Navegación con Expo Router (File-based Routing)",
          "folderLink": "https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 3 - Navegación con Expo Router (PDF)",
          "docLink": "https://drive.google.com/file/d/1LNHsSg0Qq4ikyXvJHnMRwi6fHrVD0d-_/view?usp=sharing",
          "presentationTitle": "Presentación Clase 3: Stacks, Tabs y Rutas",
          "presentationLink": "https://drive.google.com/file/d/1gb9pp3MF0frUVjY-kyvoil4-kYj82LXq/view?usp=sharing"
},
        concept: 'Expo Router traduce la estructura física de carpetas y archivos en rutas nativas nativamente compiladas, similar a Next.js App Router pero para iOS y Android.',
        image: '/images/rn_router_arch.jpg',
        imageCaption: '🗺️ Diagrama Didáctico con IA: Arquitectura de Enrutamiento Basado en Archivos — La estructura de carpetas app/ se mapea automáticamente a controladores nativos: app/_layout.tsx crea el Root Stack, app/(tabs)/_layout.tsx define la barra de pestañas inferiores, y las rutas dinámicas como app/profile/[id].tsx reciben parámetros por URL nativa.',
        stepByStep: [
            'Línea 1: Importa Tabs y Screen desde expo-router para declarar la navegación por pestañas inferiores.',
            'Línea 5: app/_layout.tsx define el diseño envolvente global (Root Layout) con su Stack principal.',
            'Líneas 8-16: <Tabs.Screen name="index" /> mapea directamente al archivo app/(tabs)/index.tsx.',
            'Líneas 20-28: tabBarIcon inyecta iconos vectoriales de @expo/vector-icons con color reactivo de selección.',
            'Líneas 32-40: useRouter() y <Link href="/detalle"> permiten navegar apilando pantallas (Push) o volviendo atrás (Pop).'
        ],
        sections: [
            {
                title: '1. Contenedor de Pestañas <Tabs>',
                desc: 'import { Tabs } from "expo-router";',
                detail: 'Renderiza una barra de navegación inferior nativa (UITabBar en iOS / NavigationBar en Android) con animación fluida entre pestañas.'
            },
            {
                title: '2. Definición de Pantallas <Tabs.Screen>',
                desc: '<Tabs.Screen name="index" options={{ title: "Inicio" }} />',
                detail: 'Cada Tabs.Screen mapea a un archivo físico. name="index" corresponde a app/(tabs)/index.tsx. Las opciones controlan el título, color e ícono.'
            },
            {
                title: '3. Iconos Vectoriales con @expo/vector-icons',
                desc: 'tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />',
                detail: 'Proporciona miles de iconos vectoriales optimizados (Ionicons, FontAwesome, MaterialIcons) que se adaptan dinámicamente al color activo de la pestaña.'
            },
            {
                title: '4. Enrutamiento declarativo con Link y useRouter',
                desc: 'const router = useRouter(); router.push("/detalle");',
                detail: 'Permite transiciones entre pantallas mediante push, replace o enlaces declarativos <Link href="/perfil">.'
            }
        ],
        pitfalls: [
            '❌ Colocar componentes de pantalla fuera de la carpeta app/ al usar Expo Router.',
            '❌ Olvidar exportar por defecto ("export default") el componente de la pantalla en cada archivo de ruta.',
            '❌ Confundir navegación Web basada en URL con navegación Móvil basada en Pila (Stack) donde las pantallas se superponen y conservan estado.'
        ],
        selfCheck: {
            q: '¿Qué ventaja tiene Expo Router frente a React Navigation clásico con configuraciones manuales?',
            a: 'Expo Router automatiza el enrutamiento según el árbol de archivos (File-based Routing), genera rutas dinámicas seguras [id].tsx, proporciona Deep Linking automático y compila directamente a controladores nativos de UINavigationController (iOS) y Fragment/Activity (Android).'
        },
        webVsNative: 'En la Web el historial de navegación cambia la URL del navegador. En móviles, la navegación administra una pila (Stack) o pestañas (Tabs) con transiciones nativas de deslizamiento a 60 FPS.',
        tip: 'Usa el archivo _layout.tsx en cada carpeta para envolver tus pantallas con temas, barras de navegación o contextos compartidos.'
    },
    form: {
        badge: 'Validación Tipada de Esquemas',
        concept: 'Los formularios móviles requieren validación rigurosa de datos en tiempo real antes de enviar información a la API o base de datos. Zod define esquemas de validación tipados y seguros.',
        image: '/images/rn_form_validation_ux.jpg',
        imageCaption: '🛡️ Diagrama Didáctico con IA: Flujo de Validación de Formularios con Zod y Manejo de Teclado — La entrada táctil en TextInput actualiza el estado, Zod valida el esquema sin lanzar excepciones mediante safeParse(), y la UI reacciona mostrando errores en rojo o confirmación verde.',
        stepByStep: [
            'Línea 2: Importa z desde zod para definir esquemas tipados con validación síncrona.',
            'Líneas 5-8: const userSchema = z.object({...}) define reglas: email() válido y password mínimo de 6 caracteres.',
            'Línea 14: userSchema.safeParse({ email, password }) comprueba la validez sin lanzar excepciones que cuelguen la app.',
            'Líneas 20-30: TextInput controlado con value y onChangeText adaptado al teclado virtual del smartphone.',
            'Línea 35: Botón de envío que solo procede si result.success es true, mostrando mensajes contextuales.'
        ],
        sections: [
            {
                title: '1. Esquema con Zod',
                desc: 'const userSchema = z.object({ email: z.string().email(), password: z.string().min(6) });',
                detail: 'Define la estructura esperada y las reglas de validación declarativas con mensajes de error personalizados.'
            },
            {
                title: '2. Validación segura con safeParse()',
                desc: 'const result = userSchema.safeParse({ email, password });',
                detail: 'Analiza los datos sin lanzar excepciones runtime. Devuelve { success: true, data } si es válido, o { success: false, error } con el detalle de los campos fallidos.'
            },
            {
                title: '3. TextInput Móvil Controlado',
                desc: '<TextInput value={email} onChangeText={setEmail} keyboardType="email-address" />',
                detail: 'onChangeText recibe directamente el texto tipeado (a diferencia de e.target.value en web). secureTextEntry oculta la contraseña con asteriscos.'
            },
            {
                title: '4. Manejo de Errores y Feedback',
                desc: '{error && <Text style={styles.errorText}>⚠️ {error}</Text>}',
                detail: 'Muestra mensajes de error contextuales con estilos de alerta visual antes de proceder a la acción de submit.'
            }
        ],
        pitfalls: [
            '❌ Usar parse() en lugar de safeParse() sin envolverlo en try/catch: provocará un crash si los datos no coinciden.',
            '❌ Olvidar configurar keyboardType="email-address" o secureTextEntry en los campos de contraseña.',
            '❌ No usar KeyboardAvoidingView: el teclado virtual tapará el botón de confirmación en teléfonos compactos.'
        ],
        selfCheck: {
            q: '¿Por qué en móviles se prefiere safeParse() antes que parse() de Zod?',
            a: 'Porque safeParse() no arroja excepciones runtime (throw Error), sino que retorna un objeto tipado { success, data, error }, permitiendo manejar el feedback de error suavemente en la UI sin colapsar la aplicación del usuario.'
        },
        webVsNative: 'En Web usas <form onSubmit={...}> con FormData. En React Native no hay etiqueta <form>; los formularios son combinaciones de estados de TextInput gestionados con hooks o librerías como React Hook Form.',
        tip: 'Utiliza KeyboardAvoidingView para evitar que el teclado virtual del smartphone tape los inputs al escribir.'
    },
    firebase: {
        badge: 'Base de Datos en Tiempo Real',
        catedraDoc: {
          "unit": "Unidad 2",
          "topic": "Clase 5 • Datos Remotos: Firebase Firestore & BaaS",
          "folderLink": "https://drive.google.com/drive/folders/1PzTCpnSOltKfVa83nIjYIAslABSDCQvV?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 5 - Datos Remotos y Firebase (PDF)",
          "docLink": "https://drive.google.com/file/d/1zTPSIKTN-cdEVoNJqt_0018JiXajrjKj/view?usp=sharing",
          "presentationTitle": "Presentación Clase 5: Firestore y Colecciones",
          "presentationLink": "https://drive.google.com/file/d/1Zh-AdbzA7kLcOS06SEz07r-HjWSMaVqL/view?usp=sharing"
},
        concept: 'Cloud Firestore permite crear aplicaciones colaborativas en tiempo real. Mediante listeners WebSocket (onSnapshot), cualquier cambio en la nube se replica instantáneamente en el smartphone.',
        image: '/images/rn_firebase_sync.jpg',
        imageCaption: '🔥 Diagrama Didáctico con IA: Sincronización NoSQL en Tiempo Real — Flujo continuo entre la base de datos Cloud Firestore y el smartphone. onSnapshot() establece un canal WebSocket push que reacciona de inmediato ante cualquier creación, edición o borrado sin necesidad de polling.',
        stepByStep: [
            'Línea 2: Importa collection, onSnapshot y addDoc desde el SDK modular de Firebase v9+ / v10+.',
            'Línea 6: collection(db, "tareas") referencia la colección NoSQL remota.',
            'Líneas 10-18: onSnapshot() establece un canal WebSocket en tiempo real que reacciona a cualquier creación, edición o borrado.',
            'Líneas 22-26: addDoc() envía la mutación asíncrona a la nube con ID criptográfico autogenerado.',
            'Líneas 30-34: return () => unsubscribe() dentro de useEffect asegura cerrar el socket al desmontar la pantalla.'
        ],
        sections: [
            {
                title: '1. Conexión y Referencia a Colecciones',
                desc: 'import { collection, onSnapshot, addDoc } from "firebase/firestore";',
                detail: 'collection(db, "tareas") obtiene una referencia a la colección NoSQL en Firestore.'
            },
            {
                title: '2. Escucha Reactiva con onSnapshot()',
                desc: 'onSnapshot(collection(db, "tareas"), (snapshot) => { ... });',
                detail: 'Abre un canal en tiempo real. Cada vez que se crea, edita o borra un documento en el servidor, Firestore dispara el callback con los documentos actualizados.'
            },
            {
                title: '3. Escritura Asíncrona con addDoc()',
                desc: 'await addDoc(collection(db, "tareas"), { titulo, done: false });',
                detail: 'Inserta un nuevo documento con ID autogenerado único a nivel global por Firebase.'
            },
            {
                title: '4. Limpieza del Listener en useEffect',
                desc: 'useEffect(() => { const unsub = onSnapshot(...); return () => unsub(); }, []);',
                detail: 'Es fundamental retornar la función unsubscribe para cerrar la conexión cuando el componente se desmonta y evitar fugas de memoria (memory leaks).'
            }
        ],
        pitfalls: [
            '❌ No desuscribirse de onSnapshot() al salir de la pantalla provocará fugas de memoria y llamadas fantasma a setState en componentes desmontados.',
            '❌ Guardar credenciales privadas o tokens de administrador de Firebase en el código del cliente móvil.',
            '❌ No configurar Security Rules en Firestore, permitiendo que cualquiera lea o sobrescriba la base de datos completa.'
        ],
        selfCheck: {
            q: '¿Por qué onSnapshot() es superior a realizar peticiones fetch() cada pocos segundos (polling)?',
            a: 'El polling consume batería del smartphone y cuota de red innecesariamente. onSnapshot() utiliza un único socket persistente y el servidor solo envía deltas de datos cuando ocurre una mutación real en la nube.'
        },
        webVsNative: 'Firebase SDK funciona tanto en web como en móviles nativos. En React Native, además puedes integrar persistencia offline con AsyncStorage para que la app funcione sin conexión a Internet.',
        tip: 'Configura siempre Security Rules en la consola de Firebase para asegurar que los usuarios solo puedan leer y escribir sus propios documentos.'
    },
    hardware: {
        badge: 'Acceso a Sensores y Periféricos',
        catedraDoc: {
          "unit": "Unidad 3",
          "topic": "Clase 7 • Hardware, Sensores y Permisos en Runtime",
          "folderLink": "https://drive.google.com/drive/folders/1wGheJ22GDoULB-ZUbciS5-g2bQL32ty4?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 7 - Hardware y Sensores (PDF)",
          "docLink": "https://drive.google.com/file/d/12XJAZ1ROGiTiE30nIFv8DAWM6ce40vc7/view?usp=sharing",
          "presentationTitle": "Presentación Clase 7: Cámara, GPS y Sensores",
          "presentationLink": "https://drive.google.com/file/d/1Z3bkvjk-Rh4s-zFftcTk1kC4K7gMhxN3/view?usp=sharing"
},
        concept: 'React Native permite acceder a las APIs de hardware de iOS y Android mediante bibliotecas de Expo (Cámara, GPS, Acelerómetro, Biometría, Giroscopio) con interfaz JSI de alta velocidad.',
        image: '/images/rn_hardware_sensors.jpg',
        imageCaption: '📱 Diagrama Didáctico con IA: Periféricos y Permisos de Hardware en Smartphones — Muestra la arquitectura entre el código JavaScript/TypeScript y los sensores nativos (GPS, Cámara, Giroscopio, Biometría) gobernados por diálogos de permisos en tiempo de ejecución (Runtime Permissions).',
        stepByStep: [
            'Línea 1: Importa módulos de hardware como CameraView desde expo-camera o Location desde expo-location.',
            'Líneas 5-10: Solicita permisos en runtime con requestCameraPermissionsAsync() antes de intentar leer el sensor.',
            'Líneas 12-18: Renderiza la superficie <CameraView> conectada al sensor óptico nativo del smartphone.',
            'Líneas 20-26: Captura de coordenadas GPS con precisión de alta resolución para geolocalización.',
            'Líneas 30-36: Maneja estados de error o permiso denegado guiando al usuario a la configuración del dispositivo.'
        ],
        sections: [
            {
                title: '1. Modelo de Permisos de Sistema Operativo',
                desc: 'Location.requestForegroundPermissionsAsync()',
                detail: 'Tanto Apple (iOS) como Google (Android) exigen solicitar permiso explícito al usuario en tiempo de ejecución antes de acceder a la cámara o geolocalización.'
            },
            {
                title: '2. Visor de Cámara con CameraView',
                desc: 'import { CameraView } from "expo-camera";',
                detail: 'Renderiza una superficie de video en vivo conectada al sensor óptico trasero o frontal del smartphone.'
            },
            {
                title: '3. Coordenadas GPS en Alta Precisión',
                desc: 'Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });',
                detail: 'Consulta el chip GNSS (GPS/Glonass/Galileo) y devuelve latitud, longitud, altitud y velocidad del dispositivo.'
            },
            {
                title: '4. Manejo de Estados de Hardware',
                desc: 'const [permission, requestPermission] = useCameraPermissions();',
                detail: 'Expo proporciona hooks dedicados para verificar si el usuario concedió, denegó o bloqueó permanentemente los permisos.'
            }
        ],
        pitfalls: [
            '❌ Intentar acceder a la cámara o GPS sin comprobar primero si el permiso fue otorgado provocará un crash inmediato de la app.',
            '❌ Olvidar declarar los motivos de uso en app.json (Info.plist en iOS / AndroidManifest en Android). Apple rechaza apps que no justifiquen el permiso.',
            '❌ Mantener el sensor GPS en máxima precisión constantemente, lo que drena la batería del smartphone en minutos.'
        ],
        selfCheck: {
            q: '¿En qué se diferencia el modelo de permisos de un navegador web del de una aplicación nativa en iOS/Android?',
            a: 'En móviles, los permisos se declaran estáticamente en los manifiestos del sistema operativo y deben solicitarse explícitamente en runtime con diálogos del sistema gobernados por el kernel. Si el usuario selecciona "No volver a preguntar", la app debe redirigirlo a la configuración de ajustes del teléfono.'
        },
        webVsNative: 'En la Web el navegador puede bloquear el acceso si no hay HTTPS. En smartphones nativos, los permisos se declaran en AndroidManifest.xml e Info.plist y son gestionados por el kernel del sistema.',
        tip: 'Comprueba siempre el nivel de batería y la precisión deseada al usar GPS para evitar descargar rápidamente el dispositivo del usuario.'
    },
    animations: {
        badge: 'Animaciones a 60/120 FPS',
        catedraDoc: {
          "unit": "Unidad 3",
          "topic": "Clase 9 • Performance, Testing & Optimización",
          "folderLink": "https://drive.google.com/drive/folders/1wGheJ22GDoULB-ZUbciS5-g2bQL32ty4?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 9 - Performance y Testing (PDF)",
          "docLink": "https://drive.google.com/file/d/1Ke8CeGnE_DPVDdwopyK9zSexEoR07zvR/view?usp=sharing",
          "presentationTitle": "Presentación Clase 9: Profiler y Animaciones Fluidas",
          "presentationLink": "https://drive.google.com/file/d/1K5goU8FNYSnSqc_yzBRdWCW0N30_BbFw/view?usp=sharing"
},
        concept: 'React Native Reanimated 3 ejecuta cálculos de física y transiciones directamente en el hilo de la interfaz de usuario (UI Thread / Render Thread) en C++, sin bloquear el hilo de JavaScript.',
        image: '/images/rn_state_loop.jpg',
        imageCaption: '✨ Diagrama Didáctico con IA: Render Thread y Física Concurrente — La ejecución directa en el UI Thread en C++ evita que cálculos pesados de JavaScript provoquen caídas de frames en animaciones táctiles.',
        stepByStep: [
            'Línea 1: Importa useSharedValue, useAnimatedStyle y withSpring desde react-native-reanimated.',
            'Línea 4: const scale = useSharedValue(1); Declara un valor mutable que reside en el hilo nativo C++.',
            'Línea 8: withSpring(1.2, { damping: 15 }) computa la curva de física de rebote en tiempo real.',
            'Líneas 12-16: useAnimatedStyle mapea el valor compartido a la propiedad de transformación visual.',
            'Línea 20: Animated.View renderiza el nodo nativo con aceleración por hardware GPU.'
        ],
        sections: [
            {
                title: '1. useSharedValue',
                desc: 'const scale = useSharedValue(1);',
                detail: 'Almacena un valor reactivo mutable que vive en el UI Thread nativo sin disparar re-renders de React.'
            },
            {
                title: '2. withSpring & withTiming',
                desc: 'scale.value = withSpring(1.2, { damping: 15 });',
                detail: 'Modifica el valor con simulación física de resorte (spring) o curvas bézier de tiempo, garantizando una respuesta orgánica y natural al tacto.'
            },
            {
                title: '3. useAnimatedStyle',
                desc: 'const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));',
                detail: 'Enlaza el valor compartido con las propiedades visuales del componente (transform, opacity, backgroundColor).'
            },
            {
                title: '4. Componentes <Animated.View>',
                desc: '<Animated.View style={[styles.box, animatedStyle]}>',
                detail: 'Variantes animables de los componentes nativos capaces de actualizar sus propiedades directamente en C++ sin intervención del JavaScript engine.'
            }
        ],
        pitfalls: [
            '❌ Animar "width" o "height" directamente en lugar de "transform: [{ scale }]" recalcula todo el árbol Flexbox (Yoga) provocando lentitud.',
            '❌ Olvidar añadir el plugin de Babel react-native-reanimated/plugin en babel.config.js.',
            '❌ Modificar shared values dentro de callbacks síncronos pesados en el JS thread.'
        ],
        selfCheck: {
            q: '¿Por qué Reanimated es capaz de mantener 60 FPS constantes incluso si la app está procesando datos pesados?',
            a: 'Porque Reanimated compila "worklets" en C++ que corren directamente en el UI Thread (Render Thread) de la GPU nativa, totalmente desacoplados del JavaScript Thread principal.'
        },
        webVsNative: 'En Web usas transiciones CSS o CSS Keyframes. En React Native, usar estilos CSS provocaría saltos de frames si el hilo JS está ocupado procesando datos o peticiones de red. Reanimated garantiza fluidez absoluta.',
        tip: 'Evita animar propiedades de layout como "width" o "height" ya que recalculan el motor Yoga; en su lugar anima "transform: [{ scale }]" y "opacity".'
    },
    api: {
        badge: 'Peticiones de Red Asíncronas',
        catedraDoc: {
          "unit": "Unidad 2",
          "topic": "Clase 5 • Datos Remotos: Firebase Firestore & BaaS",
          "folderLink": "https://drive.google.com/drive/folders/1PzTCpnSOltKfVa83nIjYIAslABSDCQvV?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 5 - Datos Remotos y Firebase (PDF)",
          "docLink": "https://drive.google.com/file/d/1zTPSIKTN-cdEVoNJqt_0018JiXajrjKj/view?usp=sharing",
          "presentationTitle": "Presentación Clase 5: Firestore y Colecciones",
          "presentationLink": "https://drive.google.com/file/d/1Zh-AdbzA7kLcOS06SEz07r-HjWSMaVqL/view?usp=sharing"
},
        concept: 'Las aplicaciones móviles consumen servicios web REST y GraphQL a través del protocolo HTTPS estándar mediante fetch() o axios.',
        image: '/images/rn_firebase_sync.jpg',
        imageCaption: '🌐 Diagrama Didáctico con IA: Flujo de Peticiones Asíncronas Móviles — Solicitud HTTP, gestión de estados (Loading, Data, Error) y renderizado reactivo en el smartphone.',
        stepByStep: [
            'Línea 1: Implementa fetch() nativo de la especificación WHATWG sobre el motor Hermes.',
            'Línea 4: useEffect(() => { loadData(); }, []) dispara la petición al montarse el componente.',
            'Líneas 8-14: ActivityIndicator muestra el spinner nativo de iOS o Android mientras se resuelve la promesa.',
            'Líneas 16-22: Renderizado condicional del error de conexión con botón de reintento.',
            'Líneas 25-35: Mapeo ordenado de la respuesta JSON a componentes nativos con ScrollView.'
        ],
        sections: [
            {
                title: '1. API fetch() Estándar',
                desc: 'fetch("https://api.ejemplo.com/usuarios").then(res => res.json())',
                detail: 'React Native implementa la especificación WHATWG Fetch nativa en el motor Hermes/JSI.'
            },
            {
                title: '2. Ciclo de Carga con useEffect',
                desc: 'useEffect(() => { loadData(); }, []);',
                detail: 'Ejecuta la petición de red cuando el componente móvil se monta en pantalla por primera vez.'
            },
            {
                title: '3. Indicador Nativo ActivityIndicator',
                desc: '<ActivityIndicator size="large" color="#0284c7" />',
                detail: 'Muestra el spinner de carga nativo del sistema operativo (UIActivityIndicatorView en iOS y ProgressBar en Android).'
            },
            {
                title: '4. Manejo de Estados: loading, error, data',
                desc: 'const [loading, setLoading] = useState(true);',
                detail: 'Una experiencia móvil profesional siempre contempla los 3 estados: cargando, error de red y datos listos para renderizar.'
            }
        ],
        pitfalls: [
            '❌ No contemplar el estado "offline" o pérdida de señal en túneles/ascensores.',
            '❌ Olvidar el array de dependencias en useEffect, provocando peticiones de red infinitas en bucle.',
            '❌ No tipar la respuesta de la API con TypeScript o esquemas Zod.'
        ],
        selfCheck: {
            q: '¿Por qué es obligatorio contemplar siempre los tres estados (Loading, Data, Error) en aplicaciones móviles?',
            a: 'Porque los smartphones operan en redes celulares fluctuantes (4G/5G, roaming, pérdida de señal). Un fallo no controlado dejaría la pantalla en blanco o congelada sin feedback para el usuario.'
        },
        webVsNative: 'En móviles, la conectividad cambia constantemente (WiFi a 4G/5G, modo avión, túneles). Es crítico manejar timeouts y reintentos (retry) para una UX robusta.',
        tip: 'Para caching inteligente, deduplicación de peticiones y sincronización en background en React Native, utiliza TanStack Query (React Query).'
    },
    eas: {
        badge: 'DevOps & Compilación en la Nube',
        catedraDoc: {
          "unit": "Unidad 3",
          "topic": "Clase 9 & 10 • Compilación en la Nube con EAS Build",
          "folderLink": "https://drive.google.com/drive/folders/1wGheJ22GDoULB-ZUbciS5-g2bQL32ty4?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 10 - Despliegue y Proyecto Final (PDF)",
          "docLink": "https://drive.google.com/file/d/16SReS3FsO0PYxhyNO6uMw8TGyEyXzwkb/view?usp=sharing",
          "presentationTitle": "Presentación Clase 10: EAS y Despliegue",
          "presentationLink": "https://drive.google.com/file/d/1elVMLpJR3UrTrdhsIPIHutfypdWfgdnp/view?usp=sharing"
},
        concept: 'Expo Application Services (EAS) compila binarios de producción nativos (.apk/.aab para Android y .ipa para iOS) en granjas de servidores en la nube sin requerir una Mac física ni configurar Android Studio localmente.',
        image: '/images/rn_router_arch.jpg',
        imageCaption: '☁️ Diagrama Didáctico con IA: DevOps y Compilación en la Nube — Flujo desde el código local hacia EAS Build, firma criptográfica automática y generación de paquetes para Google Play y App Store.',
        stepByStep: [
            'Línea 1: Configuración del archivo eas.json con perfiles preview y production.',
            'Línea 5: Ejecución de eas build -p android --profile preview en la terminal.',
            'Línea 10: Compilación remota en servidores Linux/macOS con Gradle y Xcode.',
            'Línea 15: Generación del enlace de descarga directa con código QR para el smartphone.',
            'Línea 20: Despliegue de parches instantáneos sin revisión de tiendas mediante EAS Update (OTA).'
        ],
        sections: [
            {
                title: '1. Configuración con eas.json',
                desc: 'eas build -p android --profile preview',
                detail: 'Define los perfiles de compilación (development, preview con APK instalable, y production con AAB para Google Play).'
            },
            {
                title: '2. EAS Credentials & Firma Digital',
                desc: 'Keystore en Android y Certificados de Distribución en iOS',
                detail: 'EAS gestiona automáticamente los certificados criptográficos requeridos por las tiendas oficiales de aplicaciones.'
            },
            {
                title: '3. Generación de APK vs AAB',
                desc: 'APK: Instalación directa en smartphones de prueba. AAB: Bundle optimizado para Google Play Store.',
                detail: 'El archivo APK generado puede ser descargado y testeado directamente en cualquier teléfono físico Android.'
            },
            {
                title: '4. EAS Update (Over The Air / OTA)',
                desc: 'Actualizaciones inmediatas sin pasar por la revisión de las tiendas',
                detail: 'Permite corregir errores de código JavaScript al instante en los dispositivos de los usuarios sin necesidad de una nueva aprobación de Apple o Google.'
            }
        ],
        pitfalls: [
            '❌ Intentar subir un archivo APK a Google Play Store (Google Play solo acepta paquetes AAB bundleados).',
            '❌ Perder las llaves Keystore generadas, lo que impediría actualizar la app para siempre en las tiendas.',
            '❌ Subir credenciales o contraseñas en eas.json al repositorio público de GitHub.'
        ],
        selfCheck: {
            q: '¿Cuál es la diferencia entre un archivo .APK y un .AAB generado por EAS Build?',
            a: 'El .APK es un paquete ejecutable final listo para instalarse directamente en cualquier dispositivo Android de prueba. El .AAB (Android App Bundle) es un formato de publicación para Google Play que genera APKs divididos y optimizados específicamente para la arquitectura y pantalla de cada usuario.'
        },
        webVsNative: 'En Web despliegas archivos estáticos a Vercel o Netlify en segundos. En móviles, compilar código nativo en C++, Java y Swift requiere compiladores pesados (Gradle/Xcode) que EAS resuelve en la nube.',
        tip: 'Utiliza el perfil "preview" para generar un APK descargable por QR antes de enviar la versión definitiva a Google Play.'
    },
    ai: {
        badge: 'Copilotos de IA en Desarrollo Móvil',
        catedraDoc: {
          "unit": "Unidad 3",
          "topic": "Clase 11 • Inteligencia Artificial y Visión Computacional",
          "folderLink": "https://drive.google.com/drive/folders/1wGheJ22GDoULB-ZUbciS5-g2bQL32ty4?usp=drive_link",
          "docTitle": "Apunte Cátedra: Clase 11 - IA y Logo (PDF)",
          "docLink": "https://drive.google.com/file/d/16ZOsnzybpMojppJs69JoIuvK5mWVuEZ0/view?usp=sharing",
          "presentationTitle": "Carpeta Drive Unidad 3",
          "presentationLink": "https://drive.google.com/drive/folders/1wGheJ22GDoULB-ZUbciS5-g2bQL32ty4?usp=drive_link"
},
        concept: 'La integración de modelos de lenguaje (LLMs) acelera la creación de interfaces, la corrección de errores de layout y la optimización de código en React Native.',
        image: '/images/rn_state_loop.jpg',
        imageCaption: '🤖 Diagrama Didáctico con IA: Ingeniería de Prompts para React Native — Transformación guiada de requisitos en código nativo libre de etiquetas web.',
        stepByStep: [
            'Línea 1: Especificar siempre "React Native con Expo SDK 51 y TypeScript" en el prompt inicial.',
            'Línea 5: Solicitar la utilización estricta de StyleSheet.create() en lugar de estilos inline.',
            'Línea 10: Indicar componentes táctiles nativos como TouchableOpacity o Pressable.',
            'Línea 15: Validar el código generado en el simulador interactivo en tiempo real.',
            'Línea 20: Verificar accesibilidad con accessibilityLabel y soporte de lectores de pantalla.'
        ],
        sections: [
            {
                title: '1. Generación de Interfaces Nativas',
                desc: 'Transformar requisitos de negocio en componentes nativos JSX',
                detail: 'La IA asiste en definir rápidamente la jerarquía de Views, textos y paletas de colores optimizadas para pantallas táctiles.'
            },
            {
                title: '2. Resolución de Bugs de Layout',
                desc: 'Diagnóstico de desbordamientos de pantalla y problemas de Flexbox',
                detail: 'Identifica causas comunes como anchos fijos que se cortan en pantallas de distintos tamaños y sugiere soluciones con porcentajes o flex: 1.'
            },
            {
                title: '3. Refactorización para Rendimiento',
                desc: 'Optimización de listas FlatList, memoización y estilos',
                detail: 'Sugiere mover funciones inline fuera del render y consolidar estilos duplicados en StyleSheet.create().'
            },
            {
                title: '4. Internacionalización y Accesibilidad',
                desc: 'Generación de etiquetas A11y y soporte multiidioma',
                detail: 'Ayuda a incorporar accessibilityLabel y accessibilityHint para que personas con discapacidad visual puedan usar la app con TalkBack o VoiceOver.'
            }
        ],
        pitfalls: [
            '❌ Aceptar código que contenga <div>, <span> o <button>, los cuales romperán la aplicación nativa.',
            '❌ No verificar si las librerías generadas por la IA son compatibles con la versión actual de Expo SDK.',
            '❌ Confiar ciegamente en estilos CSS web no soportados como "float", "clear" o "grid".'
        ],
        selfCheck: {
            q: '¿Cuál es el error más común que cometen los modelos de IA al generar código para React Native?',
            a: 'Introducir etiquetas HTML clásicas de la web (como <div>, <p> o <button>) o propiedades CSS no soportadas por el motor Yoga (como display: grid o float). Por eso siempre se debe exigir explícitamente "React Native puro".'
        },
        webVsNative: 'Al usar IA para React Native, asegúrate de indicarle explícitamente "React Native con TypeScript y Expo", para evitar que te genere código con etiquetas HTML como <div> o <button>.',
        tip: 'Prueba tus componentes generados directamente en el simulador interactivo de la derecha para verificar la interactividad en tiempo real.'
    }
};

const CodeExplanationSection = ({ preset }) => {
    const exp = PRESET_EXPLANATIONS[preset.id];
    const [showAnswer, setShowAnswer] = useState(false);
    if (!exp) return null;

    return (
        <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                marginTop: '2rem',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: 'var(--card-shadow)',
                color: 'var(--text-main)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
            }}
        >
            {/* Header del bloque explicativo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem' }}>
                <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid var(--border-color)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.6rem' }}>
                        <Lightbulb size={14} /> Explicación Didáctica y Pedagógica • {preset.unit}
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>{preset.icon}</span> {preset.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '1rem', color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: '850px' }}>
                        {exp.concept}
                    </p>
                </div>

                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: '800', alignSelf: 'flex-start' }}>
                    🏷️ {exp.badge}
                </div>
            </div>

            {/* DOCUMENTACIÓN DE CÁTEDRA OFICIAL LINKED */}
            {exp.catedraDoc && (
                <div style={{
                    background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(15, 23, 42, 0.6) 100%)',
                    border: '1.5px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '18px',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    boxShadow: '0 4px 20px rgba(2, 132, 199, 0.08)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                            <BookOpen size={16} /> Documento Oficial de Cátedra • {exp.catedraDoc.unit}
                        </div>
                        <a
                            href={exp.catedraDoc.folderLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', color: '#cbd5e1', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', padding: '5px 12px', borderRadius: '8px', fontWeight: '700', border: '1px solid rgba(255,255,255,0.1)' }}
                        >
                            <span>📁 Carpeta Google Drive ({exp.catedraDoc.unit})</span>
                            <ExternalLink size={12} />
                        </a>
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📖</span> {exp.catedraDoc.topic}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '2px' }}>
                        {exp.catedraDoc.docLink && (
                            <a
                                href={exp.catedraDoc.docLink}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: '#0284c7', color: '#ffffff', textDecoration: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '800', boxShadow: '0 2px 8px rgba(2,132,199,0.3)' }}
                            >
                                <FileText size={15} />
                                <span>{exp.catedraDoc.docTitle}</span>
                                <ExternalLink size={13} />
                            </a>
                        )}
                        {exp.catedraDoc.presentationLink && (
                            <a
                                href={exp.catedraDoc.presentationLink}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(255,255,255,0.07)', border: '1px solid var(--border-color)', color: 'var(--text-main)', textDecoration: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: '700' }}
                            >
                                <span>📊 {exp.catedraDoc.presentationTitle}</span>
                                <ExternalLink size={13} />
                            </a>
                        )}
                    </div>
                </div>
            )}

            {/* IMAGEN DIDÁCTICA GENERADA CON IA */}
            {exp.image && (
                <div style={{
                    background: 'var(--card-inner-bg)',
                    border: '1.5px solid var(--border-color)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                    <div style={{ padding: '0.75rem 1.25rem', background: 'rgba(56, 189, 248, 0.08)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <Sparkles size={16} /> Diagrama Conceptual Didáctico con Inteligencia Artificial
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Infografía de Alta Definición</span>
                    </div>

                    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', background: '#020617' }}>
                        <img src={getAssetUrl(exp.image)} onError={(e) => handleImageError(e, exp.image)} alt={exp.badge}
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                maxHeight: '480px',
                                objectFit: 'contain',
                                transition: 'transform 0.4s ease'
                            }}
                        />
                    </div>

                    <div style={{ padding: '1rem 1.25rem', background: 'var(--card-inner-bg)', borderTop: '1px solid var(--border-color)' }}>
                        <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6, fontWeight: '500' }}>
                            {exp.imageCaption}
                        </p>
                    </div>
                </div>
            )}

            {/* PASO A PASO DIDÁCTICO */}
            {exp.stepByStep && (
                <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Terminal size={18} /> Flujo de Ejecución Paso a Paso (Línea por Línea)
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {exp.stepByStep.map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                <span style={{ background: 'var(--primary-color)', color: '#0f172a', fontWeight: '900', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', marginTop: '2px', flexShrink: 0 }}>
                                    {idx + 1}
                                </span>
                                <span>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Grid con Desglose Técnico Sección por Sección */}
            <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={18} color="var(--primary-color)" /> Desglose Técnico de Componentes & Props
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {exp.sections.map((sec, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'var(--card-inner-bg)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.6rem'
                            }}
                        >
                            <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--primary-color)' }}>
                                {sec.title}
                            </div>
                            <div style={{
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                fontSize: '0.8rem',
                                fontFamily: 'monospace',
                                color: 'var(--primary-color)',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                {sec.desc}
                            </div>
                            <p style={{
                                margin: 0,
                                fontSize: '0.88rem',
                                color: 'var(--text-dim)',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line'
                            }}>
                                {sec.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ERRORES FRECUENTES EN EXÁMENES Y CÓDIGO */}
            {exp.pitfalls && (
                <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '18px', padding: '1.5rem' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AlertTriangle size={18} /> Errores Frecuentes en Código y Exámenes
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {exp.pitfalls.map((p, idx) => (
                            <div key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                {p}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AUTOEVALUACIÓN DIDÁCTICA CON RESPUESTA INTERACTIVA */}
            {exp.selfCheck && (
                <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <HelpCircle size={18} /> Pregunta de Autoevaluación Conceptual
                        </div>
                        <button
                            onClick={() => setShowAnswer(!showAnswer)}
                            style={{
                                background: showAnswer ? 'var(--border-color)' : 'var(--primary-color)',
                                color: showAnswer ? 'var(--text-main)' : '#0f172a',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '6px 14px',
                                fontSize: '0.8rem',
                                fontWeight: '800',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            {showAnswer ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            <span>{showAnswer ? 'Ocultar Explicación' : '💡 Revelar Explicación y Respuesta'}</span>
                        </button>
                    </div>

                    <p style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem' }}>
                        {exp.selfCheck.q}
                    </p>

                    {showAnswer && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{ marginTop: '0.75rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px' }}
                        >
                            <div style={{ fontWeight: '800', color: '#10b981', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                ✅ RESPUESTA DIDÁCTICA:
                            </div>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                {exp.selfCheck.a}
                            </p>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Comparativa Web vs Mobile & Tip Docente */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                <div style={{
                    background: 'rgba(168, 85, 247, 0.08)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '16px',
                    padding: '1.25rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <span>🌐 vs 📱</span> Diferencia Crítica: React Web vs React Native
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                        {exp.webVsNative}
                    </p>
                </div>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '1.25rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <Sparkles size={16} /> Consejo Docente & Rendimiento Móvil
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                        {exp.tip}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const ReactNativeSimulator = ({ initialPreset = 'flexbox' }) => {
    const [selectedPresetId, setSelectedPresetId] = useState(initialPreset);
    const [deviceType, setDeviceType] = useState('iphone'); // 'iphone' | 'android'
    const [copied, setCopied] = useState(false);
    const [logs, setLogs] = useState([]);
    const [currentTime, setCurrentTime] = useState('12:00');
    const [keyReload, setKeyReload] = useState(0);
    const [customCodes, setCustomCodes] = useState({});

    useEffect(() => {
        if (initialPreset) {
            setSelectedPresetId(initialPreset);
        }
    }, [initialPreset]);

    const activePreset = SIMULATOR_PRESETS.find(p => p.id === selectedPresetId) || SIMULATOR_PRESETS[0];

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateClock();
        const timer = setInterval(updateClock, 30000);
        return () => clearInterval(timer);
    }, []);

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-15), { id: Math.random(), time, msg }]);
    };

    const copyCode = () => {
        const currentCode = customCodes[selectedPresetId] ?? activePreset.code;
        navigator.clipboard.writeText(currentCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        addLog('Código copiado al portapapeles para Expo Snack.');
    };

    const reloadPhone = () => {
        setKeyReload(k => k + 1);
        addLog('[Metro Bundler] Fast Refresh recargado en 120ms.');
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #090e1a 0%, #050810 100%)',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '1.5rem',
            color: '#f8fafc',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>
            {/* Header del Simulador */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Smartphone size={22} color="#fff" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>Simulador React Native & Expo</h3>
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: '#0284c7', color: '#fff', fontWeight: '800' }}>SDK 51+</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Interactúa con código nativo en vivo como en tu smartphone</p>
                    </div>
                </div>

                {/* Preset Selector Grouped Tabs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                    {[
                        {
                            label: '🚀 PASO 1: SETUP & FUNDAMENTOS',
                            tag: 'Comenzar Cátedra',
                            color: '#38bdf8',
                            presets: SIMULATOR_PRESETS.filter(p => ['expo_setup', 'flexbox', 'state', 'flatlist', 'router'].includes(p.id))
                        },
                        {
                            label: '⚡ PASO 2: INTEGRACIÓN & SERVICIOS',
                            tag: 'Módulos Nativos',
                            color: '#a855f7',
                            presets: SIMULATOR_PRESETS.filter(p => ['form', 'api', 'supabase_crud', 'firebase', 'hardware', 'animations', 'eas', 'ai'].includes(p.id))
                        },
                        {
                            label: '🏆 PASO 3: PROYECTOS FINALES (APPS COMPLETAS)',
                            tag: 'Entrega Final Cátedra',
                            color: '#10b981',
                            presets: SIMULATOR_PRESETS.filter(p => ['ecommerce_cart', 'ecommerce_nocart'].includes(p.id))
                        }
                    ].map((group, gIdx) => (
                        <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', fontWeight: '800', color: group.color, letterSpacing: '0.5px' }}>
                                <span>{group.label}</span>
                                <span style={{ fontSize: '0.65rem', padding: '1px 6px', borderRadius: '4px', background: `${group.color}20`, border: `1px solid ${group.color}40` }}>
                                    {group.tag}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                                {group.presets.map(preset => {
                                    const isFinal = ['ecommerce_cart', 'ecommerce_nocart'].includes(preset.id);
                                    const isSetup = preset.id === 'expo_setup';
                                    const label = isSetup ? '🚀 Setup & Comandos PC'
                                        : preset.id === 'ecommerce_cart' ? '🛒 App con Carrito'
                                        : preset.id === 'ecommerce_nocart' ? '📦 App sin Carrito'
                                        : preset.id === 'flexbox' ? 'Layouts'
                                        : preset.id === 'state' ? 'Estado'
                                        : preset.id === 'flatlist' ? 'FlatList'
                                        : preset.id === 'router' ? 'Router'
                                        : preset.id === 'form' ? 'Formularios'
                                        : preset.id === 'firebase' ? 'Firebase'
                                        : preset.id === 'hardware' ? 'Hardware'
                                        : preset.id === 'animations' ? 'Animaciones'
                                        : preset.id === 'api' ? 'API REST'
                                        : preset.id === 'supabase_crud' ? '🐘 Supabase CRUD'
                                        : preset.id === 'eas' ? 'Builds EAS'
                                        : preset.id === 'ai' ? 'Asistente IA'
                                        : preset.title.split(' ')[0];

                                    return (
                                        <button
                                            key={preset.id}
                                            onClick={() => {
                                                setSelectedPresetId(preset.id);
                                                addLog(`Cargando lección: ${preset.title}`);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                padding: isFinal ? '0.48rem 0.95rem' : '0.42rem 0.8rem',
                                                borderRadius: '10px',
                                                fontSize: isFinal ? '0.82rem' : '0.78rem',
                                                fontWeight: '700',
                                                background: selectedPresetId === preset.id
                                                    ? (isFinal ? 'linear-gradient(135deg, #059669, #10b981)' : isSetup ? 'linear-gradient(135deg, #0284c7, #0ea5e9)' : '#0284c7')
                                                    : (isFinal ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)'),
                                                color: selectedPresetId === preset.id ? '#fff' : (isFinal ? '#6ee7b7' : '#cbd5e1'),
                                                border: '1px solid',
                                                borderColor: selectedPresetId === preset.id
                                                    ? (isFinal ? '#34d399' : '#38bdf8')
                                                    : (isFinal ? 'rgba(16,185,129,0.3)' : 'transparent'),
                                                transition: 'all 0.2s',
                                                cursor: 'pointer',
                                                boxShadow: selectedPresetId === preset.id && isFinal ? '0 4px 14px rgba(16,185,129,0.35)' : 'none'
                                            }}
                                        >
                                            {preset.icon}
                                            <span>{label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Stage: Editor / Controls + Smartphone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                {/* COLUMNA IZQUIERDA: Código Fuente & Explicación Didáctica */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
                    {/* Header de la Lección */}
                    <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {activePreset.unit} • Tema del Programa
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lic. Ariel Bulacio (UNPilar)</span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{activePreset.title}</h4>
                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.88rem', color: '#cbd5e1' }}>{activePreset.summary}</p>
                    </div>

                    {/* Editor de Código */}
                    <div style={{ background: '#070b14', borderRadius: '14px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                        <div style={{ padding: '0.6rem 1rem', background: '#0b1120', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                                <Terminal size={14} color="#38bdf8" />
                                <span>App.tsx (TypeScript / JSX)</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {customCodes[selectedPresetId] !== undefined && (
                                    <button
                                        onClick={() => setCustomCodes(p => { const n = {...p}; delete n[selectedPresetId]; return n; })}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid rgba(239,68,68,0.2)' }}
                                    >
                                        <RotateCcw size={12} />
                                        <span>Resetear</span>
                                    </button>
                                )}
                                <button
                                    onClick={copyCode}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                                >
                                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                                </button>
                                <a
                                    href="https://snack.expo.dev"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#0284c7', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Abrir en Expo Snack</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* Código Editable con scroll */}
                        <textarea
                            value={customCodes[selectedPresetId] ?? activePreset.code}
                            onChange={(e) => setCustomCodes(prev => ({ ...prev, [selectedPresetId]: e.target.value }))}
                            spellCheck={false}
                            style={{
                                width: '100%',
                                margin: 0,
                                padding: '1rem',
                                fontSize: '0.8rem',
                                fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                                color: '#e2e8f0',
                                lineHeight: 1.5,
                                height: '320px',
                                minHeight: '320px',
                                resize: 'vertical',
                                border: 'none',
                                outline: 'none',
                                background: '#070b14',
                                display: 'block'
                            }}
                        />
                    </div>

                    {/* Metro Terminal Logs */}
                    <div style={{ background: '#060a12', borderRadius: '14px', border: '1px solid #1e293b', padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800' }}>
                            <Terminal size={14} />
                            <span>CONSOLA METRO BUNDLER / LOGS</span>
                        </div>
                        <div style={{ height: '65px', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'monospace', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {logs.length === 0 ? (
                                <span style={{ color: '#475569' }}>Esperando interacciones en el teléfono...</span>
                            ) : (
                                logs.map(l => (
                                    <div key={l.id} style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{ color: '#64748b' }}>[{l.time}]</span>
                                        <span style={{ color: '#cbd5e1' }}>{l.msg}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Smartphone Chassis Interactivo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Device Selector Switches */}
                    <div style={{ display: 'flex', gap: '0.4rem', background: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                        <button
                            onClick={() => setDeviceType('iphone')}
                            style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', background: deviceType === 'iphone' ? '#0284c7' : 'transparent', color: '#fff' }}
                        >
                            iPhone 15
                        </button>
                        <button
                            onClick={() => setDeviceType('android')}
                            style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', background: deviceType === 'android' ? '#0284c7' : 'transparent', color: '#fff' }}
                        >
                            Pixel Android
                        </button>
                        <button
                            onClick={reloadPhone}
                            title="Recargar App"
                            style={{ padding: '4px 8px', borderRadius: '6px', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>

                    {/* Smartphone Bezel */}
                    <div style={{
                        width: '290px',
                        height: '560px',
                        background: '#000',
                        borderRadius: deviceType === 'iphone' ? '46px' : '36px',
                        padding: '12px',
                        boxShadow: '0 0 0 4px #2b3544, 0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}>
                        {/* Dynamic Island / Notch */}
                        <div style={{
                            position: 'absolute',
                            top: '18px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: deviceType === 'iphone' ? '85px' : '14px',
                            height: deviceType === 'iphone' ? '20px' : '14px',
                            background: '#000',
                            borderRadius: '20px',
                            zIndex: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 3px rgba(255,255,255,0.1)'
                        }}>
                            {deviceType === 'iphone' && (
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a0f1d', marginLeft: 'auto', marginRight: '8px' }} />
                            )}
                        </div>

                        {/* Mobile Screen Surface */}
                        <div style={{
                            flex: 1,
                            background: '#020617',
                            borderRadius: deviceType === 'iphone' ? '36px' : '26px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            border: '1px solid #1e293b'
                        }}>
                            {/* Mobile Status Bar */}
                            <div style={{
                                height: '32px',
                                padding: '0 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#fff',
                                zIndex: 20,
                                background: 'rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <span>{currentTime}</span>
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '10px' }}>
                                    <span>5G</span>
                                    <span>📶</span>
                                    <span>🔋 100%</span>
                                </div>
                            </div>

                            {/* Live App Container */}
                            <div key={keyReload} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', background: '#020617' }}>
                                {customCodes[selectedPresetId] !== undefined ? (
                                    <>
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: '#38bdf8', color: '#000', fontSize: '9px', fontWeight: 'bold', textAlign: 'center', padding: '2px 0', zIndex: 100 }}>
                                            ⚡ LIVE CODE ACTIVADO
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '14px', overflow: 'hidden' }}>
                                            <LiveSimulatorRunner
                                                code={customCodes[selectedPresetId]}
                                                log={addLog}
                                                resetKey={`${selectedPresetId}-${keyReload}`}
                                            />
                                        </div>
                                    </>
                                ) : activePreset.renderSimulator ? (
                                    activePreset.renderSimulator({
                                        config: {},
                                        log: addLog
                                    })
                                ) : (
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                        <LiveSimulatorRunner
                                            code={activePreset.code}
                                            log={addLog}
                                            resetKey={`${selectedPresetId}-${keyReload}`}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Home Indicator Bar */}
                            <div style={{ height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
                                <div style={{ width: '90px', height: '3px', background: '#fff', borderRadius: '999px', opacity: 0.6 }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                        Toca los elementos de la pantalla para interactuar
                    </div>
                </div>

            </div>

            {/* EXPLICACIÓN PEDAGÓGICA Y TÉCNICA DEL CÓDIGO */}
            <CodeExplanationSection preset={activePreset} />
        </div>
    );
};

export default ReactNativeSimulator;
