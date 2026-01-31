import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { listenResumes, deleteResume } from '../lib/db';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!user) return;
    const unsub = listenResumes(user.uid, setResumes);
    return () => unsub && unsub();
  }, [user]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return resumes;
    return resumes.filter(r =>
      (r.title || '').toLowerCase().includes(term) ||
      (Array.isArray(r.skills) ? r.skills.join(' ').toLowerCase().includes(term) : false)
    );
  }, [q, resumes]);

  const onDelete = async (id) => {
    if (!user) return;
    if (confirm('Delete this resume permanently?')) {
      await deleteResume(user.uid, id);
    }
  };

  return (
    <div className="container-page">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Your Resumes</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button className="btn" onClick={logout}>Logout</button>
          <Link to="/editor/new" className="btn btn-primary">New Resume</Link>
        </div>
      </div>

      <div className="mb-4">
        <input
          className="input md:w-80"
          placeholder="Search by title or skills"
          value={q}
          onChange={(e)=>setQ(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && (
          <div className="card p-4 text-gray-500">No resumes yet.</div>
        )}
        {filtered.map((r) => (
          <div key={r.id} className="card p-4 flex flex-col gap-3">
            <div className="font-semibold">{r.title || 'Untitled'}</div>
            <div className="text-sm text-gray-500">Template: {r.template || 'A'}</div>
            <div className="mt-auto flex gap-2">
              <Link to={`/editor/${r.id}`} className="btn">Edit</Link>
              <Link to={`/preview/${r.id}`} className="btn btn-primary">Preview</Link>
              <button onClick={()=>onDelete(r.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
