import React, { useState, useEffect, useRef } from 'react';

const ScratchSimulator = () => {
    // Canvas / World Dimensions
    const CANVAS_WIDTH = 600;
    const CANVAS_HEIGHT = 400;

    // Sprite State
    const [sprite, setSprite] = useState({
        x: 0, // Center coordinate logic handled in render
        y: 0,
        rotation: 0, // degrees
        color: '#ffaa00',
        message: null,
        scale: 1
    });

    const [program, setProgram] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [activeBlockIndex, setActiveBlockIndex] = useState(-1);

    // Available Blocks
    const blocksPalette = [
        { type: 'move', label: 'Mover 50 pasos', val: 50, color: '#4C97FF' },
        { type: 'rotateR', label: 'Girar ↻ 90°', val: 90, color: '#4C97FF' },
        { type: 'rotateL', label: 'Girar ↺ 90°', val: 90, color: '#4C97FF' },
        { type: 'say', label: 'Decir "Hola"', val: 'Hola Mundo!', color: '#9966FF' },
        { type: 'grow', label: 'Crecer', val: 0.2, color: '#9966FF' },
        { type: 'shrink', label: 'Encoger', val: 0.2, color: '#9966FF' },
        { type: 'reset', label: 'Ir al Centro', val: 0, color: '#FFAB19' }
    ];

    // Reset logic
    const resetSprite = () => {
        setSprite({
            x: 0,
            y: 0,
            rotation: 0,
            color: '#ffaa00',
            message: null,
            scale: 1
        });
        setIsRunning(false);
        setActiveBlockIndex(-1);
    };

    // Add block to program
    const addBlock = (block) => {
        setProgram([...program, { ...block, id: Date.now() + Math.random() }]);
    };

    // Remove block
    const removeBlock = (index) => {
        const newProg = [...program];
        newProg.splice(index, 1);
        setProgram(newProg);
    };

    // Execution Engine
    const runProgram = async () => {
        if (program.length === 0) return;
        setIsRunning(true);
        resetSprite(); // Start fresh or continue? Usually scratch continues, but for simple sim reset is clearer often. 
        // Let's NOT reset automatically to allow cumulative moves, unless user hits reset.
        // Actually, let's reset to ensure reproducible results for the sequence.
        // Re-thinking: Scratch "Green Flag" usually starts from current state unless initialized. 
        // I'll make a dedicated "Reset" button and keep state.

        for (let i = 0; i < program.length; i++) {
            setActiveBlockIndex(i);
            const block = program[i];

            await executeBlock(block);
            await new Promise(r => setTimeout(r, 500)); // Delay between blocks
        }
        setIsRunning(false);
        setActiveBlockIndex(-1);
    };

    const executeBlock = async (block) => {
        setSprite(prev => {
            const newState = { ...prev };
            // Clear message on every step unless it's a say block
            if (block.type !== 'say') newState.message = null;

            switch (block.type) {
                case 'move':
                    // Move in direction of rotation
                    const rad = (prev.rotation * Math.PI) / 180;
                    newState.x += Math.cos(rad) * block.val;
                    newState.y += Math.sin(rad) * block.val;
                    break;
                case 'rotateR':
                    newState.rotation += block.val;
                    break;
                case 'rotateL':
                    newState.rotation -= block.val;
                    break;
                case 'say':
                    newState.message = block.val;
                    break;
                case 'grow':
                    newState.scale += block.val;
                    break;
                case 'shrink':
                    newState.scale = Math.max(0.2, newState.scale - block.val);
                    break;
                case 'reset':
                    newState.x = 0;
                    newState.y = 0;
                    newState.rotation = 0;
                    newState.scale = 1;
                    break;
                default: break;
            }
            return newState;
        });
    };

    return (
        <div className="glass-card section-container">
            <h2>Simulador de Bloques (Estilo Scratch)</h2>
            <p>Arrastra o haz clic en los bloques para crear tu algoritmo.</p>

            <div className="row g-4">
                {/* Palette & Program */}
                <div className="col-md-4">
                    <div className="glass-card p-3 mb-3">
                        <h4>1. Bloques Disponibles</h4>
                        <div className="d-grid gap-2">
                            {blocksPalette.map((b, i) => (
                                <button
                                    key={i}
                                    className="btn text-white text-start"
                                    style={{ background: b.color, border: 'none', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)' }}
                                    onClick={() => addBlock(b)}
                                    disabled={isRunning}
                                >
                                    {b.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-3" style={{ minHeight: '300px', background: 'rgba(255,255,255,0.05)' }}>
                        <h4>2. Tu Programa</h4>
                        {program.length === 0 && <small className="text-muted">El programa está vacío.</small>}
                        <div className="d-flex flex-column gap-2 mt-2">
                            {program.map((b, i) => (
                                <div
                                    key={b.id}
                                    className="p-2 rounded d-flex justify-content-between align-items-center"
                                    style={{
                                        background: b.color,
                                        color: '#fff',
                                        border: activeBlockIndex === i ? '3px solid #ffff00' : '1px solid transparent',
                                        transform: activeBlockIndex === i ? 'scale(1.02)' : 'scale(1)',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <span>{b.label}</span>
                                    {!isRunning && (
                                        <button className="btn btn-sm btn-dark ms-2" onClick={() => removeBlock(i)} style={{ padding: '0px 6px' }}>×</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stage */}
                <div className="col-md-8">
                    <div className="glass-card p-3 h-100 d-flex flex-column">
                        <div className="d-flex justify-content-between mb-3">
                            <div>
                                <button className="btn btn-success me-2" onClick={runProgram} disabled={isRunning || program.length === 0}>
                                    ▶ Ejecutar (Bandera Verde)
                                </button>
                                <button className="btn btn-danger" onClick={() => { setIsRunning(false); setActiveBlockIndex(-1); resetSprite(); }}>
                                    ⏹ Detener / Reset
                                </button>
                            </div>
                            <div className="text-muted">
                                X: {Math.round(sprite.x)} | Y: {Math.round(sprite.y)} | Dir: {sprite.rotation % 360}°
                            </div>
                        </div>

                        <div
                            style={{
                                flex: 1,
                                background: '#f0f0f0',
                                borderRadius: '8px',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                                minHeight: '400px'
                            }}
                        >
                            {/* Grid Lines (Optional style) */}
                            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#ccc' }}></div>
                            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: '#ccc' }}></div>

                            {/* Sprite */}
                            <div
                                style={{
                                    position: 'absolute',
                                    left: `calc(50% + ${sprite.x}px)`,
                                    top: `calc(50% - ${sprite.y}px)`, // Y upsidedown in CSS usually
                                    transform: `translate(-50%, -50%) rotate(${sprite.rotation}deg) scale(${sprite.scale})`,
                                    transition: isRunning ? 'all 0.5s ease' : 'none',
                                    width: '60px',
                                    height: '60px',
                                    textAlign: 'center'
                                }}
                            >
                                {/* Simple Cat SVG */}
                                <svg viewBox="0 0 100 100" width="100%" height="100%">
                                    <path d="M70 20 L90 40 L80 60 L60 80 L20 80 L10 50 L30 20 Z" fill={sprite.color} />
                                    <circle cx="35" cy="45" r="5" fill="#000" />
                                    <circle cx="65" cy="45" r="5" fill="#000" />
                                    <path d="M40 60 Q50 70 60 60" stroke="#000" strokeWidth="3" fill="none" />
                                    <polygon points="20,20 30,5 40,20" fill={sprite.color} />
                                    <polygon points="60,20 70,5 80,20" fill={sprite.color} />
                                </svg>

                                {/* Speech Bubble */}
                                {sprite.message && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            bottom: '100%',
                                            left: '50%',
                                            transform: 'translateX(-50%) rotate(' + (-sprite.rotation) + 'deg)', // Counter-rotate text
                                            background: '#fff',
                                            padding: '5px 10px',
                                            borderRadius: '10px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                                            whiteSpace: 'nowrap',
                                            marginBottom: '10px',
                                            color: '#000',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {sprite.message}
                                        <div style={{ position: 'absolute', top: '100%', left: '50%', border: '5px solid transparent', borderTopColor: '#fff', marginLeft: '-5px' }}></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScratchSimulator;
