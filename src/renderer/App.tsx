import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/sidebar';
import Home from './components/pages/home';
import UploadPage from './components/pages/upload';
import './styles/globals.css';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
