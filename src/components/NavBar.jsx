import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)',
        position: 'sticky',
        top: 0,
        zIndex: 100
    };

    const linkStyle = {
        color: 'var(--text-dim)',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s ease',
        padding: '0.5rem 1rem',
        borderRadius: '8px'
    };

    const activeStyle = {
        color: 'var(--primary-color)',
        background: 'rgba(0, 242, 255, 0.1)',
        border: '1px solid rgba(0, 242, 255, 0.2)'
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrPObWUEKrBqrvd1OYTRY_LwudGF6HC7Ok1A&s"
                    alt="Logo"
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'contain', background: '#fff' }}
                />
                EEST San Miguel
            </Link>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                    to="/"
                    style={{ ...linkStyle, ...(location.pathname === '/' ? activeStyle : {}) }}
                >
                    Inicio
                </Link>
                <Link
                    to="/ley-ohm"
                    style={{ ...linkStyle, ...(location.pathname === '/ley-ohm' ? activeStyle : {}) }}
                >
                    Ley de Ohm
                </Link>
                <Link
                    to="/codigos-resistencias"
                    style={{ ...linkStyle, ...(location.pathname === '/codigos-resistencias' ? activeStyle : {}) }}
                >
                    Códigos
                </Link>
                <Link
                    to="/resistencias-serie-paralelo"
                    style={{ ...linkStyle, ...(location.pathname === '/resistencias-serie-paralelo' ? activeStyle : {}) }}
                >
                    Serie/Paralelo
                </Link>
                <Link
                    to="/kirchhoff"
                    style={{ ...linkStyle, ...(location.pathname === '/kirchhoff' ? activeStyle : {}) }}
                >
                    Kirchhoff
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
