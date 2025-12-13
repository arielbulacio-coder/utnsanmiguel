import React from 'react';
import TheveninTheory from '../components/thevenin/TheveninTheory';
import TheveninCalculator from '../components/thevenin/TheveninCalculator';

const TheveninPage = () => {
    return (
        <div className="app-container">
            <TheveninTheory />
            <TheveninCalculator />
        </div>
    );
};

export default TheveninPage;
