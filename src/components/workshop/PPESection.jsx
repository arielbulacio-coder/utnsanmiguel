import React from 'react';
import glassesImg from '../../assets/ppe_glasses.png';
import glovesImg from '../../assets/ppe_gloves.png';
import helmetImg from '../../assets/ppe_helmet.png';
import bootsImg from '../../assets/ppe_boots.png';
import hearingImg from '../../assets/ppe_hearing.png';

const PPESection = () => {
    const ppeItems = [
        {
            title: 'Gafas de Seguridad',
            description: 'Protegen los ojos de partículas voladoras, salpicaduras químicas y radiación. Es obligatorio cuando se utilizan máquinas herramienta, soldadura o cualquier proceso que genere virutas.',
            img: glassesImg,
            use: 'Asegúrese de que ajusten bien al rostro y no tengan rayaduras que impidan la visión.'
        },
        {
            title: 'Guantes de Protección',
            description: 'Protegen las manos de cortes, abrasiones, químicos y riesgos eléctricos. Existen diferentes tipos (cuero, nitrilo, dieléctricos) según la tarea.',
            img: glovesImg,
            use: 'Seleccione el guante adecuado al riesgo. No use guantes cerca de partes móviles rotativas.'
        },
        {
            title: 'Casco de Seguridad',
            description: 'Protege la cabeza contra impactos de objetos que caen, golpes contra objetos fijos o riesgos eléctricos.',
            img: helmetImg,
            use: 'Debe usarse con el barboquejo ajustado y verificar que la estructura interna esté en buen estado.'
        },
        {
            title: 'Calzado de Seguridad',
            description: 'Botas con puntera de acero o composite que protegen contra la caída de objetos pesados y suelas antideslizantes para evitar caídas.',
            img: bootsImg,
            use: 'Mantenga el calzado limpio y seco. Reemplace si la puntera o la suela están comprometidas.'
        },
        {
            title: 'Protección Auditiva',
            description: 'Reduce la exposición a niveles de ruido peligrosos que pueden causar pérdida auditiva permanente.',
            img: hearingImg,
            use: 'Use orejeras o tapones en áreas con ruido constante superior a 80dB.'
        }
    ];

    return (
        <div className="glass-card section-container">
            <h2>Elementos de Protección Personal (EPP)</h2>
            <p style={{ marginBottom: '2rem' }}>
                El uso de EPP es la última barrera de defensa contra accidentes en el taller. Es responsabilidad de cada alumno y docente utilizarlos correctamente.
            </p>

            <div className="grid-responsive-2col">
                {ppeItems.map((item, index) => (
                    <div key={index} className="glass-card ppe-item" style={{ margin: 0, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                        <div style={{ width: '100%', height: '200px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)', background: '#fff' }}>
                            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--primary-color)', margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{item.description}</p>
                            <div style={{ background: 'rgba(0, 242, 255, 0.05)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--primary-color)' }}>
                                <small><strong>💡 Uso correcto:</strong> {item.use}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="glass-card" style={{ marginTop: '2rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
                <h3 style={{ color: '#ef4444' }}>⚠️ Regla de Oro en el Taller</h3>
                <p>
                    <strong>"Si no tiene puesto su EPP adecuado, NO ingresa a la zona de máquinas."</strong>
                    <br />
                    La seguridad es un hábito, no una opción.
                </p>
            </div>
        </div>
    );
};

export default PPESection;
