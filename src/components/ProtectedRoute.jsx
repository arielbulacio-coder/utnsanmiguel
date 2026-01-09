import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Role Check
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/gestion-academica" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
