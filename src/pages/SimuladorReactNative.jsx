import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import MobileAccessGate from '../components/MobileAccessGate';
import {
    Smartphone, Code, Cpu, Sparkles, BookOpen, ArrowLeft,
    CheckCircle2, Layers, Zap, Terminal, ExternalLink, HelpCircle
} from 'lucide-react';
import ReactNativeSimulator, { SIMULATOR_PRESETS } from '../components/ReactNativeSimulator';

const SimuladorReactNative = () => {
    const [searchParams] = useSearchParams();
    const initialPreset = searchParams.get('preset') || 'flexbox';
    const [activeTab, setActiveTab] = useState('simulador'); // 'simulador' | 'cheatsheet' | 'arquitectura'

    return (
        <MobileAccessGate>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1rem 4rem' }}>
            {/* Breadcrumb & Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                        to="/aplicaciones-moviles"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}
                    >
                        <ArrowLeft size={16} /> Volver al Programa
                    </Link>

                    <Link
                        to="/evaluacion-react-native"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            background: 'rgba(16,185,129,0.15)',
                            border: '1px solid rgba(16,185,129,0.35)',
                            color: '#10b981',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            padding: '5px 12px',
                            borderRadius: '8px',
                            textDecoration: 'none'
                        }}
                    >
                        <span>📝 Examen Teórico (100 Q)</span>
                    </Link>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', padding: '4px', borderRadius: '12px' }}>
                    <button
                        onClick={() => setActiveTab('simulador')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer',
                            background: activeTab === 'simulador' ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === 'simulador' ? '#0f172a' : 'var(--text-dim)'
                        }}
                    >
                        📱 Simulador en Vivo
                    </button>
                    <button
                        onClick={() => setActiveTab('arquitectura')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer',
                            background: activeTab === 'arquitectura' ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === 'arquitectura' ? '#0f172a' : 'var(--text-dim)'
                        }}
                    >
                        ⚡ Arquitectura Interna
                    </button>
                    <button
                        onClick={() => setActiveTab('cheatsheet')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer',
                            background: activeTab === 'cheatsheet' ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === 'cheatsheet' ? '#0f172a' : 'var(--text-dim)'
                        }}
                    >
                        📖 Guía Rápida de Componentes
                    </button>
                </div>
            </div>

            {/* Encabezado Principal */}
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(56,189,248,0.12)', border: '1px solid var(--border-color)', borderRadius: '999px', color: 'var(--primary-color)', fontWeight: 800, fontSize: '0.75rem', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Sparkles size={14} /> Laboratorio Interactivo de Desarrollo Móvil
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem', letterSpacing: '-1px' }}>
                    Simulador React Native & Expo
                </h1>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-dim)', maxWidth: '850px', margin: 0, lineHeight: 1.6 }}>
                    Experimenta en tiempo real con componentes nativos, layouts flexibles, navegación Expo Router, formularios validados con Zod, base de datos Firebase y sensores de hardware dentro de un smartphone simulado.
                </p>
            </header>

            {/* TAB CONTENT: SIMULADOR */}
            {activeTab === 'simulador' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <ReactNativeSimulator initialPreset={initialPreset} />

                    {/* Guía Rápida para el Alumno */}
                    <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', fontWeight: '800', marginBottom: '0.5rem' }}>
                                <Smartphone size={18} />
                                <span>1. Probar en tu propio celular</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                                Instala <strong style={{ color: 'var(--text-main)' }}>Expo Go</strong> desde Google Play o App Store. Haz clic en <em>"Abrir en Expo Snack"</em> y escanea el código QR para correr la app en tu teléfono físico sin cables.
                            </p>
                        </div>

                        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontWeight: '800', marginBottom: '0.5rem' }}>
                                <Terminal size={18} />
                                <span>2. Consola de Depuración</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                                Cada acción, toque y cambio de estado dispara eventos en la consola Metro Bundler simulada, mostrando el ciclo de renderizado y las mutaciones.
                            </p>
                        </div>

                        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1.25rem', borderRadius: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', fontWeight: '800', marginBottom: '0.5rem' }}>
                                <Zap size={18} />
                                <span>3. Proyecto Integrador</span>
                            </div>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                                Combina estos módulos para tu entrega del Parcial 2: autenticación con Firebase, navegación en pestañas y cámara integrada.
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB CONTENT: ARQUITECTURA (Bridge vs New Architecture) */}
            {activeTab === 'arquitectura' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1rem' }}>
                            ¿Cómo funciona React Native por dentro?
                        </h2>
                        <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            A diferencia de Flutter (que dibuja sus propios píxeles con Skia o Impeller) o Ionic (que corre dentro de un WebView HTML), <strong style={{ color: 'var(--text-main)' }}>React Native ejecuta componentes 100% nativos del sistema operativo (UIKit en iOS y Android Views en Android)</strong> gobernados por código JavaScript/TypeScript.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                            {/* Arquitectura Clásica */}
                            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', background: 'rgba(148, 163, 184, 0.2)', color: 'var(--text-dim)', padding: '2px 8px', borderRadius: '6px' }}>HISTÓRICO</span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.6rem 0 0.4rem', color: 'var(--text-main)' }}>El Puente Asíncrono (The Bridge)</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    JavaScript y el código nativo (Java/Obj-C) se comunicaban serializando mensajes JSON a través de un puente asíncrono. En listas con miles de elementos o animaciones complejas, este puente podía congestionarse causando caídas de frames.
                                </p>
                            </div>

                            {/* Nueva Arquitectura */}
                            <div style={{ background: 'rgba(56,189,248,0.08)', border: '1.5px solid var(--primary-color)', borderRadius: '14px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', background: 'var(--primary-color)', color: '#0f172a', padding: '2px 8px', borderRadius: '6px' }}>NUEVA ARQUITECTURA (ACTUAL)</span>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0.6rem 0 0.4rem', color: 'var(--primary-color)' }}>JSI, Hermes & Fabric</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    <strong style={{ color: 'var(--text-main)' }}>JavaScript Interface (JSI):</strong> Permite que JavaScript sostenga referencias a objetos nativos C++ en memoria y los invoque directamente de forma síncrona sin serializar JSON.
                                    <br /><br />
                                    <strong style={{ color: 'var(--text-main)' }}>Hermes:</strong> Motor JS optimizado por Meta para arranque instantáneo y mínimo consumo de RAM.
                                    <br /><br />
                                    <strong style={{ color: 'var(--text-main)' }}>Fabric Render & TurboModules:</strong> Renderizador nativo concurrente y carga bajo demanda de módulos nativos.
                                </p>
                            </div>
                        </div>

                        {/* Banner Lecturas PDF recomendadas */}
                        <div style={{ marginTop: '1.75rem', background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <BookOpen size={22} color="var(--primary-color)" />
                                <div>
                                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                        Lecturas oficiales en Google Drive recomendadas para este tema:
                                    </div>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                        • <strong>Learning React Native (O'Reilly):</strong> Capítulos 1 & 2 ("The Architecture of React Native" y "First App")
                                        <br />
                                        • <strong>Diseño de Interfaces (Sommerville):</strong> Principios de interacción y consistencia
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <a
                                    href="https://drive.google.com/file/d/1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD/view?usp=sharing"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--primary-color)', color: '#0f172a', textDecoration: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800' }}
                                >
                                    <span>Ver O'Reilly PDF (15.1 MB)</span>
                                    <ExternalLink size={13} />
                                </a>
                                <a
                                    href="https://drive.google.com/file/d/1GMc7pTpFpvV60x1_TFKFdWZyb0fSWTq5/view?usp=sharing"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-dim)', textDecoration: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}
                                >
                                    <span>Ver Sommerville PDF (907 KB)</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB CONTENT: CHEATSHEET */}
            {activeTab === 'cheatsheet' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { tag: 'View', equiv: 'div', desc: 'Contenedor universal con flexbox habilitado por defecto.' },
                            { tag: 'Text', equiv: 'span / p', desc: 'En RN todo texto DEBE ir dentro de un componente <Text> obligatoriamente.' },
                            { tag: 'TextInput', equiv: 'input', desc: 'Campo de texto con control de teclado numérico, email o contraseña.' },
                            { tag: 'TouchableOpacity', equiv: 'button', desc: 'Elemento táctil con respuesta de opacidad al presionar.' },
                            { tag: 'FlatList', equiv: 'ul / virtual scroll', desc: 'Lista virtualizada con memoria reciclable de alto rendimiento.' },
                            { tag: 'Image', equiv: 'img', desc: 'Carga de imágenes locales con require() o remotas con source={{ uri }}.' },
                            { tag: 'ScrollView', equiv: 'div con scroll', desc: 'Contenedor con desplazamiento simple para pantallas con poco contenido.' },
                            { tag: 'KeyboardAvoidingView', equiv: 'Nativo', desc: 'Ajusta la interfaz cuando el teclado virtual del teléfono se abre.' },
                        ].map(c => (
                            <div key={c.tag} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <code style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary-color)', background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '6px' }}>&lt;{c.tag} /&gt;</code>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Web: &lt;{c.equiv}&gt;</span>
                                </div>
                                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>{c.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Banner Lecturas PDF recomendadas para UI */}
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <BookOpen size={22} color="var(--primary-color)" />
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                                    Lectura recomendada sobre UI & Ergonomía móvil:
                                </div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                    <strong>"Diseñando Apps para Móviles"</strong> (Cuello & Vittone) — Capítulos 3 y 4: Zonas del pulgar, jerarquía visual y componentes táctiles.
                                </div>
                            </div>
                        </div>
                        <a
                            href="https://drive.google.com/file/d/1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'var(--primary-color)', color: '#0f172a', textDecoration: 'none', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800' }}
                        >
                            <span>Abrir en Google Drive (44.7 MB)</span>
                            <ExternalLink size={13} />
                        </a>
                    </div>
                </motion.div>
            )}
            </div>
        </MobileAccessGate>
    );
};

export default SimuladorReactNative;
