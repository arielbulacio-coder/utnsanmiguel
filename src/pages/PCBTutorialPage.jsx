import React, { useState } from 'react';
import './ElectricityBasicsStyles.css';

const PCBStackSVG = () => (
    <svg viewBox="0 0 380 180" style={{ width: '100%', maxWidth: '480px', height: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {/* substrate */}
        <rect x="60" y="80" width="280" height="40" fill="#2e7d32" stroke="#1b5e20" strokeWidth="1" />
        {/* upper copper */}
        <rect x="60" y="68" width="280" height="12" fill="#cd7f32" />
        <rect x="60" y="68" width="280" height="12" fill="url(#copperGrad)" opacity="0.6" />
        {/* lower copper */}
        <rect x="60" y="120" width="280" height="12" fill="#cd7f32" />
        {/* drilled holes */}
        <ellipse cx="120" cy="100" rx="6" ry="6" fill="#000" />
        <ellipse cx="200" cy="100" rx="6" ry="6" fill="#000" />
        <ellipse cx="280" cy="100" rx="6" ry="6" fill="#000" />

        <defs>
            <linearGradient id="copperGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </linearGradient>
        </defs>

        {/* labels */}
        <line x1="50" y1="74" x2="20" y2="40" stroke="#ff9800" strokeWidth="1" />
        <text x="2" y="35" fill="#ff9800" fontSize="11" fontWeight="bold">Cobre superior (35 µm)</text>

        <line x1="50" y1="100" x2="20" y2="160" stroke="#4caf50" strokeWidth="1" />
        <text x="2" y="172" fill="#4caf50" fontSize="11" fontWeight="bold">Sustrato (FR4 / Pertinax)</text>

        <line x1="350" y1="126" x2="375" y2="160" stroke="#ff9800" strokeWidth="1" />
        <text x="280" y="172" fill="#ff9800" fontSize="11" fontWeight="bold">Cobre inferior</text>

        <line x1="280" y1="100" x2="350" y2="40" stroke="#9e9e9e" strokeWidth="1" />
        <text x="300" y="35" fill="#9e9e9e" fontSize="11" fontWeight="bold">Agujeros (drill)</text>
    </svg>
);

const PCBTopViewSVG = () => (
    <svg viewBox="0 0 360 200" style={{ width: '100%', maxWidth: '420px', height: 'auto', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {/* board */}
        <rect x="10" y="10" width="340" height="180" fill="#2e7d32" rx="6" />
        {/* tracks */}
        <path d="M40 50 L100 50 L100 110 L 200 110 L 200 60 L 320 60" stroke="#cd7f32" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M40 130 L 80 130 L 80 170 L 320 170" stroke="#cd7f32" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M250 90 L 320 90" stroke="#cd7f32" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* pads */}
        {[
            [40, 50], [100, 110], [200, 60], [320, 60], [40, 130], [320, 170], [250, 90], [320, 90]
        ].map(([x, y], i) => (
            <g key={i}>
                <circle cx={x} cy={y} r="9" fill="#cd7f32" />
                <circle cx={x} cy={y} r="3" fill="#000" />
            </g>
        ))}
        <text x="180" y="195" textAnchor="middle" fill="#aaa" fontSize="11">Vista superior: pistas y pads sobre cobre</text>
    </svg>
);

const FibraMethodSVG = () => (
    <svg viewBox="0 0 360 130" style={{ width: '100%', maxWidth: '420px', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {/* Marker */}
        <rect x="20" y="40" width="80" height="14" fill="#212121" rx="3" />
        <polygon points="100,40 120,47 100,54" fill="#000" />
        <text x="60" y="51" fill="#fff" fontSize="9" textAnchor="middle">SHARPIE</text>
        {/* Board with hand-drawn tracks */}
        <rect x="150" y="20" width="190" height="90" fill="#cd7f32" rx="3" />
        <path d="M170 40 Q 200 35 230 50 L 280 50 L 280 80" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <path d="M170 70 L 220 70 L 220 95" stroke="#1a1a1a" strokeWidth="3" fill="none" />
        <circle cx="170" cy="40" r="4" fill="#1a1a1a" />
        <circle cx="280" cy="80" r="4" fill="#1a1a1a" />
        <circle cx="170" cy="70" r="4" fill="#1a1a1a" />
        <circle cx="220" cy="95" r="4" fill="#1a1a1a" />
        <text x="245" y="125" textAnchor="middle" fill="#aaa" fontSize="10">Pistas dibujadas a mano sobre cobre</text>
    </svg>
);

const PlanchaMethodSVG = () => (
    <svg viewBox="0 0 380 160" style={{ width: '100%', maxWidth: '460px', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {/* Plancha */}
        <path d="M20 40 L 130 40 L 140 70 L 10 70 Z" fill="#90a4ae" stroke="#37474f" strokeWidth="1" />
        <rect x="40" y="20" width="60" height="22" fill="#37474f" rx="4" />
        <rect x="55" y="8" width="30" height="14" fill="#263238" rx="3" />
        {/* Calor */}
        <path d="M40 78 Q 45 88 50 78" stroke="#ff5722" strokeWidth="2" fill="none" />
        <path d="M70 78 Q 75 90 80 78" stroke="#ff5722" strokeWidth="2" fill="none" />
        <path d="M100 78 Q 105 90 110 78" stroke="#ff5722" strokeWidth="2" fill="none" />
        <text x="125" y="55" fontSize="14" fill="#fff">♨</text>
        {/* Papel */}
        <rect x="160" y="80" width="200" height="14" fill="#fafafa" rx="2" />
        <rect x="160" y="80" width="200" height="14" fill="url(#tonerLines)" opacity="0.85" />
        {/* PCB */}
        <rect x="160" y="94" width="200" height="35" fill="#cd7f32" />
        <text x="260" y="155" textAnchor="middle" fill="#aaa" fontSize="10">Papel glossy (toner) → PCB cobre + plancha caliente</text>
        <defs>
            <pattern id="tonerLines" width="20" height="14" patternUnits="userSpaceOnUse">
                <rect width="14" height="3" fill="#1a1a1a" y="3" />
                <rect width="8" height="3" fill="#1a1a1a" y="9" />
            </pattern>
        </defs>
    </svg>
);

const EtchingProcessSVG = () => (
    <svg viewBox="0 0 480 200" style={{ width: '100%', maxWidth: '600px', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', padding: '0.5rem' }}>
        {/* Etapa 1 */}
        <text x="80" y="20" textAnchor="middle" fill="#4facfe" fontSize="12" fontWeight="bold">1. Antes</text>
        <rect x="20" y="30" width="120" height="50" fill="#cd7f32" />
        <path d="M40 45 L 100 45 L 100 65 L 120 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
        <text x="80" y="100" textAnchor="middle" fill="#aaa" fontSize="9">cobre + tinta</text>

        <path d="M150 55 L180 55" stroke="#ffeb3b" strokeWidth="2" markerEnd="url(#arr2)" />

        {/* Etapa 2 */}
        <text x="240" y="20" textAnchor="middle" fill="#ff9800" fontSize="12" fontWeight="bold">2. En FeCl₃</text>
        <rect x="180" y="30" width="120" height="50" fill="#bf360c" opacity="0.6" />
        <path d="M200 45 L 260 45 L 260 65 L 280 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
        <circle cx="220" cy="38" r="3" fill="#fff" opacity="0.6" />
        <circle cx="240" cy="42" r="2" fill="#fff" opacity="0.6" />
        <circle cx="270" cy="36" r="3" fill="#fff" opacity="0.6" />
        <text x="240" y="100" textAnchor="middle" fill="#aaa" fontSize="9">cobre disolviéndose</text>

        <path d="M310 55 L340 55" stroke="#ffeb3b" strokeWidth="2" markerEnd="url(#arr2)" />

        {/* Etapa 3 */}
        <text x="400" y="20" textAnchor="middle" fill="#4caf50" fontSize="12" fontWeight="bold">3. Después</text>
        <rect x="340" y="30" width="120" height="50" fill="#2e7d32" />
        <rect x="360" y="42" width="60" height="6" fill="#cd7f32" />
        <rect x="360" y="60" width="20" height="6" fill="#cd7f32" />
        <rect x="420" y="60" width="20" height="6" fill="#cd7f32" />
        <text x="400" y="100" textAnchor="middle" fill="#aaa" fontSize="9">solo quedan las pistas</text>

        {/* Etapa 4: limpieza */}
        <text x="240" y="135" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">4. Limpieza con thinner/acetona</text>
        <rect x="160" y="145" width="160" height="40" fill="#2e7d32" />
        <rect x="180" y="158" width="120" height="6" fill="#cd7f32" />
        <text x="240" y="180" textAnchor="middle" fill="#fff" fontSize="9">cobre brillante listo para soldar</text>

        <defs>
            <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#ffeb3b" />
            </marker>
        </defs>
    </svg>
);

const PCBTutorialPage = () => {
    const [method, setMethod] = useState('intro');

    return (
        <div className="electricity-container">
            <header className="electricity-header">
                <h1>🔌 Circuitos Impresos (PCB) — Tutorial</h1>
                <p>Tres métodos artesanales para fabricar tu propia placa de circuito impreso: fibra (marcador), planchado de toner y revelado con ácido.</p>
            </header>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <button className={`mat-btn ${method === 'intro' ? 'active' : ''}`} onClick={() => setMethod('intro')}>📘 Introducción</button>
                <button className={`mat-btn ${method === 'fibra' ? 'active' : ''}`} onClick={() => setMethod('fibra')}>✏️ Método Fibra</button>
                <button className={`mat-btn ${method === 'plancha' ? 'active' : ''}`} onClick={() => setMethod('plancha')}>♨️ Plancha + Toner</button>
                <button className={`mat-btn ${method === 'acido' ? 'active' : ''}`} onClick={() => setMethod('acido')}>🧪 Atacado con Ácido</button>
                <button className={`mat-btn ${method === 'perforado' ? 'active' : ''}`} onClick={() => setMethod('perforado')}>🔩 Perforado y Soldado</button>
                <button className={`mat-btn ${method === 'seguridad' ? 'active' : ''}`} onClick={() => setMethod('seguridad')}>🥽 Seguridad</button>
            </div>

            <div className="electricity-grid">

                {method === 'intro' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>¿Qué es un PCB?</h2>
                            <p>Un <strong>PCB</strong> (<em>Printed Circuit Board</em>) o <strong>placa de circuito impreso</strong> es un soporte aislante (típicamente fibra de vidrio FR4 o pertinax) cubierto en una o ambas caras por una capa de cobre. Las "pistas" se obtienen <strong>removiendo el cobre que no forma parte del circuito</strong>, dejando solo las conexiones eléctricas necesarias.</p>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <PCBStackSVG />
                                    <p style={{ color: '#aaa', fontSize: '0.85rem' }}>📐 Corte transversal: cobre + sustrato + cobre + agujeros</p>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <PCBTopViewSVG />
                                    <p style={{ color: '#aaa', fontSize: '0.85rem' }}>🔍 Vista superior con pistas y pads</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#4facfe' }}>🟫 Pertinax (FR2)</h3>
                                    <p>Sustrato de papel + resina fenólica. Económico, fácil de cortar/perforar, pero menos resistente a calor y humedad.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#4caf50' }}>🟩 Fibra de vidrio (FR4)</h3>
                                    <p>Sustrato de fibra de vidrio + resina epoxi. Más caro, pero estándar profesional: estable, resistente al calor, ideal para electrónica de calidad.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h3 style={{ color: '#ffeb3b' }}>🟧 Cobre</h3>
                                    <p>Generalmente 35 µm (1 oz/ft²). Se elimina con cloruro férrico u otros químicos para formar las pistas.</p>
                                </div>
                            </div>
                        </section>

                        <section className="elec-card full-width">
                            <h2>Flujo general (los 3 métodos)</h2>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Diseño:</strong> dibujar el circuito en software (KiCad, EasyEDA, Eagle, Proteus) y obtener el <em>layout</em> de las pistas.</li>
                                <li><strong>Preparación:</strong> cortar la placa virgen al tamaño y limpiar el cobre con lana de acero / lija fina + alcohol.</li>
                                <li><strong>Transferencia del diseño al cobre:</strong> aquí entran los 3 métodos (fibra, plancha o fotosensible).</li>
                                <li><strong>Atacado con ácido:</strong> el cobre <em>no protegido</em> se disuelve en cloruro férrico (FeCl₃) o persulfato.</li>
                                <li><strong>Limpieza:</strong> quitar la tinta protectora con thinner / acetona, lavar con agua y secar.</li>
                                <li><strong>Perforado:</strong> agujerear los pads (broca 0.8-1 mm).</li>
                                <li><strong>Soldado de componentes:</strong> insertar y soldar (ver tutorial de soldadura).</li>
                            </ol>
                        </section>

                        <section className="elec-card full-width">
                            <h2>📊 Comparativa rápida</h2>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                    <thead>
                                        <tr style={{ background: 'rgba(79,172,254,0.15)' }}>
                                            <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #4facfe' }}>Método</th>
                                            <th style={{ padding: '0.75rem', borderBottom: '2px solid #4facfe' }}>Costo</th>
                                            <th style={{ padding: '0.75rem', borderBottom: '2px solid #4facfe' }}>Precisión</th>
                                            <th style={{ padding: '0.75rem', borderBottom: '2px solid #4facfe' }}>Ideal para</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '0.75rem' }}><strong>Fibra (marcador)</strong></td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>💰 Muy bajo</td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>★★☆☆☆</td>
                                            <td style={{ padding: '0.75rem' }}>Prototipos simples, pocos pads, escuela.</td>
                                        </tr>
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                            <td style={{ padding: '0.75rem' }}><strong>Plancha + toner</strong></td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>💰 Bajo</td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>★★★★☆</td>
                                            <td style={{ padding: '0.75rem' }}>Circuitos medianos, pistas finas, mucho mejor acabado.</td>
                                        </tr>
                                        <tr>
                                            <td style={{ padding: '0.75rem' }}><strong>Fotosensible (no cubierto aquí)</strong></td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>💰💰 Medio</td>
                                            <td style={{ padding: '0.75rem', textAlign: 'center' }}>★★★★★</td>
                                            <td style={{ padding: '0.75rem' }}>Circuitos profesionales, SMD fino.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                )}

                {method === 'fibra' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>✏️ Método de la Fibra (Marcador permanente)</h2>
                            <p>El método más simple y barato: dibujar las pistas <strong>directamente</strong> sobre el cobre con un marcador permanente. La tinta protege el cobre del ácido.</p>

                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                                <FibraMethodSVG />
                            </div>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>🛒 Materiales</h3>
                            <ul style={{ lineHeight: '1.8' }}>
                                <li>Placa virgen de pertinax o fibra de vidrio.</li>
                                <li>Marcador permanente (Sharpie negro, indeleble; los azules/rojos suelen ser peores).</li>
                                <li>Lana de acero fina (00 o 000) o lija al agua de grano 600-1000.</li>
                                <li>Alcohol isopropílico.</li>
                                <li>Diseño impreso en papel a tamaño real (referencia).</li>
                                <li>Regla, escuadra y a veces papel calcar.</li>
                            </ul>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>📋 Pasos</h3>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Limpiá la placa</strong> con lana de acero hasta que el cobre quede brillante. Pasá un trapo con alcohol y dejá secar (no toques con los dedos).</li>
                                <li><strong>Calcá el diseño:</strong> apoyá el papel impreso sobre el cobre y marcá los pads con un punzón. Otra opción: usar papel calcar.</li>
                                <li><strong>Dibujá las pistas</strong> con el marcador permanente. Pasá <strong>2 capas</strong> esperando 30 s entre cada una para asegurar opacidad.</li>
                                <li><strong>Verificá:</strong> mirá la placa a contraluz. Donde se vea el cobre brillar entre las líneas, repasá.</li>
                                <li>Si te equivocás, limpiá con alcohol y volvé a empezar (todavía no estás en el ácido).</li>
                                <li>Pasá al ataque con ácido (ver pestaña 🧪).</li>
                            </ol>

                            <div className="highlight" style={{ marginTop: '1rem' }}>
                                💡 Tip: la línea más fina que podés lograr con marcador es ~1 mm. Para pistas más finas, usá el método de plancha.
                            </div>

                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <strong>⚠️ Limitaciones:</strong>
                                <ul style={{ marginTop: '0.5rem' }}>
                                    <li>Resolución pobre: pistas mínimas ~1 mm, separación ~0.8 mm.</li>
                                    <li>Acabado irregular si la mano tiembla.</li>
                                    <li>No sirve para SMD ni circuitos densos.</li>
                                </ul>
                            </div>
                        </section>
                    </>
                )}

                {method === 'plancha' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>♨️ Método Plancha + Toner sobre papel impreso</h2>
                            <p>También llamado <strong>"Toner Transfer Method"</strong> (TTM). Se imprime el circuito con impresora <strong>láser</strong> sobre papel especial, y luego con una plancha caliente se transfiere el toner (plástico) al cobre. El toner actúa como protector durante el ataque químico.</p>

                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                                <PlanchaMethodSVG />
                            </div>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>🛒 Materiales</h3>
                            <ul style={{ lineHeight: '1.8' }}>
                                <li><strong>Impresora láser</strong> (NO inyección de tinta).</li>
                                <li>Papel especial: <strong>papel ilustración / glossy / fotográfico</strong> o <strong>papel de transferencia para PCB</strong> (Press-n-Peel).</li>
                                <li>Plancha de ropa común.</li>
                                <li>Placa de pertinax/fibra virgen.</li>
                                <li>Lana de acero + alcohol isopropílico.</li>
                                <li>Recipiente con agua tibia.</li>
                                <li>Trapo limpio o papel de cocina.</li>
                            </ul>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>📋 Pasos</h3>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Diseño y exportación:</strong> en tu programa de PCB, configurá <strong>todo en negro al 100% de toner</strong>. Imprimí en <strong>espejo</strong> (mirror) si tu diseño es vista desde el lado de componentes.</li>
                                <li><strong>Configurá la impresora</strong> en máxima densidad (toner al máximo, sin economy mode).</li>
                                <li><strong>Imprimí en el papel glossy</strong> (cara brillante hacia arriba). El toner debe quedar bien negro y sin huecos.</li>
                                <li><strong>Limpiá la placa de cobre</strong> con lana de acero hasta brillar y desengrasá con alcohol.</li>
                                <li><strong>Apoyá el papel impreso</strong> con el toner hacia el cobre. Fijá con cinta Kapton o de papel por los bordes.</li>
                                <li><strong>Calentá la plancha</strong> al máximo (algodón, sin vapor).</li>
                                <li><strong>Planchá durante 3-5 minutos</strong> con presión firme y movimiento circular. Asegurate de pasar bien por los bordes y esquinas.</li>
                                <li><strong>Esperá que enfríe a temperatura ambiente</strong>.</li>
                                <li><strong>Sumergí en agua tibia</strong> 5-10 minutos.</li>
                                <li><strong>Retirá el papel suavemente</strong> con los dedos. El toner debe quedar pegado al cobre. Si quedan restos de papel blanco entre pistas, frotá con cuidado.</li>
                                <li><strong>Inspeccioná y corregí</strong> con marcador permanente cualquier corte o agujero en las pistas.</li>
                                <li>Pasá al ataque con ácido (ver pestaña 🧪).</li>
                            </ol>

                            <div className="highlight" style={{ marginTop: '1rem' }}>
                                💡 Tip: si tu impresora láser no carga bien el papel glossy, pegalo a una hoja A4 normal con cinta adhesiva por el borde superior.
                            </div>

                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(76,175,80,0.1)', borderLeft: '4px solid #4caf50', borderRadius: '8px' }}>
                                <strong>✅ Ventajas:</strong>
                                <ul style={{ marginTop: '0.5rem' }}>
                                    <li>Pistas finas (hasta 0.3 mm).</li>
                                    <li>Repetibilidad (mismo diseño = mismo resultado).</li>
                                    <li>Texto y serigrafía posibles.</li>
                                </ul>
                            </div>

                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <strong>⚠️ Errores comunes:</strong>
                                <ul style={{ marginTop: '0.5rem' }}>
                                    <li><strong>Toner que no se adhiere:</strong> placa sucia, plancha fría o tiempo insuficiente.</li>
                                    <li><strong>Pistas cortadas:</strong> calor desigual o mover el papel durante el planchado.</li>
                                    <li><strong>Toner se queda en el papel:</strong> usar papel realmente glossy/fotográfico, no papel común.</li>
                                </ul>
                            </div>
                        </section>
                    </>
                )}

                {method === 'acido' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>🧪 Atacado químico (Etching)</h2>
                            <p>El paso clave: <strong>disolver el cobre que NO está protegido</strong> por marcador o toner. La sustancia más común en electrónica casera es el <strong>cloruro férrico (FeCl₃)</strong>.</p>

                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                                <EtchingProcessSVG />
                            </div>
                            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.85rem' }}>🧪 Proceso de etching: el ácido come el cobre desnudo y deja solo las pistas protegidas.</p>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>🛒 Sustancias usadas</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h4 style={{ color: '#ff9800' }}>🟠 Cloruro Férrico (FeCl₃)</h4>
                                    <p>El más usado: solución marrón. Se vende en electrónica como cristales o solución lista. Tiempo: 10-30 min con agitación.</p>
                                    <p><strong>Pros:</strong> económico, fácil de conseguir.</p>
                                    <p><strong>Contras:</strong> mancha permanentemente todo lo que toca; residuos peligrosos.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h4 style={{ color: '#4facfe' }}>🔵 Persulfato de Sodio</h4>
                                    <p>Solución transparente que se vuelve azul al atacar. Más limpio visualmente.</p>
                                    <p><strong>Pros:</strong> no mancha, permite ver el progreso.</p>
                                    <p><strong>Contras:</strong> requiere calor (40-50 °C) y suele ser más caro.</p>
                                </div>
                                <div className="elec-card" style={{ padding: '1rem' }}>
                                    <h4 style={{ color: '#a855f7' }}>🟣 HCl + H₂O₂ (ácido + agua oxigenada)</h4>
                                    <p>Mezcla de ácido clorhídrico (muriático) y agua oxigenada de farmacia.</p>
                                    <p><strong>Pros:</strong> insumos comunes y baratos.</p>
                                    <p><strong>Contras:</strong> libera vapores tóxicos (Cl₂); mucho cuidado con la mezcla.</p>
                                </div>
                            </div>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>📋 Pasos (con FeCl₃)</h3>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Preparación de la solución:</strong> diluir según indicación del fabricante (típico: 500 g de cristales en 1 L de agua tibia, en recipiente de plástico o vidrio NO metálico).</li>
                                <li><strong>Recipiente plano</strong> (de plástico, no metal). El nivel del líquido debe cubrir la placa.</li>
                                <li><strong>Sumergir la placa</strong> con el cobre hacia arriba o flotando con el cobre hacia abajo (más rápido por convección).</li>
                                <li><strong>Agitar suavemente</strong> el recipiente cada 30 s para renovar la solución sobre la superficie.</li>
                                <li><strong>Tiempo:</strong> 10-30 min según concentración y temperatura. Acelera con baño María tibio (40 °C).</li>
                                <li><strong>Verificar al trasluz:</strong> el cobre no protegido habrá desaparecido y solo quedarán las pistas.</li>
                                <li><strong>Enjuagar con agua abundante</strong> en un balde de "lavado" (no en el lavabo).</li>
                                <li><strong>Quitar la tinta/toner</strong> con thinner, acetona o alcohol + lana de acero.</li>
                                <li><strong>Secar y proteger</strong> el cobre desnudo con flux en spray o estaño líquido si vas a guardar la placa antes de soldar.</li>
                            </ol>

                            <div className="highlight" style={{ marginTop: '1rem', background: 'rgba(244,67,54,0.15)', color: '#ff8a80' }}>
                                ☢️ Nunca tirar la solución usada al desagüe: lleva cobre disuelto, contamina y daña cañerías. Llevar a punto de recolección de residuos químicos o neutralizar con bicarbonato + filtrar el sólido.
                            </div>
                        </section>
                    </>
                )}

                {method === 'perforado' && (
                    <>
                        <section className="elec-card full-width">
                            <h2>🔩 Perforado y soldado</h2>

                            <h3 style={{ color: '#4facfe' }}>🕳️ Perforado</h3>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li><strong>Mecha de carburo de tungsteno</strong>: 0.8 mm para componentes estándar (resistencias, capacitores), 1.0 mm para conectores, 0.6 mm para ICs DIP.</li>
                                <li><strong>Minitorno o taladro pequeño</strong> (Dremel, taladro de columna chico). A mano libre con taladro grande es muy difícil y rompe mechas.</li>
                                <li><strong>Apoyá la placa sobre madera</strong> para no romper la mecha contra la mesa.</li>
                                <li><strong>Presión suave</strong>: la mecha de carburo es <strong>muy frágil</strong>; rompe si la inclinás o forzás.</li>
                                <li>Perforá <strong>antes</strong> de cortar/limar bordes para mantener la placa estable.</li>
                            </ol>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>🪙 Estañado de pistas</h3>
                            <p>Para protección y mejor conducción, opcional pero recomendado:</p>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li>Aplicar flux en gel o spray sobre las pistas limpias.</li>
                                <li>Pasar el cautín con un poco de estaño cubriendo cada pista.</li>
                                <li>O bien, sumergir en estaño líquido (Liquid Tin) → acabado profesional.</li>
                            </ol>

                            <h3 style={{ color: '#4facfe', marginTop: '1.5rem' }}>🔧 Soldado</h3>
                            <p>Ver el módulo dedicado: <strong>Electrónica → Soldadura Electrónica</strong>.</p>
                            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                                <li>Insertar el componente desde el lado <strong>de componentes</strong>.</li>
                                <li>Doblar las patas en V para sostener el componente al voltear la placa.</li>
                                <li>Soldar del lado del cobre con cautín de 30-40 W.</li>
                                <li>Cortar el sobrante de las patas cerca de la junta.</li>
                                <li>Limpiar restos de flux con alcohol isopropílico.</li>
                            </ol>

                            <div className="highlight" style={{ marginTop: '1rem' }}>
                                🏆 Una placa bien hecha tiene pistas continuas, brillo metálico, sin restos de tinta y agujeros centrados en cada pad.
                            </div>
                        </section>
                    </>
                )}

                {method === 'seguridad' && (
                    <section className="elec-card full-width">
                        <h2>🥽 Seguridad e Higiene</h2>
                        <p>El proceso involucra <strong>productos químicos corrosivos</strong>, calor y polvillo. Siempre se trabaja con elementos de protección personal y en ambientes adecuados.</p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>🥽 Protección ocular</h3>
                                <p>Gafas o pantalla durante toda manipulación de ácido y al perforar (esquirlas de cobre/mecha).</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>🧤 Guantes de nitrilo</h3>
                                <p>Resistentes a FeCl₃ y solventes. Los de látex se degradan con thinner.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>👕 Ropa vieja</h3>
                                <p>El cloruro férrico mancha de naranja-marrón <strong>permanente</strong>. Delantal de plástico o ropa que no te importe arruinar.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>🌬️ Ventilación</h3>
                                <p>Vapores del flux, del soldador y especialmente del HCl son irritantes. Trabajar al aire libre o con extractor.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>♻️ Residuos</h3>
                                <p>El líquido usado (con cobre disuelto) es residuo peligroso. <strong>NO al desagüe</strong>. Neutralizar con bicarbonato hasta dejar de burbujear, decantar y llevar el sólido a punto limpio.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>🚫 Mezclas peligrosas</h3>
                                <p>NUNCA mezclar HCl con lavandina (cloro): libera Cl₂ tóxico. Tampoco con amoníaco. Trabajar con un solo producto a la vez.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>🔥 Cautín caliente</h3>
                                <p>Siempre apoyar en su soporte. Nunca dejar sobre la mesa. Desconectar al terminar.</p>
                            </div>
                            <div style={{ padding: '1rem', background: 'rgba(244,67,54,0.1)', borderLeft: '4px solid #f44336', borderRadius: '8px' }}>
                                <h3>🧒 Menores</h3>
                                <p>Estos procedimientos requieren <strong>supervisión adulta</strong>. En el aula, el docente prepara y manipula los químicos.</p>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default PCBTutorialPage;
