import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Electricidad1roStyles.css'; // Reutilizamos los estilos premium del taller

const TALLER_MODULES = [
  {
    id: 'evasor',
    title: '1. Robot Evita Obstáculos',
    icon: '🤖',
    desc: 'Robot autónomo que detecta obstáculos y cambia de dirección usando un sensor ultrasónico.',
    image: '/images/robot_evasor.jpg',
    physics: 'El sensor HC-SR04 emite un pulso ultrasónico y mide el tiempo de eco. La distancia se calcula con v = d/t (velocidad del sonido 343 m/s).',
    materials: ['Arduino UNO', 'Chasis 2WD / 4WD', 'Sensor Ultrasónico HC-SR04', 'Driver de Motores L298N', 'Baterías 18650 (7.4V)'],
    steps: [
      'Ensamblar el chasis con los motores DC y las ruedas motrices.',
      'Conectar el Driver L298N a los motores y alimentar con el pack de baterías.',
      'Montar el sensor ultrasónico en la parte frontal y conectarlo a pines digitales del Arduino.',
      'Escribir la lógica en C++: Si la distancia es < 15cm, retroceder y girar.',
      '¡Probar el robot en una pista con cajas y obstáculos!'
    ]
  },
  {
    id: 'sumo',
    title: '2. Robot Sumo',
    icon: '🤼',
    desc: 'Robot de combate diseñado para empujar a su oponente fuera del ring (Dohyo) de manera autónoma.',
    image: '/images/robot_sumo.jpg',
    physics: 'Alta tracción, bajo centro de gravedad y sensores para detectar el borde blanco del ring (infrarrojos) y la posición del oponente (ultrasónicos o Sharp IR).',
    materials: ['Arduino Nano / UNO', 'Chasis de Sumo con peso frontal', '2 Sensores de línea TCRT5000', '1 Sensor Ultrasónico o Sharp', 'Driver L298N o TB6612FNG', 'Ruedas de alta fricción (Silicona)'],
    steps: [
      'Montar los motores lo más bajo posible para asegurar el centro de gravedad.',
      'Colocar los sensores infrarrojos apuntando al suelo (para no salir del círculo blanco).',
      'Configurar la estrategia inicial de ataque y búsqueda (giros cerrados o barridos).',
      'Programar interrupciones para el sensor de línea (prioridad máxima: sobrevivir).',
      'Reforzar la pala frontal para usar como rampa contra el oponente.'
    ]
  },
  {
    id: 'futbol',
    title: '3. Fútbol Robot',
    icon: '⚽',
    desc: 'Robot teleoperado o semiautónomo para competencias de fútbol, equipado con actuadores para patear el balón.',
    image: '/images/robot_futbol.jpg',
    physics: 'Manejo de vectores de movimiento mediante tracción diferencial o ruedas omnidireccionales. Uso de solenoides o sistemas neumáticos rápidos para la patada.',
    materials: ['ESP32 o módulo Bluetooth (HC-05)', 'Gamepad o App móvil', 'Driver L298N', 'Chasis compacto', 'Solenoide de 12V (Pateador)', 'Pelota IR (si es autónomo)'],
    steps: [
      'Configurar la comunicación Bluetooth o WiFi entre el control y el ESP32.',
      'Programar la tracción tipo "tanque" para giros veloces sobre su propio eje.',
      'Instalar el solenoide en la parte frontal conectado a un módulo relé o transistor de potencia.',
      'Configurar los botones del mando para accionar los motores y el disparo.',
      'Calibrar el ángulo de tiro y practicar la conducción en la cancha.'
    ]
  }
];

const RoboticaTallerPage = () => {
  const [activeTab, setActiveTab] = useState('evasor');

  return (
    <div className="elec-page">
      {/* Hero Banner */}
      <div className="elec-hero">
        <div className="elec-header-top">
          <div className="elec-badge-group">
            <span className="elec-tag elec-tag-utn">🤖 Programación y Electrónica</span>
            <span className="elec-tag elec-tag-year">⚡ Taller Avanzado</span>
          </div>
        </div>

        <h1 className="elec-title">Curso Taller de Robótica</h1>
        <p className="elec-subtitle">
          Diseña, programa y construye sistemas robóticos móviles. El taller abarca 
          desde la navegación autónoma con el <strong>Robot Evita Obstáculos</strong>, 
          pasando por la estrategia de combate del <strong>Robot Sumo</strong>, 
          hasta la teleoperación de un <strong>Fútbol Robot</strong>.
        </p>

        <div className="elec-info-grid">
          <div className="elec-info-item">
            <span className="elec-info-label">Plataforma</span>
            <span className="elec-info-val">Arduino / ESP32</span>
          </div>
          <div className="elec-info-item">
            <span className="elec-info-label">Enfoque</span>
            <span className="elec-info-val">Autónomo / Teleoperado</span>
          </div>
          <div className="elec-info-item">
            <span className="elec-info-label">Componentes</span>
            <span className="elec-info-val">Sensores y Actuadores</span>
          </div>
          <div className="elec-info-item">
            <span className="elec-info-label">Evaluación</span>
            <span className="elec-info-val">Competencia Final</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="elec-tabs-nav">
        {TALLER_MODULES.map(mod => (
          <button
            key={mod.id}
            className={`elec-tab-btn ${activeTab === mod.id ? 'active' : ''}`}
            onClick={() => setActiveTab(mod.id)}
          >
            {mod.icon} {mod.title}
          </button>
        ))}
      </div>

      {/* Contenido Principal */}
      <div className="elec-content" style={{ marginTop: '2rem' }}>
        {TALLER_MODULES.map(mod => (
          activeTab === mod.id && (
            <div key={mod.id} className="elec-card full-width" style={{ animation: 'fadeIn 0.5s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <span style={{ fontSize: '3rem' }}>{mod.icon}</span>
                <div>
                  <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>{mod.title}</h2>
                  <p style={{ margin: 0, color: '#aaa' }}>{mod.desc}</p>
                </div>
              </div>

              {mod.image && (
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <img src={mod.image} alt={mod.title} style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', border: '1px solid rgba(0, 242, 255, 0.2)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }} />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Panel de Ingeniería */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px' }}>
                  <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Fundamentos Técnicos</h3>
                  <p style={{ lineHeight: '1.6', color: '#ddd' }}>{mod.physics}</p>
                  
                  <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginTop: '1.5rem' }}>Materiales Clave</h3>
                  <ul style={{ paddingLeft: '1.2rem', color: '#ccc', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {mod.materials.map((mat, idx) => (
                      <li key={idx}>{mat}</li>
                    ))}
                  </ul>
                </div>

                {/* Panel de Construcción */}
                <div style={{ background: 'rgba(0,242,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(0,242,255,0.1)' }}>
                  <h3 style={{ borderBottom: '1px solid rgba(0,242,255,0.2)', paddingBottom: '0.5rem', color: 'var(--primary-color)' }}>Hoja de Ruta (Construcción)</h3>
                  <ol style={{ paddingLeft: '1.2rem', color: '#ddd', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {mod.steps.map((step, idx) => (
                      <li key={idx} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                        {step}
                      </li>
                    ))}
                  </ol>

                  {mod.id === 'evasor' && (
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                      <Link to="/robot-evita-obstaculos" className="elec-btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                        Ir al Simulador y Código
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default RoboticaTallerPage;
