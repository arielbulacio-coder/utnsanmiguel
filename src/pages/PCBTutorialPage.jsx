import React, { useState } from 'react';
import './ElectricityBasicsStyles.css';

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
