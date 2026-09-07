import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, KeyRound, Sparkles, Cpu, Zap, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

const STORAGE_KEY = 'simutec_utn_unlocked';
const VALID_KEYWORDS = [
    'UTNSANMIGUEL',
    'UTN-SANMIGUEL',
    'UTN SAN MIGUEL'
];

export const isUtnUnlocked = () => {
    try {
        return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
};

export const checkUtnKeyword = (input) => {
    if (!input) return false;
    const clean = input.trim().toUpperCase().replace(/\s+/g, '');
    return VALID_KEYWORDS.includes(clean) || clean === 'UTNSANMIGUEL';
};

export const setUtnUnlocked = () => {
    try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        window.dispatchEvent(new Event('utn_access_unlock_changed'));
    } catch (e) {
        console.error(e);
    }
};

export const lockUtn = () => {
    try {
        sessionStorage.removeItem(STORAGE_KEY);
        window.dispatchEvent(new Event('utn_access_unlock_changed'));
    } catch (e) {
        console.error(e);
    }
};

// Modal de Desbloqueo rápido para UTN Electrónica
export const UtnAccessModal = ({ isOpen, onClose, onUnlocked }) => {
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setKeyword('');
            setError(false);
            setSuccess(false);
            setShowPassword(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkUtnKeyword(keyword)) {
            setError(false);
            setSuccess(true);
            setUtnUnlocked();
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
            background: 'rgba(2, 6, 23, 0.88)',
            backdropFilter: 'blur(10px)',
            padding: '16px'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                    background: '#0b1120',
                    border: '1px solid rgba(0, 242, 255, 0.3)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 242, 255, 0.2)',
                    borderRadius: '24px',
                    width: '100%',
                    maxWidth: '450px',
                    padding: '2.2rem 2rem',
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
                        background: success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 242, 255, 0.12)',
                        border: `1px solid ${success ? '#10b981' : '#00f2ff'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: success ? '#34d399' : '#00f2ff'
                    }}>
                        {success ? <CheckCircle2 size={32} /> : <Zap size={32} />}
                    </div>

                    <span style={{
                        fontSize: '0.72rem',
                        fontWeight: '800',
                        color: '#00f2ff',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        background: 'rgba(0, 242, 255, 0.1)',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        border: '1px solid rgba(0, 242, 255, 0.25)'
                    }}>
                        Área Protegida · UTN
                    </span>

                    <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', margin: '0.8rem 0 0.4rem' }}>
                        UTN Electrónica
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                        Ingresa la palabra clave institucional para acceder a todos los contenidos de Electricidad, Robótica, Taller y Ciencias.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: `1.5px solid ${error ? '#ef4444' : 'rgba(0, 242, 255, 0.3)'}`,
                            borderRadius: '14px',
                            padding: '0 12px',
                            transition: 'all 0.2s ease'
                        }}>
                            <KeyRound size={18} color={error ? '#ef4444' : '#00f2ff'} style={{ marginRight: '8px' }} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                autoFocus
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                    if (error) setError(false);
                                }}
                                placeholder="Palabra clave de acceso..."
                                style={{
                                    width: '100%',
                                    background: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                    padding: '13px 0',
                                    color: '#fff',
                                    fontSize: '15px',
                                    fontWeight: '600'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {error && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '0.8rem', marginTop: '6px' }}>
                                <AlertCircle size={14} /> Palabra clave incorrecta. Por favor consulta con tu docente.
                            </div>
                        )}

                        {success && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontSize: '0.8rem', marginTop: '6px', fontWeight: 'bold' }}>
                                <CheckCircle2 size={14} /> ¡Acceso concedido! Desbloqueando UTN Electrónica...
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
                            background: success ? '#10b981' : 'linear-gradient(135deg, #0284c7, #00f2ff)',
                            color: success ? '#fff' : '#020617',
                            fontWeight: '800',
                            fontSize: '14px',
                            border: 'none',
                            cursor: success ? 'default' : 'pointer',
                            boxShadow: '0 4px 15px rgba(0, 242, 255, 0.35)'
                        }}
                    >
                        {success ? 'Desbloqueado ✓' : 'Acceder a UTN Electrónica'}
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
                        🔒 <strong style={{ color: '#00f2ff' }}>Acceso a cátedra:</strong> Ingresa la palabra clave provista por el docente para desbloquear los contenidos de UTN San Miguel.
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

// Componente Wrapper para proteger páginas completas si se desea
export const UtnAccessGate = ({ children }) => {
    const [unlocked, setUnlocked] = useState(isUtnUnlocked());
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const update = () => setUnlocked(isUtnUnlocked());
        window.addEventListener('utn_access_unlock_changed', update);
        return () => window.removeEventListener('utn_access_unlock_changed', update);
    }, []);

    if (unlocked) {
        return children;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (checkUtnKeyword(keyword)) {
            setError(false);
            setSuccess(true);
            setUtnUnlocked();
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
            background: 'radial-gradient(circle at center, rgba(0, 242, 255, 0.06) 0%, transparent 70%)'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    maxWidth: '480px',
                    width: '100%',
                    background: 'rgba(11, 17, 32, 0.95)',
                    border: '1px solid rgba(0, 242, 255, 0.25)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 242, 255, 0.15)',
                    borderRadius: '24px',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    color: '#fff'
                }}
            >
                <div style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '22px',
                    background: 'rgba(0, 242, 255, 0.12)',
                    border: '1px solid #00f2ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    color: '#00f2ff',
                    boxShadow: '0 0 25px rgba(0, 242, 255, 0.25)'
                }}>
                    <Zap size={36} />
                </div>

                <span style={{
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    color: '#00f2ff',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    background: 'rgba(0, 242, 255, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: '1px solid rgba(0, 242, 255, 0.25)'
                }}>
                    Módulos Protegidos · UTN
                </span>

                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, margin: '1rem 0 0.5rem', color: '#fff' }}>
                    UTN Electrónica
                </h1>

                <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>
                    Este contenido formativo está reservado para la comunidad de UTN San Miguel.
                    Ingresa la palabra clave de la materia para desbloquear.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: `1.5px solid ${error ? '#ef4444' : 'rgba(0, 242, 255, 0.3)'}`,
                        borderRadius: '14px',
                        padding: '0 12px',
                        transition: 'all 0.2s ease'
                    }}>
                        <KeyRound size={18} color={error ? '#ef4444' : '#00f2ff'} style={{ marginRight: '8px' }} />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={keyword}
                            onChange={(e) => {
                                setKeyword(e.target.value);
                                if (error) setError(false);
                            }}
                            placeholder="Palabra clave de acceso..."
                            style={{
                                width: '100%',
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                padding: '14px 0',
                                color: '#fff',
                                fontSize: '15px',
                                fontWeight: '600'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#64748b',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>

                    {error && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ef4444', fontSize: '0.82rem' }}>
                            <AlertCircle size={15} /> Palabra clave incorrecta. Por favor consulta con tu docente.
                        </div>
                    )}

                    {success && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#34d399', fontSize: '0.82rem', fontWeight: 'bold' }}>
                            <CheckCircle2 size={15} /> ¡Acceso verificado! Cargando contenido...
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
                            background: 'linear-gradient(135deg, #0284c7, #00f2ff)',
                            color: '#020617',
                            fontWeight: '800',
                            fontSize: '15px',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 6px 20px rgba(0, 242, 255, 0.35)'
                        }}
                    >
                        Desbloquear UTN Electrónica <ArrowRight size={18} />
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
                    🔒 <strong style={{ color: '#00f2ff' }}>Acceso a cátedra:</strong> Ingresa la palabra clave provista por el docente para acceder a los módulos técnicos.
                </div>
            </motion.div>
        </div>
    );
};

export default UtnAccessGate;
