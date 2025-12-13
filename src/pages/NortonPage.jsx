import React from 'react';
import NortonTheory from '../components/norton/NortonTheory';
import NortonCalculator from '../components/norton/NortonCalculator';

const NortonPage = () => {
    return (
        <div className="app-container">
            <NortonTheory />
            <NortonCalculator />
        </div>
    );
};

export default NortonPage;
