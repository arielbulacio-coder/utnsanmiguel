import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const NavBar = () => {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null); // 'electronics', 'math', 'physics', 'workshop'

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
        transition: 'all 0.3s ease',
        padding: '0.75rem 1rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        minHeight: '44px',
        cursor: 'pointer'
    };

    const activeStyle = {
        color: 'var(--primary-color)',
        background: 'rgba(0, 242, 255, 0.1)',
        border: '1px solid rgba(0, 242, 255, 0.2)'
    };

    const toggleSubmenu = (name) => {
        if (window.innerWidth < 768) {
            setOpenSubmenu(openSubmenu === name ? null : name);
        }
    };

    const closeAll = () => {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
    };

    return (
        <nav style={navStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={closeAll}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPObWUEKrBqrvd1OYTRY_LwudGF6HC7Ok1A&s"
                        alt="Logo"
                        style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'contain', background: '#fff', border: '2px solid var(--primary-color)' }}
                    />
                    <span className="brand-text">EEST San Miguel</span>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                    onClick={toggleTheme}
                    className="theme-toggle-btn"
                    aria-label="Toggle theme"
                    title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="hamburger-menu"
                    aria-label="Toggle menu"
                >
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>

            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/" style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }} onClick={closeAll}>
                    Inicio
                </Link>

                {/* Submenu Electrónica */}
                <div className={`dropdown ${openSubmenu === 'electronics' ? 'active' : ''}`}>
                    <div
                        className="dropdown-trigger"
                        style={linkStyle}
                        onClick={() => toggleSubmenu('electronics')}
                    >
                        Electrónica <span className="arrow">▼</span>
                    </div>
                    <div className="dropdown-menu">
                        <Link to="/ley-ohm" style={linkStyle} onClick={closeAll}>Ley de Ohm</Link>
                        <Link to="/codigos-resistencias" style={linkStyle} onClick={closeAll}>Códigos</Link>
                        <Link to="/resistencias-serie-paralelo" style={linkStyle} onClick={closeAll}>Serie/Paralelo</Link>
                        <Link to="/kirchhoff" style={linkStyle} onClick={closeAll}>Kirchhoff</Link>
                        <Link to="/teorema-thevenin" style={linkStyle} onClick={closeAll}>Thévenin</Link>
                        <Link to="/teorema-norton" style={linkStyle} onClick={closeAll}>Norton</Link>
                        <Link to="/potencia" style={linkStyle} onClick={closeAll}>Potencia</Link>
                    </div>
                </div>

                {/* Submenu Matemática */}
                <div className={`dropdown ${openSubmenu === 'math' ? 'active' : ''}`}>
                    <div
                        className="dropdown-trigger"
                        style={linkStyle}
                        onClick={() => toggleSubmenu('math')}
                    >
                        Matemática <span className="arrow">▼</span>
                    </div>
                    <div className="dropdown-menu">
                        <Link to="/conversion-unidades" style={linkStyle} onClick={closeAll}>Conversión</Link>
                        <Link to="/pitagoras" style={linkStyle} onClick={closeAll}>Pitágoras</Link>
                        <Link to="/trigonometria" style={linkStyle} onClick={closeAll}>Trigonometría</Link>
                    </div>
                </div>

                {/* Submenu Física */}
                <div className={`dropdown ${openSubmenu === 'physics' ? 'active' : ''}`}>
                    <div
                        className="dropdown-trigger"
                        style={linkStyle}
                        onClick={() => toggleSubmenu('physics')}
                    >
                        Física <span className="arrow">▼</span>
                    </div>
                    <div className="dropdown-menu">
                        <Link to="/cinematica" style={linkStyle} onClick={closeAll}>Cinemática</Link>
                    </div>
                </div>

                {/* Submenu Taller */}
                <div className={`dropdown ${openSubmenu === 'workshop' ? 'active' : ''}`}>
                    <div
                        className="dropdown-trigger"
                        style={linkStyle}
                        onClick={() => toggleSubmenu('workshop')}
                    >
                        Taller <span className="arrow">▼</span>
                    </div>
                    <div className="dropdown-menu">
                        <Link to="/micrometro" style={linkStyle} onClick={closeAll}>Micrómetro</Link>
                        <Link to="/calibre" style={linkStyle} onClick={closeAll}>Calibre</Link>
                        <Link to="/metro-carpintero" style={linkStyle} onClick={closeAll}>Metro Carpintero</Link>
                        <Link to="/seguridad-epp" style={linkStyle} onClick={closeAll}>Seguridad (EPP)</Link>
                        <Link to="/herramientas-carpinteria" style={linkStyle} onClick={closeAll}>Carpintería</Link>
                        <Link to="/metal-mecanica" style={linkStyle} onClick={closeAll}>Metal-Mecánica</Link>
                        <Link to="/herramientas-electricidad" style={linkStyle} onClick={closeAll}>Electricidad</Link>
                        <Link to="/herramientas-electronica" style={linkStyle} onClick={closeAll}>Electrónica</Link>
                    </div>
                </div>
            </div>

            <style>{`
                .theme-toggle-btn {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    borderRadius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    color: var(--text-main);
                }

                .hamburger-menu {
                    display: none;
                    flex-direction: column;
                    gap: 4px;
                    cursor: pointer;
                    padding: 0.5rem;
                    background: none;
                    border: none;
                }

                .hamburger-menu .bar {
                    width: 25px;
                    height: 3px;
                    background: var(--text-main);
                    border-radius: 2px;
                    transition: all 0.3s ease;
                }

                .nav-links {
                    display: flex;
                    gap: 0.5rem;
                }

                .dropdown {
                    position: relative;
                }

                .dropdown-trigger .arrow {
                    font-size: 0.7rem;
                    margin-left: 5px;
                    transition: transform 0.3s ease;
                }

                .dropdown-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: var(--nav-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    min-width: 200px;
                    padding: 0.5rem;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                }

                @media (min-width: 768px) {
                    .dropdown:hover .dropdown-menu {
                        display: block;
                    }
                    .dropdown:hover .arrow {
                        transform: rotate(180deg);
                    }
                }

                @media (max-width: 767px) {
                    .brand-text {
                        display: none;
                    }
                    .hamburger-menu {
                        display: flex;
                    }
                    .nav-links {
                        display: none;
                        flex-direction: column;
                        width: 100%;
                        margin-top: 1rem;
                    }
                    .nav-links.open {
                        display: flex;
                    }
                    .dropdown-menu {
                        position: static;
                        display: none;
                        width: 100%;
                        background: rgba(0,0,0,0.1);
                        box-shadow: none;
                        border: none;
                        padding-left: 1rem;
                    }
                    .dropdown.active .dropdown-menu {
                        display: block;
                    }
                    .dropdown.active .arrow {
                        transform: rotate(180deg);
                    }
                }
            `}</style>
        </nav>
    );
};

export default NavBar;
