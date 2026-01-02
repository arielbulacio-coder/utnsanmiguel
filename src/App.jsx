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
          </Routes>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
