import React from 'react';
import ArduinoIntroTheory from '../components/arduino/ArduinoIntroTheory';
import ArduinoPinSimulator from '../components/arduino/ArduinoPinSimulator';

const ArduinoIntroPage = () => {
    return (
        <div className="app-container">
            <h1>Introducción a Arduino</h1>
            <p style={{ fontSize: '1.2rem', color: '#00979D', marginBottom: '3rem' }}>
                🔌 Plataforma de Prototipado Electrónico
            </p>

            <ArduinoIntroTheory />
            <ArduinoPinSimulator />
        </div>
    );
};

export default ArduinoIntroPage;
