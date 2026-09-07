import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award, CheckCircle2, XCircle, HelpCircle, ArrowLeft, ArrowRight,
  RotateCcw, Filter, FileText, Check, AlertCircle, Clock,
  Smartphone, ChevronDown, ChevronUp, Send, Grid, Eye, Bookmark, Printer
} from 'lucide-react';
import { reactNativeExamQuestions } from '../data/reactNativeExamQuestions';
import { prepareQuiz } from '../utils/quizUtils';
import RegistrationModal from './RegistrationModal';

const ReactNativeExam = ({ onBack }) => {
  // Estado de la evaluación: 'intro' | 'testing' | 'finished'
  const [examState, setExamState] = useState('intro');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Respuestas del estudiante: Record<number (index), number (chosenOptionIndex)>
  const [userAnswers, setUserAnswers] = useState({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showGridDrawer, setShowGridDrawer] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'incorrect' | 'correct' | 'unanswered'
  const [showRegistration, setShowRegistration] = useState(false);
  const timerRef = useRef(null);

  // Iniciar examen con nuevo orden aleatorio de preguntas y opciones
  const startExam = () => {
    const prepared = prepareQuiz(reactNativeExamQuestions);
    setQuestions(prepared);
    setUserAnswers({});
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setExamState('testing');
    setShowConfirmModal(false);
    setShowGridDrawer(false);
    setReviewFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cronómetro del examen
  useEffect(() => {
    if (examState === 'testing') {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [examState]);

  // Formato de tiempo (HH:MM:SS o MM:SS)
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    if (mins >= 60) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return `${h}h ${m}m ${s < 10 ? '0' : ''}${s}s`;
    }
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Manejar selección de opción (permite cambiarla antes de finalizar)
  const handleSelectOption = (optionIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optionIndex
    }));
  };

  // Cantidad de preguntas respondidas
  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = questions.length - answeredCount;

  // Finalizar evaluación
  const handleFinishExam = () => {
    if (unansweredCount > 0) {
      setShowConfirmModal(true);
    } else {
      confirmFinish();
    }
  };

  const confirmFinish = () => {
    setShowConfirmModal(false);
    setExamState('finished');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cálculos de resultado final
  const evaluationResults = useMemo(() => {
    if (examState !== 'finished' || questions.length === 0) return null;

    let score = 0;
    const reviewList = questions.map((q, idx) => {
      const chosen = userAnswers[idx];
      const isCorrect = chosen !== undefined && chosen === q.a;
      if (isCorrect) score += 1;
      return {
        ...q,
        originalIndex: idx,
        chosen,
        isCorrect,
        isAnswered: chosen !== undefined
      };
    });

    const percentage = Math.round((score / questions.length) * 100);

    // Criterio de la Universidad Nacional de Pilar:
    // >= 70%: Promoción Directa
    // 40% a 69%: Regularidad (derecho a final integrador)
    // < 40%: No Aprobado / Recuperatorio
    let condition = 'reprobado';
    let conditionLabel = 'No Aprobado (Recuperatorio)';
    let conditionColor = '#ef4444';
    let conditionDesc = 'No alcanzaste el puntaje mínimo de regularidad (40%). Revisa las explicaciones de las preguntas incorrectas para el recuperatorio.';

    if (percentage >= 70) {
      condition = 'promocion';
      conditionLabel = '⭐ Promoción Directa';
      conditionColor = '#22c55e';
      conditionDesc = '¡Sobresaliente! Superaste el 70% requerido para la aprobación directa de los contenidos teóricos del curso.';
    } else if (percentage >= 40) {
      condition = 'regular';
      conditionLabel = '📋 Regularidad Aprobada';
      conditionColor = '#0284c7';
      conditionDesc = '¡Aprobado con condición Regular! Tienes los conocimientos básicos adquiridos y derecho al examen final integrador.';
    }

    // Desglose por Unidades
    const unitBreakdown = {};
    reviewList.forEach(item => {
      const unitKey = item.unit || 'General';
      if (!unitBreakdown[unitKey]) {
        unitBreakdown[unitKey] = { total: 0, correct: 0 };
      }
      unitBreakdown[unitKey].total += 1;
      if (item.isCorrect) unitBreakdown[unitKey].correct += 1;
    });

    return {
      score,
      total: questions.length,
      percentage,
      condition,
      conditionLabel,
      conditionColor,
      conditionDesc,
      reviewList,
      unitBreakdown
    };
  }, [examState, questions, userAnswers]);

  // Lista filtrada en el modo de revisión
  const filteredReviewList = useMemo(() => {
    if (!evaluationResults) return [];
    const list = evaluationResults.reviewList;
    if (reviewFilter === 'incorrect') return list.filter(q => !q.isCorrect);
    if (reviewFilter === 'correct') return list.filter(q => q.isCorrect);
    if (reviewFilter === 'unanswered') return list.filter(q => !q.isAnswered);
    return list;
  }, [evaluationResults, reviewFilter]);

  // =========================================================================
  // PANTALLA 1: INTRODUCCIÓN Y REGLAS DE LA EVALUACIÓN
  // =========================================================================
  if (examState === 'intro') {
    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 1rem 4rem' }}>
        {/* Cabecera / Volver */}
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              padding: '0.3rem 0',
              fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Volver al Programa del Curso
          </button>
        )}

        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: 'var(--card-shadow)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(2,132,199,0.2), rgba(56,189,248,0.3))',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary-color)'
            }}
          >
            <Award size={38} />
          </div>

          <span
            style={{
              display: 'inline-block',
              padding: '0.35rem 1rem',
              background: 'rgba(56,189,248,0.12)',
              color: 'var(--primary-color)',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1rem'
            }}
          >
            UNPilar • Evaluación Teórica Integral
          </span>

          <h1
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 900,
              color: 'var(--text-main)',
              margin: '0 0 1rem',
              letterSpacing: '-0.5px'
            }}
          >
            Evaluación Teórica: <span style={{ color: 'var(--primary-color)' }}>React Native & Expo</span>
          </h1>

          <p
            style={{
              color: 'var(--text-dim)',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              maxWidth: '720px',
              margin: '0 auto 2rem'
            }}
          >
            Examen oficial de <strong style={{ color: 'var(--text-main)' }}>100 preguntas de opción múltiple</strong> que recorre todos los conceptos teóricos, arquitecturas móviles, hooks nativos, buenas prácticas de desarrollo y despliegue del curso.
          </p>

          {/* Tarjetas informativas de reglas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              textAlign: 'left',
              marginBottom: '2.5rem'
            }}
          >
            <div
              style={{
                background: 'var(--card-inner-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-color)', fontWeight: 800, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                <RotateCcw size={18} /> Orden Aleatorio Total
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Tanto el orden de las 100 preguntas como la ubicación de las 4 opciones se barajan aleatoriamente en cada intento.
              </p>
            </div>

            <div
              style={{
                background: 'var(--card-inner-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#10b981', fontWeight: 800, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} /> Revisión & Justificación
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                Al finalizar obtendrás tu puntaje exacto y verás todas las preguntas correctas e incorrectas con su justificación pedagógica.
              </p>
            </div>

            <div
              style={{
                background: 'var(--card-inner-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f59e0b', fontWeight: 800, marginBottom: '0.4rem', fontSize: '0.95rem' }}>
                <Award size={18} /> Criterios Universitarios
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-dim)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--text-main)' }}>Promoción Directa:</strong> ≥ 70% (70+ correctas).<br />
                <strong style={{ color: 'var(--text-main)' }}>Regularidad:</strong> 40% - 69%.
              </p>
            </div>
          </div>

          {/* Temario cubierto en la evaluación */}
          <div
            style={{
              background: 'var(--card-inner-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '1.5rem',
              textAlign: 'left',
              marginBottom: '2.5rem'
            }}
          >
            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)' }}>
              📚 Contenidos Evaluados (100 Preguntas):
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              <div>• <strong>Unidad 1.1:</strong> Bridge vs New Arch (JSI, Fabric, TurboModules), Expo CLI.</div>
              <div>• <strong>Unidad 1.2:</strong> Componentes Core, Flexbox móvil, dp vs px, StyleSheet.</div>
              <div>• <strong>Unidad 1.2:</strong> useState, inmutabilidad, ciclo de render, batching.</div>
              <div>• <strong>Unidad 1.2:</strong> FlatList vs ScrollView, virtualización y keyExtractor.</div>
              <div>• <strong>Unidad 1.3:</strong> Expo Router, file-based routing, _layout, Stack & Tabs.</div>
              <div>• <strong>Unidad 2.1:</strong> Estado Global, Prop Drilling, Zustand y Git en equipo.</div>
              <div>• <strong>Unidad 2.2:</strong> Peticiones de red, useEffect, custom hooks y APIs.</div>
              <div>• <strong>Unidad 2.3:</strong> Formularios, Zod (parse vs safeParse) y KeyboardAvoidingView.</div>
              <div>• <strong>Unidad 2.4:</strong> Hardware, permisos runtime, cámara, GPS y SecureStore.</div>
              <div>• <strong>Unidad 3.1:</strong> Firebase Firestore NoSQL, tiempo real (onSnapshot), Auth.</div>
              <div>• <strong>Unidad 3.2:</strong> Performance, React.memo, FlashList, Reanimated 3 Worklets.</div>
              <div>• <strong>Unidad 3.3:</strong> DevOps con EAS, eas.json, APK vs AAB, updates OTA.</div>
            </div>
          </div>

          {/* Botón Comenzar Examen */}
          <button
            onClick={startExam}
            style={{
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              color: '#fff',
              border: 'none',
              padding: '1rem 3rem',
              borderRadius: '16px',
              fontWeight: 900,
              fontSize: '1.15rem',
              cursor: 'pointer',
              boxShadow: '0 12px 30px rgba(2,132,199,0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'transform 0.15s, box-shadow 0.15s'
            }}
          >
            <span>Comenzar Evaluación (100 Preguntas)</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // PANTALLA 2: EJECUCIÓN DEL EXAMEN (TESTING)
  // =========================================================================
  if (examState === 'testing') {
    const currentQ = questions[currentIndex];
    const currentSelectedOption = userAnswers[currentIndex];
    const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem 1rem 4rem' }}>
        {/* BARRA SUPERIOR FIJA / MONITOR */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '18px',
            padding: '1rem 1.5rem',
            boxShadow: 'var(--card-shadow)',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--primary-color)' }}>
                PREGUNTA {currentIndex + 1} DE {questions.length}
              </span>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', color: 'var(--text-dim)' }}>
                {progressPercent}%
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Respondidas: <strong style={{ color: 'var(--text-main)' }}>{answeredCount}</strong> de {questions.length}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.95rem',
                fontFamily: 'monospace',
                fontWeight: 800,
                color: 'var(--text-main)',
                background: 'var(--card-inner-bg)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}
            >
              <Clock size={16} color="var(--primary-color)" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            <button
              onClick={() => setShowGridDrawer(!showGridDrawer)}
              style={{
                background: showGridDrawer ? 'var(--primary-color)' : 'var(--card-inner-bg)',
                color: showGridDrawer ? '#0f172a' : 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Grid size={15} />
              <span>{showGridDrawer ? 'Ocultar Cuadrícula' : 'Ver 100 Preguntas'}</span>
            </button>
          </div>
        </div>

        {/* BARRA DE PROGRESO */}
        <div
          style={{
            height: '6px',
            background: 'var(--border-color)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginBottom: '1.5rem'
          }}
        >
          <motion.div
            animate={{ width: `${progressPercent}%` }}
            transition={{ ease: 'easeOut', duration: 0.3 }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }}
          />
        </div>

        {/* CUADRÍCULA DESPLEGABLE DE 100 PREGUNTAS (JUMP BAR) */}
        <AnimatePresence>
          {showGridDrawer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Navegación Rápida • Cuadrícula de 100 Preguntas
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  🟢 Respondida | ⚪ Pendiente | 🔵 Actual
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                  gap: '6px',
                  maxHeight: '220px',
                  overflowY: 'auto',
                  padding: '4px'
                }}
              >
                {questions.map((q, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowGridDrawer(false);
                      }}
                      style={{
                        height: '34px',
                        borderRadius: '6px',
                        border: isCurrent ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                        background: isCurrent
                          ? 'rgba(56,189,248,0.25)'
                          : isAnswered
                          ? 'rgba(16,185,129,0.2)'
                          : 'var(--card-inner-bg)',
                        color: isCurrent
                          ? 'var(--primary-color)'
                          : isAnswered
                          ? '#10b981'
                          : 'var(--text-dim)',
                        fontWeight: isCurrent || isAnswered ? '800' : '600',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.15s'
                      }}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TARJETA DE LA PREGUNTA ACTUAL */}
        {currentQ && (
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: 'var(--card-shadow)',
              marginBottom: '2rem'
            }}
          >
            {/* Tag de la Unidad */}
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--primary-color)',
                  background: 'rgba(56,189,248,0.12)',
                  border: '1px solid var(--border-color)',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {currentQ.unit}
              </span>
            </div>

            {/* Enunciado */}
            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.45rem)',
                fontWeight: 800,
                color: 'var(--text-main)',
                lineHeight: 1.5,
                margin: '0 0 1.75rem'
              }}
            >
              {currentQ.q}
            </h2>

            {/* 4 Opciones de Respuesta Aleatorias */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {currentQ.opts.map((optionText, optIdx) => {
                const isSelected = currentSelectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    style={{
                      textAlign: 'left',
                      padding: '1.15rem 1.25rem',
                      borderRadius: '16px',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                      background: isSelected ? 'rgba(56,189,248,0.12)' : 'var(--card-inner-bg)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.9rem',
                      transition: 'all 0.15s',
                      boxShadow: isSelected ? '0 4px 14px rgba(2,132,199,0.15)' : 'none'
                    }}
                  >
                    <span
                      style={{
                        minWidth: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: '1px solid',
                        borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
                        background: isSelected ? 'var(--primary-color)' : 'transparent',
                        color: isSelected ? '#0f172a' : 'var(--text-dim)',
                        fontWeight: 900,
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      {letter}
                    </span>
                    <span style={{ fontSize: '0.95rem', lineHeight: 1.5, flex: 1, fontWeight: isSelected ? 700 : 500 }}>
                      {optionText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTROLES INFERIORES: ANTERIOR / SIGUIENTE / ENTREGAR */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              color: currentIndex === 0 ? 'var(--text-muted)' : 'var(--text-main)',
              padding: '0.85rem 1.5rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              opacity: currentIndex === 0 ? 0.5 : 1
            }}
          >
            <ArrowLeft size={16} /> Anterior
          </button>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                style={{
                  background: 'var(--primary-color)',
                  color: '#0f172a',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 14px rgba(56,189,248,0.3)'
                }}
              >
                <span>Siguiente</span>
                <ArrowRight size={16} />
              </button>
            ) : null}

            <button
              onClick={handleFinishExam}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 1.75rem',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 6px 18px rgba(16,185,129,0.35)'
              }}
            >
              <Send size={16} />
              <span>Finalizar y Calificar</span>
            </button>
          </div>
        </div>

        {/* MODAL DE CONFIRMACIÓN SI HAY PREGUNTAS PENDIENTES */}
        <AnimatePresence>
          {showConfirmModal && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                zIndex: 9999
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  padding: '2rem',
                  maxWidth: '480px',
                  width: '100%',
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: 'rgba(245,158,11,0.15)',
                    color: '#f59e0b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}
                >
                  <AlertCircle size={32} />
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-main)' }}>
                  ¿Deseas finalizar la evaluación?
                </h3>

                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 1.75rem' }}>
                  Tienes <strong style={{ color: '#f59e0b' }}>{unansweredCount} preguntas sin responder</strong> de las {questions.length}.
                  Las preguntas vacías contarán como incorrectas (0 puntos).
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    style={{
                      background: 'var(--card-inner-bg)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Seguir respondiendo
                  </button>

                  <button
                    onClick={confirmFinish}
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#fff',
                      border: 'none',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Entregar de todos modos
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // =========================================================================
  // PANTALLA 3: RESULTADOS, PUNTUACIÓN Y REVISIÓN DE PREGUNTAS (FINISHED)
  // =========================================================================
  if (examState === 'finished' && evaluationResults) {
    const {
      score, total, percentage, condition, conditionLabel,
      conditionColor, conditionDesc, reviewList, unitBreakdown
    } = evaluationResults;

    const correctCount = reviewList.filter(q => q.isCorrect).length;
    const incorrectCount = reviewList.filter(q => !q.isCorrect && q.isAnswered).length;
    const blankCount = reviewList.filter(q => !q.isAnswered).length;

    return (
      <div style={{ maxWidth: '950px', margin: '0 auto', padding: '1rem 1rem 4rem' }}>
        {/* TARJETA PRINCIPAL DE RESULTADOS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            boxShadow: 'var(--card-shadow)',
            textAlign: 'center',
            marginBottom: '2.5rem',
            position: 'relative'
          }}
        >
          {/* Badge de Condición Universitaria */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1.25rem',
              background: `${conditionColor}18`,
              border: `1.5px solid ${conditionColor}`,
              color: conditionColor,
              borderRadius: '999px',
              fontWeight: 900,
              fontSize: '0.9rem',
              marginBottom: '1.25rem',
              letterSpacing: '0.5px'
            }}
          >
            {conditionLabel}
          </div>

          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, color: 'var(--text-main)', margin: '0 0 0.5rem', letterSpacing: '-1.5px', lineHeight: 1 }}>
            {score} <span style={{ fontSize: '1.8rem', color: 'var(--text-dim)', fontWeight: 700 }}>/ {total}</span>
          </h2>

          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: conditionColor, marginBottom: '1rem' }}>
            {percentage}% de Aciertos
          </div>

          <p style={{ color: 'var(--text-dim)', fontSize: '1rem', maxWidth: '650px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            {conditionDesc}
          </p>

          {/* Estadísticas Rápidas */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              maxWidth: '650px',
              margin: '0 auto 2rem'
            }}
          >
            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>Tiempo Total</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'monospace' }}>
                {formatTime(elapsedSeconds)}
              </div>
            </div>

            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid rgba(16,185,129,0.3)', padding: '0.85rem', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.8rem', color: '#10b981', marginBottom: '0.2rem' }}>Correctas</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#10b981' }}>{correctCount}</div>
            </div>

            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid rgba(239,68,68,0.3)', padding: '0.85rem', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '0.2rem' }}>Incorrectas</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#ef4444' }}>{incorrectCount}</div>
            </div>

            <div style={{ background: 'var(--card-inner-bg)', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: '14px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.2rem' }}>Sin Responder</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>{blankCount}</div>
            </div>
          </div>

          {/* Botones de Acción Post-Examen */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={startExam}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                color: '#fff',
                border: 'none',
                padding: '0.85rem 1.75rem',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 20px rgba(2,132,199,0.35)'
              }}
            >
              <RotateCcw size={16} /> Rendir Nuevamente (Nuevo Orden Aleatorio)
            </button>

            {percentage >= 40 && (
              <button
                onClick={() => setShowRegistration(true)}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 20px rgba(16,185,129,0.35)'
                }}
              >
                <Award size={16} /> Registrar Calificación Docente
              </button>
            )}

            <button
              onClick={() => window.print()}
              style={{
                background: 'var(--card-inner-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                padding: '0.85rem 1.25rem',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Printer size={16} /> Imprimir Comprobante
            </button>
          </div>
        </motion.div>

        {/* DESGLOSE POR UNIDAD TEMÁTICA */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '20px',
            padding: '1.75rem',
            boxShadow: 'var(--card-shadow)',
            marginBottom: '2.5rem'
          }}
        >
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 1.25rem' }}>
            📊 Rendimiento por Eje Temático del Curso
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {Object.entries(unitBreakdown).map(([unitName, stats]) => {
              const unitPct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={unitName}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{unitName}</span>
                    <span style={{ color: 'var(--text-dim)' }}>
                      <strong>{stats.correct}/{stats.total}</strong> ({unitPct}%)
                    </span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${unitPct}%`,
                        background: unitPct >= 70 ? '#22c55e' : unitPct >= 40 ? '#0284c7' : '#ef4444'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECCIÓN DE REVISIÓN PEDAGÓGICA (CORRECTAS E INCORRECTAS) */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>
                🔍 Revisión Detallada de Preguntas
              </h3>
              <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: 'var(--text-dim)' }}>
                Revisa cada una de las 100 preguntas con las respuestas correctas e incorrectas marcadas y su explicación.
              </p>
            </div>

            {/* Filtros */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: `Todas (${total})` },
                { id: 'incorrect', label: `❌ Incorrectas (${incorrectCount})` },
                { id: 'correct', label: `✅ Correctas (${correctCount})` },
                ...(blankCount > 0 ? [{ id: 'unanswered', label: `⚪ Sin Responder (${blankCount})` }] : [])
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setReviewFilter(f.id)}
                  style={{
                    background: reviewFilter === f.id ? 'var(--primary-color)' : 'var(--card-inner-bg)',
                    color: reviewFilter === f.id ? '#0f172a' : 'var(--text-main)',
                    border: '1px solid var(--border-color)',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '10px',
                    fontWeight: reviewFilter === f.id ? '800' : '600',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* LISTA DE PREGUNTAS EN MODO REVISIÓN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {filteredReviewList.map((q, listIndex) => {
              const isCorrect = q.isCorrect;
              const isAnswered = q.isAnswered;

              return (
                <div
                  key={q.id || listIndex}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid',
                    borderColor: isCorrect
                      ? 'rgba(34,197,94,0.35)'
                      : isAnswered
                      ? 'rgba(239,68,68,0.35)'
                      : 'var(--border-color)',
                    borderRadius: '20px',
                    padding: '1.75rem',
                    boxShadow: 'var(--card-shadow)'
                  }}
                >
                  {/* Encabezado del ítem */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 900,
                          color: isCorrect ? '#22c55e' : isAnswered ? '#ef4444' : '#f59e0b',
                          background: isCorrect ? 'rgba(34,197,94,0.12)' : isAnswered ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
                          padding: '3px 9px',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem'
                        }}
                      >
                        {isCorrect ? <CheckCircle2 size={13} /> : isAnswered ? <XCircle size={13} /> : <AlertCircle size={13} />}
                        {isCorrect ? 'Correcta (+1)' : isAnswered ? 'Incorrecta (0)' : 'Sin Responder'}
                      </span>

                      <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                        Pregunta #{q.originalIndex + 1}
                      </span>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {q.unit}
                    </span>
                  </div>

                  {/* Enunciado */}
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
                    {q.q}
                  </h4>

                  {/* 4 Opciones indicando qué eligió el alumno y cuál es la correcta */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                    {q.opts.map((optText, optIdx) => {
                      const isThisCorrect = optIdx === q.a;
                      const isUserChoice = q.chosen === optIdx;

                      let borderColor = 'var(--border-color)';
                      let bg = 'var(--card-inner-bg)';
                      let badge = null;

                      if (isThisCorrect) {
                        borderColor = '#22c55e';
                        bg = 'rgba(34,197,94,0.12)';
                        badge = (
                          <span style={{ color: '#22c55e', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <CheckCircle2 size={13} /> Opción Correcta
                          </span>
                        );
                      } else if (isUserChoice && !isThisCorrect) {
                        borderColor = '#ef4444';
                        bg = 'rgba(239,68,68,0.12)';
                        badge = (
                          <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            <XCircle size={13} /> Tu Respuesta (Incorrecta)
                          </span>
                        );
                      }

                      return (
                        <div
                          key={optIdx}
                          style={{
                            padding: '0.85rem 1.15rem',
                            borderRadius: '12px',
                            border: `1.5px solid ${borderColor}`,
                            background: bg,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontSize: '0.9rem',
                            color: 'var(--text-main)',
                            lineHeight: 1.45
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', flex: 1 }}>
                            <strong style={{ color: isThisCorrect ? '#22c55e' : isUserChoice ? '#ef4444' : 'var(--text-dim)' }}>
                              {String.fromCharCode(65 + optIdx)}.
                            </strong>
                            <span>{optText}</span>
                          </div>
                          {badge}
                        </div>
                      );
                    })}
                  </div>

                  {/* Justificación Pedagógica Profunda */}
                  <div
                    style={{
                      background: 'rgba(56,189,248,0.08)',
                      border: '1px solid rgba(56,189,248,0.25)',
                      borderRadius: '12px',
                      padding: '1rem 1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                      <HelpCircle size={15} /> Justificación Teórica y Pedagógica:
                    </div>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                      {q.exp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MODAL DE REGISTRO DOCENTE */}
        <RegistrationModal
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          score={score}
          total={total}
          materia="Creación de Aplicaciones Móviles con React Native & Expo"
          clase="Examen Teórico Integrador"
          unidad="100 Preguntas Múltiple Choice"
        />
      </div>
    );
  }

  return null;
};

export default ReactNativeExam;
