import React from 'react';
import ProfileModule from '../components/user/ProfileModule';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ProfilePage = () => {
    return (
        <div className="page-container">
            <NavBar />
            <div className="content-wrap" style={{ paddingTop: '80px' }}>
                <ProfileModule />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
