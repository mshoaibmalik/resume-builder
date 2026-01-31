import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-page flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-base font-semibold">Resume Builder</Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/" className="btn btn-ghost">Dashboard</Link>
            <Link to="/editor/new" className="btn">New Resume</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user?.email && <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span>}
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
