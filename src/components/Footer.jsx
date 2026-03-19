import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '3rem 2rem',
            background: 'var(--nav-bg)',
            borderTop: '1px solid var(--glass-border)',
            color: 'var(--text-dim)',
            fontSize: '0.9rem',
            transition: 'background-color 0.3s ease',
            textAlign: 'center'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>simutec.com.ar</h3>
                <p style={{ fontStyle: 'italic' }}>"Soporte didáctico interactivo para la formación tecnológica"</p>
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                    <p>© 2026 simutec.com.ar. Desarrollo Educativo.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
