import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OhmLawPage from './pages/OhmLawPage';
import ResistorPage from './pages/ResistorPage';
import KirchhoffPage from './pages/KirchhoffPage';

function App() {
  return (
    <Router>
      <div style={{ width: '100%' }}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ley-ohm" element={<OhmLawPage />} />
          <Route path="/codigos-resistencias" element={<ResistorPage />} />
          <Route path="/kirchhoff" element={<KirchhoffPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
