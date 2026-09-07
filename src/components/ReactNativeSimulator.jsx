import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Babel from '@babel/standalone';
import {
    Play, RotateCcw, Copy, Check, Smartphone, Terminal,
    Layers, List, Navigation, ShieldCheck, Database, Camera,
    Zap, Sparkles, ChevronRight, ExternalLink, BookOpen, CheckCircle2, Lightbulb
} from 'lucide-react';

if (typeof window !== 'undefined') {
    window.React = React;
}

// PRESETS EDUCATIVOS DEL CURSO
export const SIMULATOR_PRESETS = [
    {
        id: 'flexbox',
        unit: 'Unidad 1.1',
        title: 'Flexbox & Layout Móvil',
        icon: <Layers size={18} />,
        summary: 'Aprende el modelo de caja y alineación en React Native con StyleSheet.',
        code: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 Flexbox Móvil</Text>
        <Text style={styles.subtitle}>React Native por defecto usa flexDirection: 'column'</Text>
      </View>

      <View style={styles.boxRow}>
        <View style={[styles.box, { backgroundColor: '#3b82f6' }]}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#10b981' }]}>
          <Text style={styles.boxText}>Box 2</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#f59e0b' }]}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeading}>Propiedades Clave:</Text>
        <Text style={styles.bullet}>• justifyContent: Distribuye en eje principal</Text>
        <Text style={styles.bullet}>• alignItems: Alinea en eje cruzado</Text>
        <Text style={styles.bullet}>• gap: Espaciado moderno entre hijos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38bdf8',
  },
  subtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    gap: 8,
  },
  box: {
    width: 75,
    height: 75,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeading: {
    color: '#f8fafc',
    fontWeight: '700',
    marginBottom: 8,
    fontSize: 14,
  },
  bullet: {
    color: '#cbd5e1',
    fontSize: 12,
    marginBottom: 4,
  }
});`,
        renderSimulator: ({ config, log }) => {
            const [direction, setDirection] = useState('row');
            const [justify, setJustify] = useState('space-around');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', background: '#0f172a', color: '#fff', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8' }}>📱 Flexbox Móvil</div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                            React Native (flexDirection: '{direction}')
                        </div>

                        {/* Interactive Controls inside phone */}
                        <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px', fontSize: '11px' }}>
                            <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '700' }}>INTERACTÚA CON FLEXBOX:</div>
                            <div style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                                <button
                                    onClick={() => { setDirection(d => d === 'row' ? 'column' : 'row'); log(`flexDirection: ${direction === 'row' ? 'column' : 'row'}`); }}
                                    style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: '700' }}
                                >
                                    Dir: {direction}
                                </button>
                                <button
                                    onClick={() => {
                                        const next = justify === 'space-around' ? 'center' : (justify === 'center' ? 'flex-end' : 'space-around');
                                        setJustify(next);
                                        log(`justifyContent: ${next}`);
                                    }}
                                    style={{ flex: 1, padding: '5px', borderRadius: '6px', background: '#6366f1', color: '#fff', fontSize: '11px', fontWeight: '700' }}
                                >
                                    Justify: {justify.slice(0, 7)}
                                </button>
                            </div>
                        </div>

                        {/* Visual Boxes Container */}
                        <div style={{
                            display: 'flex',
                            flexDirection: direction,
                            justifyContent: justify,
                            alignItems: 'center',
                            minHeight: '160px',
                            background: '#1e293b',
                            borderRadius: '14px',
                            padding: '12px',
                            marginTop: '12px',
                            border: '1px dashed #475569',
                            gap: '8px'
                        }}>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 1
                            </motion.div>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 2
                            </motion.div>
                            <motion.div animate={{ scale: [0.95, 1] }} style={{ width: '60px', height: '60px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px' }}>
                                Box 3
                            </motion.div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #334155', borderRadius: '10px', padding: '10px', fontSize: '11px', color: '#cbd5e1' }}>
                        <div style={{ fontWeight: '700', color: '#38bdf8', marginBottom: '2px' }}>💡 Consejo Docente:</div>
                        En React Native todo contenedor tiene <code style={{ color: '#f43f5e' }}>display: 'flex'</code> por defecto. ¡No existe display inline o block!
                    </div>
                </div>
            );
        }
    },
    {
        id: 'state',
        unit: 'Unidad 1.2',
        title: 'Estado con useState & Eventos',
        icon: <Zap size={18} />,
        summary: 'Manejo de estado reactivo, inmutabilidad y eventos táctiles onPress.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterApp() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
    console.log('Nuevo valor:', count + 1);
  };

  const reset = () => {
    setCount(0);
    console.log('Contador reiniciado');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>UNIDAD 1.2 • REACT STATE</Text>
      <Text style={styles.number}>{count}</Text>
      <Text style={styles.label}>Toques registrados</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.btnPrimary} onPress={increment}>
          <Text style={styles.btnText}>+ Incrementar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={reset}>
          <Text style={styles.btnSecondaryText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1d',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  badge: {
    color: '#38bdf8',
    fontSize: 10,
    fontWeight: '800',
    backgroundColor: 'rgba(56,189,248,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginBottom: 20,
    letterSpacing: 1,
  },
  number: {
    fontSize: 60,
    fontWeight: '900',
    color: '#ffffff',
    lineHeight: 70,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 28,
  },
  buttonGroup: {
    width: '100%',
    gap: 10,
  },
  btnPrimary: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnSecondary: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnSecondaryText: {
    color: '#94a3b8',
    fontWeight: '600',
    fontSize: 12,
  },
});`,
        renderSimulator: ({ log }) => {
            const [count, setCount] = useState(0);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', background: '#0a0f1d', color: '#fff', textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', letterSpacing: '1px', fontWeight: '800', color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '4px 10px', borderRadius: '999px', marginBottom: '16px' }}>
                        UNIDAD 1.2 • REACT STATE
                    </div>

                    <motion.div
                        key={count}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        style={{ fontSize: '56px', fontWeight: '900', color: '#ffffff', lineHeight: 1 }}
                    >
                        {count}
                    </motion.div>

                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '6px', marginBottom: '24px' }}>
                        Toques registrados con <span style={{ color: '#a855f7' }}>useState()</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '10px' }}>
                        <button
                            onClick={() => {
                                setCount(c => c + 1);
                                log(`[State] setCount(${count + 1}) -> Re-render ejecutado`);
                            }}
                            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', color: '#fff', fontWeight: '800', fontSize: '14px', boxShadow: '0 4px 15px rgba(59,130,246,0.4)' }}
                        >
                            + Incrementar Toque
                        </button>

                        <button
                            onClick={() => {
                                setCount(0);
                                log(`[State] Contador reseteado a 0`);
                            }}
                            style={{ width: '100%', padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#94a3b8', fontWeight: '600', fontSize: '12px' }}
                        >
                            Reiniciar
                        </button>
                    </div>
                </div>
            );
        }
    },
    {
        id: 'flatlist',
        unit: 'Unidad 1.2',
        title: 'Colecciones con FlatList',
        icon: <List size={18} />,
        summary: 'Renderizado virtualizado de alto rendimiento vs ScrollView ordinario.',
        code: `import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const CURSOS = [
  { id: '1', nombre: 'Fundamentos de React Native', tag: 'Básico', icon: '⚛️' },
  { id: '2', nombre: 'Expo Router & Navegación', tag: 'Intermedio', icon: '🧭' },
  { id: '3', nombre: 'Zustand & Global State', tag: 'Avanzado', icon: '🐻' },
  { id: '4', nombre: 'Firebase Firestore en Tiempo Real', tag: 'Backend', icon: '🔥' },
  { id: '5', nombre: 'Acceso a Cámara y GPS', tag: 'Nativo', icon: '📸' },
  { id: '6', nombre: 'Build & EAS Deploy en Tiendas', tag: 'DevOps', icon: '🚀' },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.icon}>{item.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text style={styles.tag}>{item.tag}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={CURSOS}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    color: '#f8fafc',
    fontSize: 13,
    fontWeight: '700',
  },
  tag: {
    color: '#38bdf8',
    fontSize: 11,
    marginTop: 2,
  }
});`,
        renderSimulator: ({ log }) => {
            const [items] = useState([
                { id: '1', nombre: 'React Native & Expo', tag: 'Semana 1', icon: '⚛️', color: '#38bdf8' },
                { id: '2', nombre: 'Expo Router (Tabs)', tag: 'Semana 3', icon: '🧭', color: '#818cf8' },
                { id: '3', nombre: 'Zustand State Store', tag: 'Semana 5', icon: '🐻', color: '#fbbf24' },
                { id: '4', nombre: 'Firebase Cloud Firestore', tag: 'Semana 8', icon: '🔥', color: '#f97316' },
                { id: '5', nombre: 'Cámara & Sensores GPS', tag: 'Semana 10', icon: '📸', color: '#34d399' },
                { id: '6', nombre: 'EAS Build & Deploy APK', tag: 'Semana 14', icon: '🚀', color: '#ec4899' },
            ]);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#090d16', color: '#fff', overflow: 'hidden' }}>
                    <div style={{ padding: '14px 16px 8px', borderBottom: '1px solid #1e293b', background: '#0e1526' }}>
                        <div style={{ fontSize: '15px', fontWeight: '800', color: '#38bdf8' }}>📚 Lista Virtualizada</div>
                        <div style={{ fontSize: '10px', color: '#94a3b8' }}>Renderizado eficiente con <code style={{ color: '#a855f7' }}>FlatList</code></div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {items.map(item => (
                            <div
                                key={item.id}
                                onClick={() => log(`[FlatList] Click en item ID ${item.id}: "${item.nombre}"`)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 12px',
                                    background: '#151d30',
                                    borderRadius: '12px',
                                    border: '1px solid #23304e',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#f1f5f9' }}>{item.nombre}</div>
                                    <span style={{ fontSize: '9px', fontWeight: '800', color: item.color, background: `${item.color}15`, padding: '2px 6px', borderRadius: '4px' }}>
                                        {item.tag}
                                    </span>
                                </div>
                                <ChevronRight size={14} color="#64748b" />
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '8px 12px', background: '#0e1526', borderTop: '1px solid #1e293b', fontSize: '10px', color: '#64748b', textAlign: 'center' }}>
                        Solo renderiza los elementos visibles en el viewport móvil
                    </div>
                </div>
            );
        }
    },
    {
        id: 'router',
        unit: 'Unidad 1.3',
        title: 'Navegación con Expo Router',
        icon: <Navigation size={18} />,
        summary: 'Enrutamiento basado en archivos: _layout.tsx, Tabs y Stack.',
        code: `import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#38bdf8' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color }) => <Ionicons name="search" color={color} />
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" color={color} />
        }}
      />
    </Tabs>
  );
}`,
        renderSimulator: ({ log }) => {
            const [tab, setTab] = useState('inicio');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0b1120', color: '#fff' }}>
                    {/* Header Stack */}
                    <div style={{ padding: '12px 16px', background: '#111827', borderBottom: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: '#38bdf8' }}>
                            {tab === 'inicio' ? '🏠 Feed Principal' : (tab === 'explorar' ? '🔍 Búsqueda & Explorar' : '👤 Perfil de Alumno')}
                        </div>
                        <span style={{ fontSize: '10px', background: '#1f2937', padding: '2px 8px', borderRadius: '999px', color: '#94a3b8' }}>app/(tabs)/{tab}.tsx</span>
                    </div>

                    {/* Content Screen */}
                    <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
                        >
                            <div style={{ fontSize: '40px' }}>
                                {tab === 'inicio' ? '📱' : (tab === 'explorar' ? '🧭' : '🎓')}
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: '800' }}>
                                {tab === 'inicio' ? 'Bienvenido a SimuTec Mobile' : (tab === 'explorar' ? 'Catálogo de Recursos' : 'Estudiante: Tec. Software')}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', maxWidth: '200px' }}>
                                Expo Router maneja las pantallas según la estructura del sistema de archivos.
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Tab Bar */}
                    <div style={{ height: '56px', background: '#111827', borderTop: '1px solid #1f2937', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px' }}>
                        {[
                            { id: 'inicio', label: 'Inicio', icon: '🏠' },
                            { id: 'explorar', label: 'Explorar', icon: '🔍' },
                            { id: 'perfil', label: 'Perfil', icon: '👤' },
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => {
                                    setTab(t.id);
                                    log(`[Expo Router] Navegando a /(tabs)/${t.id}`);
                                }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    background: 'none',
                                    border: 'none',
                                    color: tab === t.id ? '#38bdf8' : '#64748b',
                                    fontSize: '10px',
                                    fontWeight: tab === t.id ? '800' : '500',
                                    padding: '4px 16px',
                                    cursor: 'pointer'
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>{t.icon}</span>
                                <span>{t.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'form',
        unit: 'Unidad 2.3',
        title: 'Formularios & Zod Validation',
        icon: <ShieldCheck size={18} />,
        summary: 'Inputs controlados, schema validation con Zod y teclado móvil adaptativo.',
        code: `import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Email inválido (@unpilar.edu.ar)'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = () => {
    const result = userSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
      alert('¡Validación exitosa con Zod!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Iniciar Sesión</Text>
      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}
      <View style={styles.field}>
        <Text style={styles.label}>Correo Electrónico:</Text>
        <TextInput
          style={styles.input}
          placeholder="alumno@unpilar.edu.ar"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button title="Ingresar al Sistema" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#38bdf8', marginBottom: 16 },
  field: { marginBottom: 14 },
  label: { color: '#cbd5e1', fontSize: 12, marginBottom: 4 },
  input: { backgroundColor: '#1e293b', padding: 10, borderRadius: 8, color: '#fff', fontSize: 13 },
  errorText: { color: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', padding: 8, borderRadius: 6, marginBottom: 12, fontSize: 12 }
});`,
        renderSimulator: ({ log }) => {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [error, setError] = useState(null);
            const [success, setSuccess] = useState(false);

            const validate = (e) => {
                e.preventDefault();
                if (!email.includes('@') || !email.includes('.')) {
                    setError('Ingresa un email institucional válido.');
                    setSuccess(false);
                    log('[Zod Error] Email inválido');
                    return;
                }
                if (password.length < 6) {
                    setError('La contraseña debe tener mínimo 6 caracteres.');
                    setSuccess(false);
                    log('[Zod Error] Password menor a 6 chars');
                    return;
                }
                setError(null);
                setSuccess(true);
                log(`[Zod Success] Credenciales validadas: ${email}`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', background: '#0a0f1d', color: '#fff', justifyContent: 'center' }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#38bdf8', marginBottom: '4px' }}>
                        🔐 Acceso Estudiantes
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '16px' }}>
                        Validado con <code style={{ color: '#34d399' }}>zod.safeParse()</code>
                    </div>

                    <form onSubmit={validate} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: '700' }}>EMAIL:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="alumno@unpilar.edu.ar"
                                style={{ width: '100%', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                            />
                        </div>

                        <div>
                            <label style={{ fontSize: '10px', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: '700' }}>CONTRASEÑA (MIN 6):</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{ width: '100%', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '12px', boxSizing: 'border-box' }}
                            />
                        </div>

                        {error && (
                            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '8px', borderRadius: '8px', fontSize: '11px' }}>
                                ⚠️ {error}
                            </div>
                        )}

                        {success && (
                            <div style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#86efac', padding: '8px', borderRadius: '8px', fontSize: '11px' }}>
                                ✅ ¡Formulario validado correctamente!
                            </div>
                        )}

                        <button
                            type="submit"
                            style={{ marginTop: '8px', padding: '12px', background: '#3b82f6', color: '#fff', borderRadius: '10px', fontWeight: '800', fontSize: '13px' }}
                        >
                            Validar y Continuar
                        </button>
                    </form>
                </div>
            );
        }
    },
    {
        id: 'firebase',
        unit: 'Unidad 3.1',
        title: 'Firebase Firestore en Tiempo Real',
        icon: <Database size={18} />,
        summary: 'CRUD con addDoc, deleteDoc y sincronización reactiva onSnapshot.',
        code: `import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function FirebaseTaskApp() {
  const [tasks, setTasks] = useState([
    { id: '1', titulo: 'Configurar Expo Router', done: true },
    { id: '2', titulo: 'Crear store con Zustand', done: false },
    { id: '3', titulo: 'Testear en Expo Go', done: false },
  ]);
  const [newTitle, setNewTitle] = useState('');

  const agregarTarea = () => {
    if (!newTitle.trim()) return;
    setTasks(prev => [...prev, { id: Date.now().toString(), titulo: newTitle.trim(), done: false }]);
    setNewTitle('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Cloud Firestore</Text>
      <Text style={styles.subtitle}>Sincronización reactiva /tareas</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nueva tarea móvil..."
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TouchableOpacity style={styles.addBtn} onPress={agregarTarea}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.taskItem} onPress={() => toggleTask(item.id)}>
            <Text style={styles.checkIcon}>{item.done ? '✅' : '⬜'}</Text>
            <Text style={[styles.taskText, item.done && styles.taskDone]}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1d', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#f97316' },
  subtitle: { fontSize: 11, color: '#94a3b8', marginBottom: 14 },
  inputRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  input: { flex: 1, backgroundColor: '#1e293b', borderRadius: 8, padding: 8, color: '#fff', fontSize: 12 },
  addBtn: { backgroundColor: '#f97316', paddingHorizontal: 14, borderRadius: 8, justifyContent: 'center' },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  taskItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', padding: 10, borderRadius: 8, marginBottom: 6 },
  checkIcon: { marginRight: 8, fontSize: 12 },
  taskText: { color: '#fff', fontSize: 12, flex: 1 },
  taskDone: { textDecorationLine: 'line-through', color: '#64748b' }
});`,
        renderSimulator: ({ log }) => {
            const [tasks, setTasks] = useState([
                { id: '1', title: 'Configurar proyecto con Expo Router', done: true },
                { id: '2', title: 'Crear store con Zustand', done: false },
                { id: '3', title: 'Testear en dispositivo con Expo Go', done: false },
            ]);
            const [newTitle, setNewTitle] = useState('');

            const addTask = () => {
                if (!newTitle.trim()) return;
                const newTask = { id: Date.now().toString(), title: newTitle.trim(), done: false };
                setTasks(prev => [...prev, newTask]);
                log(`[Firestore Mock] addDoc("tareas", { title: "${newTitle}" }) -> onSnapshot() emitido`);
                setNewTitle('');
            };

            const toggle = (id) => {
                setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
                log(`[Firestore Mock] updateDoc("tareas/${id}") sincronizado`);
            };

            const remove = (id) => {
                setTasks(prev => prev.filter(t => t.id !== id));
                log(`[Firestore Mock] deleteDoc("tareas/${id}")`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0a0f1d', color: '#fff', padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <div>
                            <div style={{ fontSize: '15px', fontWeight: '800', color: '#f97316' }}>🔥 Firebase Firestore</div>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Colección en tiempo real: <code style={{ color: '#fbbf24' }}>/tareas</code></div>
                        </div>
                        <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                            ● Conectado
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addTask()}
                            placeholder="Nueva tarea móvil..."
                            style={{ flex: 1, padding: '8px 10px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                        />
                        <button
                            onClick={addTask}
                            style={{ padding: '8px 12px', background: '#f97316', color: '#fff', borderRadius: '8px', fontWeight: '800', fontSize: '11px' }}
                        >
                            +
                        </button>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {tasks.map(t => (
                            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: '#151d30', borderRadius: '8px', border: '1px solid #23304e' }}>
                                <input
                                    type="checkbox"
                                    checked={t.done}
                                    onChange={() => toggle(t.id)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <span style={{ flex: 1, fontSize: '11px', textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#64748b' : '#f1f5f9' }}>
                                    {t.title}
                                </span>
                                <button
                                    onClick={() => remove(t.id)}
                                    style={{ background: 'none', color: '#ef4444', fontSize: '11px', padding: '2px 4px' }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'hardware',
        unit: 'Unidad 2.4',
        title: 'Hardware & Sensores (GPS/Cámara)',
        icon: <Camera size={18} />,
        summary: 'Permisos del sistema operativo y acceso a expo-camera y expo-location.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { CameraView } from 'expo-camera';

export default function SensorCameraApp() {
  const [coords, setCoords] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);

  const requestGps = async () => {
    setCoords({ lat: -34.4586, lng: -58.9142 });
  };

  const snapPhoto = () => {
    setPhotoCount(c => c + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📸 Hardware & Sensores</Text>
      <Text style={styles.subtitle}>Cámara y GPS con Expo</Text>

      <CameraView style={styles.camera}>
        <Text style={styles.cameraLabel}>
          {photoCount > 0 ? \`Fotos tomadas: \${photoCount}\` : '📷 Visor de Cámara'}
        </Text>
      </CameraView>

      <TouchableOpacity style={styles.camBtn} onPress={snapPhoto}>
        <Text style={styles.btnText}>Tomar Foto</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Sensor GPS:</Text>
        {coords ? (
          <Text style={styles.gpsText}>Lat: {coords.lat}, Lng: {coords.lng}</Text>
        ) : (
          <TouchableOpacity style={styles.gpsBtn} onPress={requestGps}>
            <Text style={styles.btnText}>Obtener Ubicación</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1d', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#34d399' },
  subtitle: { fontSize: 11, color: '#94a3b8', marginBottom: 12 },
  camera: { height: 130, backgroundColor: '#1e293b', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  cameraLabel: { color: '#94a3b8', fontSize: 12 },
  camBtn: { backgroundColor: '#059669', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  card: { backgroundColor: '#1e293b', padding: 12, borderRadius: 8 },
  cardTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  gpsBtn: { backgroundColor: '#0284c7', padding: 8, borderRadius: 6, alignItems: 'center' },
  gpsText: { color: '#38bdf8', fontSize: 12 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});`,
        renderSimulator: ({ log }) => {
            const [hasGps, setHasGps] = useState(false);
            const [coords, setCoords] = useState(null);
            const [flash, setFlash] = useState(false);
            const [photoCount, setPhotoCount] = useState(0);

            const requestGps = () => {
                log('[Permissions] Location.requestForegroundPermissionsAsync() -> GRANTED');
                setHasGps(true);
                setCoords({ lat: -34.4586, lng: -58.9142, city: 'Pilar, Prov. Buenos Aires' });
                log('[Location] Coordenadas UNPilar obtenidas: -34.4586, -58.9142');
            };

            const snapPhoto = () => {
                setFlash(true);
                setTimeout(() => setFlash(false), 200);
                setPhotoCount(c => c + 1);
                log(`[Camera] Foto capturada #${photoCount + 1} guardada en cache`);
            };

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#050811', color: '#fff', padding: '14px', position: 'relative' }}>
                    {flash && (
                        <div style={{ position: 'absolute', inset: 0, background: '#fff', zIndex: 10, pointerEvents: 'none' }} />
                    )}

                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#34d399', marginBottom: '2px' }}>
                        📡 Sensores del Dispositivo
                    </div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '12px' }}>
                        Permisos nativos en runtime (Android & iOS)
                    </div>

                    {/* Camera Mock Viewfinder */}
                    <div style={{
                        flex: 1,
                        background: '#111c2e',
                        borderRadius: '12px',
                        border: '2px dashed #334155',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '12px',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <Camera size={36} color="#38bdf8" style={{ marginBottom: '6px' }} />
                        <div style={{ fontSize: '11px', fontWeight: '700' }}>Visor de Cámara Simulado</div>
                        <div style={{ fontSize: '9px', color: '#64748b' }}>Fotos tomadas: {photoCount}</div>

                        <button
                            onClick={snapPhoto}
                            style={{ marginTop: '10px', padding: '6px 14px', borderRadius: '999px', background: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '800' }}
                        >
                            📸 Disparar Obturador
                        </button>
                    </div>

                    {/* GPS Widget */}
                    <div style={{ marginTop: '10px', background: '#0e1626', padding: '10px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                        {!hasGps ? (
                            <button
                                onClick={requestGps}
                                style={{ width: '100%', padding: '8px', background: '#10b981', color: '#fff', borderRadius: '8px', fontSize: '11px', fontWeight: '700' }}
                            >
                                📍 Solicitar Permiso de Ubicación
                            </button>
                        ) : (
                            <div style={{ fontSize: '10px' }}>
                                <div style={{ color: '#34d399', fontWeight: '800' }}>✓ Permiso GPS Concedido</div>
                                <div style={{ color: '#cbd5e1', marginTop: '2px' }}>Lat: {coords.lat} | Lng: {coords.lng}</div>
                                <div style={{ color: '#94a3b8', fontSize: '9px' }}>{coords.city}</div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    },
    {
        id: 'animations',
        unit: 'Unidad 3.2',
        title: 'Animaciones con Reanimated 3',
        icon: <Sparkles size={18} />,
        summary: 'Microinteracciones fluidas a 60 FPS corriendo directamente en el UI Thread.',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function BounceBox() {
  const [active, setActive] = useState(false);

  const onPress = () => {
    setActive(a => !a);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>UNIDAD 3.2 • REANIMATED</Text>
      <TouchableOpacity
        style={[styles.box, active && styles.boxActive]}
        onPress={onPress}
      >
        <Text style={styles.boxText}>{active ? '🚀 60 FPS' : '✨ Tócame'}</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Microinteracción fluida ejecutada en el hilo nativo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090d16', alignItems: 'center', justifyContent: 'center', padding: 20 },
  badge: { color: '#a855f7', fontSize: 11, fontWeight: 'bold', backgroundColor: 'rgba(168,85,247,0.1)', paddingVertical: 4, paddingHorizontal: 12, borderRadius: 999, marginBottom: 20 },
  box: { width: 110, height: 110, backgroundColor: '#a855f7', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  boxActive: { backgroundColor: '#ec4899', borderRadius: 30 },
  boxText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  info: { color: '#94a3b8', fontSize: 11, textAlign: 'center', marginTop: 20 }
});`,
        renderSimulator: ({ log }) => {
            const [active, setActive] = useState(false);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#090d16', color: '#fff', padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: '800', color: '#a855f7', background: 'rgba(168,85,247,0.1)', padding: '3px 10px', borderRadius: '999px', marginBottom: '14px' }}>
                        UNIDAD 3.2 • UI THREAD
                    </div>

                    <motion.div
                        animate={{
                            scale: active ? 1.25 : 1,
                            rotate: active ? 10 : 0,
                            borderRadius: active ? '30px' : '16px'
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        onClick={() => {
                            setActive(a => !a);
                            log(`[Reanimated 3] withSpring(scale: ${active ? 1 : 1.25}) ejecutado en UI Thread nativo`);
                        }}
                        style={{
                            width: '110px',
                            height: '110px',
                            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 10px 25px rgba(168,85,247,0.4)',
                            userSelect: 'none'
                        }}
                    >
                        <Sparkles size={28} color="#fff" />
                        <span style={{ fontSize: '11px', fontWeight: '900', marginTop: '4px' }}>Tócame</span>
                    </motion.div>

                    <div style={{ marginTop: '20px', fontSize: '11px', color: '#94a3b8', maxWidth: '200px' }}>
                        ¡No bloquea el hilo de JavaScript! Corre a 60/120 FPS sin caídas de frames.
                    </div>
                </div>
            );
        }
    },
    {
        id: 'api',
        unit: 'Unidad 2.2',
        title: 'Consumo de APIs (Fetch)',
        icon: <Database size={18} />,
        summary: 'Peticiones de red asíncronas para obtener y mostrar datos remotos.',
        code: `import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function ApiExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0284c7" style={{marginTop: 50}}/>;

  return (
    <FlatList 
      data={data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  name: { fontSize: 16, fontWeight: 'bold' },
  email: { color: 'gray' }
});`,
        renderSimulator: ({ log }) => {
            const [users, setUsers] = useState([]);
            const [loading, setLoading] = useState(false);

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc', overflow: 'hidden' }}>
                    <div style={{ padding: '16px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Usuarios Remotos</div>
                        <button 
                            onClick={() => {
                                setLoading(true);
                                log('[Fetch] Requesting GET https://jsonplaceholder.typicode.com/users...');
                                setTimeout(() => {
                                    setUsers([{id:1, name: 'Leanne Graham', email: 'Sincere@april.biz'}, {id:2, name: 'Ervin Howell', email: 'Shanna@melissa.tv'}, {id:3, name: 'Clementine Bauch', email: 'Nathan@yesenia.net'}]);
                                    setLoading(false);
                                    log('[Fetch] Status 200 OK - 3 users received');
                                }, 1200);
                            }}
                            style={{ marginTop: '10px', padding: '8px 12px', background: '#0284c7', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', width: '100%' }}
                        >
                            {loading ? 'Cargando...' : 'Obtener Usuarios (fetch)'}
                        </button>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {loading && <div style={{ textAlign: 'center', padding: '20px', color: '#0284c7' }}>cargando...</div>}
                        {!loading && users.map(u => (
                            <div key={u.id} style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
                                <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>{u.name}</div>
                                <div style={{ color: '#64748b', fontSize: '12px', marginTop: '4px' }}>{u.email}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    },
    {
        id: 'eas',
        unit: 'Unidad 3.3',
        title: 'EAS Build & Deploy',
        icon: <Zap size={18} />,
        summary: 'Compilación en la nube de binarios para Android (APK/AAB) e iOS (IPA).',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EasDashboard() {
  const [status, setStatus] = useState('idle');

  const buildApk = () => {
    setStatus('building');
    setTimeout(() => setStatus('done'), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚀 EAS Build Dashboard</Text>
      <Text style={styles.subtitle}>Perfil de compilación: preview (APK)</Text>

      {status === 'idle' && (
        <TouchableOpacity style={styles.btn} onPress={buildApk}>
          <Text style={styles.btnText}>Compilar APK en la Nube</Text>
        </TouchableOpacity>
      )}

      {status === 'building' && (
        <View style={styles.terminal}>
          <Text style={styles.log}>[✔] Configuración eas.json cargada</Text>
          <Text style={styles.log}>[✔] Subiendo archivos del proyecto...</Text>
          <Text style={styles.logPending}>[⚙] Compilando con Gradle en la nube...</Text>
        </View>
      )}

      {status === 'done' && (
        <View style={styles.terminal}>
          <Text style={styles.logSuccess}>[✔] Compilación exitosa!</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🤖 Android APK Generado</Text>
            <Text style={styles.cardLink}>https://expo.dev/artifacts/eas/app.apk</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#10b981' },
  subtitle: { fontSize: 11, color: '#94a3b8', marginBottom: 16 },
  btn: { backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: 'bold', fontSize: 13 },
  terminal: { backgroundColor: '#111827', padding: 12, borderRadius: 8, gap: 6 },
  log: { color: '#10b981', fontSize: 11 },
  logPending: { color: '#f59e0b', fontSize: 11 },
  logSuccess: { color: '#10b981', fontWeight: 'bold', fontSize: 13 },
  card: { backgroundColor: '#1f2937', padding: 10, borderRadius: 6, marginTop: 8 },
  cardTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cardLink: { color: '#38bdf8', fontSize: 10, marginTop: 4 }
});`,
        renderSimulator: ({ log }) => {
            const [status, setStatus] = useState('idle');

            return (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', color: '#10b981', fontFamily: 'monospace', padding: '16px', fontSize: '11px' }}>
                    <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '16px' }}>$ eas build -p android --profile preview</div>
                    
                    {status === 'idle' && (
                        <button 
                            onClick={() => {
                                setStatus('building');
                                log('[EAS] Iniciando Job de compilación en los servidores de Expo');
                                setTimeout(() => { setStatus('done'); log('[EAS] Build exitoso. APK generado.'); }, 2000);
                            }}
                            style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Ejecutar Build
                        </button>
                    )}
                    {status === 'building' && (
                        <div>
                            <div>[✔] Project initialized</div>
                            <div style={{ marginTop: '8px' }}>[✔] Uploading project files...</div>
                            <div style={{ marginTop: '8px' }}>[⚙] Building Android app (Gradle)...</div>
                            <div style={{ color: '#f59e0b', marginTop: '8px' }}><div className="spinner" style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</div> Compilando en la nube (Queue: 1)</div>
                        </div>
                    )}
                    {status === 'done' && (
                        <div>
                            <div style={{ color: '#10b981' }}>[✔] Build successful!</div>
                            <div style={{ marginTop: '16px', background: '#111', padding: '10px', borderRadius: '6px', border: '1px solid #333' }}>
                                <div style={{ color: '#fff' }}>🤖 Android APK</div>
                                <div style={{ color: '#3b82f6', marginTop: '6px' }}>https://expo.dev/artifacts/eas/123456.apk</div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    },
    {
        id: 'ai',
        unit: 'Unidad 3.4',
        title: 'Asistencia con IA',
        icon: <Terminal size={18} />,
        summary: 'Uso de LLMs para resolver bugs, refactorizar o generar boilerplate de RN.',
        code: `import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AiAssistant() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('¡Hola! Soy tu tutor IA. Pregúntame sobre componentes, estado o navegación.');

  const ask = () => {
    if (!query.trim()) return;
    setResponse(\`💡 Respuesta sobre "\${query}": En React Native todo contenedor usa Flexbox por defecto y los estilos se optimizan con StyleSheet.\`);
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Asistente IA React Native</Text>
      <View style={styles.chatCard}>
        <Text style={styles.chatText}>{response}</Text>
      </View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Pregunta sobre React Native..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.btn} onPress={ask}>
          <Text style={styles.btnText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0f1d', padding: 16, justifyContent: 'space-between' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#38bdf8', marginBottom: 12 },
  chatCard: { flex: 1, backgroundColor: '#1e293b', borderRadius: 10, padding: 14, marginBottom: 12 },
  chatText: { color: '#f8fafc', fontSize: 12, lineHeight: 18 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, backgroundColor: '#1e293b', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, color: '#fff', fontSize: 12 },
  btn: { backgroundColor: '#38bdf8', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#0f172a', fontWeight: 'bold', fontSize: 14 }
});`,
        renderSimulator: ({ log }) => {
            const [query, setQuery] = useState('');
            const [response, setResponse] = useState('');

            return (
                <div style={{ flex: 1, background: '#1e293b', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: '12px', background: '#0f172a', borderBottom: '1px solid #334155', color: '#fff', fontWeight: 'bold' }}>
                        ✨ Asistente IA (Mock)
                    </div>
                    <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                        {response && (
                            <div style={{ background: '#334155', padding: '12px', borderRadius: '8px', color: '#f8fafc', fontSize: '13px', lineHeight: 1.5 }}>
                                {response}
                            </div>
                        )}
                    </div>
                    <div style={{ padding: '12px', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
                        <input 
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Haz una pregunta de React Native..."
                            style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: 'none', background: '#0f172a', color: '#fff', fontSize: '12px', outline: 'none' }}
                        />
                        <button 
                            onClick={() => {
                                if(!query.trim()) return;
                                log(`[IA] Procesando query: "${query}"`);
                                setResponse('En React Native, puedes usar KeyboardAvoidingView para evitar que el teclado oculte los inputs. Por ejemplo:\\n\\n<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>\\n ... \\n</KeyboardAvoidingView>');
                                setQuery('');
                            }}
                            style={{ background: '#38bdf8', border: 'none', borderRadius: '20px', padding: '0 16px', color: '#0f172a', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            ↗
                        </button>
                    </div>
                </div>
            )
        }
    }
];

const flattenStyle = (s) => {
    if (!s) return {};
    let res = {};
    if (Array.isArray(s)) {
        s.forEach(item => {
            if (item) Object.assign(res, flattenStyle(item));
        });
    } else if (typeof s === 'object') {
        res = { ...s };
    }
    if (res.paddingVertical !== undefined) {
        res.paddingTop = res.paddingVertical;
        res.paddingBottom = res.paddingVertical;
        delete res.paddingVertical;
    }
    if (res.paddingHorizontal !== undefined) {
        res.paddingLeft = res.paddingHorizontal;
        res.paddingRight = res.paddingHorizontal;
        delete res.paddingHorizontal;
    }
    if (res.marginVertical !== undefined) {
        res.marginTop = res.marginVertical;
        res.marginBottom = res.marginVertical;
        delete res.marginVertical;
    }
    if (res.marginHorizontal !== undefined) {
        res.marginLeft = res.marginHorizontal;
        res.marginRight = res.marginHorizontal;
        delete res.marginHorizontal;
    }
    if (res.borderWidth !== undefined && !res.borderStyle) {
        res.borderStyle = 'solid';
    }
    if (res.elevation !== undefined && !res.boxShadow) {
        res.boxShadow = `0 ${Math.min(res.elevation, 8)}px ${res.elevation * 2}px rgba(0,0,0,0.35)`;
        delete res.elevation;
    }
    return res;
};

const RN_MOCKS = {
    View: ({ style, children, ...rest }) => (
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            {children}
        </div>
    ),
    Text: ({ style, children, ...rest }) => (
        <span style={{ fontSize: '14px', boxSizing: 'border-box', color: '#fff', ...flattenStyle(style) }} {...rest}>
            {children}
        </span>
    ),
    TouchableOpacity: ({ style, onPress, children, activeOpacity = 0.6, ...rest }) => {
        const [isDown, setIsDown] = useState(false);
        return (
            <div
                onClick={onPress}
                onMouseDown={() => setIsDown(true)}
                onMouseUp={() => setIsDown(false)}
                onMouseLeave={() => setIsDown(false)}
                style={{ cursor: 'pointer', transition: 'opacity 0.15s', opacity: isDown ? activeOpacity : 1, userSelect: 'none', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(style) }}
                {...rest}
            >
                {children}
            </div>
        );
    },
    TextInput: ({ style, value, onChangeText, placeholder, placeholderTextColor = '#64748b', secureTextEntry, ...rest }) => (
        <input
            type={secureTextEntry ? 'password' : 'text'}
            value={value ?? ''}
            onChange={(e) => onChangeText && onChangeText(e.target.value)}
            placeholder={placeholder}
            style={{ fontSize: '13px', padding: '10px 12px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff', outline: 'none', boxSizing: 'border-box', ...flattenStyle(style) }}
            {...rest}
        />
    ),
    Button: ({ title, onPress, color = '#0284c7', disabled }) => (
        <button
            onClick={onPress}
            disabled={disabled}
            style={{ background: color, color: '#fff', padding: '10px 16px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, width: '100%' }}
        >
            {title}
        </button>
    ),
    ScrollView: ({ style, contentContainerStyle, children, ...rest }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            <div style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(contentContainerStyle) }}>
                {children}
            </div>
        </div>
    ),
    FlatList: ({ data = [], renderItem, keyExtractor, style, contentContainerStyle, ListHeaderComponent, ListEmptyComponent }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto', boxSizing: 'border-box', ...flattenStyle(style) }}>
            <div style={{ display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(contentContainerStyle) }}>
                {ListHeaderComponent && (typeof ListHeaderComponent === 'function' ? <ListHeaderComponent /> : ListHeaderComponent)}
                {data.length === 0 && ListEmptyComponent && (typeof ListEmptyComponent === 'function' ? <ListEmptyComponent /> : ListEmptyComponent)}
                {data.map((item, index) => {
                    const key = keyExtractor ? keyExtractor(item, index) : (item.id ?? index);
                    return <React.Fragment key={key}>{renderItem({ item, index })}</React.Fragment>;
                })}
            </div>
        </div>
    ),
    Image: ({ source, style, ...rest }) => {
        const src = typeof source === 'string' ? source : (source?.uri || '');
        return <img src={src} alt="rn-img" style={{ objectFit: 'cover', display: 'block', ...flattenStyle(style) }} {...rest} />;
    },
    ActivityIndicator: ({ size = 'small', color = '#38bdf8', style }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', gap: '8px', color, fontSize: size === 'large' ? '15px' : '12px', ...flattenStyle(style) }}>
            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span> Cargando...
        </div>
    ),
    SafeAreaView: ({ style, children, ...rest }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '8px', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            {children}
        </div>
    ),
    KeyboardAvoidingView: ({ style, children, ...rest }) => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', ...flattenStyle(style) }} {...rest}>
            {children}
        </div>
    ),
    StyleSheet: { create: (s) => s, flatten: flattenStyle },
    Platform: { OS: 'ios', select: (obj) => obj.ios ?? obj.default },
    Dimensions: { get: () => ({ width: 290, height: 520 }) },
    Alert: { alert: (title, msg) => window.alert(`${title}${msg ? '\n' + msg : ''}`) }
};

const EXPO_ICONS_MOCKS = {
    Ionicons: ({ name, size = 18, color = '#38bdf8', style }) => {
        const iconMap = {
            home: '🏠',
            search: '🔍',
            person: '👤',
            camera: '📸',
            settings: '⚙️',
            star: '★',
            refresh: '🔄'
        };
        return (
            <span style={{ fontSize: `${size}px`, color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, ...flattenStyle(style) }}>
                {iconMap[name] || '★'}
            </span>
        );
    }
};

const TabsComponent = ({ children, screenOptions }) => {
    const screens = React.Children.toArray(children).filter(c => React.isValidElement(c));
    const [activeTab, setActiveTab] = useState(screens[0]?.props?.name || 'index');
    const activeScreen = screens.find(s => s.props?.name === activeTab) || screens[0];
    const activeColor = screenOptions?.tabBarActiveTintColor || '#38bdf8';

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#0b1120' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {activeScreen?.props?.children || (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
                        <div style={{ fontSize: '42px', marginBottom: '12px' }}>
                            {activeTab === 'index' || activeTab === 'inicio' ? '🏠' : (activeTab === 'explorar' ? '🔍' : '👤')}
                        </div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>
                            {activeScreen?.props?.options?.title || activeTab}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
                            Ruta activa: app/(tabs)/{activeTab}.tsx
                        </div>
                    </div>
                )}
            </div>
            <div style={{ display: 'flex', borderTop: '1px solid #1f2937', background: '#111827', padding: '8px 0' }}>
                {screens.map(screen => {
                    const name = screen.props?.name;
                    const title = screen.props?.options?.title || name;
                    const isSelected = activeTab === name;
                    const iconFn = screen.props?.options?.tabBarIcon;
                    return (
                        <div
                            key={name}
                            onClick={() => setActiveTab(name)}
                            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', opacity: isSelected ? 1 : 0.6 }}
                        >
                            {iconFn ? iconFn({ color: isSelected ? activeColor : '#94a3b8', size: 18 }) : <span style={{ fontSize: '16px' }}>📱</span>}
                            <span style={{ fontSize: '10px', color: isSelected ? activeColor : '#94a3b8', marginTop: '2px', fontWeight: isSelected ? 'bold' : 'normal' }}>
                                {title}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
TabsComponent.Screen = () => null;

const EXPO_ROUTER_MOCKS = {
    Tabs: TabsComponent,
    Stack: ({ children }) => <div style={{ flex: 1 }}>{children}</div>,
    useRouter: () => ({ push: () => {}, replace: () => {}, back: () => {} }),
    Link: ({ children }) => <span style={{ color: '#38bdf8', cursor: 'pointer' }}>{children}</span>
};

const createZodMock = () => {
    const stringBuilder = () => {
        const rules = [];
        const obj = {
            rules,
            email: (msg) => { rules.push({ type: 'email', msg }); return obj; },
            min: (minLen, msg) => { rules.push({ type: 'min', minLen, msg }); return obj; },
            max: (maxLen, msg) => { rules.push({ type: 'max', maxLen, msg }); return obj; },
            optional: () => obj,
            nullable: () => obj,
            regex: () => obj,
            refine: (fn, msg) => { rules.push({ type: 'refine', fn, msg }); return obj; }
        };
        return obj;
    };

    const numberBuilder = () => {
        const rules = [];
        const obj = {
            rules,
            min: (minVal, msg) => { rules.push({ type: 'numMin', minVal, msg }); return obj; },
            max: (maxVal, msg) => { rules.push({ type: 'numMax', maxVal, msg }); return obj; },
            positive: () => obj,
            int: () => obj,
            optional: () => obj,
            nullable: () => obj
        };
        return obj;
    };

    const zBase = {
        string: stringBuilder,
        number: numberBuilder,
        boolean: () => ({ optional: () => ({}) }),
        any: () => ({ optional: () => ({}) }),
        object: (shape) => ({
            shape,
            safeParse: (data) => {
                for (let k in shape) {
                    const val = data ? data[k] : '';
                    if (shape[k]?.rules) {
                        for (let rule of shape[k].rules) {
                            if (rule.type === 'email' && (!val || !val.includes('@') || !val.includes('.'))) {
                                return { success: false, error: { errors: [{ message: rule.msg || 'Email inválido' }] } };
                            }
                            if (rule.type === 'min' && (!val || val.length < rule.minLen)) {
                                return { success: false, error: { errors: [{ message: rule.msg || `Mínimo ${rule.minLen} caracteres` }] } };
                            }
                            if (rule.type === 'max' && val && val.length > rule.maxLen) {
                                return { success: false, error: { errors: [{ message: rule.msg || `Máximo ${rule.maxLen} caracteres` }] } };
                            }
                            if (rule.type === 'refine' && rule.fn && !rule.fn(val)) {
                                return { success: false, error: { errors: [{ message: typeof rule.msg === 'function' ? rule.msg(val) : (rule.msg || 'Valor inválido') }] } };
                            }
                        }
                    }
                }
                return { success: true, data };
            },
            parse: (data) => {
                const res = zBase.object(shape).safeParse(data);
                if (!res.success) throw new Error(res.error.errors[0].message);
                return res.data;
            }
        }),
        infer: () => ({})
    };

    return {
        z: zBase,
        ...zBase,
        default: { z: zBase, ...zBase },
        __esModule: true
    };
};

const ZOD_MOCKS = createZodMock();

const REANIMATED_MOCKS = {
    Animated: { View: RN_MOCKS.View, Text: RN_MOCKS.Text, Image: RN_MOCKS.Image, ScrollView: RN_MOCKS.ScrollView },
    default: { View: RN_MOCKS.View, Text: RN_MOCKS.Text, Image: RN_MOCKS.Image, ScrollView: RN_MOCKS.ScrollView },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withSpring: (val) => val,
    withTiming: (val) => val
};

const FIRESTORE_MOCKS = {
    collection: (db, name) => name,
    onSnapshot: (col, cb) => {
        setTimeout(() => {
            cb({
                docs: [
                    { id: '1', data: () => ({ titulo: 'Configurar Expo Router', done: true }) },
                    { id: '2', data: () => ({ titulo: 'Crear store con Zustand', done: false }) },
                    { id: '3', data: () => ({ titulo: 'Testear con Expo Go', done: false }) }
                ]
            });
        }, 50);
        return () => {};
    },
    addDoc: async (col, data) => ({ id: Date.now().toString(), ...data }),
    deleteDoc: async () => {},
    doc: () => ({})
};

const LOCATION_MOCKS = {
    requestForegroundPermissionsAsync: async () => ({ status: 'granted' }),
    getCurrentPositionAsync: async () => ({ coords: { latitude: -34.4586, longitude: -58.9142 } })
};

const CAMERA_MOCKS = {
    CameraView: ({ style, children }) => (
        <div style={{ background: '#1e293b', border: '1px dashed #475569', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '130px', color: '#94a3b8', fontSize: '12px', ...flattenStyle(style) }}>
            📷 Cámara Móvil Simulada
            {children}
        </div>
    ),
    useCameraPermissions: () => [{ granted: true }, async () => ({ status: 'granted' })]
};

class LiveErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    componentDidCatch(error) {
        if (this.props.onError) this.props.onError(error);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
            this.setState({ hasError: false, error: null });
        }
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ flex: 1, padding: '16px', background: '#3b0712', color: '#fca5a5', fontSize: '11px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                    <div style={{ fontWeight: '800', color: '#f87171', fontSize: '12px' }}>⚠️ Error en Tiempo de Ejecución:</div>
                    <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: '#fecdd3', lineHeight: 1.4 }}>
                        {this.state.error?.toString()}
                    </div>
                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            style={{ padding: '6px 12px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
                        >
                            🔄 Reintentar Renderizado
                        </button>
                        <div style={{ fontSize: '10px', color: '#fda4af' }}>
                            Modifica el código para corregir el error o presiona Resetear.
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const LiveSimulatorRunner = ({ code, log, resetKey }) => {
    const [compState, setCompState] = useState({ Comp: null, version: 0 });
    const [compileError, setCompileError] = useState(null);

    useEffect(() => {
        if (!code) return;
        const timer = setTimeout(() => {
            try {
                const res = Babel.transform(code, {
                    presets: [
                        ['env', { modules: 'commonjs' }],
                        ['react', { runtime: 'classic' }]
                    ]
                });

                const exportsObj = {};
                const customRequire = (moduleName) => {
                    if (moduleName === 'react') return { ...React, default: React, __esModule: true };
                    if (moduleName === 'react-native') return { ...RN_MOCKS, default: RN_MOCKS, __esModule: true };
                    if (moduleName === '@expo/vector-icons') return { ...EXPO_ICONS_MOCKS, default: EXPO_ICONS_MOCKS, __esModule: true };
                    if (moduleName === 'expo-router') return { ...EXPO_ROUTER_MOCKS, default: EXPO_ROUTER_MOCKS, __esModule: true };
                    if (moduleName === 'zod') return ZOD_MOCKS;
                    if (moduleName === 'react-native-reanimated') return { ...REANIMATED_MOCKS, default: REANIMATED_MOCKS, __esModule: true };
                    if (moduleName === 'firebase/firestore') return { ...FIRESTORE_MOCKS, default: FIRESTORE_MOCKS, __esModule: true };
                    if (moduleName.includes('firebaseConfig')) return { db: {}, default: { db: {} }, __esModule: true };
                    if (moduleName === 'expo-location') return { ...LOCATION_MOCKS, default: LOCATION_MOCKS, __esModule: true };
                    if (moduleName === 'expo-camera') return { ...CAMERA_MOCKS, default: CAMERA_MOCKS, __esModule: true };
                    return {};
                };

                const fn = new Function('require', 'exports', 'React', res.code);
                fn(customRequire, exportsObj, React);
                const ExportedComp = exportsObj.default || exportsObj.App;

                if (typeof ExportedComp === 'function') {
                    setCompState(prev => ({ Comp: () => <ExportedComp />, version: prev.version + 1 }));
                    setCompileError(null);
                    if (log) log('[Metro] Fast Refresh aplicado con éxito.');
                } else {
                    setCompileError('No se encontró un "export default function Componente() { ... }" en el código.');
                }
            } catch (err) {
                setCompileError(err.message || String(err));
            }
        }, 120);

        return () => clearTimeout(timer);
    }, [code, resetKey]);

    if (compileError) {
        return (
            <div style={{ flex: 1, padding: '16px', background: '#1e1b4b', borderLeft: '4px solid #f43f5e', color: '#f8fafc', fontSize: '11px', fontFamily: 'monospace', display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                <div style={{ fontWeight: '800', color: '#f43f5e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>⚠️</span> Error de Sintaxis (Babel):
                </div>
                <div style={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap', color: '#fda4af', lineHeight: 1.4 }}>
                    {compileError}
                </div>
                <div style={{ marginTop: 'auto', fontSize: '10px', color: '#94a3b8' }}>
                    El código se compila en vivo mientras escribes. Corrige la sintaxis para actualizar el teléfono.
                </div>
            </div>
        );
    }

    const { Comp, version } = compState;
    if (!Comp) {
        return (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', color: '#94a3b8', fontSize: '11px' }}>
                Compilando aplicación...
            </div>
        );
    }

    return (
        <LiveErrorBoundary key={`${version}-${resetKey}`}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', height: '100%', overflow: 'hidden', background: '#020617', color: '#fff' }}>
                <Comp />
            </div>
        </LiveErrorBoundary>
    );
};

const PRESET_EXPLANATIONS = {
    flexbox: {
        badge: 'Arquitectura de Layout',
        concept: 'En React Native, TODO componente contenedor utiliza Flexbox por defecto con flexDirection: "column" y display: "flex". No existen "block", "inline" ni floats.',
        sections: [
            {
                title: '1. Imports Principales de React Native',
                desc: 'import { View, Text, StyleSheet } from "react-native";',
                detail: '• View: El equivalente nativo a un <div> (se compila a UIView en iOS y ViewGroup/FrameLayout en Android).\n• Text: Imprescindible para renderizar cualquier texto. En React Native no puedes colocar texto libre dentro de una View sin envolverlo en <Text>.\n• StyleSheet: Módulo optimizado de estilos nativos que valida las propiedades y las envía al hilo nativo mediante identificadores numéricos.'
            },
            {
                title: '2. Estructura del Componente',
                desc: 'export default function App() { return <View style={styles.container}>...</View>; }',
                detail: 'El componente principal debe ser exportado por defecto ("export default"). Renderiza un árbol de Views anidadas organizadas con flexbox.'
            },
            {
                title: '3. Reglas de Flexbox en Móviles',
                desc: 'flexDirection, justifyContent y alignItems',
                detail: '• flexDirection: Por defecto es "column" (eje vertical principal). En web es "row".\n• justifyContent: "space-between" distribuye el espacio sobrante equitativamente en el eje principal.\n• gap: Espaciado automático entre elementos hijos sin recurrir a márgenes manuales.'
            },
            {
                title: '4. El objeto StyleSheet.create',
                desc: 'const styles = StyleSheet.create({ container: { flex: 1, ... } });',
                detail: 'flex: 1 hace que el contenedor ocupe el 100% del alto y ancho disponible en la pantalla del smartphone. Las unidades no llevan "px", son píxeles independientes de la densidad (dp en Android / puntos en iOS).'
            }
        ],
        webVsNative: 'En Web usas <div> y CSS tradicional con cascada. En React Native no hay cascada (no-inheritance), los estilos son scoped a cada elemento, y no existen bordes o textos directos en contenedores genéricos.',
        tip: 'Usa siempre StyleSheet.create() en lugar de objetos literales inline en JSX para evitar que el Garbage Collector recolecte y recree objetos en cada frame.'
    },
    state: {
        badge: 'Gestión Reactiva de Estado',
        concept: 'El manejo de estado en móviles gobierna la interactividad táctil sin recargar la pantalla. Cada mutación con useState() re-renderiza el árbol de componentes a 60 FPS.',
        sections: [
            {
                title: '1. Hook useState & Reactividad',
                desc: 'const [count, setCount] = useState(0);',
                detail: 'Define el estado local reactivo. Al invocar setCount(prev => prev + 1), React programa un re-render del componente móvil actualizando únicamente los nodos afectados.'
            },
            {
                title: '2. Eventos Táctiles con TouchableOpacity',
                desc: '<TouchableOpacity onPress={increment}>',
                detail: 'A diferencia de la Web (onClick), los smartphones responden a gestos táctiles. TouchableOpacity proporciona retroalimentación háptica y visual reduciendo la opacidad al pulsar (feedback activo de toque).'
            },
            {
                title: '3. Funciones Manejadoras (Handlers)',
                desc: 'const increment = () => { setCount(prev => prev + 1); };',
                detail: 'Se recomienda usar la forma funcional setCount(prev => prev + 1) para garantizar que se opera sobre el valor más reciente del estado ante múltiples toques rápidos consecutivos.'
            },
            {
                title: '4. Estilos Nativos con StyleSheet',
                desc: 'container, badge, number, buttonGroup, btnPrimary',
                detail: 'Define un diseño móvil centrado con justifyContent: "center" y alignItems: "center". Los botones utilizan borderRadius: 12 y paddingVertical: 14 adaptados a la zona ergonómica del pulgar.'
            }
        ],
        webVsNative: 'En Web usas <button onClick={...}>. En React Native usas <TouchableOpacity onPress={...}> o <Pressable> para controlar eventos touchstart, touchend y respuesta táctil.',
        tip: 'Para listas largas o estados compartidos entre múltiples pantallas, se recomienda Zustand o Redux Toolkit en lugar de prop drilling.'
    },
    flatlist: {
        badge: 'Listas Virtualizadas',
        concept: 'FlatList es el componente estándar de React Native para renderizar colecciones de cientos o miles de elementos con mínimo consumo de memoria RAM mediante reciclaje de vistas (Windowing/Virtualization).',
        sections: [
            {
                title: '1. Prop data',
                desc: 'data={CURSOS}',
                detail: 'Un arreglo de objetos JavaScript con la información a mostrar. FlatList observa este arreglo para determinar qué filas pintar.'
            },
            {
                title: '2. Prop keyExtractor',
                desc: 'keyExtractor={item => item.id}',
                detail: 'Extrae una clave única de tipo string para cada elemento. Es vital para que React Native rastree los elementos agregados, eliminados o reordenados sin re-renderizar la lista completa.'
            },
            {
                title: '3. Prop renderItem',
                desc: 'renderItem={({ item }) => <View style={styles.card}>...</View>}',
                detail: 'Función que devuelve la plantilla visual para cada fila. Recibe { item, index }. Las filas fuera de pantalla son recicladas para ahorrar memoria.'
            },
            {
                title: '4. contentContainerStyle',
                desc: 'contentContainerStyle={{ padding: 16 }}',
                detail: 'Aplica padding interno al contenido desplazable de la lista, evitando cortar las sombras o bordes de los elementos finales al hacer scroll.'
            }
        ],
        webVsNative: 'En Web solemos hacer array.map() dentro de un div con scroll. En móviles esto provocaría un "Out of Memory" (OOM) crash con listas largas. FlatList solo mantiene en memoria los elementos visibles.',
        tip: 'Si necesitas aún más rendimiento en listas masivas (10,000+ items), la librería de Shopify llamada FlashList es hasta 10 veces más rápida que FlatList.'
    },
    router: {
        badge: 'Enrutamiento Basado en Archivos',
        concept: 'Expo Router traduce la estructura física de carpetas y archivos en rutas nativas nativamente compiladas, similar a Next.js App Router pero para iOS y Android.',
        sections: [
            {
                title: '1. Contenedor de Pestañas <Tabs>',
                desc: 'import { Tabs } from "expo-router";',
                detail: 'Renderiza una barra de navegación inferior nativa (UITabBar en iOS / NavigationBar en Android) con animación fluida entre pestañas.'
            },
            {
                title: '2. Definición de Pantallas <Tabs.Screen>',
                desc: '<Tabs.Screen name="index" options={{ title: "Inicio" }} />',
                detail: 'Cada Tabs.Screen mapea a un archivo físico. name="index" corresponde a app/(tabs)/index.tsx. Las opciones controlan el título, color e ícono.'
            },
            {
                title: '3. Iconos Vectoriales con @expo/vector-icons',
                desc: 'tabBarIcon: ({ color }) => <Ionicons name="home" color={color} />',
                detail: 'Proporciona miles de iconos vectoriales optimizados (Ionicons, FontAwesome, MaterialIcons) que se adaptan dinámicamente al color activo de la pestaña.'
            },
            {
                title: '4. Enrutamiento declarativo con Link y useRouter',
                desc: 'const router = useRouter(); router.push("/detalle");',
                detail: 'Permite transiciones entre pantallas mediante push, replace o enlaces declarativos <Link href="/perfil">.'
            }
        ],
        webVsNative: 'En la Web el historial de navegación cambia la URL del navegador. En móviles, la navegación administra una pila (Stack) o pestañas (Tabs) con transiciones nativas de deslizamiento a 60 FPS.',
        tip: 'Usa el archivo _layout.tsx en cada carpeta para envolver tus pantallas con temas, barras de navegación o contextos compartidos.'
    },
    form: {
        badge: 'Validación Tipada de Esquemas',
        concept: 'Los formularios móviles requieren validación rigurosa de datos en tiempo real antes de enviar información a la API o base de datos. Zod define esquemas de validación tipados y seguros.',
        sections: [
            {
                title: '1. Esquema con Zod',
                desc: 'const userSchema = z.object({ email: z.string().email(), password: z.string().min(6) });',
                detail: 'Define la estructura esperada y las reglas de validación declarativas con mensajes de error personalizados.'
            },
            {
                title: '2. Validación segura con safeParse()',
                desc: 'const result = userSchema.safeParse({ email, password });',
                detail: 'Analiza los datos sin lanzar excepciones runtime. Devuelve { success: true, data } si es válido, o { success: false, error } con el detalle de los campos fallidos.'
            },
            {
                title: '3. TextInput Móvil Controlado',
                desc: '<TextInput value={email} onChangeText={setEmail} keyboardType="email-address" />',
                detail: 'onChangeText recibe directamente el texto tipeado (a diferencia de e.target.value en web). secureTextEntry oculta la contraseña con asteriscos.'
            },
            {
                title: '4. Manejo de Errores y Feedback',
                desc: '{error && <Text style={styles.errorText}>⚠️ {error}</Text>}',
                detail: 'Muestra mensajes de error contextuales con estilos de alerta visual antes de proceder a la acción de submit.'
            }
        ],
        webVsNative: 'En Web usas <form onSubmit={...}> con FormData. En React Native no hay etiqueta <form>; los formularios son combinaciones de estados de TextInput gestionados con hooks o librerías como React Hook Form.',
        tip: 'Utiliza KeyboardAvoidingView para evitar que el teclado virtual del smartphone tape los inputs al escribir.'
    },
    firebase: {
        badge: 'Base de Datos en Tiempo Real',
        concept: 'Cloud Firestore permite crear aplicaciones colaborativas en tiempo real. Mediante listeners WebSocket (onSnapshot), cualquier cambio en la nube se replica instantáneamente en el smartphone.',
        sections: [
            {
                title: '1. Conexión y Referencia a Colecciones',
                desc: 'import { collection, onSnapshot, addDoc } from "firebase/firestore";',
                detail: 'collection(db, "tareas") obtiene una referencia a la colección NoSQL en Firestore.'
            },
            {
                title: '2. Escucha Reactiva con onSnapshot()',
                desc: 'onSnapshot(collection(db, "tareas"), (snapshot) => { ... });',
                detail: 'Abre un canal en tiempo real. Cada vez que se crea, edita o borra un documento en el servidor, Firestore dispara el callback con los documentos actualizados.'
            },
            {
                title: '3. Escritura Asíncrona con addDoc()',
                desc: 'await addDoc(collection(db, "tareas"), { titulo, done: false });',
                detail: 'Inserta un nuevo documento con ID autogenerado único a nivel global por Firebase.'
            },
            {
                title: '4. Limpieza del Listener en useEffect',
                desc: 'useEffect(() => { const unsub = onSnapshot(...); return () => unsub(); }, []);',
                detail: 'Es fundamental retornar la función unsubscribe para cerrar la conexión cuando el componente se desmonta y evitar fugas de memoria (memory leaks).'
            }
        ],
        webVsNative: 'Firebase SDK funciona tanto en web como en móviles nativos. En React Native, además puedes integrar persistencia offline con AsyncStorage para que la app funcione sin conexión a Internet.',
        tip: 'Configura siempre Security Rules en la consola de Firebase para asegurar que los usuarios solo puedan leer y escribir sus propios documentos.'
    },
    hardware: {
        badge: 'Acceso a Sensores y Periféricos',
        concept: 'React Native permite acceder a las APIs de hardware de iOS y Android mediante bibliotecas de Expo (Cámara, GPS, Acelerómetro, Biometría, Giroscopio).',
        sections: [
            {
                title: '1. Modelo de Permisos de Sistema Operativo',
                desc: 'Location.requestForegroundPermissionsAsync()',
                detail: 'Tanto Apple (iOS) como Google (Android) exigen solicitar permiso explícito al usuario en tiempo de ejecución antes de acceder a la cámara o geolocalización.'
            },
            {
                title: '2. Visor de Cámara con CameraView',
                desc: 'import { CameraView } from "expo-camera";',
                detail: 'Renderiza una superficie de video en vivo conectada al sensor óptico trasero o frontal del smartphone.'
            },
            {
                title: '3. Coordenadas GPS en Alta Precisión',
                desc: 'Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });',
                detail: 'Consulta el chip GNSS (GPS/Glonass/Galileo) y devuelve latitud, longitud, altitud y velocidad del dispositivo.'
            },
            {
                title: '4. Manejo de Estados de Hardware',
                desc: 'const [permission, requestPermission] = useCameraPermissions();',
                detail: 'Expo proporciona hooks dedicados para verificar si el usuario concedió, denegó o bloqueó permanentemente los permisos.'
            }
        ],
        webVsNative: 'En la Web el navegador puede bloquear el acceso si no hay HTTPS. En smartphones nativos, los permisos se declaran en AndroidManifest.xml e Info.plist y son gestionados por el kernel del sistema.',
        tip: 'Comprueba siempre el nivel de batería y la precisión deseada al usar GPS para evitar descargar rápidamente el dispositivo del usuario.'
    },
    animations: {
        badge: 'Animaciones a 60/120 FPS',
        concept: 'React Native Reanimated 3 ejecuta cálculos de física y transiciones directamente en el hilo de la interfaz de usuario (UI Thread / Render Thread) en C++, sin bloquear el hilo de JavaScript.',
        sections: [
            {
                title: '1. useSharedValue',
                desc: 'const scale = useSharedValue(1);',
                detail: 'Almacena un valor reactivo mutable que vive en el UI Thread nativo sin disparar re-renders de React.'
            },
            {
                title: '2. withSpring & withTiming',
                desc: 'scale.value = withSpring(1.2, { damping: 15 });',
                detail: 'Modifica el valor con simulación física de resorte (spring) o curvas bézier de tiempo, garantizando una respuesta orgánica y natural al tacto.'
            },
            {
                title: '3. useAnimatedStyle',
                desc: 'const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));',
                detail: 'Enlaza el valor compartido con las propiedades visuales del componente (transform, opacity, backgroundColor).'
            },
            {
                title: '4. Componentes <Animated.View>',
                desc: '<Animated.View style={[styles.box, animatedStyle]}>',
                detail: 'Variantes animables de los componentes nativos capaces de actualizar sus propiedades directamente en C++ sin intervención del JavaScript engine.'
            }
        ],
        webVsNative: 'En Web usas transiciones CSS o CSS Keyframes. En React Native, usar estilos CSS provocaría saltos de frames si el hilo JS está ocupado procesando datos o peticiones de red. Reanimated garantiza fluidez absoluta.',
        tip: 'Evita animar propiedades de layout como "width" o "height" ya que recalculan el motor Yoga; en su lugar anima "transform: [{ scale }]" y "opacity".'
    },
    api: {
        badge: 'Peticiones de Red Asíncronas',
        concept: 'Las aplicaciones móviles consumen servicios web REST y GraphQL a través del protocolo HTTPS estándar mediante fetch() o axios.',
        sections: [
            {
                title: '1. API fetch() Estándar',
                desc: 'fetch("https://api.ejemplo.com/usuarios").then(res => res.json())',
                detail: 'React Native implementa la especificación WHATWG Fetch nativa en el motor Hermes/JSI.'
            },
            {
                title: '2. Ciclo de Carga con useEffect',
                desc: 'useEffect(() => { loadData(); }, []);',
                detail: 'Ejecuta la petición de red cuando el componente móvil se monta en pantalla por primera vez.'
            },
            {
                title: '3. Indicador Nativo ActivityIndicator',
                desc: '<ActivityIndicator size="large" color="#0284c7" />',
                detail: 'Muestra el spinner de carga nativo del sistema operativo (UIActivityIndicatorView en iOS y ProgressBar en Android).'
            },
            {
                title: '4. Manejo de Estados: loading, error, data',
                desc: 'const [loading, setLoading] = useState(true);',
                detail: 'Una experiencia móvil profesional siempre contempla los 3 estados: cargando, error de red y datos listos para renderizar.'
            }
        ],
        webVsNative: 'En móviles, la conectividad cambia constantemente (WiFi a 4G/5G, modo avión, túneles). Es crítico manejar timeouts y reintentos (retry) para una UX robusta.',
        tip: 'Para caching inteligente, deduplicación de peticiones y sincronización en background en React Native, utiliza TanStack Query (React Query).'
    },
    eas: {
        badge: 'DevOps & Compilación en la Nube',
        concept: 'Expo Application Services (EAS) compila binarios de producción nativos (.apk/.aab para Android y .ipa para iOS) en granjas de servidores en la nube sin requerir una Mac física ni configurar Android Studio localmente.',
        sections: [
            {
                title: '1. Configuración con eas.json',
                desc: 'eas build -p android --profile preview',
                detail: 'Define los perfiles de compilación (development, preview con APK instalable, y production con AAB para Google Play).'
            },
            {
                title: '2. EAS Credentials & Firma Digital',
                desc: 'Keystore en Android y Certificados de Distribución en iOS',
                detail: 'EAS gestiona automáticamente los certificados criptográficos requeridos por las tiendas oficiales de aplicaciones.'
            },
            {
                title: '3. Generación de APK vs AAB',
                desc: 'APK: Instalación directa en smartphones de prueba. AAB: Bundle optimizado para Google Play Store.',
                detail: 'El archivo APK generado puede ser descargado y testeado directamente en cualquier teléfono físico Android.'
            },
            {
                title: '4. EAS Update (Over The Air / OTA)',
                desc: 'Actualizaciones inmediatas sin pasar por la revisión de las tiendas',
                detail: 'Permite corregir errores de código JavaScript al instante en los dispositivos de los usuarios sin necesidad de una nueva aprobación de Apple o Google.'
            }
        ],
        webVsNative: 'En Web despliegas archivos estáticos a Vercel o Netlify en segundos. En móviles, compilar código nativo en C++, Java y Swift requiere compiladores pesados (Gradle/Xcode) que EAS resuelve en la nube.',
        tip: 'Utiliza el perfil "preview" para generar un APK descargable por QR antes de enviar la versión definitiva a Google Play.'
    },
    ai: {
        badge: 'Copilotos de IA en Desarrollo Móvil',
        concept: 'La integración de modelos de lenguaje (LLMs) acelera la creación de interfaces, la corrección de errores de layout y la optimización de código en React Native.',
        sections: [
            {
                title: '1. Generación de Interfaces Nativas',
                desc: 'Transformar requisitos de negocio en componentes nativos JSX',
                detail: 'La IA asiste en definir rápidamente la jerarquía de Views, textos y paletas de colores optimizadas para pantallas táctiles.'
            },
            {
                title: '2. Resolución de Bugs de Layout',
                desc: 'Diagnóstico de desbordamientos de pantalla y problemas de Flexbox',
                detail: 'Identifica causas comunes como anchos fijos que se cortan en pantallas de distintos tamaños y sugiere soluciones con porcentajes o flex: 1.'
            },
            {
                title: '3. Refactorización para Rendimiento',
                desc: 'Optimización de listas FlatList, memoización y estilos',
                detail: 'Sugiere mover funciones inline fuera del render y consolidar estilos duplicados en StyleSheet.create().'
            },
            {
                title: '4. Internacionalización y Accesibilidad',
                desc: 'Generación de etiquetas A11y y soporte multiidioma',
                detail: 'Ayuda a incorporar accessibilityLabel y accessibilityHint para que personas con discapacidad visual puedan usar la app con TalkBack o VoiceOver.'
            }
        ],
        webVsNative: 'Al usar IA para React Native, asegúrate de indicarle explícitamente "React Native con TypeScript y Expo", para evitar que te genere código con etiquetas HTML como <div> o <button>.',
        tip: 'Prueba tus componentes generados directamente en el simulador interactivo de la derecha para verificar la interactividad en tiempo real.'
    }
};

const CodeExplanationSection = ({ preset }) => {
    const exp = PRESET_EXPLANATIONS[preset.id];
    if (!exp) return null;

    return (
        <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
                marginTop: '2rem',
                background: 'linear-gradient(180deg, #0b1120 0%, #060913 100%)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                color: '#f8fafc',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            }}
        >
            {/* Header del bloque explicativo */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.25rem' }}>
                <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.6rem' }}>
                        <Lightbulb size={14} /> Explicación Pedagógica del Código • {preset.unit}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fff', margin: '0 0 0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>{preset.icon}</span> {preset.title}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '850px' }}>
                        {exp.concept}
                    </p>
                </div>

                <div style={{ background: '#1e293b', padding: '8px 16px', borderRadius: '12px', border: '1px solid #334155', fontSize: '0.82rem', color: '#cbd5e1', fontWeight: '700', alignSelf: 'flex-start' }}>
                    🏷️ {exp.badge}
                </div>
            </div>

            {/* Grid con Desglose Sección por Sección */}
            <div>
                <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={16} color="#38bdf8" /> Desglose Técnico de la Lección
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {exp.sections.map((sec, idx) => (
                        <div
                            key={idx}
                            style={{
                                background: 'rgba(15, 23, 42, 0.65)',
                                border: '1px solid rgba(51, 65, 85, 0.7)',
                                borderRadius: '16px',
                                padding: '1.25rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.6rem'
                            }}
                        >
                            <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#38bdf8' }}>
                                {sec.title}
                            </div>
                            <div style={{
                                background: '#020617',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '8px',
                                padding: '8px 12px',
                                fontSize: '0.8rem',
                                fontFamily: 'monospace',
                                color: '#a5f3fc',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>
                                {sec.desc}
                            </div>
                            <p style={{
                                margin: 0,
                                fontSize: '0.85rem',
                                color: '#94a3b8',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-line'
                            }}>
                                {sec.detail}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comparativa Web vs Mobile & Tip Docente */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', paddingTop: '0.5rem' }}>
                <div style={{
                    background: 'rgba(168, 85, 247, 0.08)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '16px',
                    padding: '1.25rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <span>🌐 vs 📱</span> Diferencia Crítica: React Web vs React Native
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#e9d5ff', lineHeight: 1.6 }}>
                        {exp.webVsNative}
                    </p>
                </div>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '16px',
                    padding: '1.25rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '800', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <Sparkles size={16} /> Consejo Docente & Rendimiento Móvil
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#a7f3d0', lineHeight: 1.6 }}>
                        {exp.tip}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const ReactNativeSimulator = ({ initialPreset = 'flexbox' }) => {
    const [selectedPresetId, setSelectedPresetId] = useState(initialPreset);
    const [deviceType, setDeviceType] = useState('iphone'); // 'iphone' | 'android'
    const [copied, setCopied] = useState(false);
    const [logs, setLogs] = useState([]);
    const [currentTime, setCurrentTime] = useState('12:00');
    const [keyReload, setKeyReload] = useState(0);
    const [customCodes, setCustomCodes] = useState({});

    useEffect(() => {
        if (initialPreset) {
            setSelectedPresetId(initialPreset);
        }
    }, [initialPreset]);

    const activePreset = SIMULATOR_PRESETS.find(p => p.id === selectedPresetId) || SIMULATOR_PRESETS[0];

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };
        updateClock();
        const timer = setInterval(updateClock, 30000);
        return () => clearInterval(timer);
    }, []);

    const addLog = (msg) => {
        const time = new Date().toLocaleTimeString();
        setLogs(prev => [...prev.slice(-15), { id: Math.random(), time, msg }]);
    };

    const copyCode = () => {
        const currentCode = customCodes[selectedPresetId] ?? activePreset.code;
        navigator.clipboard.writeText(currentCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        addLog('Código copiado al portapapeles para Expo Snack.');
    };

    const reloadPhone = () => {
        setKeyReload(k => k + 1);
        addLog('[Metro Bundler] Fast Refresh recargado en 120ms.');
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, #090e1a 0%, #050810 100%)',
            border: '1px solid #1e293b',
            borderRadius: '24px',
            padding: '1.5rem',
            color: '#f8fafc',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}>
            {/* Header del Simulador */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #1e293b', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Smartphone size={22} color="#fff" />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900 }}>Simulador React Native & Expo</h3>
                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '999px', background: '#0284c7', color: '#fff', fontWeight: '800' }}>SDK 51+</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Interactúa con código nativo en vivo como en tu smartphone</p>
                    </div>
                </div>

                {/* Preset Selector Pill Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {SIMULATOR_PRESETS.map(preset => (
                        <button
                            key={preset.id}
                            onClick={() => {
                                setSelectedPresetId(preset.id);
                                addLog(`Cargando lección: ${preset.title}`);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                padding: '0.45rem 0.85rem',
                                borderRadius: '10px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                background: selectedPresetId === preset.id ? '#0284c7' : 'rgba(255,255,255,0.05)',
                                color: selectedPresetId === preset.id ? '#fff' : '#cbd5e1',
                                border: '1px solid',
                                borderColor: selectedPresetId === preset.id ? '#38bdf8' : 'transparent',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            {preset.icon}
                            <span>{preset.title.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Stage: Editor / Controls + Smartphone */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>

                {/* COLUMNA IZQUIERDA: Código Fuente & Explicación Didáctica */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>
                    {/* Header de la Lección */}
                    <div style={{ background: '#0f172a', padding: '1rem 1.25rem', borderRadius: '14px', border: '1px solid #1e293b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {activePreset.unit} • Tema del Programa
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lic. Ariel Bulacio (UNPilar)</span>
                        </div>
                        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{activePreset.title}</h4>
                        <p style={{ margin: '0.3rem 0 0', fontSize: '0.88rem', color: '#cbd5e1' }}>{activePreset.summary}</p>
                    </div>

                    {/* Editor de Código */}
                    <div style={{ background: '#070b14', borderRadius: '14px', border: '1px solid #1e293b', overflow: 'hidden' }}>
                        <div style={{ padding: '0.6rem 1rem', background: '#0b1120', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                                <Terminal size={14} color="#38bdf8" />
                                <span>App.tsx (TypeScript / JSX)</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {customCodes[selectedPresetId] !== undefined && (
                                    <button
                                        onClick={() => setCustomCodes(p => { const n = {...p}; delete n[selectedPresetId]; return n; })}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(239,68,68,0.1)', color: '#ef4444', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid rgba(239,68,68,0.2)' }}
                                    >
                                        <RotateCcw size={12} />
                                        <span>Resetear</span>
                                    </button>
                                )}
                                <button
                                    onClick={copyCode}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                                >
                                    {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                                    <span>{copied ? 'Copiado' : 'Copiar'}</span>
                                </button>
                                <a
                                    href="https://snack.expo.dev"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#0284c7', color: '#fff', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Abrir en Expo Snack</span>
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* Código Editable con scroll */}
                        <textarea
                            value={customCodes[selectedPresetId] ?? activePreset.code}
                            onChange={(e) => setCustomCodes(prev => ({ ...prev, [selectedPresetId]: e.target.value }))}
                            spellCheck={false}
                            style={{
                                width: '100%',
                                margin: 0,
                                padding: '1rem',
                                fontSize: '0.8rem',
                                fontFamily: 'Consolas, Monaco, "Fira Code", monospace',
                                color: '#e2e8f0',
                                lineHeight: 1.5,
                                height: '320px',
                                minHeight: '320px',
                                resize: 'vertical',
                                border: 'none',
                                outline: 'none',
                                background: '#070b14',
                                display: 'block'
                            }}
                        />
                    </div>

                    {/* Metro Terminal Logs */}
                    <div style={{ background: '#060a12', borderRadius: '14px', border: '1px solid #1e293b', padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: '#38bdf8', fontSize: '0.75rem', fontWeight: '800' }}>
                            <Terminal size={14} />
                            <span>CONSOLA METRO BUNDLER / LOGS</span>
                        </div>
                        <div style={{ height: '65px', overflowY: 'auto', fontSize: '0.75rem', fontFamily: 'monospace', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {logs.length === 0 ? (
                                <span style={{ color: '#475569' }}>Esperando interacciones en el teléfono...</span>
                            ) : (
                                logs.map(l => (
                                    <div key={l.id} style={{ display: 'flex', gap: '8px' }}>
                                        <span style={{ color: '#64748b' }}>[{l.time}]</span>
                                        <span style={{ color: '#cbd5e1' }}>{l.msg}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Smartphone Chassis Interactivo */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Device Selector Switches */}
                    <div style={{ display: 'flex', gap: '0.4rem', background: '#0f172a', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                        <button
                            onClick={() => setDeviceType('iphone')}
                            style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', background: deviceType === 'iphone' ? '#0284c7' : 'transparent', color: '#fff' }}
                        >
                            iPhone 15
                        </button>
                        <button
                            onClick={() => setDeviceType('android')}
                            style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', background: deviceType === 'android' ? '#0284c7' : 'transparent', color: '#fff' }}
                        >
                            Pixel Android
                        </button>
                        <button
                            onClick={reloadPhone}
                            title="Recargar App"
                            style={{ padding: '4px 8px', borderRadius: '6px', background: 'transparent', color: '#94a3b8', cursor: 'pointer' }}
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>

                    {/* Smartphone Bezel */}
                    <div style={{
                        width: '290px',
                        height: '560px',
                        background: '#000',
                        borderRadius: deviceType === 'iphone' ? '46px' : '36px',
                        padding: '12px',
                        boxShadow: '0 0 0 4px #2b3544, 0 20px 50px rgba(0,0,0,0.8), inset 0 0 10px rgba(255,255,255,0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    }}>
                        {/* Dynamic Island / Notch */}
                        <div style={{
                            position: 'absolute',
                            top: '18px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: deviceType === 'iphone' ? '85px' : '14px',
                            height: deviceType === 'iphone' ? '20px' : '14px',
                            background: '#000',
                            borderRadius: '20px',
                            zIndex: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 3px rgba(255,255,255,0.1)'
                        }}>
                            {deviceType === 'iphone' && (
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a0f1d', marginLeft: 'auto', marginRight: '8px' }} />
                            )}
                        </div>

                        {/* Mobile Screen Surface */}
                        <div style={{
                            flex: 1,
                            background: '#020617',
                            borderRadius: deviceType === 'iphone' ? '36px' : '26px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative',
                            border: '1px solid #1e293b'
                        }}>
                            {/* Mobile Status Bar */}
                            <div style={{
                                height: '32px',
                                padding: '0 16px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '11px',
                                fontWeight: '700',
                                color: '#fff',
                                zIndex: 20,
                                background: 'rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(5px)'
                            }}>
                                <span>{currentTime}</span>
                                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', fontSize: '10px' }}>
                                    <span>5G</span>
                                    <span>📶</span>
                                    <span>🔋 100%</span>
                                </div>
                            </div>

                            {/* Live App Container */}
                            <div key={keyReload} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', background: '#020617' }}>
                                {customCodes[selectedPresetId] !== undefined && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: '#38bdf8', color: '#000', fontSize: '9px', fontWeight: 'bold', textAlign: 'center', padding: '2px 0', zIndex: 100 }}>
                                        ⚡ LIVE CODE ACTIVADO
                                    </div>
                                )}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: customCodes[selectedPresetId] !== undefined ? '14px' : '0', overflow: 'hidden' }}>
                                    <LiveSimulatorRunner
                                        code={customCodes[selectedPresetId] ?? activePreset.code}
                                        log={addLog}
                                        resetKey={`${selectedPresetId}-${keyReload}`}
                                    />
                                </div>
                            </div>

                            {/* Home Indicator Bar */}
                            <div style={{ height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
                                <div style={{ width: '90px', height: '3px', background: '#fff', borderRadius: '999px', opacity: 0.6 }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                        Toca los elementos de la pantalla para interactuar
                    </div>
                </div>

            </div>

            {/* EXPLICACIÓN PEDAGÓGICA Y TÉCNICA DEL CÓDIGO */}
            <CodeExplanationSection preset={activePreset} />
        </div>
    );
};

export default ReactNativeSimulator;
