import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import MobileAccessGate from '../components/MobileAccessGate';
import ReactNativeExam from '../components/ReactNativeExam';
import {
    Smartphone, BookOpen, Layers, Code, Zap, Database, Camera,
    ShieldCheck, Sparkles, Navigation, List, ExternalLink, ArrowRight,
    GraduationCap, Calendar, Users, CheckCircle2, FileText, Download,
    FolderGit2, Rocket, Award, Cpu, ShieldAlert, BookMarked, Eye, X,
    Terminal, Copy, Check, Laptop
} from 'lucide-react';

const AplicacionesMoviles = ({ defaultTab }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(defaultTab || searchParams.get('tab') || 'unidades'); // 'unidades' | 'instalacion' | 'proyecto' | 'evaluacion' | 'examen' | 'bibliografia'
    const [activePdfViewer, setActivePdfViewer] = useState(null); // { title, driveId, chapter }
    const [copiedCmd, setCopiedCmd] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard?.writeText(text);
        setCopiedCmd(id);
        setTimeout(() => setCopiedCmd(null), 2000);
    };

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && ['unidades', 'instalacion', 'proyecto', 'evaluacion', 'examen', 'bibliografia'].includes(tab)) {
            setSelectedTab(tab);
        }
    }, [searchParams]);

        const DRIVE_FOLDER_UNIDAD_1 = 'https://drive.google.com/drive/folders/13Bo7ZCRQSjpeAQDKaxyDY9wir5veXrT6?usp=drive_link';
    const DRIVE_FOLDER_UNIDAD_2 = 'https://drive.google.com/drive/folders/1PzTCpnSOltKfVa83nIjYIAslABSDCQvV?usp=drive_link';
    const DRIVE_FOLDER_UNIDAD_3 = 'https://drive.google.com/drive/folders/1wGheJ22GDoULB-ZUbciS5-g2bQL32ty4?usp=drive_link';
    const DRIVE_FOLDER_URL = DRIVE_FOLDER_UNIDAD_1;

    const unidades = [
        {
            num: 'UNIDAD 1',
            title: 'Fundamentos de React Native y Expo',
            color: '#0284c7',
            desc: 'Configuración del entorno, arquitectura híbrida vs nativa, componentes básicos, listas optimizadas y navegación basada en archivos.',
            driveFolder: DRIVE_FOLDER_UNIDAD_1,
            clases: [
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 1 - Kickoff, Setup y JSX',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Fundamentos de React Native, Vistas Nativas y Expo Go',
                            driveId: '1bouOw36F31onGQuBQIkHaga7sgm-yQ3T',
                            size: '59 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 1 - Kickoff y Arquitectura',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 1',
                            driveId: '1IqZ2vZxUf-C6EQk2z_IFS0H1n1_dtx__',
                            size: '1.2 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Guía de Entorno: Configuración PC, Node y VS Code',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Presentación: Entorno de Desarrollo y Configuración',
                            driveId: '1BEO-WvkCmEEJ9O_MVyeuMiVZELpsryG6',
                            size: '850 KB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 0 - UX/UI y Expo',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales: Introducción a UX/UI y Expo Go',
                            driveId: '1_biMOkVlaF4dg_r0Gs4M0R5Oh9VrpGS5',
                            size: '1.4 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Learning React Native: Arquitectura, JSX y Estilos',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulos 1 y 2: "The Architecture of React Native" y "First App"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseñando Apps para Móviles: Anatomía y Ergonomía Táctil',
                            book: 'Javier Cuello & José Vittone',
                            chapter: 'Capítulo 1: Anatomía de aplicaciones móviles y plataformas nativas',
                            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
                            size: '44.7 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Documentación de Sistemas: Guía de Arquitectura y Entorno',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Presentación: Estándares de Arquitectura y Configuración del Entorno',
                            driveId: '119kxXKhBVoOgoqPNRo-qBhCBnC_L9VYp',
                            size: '58 KB',
                            type: 'presentacion'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 2 - Componentes Core y Estilos',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Vistas Nativas, Flexbox y ScrollView vs FlatList',
                            driveId: '1dNn8hVjAyjH6mOtzfbVChJEoTNoJr2Ki',
                            size: '45 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 2 - Layout y Listas',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 2',
                            driveId: '14y-HoTb8_AAQ8ROnlW0at3QivQF_9rlY',
                            size: '1.1 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Learning React Native: Componentes Core, Flexbox y Listas',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulos 3 y 4: "Components for Mobile" y "Styles & Layout"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseñando Apps para Móviles: Zonas del Pulgar y Espaciado Táctil',
                            book: 'Javier Cuello & José Vittone',
                            chapter: 'Capítulo 3: Patrones visuales, alcance del pulgar y botones de acción',
                            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
                            size: '44.7 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Usabilidad en Aplicaciones Móviles: Eficiencia Perceptiva en Listas',
                            book: 'Dialnet / Universidad de Zaragoza',
                            chapter: 'Capítulo 2: Densidad de información y jerarquía táctil en listas móviles',
                            driveId: '1X6w8pogsDCWZizgzUByosOowi0iXobJG',
                            size: '882 KB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 3 - Navegación con Expo Router',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Navegación Móvil vs Web, Stacks, Tabs y Rutas Dinámicas',
                            driveId: '1LNHsSg0Qq4ikyXvJHnMRwi6fHrVD0d-_',
                            size: '74 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 3 - Stacks, Tabs y Rutas',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 3',
                            driveId: '1gb9pp3MF0frUVjY-kyvoil4-kYj82LXq',
                            size: '1.3 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Guía de Documentación: De Requisitos a MVP',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Etapas 1, 2 y 3: Especificación de Requisitos y MVP',
                            driveId: '1c7WQNJuAF_gP9JHGJ93loktZKNrfszsZ',
                            size: '520 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseñando Apps para Móviles: Patrones de Navegación',
                            book: 'Javier Cuello & José Vittone',
                            chapter: 'Capítulo 4: Patrones de navegación (Tabs, Stacks, Drawer y Modales)',
                            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
                            size: '44.7 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseño de Interfaces: Navegación Consistente y Orientación',
                            book: 'Ian Sommerville',
                            chapter: 'Capítulo 16: Interacción de usuario, consistencia visual y navegación',
                            driveId: '1GMc7pTpFpvV60x1_TFKFdWZyb0fSWTq5',
                            size: '907 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Learning React Native: Navegación y Enlaces Profundos',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 5: "Navigation Patterns & Deep Linking in Native Apps"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        }
                    ]
                }
            ]
        },
        {
            num: 'UNIDAD 2',
            title: 'Funcionalidades e Integración de Datos',
            color: '#10b981',
            desc: 'Estado global, consumo de APIs REST, validación tipada con Zod, formularios móviles y acceso a sensores nativos del smartphone.',
            driveFolder: DRIVE_FOLDER_UNIDAD_2,
            clases: [
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 4 - Estado Global y Contexto',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Evolución del Estado, Prop Drilling y Context API',
                            driveId: '1vsb1Z-1J9rnJlbFMnqiGBI-AK1iOdudc',
                            size: '58 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 4 - Prop Drilling y Stores',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 4',
                            driveId: '1xSztWe-cKcP18enp5FQLUEr-5BH0joNm',
                            size: '1.2 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Documentación de Sistemas: Flujo Git, Ramas y Pull Requests',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Presentación y Guía: Git Flow, ramas colaborativas y Code Reviews',
                            driveId: '119kxXKhBVoOgoqPNRo-qBhCBnC_L9VYp',
                            size: '58 KB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Análisis y Diseño de Sistemas: Coordinación Ágil de Proyectos',
                            book: 'Kendall & Kendall (8va Ed.)',
                            chapter: 'Capítulo 3: Metodologías ágiles, trabajo colaborativo y control de versiones',
                            driveId: '1ZuYaZt0vOy8gsAyn4oj209qCmU5EfdBZ',
                            size: '7.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Learning React Native: Arquitectura de Estado Centralizado',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 6: "State Architecture, Store Separation & Persistence"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 5 - Datos Remotos y Firebase BaaS',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'El fin del mockData: Backend as a Service y Firestore',
                            driveId: '1zTPSIKTN-cdEVoNJqt_0018JiXajrjKj',
                            size: '55 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 5 - Firestore y Colecciones',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 5',
                            driveId: '1Zh-AdbzA7kLcOS06SEz07r-HjWSMaVqL',
                            size: '1.3 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Learning React Native: Peticiones de Red y APIs Asíncronas',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 7: "Working with the Network: REST APIs and Async Lifecycle"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Usabilidad en Aplicaciones Móviles: Latencia y Feedback Visual',
                            book: 'Dialnet / Universidad de Zaragoza',
                            chapter: 'Capítulo 3: Indicadores de carga, tolerancia a la espera y feedback de error',
                            driveId: '1X6w8pogsDCWZizgzUByosOowi0iXobJG',
                            size: '882 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Análisis y Diseño de Sistemas: Contratos de Datos y Servicios Web',
                            book: 'Kendall & Kendall (8va Ed.)',
                            chapter: 'Capítulo 12: Diseño de interfaces de entrada/salida y contratos de servicio',
                            driveId: '1ZuYaZt0vOy8gsAyn4oj209qCmU5EfdBZ',
                            size: '7.1 MB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 6 - Formularios, Validación y CRUD',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Desafíos de Formularios Móviles, Zod y Operaciones CRUD',
                            driveId: '1mJSYzX0lDvjJJc9K7HemcvgeQcmH0Kpc',
                            size: '58 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 6 - Teclados, Zod y CRUD',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 6',
                            driveId: '1Fx6BwJCiwC7MSRgIKlKh_Ecp22oRySHx',
                            size: '1.4 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Diseñando Apps para Móviles: Formularios Móviles y Teclados',
                            book: 'Javier Cuello & José Vittone',
                            chapter: 'Capítulo 5: Diseño de Formularios móviles: tipos de teclado y validación inmediata',
                            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
                            size: '44.7 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseño de Interfaces: Validación y Prevención de Errores',
                            book: 'Ian Sommerville',
                            chapter: 'Capítulo 16: Interfaz centrada en el usuario, mensajes de error y tolerancia a fallos',
                            driveId: '1GMc7pTpFpvV60x1_TFKFdWZyb0fSWTq5',
                            size: '907 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Learning React Native: Entradas de Usuario y Formularios Controlados',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 4: "User Input Components, Controlled Forms and Keyboard Handling"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 7 - Hardware, Sensores y Permisos',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Cámara, Sensores Inerciales, Ubicación y Permisos en Runtime',
                            driveId: '12XJAZ1ROGiTiE30nIFv8DAWM6ce40vc7',
                            size: '62 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 7 - Hardware y Notificaciones',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 7',
                            driveId: '1Z3bkvjk-Rh4s-zFftcTk1kC4K7gMhxN3',
                            size: '1.1 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Learning React Native: Sensores Nativos, Ubicación y Cámara',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 8: "Integrating Hardware Sensors, Geolocation & Camera Access"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Usabilidad en Aplicaciones Móviles: Permisos en Runtime y Confianza',
                            book: 'Dialnet / Universidad de Zaragoza',
                            chapter: 'Capítulo 4: Solicitud contextual de permisos, transparencia y privacidad',
                            driveId: '1X6w8pogsDCWZizgzUByosOowi0iXobJG',
                            size: '882 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseñando Apps para Móviles: Funciones Nativas del Smartphone',
                            book: 'Javier Cuello & José Vittone',
                            chapter: 'Capítulo 7: Hardware móvil: cámara, geolocalización y notificaciones del sistema',
                            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
                            size: '44.7 MB',
                            type: 'pdf'
                        }
                    ]
                }
            ]
        },
        {
            num: 'UNIDAD 3',
            title: 'Producción, Performance y Despliegue',
            color: '#8b5cf6',
            desc: 'Backend en tiempo real con Firebase, optimización con Reanimated a 60fps, pruebas unitarias y compilación de APKs en la nube con EAS.',
            driveFolder: DRIVE_FOLDER_UNIDAD_3,
            clases: [
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 8 - Autenticación y Rutas Protegidas',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Auth State Listener, Tokens y Rutas Protegidas',
                            driveId: '1kAjlDo1GGet0mQMgiASYzRm-1WWEktzS',
                            size: '61 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 8 - Login y Seguridad',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 8',
                            driveId: '1UMBsdb5f818Th3KzeQVMm8SGupvCTjAA',
                            size: '1.2 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Análisis y Diseño de Sistemas: Bases de Datos y Seguridad Cloud',
                            book: 'Kendall & Kendall (8va Ed.)',
                            chapter: 'Capítulo 13: Diseño de bases de datos documentales y reglas de seguridad de acceso',
                            driveId: '1ZuYaZt0vOy8gsAyn4oj209qCmU5EfdBZ',
                            size: '7.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Documentación de Sistemas: Especificación de Modelo Cloud y Auth',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Presentación: Esquema de Colecciones Firestore y Reglas de Seguridad',
                            driveId: '119kxXKhBVoOgoqPNRo-qBhCBnC_L9VYp',
                            size: '58 KB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Learning React Native: Backend Cloud y Datos en Tiempo Real',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 9: "Backend Integration, Real-time Data Sync & Secure Storage"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 9 - Performance y Testing',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Profiling, Optimización de Re-renders y Tests Unitarios',
                            driveId: '1Ke8CeGnE_DPVDdwopyK9zSexEoR07zvR',
                            size: '59 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 9 - Profiler y Optimización',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 9',
                            driveId: '1K5goU8FNYSnSqc_yzBRdWCW0N30_BbFw',
                            size: '1.3 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Learning React Native: Optimización a 60 FPS y Animaciones',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 10: "Performance Tuning: 60 FPS Animations, Memoization & Profiling"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Diseño de Interfaces: Pruebas de Calidad y Accesibilidad (A11y)',
                            book: 'Ian Sommerville',
                            chapter: 'Capítulo 16: Pruebas de usabilidad, evaluación heurística y diseño universal inclusivo',
                            driveId: '1GMc7pTpFpvV60x1_TFKFdWZyb0fSWTq5',
                            size: '907 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Usabilidad en Aplicaciones Móviles: Fluidez y Experiencia Subjetiva',
                            book: 'Dialnet / Universidad de Zaragoza',
                            chapter: 'Capítulo 5: Tasa de refresco, microanimaciones y retención cognitiva del usuario',
                            driveId: '1X6w8pogsDCWZizgzUByosOowi0iXobJG',
                            size: '882 KB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    materials: [
                        {
                            title: 'Apunte Oficial Cátedra: Clase 10 - Proyecto Final Integrador',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Arquitectura de Producción y Demo Final',
                            driveId: '16SReS3FsO0PYxhyNO6uMw8TGyEyXzwkb',
                            size: '68 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Presentación Cátedra: Clase 10 - Integración Final',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Diapositivas oficiales de la Clase 10',
                            driveId: '1elVMLpJR3UrTrdhsIPIHutfypdWfgdnp',
                            size: '1.5 MB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Apunte Oficial Cátedra: Clase 11 - IA en Mobile',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Modelos de Inteligencia Artificial y Visión',
                            driveId: '16ZOsnzybpMojppJs69JoIuvK5mWVuEZ0',
                            size: '54 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Apunte Oficial Cátedra: Clase 12 - Backends y APIs Avanzadas',
                            book: 'Lic. Ariel Bulacio (Cátedra UNPilar / UTN)',
                            chapter: 'Arquitectura de Servicios y Supabase',
                            driveId: '1XxIAS65GujSLcCgPi-EHHJVdJWxGzENC',
                            size: '72 KB',
                            type: 'pdf'
                        },
                        {
                            title: 'Learning React Native: Compilación Nativa y Distribución en Tiendas',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Capítulo 11: "Deployment: Compiling Binaries, Code Signing & App Stores"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Documentación de Sistemas: Checklist de Entrega y Demo Day',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Presentación: Pautas para la Presentación en Vivo, Rúbricas y Entregables',
                            driveId: '119kxXKhBVoOgoqPNRo-qBhCBnC_L9VYp',
                            size: '58 KB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Diseñando Apps para Móviles: Publicación y Lineamientos de Stores',
                            book: 'Javier Cuello & José Vittone',
                            chapter: 'Capítulo 8: Publicación en Google Play y App Store: capturas y lineamientos de aprobación',
                            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
                            size: '44.7 MB',
                            type: 'pdf'
                        }
                    ]
                },
                {
                    code: '3.4',
                    name: 'Capítulo Bonus: Desarrolladores "Augmented" e IA',
                    topics: [
                        'Google Project IDX & Antigravity en desarrollo mobile',
                        'Pair programming con LLMs (Gemini / Claude) para React Native',
                        'Generación de tipados TypeScript y boilerplate de Expo',
                        'Debugging asistido de errores nativos en la consola Metro',
                        'Refactoring y buenas prácticas asistidas por IA'
                    ],
                    preset: 'ai',
                    simulatorTag: 'Ver IA Assistant',
                    materials: [
                        {
                            title: 'Learning React Native: Herramientas Modernas y Depuración',
                            book: "Bonnie Eisenman (O'Reilly)",
                            chapter: 'Apéndice: "Developer Tools, Fast Debugging and Productivity Workflows"',
                            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
                            size: '15.1 MB',
                            type: 'pdf'
                        },
                        {
                            title: 'Documentación de Sistemas: Arquitectura Asistida y Buenas Prácticas',
                            book: 'Cátedra UNPilar / UTN',
                            chapter: 'Presentación: Flujos de Desarrollo Asistido por IA y Calidad de Código',
                            driveId: '119kxXKhBVoOgoqPNRo-qBhCBnC_L9VYp',
                            size: '58 KB',
                            type: 'presentacion'
                        },
                        {
                            title: 'Análisis y Diseño de Sistemas: Nuevas Fronteras Tecnológicas',
                            book: 'Kendall & Kendall (8va Ed.)',
                            chapter: 'Capítulo 1: El rol del analista y los entornos colaborativos aumentados',
                            driveId: '1ZuYaZt0vOy8gsAyn4oj209qCmU5EfdBZ',
                            size: '7.1 MB',
                            type: 'pdf'
                        }
                    ]
                }
            ]
        }
    ];

    const bibliografiaLibros = [
        {
            titulo: 'Learning React Native: Building Native Mobile Apps with JavaScript',
            autor: 'Bonnie Eisenman',
            editorial: "O'Reilly Media",
            año: '2017 (2da Ed.)',
            driveId: '1xZnzwSc201tBUfA2rRFOT4HVfXacLsMD',
            tamaño: '15.1 MB',
            rol: 'Lectura Base Oficial',
            tipo: 'Libro PDF',
            desc: 'Fundamentos de la arquitectura puente, componentes nativos (View, Text, FlatList), Flexbox nativo y ciclo de vida de aplicaciones móviles con JavaScript.'
        },
        {
            titulo: 'Diseñando Apps para Móviles',
            autor: 'Javier Cuello & José Vittone',
            editorial: 'Edición de autor',
            año: '2013 / Actualizado',
            driveId: '1zfYEA8SW6_Noy34hcsbFyFTOqLpD7_-f',
            tamaño: '44.7 MB',
            rol: 'Lectura UX/UI Oficial',
            tipo: 'Libro PDF',
            desc: 'Guía esencial en español sobre ergonomía de interfaces táctiles, zonas de alcance del pulgar, formularios móviles y patrones de navegación.'
        },
        {
            titulo: 'Diseño de Interfaces (Capítulo 16 - Ingeniería del Software)',
            autor: 'Ian Sommerville',
            editorial: 'Pearson Educación',
            año: '2011 (9na Ed.)',
            driveId: '1GMc7pTpFpvV60x1_TFKFdWZyb0fSWTq5',
            tamaño: '907 KB',
            rol: 'Diseño & Usabilidad',
            tipo: 'Capítulo PDF',
            desc: 'Principios universales de diseño de interacción, retroalimentación del sistema, consistencia de interfaz y prevención de errores.'
        },
        {
            titulo: 'Usabilidad en Aplicaciones Móviles',
            autor: 'Dialnet / Universidad de Zaragoza',
            editorial: 'Investigación Académica',
            año: '2016',
            driveId: '1X6w8pogsDCWZizgzUByosOowi0iXobJG',
            tamaño: '882 KB',
            rol: 'Investigación Aplicada',
            tipo: 'Paper PDF',
            desc: 'Heurísticas de usabilidad para smartphones, gestión de permisos en tiempo de ejecución, respuesta ante latencia de red y rendimiento perceptivo.'
        },
        {
            titulo: 'Análisis y Diseño de Sistemas',
            autor: 'Kenneth E. Kendall & Julie E. Kendall',
            editorial: 'Pearson Educación',
            año: '2011 (8va Ed.)',
            driveId: '1ZuYaZt0vOy8gsAyn4oj209qCmU5EfdBZ',
            tamaño: '7.1 MB',
            rol: 'Ingeniería de Requisitos',
            tipo: 'Libro PDF',
            desc: 'Modelado de requisitos, metodologías ágiles, diseño de bases de datos documentales, APIs y especificación funcional de sistemas.'
        },
        {
            titulo: 'Documentación de Sistemas: Guía de Cátedra & Presentaciones',
            autor: 'Cátedra UNPilar / UTN',
            editorial: 'Material Docente Universitario',
            año: '2025 / 2026',
            driveId: '119kxXKhBVoOgoqPNRo-qBhCBnC_L9VYp',
            tamaño: '58 KB',
            rol: 'Guía de Cátedra',
            tipo: 'Presentación / Guía',
            desc: 'Flujo de trabajo en Git/GitHub, directrices de entrega del proyecto integrador, rúbricas del Demo Day y pautas de arquitectura móvil.'
        }
    ];

    return (
        <MobileAccessGate>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem 4rem' }}>

            {/* HERO DEL CURSO */}
            <header style={{ textAlign: 'center', padding: '3.5rem 0 2.5rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.45rem 1.25rem', background: 'rgba(56,189,248,0.12)', border: '1px solid var(--border-color)', borderRadius: '999px', color: 'var(--primary-color)', fontWeight: 800, fontSize: '0.78rem', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <GraduationCap size={16} /> Universidad Nacional de Pilar • Ciclo 2026
                </motion.div>

                <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 1rem', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
                    Creación de Aplicaciones Móviles con <span style={{ background: 'linear-gradient(135deg, #0284c7, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>React Native & Expo</span>
                </h1>

                <p style={{ fontSize: '1.15rem', color: 'var(--text-dim)', maxWidth: '820px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                    Tecnicatura Universitaria en Desarrollo de Software • <strong style={{ color: 'var(--text-main)' }}>64 hs presenciales/virtuales</strong> + <strong style={{ color: 'var(--text-main)' }}>24 hs de tutoría</strong>.
                    Dictado por el <strong style={{ color: 'var(--text-main)' }}>Lic. Ariel Bulacio</strong>.
                </p>

                {/* Métricas y Datos Clave */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        <Calendar size={16} color="var(--primary-color)" />
                        <span>4 horas semanales</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        <FolderGit2 size={16} color="#10b981" />
                        <span>Proyecto con Git y PRs</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                        <Smartphone size={16} color="#8b5cf6" />
                        <span>Expo SDK 51 + Expo Go</span>
                    </div>
                </div>

                {/* Acceso Rápido al Simulador y Evaluación */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                        to="/simulador-react-native"
                        style={{
                            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                            color: '#fff',
                            textDecoration: 'none',
                            padding: '0.85rem 1.75rem',
                            borderRadius: '14px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            boxShadow: '0 10px 25px rgba(2,132,199,0.35)'
                        }}
                    >
                        <Smartphone size={20} /> Abrir Simulador Móvil en Vivo
                    </Link>

                    <button
                        onClick={() => setSelectedTab('instalacion')}
                        style={{
                            background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.85rem 1.75rem',
                            borderRadius: '14px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            boxShadow: '0 10px 25px rgba(2,132,199,0.35)'
                        }}
                    >
                        <Terminal size={20} /> 🚀 Tutorial Setup PC & Expo
                    </button>

                    <button
                        onClick={() => setSelectedTab('examen')}
                        style={{
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#fff',
                            border: 'none',
                            padding: '0.85rem 1.75rem',
                            borderRadius: '14px',
                            fontWeight: 800,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            boxShadow: '0 10px 25px rgba(16,185,129,0.35)'
                        }}
                    >
                        <Award size={20} /> Rendir Examen Teórico (100 Q)
                    </button>

                    <a
                        href="https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            textDecoration: 'none',
                            padding: '0.85rem 1.5rem',
                            borderRadius: '14px',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Download size={18} /> Carpeta de Bibliografía en Drive
                    </a>
                </div>
            </header>

            {/* BARRA DE PESTAÑAS */}
            <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid var(--border-color)', marginBottom: '2.5rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                    { id: 'unidades', label: 'Programa de Unidades & Clases', icon: <BookOpen size={18} /> },
                    { id: 'instalacion', label: '🛠️ Setup PC & Expo', icon: <Terminal size={18} /> },
                    { id: 'proyecto', label: 'Proyecto Integrador Continuo', icon: <Rocket size={18} /> },
                    { id: 'evaluacion', label: 'Régimen de Evaluación', icon: <Award size={18} /> },
                    { id: 'examen', label: '📝 Examen Teórico (100 Q)', icon: <CheckCircle2 size={18} /> },
                    { id: 'bibliografia', label: 'Bibliografía Oficial', icon: <BookMarked size={18} /> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.9rem 1.4rem',
                            background: 'none',
                            border: 'none',
                            borderBottom: '3px solid',
                            borderColor: selectedTab === tab.id ? 'var(--primary-color)' : 'transparent',
                            color: selectedTab === tab.id ? 'var(--primary-color)' : 'var(--text-dim)',
                            fontWeight: selectedTab === tab.id ? '800' : '600',
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* TAB 1: UNIDADES Y CLASES */}
            {selectedTab === 'unidades' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {unidades.map(u => (
                        <section key={u.num} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2rem', boxShadow: 'var(--card-shadow)' }}>
                            {/* Cabecera de la Unidad */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '0.35rem 0.85rem', background: u.color, color: '#fff', borderRadius: '8px', fontWeight: 900, fontSize: '0.78rem', letterSpacing: '1px' }}>
                                        {u.num}
                                    </span>
                                    <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                                        {u.title}
                                    </h2>
                                </div>
                                <a
                                    href={u.driveFolder}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        padding: '0.45rem 0.9rem',
                                        background: 'var(--card-inner-bg)',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '10px',
                                        color: 'var(--primary-color)',
                                        fontSize: '0.82rem',
                                        fontWeight: '700',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <FolderGit2 size={15} />
                                    <span>Carpeta Drive Unidad</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '850px' }}>
                                {u.desc}
                            </p>

                            {/* Grilla de Clases */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                                {u.clases.map(c => (
                                    <div
                                        key={c.code}
                                        style={{
                                            background: 'var(--card-inner-bg)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '16px',
                                            padding: '1.5rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            gap: '1rem'
                                        }}
                                    >
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: u.color }}>CLASE {c.code}</span>
                                                <Link
                                                    to={`/simulador-react-native?preset=${c.preset}`}
                                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-color)', background: 'rgba(56,189,248,0.12)', border: '1px solid var(--border-color)', padding: '3px 8px', borderRadius: '6px', textDecoration: 'none' }}
                                                >
                                                    <Smartphone size={12} /> {c.simulatorTag}
                                                </Link>
                                            </div>

                                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 0.75rem', color: 'var(--text-main)' }}>
                                                {c.name}
                                            </h3>

                                            <ul style={{ margin: '0 0 1rem 0', paddingLeft: '1.2rem', color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                                {c.topics.map((t, idx) => (
                                                    <li key={idx} style={{ marginBottom: '4px' }}>{t}</li>
                                                ))}
                                            </ul>

                                            {/* Materiales y Presentaciones Google Drive */}
                                            {c.materials && c.materials.length > 0 && (
                                                <div style={{ marginTop: '0.75rem', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.85rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem', color: 'var(--primary-color)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                        <BookOpen size={13} />
                                                        <span>Lecturas y Presentaciones PDF:</span>
                                                    </div>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                                                        {c.materials.map((m, mIdx) => (
                                                            <div
                                                                key={mIdx}
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    gap: '0.3rem',
                                                                    padding: '0.5rem 0.65rem',
                                                                    background: 'var(--card-inner-bg)',
                                                                    border: '1px solid var(--border-color)',
                                                                    borderRadius: '8px'
                                                                }}
                                                            >
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
                                                                        <FileText size={13} color="var(--primary-color)" style={{ flexShrink: 0 }} />
                                                                        <span style={{ fontSize: '0.79rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: 1.3 }}>
                                                                            {m.title}
                                                                        </span>
                                                                    </div>
                                                                    <span style={{ fontSize: '0.68rem', fontWeight: '800', color: 'var(--text-muted)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', padding: '1px 5px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                                                        {m.size}
                                                                    </span>
                                                                </div>

                                                                <div style={{ fontSize: '0.73rem', color: 'var(--text-dim)', paddingLeft: '1.1rem', lineHeight: 1.3 }}>
                                                                    <strong style={{ color: 'var(--text-main)' }}>{m.book}</strong> — {m.chapter}
                                                                </div>

                                                                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.15rem', paddingLeft: '1.1rem', flexWrap: 'wrap' }}>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setActivePdfViewer({ title: m.title, driveId: m.driveId, chapter: m.chapter, book: m.book })}
                                                                        style={{
                                                                            display: 'inline-flex',
                                                                            alignItems: 'center',
                                                                            gap: '0.3rem',
                                                                            padding: '3px 8px',
                                                                            background: 'linear-gradient(135deg, rgba(2,132,199,0.22), rgba(56,189,248,0.12))',
                                                                            border: '1px solid var(--border-color)',
                                                                            borderRadius: '6px',
                                                                            color: 'var(--primary-color)',
                                                                            fontSize: '0.72rem',
                                                                            fontWeight: '700',
                                                                            cursor: 'pointer'
                                                                        }}
                                                                    >
                                                                        <Eye size={11} />
                                                                        <span>Ver en Visor</span>
                                                                    </button>
                                                                    <a
                                                                        href={`https://drive.google.com/file/d/${m.driveId}/view?usp=sharing`}
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        style={{
                                                                            display: 'inline-flex',
                                                                            alignItems: 'center',
                                                                            gap: '0.3rem',
                                                                            padding: '3px 8px',
                                                                            background: 'transparent',
                                                                            border: '1px solid var(--border-color)',
                                                                            borderRadius: '6px',
                                                                            color: 'var(--text-dim)',
                                                                            fontSize: '0.72rem',
                                                                            fontWeight: '600',
                                                                            textDecoration: 'none'
                                                                        }}
                                                                    >
                                                                        <ExternalLink size={11} />
                                                                        <span>Abrir Drive</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'flex-end' }}>
                                            <Link
                                                to={`/simulador-react-native?preset=${c.preset}`}
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: '700', color: u.color, textDecoration: 'none' }}
                                            >
                                                <span>Experimentar código</span>
                                                <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </motion.div>
            )}

            {/* TAB: TUTORIAL SETUP PC & EXPO */}
            {selectedTab === 'instalacion' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                    {/* Header Banner */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(2,132,199,0.18), rgba(14,165,233,0.06))', border: '1.5px solid rgba(56,189,248,0.3)', borderRadius: '24px', padding: '2.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div style={{ maxWidth: '780px' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '4px 12px', borderRadius: '8px', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                                <Terminal size={15} /> CÁTEDRA CREACIÓN DE APLICACIONES MÓVILES • UNPILAR / UTN
                            </div>
                            <h2 style={{ margin: '0 0 0.6rem', fontSize: '2rem', fontWeight: '900', color: 'var(--text-main)' }}>
                                Tutorial Inicial: Setup de PC & Comandos Expo
                            </h2>
                            <p style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
                                Guía oficial para preparar tu entorno de desarrollo en tu computadora personal, inicializar tu proyecto móvil con Expo SDK 51+ y ejecutar tu código en tiempo real en tu teléfono físico o emulador.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <Link
                                to="/simulador-react-native?preset=expo_setup"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'linear-gradient(135deg, #0284c7, #0ea5e9)',
                                    color: '#fff',
                                    padding: '0.85rem 1.4rem',
                                    borderRadius: '12px',
                                    fontWeight: '800',
                                    fontSize: '0.92rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 8px 20px rgba(2,132,199,0.35)'
                                }}
                            >
                                <Smartphone size={18} /> Probar Setup en Simulador
                            </Link>
                            <Link
                                to="/simulador-react-native?preset=ecommerce_cart"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'rgba(16,185,129,0.15)',
                                    border: '1px solid rgba(16,185,129,0.4)',
                                    color: '#10b981',
                                    padding: '0.85rem 1.4rem',
                                    borderRadius: '12px',
                                    fontWeight: '800',
                                    fontSize: '0.92rem',
                                    textDecoration: 'none'
                                }}
                            >
                                <span>🛒 Ver Proyecto Final Integrador</span>
                            </Link>
                        </div>
                    </div>

                    {/* Infografía Didáctica con IA */}
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', overflow: 'hidden' }}>
                        <div style={{ padding: '1.25rem 1.5rem', background: 'var(--card-inner-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <Sparkles size={18} color="var(--primary-color)" />
                                <span style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--text-main)' }}>
                                    Infografía Didáctica con IA: Flujo Completo de Setup en PC & Conexión Móvil
                                </span>
                            </div>
                            <span style={{ fontSize: '0.78rem', padding: '3px 10px', borderRadius: '6px', background: 'rgba(56,189,248,0.15)', color: 'var(--primary-color)', fontWeight: '800' }}>
                                Cátedra UNPilar / UTN
                            </span>
                        </div>
                        <div style={{ padding: '1.25rem', textAlign: 'center', background: '#020617' }}>
                            <img
                                src="/images/rn_expo_pc_setup_guide.jpg"
                                alt="Infografía Didáctica Setup Expo PC"
                                style={{ width: '100%', maxHeight: '560px', objectFit: 'contain', borderRadius: '14px' }}
                            />
                        </div>
                        <div style={{ padding: '1.25rem 1.5rem', fontSize: '0.88rem', color: 'var(--text-dim)', background: 'var(--card-inner-bg)', borderTop: '1px solid var(--border-color)', lineHeight: 1.6 }}>
                            📌 <strong>Explicación del Flujo Técnico:</strong> <strong>1) Herramientas de PC:</strong> Node.js provee el motor V8 para el empaquetador Metro y npm; VS Code actúa como IDE con tipado estricto; Git gestiona el repositorio de cátedra. <strong>2) create-expo-app:</strong> Descarga la plantilla oficial con enrutamiento de archivos (Tabs). <strong>3) Metro Bundler:</strong> Transpila en vivo y expone un servidor WebSocket en el puerto 8081. <strong>4) Expo Go:</strong> La app nativa en tu celular interpreta el bundle sin requerir compilación pesada en Android Studio ni Xcode.
                        </div>
                    </div>

                    {/* FASE 1: Herramientas Necesarias en la PC */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                            <Laptop size={24} color="var(--primary-color)" />
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                    1. Instalación de Herramientas Previas en tu Computadora (PC)
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                    Instala estos programas antes de comenzar la primera clase práctica del cuatrimestre.
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                            {/* Node.js */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>🟢 Node.js (LTS)</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(34,197,94,0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>v20+ Requerido</span>
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Motor de JavaScript para ejecutar Metro Bundler y el gestor de paquetes npm. En el instalador de Windows, asegúrate de marcar la casilla <strong>"Add to PATH"</strong>.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <code style={{ fontSize: '0.82rem', color: 'var(--primary-color)', fontFamily: 'monospace' }}>node -v && npm -v</code>
                                    <button
                                        onClick={() => handleCopy('node -v && npm -v', 'node-am')}
                                        style={{ background: 'none', border: 'none', color: copiedCmd === 'node-am' ? '#10b981' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem' }}
                                    >
                                        {copiedCmd === 'node-am' ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                </div>
                                <a
                                    href="https://nodejs.org/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Descargar Node.js LTS</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>

                            {/* Visual Studio Code */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>🔵 VS Code</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(56,189,248,0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>Editor Recomendado</span>
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Editor oficial de la cátedra con soporte para JSX/TSX. Recomendamos instalar las extensiones <strong>Expo Tools</strong>, <strong>Prettier</strong> y <strong>ESLint</strong>.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                                    Extensión clave: <code>expo.vscode-expo-tools</code>
                                </div>
                                <a
                                    href="https://code.visualstudio.com/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Descargar VS Code</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>

                            {/* Git CLI */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>🟠 Git CLI</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(249,115,22,0.15)', color: '#f97316', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>Control de Versiones</span>
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Necesario para clonar el repositorio de las clases, trabajar en equipo en ramas (branches) y presentar el proyecto integrador mediante Pull Requests.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <code style={{ fontSize: '0.82rem', color: 'var(--primary-color)', fontFamily: 'monospace' }}>git --version</code>
                                    <button
                                        onClick={() => handleCopy('git --version', 'git-am')}
                                        style={{ background: 'none', border: 'none', color: copiedCmd === 'git-am' ? '#10b981' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.72rem' }}
                                    >
                                        {copiedCmd === 'git-am' ? <Check size={14} /> : <Copy size={14} />}
                                    </button>
                                </div>
                                <a
                                    href="https://git-scm.com/downloads"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Descargar Git Windows</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>

                            {/* Expo Go en Celular */}
                            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>📱 App Expo Go</span>
                                    <span style={{ fontSize: '0.72rem', background: 'rgba(168,85,247,0.15)', color: '#a855f7', padding: '2px 8px', borderRadius: '6px', fontWeight: '800' }}>Android & iOS</span>
                                </div>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', margin: '0 0 1rem', lineHeight: 1.5, flex: 1 }}>
                                    Instálala en tu celular físico. Escanea el código QR de la terminal y tu aplicación correrá inmediatamente en tu dispositivo sin necesidad de cables ni emuladores pesados.
                                </p>
                                <div style={{ background: 'var(--card-inner-bg)', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1rem', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                                    Gratis en Google Play y App Store
                                </div>
                                <a
                                    href="https://expo.dev/go"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: 'rgba(56,189,248,0.1)', color: 'var(--primary-color)', border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700', textDecoration: 'none' }}
                                >
                                    <span>Obtener Expo Go</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* FASE 2: Comandos Iniciales para Comenzar el Proyecto */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                            <Terminal size={24} color="var(--primary-color)" />
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                    2. Comandos Iniciales de Terminal (Paso a Paso)
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                    Ejecuta estos comandos en tu PowerShell o en la terminal integrada de Visual Studio Code.
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                {
                                    step: '1',
                                    title: 'Crear el proyecto con plantilla oficial de Pestañas (Tabs)',
                                    desc: 'Genera un proyecto listo con Expo Router, TypeScript, esquemas de navegación y pestañas inferiores configuradas.',
                                    cmd: 'npx create-expo-app@latest mi-primera-app --template tabs',
                                    id: 'am-cmd-1'
                                },
                                {
                                    step: '2',
                                    title: 'Navegar a la carpeta creada',
                                    desc: 'Posiciona tu terminal en el directorio raíz del nuevo proyecto móvil.',
                                    cmd: 'cd mi-primera-app',
                                    id: 'am-cmd-2'
                                },
                                {
                                    step: '3',
                                    title: 'Instalar librerías complementarias del cuatrimestre',
                                    desc: 'Instala dependencias esenciales con compatibilidad de versión asegurada por Expo CLI.',
                                    cmd: 'npx expo install @react-navigation/native zustand zod lucide-react-native',
                                    id: 'am-cmd-3'
                                },
                                {
                                    step: '4',
                                    title: 'Iniciar el empaquetador Metro Bundler en tu PC',
                                    desc: 'Inicia el servidor local. Abre la cámara de tu smartphone o la app Expo Go para escanear el QR.',
                                    cmd: 'npx expo start',
                                    id: 'am-cmd-4'
                                },
                                {
                                    step: '5',
                                    title: 'Modo Túnel para Redes de Facultades o Universidades',
                                    desc: 'Si la red Wi-Fi universitaria tiene cortafuegos o aislamiento de clientes (AP Isolation) que impide la conexión IP directa, corre este comando para conectar a través del túnel cloud de Expo.',
                                    cmd: 'npx expo start --tunnel',
                                    id: 'am-cmd-5'
                                }
                            ].map(item => (
                                <div key={item.step} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem 1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                    <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'rgba(56,189,248,0.15)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.05rem', flexShrink: 0 }}>
                                        {item.step}
                                    </div>
                                    <div style={{ flex: 1, minWidth: '260px' }}>
                                        <div style={{ fontWeight: '800', fontSize: '1.02rem', color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                                            {item.title}
                                        </div>
                                        <p style={{ margin: '0 0 0.75rem', fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                            {item.desc}
                                        </p>
                                        <div style={{ background: '#050914', border: '1px solid #1e293b', borderRadius: '10px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                                            <code style={{ fontSize: '0.88rem', color: '#38bdf8', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                                {item.cmd}
                                            </code>
                                            <button
                                                onClick={() => handleCopy(item.cmd, item.id)}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.4rem',
                                                    background: copiedCmd === item.id ? '#10b981' : 'rgba(56,189,248,0.15)',
                                                    color: copiedCmd === item.id ? '#fff' : '#38bdf8',
                                                    border: 'none',
                                                    padding: '6px 12px',
                                                    borderRadius: '8px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '700',
                                                    cursor: 'pointer',
                                                    flexShrink: 0
                                                }}
                                            >
                                                {copiedCmd === item.id ? <Check size={14} /> : <Copy size={14} />}
                                                <span>{copiedCmd === item.id ? '¡Copiado!' : 'Copiar'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FASE 3: Atajos de Teclado en Metro Bundler */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                            <Zap size={24} color="var(--primary-color)" />
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                    3. Atajos de Teclado en la Terminal Metro (Hotkeys)
                                </h3>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                    Una vez que ejecutaste <code>npx expo start</code>, presiona estas teclas directamente en la terminal sin presionar Enter.
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                            {[
                                { key: 'a', title: 'Abrir en Android', desc: 'Conecta con un emulador abierto en Android Studio o con un smartphone conectado por cable USB con depuración ADB activada.' },
                                { key: 'i', title: 'Abrir en Simulador iOS', desc: 'Inicia el simulador de iPhone en Xcode (disponible en entornos macOS).' },
                                { key: 'w', title: 'Abrir en Navegador Web', desc: 'Abre la versión web de la app en Chrome / Edge para pruebas ultrarrápidas de diseño y layout.' },
                                { key: 'r', title: 'Recargar App (Reload)', desc: 'Fuerza una recarga total en caliente (Full Reload) sincronizada en todos los clientes conectados.' },
                                { key: 'm', title: 'Menú de Desarrollador', desc: 'Despliega el Developer Menu en tu teléfono físico (permite inspeccionar elementos, activar depuración remota y rendimiento).' },
                                { key: 'c', title: 'Limpiar Caché de Metro', desc: 'Purga la memoria caché del empaquetador en caso de inconsistencias o cambios en package.json.' },
                                { key: 's', title: 'Alternar Modo de Build', desc: 'Alterna entre el entorno de Expo Go y Development Build compilado.' }
                            ].map(hk => (
                                <div key={hk.key} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#0284c7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.15rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(2,132,199,0.35)' }}>
                                        {hk.key}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                                            {hk.title}
                                        </div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-dim)', lineHeight: 1.45 }}>
                                            {hk.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FASE 4: Solución de Problemas Comunes */}
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '1.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                            <ShieldAlert size={22} color="#f59e0b" />
                            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
                                Solución de Errores Frecuentes en el Setup de Windows
                            </h3>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem 1.25rem', background: 'var(--card-inner-bg)', borderLeft: '4px solid #ef4444', borderRadius: '10px' }}>
                                <strong style={{ color: '#ef4444', fontSize: '0.95rem' }}>❌ Error: "node no se reconoce como un comando interno o externo":</strong>
                                <p style={{ margin: '6px 0 0', color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                    Durante la instalación de Node.js en Windows no se tildó la opción "Add to PATH". Solución: Desinstala e instala nuevamente Node.js LTS, asegurándote de tildar la casilla de variables de entorno, y reinicia la ventana de la terminal.
                                </p>
                            </div>

                            <div style={{ padding: '1rem 1.25rem', background: 'var(--card-inner-bg)', borderLeft: '4px solid #f59e0b', borderRadius: '10px' }}>
                                <strong style={{ color: '#f59e0b', fontSize: '0.95rem' }}>⚠️ El celular no conecta al escanear el QR ("Could not connect to Metro"):</strong>
                                <p style={{ margin: '6px 0 0', color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                    Verifica que tu celular y tu PC estén en la misma red Wi-Fi (no en datos móviles 4G/5G). Si la red posee aislamiento de clientes (habitual en facultades o cafeterías), ejecuta: <code style={{ color: 'var(--primary-color)' }}>npx expo start --tunnel</code>.
                                </p>
                            </div>

                            <div style={{ padding: '1rem 1.25rem', background: 'var(--card-inner-bg)', borderLeft: '4px solid #38bdf8', borderRadius: '10px' }}>
                                <strong style={{ color: '#38bdf8', fontSize: '0.95rem' }}>💡 Error de Políticas en PowerShell ("scripts disabled on this system"):</strong>
                                <p style={{ margin: '6px 0 0', color: 'var(--text-dim)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                                    Abre PowerShell con clic derecho "Ejecutar como Administrador" y ejecuta: <code style={{ color: 'var(--primary-color)' }}>Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned</code>. Luego presiona "Y" (Sí).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FASE 5: Proyectos Finales Integradores */}
                    <div style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(5,150,105,0.04))', border: '1.5px solid rgba(16,185,129,0.35)', borderRadius: '20px', padding: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#10b981', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                                <Rocket size={15} /> PROYECTOS FINALES INTEGRADORES DE LA CÁTEDRA
                            </div>
                            <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)' }}>
                                Explora las Dos Versiones del Proyecto Final
                            </h3>
                            <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.9rem', maxWidth: '650px', lineHeight: 1.5 }}>
                                Al final de la lista de presets del simulador interactivo encontrarás las dos arquitecturas completas listas para estudiar: la versión completa con Carrito de Compras (gestión de stock y checkout) y la versión Vitrina sin carrito.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <Link
                                to="/simulador-react-native?preset=ecommerce_cart"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    background: 'linear-gradient(135deg, #059669, #10b981)',
                                    color: '#fff',
                                    padding: '0.8rem 1.4rem',
                                    borderRadius: '12px',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none',
                                    boxShadow: '0 6px 18px rgba(16,185,129,0.35)'
                                }}
                            >
                                <span>🛒 App con Carro</span>
                            </Link>
                            <Link
                                to="/simulador-react-native?preset=ecommerce_nocart"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    color: 'var(--text-main)',
                                    padding: '0.8rem 1.4rem',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '0.9rem',
                                    textDecoration: 'none'
                                }}
                            >
                                <span>📦 App sin Carro (Vitrina)</span>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB 2: PROYECTO INTEGRADOR */}
            {selectedTab === 'proyecto' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <Rocket size={28} color="var(--primary-color)" />
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                                Proyecto Integrador Continuo
                            </h2>
                        </div>

                        <p style={{ color: 'var(--text-dim)', lineHeight: 1.65, fontSize: '1rem', maxWidth: '800px', marginBottom: '2rem' }}>
                            Los alumnos desarrollarán una aplicación móvil completa en grupos de 2 a 3 integrantes a lo largo de todo el cuatrimestre, aplicando la metodología <strong style={{ color: 'var(--text-main)' }}>PBL (Project-Based Learning)</strong> con flujo real de trabajo en GitHub (ramas, Pull Requests y Code Reviews).
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-color)', background: 'rgba(56,189,248,0.12)', padding: '3px 8px', borderRadius: '6px' }}>FASE 1 • SEMANA 4</span>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0', color: 'var(--text-main)' }}>Estructura & Navegación</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    Repositorio en GitHub, arquitectura de carpetas, Expo Router con tabs y stack funcional, maquetado con Flexbox y datos mock en FlatList.
                                </p>
                            </div>

                            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981', background: 'rgba(16,185,129,0.12)', padding: '3px 8px', borderRadius: '6px' }}>FASE 2 • SEMANA 8</span>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0', color: 'var(--text-main)' }}>Estado & Formularios Zod</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    Integración de Zustand para estado global, formularios validados con Zod, manejo de teclado móvil y acceso a un sensor nativo (cámara o GPS).
                                </p>
                            </div>

                            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#8b5cf6', background: 'rgba(139,92,246,0.12)', padding: '3px 8px', borderRadius: '6px' }}>FASE 3 • SEMANA 14</span>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0.6rem 0', color: 'var(--text-main)' }}>Firebase & Demo Day</h3>
                                <p style={{ fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                                    Autenticación, persistencia en Firestore en tiempo real, microanimaciones con Reanimated, generación de APK con EAS y presentación en vivo.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB 3: RÉGIMEN DE EVALUACIÓN */}
            {selectedTab === 'evaluacion' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <Award size={28} color="var(--primary-color)" />
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, color: 'var(--text-main)' }}>
                                Criterios y Régimen de Aprobación
                            </h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)', margin: '0 0 0.5rem' }}>
                                    ⭐ Promoción Directa
                                </h3>
                                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                    <li>Asistencia mínima del <strong style={{ color: 'var(--text-main)' }}>75%</strong> a clases.</li>
                                    <li>Calificación mínima de <strong style={{ color: 'var(--text-main)' }}>7 (siete)</strong> puntos en el Parcial 1 (individual escrito).</li>
                                    <li>Calificación mínima de <strong style={{ color: 'var(--text-main)' }}>7 (siete)</strong> puntos en el Parcial 2 (Proyecto Integrador y Demo Day).</li>
                                    <li>Aprobación del 100% de las entregas de laboratorio y Pull Requests.</li>
                                </ul>
                            </div>

                            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981', margin: '0 0 0.5rem' }}>
                                    📋 Regularidad y Examen Final
                                </h3>
                                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                                    <li>Asistencia mínima del <strong style={{ color: 'var(--text-main)' }}>70%</strong>.</li>
                                    <li>Calificación entre <strong style={{ color: 'var(--text-main)' }}>4 (cuatro) y 6 (seis)</strong> puntos en instancias evaluativas.</li>
                                    <li>Derecho a rendir examen final integrador en las fechas ordinarias de la UNPilar.</li>
                                    <li>Instancia de recuperación para cada examen parcial.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Banner de Acceso a la Evaluación de 100 Preguntas */}
                        <div
                            style={{
                                marginTop: '2.5rem',
                                background: 'linear-gradient(135deg, rgba(2,132,199,0.15), rgba(56,189,248,0.06))',
                                border: '1.5px solid var(--border-color)',
                                borderRadius: '20px',
                                padding: '2rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1.5rem'
                            }}
                        >
                            <div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                                    <Sparkles size={14} /> Instancia Evaluativa Habilitada
                                </div>
                                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)' }}>
                                    Evaluación Teórica Integradora (100 Preguntas)
                                </h3>
                                <p style={{ margin: 0, color: 'var(--text-dim)', fontSize: '0.92rem', maxWidth: '620px', lineHeight: 1.5 }}>
                                    Rinde el examen oficial de 100 preguntas con orden aleatorio de preguntas y respuestas. Al terminar recibirás tu calificación, condición académica y la justificación pedagógica de cada ítem.
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedTab('examen')}
                                style={{
                                    background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                                    color: '#fff',
                                    border: 'none',
                                    padding: '0.9rem 1.8rem',
                                    borderRadius: '14px',
                                    fontWeight: 800,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    boxShadow: '0 8px 20px rgba(2,132,199,0.35)'
                                }}
                            >
                                <span>Rendir Evaluación Ahora</span>
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* TAB 4: EXAMEN TEÓRICO (100 PREGUNTAS) */}
            {selectedTab === 'examen' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <ReactNativeExam onBack={() => setSelectedTab('unidades')} />
                </motion.div>
            )}

            {/* TAB 5: BIBLIOGRAFÍA OFICIAL */}
            {selectedTab === 'bibliografia' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                                📁 Repositorio de Libros en Google Drive
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-dim)' }}>
                                Todos los libros de la cátedra digitalizados para libre consulta de los estudiantes.
                            </p>
                        </div>
                        <a
                            href="https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ"
                            target="_blank"
                            rel="noreferrer"
                            style={{ background: 'var(--primary-color)', color: '#0f172a', textDecoration: 'none', padding: '0.6rem 1.25rem', borderRadius: '10px', fontWeight: 800, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                        >
                            <ExternalLink size={16} /> Abrir Carpeta Google Drive
                        </a>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
                        {bibliografiaLibros.map((b, idx) => (
                            <div key={idx} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.72rem', fontWeight: '800', background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '4px' }}>
                                                {b.rol}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                                                {b.tipo}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', background: 'var(--card-inner-bg)', padding: '1px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                                            {b.tamaño}
                                        </span>
                                    </div>

                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.4rem', color: 'var(--text-main)' }}>
                                        {b.titulo}
                                    </h4>
                                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                        {b.autor} • {b.editorial} • {b.año}
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', margin: 0, lineHeight: 1.5 }}>
                                        {b.desc}
                                    </p>
                                </div>

                                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={() => setActivePdfViewer({ title: b.titulo, driveId: b.driveId, chapter: b.desc, book: b.autor })}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            background: 'linear-gradient(135deg, rgba(2,132,199,0.2), rgba(56,189,248,0.12))',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '8px',
                                            padding: '5px 10px',
                                            color: 'var(--primary-color)',
                                            fontWeight: '700',
                                            fontSize: '0.8rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Eye size={13} />
                                        <span>Leer en Visor</span>
                                    </button>

                                    <a
                                        href={`https://drive.google.com/file/d/${b.driveId}/view?usp=sharing`}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-dim)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                                    >
                                        <span>Abrir en Drive</span>
                                        <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* CALL TO ACTION INFERIOR */}
            <div style={{ marginTop: '3.5rem', textAlign: 'center', padding: '2.5rem', background: 'var(--card-bg)', color: 'var(--text-main)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
                <Smartphone size={36} color="var(--primary-color)" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
                    ¿Listo para poner a prueba el código?
                </h3>
                <p style={{ color: 'var(--text-dim)', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    Ingresa al simulador interactivo para probar Flexbox, estados, navegación Expo Router, validación Zod y conexión Firebase en tiempo real.
                </p>
                <Link
                    to="/simulador-react-native"
                    style={{
                        background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '0.85rem 2rem',
                        borderRadius: '12px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 10px 25px rgba(2,132,199,0.4)'
                    }}
                >
                    <Sparkles size={18} /> Lanzar Simulador Móvil
                </Link>
            </div>

            {/* MODAL VISOR INTERACTIVO GOOGLE DRIVE */}
            {activePdfViewer && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        backgroundColor: 'rgba(0, 0, 0, 0.85)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem'
                    }}
                    onClick={() => setActivePdfViewer(null)}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '1100px',
                            height: '92vh',
                            backgroundColor: 'var(--card-bg)',
                            border: '1.5px solid var(--border-color)',
                            borderRadius: '20px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.5rem',
                                background: 'var(--card-inner-bg)',
                                borderBottom: '1px solid var(--border-color)',
                                gap: '1rem',
                                flexWrap: 'wrap'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: '240px', flex: 1 }}>
                                <div style={{ padding: '0.5rem', background: 'rgba(2,132,199,0.15)', borderRadius: '10px', color: 'var(--primary-color)' }}>
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: 1.3 }}>
                                        {activePdfViewer.title}
                                    </h4>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                                        {activePdfViewer.book && <span>{activePdfViewer.book} • </span>}
                                        <span>{activePdfViewer.chapter}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <a
                                    href={`https://drive.google.com/file/d/${activePdfViewer.driveId}/view?usp=sharing`}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.4rem',
                                        padding: '0.5rem 1rem',
                                        background: 'var(--primary-color)',
                                        color: '#0f172a',
                                        borderRadius: '10px',
                                        fontWeight: '800',
                                        fontSize: '0.82rem',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <ExternalLink size={14} />
                                    <span>Abrir en Google Drive</span>
                                </a>
                                <button
                                    onClick={() => setActivePdfViewer(null)}
                                    style={{
                                        background: 'var(--card-bg)',
                                        border: '1px solid var(--border-color)',
                                        color: 'var(--text-dim)',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer'
                                    }}
                                    title="Cerrar Visor"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Modal Iframe */}
                        <div style={{ flex: 1, position: 'relative', background: '#0f172a' }}>
                            <iframe
                                src={`https://drive.google.com/file/d/${activePdfViewer.driveId}/preview`}
                                width="100%"
                                height="100%"
                                style={{ border: 'none', display: 'block' }}
                                title={activePdfViewer.title}
                                allow="autoplay"
                            />
                        </div>

                        {/* Modal Footer */}
                        <div
                            style={{
                                padding: '0.65rem 1.5rem',
                                background: 'var(--card-inner-bg)',
                                borderTop: '1px solid var(--border-color)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)'
                            }}
                        >
                            <span>💡 Material digitalizado oficial de la cátedra disponible en Google Drive.</span>
                            <a
                                href="https://drive.google.com/drive/folders/1hncg2yaLaeh2pYkR6XtptH_cumJroPPQ"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '700' }}
                            >
                                Ver carpeta completa del curso &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </MobileAccessGate>
    );
};

export default AplicacionesMoviles;
