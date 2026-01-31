import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Preview from './pages/Preview';
import RouteGuard from './components/RouteGuard';
import Topbar from './components/Topbar';

function App() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <RouteGuard>
              <Dashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/editor/:id"
          element={
            <RouteGuard>
              <Editor />
            </RouteGuard>
          }
        />
        <Route
          path="/preview/:id"
          element={
            <RouteGuard>
              <Preview />
            </RouteGuard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
