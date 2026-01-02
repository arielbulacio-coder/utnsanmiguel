import React from 'react';

const MetalMecanicaTools = () => {
    const tools = [
        {
            title: 'Arco de Sierra para Metales',
            description: 'Se utiliza para cortar metales, plásticos y otros materiales duros. Utiliza una hoja delgada (segueta) con dientes pequeños.',
            img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop',
            use: 'Mantenga la hoja tensa y realice movimientos largos y suaves. El corte se produce al empujar.'
        },
        {
            title: 'Lima (Juego de Limas)',
            description: 'Herramienta de acero templado con una superficie estriada para desbastar, ajustar y acabar piezas metálicas.',
            img: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop',
            use: 'Utilice toda la longitud de la lima y limpie las virutas con un cepillo de alambre (carda) regularmente.'
        },
        {
            title: 'Granete (Punto de Marcar)',
            description: 'Pieza de acero con punta templada que sirve para marcar el centro exacto donde se debe realizar un taladro.',
            img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
            use: 'Coloque la punta en el cruce de las líneas de trazo y golpee suavemente con un martillo para crear la muesca.'
        },
        {
            title: 'Escuadra de Mecánico',
            description: 'Herramienta de acero de gran precisión para verificar la perpendicularidad de caras o marcar ángulos de 90°.',
            img: 'https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=300&fit=crop',
            use: 'Limpie las caras antes de medir. El borde de la escuadra debe asentar perfectamente en la superficie de referencia.'
        },
        {
            title: 'Brocas HSS (Acero Rápido)',
            description: 'Herramientas de corte de forma helicoidal que se utilizan con un tan taladro para realizar agujeros cilíndricos en metal.',
            img: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=400&h=300&fit=crop',
            use: 'Utilice refrigerante (aceite) al taladrar metales para evitar el sobrecalentamiento y la pérdida del filo.'
        },
        {
            title: 'Tornillo de Banco',
            description: 'Herramienta de sujeción anclada a la mesa de trabajo que permite inmovilizar una pieza para limar, cortar o ajustar.',
            img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
            use: 'No golpee el brazo del tornillo con un martillo. Use mordazas de material blando (plomo o aluminio) para no marcar piezas delicadas.'
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Herramientas de Metal-Mecánica</h2>
            <p style={{ marginBottom: '2rem' }}>
                El trabajo con metales requiere herramientas de alta dureza y precisión. Estas son las herramientas manuales más utilizadas en el ajuste mecánico.
            </p>

            <div className="grid-responsive-2col">
                {tools.map((tool, index) => (
                    <div key={index} className="glass-card" style={{ margin: 0, padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                            <img src={tool.img} alt={tool.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>{tool.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{tool.description}</p>
                            <div style={{ background: 'rgba(0, 242, 255, 0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                                <small><strong>🔧 Tip de uso:</strong> {tool.use}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #3b82f6', background: 'rgba(59, 130, 246, 0.05)' }}>
                <h3 style={{ color: '#3b82f6' }}>Seguridad en Mecánica</h3>
                <p>
                    Las virutas de metal son extremadamente afiladas y pueden estar muy calientes. El uso de <strong>gafas de seguridad</strong> es obligatorio y nunca se deben retirar las virutas con la mano desnuda.
                </p>
            </div>
        </div>
    );
};

export default MetalMecanicaTools;
