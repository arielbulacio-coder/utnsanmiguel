import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import MobileAccessGate from '../components/MobileAccessGate';
import {
    Smartphone, Code, Cpu, Sparkles, BookOpen, ArrowLeft,
    CheckCircle2, Layers, Zap, Terminal, ExternalLink, HelpCircle,
    Copy, Check, Laptop, Download, Play, Rocket
} from 'lucide-react';
import ReactNativeSimulator, { SIMULATOR_PRESETS } from '../components/ReactNativeSimulator';

const SimuladorReactNative = () => {
    const [searchParams] = useSearchParams();
    const initialPreset = searchParams.get('preset') || 'expo_setup';
    const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'simulador'); // 'simulador' | 'instalacion' | 'cheatsheet' | 'arquitectura'
    const [copiedCmd, setCopiedCmd] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard?.writeText(text);
        setCopiedCmd(id);
        setTimeout(() => setCopiedCmd(null), 2000);
    };

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
                        onClick={() => setActiveTab('instalacion')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            border: 'none',
                            cursor: 'pointer',
                            background: activeTab === 'instalacion' ? 'var(--primary-color)' : 'transparent',
                            color: activeTab === 'instalacion' ? '#0f172a' : 'var(--text-dim)'
                        }}
                    >
                        🚀 Setup PC & Expo
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

            {/* TAB CONTENT: GUÍA DE INSTALACIÓN PC & EXPO */}
            {activeTab === 'instalacion' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Header Banner */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.15), rgba(14,165,233,0.05))', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '18px', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ maxWidth: '750px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                                <Terminal size={14} /> GUÍA DE INICIO RÁPIDO PARA ALUMNOS
                            </div>
                            <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.6rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                Setup de PC & Comandos Iniciales de Expo SDK 51+
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                Configura tu entorno de desarrollo en Windows, macOS o Linux en menos de 10 minutos. Aprende a crear tu primer proyecto, conectar tu smartphone físico con Expo Go y dominar los atajos de la terminal Metro.
                            </p>
                        </div>
                        <button
                            onClick={() => setActiveTab('simulador')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                                color: '#fff',
                                padding: '0.85rem 1.4rem',
                                borderRadius: '12px',
                                fontWeight: '800',
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px rgba(2,132,199,0.35)'
                            }}
                        >
                            <Smartphone size={18} /> Probar en Simulador en Vivo
                        </button>
                    </div>

                    {/* Infografía IA */}
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '18px', overflow: 'hidden' }}>
                        <div style={{ padding: '1rem 1.25rem', background: 'var(--card-inner-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={16} color="var(--primary-color)" />
                                <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                    Infografía Didáctica con IA: Entorno de Desarrollo y Flujo de Trabajo
                                </span>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alta Definición 16:9</span>
                        </div>
                        <div style={{ padding: '1rem', textAlign: 'center', background: '#020617' }}>
                            <img
                                src={getAssetUrl('/images/rn_expo_pc_setup_guide.jpg')} onError={(e) => handleImageError(e, 'images/rn_expo_pc_setup_guide.jpg')}
                                alt="Infografía Didáctica: Setup de PC y Comandos Expo SDK"
                                style={{ width: '100%', maxHeight: '520px', objectFit: 'contain', borderRadius: '12px' }}
                            />
                        </div>
                        <div style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-dim)', background: 'var(--card-inner-bg)', borderTop: '1px solid var(--border-color)', lineHeight: 1.5 }}>
                            💡 <strong>Fases del Diagrama:</strong> <strong>1)</strong> Herramientas base en la PC (Node.js LTS, VS Code y Git CLI). <strong>2)</strong> Generación del proyecto con <code>npx create-expo-app@latest</code>. <strong>3)</strong> Servidor de desarrollo Metro Bundler con atajos de terminal interactivos. <strong>4)</strong> Transmisión por sockets Wi-Fi hacia la aplicación Expo Go en tu smartphone físico con Fast Refresh instantáneo.
                        </div>
                    </div>

                    {/* FASE 1: Herramientas Necesarias en la PC */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <Laptop size={22} color="var(--primary-color)" />
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                1. Herramientas Necesarias en tu Computadora (PC)
                            </h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                            {/* Node.js */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>🟢 Node.js (LTS)</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>v20+ Requerido</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Entorno de ejecución de JavaScript indispensable para ejecutar el empaquetador Metro y gestionar paquetes con npm/npx.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <code style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>node -v && npm -v</code>
                                    <button
                                        onClick={() => handleCopy('node -v && npm -v', 'node')}
                                        style={{ background: 'none', border: 'none', color: copiedCmd === 'node' ? '#10b981' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem' }}
                                    >
                                        {copiedCmd === 'node' ? <Check size={13} /> : <Copy size={13} />}
                                    </button>
                                </div>
                                <a
                                    href="https://nodejs.org/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Descargar Node.js LTS</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>

                            {/* Visual Studio Code */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>🔵 VS Code</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>Editor Oficial</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Editor ligero recomendado por la cátedra. Instala la extensión oficial <strong>Expo Tools</strong> y <strong>ESLint</strong> para autocompletado y tipado TypeScript.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                    Extensión recomendada: <strong>Expo Tools</strong> (expo.vscode-expo-tools)
                                </div>
                                <a
                                    href="https://code.visualstudio.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Descargar VS Code</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>

                            {/* Git CLI */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>🟠 Git CLI</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(249,115,22,0.15)', color: '#f97316', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>Control de Versiones</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Obligatorio para la cátedra: clonar repositorios de tareas, crear ramas y entregar los proyectos prácticos mediante GitHub.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <code style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>git --version</code>
                                    <button
                                        onClick={() => handleCopy('git --version', 'git')}
                                        style={{ background: 'none', border: 'none', color: copiedCmd === 'git' ? '#10b981' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem' }}
                                    >
                                        {copiedCmd === 'git' ? <Check size={13} /> : <Copy size={13} />}
                                    </button>
                                </div>
                                <a
                                    href="https://git-scm.com/downloads"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Descargar Git para Windows</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>

                            {/* Expo Go en Celular */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>📱 App Expo Go</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(168,85,247,0.15)', color: '#a855f7', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>Android & iOS</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Descárgala en tu smartphone desde Google Play o App Store. Te permite ejecutar y probar tus apps en tu celular físico sin compilar binarios pesados.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '0.75rem', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                                    Disponible gratis en Google Play Store & Apple App Store
                                </div>
                                <a
                                    href="https://expo.dev/go"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Obtener Expo Go</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* FASE 2: Comandos Iniciales para Comenzar el Proyecto */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <Terminal size={22} color="var(--primary-color)" />
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                2. Comandos Iniciales de Terminal (Paso a Paso)
                            </h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                {
                                    step: '1',
                                    title: 'Crear el proyecto con plantilla recomendada',
                                    desc: 'Crea una app limpia con Expo Router configurado, pestañas de navegación inferiores (tabs) y soporte TypeScript listo para usar.',
                                    cmd: 'npx create-expo-app@latest mi-primera-app --template tabs',
                                    id: 'cmd-create'
                                },
                                {
                                    step: '2',
                                    title: 'Acceder al directorio del proyecto',
                                    desc: 'Ingresa a la carpeta recién creada por el asistente de instalación.',
                                    cmd: 'cd mi-primera-app',
                                    id: 'cmd-cd'
                                },
                                {
                                    step: '3',
                                    title: 'Instalar paquetes y dependencias de la cátedra',
                                    desc: 'Instala con compatibilidad nativa garantizada para íconos, estado global (Zustand), esquemas (Zod) y navegación.',
                                    cmd: 'npx expo install @react-navigation/native zustand zod lucide-react-native',
                                    id: 'cmd-deps'
                                },
                                {
                                    step: '4',
                                    title: 'Iniciar el servidor Metro Bundler en tu PC',
                                    desc: 'Arranca el servidor local de desarrollo. En pantalla aparecerá un código QR para escanear con Expo Go.',
                                    cmd: 'npx expo start',
                                    id: 'cmd-start'
                                },
                                {
                                    step: '5',
                                    title: 'Iniciar con Modo Túnel (Para Wi-Fi de la Universidad o Redes con Firewall)',
                                    desc: 'Si la red Wi-Fi de la facultad o tu router bloquea conexiones directas entre la PC y el celular, el túnel conecta ambos dispositivos a través de la nube segura de Expo.',
                                    cmd: 'npx expo start --tunnel',
                                    id: 'cmd-tunnel'
                                }
                            ].map(item => (
                                <div key={item.step} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(56,189,248,0.15)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.95rem', flexShrink: 0 }}>
                                        {item.step}
                                    </div>
                                    <div style={{ flex: 1, minWidth: '240px' }}>
                                        <div style={{ fontWeight: '800', fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                            {item.title}
                                        </div>
                                        <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                            {item.desc}
                                        </p>
                                        <div style={{ background: '#050914', border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                            <code style={{ fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                                {item.cmd}
                                            </code>
                                            <button
                                                onClick={() => handleCopy(item.cmd, item.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.3rem',
                                                    background: copiedCmd === item.id ? '#10b981' : 'rgba(56,189,248,0.15)',
                                                    color: copiedCmd === item.id ? '#fff' : '#38bdf8',
                                                    border: 'none',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '700',
                                                    cursor: 'pointer',
                                                    flexShrink: 0
                                                }}
                                            >
                                                {copiedCmd === item.id ? <Check size={13} /> : <Copy size={13} />}
                                                <span>{copiedCmd === item.id ? '¡Copiado!' : 'Copiar'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FASE 3: Atajos de Teclado en Metro Bundler */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <Zap size={22} color="var(--primary-color)" />
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                3. Atajos de Teclado en la Terminal Metro (Hotkeys)
                            </h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                            {[
                                { key: 'a', title: 'Abrir en Android', desc: 'Lanza la app en el emulador de Android Studio o dispositivo conectado por USB con depuración ADB activada.' },
                                { key: 'i', title: 'Abrir en iOS', desc: 'Lanza la app en el simulador de Xcode (disponible en macOS).' },
                                { key: 'w', title: 'Abrir en Web', desc: 'Ejecuta la app en el navegador web (Google Chrome / Microsoft Edge).' },
                                { key: 'r', title: 'Recargar App', desc: 'Fuerza una recarga total en caliente (Full Reload) en todos los dispositivos conectados.' },
                                { key: 'm', title: 'Menú Desarrollador', desc: 'Abre el Developer Menu en el teléfono (para inspeccionar elementos o activar depurador JS).' },
                                { key: 'c', title: 'Limpiar Caché', desc: 'Purga la memoria caché del empaquetador Metro cuando hay conflictos de resolución de módulos.' },
                                { key: 's', title: 'Alternar Build', desc: 'Cambia entre el entorno Expo Go y Development Build compilado.' }
                            ].map(hk => (
                                <div key={hk.key} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem', flexShrink: 0, boxShadow: '0 2px 8px rgba(2,132,199,0.4)' }}>
                                        {hk.key}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.2rem' }}>
                                            {hk.title}
                                        </div>
                                        <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', lineHeight: 1.4 }}>
                                            {hk.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FASE 4: Errores Frecuentes y Checklist de Soluciones */}
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                            <HelpCircle size={20} color="#f59e0b" />
                            <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                Solución de Problemas Comunes en Windows
                            </h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ padding: '0.75rem 1rem', background: 'var(--card-inner-bg)', borderLeft: '4px solid #ef4444', borderRadius: '8px', fontSize: '0.85rem' }}>
                                <strong style={{ color: '#ef4444' }}>❌ Error: "node no se reconoce como un comando interno o externo":</strong>
                                <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>
                                    Al instalar Node.js en Windows no se marcó la casilla "Add to PATH". Solución: Reinstala Node.js y asegúrate de tildar la opción de agregar variables de entorno al PATH.
                                </p>
                            </div>

                            <div style={{ padding: '0.75rem 1rem', background: 'var(--card-inner-bg)', borderLeft: '4px solid #f59e0b', borderRadius: '8px', fontSize: '0.85rem' }}>
                                <strong style={{ color: '#f59e0b' }}>⚠️ Celular no conecta al escanear el QR:</strong>
                                <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>
                                    La PC y el teléfono deben estar conectados a la misma red Wi-Fi. Si la red tiene aislamiento de clientes (AP Isolation frecuente en facultades o empresas), inicia con <code style={{ color: 'var(--primary-color)' }}>npx expo start --tunnel</code>.
                                </p>
                            </div>

                            <div style={{ padding: '0.75rem 1rem', background: 'var(--card-inner-bg)', borderLeft: '4px solid #38bdf8', borderRadius: '8px', fontSize: '0.85rem' }}>
                                <strong style={{ color: '#38bdf8' }}>💡 Error de Scripts en PowerShell ("La ejecución de scripts está deshabilitada"):</strong>
                                <p style={{ margin: '4px 0 0', color: 'var(--text-dim)' }}>
                                    Abre PowerShell como Administrador y ejecuta: <code style={{ color: 'var(--primary-color)' }}>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</code>.
                                </p>
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
