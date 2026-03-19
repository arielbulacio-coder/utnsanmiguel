import React, { useState } from 'react';
import './ElectricityBasicsStyles.css';

const RenewableEnergyPage = () => {
    const [sunlight, setSunlight] = useState(50);
    const [battery, setBattery] = useState(20);
    const [gridTied, setGridTied] = useState(false);

    // Batería carga o descarga
    React.useEffect(() => {
        const interval = setInterval(() => {
            setBattery(b => {
                let newB = b;
                if (sunlight > 60) newB += 2; // Carga rápida
                else if (sunlight > 30) newB += 0.5; // Carga lenta
                else newB -= 1; // Descarga por consumo

                return Math.max(0, Math.min(100, newB));
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [sunlight]);

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>Energías Renovables</h1>
                <p>Simulador de Paneles Solares, Baterías, Reguladores y Sistemas Grid/Off-Grid.</p>
            </header>

            <div className="electricity-grid">
                <section className="elec-card flow-section full-width">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <h2>Irradiación Solar ☀️</h2>
                        <button className="mat-btn" style={{ background: gridTied ? '#4caf50' : '#607d8b' }} onClick={() => setGridTied(!gridTied)}>
                            {gridTied ? 'Sistema ON-GRID (Vinculado a Red)' : 'Sistema OFF-GRID (Aislado con Baterías)'}
                        </button>
                    </div>

                    <input type="range" min="0" max="100" value={sunlight} onChange={(e) => setSunlight(Number(e.target.value))} style={{ width: '100%' }} />
                    <p>Intensidad Solar: {sunlight}%</p>

                    <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                        {/* PANELES */}
                        <div className="glass-card" style={{ flex: 1, minWidth: '200px', textAlign: 'center', background: `rgba(33, 150, 243, ${sunlight / 100})` }}>
                            <h3>Paneles Fotovoltaicos</h3>
                            <div style={{ fontSize: '3rem' }}>🪟</div>
                            <p>Produciendo: {Math.floor((sunlight / 100) * 3000)} W</p>
                        </div>

                        {/* REGULADOR / INVERSOR */}
                        <div className="glass-card" style={{ flex: 1, minWidth: '200px', textAlign: 'center' }}>
                            <h3>Inversor / Regulador</h3>
                            <div style={{ fontSize: '3rem' }}>🔌</div>
                            <p>Convirtiendo DC a AC</p>
                            <p style={{ color: '#4caf50' }}>{gridTied ? 'Inyectando sobrante a red' : 'Cargando Baterías'}</p>
                        </div>

                        {/* BATERIA O RED */}
                        {!gridTied ? (
                            <div className="glass-card" style={{ flex: 1, minWidth: '200px', textAlign: 'center' }}>
                                <h3>Banco de Baterías</h3>
                                <div style={{ width: '100%', background: '#333', height: '30px', borderRadius: '15px', overflow: 'hidden', marginTop: '1rem' }}>
                                    <div style={{ width: `${battery}%`, background: battery > 20 ? '#4caf50' : '#f44336', height: '100%', transition: '1s' }}></div>
                                </div>
                                <p>{battery.toFixed(1)}%</p>
                            </div>
                        ) : (
                            <div className="glass-card" style={{ flex: 1, minWidth: '200px', textAlign: 'center', borderColor: '#4caf50' }}>
                                <h3>Red Eléctrica</h3>
                                <div style={{ fontSize: '3rem' }}>🏢</div>
                                <p>Medidor Bidireccional</p>
                                <p style={{ color: '#eab308' }}>{sunlight > 50 ? '↙️ Vendiendo Energía' : '↗️ Comprando Energía'}</p>
                            </div>
                        )}

                        {/* CONSUMO */}
                        <div className="glass-card" style={{ flex: 1, minWidth: '200px', textAlign: 'center' }}>
                            <h3>Consumo Hogar</h3>
                            <div style={{ fontSize: '3rem', color: (battery > 5 || gridTied || sunlight > 30) ? '#ffeb3b' : '#555' }}>💡</div>
                            <p>Demanda: 800 W</p>
                            <p style={{ color: '#f44336', fontWeight: 'bold' }}>{(!gridTied && battery <= 0 && sunlight < 30) ? 'APAGÓN' : 'FUNCIONANDO'}</p>
                        </div>
                    </div>
                </section>

                <section className="elec-card info-section full-width">
                    <h2>Conceptos Teóricos: Energía Fotovoltaica</h2>
                    <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div className="info-block">
                            <h3 style={{ color: '#ffc107' }}>Los Paneles Solares</h3>
                            <p>Compuestos por celdas de silicio que liberan electrones al recibir fotones del sol (Efecto Fotoeléctrico). Generan corriente continua (DC). Su rendimiento depende de la inclinación, orientación y limpieza.</p>
                        </div>
                        <div className="info-block">
                            <h3 style={{ color: '#2196f3' }}>Regulador e Inversor</h3>
                            <p><strong>Regulador de Carga:</strong> Protege las baterías evitando que se sobrecarguen o descarguen demasiado. <br /><strong>Inversor:</strong> Transforma la corriente continua (DC, 12V/24V) de los paneles o baterías en corriente alterna (AC, 220V) para usar en electrodomésticos.</p>
                        </div>
                        <div className="info-block">
                            <h3 style={{ color: '#4caf50' }}>On-Grid vs Off-Grid</h3>
                            <p><strong>On-Grid (Vinculado a Red):</strong> No usa baterías. Si te sobra energía, se la vendes a la red eléctrica. Si falta, la red te la provee automáticamente. <br /><strong>Off-Grid (Aislado):</strong> Usa baterías para almacenar energía durante el día y usarla de noche. Es ideal para zonas rurales.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RenewableEnergyPage;
