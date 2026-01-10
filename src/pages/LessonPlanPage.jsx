import React from 'react';
import LessonPlanModule from '../components/academic/LessonPlanModule';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const LessonPlanPage = () => {
    return (
        <div className="page-container">
            <NavBar />
            <div className="content-wrap" style={{ paddingTop: '80px' }}>
                <LessonPlanModule />
            </div>
            <Footer />
        </div>
    );
};

export default LessonPlanPage;
