import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles, Smartphone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'simutec_mobile_course_unlocked';
const VALID_KEYWORDS = [
    'UNPILAR',
    'REACTNATIVE',
    'MOVIL2026',
    'MOVIL',
    'BULACIO',
    'UTN',
    'SIMUTEC',
    'EXPO'
];

export const isMobileUnlocked = () => {
    try {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
};

export const checkKeyword = (input) => {
    if (!input) return false;
    const clean = input.trim().toUpperCase().replace(/\s+/g, '');
    return VALID_KEYWORDS.includes(clean);
};

export const setMobileUnlocked = () => {
    try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        window.dispatchEvent(new Event('mobile_course_unlock_changed'));
    } catch (e) {
        console.error(e);
    }
};

export const lockMobileCourse = () => {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event('mobile_course_unlock_changed'));
    } catch (e) {
        console.error(e);
    }
};

// Modal de Desbloqueo rápido (para usar desde el Navbar o cualquier vista)
export const MobileAccessModal = ({ isOpen, onClose, onUnlocked }) => {
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setKeyword('');
            setError(false);
            setSuccess(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkKeyword(keyword)) {
            setError(false);
            setSuccess(true);
            setMobileUnlocked();
            setTimeout(() => {
                if (onUnlocked) onUnlocked();
                if (onClose) onClose();
            }, 700);
        } else {
            setError(true);
            setSuccess(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(2, 6, 23, 0.85)',
            backdropFilter: 'blur(8px)',
            padding: '16px'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                    background: '#0b1120',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '440px',
                    padding: '2rem',
                    color: '#fff',
                    position: 'relative'
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'transparent',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '18px',
                        cursor: 'pointer',
                        padding: '4px 8px'
                    }}
                >
                    ✕
                </button>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '20px',
                        background: success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.12)',
                        border: `1px solid ${success ? '#10b981' : '#38bdf8'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: success ? '#34d399' : '#38bdf8'
                    }}>
                        {success ? <CheckCircle2 size={32} /> : <Lock size={32} />}
                    </div>

                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        color: '#38bdf8',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        background: 'rgba(56, 189, 248, 0.1)',
                        padding: '4px 10px',
                        borderRadius: '999px'
                    }}>
                        Acceso con Palabra Clave
                    </span>

                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: '0.75rem 0 0.4rem' }}>
                        Curso de Aplicaciones Móviles
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                        Ingresa la palabra clave de la cátedra para desbloquear el programa de React Native y el simulador.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#151d30',
                            border: `1px solid ${error ? '#ef4444' : (success ? '#10b981' : '#23304e')}`,
                            borderRadius: '12px',
                            padding: '10px 14px'
                        }}>
                            <KeyRound size={18} color={error ? '#ef4444' : '#38bdf8'} />
                            <input
                                type="text"
                                autoFocus
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                    if (error) setError(false);
                                }}
                                placeholder="Escribe la palabra clave..."
                                style={{
                                    flex: 1,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '14px',
                                    outline: 'none',
                                    fontWeight: '600'
                                }}
                            />
                        </div>

                        {error && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171', fontSize: '0.8rem', marginTop: '6px' }}>
                                <AlertCircle size={14} /> Palabra clave incorrecta. Revisa con la cátedra o utiliza la pista.
                            </div>
                        )}

                        {success && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.8rem', marginTop: '6px', fontWeight: 'bold' }}>
                                <CheckCircle2 size={14} /> ¡Acceso concedido! Entrando al curso...
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={success}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '12px',
                            borderRadius: '12px',
                            background: success ? '#10b981' : 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                            color: '#fff',
                            fontWeight: '800',
                            fontSize: '14px',
                            border: 'none',
                            cursor: success ? 'default' : 'pointer',
                            boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)'
                        }}
                    >
                        {success ? 'Desbloqueado ✓' : 'Desbloquear Contenido'}
                        {!success && <ArrowRight size={16} />}
                    </button>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px dashed rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '10px',
                        fontSize: '0.78rem',
                        color: '#94a3b8',
                        textAlign: 'center'
                    }}>
                        🔒 <strong style={{ color: '#38bdf8' }}>Acceso reservado:</strong> Ingresa la palabra clave provista por el docente de la cátedra para desbloquear el contenido.
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Componente Wrapper para proteger páginas completas (/aplicaciones-moviles y /simulador-react-native)
export const MobileAccessGate = ({ children }) => {
    const [unlocked, setUnlocked] = useState(isMobileUnlocked());
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const update = () => setUnlocked(isMobileUnlocked());
        window.addEventListener('mobile_course_unlock_changed', update);
        return () => window.removeEventListener('mobile_course_unlock_changed', update);
    }, []);

    if (unlocked) {
        return <>{children}</>;
    }

    const handleUnlock = (e) => {
        e.preventDefault();
        if (checkKeyword(keyword)) {
            setError(false);
            setSuccess(true);
            setMobileUnlocked();
        } else {
            setError(true);
            setSuccess(false);
        }
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1rem',
            background: 'radial-gradient(ellipse at top, #0f172a, #020617)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    maxWidth: '480px',
                    width: '100%',
                    color: '#fff',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)'
                }}
            >
                <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(14, 165, 233, 0.05))',
                    border: '1px solid #38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    color: '#38bdf8'
                }}>
                    <Lock size={36} />
                </div>

                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    border: '1px solid rgba(56, 189, 248, 0.2)',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    color: '#38bdf8',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '1rem'
                }}>
                    <Sparkles size={14} /> Contenido Académico Protegido
                </div>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '0 0 0.5rem', color: '#fff', letterSpacing: '-0.5px' }}>
                    Desarrollo Móvil React Native
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Para acceder a las clases didácticas, proyectos prácticos y al <strong>simulador nativo de smartphone</strong>, introduce la palabra clave asignada a tu cohorte.
                </p>

                <form onSubmit={handleUnlock} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: '#0a0f1d',
                        border: `1px solid ${error ? '#ef4444' : '#334155'}`,
                        borderRadius: '14px',
                        padding: '12px 16px',
                        textAlign: 'left'
                    }}>
                        <KeyRound size={20} color={error ? '#ef4444' : '#38bdf8'} />
                        <input
                            type="text"
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                if (error) setError(false);
                            }}
                            placeholder="Ingresa la palabra clave..."
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                fontSize: '15px',
                                outline: 'none',
                                fontWeight: '600'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f87171', fontSize: '0.85rem', textAlign: 'left' }}>
                            <AlertCircle size={15} /> Palabra clave no válida. Revisa la pista docente.
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '14px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                            color: '#fff',
                            fontWeight: '800',
                            fontSize: '15px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(2, 132, 199, 0.4)'
                        }}
                    >
                        Desbloquear y Ver Curso <ArrowRight size={18} />
                    </button>
                </form>

                <div style={{
                    marginTop: '2rem',
                    padding: '12px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.82rem',
                    color: '#94a3b8'
                }}>
                    🔒 <strong style={{ color: '#38bdf8' }}>Acceso exclusivo:</strong> Ingresa la palabra clave provista por la cátedra para acceder a las unidades y al simulador interactivo.
                </div>
            </motion.div>
        </div>
    );
};

export default MobileAccessGate;
