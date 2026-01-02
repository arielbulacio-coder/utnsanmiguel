import React from 'react';
import CppBasicsTheory from '../components/arduino/CppBasicsTheory';

const CppBasicsPage = () => {
    return (
        <div className="app-container">
            <h1>Programación C/C++</h1>
            <p style={{ fontSize: '1.2rem', color: '#a855f7', marginBottom: '3rem' }}>
                📝 Fundamentos de Programación para Arduino
            </p>

            <CppBasicsTheory />
        </div>
    );
};

export default CppBasicsPage;
