import React, { useState } from 'react';
import ScratchTheory from '../components/workshop/ScratchTheory';
import ScratchSimulator from '../components/workshop/ScratchSimulator';

const ScratchPage = () => {
    const [activeTab, setActiveTab] = useState('theory');

    return (
        <div className="app-container">
            <h1>Programación con Scratch</h1>

            <div className="tab-container mb-4">
                <button
                    className={`btn ${activeTab === 'theory' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('theory')}
                    style={{ marginRight: '1rem' }}
                >
                    📘 Teoría y Conceptos
                </button>
                <button
                    className={`btn ${activeTab === 'simulator' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setActiveTab('simulator')}
                >
                    🎮 Editor / Simulador
                </button>
            </div>

            {activeTab === 'theory' ? <ScratchTheory /> : <ScratchSimulator />}
        </div>
    );
};

export default ScratchPage;
