import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const ProfileModule = () => {
    const { user, setUser } = useAuth(); // Assuming setUser updates context state if we modify user
    const [formData, setFormData] = useState({
        telefono: '',
        bio: '',
        intereses: '',
        foto: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                telefono: user.telefono || '',
                bio: user.bio || '',
                intereses: user.intereses || '',
                foto: user.foto || ''
            });
        }
    }, [user]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 100000) { // 100kb limit for base64 safety in this simple demo
                alert('La imagen es muy pesada. Máximo 100kb.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, foto: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.put('/perfil', formData);
            alert('Perfil actualizado correctamente');
            // Update context user if possible. If default logout/login isn't needed.
            // Assuming we check /login or /me regularly. Or manual update:
            // setUser({ ...user, ...res.data.user }); // This depends on how AuthContext works
        } catch (error) {
            console.error(error);
            alert('Error al actualizar perfil');
        }
        setLoading(false);
    };

    return (
        <div className="container p-4" style={{ maxWidth: '800px' }}>
            <h2 className="mb-4 text-center text-gradient">Mi Perfil</h2>

            <div className="glass-card p-4">
                <div className="row">
                    {/* Sidebar / Avatar */}
                    <div className="col-md-4 text-center mb-4">
                        <div style={{
                            width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto',
                            overflow: 'hidden', border: '3px solid var(--primary-color)',
                            background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            {formData.foto ? (
                                <img src={formData.foto} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '3rem' }}>👤</span>
                            )}
                        </div>
                        <label className="btn btn-sm btn-outline-primary mt-3">
                            Cambiar Foto 📷
                            <input type="file" accept="image/*" hidden onChange={handleFileChange} />
                        </label>
                        <div className="mt-3">
                            <span className="badge bg-secondary">{user?.role?.toUpperCase()}</span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="col-md-8">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>Nombre / Email (No editable)</label>
                                <input type="text" className="form-control" value={user?.email || ''} disabled />
                            </div>

                            <div className="mb-3">
                                <label>Teléfono de Contacto</label>
                                <input type="text" className="form-control"
                                    value={formData.telefono}
                                    onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                                    placeholder="+54 11 ..."
                                />
                            </div>

                            <div className="mb-3">
                                <label>Biografía / Presentación</label>
                                <textarea className="form-control" rows="3"
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Cuéntanos un poco sobre ti..."
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label>Intereses</label>
                                <textarea className="form-control" rows="2"
                                    value={formData.intereses}
                                    onChange={e => setFormData({ ...formData, intereses: e.target.value })}
                                    placeholder="Ej: Programación, Robótica, Deporte..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                                {loading ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModule;
