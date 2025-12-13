import React from 'react';
import SeriesParallelTheory from '../components/series-parallel/SeriesParallelTheory';
import SeriesParallelCalculator from '../components/series-parallel/SeriesParallelCalculator';

const SeriesParallelPage = () => {
    return (
        <div className="app-container">
            <SeriesParallelTheory />
            <SeriesParallelCalculator />
        </div>
    );
};

export default SeriesParallelPage;
