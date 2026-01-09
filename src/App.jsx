
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

// Gestión Académica
import AcademicOverviewPage from './pages/AcademicOverviewPage';
import StudentsPage from './pages/StudentsPage';
import GradesPage from './pages/GradesPage';
import UsersPage from './pages/UsersPage';

// ... (other imports)

// ...

{/* Gestión Académica - Rutas Protegidas */ }
<Route element={<ProtectedRoute />}>
  <Route path="/gestion-academica" element={<AcademicOverviewPage />} />
  <Route path="/estudiantes" element={<StudentsPage />} />
  <Route path="/calificaciones" element={<GradesPage />} />
  <Route path="/asistencia" element={<AttendancePage />} />
  <Route path="/usuarios" element={<UsersPage />} />
</Route>
          </Routes >

  <Footer />
        </div >
      </AuthProvider >
    </ThemeProvider >
  );
}

export default App;
