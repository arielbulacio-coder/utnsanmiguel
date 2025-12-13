import React, { useState } from 'react';

const KirchhoffSimulator = () => {
    const [activeTab, setActiveTab] = useState('KCL'); // 'KCL' or 'KVL'

    // KCL State
    const [i1, setI1] = useState('');
    const [i2, setI2] = useState('');
    const [i3, setI3] = useState(null); // Calculated

    // KVL State
    const [vTotal, setVTotal] = useState('');
    const [v1, setV1] = useState('');
    const [v2, setV2] = useState('');
    const [v3, setV3] = useState(null); // Calculated

    const calculateKCL = () => {
        if (i1 === '' || i2 === '') return;
        // Assume I3 leaves, I1 and I2 enter
        // I1 + I2 = I3
        setI3(parseFloat(i1) + parseFloat(i2));
    };

    const calculateKVL = () => {
        if (vTotal === '' || v1 === '' || v2 === '') return;
        // V_Source = V1 + V2 + V3 -> V3 = V_Source - V1 - V2
        setV3(parseFloat(vTotal) - parseFloat(v1) - parseFloat(v2));
    };

    return (
        <div className="glass-card section-container" style={{ textAlign: 'center' }}>
            <h2>Simulador Interactivo</h2>

            <div className="mode-selector">
                <button
                    className={`mode-btn ${activeTab === 'KCL' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('KCL'); setI3(null); }}
                >
                    Ley de Nodos (KCL)
                </button>
                <button
                    className={`mode-btn ${activeTab === 'KVL' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('KVL'); setV3(null); }}
                >
                    Ley de Mallas (KVL)
                </button>
            </div>

            {activeTab === 'KCL' ? (
                <div>
                    <h3>Simulación de Nodo</h3>
                    <p>Calcula la corriente saliente (I3) sabiendo las entrantes (I1, I2)</p>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '2rem 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input type="number" placeholder="I1 (A)" value={i1} onChange={(e) => setI1(e.target.value)} style={{ width: '80px', padding: '5px' }} />
                            <div style={{ color: 'var(--primary-color)' }}>➜ I1 Entra</div>
                            <input type="number" placeholder="I2 (A)" value={i2} onChange={(e) => setI2(e.target.value)} style={{ width: '80px', padding: '5px' }} />
                            <div style={{ color: 'var(--primary-color)' }}>➜ I2 Entra</div>
                        </div>

                        <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '50%', zIndex: 2 }}></div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ color: 'var(--secondary-color)' }}>I3 Sale ➜</div>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{i3 !== null ? i3 + ' A' : '?'}</div>
                        </div>
                    </div>
                    <button onClick={calculateKCL}>Calcular Salida</button>
                </div>
            ) : (
                <div>
                    <h3>Simulación de Malla (Serie)</h3>
                    <p>Calcula el voltaje en la resistencia restante (V3)</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: '0 auto' }}>
                        <div className="input-group">
                            <label>Voltaje Total (Fuente)</label>
                            <input type="number" value={vTotal} onChange={(e) => setVTotal(e.target.value)} placeholder="Ej. 12V" />
                        </div>
                        <div className="input-group">
                            <label>Caída Voltaje R1</label>
                            <input type="number" value={v1} onChange={(e) => setV1(e.target.value)} placeholder="Ej. 3V" />
                        </div>
                        <div className="input-group">
                            <label>Caída Voltaje R2</label>
                            <input type="number" value={v2} onChange={(e) => setV2(e.target.value)} placeholder="Ej. 5V" />
                        </div>

                        <button onClick={calculateKVL} style={{ marginTop: '1rem' }}>Calcular V3</button>

                        {v3 !== null && (
                            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid var(--secondary-color)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '0.9rem' }}>Voltaje Restante (R3):</div>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: v3 < 0 ? 'red' : 'white' }}>{v3.toFixed(2)} V</div>
                                {v3 < 0 && <small style={{ color: 'red' }}>Error: La suma de caídas excede la fuente</small>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default KirchhoffSimulator;
