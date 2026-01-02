import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const NavBar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        flexWrap: 'wrap',
        transition: 'background-color 0.3s ease'
    };

    const linkStyle = {
        color: 'var(--text-dim)',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s ease',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        display: 'block',
        minHeight: '44px',
        display: 'flex',
        alignItems: 'center'
    };

    const activeStyle = {
        color: 'var(--primary-color)',
        background: 'rgba(0, 242, 255, 0.1)',
        border: '1px solid rgba(0, 242, 255, 0.2)'
    };

    const hamburgerStyle = {
        display: 'none',
        flexDirection: 'column',
        gap: '4px',
        cursor: 'pointer',
        padding: '0.5rem',
        background: 'none',
        border: 'none'
    };

    const hamburgerLineStyle = {
        width: '25px',
        height: '3px',
        background: 'var(--text-main)',
        borderRadius: '2px',
        transition: 'all 0.3s ease'
    };

    const themeToggleStyle = {
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.2rem',
        transition: 'all 0.3s ease',
        color: 'var(--text-main)'
    };

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPObWUEKrBqrvd1OYTRY_LwudGF6HC7Ok1A&s"
                        alt="Logo"
                        style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '2px solid var(--primary-color)' }}
                    />
                    <span style={{ display: window.innerWidth < 768 ? 'none' : 'inline' }}>EEST San Miguel</span>
                    <span style={{ display: window.innerWidth >= 768 ? 'none' : 'inline' }}>EEST</span>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                    onClick={toggleTheme}
                    style={themeToggleStyle}
                    aria-label="Toggle theme"
                    title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {/* Hamburger Menu Button - Mobile Only */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ ...hamburgerStyle, display: 'flex' }}
                    className="hamburger-menu"
                    aria-label="Toggle menu"
                >
                    <div style={hamburgerLineStyle}></div>
                    <div style={hamburgerLineStyle}></div>
                    <div style={hamburgerLineStyle}></div>
                </button>
            </div>

            {/* Navigation Links */}
            <div
                className="nav-links"
                style={{
                    display: isMenuOpen ? 'flex' : 'none',
                    flexDirection: 'column',
                    width: '100%',
                    gap: '0.5rem',
                    marginTop: '1rem'
                }}
            >
                <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Inicio
                </Link>
                <Link to="/ley-ohm" style={{ ...linkStyle, ...(location.pathname === '/ley-ohm' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Ley de Ohm
                </Link>
                <Link to="/codigos-resistencias" style={{ ...linkStyle, ...(location.pathname === '/codigos-resistencias' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Códigos
                </Link>
                <Link to="/resistencias-serie-paralelo" style={{ ...linkStyle, ...(location.pathname === '/resistencias-serie-paralelo' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Serie/Paralelo
                </Link>
                <Link to="/kirchhoff" style={{ ...linkStyle, ...(location.pathname === '/kirchhoff' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Kirchhoff
                </Link>
                <Link to="/teorema-thevenin" style={{ ...linkStyle, ...(location.pathname === '/teorema-thevenin' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Thévenin
                </Link>
                <Link to="/teorema-norton" style={{ ...linkStyle, ...(location.pathname === '/teorema-norton' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Norton
                </Link>
                <Link to="/conversion-unidades" style={{ ...linkStyle, ...(location.pathname === '/conversion-unidades' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Conversión
                </Link>
                <Link to="/pitagoras" style={{ ...linkStyle, ...(location.pathname === '/pitagoras' ? activeStyle : {}) }} onClick={() => setIsMenuOpen(false)}>
                    Pitágoras
                </Link>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <style>{`
                @media (min-width: 768px) {
                    .hamburger-menu {
                        display: none !important;
                    }
                    .nav-links {
                        display: flex !important;
                        flex-direction: row !important;
                        width: auto !important;
                        margin-top: 0 !important;
                        gap: 0.5rem !important;
                    }
                }
                
                @media (max-width: 767px) {
                    .nav-links a {
                        width: 100%;
                        text-align: left;
                    }
                }
            `}</style>
        </nav>
    );
};

export default NavBar;
