import React from 'react';
import CarpentryRuleTheory from '../components/workshop/CarpentryRuleTheory';
import CarpentryRuleSimulator from '../components/workshop/CarpentryRuleSimulator';

const CarpentryRulePage = () => {
    return (
        <div className="app-container">
            <h1>Taller: Metro de Carpintero</h1>
            <p style={{ fontSize: '1.2rem', color: '#bc6c25', marginBottom: '3rem' }}>
                Herramientas Tradicionales de Medición y Trazado
            </p>

            <CarpentryRuleTheory />
            <CarpentryRuleSimulator />
        </div>
    );
};

export default CarpentryRulePage;
