import React from 'react';
import './DrawingStyles.css';

const ProjectionsPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Sistemas de Proyección (ISO E / ISO A)</h1>
                <p>El método de Monge: De 3D a 2D con precisión工业.</p>
            </header>

            <div className="drawing-grid">
                {/* NIVEL 1 - SISTEMA EUROPEO */}
                <section className="drawing-card level-basic">
                    <div className="level-badge">1er AÑO - BÁSICO</div>
                    <h2>ISO E: El Estándar IRAM</h2>
                    <p>En el Sistema Europeo, proyectamos sobre planos situados detrás del objeto. Imagina que el objeto está en una "Caja de Vidrio" y dibujas la sombra sobre las caras.</p>
                    <div className="vistas-order">
                        <div className="vista-box">ANTERIOR (FRENTE)</div>
                        <div className="vistas-row">
                            <div className="vista-box side">LATERAL IZQ.</div>
                            <div className="vista-box side">LATERAL DER.</div>
                        </div>
                        <div className="vista-box bottom">SUPERIOR (PLANTA)</div>
                    </div>
                </section>

                {/* NIVEL 2 - SISTEMA AMERICANO Y CORTES */}
                <section className="drawing-card level-advanced">
                    <div className="level-badge">2do AÑO - AVANZADO</div>
                    <h2>ISO A vs ISO E: La Diferencia</h2>
                    <p>Mientras que en ISO E (Europa) el objeto está entre el observador y el plano; en ISO A (EEUU), el plano está ENTRE el observador y el objeto.</p>
                    <div className="symbol-comparison">
                        <div className="symbol-item">
                            <span>ISO E (IRAM)</span>
                            <svg viewBox="0 0 40 20" width="80"><path d="M5,5 L15,2 L15,18 L5,15 Z M25,10 A5,5 0 1,1 35,10 A5,5 0 1,1 25,10" fill="none" stroke="var(--primary-color)" strokeWidth="0.5" /></svg>
                        </div>
                        <div className="symbol-item">
                            <span>ISO A (ANSI)</span>
                            <svg viewBox="0 0 40 20" width="80"><path d="M25,5 L35,2 L35,18 L25,15 Z M5,10 A5,5 0 1,1 15,10 A5,5 0 1,1 5,10" fill="none" stroke="var(--secondary-color)" strokeWidth="0.5" /></svg>
                        </div>
                    </div>
                </section>

                <section className="drawing-card full-width">
                    <h2>IRAM 4507: Cortes y Secciones (Avanzado)</h2>
                    <p>Cuando el interior de una pieza es complejo, realizamos un "corte" imaginario para ver el interior.</p>
                    <div className="cortes-info">
                        <ul>
                            <li><strong>Línea de Corte:</strong> Se indica con línea Tipo F (Trazo y punto) con extremos gruesos.</li>
                            <li><strong>Rayado de Sección:</strong> Línea continua fina (Tipo B) a 45°.</li>
                            <li><strong>Sentido de Observación:</strong> Indicado por flechas en los extremos de la línea de corte.</li>
                        </ul>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Ejercicios 1° Año</h2>
                    <ul className="exercise-list">
                        <li><strong>Deducción de vistas:</strong> Dado un isométrico simple de 10x10, dibujar las 3 vistas ortogonales principales (Escala 1:1).</li>
                        <li><strong>Correspondencia:</strong> Identificar qué vista corresponde a qué cara señalada en el sólido.</li>
                        <li><strong>Aristas Ocultas:</strong> Aplicar línea Tipo E en vistas donde hay huecos no visibles.</li>
                    </ul>
                </section>

                <section className="drawing-card">
                    <h2>Ejercicios 2° Año</h2>
                    <ul className="exercise-list">
                        <li><strong>Corte Longitudinal:</strong> Representar una pieza mecánica hueca realizando un corte A-A por su eje de simetría.</li>
                        <li><strong>Acotación en Vistas:</strong> Acotar un conjunto de 3 vistas siguiendo estrictamente la Norma IRAM 4513.</li>
                        <li><strong>Simetría:</strong> Utilizar el símbolo de simetría en piezas circulares para omitir vistas redundantes.</li>
                    </ul>
                </section>
            </div>

            <style>{`
                .vistas-order { display: flex; flex-direction: column; align-items: center; gap: 10px; margin-top: 1rem; }
                .vistas-row { display: flex; gap: 10px; }
                .vista-box { padding: 10px 20px; border: 1px dashed var(--primary-color); background: rgba(0,242,255,0.05); font-size: 0.8rem; border-radius: 4px; }
                .vista-box.side { border-color: var(--secondary-color); }
                .symbol-comparison { display: flex; justify-content: space-around; padding: 20px; background: rgba(0,0,0,0.2); border-radius: 12px; }
                .symbol-item { display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 0.8rem; }
                .cortes-info ul { column-count: 2; margin-top: 1rem; }
                @media (max-width: 600px) { .cortes-info ul { column-count: 1; } }
            `}</style>
        </div>
    );
};

export default ProjectionsPage;
