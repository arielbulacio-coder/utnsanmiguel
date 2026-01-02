import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import { ThemeProvider } from './components/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/utnsanmiguel">
        <div style={{ width: '100%' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
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
          </Routes>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
