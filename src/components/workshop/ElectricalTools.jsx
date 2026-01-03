import React from 'react';

const ElectricalTools = () => {
    const tools = [
        {
            title: 'Pinza Universal',
            description: 'La herramienta más versátil del electricista. Permite sujetar, doblar, apretar y cortar cables conductores.',
            img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
            use: 'Verifique que el aislamiento de los mangos sea adecuado para la tensión de trabajo (ej. 1000V).'
        },
        {
            title: 'Alicate de Corte Diagonal',
            description: 'Diseñado específicamente para cortar cables y alambres de cobre o aluminio. Su forma permite cortar a ras de una superficie.',
            img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
            use: 'No intente cortar alambres de acero endurecido con un alicate común, ya que dañará el filo.'
        },
        {
            title: 'Buscapolo (Destornillador de Fase)',
            description: 'Dispositivo en forma de destornillador con una lámpara de neón que permite identificar si un conductor tiene tensión (fase).',
            img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
            use: 'Haga contacto con el dedo en la parte metálica superior y la punta en el conductor. La lámpara enciende si hay tensión.'
        },
        {
            title: 'Pelacables Automático',
            description: 'Herramienta que permite retirar el aislamiento plástico de los cables sin dañar los hilos de cobre interiores.',
            img: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
            use: 'Ajuste la longitud de pelado necesaria y presione firmemente para un corte limpio.'
        },
        {
            title: 'Multímetro (Tester)',
            description: 'Instrumento para medir magnitudes eléctricas como voltaje (V), corriente (A) y resistencia (Ω).',
            img: 'https://images.unsplash.com/photo-1597225244660-1cd128c64284?w=400&h=300&fit=crop',
            use: 'Seleccione siempre la escala adecuada antes de conectar las puntas. Empiece por la escala más alta si no está seguro.'
        },
        {
            title: 'Cinta Aisladora',
            description: 'Cinta de PVC con adhesivo sensible a la presión, utilizada para aislar empalmes de hilos y cables eléctricos.',
            img: 'data:image/jpeg;base64,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',
            use: 'Aplique la cinta estirándola ligeramente para que se adhiera con firmeza y cubra bien el cobre expuesto.'
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Herramientas de Electricidad</h2>
            <p style={{ marginBottom: '2rem' }}>
                La seguridad es la prioridad absoluta en las instalaciones eléctricas. Estas herramientas deben tener aislamientos certificados.
            </p>

            <div className="grid-responsive-2col">
                {tools.map((tool, index) => (
                    <div key={index} className="glass-card" style={{ margin: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                            <img src={tool.img} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h3 style={{ color: '#eab308', margin: '0 0 0.5rem 0' }}>{tool.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{tool.description}</p>
                            <div style={{ background: 'rgba(234, 179, 8, 0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #eab308' }}>
                                <small><strong>⚡ Tip de seguridad:</strong> {tool.use}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #eab308', background: 'rgba(234, 179, 8, 0.05)' }}>
                <h3 style={{ color: '#eab308' }}>5 Reglas de Oro</h3>
                <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                    <li>Corte efectivo de todas las fuentes de tensión.</li>
                    <li>Prevenir cualquier posible realimentación (bloqueo).</li>
                    <li>Verificar la ausencia de tensión.</li>
                    <li>Puesta a tierra y en cortocircuito.</li>
                    <li>Señalización de la zona de trabajo.</li>
                </ol>
            </div>
        </div>
    );
};

export default ElectricalTools;
