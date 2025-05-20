import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import MahasiswaList from './pages/Mahasiswa/MahasiswaList';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mahasiswa" element={<MahasiswaList />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

