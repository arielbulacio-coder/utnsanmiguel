import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AcademicOverview = () => {
    const { user } = useAuth();

    // Define modules based on role (simplified for now, all show but might be restricted inside)
    const modules = [
        {
            title: 'Boletín de Calificaciones',
            path: '/calificaciones',
            icon: '📊',
            desc: 'Cargar notas ver promedios por trimestre.',
            roles: ['admin', 'profesor', 'director', 'secretario']
        },
        {
            title: 'Control de Asistencia',
            path: '/asistencia',
            icon: '📅',
            desc: 'Registro diario de presentes y ausentes.',
            roles: ['admin', 'preceptor', 'jefe_preceptores', 'director']
        },
        {
            title: 'Gestión de Estudiantes',
            path: '/estudiantes',
            icon: '👨‍🎓',
            desc: 'Alta, baja y modificación de alumnos.',
            roles: ['admin', 'director', 'secretario', 'jefe_preceptores']
        },
        {
            title: 'Usuarios del Sistema',
            path: '/usuarios',
            icon: '🔐',
            desc: 'Administrar permisos y cuentas de acceso.',
            roles: ['admin']
        }
    ];

    const allowedModules = modules.filter(m => m.roles.includes(user?.role));

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <div className="text-center mb-5">
                <h1 className="display-4 text-gradient">Panel de Gestión Académica</h1>
                <p className="lead" style={{ color: 'var(--text-secondary)' }}>
                    Bienvenido, <strong>{user?.email}</strong> ({user?.role?.toUpperCase()})
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {allowedModules.map((mod, index) => (
                    <Link to={mod.path} key={index} style={{ textDecoration: 'none' }}>
                        <div className="glass-card hover-scale" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', transition: 'transform 0.3s ease' }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{mod.icon}</div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{mod.title}</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>{mod.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AcademicOverview;
