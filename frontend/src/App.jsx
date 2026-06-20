import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';
import AITools from './pages/AITools';
import Navbar from './components/Navbar';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const publicPages = ['/', '/login', '/register'];
  const isPublic = publicPages.includes(pathname);

  return (
    <div style={{ display: 'flex' }}>
      {user && !isPublic && <Navbar />}
      <main style={{ marginLeft: user && !isPublic ? 220 : 0, flex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/applications" element={<PrivateRoute><Applications /></PrivateRoute>} />
          <Route path="/ai-tools" element={<PrivateRoute><AITools /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;