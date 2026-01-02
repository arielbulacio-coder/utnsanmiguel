import React from 'react';

const CarpentryToolsTheory = () => {
    const baseUrl = import.meta.env.BASE_URL;

    const tools = [
        {
            title: 'Martillo de Carpintero (de Uña)',
            description: 'Es la herramienta básica para clavar y extraer clavos. La "uña" curva permite hacer palanca para quitar clavos con facilidad.',
            img: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
            use: 'Sujete el mango por el extremo para ganar palanca y mantenga la vista en el clavo.'
        },
        {
            title: 'Serrucho Manual',
            description: 'Diseñado para realizar cortes rectos en madera. Existen serruchos de costilla para cortes de precisión y serruchos de punta para curvas amplias.',
            img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
            use: 'Inicie el corte con un suave movimiento hacia atrás. Mantenga el serrucho a un ángulo de 45°.'
        },
        {
            title: 'Formón',
            description: 'Herramienta de corte manual con hoja de acero para realizar rebajes, muescas y tallados en madera.',
            img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop',
            use: 'Use siempre el formón alejándolo de su cuerpo. Nunca ponga la mano frente al filo.'
        },
        {
            title: 'Escuadra de Carpintero',
            description: 'Indispensable para verificar ángulos de 90 grados y realizar trazos perpendiculares exactos.',
            img: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=300&fit=crop',
            use: 'Apoye firmemente el talón de la escuadra contra el borde de la madera para un trazo preciso.'
        },
        {
            title: 'Garlopa o Cepillo de Mano',
            description: 'Se utiliza para desbastar, alisar o rectificar superficies de madera mediante el corte de virutas finas.',
            img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            use: 'Ajuste la hoja para un corte fino. Siga siempre el sentido de la veta de la madera.'
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Herramientas Manuales de Carpintería</h2>
            <p style={{ marginBottom: '2rem' }}>
                Conocer y dominar las herramientas manuales es fundamental para cualquier técnico. La precisión en el uso de estas herramientas define la calidad del trabajo final.
            </p>

            <div className="grid-responsive-2col">
                {tools.map((tool, index) => (
                    <div key={index} className="glass-card" style={{ margin: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                            <img src={tool.img} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>{tool.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{tool.description}</p>
                            <div style={{ background: 'rgba(212, 163, 115, 0.1)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #d4a373' }}>
                                <small><strong>🔧 Tip de uso:</strong> {tool.use}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #bc6c25', background: 'rgba(188, 108, 37, 0.05)' }}>
                <h3 style={{ color: '#bc6c25' }}>Mantenimiento de Herramientas</h3>
                <p>
                    Para que una herramienta dure décadas, debe mantenerse limpia de resina, libre de óxido (usando una ligera capa de aceite mineral) y, sobre todo, <strong>afilada</strong>. Una herramienta desafilada es más peligrosa porque requiere aplicar más fuerza.
                </p>
            </div>
        </div>
    );
};

export default CarpentryToolsTheory;
