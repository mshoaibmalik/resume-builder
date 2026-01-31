import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { downloadElementAsPDF } from '../utils/pdf';
import { getResume } from '../lib/db';
import { useAuth } from '../context/AuthContext';
import TemplateA from '../templates/TemplateA';
import TemplateB from '../templates/TemplateB';
import TemplateC from '../templates/TemplateC';
import TemplateD from '../templates/TemplateD';

export default function Preview() {
  const { id } = useParams();
  const { user } = useAuth();
  const previewRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) return;
    (async () => {
      setLoading(true);
      const d = await getResume(user.uid, id);
      setData(d);
      setLoading(false);
    })();
  }, [user, id]);

  const onDownload = async () => {
    const el = previewRef.current;
    if (!el) return;
    // Ensure fonts are loaded
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch {}
    }
    // Wait for images/fonts to be ready
    const imgs = Array.from(el.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => (img.complete ? Promise.resolve() : new Promise((res) => { img.onload = () => res(); img.onerror = () => res(); })))
    );
    await downloadElementAsPDF(el, `resume-${id || 'new'}.pdf`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Preview</h1>
        <div className="flex gap-2">
          <Link to={`/editor/${id || 'new'}`} className="px-3 py-1.5 rounded bg-gray-200">Edit</Link>
          {/* <button onClick={onDownload} className="px-3 py-1.5 rounded bg-green-600 text-white"></button> */}
          <button onClick={()=>window.print()} className="px-3 py-1.5 rounded bg-gray-900 text-white">Print as PDF</button>
        </div>
      </div>
      <div className="bg-white p-0 rounded shadow min-h-[400px]">
        <div ref={previewRef} className="print-area">
        {loading && (
          <div className="p-6 text-gray-500">Loading...</div>
        )}
        {!loading && data && (
          <>
            {(!data.template || data.template === 'A') && <TemplateA resume={data} />}
            {data.template === 'B' && <TemplateB resume={data} />}
            {data.template === 'C' && <TemplateC resume={data} />}
            {data.template === 'D' && <TemplateD resume={data} />}
          </>
        )}
        </div>
      </div>
    </div>
  );
}
