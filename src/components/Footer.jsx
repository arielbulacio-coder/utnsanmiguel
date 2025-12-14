import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '3rem 2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid var(--glass-border)',
            color: 'var(--text-dim)',
            fontSize: '0.9rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>

                {/* Info Institucional */}
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>EEST UTN San Miguel</h3>
                    <p>Especialidad Electrónica</p>
                    <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>"Formando los técnicos del futuro"</p>

                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Contacto</h4>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                            <span>📧</span> est.sanmiguel@inspt.utn.edu.ar o info.sanmiguel@inspt.utn.edu.ar
                        </p>
                    </div>
                </div>

                {/* Ubicación (Google Maps) */}
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Ubicación</h3>
                    <p style={{ marginBottom: '0.5rem' }}>📍 Rafael 50, Bella Vista, Bs As</p>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                        <iframe
                            title="Ubicacion EEST UTN"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.186626182064!2d-58.69466632426214!3d-34.56636757279159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbdqaaaaaaaaa%3A0xaaaaaaaaaaaaaaa!2sRafael%2050%2C%20B1661%20Bella%20Vista%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                            width="100%"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Redes */}
                <div>
                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Seguinos</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/est.utn.sanmiguel/?hl=es" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E1306C', textDecoration: 'none', fontWeight: 'bold' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.204.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Instagram
                        </a>

                        {/* YouTube */}
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FF0000', textDecoration: 'none', fontWeight: 'bold' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                            YouTube
                        </a>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p>© 2025 EEST UTN San Miguel. Desarrollo Didáctico.</p>
            </div>
        </footer>
    );
};

export default Footer;
