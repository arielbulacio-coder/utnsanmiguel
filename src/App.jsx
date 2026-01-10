
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OhmLawPage from './pages/OhmLawPage';
import ResistorPage from './pages/ResistorPage';
import KirchhoffPage from './pages/KirchhoffPage';
import SeriesParallelPage from './pages/SeriesParallelPage';
import TheveninPage from './pages/TheveninPage';
import NortonPage from './pages/NortonPage';
import UnitConversionPage from './pages/UnitConversionPage';
import PythagorasPage from './pages/PythagorasPage';
import TrigonometryPage from './pages/TrigonometryPage';
import PowerPage from './pages/PowerPage';
import KinematicsPage from './pages/KinematicsPage';
import MicrometerPage from './pages/MicrometerPage';
import CaliperPage from './pages/CaliperPage';
import CarpentryRulePage from './pages/CarpentryRulePage';
import PPEPage from './pages/PPEPage';
import CarpentryToolsPage from './pages/CarpentryToolsPage';
import MetalMecanicaPage from './pages/MetalMecanicaPage';
import ElectricalToolsPage from './pages/ElectricalToolsPage';
import ElectronicsToolsPage from './pages/ElectronicsToolsPage';
import OscilloscopePage from './pages/OscilloscopePage';
import MultimeterPage from './pages/MultimeterPage';

// Arduino y Programación
import ArduinoIntroPage from './pages/ArduinoIntroPage';
import CppBasicsPage from './pages/CppBasicsPage';
import PWMPage from './pages/PWMPage';
import SensorsPage from './pages/SensorsPage';
import SerialPage from './pages/SerialPage';
import ScratchPage from './pages/ScratchPage';

// Gestión Académica
import AcademicOverviewPage from './pages/AcademicOverviewPage';
import StudentsPage from './pages/StudentsPage';
import GradesPage from './pages/GradesPage';
import AttendancePage from './pages/AttendancePage';
import UsersPage from './pages/UsersPage';
import LMSPage from './pages/LMSPage';
import TeacherAssignmentPage from './pages/TeacherAssignmentPage';
import TeacherRegistrationPage from './pages/TeacherRegistrationPage';
import CommunicationsPage from './pages/CommunicationsPage';
import LessonPlanPage from './pages/LessonPlanPage';
import ProfilePage from './pages/ProfilePage';
import CourseSubjectManagerPage from './pages/CourseSubjectManagerPage';
import CurriculumPage from './pages/CurriculumPage';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={{ width: '100%' }}>
          <NavBar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/" element={<Home />} />
            {/* Arduino y Programación */}
            {/* Rutas Protegidas - Simuladores y Módulos Didácticos */}
            <Route element={<ProtectedRoute />}>
              <Route path="/ley-ohm" element={<OhmLawPage />} />
              <Route path="/codigos-resistencias" element={<ResistorPage />} />
              <Route path="/kirchhoff" element={<KirchhoffPage />} />
              <Route path="/resistencias-serie-paralelo" element={<SeriesParallelPage />} />
              <Route path="/teorema-thevenin" element={<TheveninPage />} />
              <Route path="/teorema-norton" element={<NortonPage />} />
              <Route path="/conversion-unidades" element={<UnitConversionPage />} />
              <Route path="/pitagoras" element={<PythagorasPage />} />
              <Route path="/trigonometria" element={<TrigonometryPage />} />
              <Route path="/potencia" element={<PowerPage />} />
              <Route path="/cinematica" element={<KinematicsPage />} />
              <Route path="/micrometro" element={<MicrometerPage />} />
              <Route path="/calibre" element={<CaliperPage />} />
              <Route path="/metro-carpintero" element={<CarpentryRulePage />} />
              <Route path="/seguridad-epp" element={<PPEPage />} />
              <Route path="/herramientas-carpinteria" element={<CarpentryToolsPage />} />
              <Route path="/metal-mecanica" element={<MetalMecanicaPage />} />
              <Route path="/herramientas-electricidad" element={<ElectricalToolsPage />} />
              <Route path="/herramientas-electronica" element={<ElectronicsToolsPage />} />
              <Route path="/osciloscopio" element={<OscilloscopePage />} />
              <Route path="/multimetro" element={<MultimeterPage />} />

              <Route path="/arduino-intro" element={<ArduinoIntroPage />} />
              <Route path="/cpp-basico" element={<CppBasicsPage />} />
              <Route path="/pwm" element={<PWMPage />} />
              <Route path="/sensores" element={<SensorsPage />} />
              <Route path="/comunicacion-serial" element={<SerialPage />} />
              <Route path="/scratch" element={<ScratchPage />} />

              {/* Gestión Académica */}
              <Route path="/gestion-academica" element={<AcademicOverviewPage />} />
              <Route path="/calificaciones" element={<GradesPage />} />
              <Route path="/asistencia" element={<AttendancePage />} />
              <Route path="/aula-virtual" element={<LMSPage />} />
            </Route>

            {/* Gestión Académica - Solo Administrativos */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'director', 'secretario', 'jefe_preceptores']} />}>
              <Route path="/estudiantes" element={<StudentsPage />} />
            </Route>

            {/* Asignación Docente - Solo Director/Secretario/Admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'director', 'secretario']} />}>
              <Route path="/asignacion-docente" element={<TeacherAssignmentPage />} />
              <Route path="/alta-docente" element={<TeacherRegistrationPage />} />
              <Route path="/oferta-academica" element={<CourseSubjectManagerPage />} />
              <Route path="/plan-estudios" element={<CurriculumPage />} />
            </Route>

            {/* Comunicaciones - Todos */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'director', 'secretario', 'jefe_preceptores', 'preceptor', 'profesor', 'alumno', 'padre']} />}>
              <Route path="/comunicados" element={<CommunicationsPage />} />
            </Route>

            {/* Libro de Temas - Solo personal académico */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'director', 'secretario', 'jefe_preceptores', 'preceptor', 'profesor']} />}>
              <Route path="/libro-temas" element={<LessonPlanPage />} />
            </Route>

            {/* Gestión Académica - Solo Admin */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/usuarios" element={<UsersPage />} />
            </Route>

            {/* Perfil - Todos */}
            <Route element={<ProtectedRoute />}>
              <Route path="/perfil" element={<ProfilePage />} />
            </Route>
          </Routes>

          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
