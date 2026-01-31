import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createResume, getResume, updateResume } from '../lib/db';
import PersonalForm from '../components/forms/PersonalForm';
import EducationForm from '../components/forms/EducationForm';
import ExperienceForm from '../components/forms/ExperienceForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import LanguagesForm from '../components/forms/LanguagesForm';
import { uploadProfileImage } from '../lib/storage';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState(''); // comma separated for input UX
  const [template, setTemplate] = useState('A');
  const [personal, setPersonal] = useState({});
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const previewUrl = useMemo(() => imageFile ? URL.createObjectURL(imageFile) : (personal?.imageUrl || ''), [imageFile, personal?.imageUrl]);

  useEffect(() => {
    if (!user || isNew) return;
    (async () => {
      const data = await getResume(user.uid, id);
      if (data) {
        setTitle(data.title || '');
        setSummary(data.summary || '');
        setSkills(Array.isArray(data.skills) ? data.skills.join(', ') : '');
        setTemplate(data.template || 'A');
        setPersonal(data.personal || {});
        setEducation(Array.isArray(data.education) ? data.education : []);
        setExperience(Array.isArray(data.experience) ? data.experience : []);
        setProjects(Array.isArray(data.projects) ? data.projects : []);
        setCertifications(Array.isArray(data.certifications) ? data.certifications : []);
        setLanguages(Array.isArray(data.languages) ? data.languages : []);
      }
    })();
  }, [user, id, isNew]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    let imageUrl = personal?.imageUrl || '';
    try {
      // If new image selected, upload to Storage first (need resumeId; handle create vs update)
      let docId = id;
      const basePayload = {
        title,
        summary,
        skills: skills.split(',').map(s => s.trim()).filter(Boolean),
        template,
        personal,
        education,
        experience,
        projects,
        certifications,
        languages,
      };
      if (isNew) {
        // create the doc first to get id for storage path
        docId = await createResume(user.uid, basePayload);
      } else {
        await updateResume(user.uid, id, basePayload);
      }

      if (imageFile) {
        imageUrl = await uploadProfileImage(user.uid, docId, imageFile);
        await updateResume(user.uid, docId, { personal: { ...personal, imageUrl } });
        setPersonal((p)=> ({ ...p, imageUrl }));
      }

      navigate(`/preview/${docId}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-page space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{isNew ? 'Create Resume' : 'Edit Resume'}</h1>
        <div className="flex gap-2">
          <Link to="/" className="btn">Back</Link>
          <button disabled={loading} onClick={save} className="btn btn-primary disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
      <div className="section space-y-6">
        <div>
          <label className="label">Title</label>
          <input className="input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g. Frontend Developer" />
        </div>
        <div>
          <label className="label">Summary</label>
          <textarea className="textarea" rows={4} value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Brief professional summary" />
        </div>
        <div>
          <label className="label">Skills (comma separated)</label>
          <input className="input" value={skills} onChange={(e)=>setSkills(e.target.value)} placeholder="React, Tailwind, Firebase" />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <div className="flex items-start gap-4">
            <div className="w-full">
              <PersonalForm value={personal} onChange={setPersonal} />
            </div>
            <div className="w-40 shrink-0 space-y-2">
              <div className="w-40 h-40 rounded bg-gray-100 overflow-hidden flex items-center justify-center border">
                {previewUrl ? (
                  <img src={previewUrl} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-gray-500">No photo</span>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e)=> setImageFile(e.target.files?.[0]||null)}
              />
              <div className="flex gap-2">
                <button type="button" className="btn" onClick={()=>fileInputRef.current?.click()}>Choose Photo</button>
                {imageFile && (
                  <button type="button" className="btn btn-danger" onClick={()=> setImageFile(null)}>Clear</button>
                )}
              </div>
              {imageFile && <p className="text-xs text-gray-500 truncate">{imageFile.name}</p>}
              <p className="text-xs text-gray-500">JPG/PNG, up to ~2MB</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          <EducationForm value={education} onChange={setEducation} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
          <ExperienceForm value={experience} onChange={setExperience} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          <ProjectsForm value={projects} onChange={setProjects} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Certifications</h2>
          <CertificationsForm value={certifications} onChange={setCertifications} />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Languages</h2>
          <LanguagesForm value={languages} onChange={setLanguages} />
        </div>
        <div>
          <label className="label">Template</label>
          <select className="select" value={template} onChange={(e)=>setTemplate(e.target.value)}>
            <option value="A">Template A (Professional)</option>
            <option value="B">Template B (Sidebar)</option>
            <option value="C">Template C (Minimal)</option>
            <option value="D">Template D (Modern Cards)</option>
          </select>
        </div>
      </div>
      {/* TODO: Add sections: Personal, Education, Experience, Projects, Certs, Languages, Image */}
    </div>
  );
}
