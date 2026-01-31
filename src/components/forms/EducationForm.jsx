import { useState } from 'react';

export default function EducationForm({ value = [], onChange }) {
  const [items, setItems] = useState(value);

  const add = () => {
    const next = [...items, { school: '', degree: '', start: '', end: '', details: '' }];
    setItems(next); onChange(next);
  };
  const update = (i, k, val) => {
    const next = items.map((it, idx) => idx === i ? { ...it, [k]: val } : it);
    setItems(next); onChange(next);
  };
  const remove = (i) => {
    const next = items.filter((_, idx) => idx !== i);
    setItems(next); onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((ed, i) => (
        <div key={i} className="border rounded p-3 grid md:grid-cols-2 gap-3">
          <Field label="School"><input className="w-full border rounded px-3 py-2" value={ed.school} onChange={e=>update(i,'school',e.target.value)} /></Field>
          <Field label="Degree"><input className="w-full border rounded px-3 py-2" value={ed.degree} onChange={e=>update(i,'degree',e.target.value)} /></Field>
          <Field label="Start"><input className="w-full border rounded px-3 py-2" value={ed.start} onChange={e=>update(i,'start',e.target.value)} /></Field>
          <Field label="End"><input className="w-full border rounded px-3 py-2" value={ed.end} onChange={e=>update(i,'end',e.target.value)} /></Field>
          <div className="md:col-span-2">
            <Field label="Details"><textarea className="w-full border rounded px-3 py-2" rows={3} value={ed.details} onChange={e=>update(i,'details',e.target.value)} /></Field>
          </div>
          <div className="md:col-span-2 text-right"><button type="button" className="px-3 py-1.5 rounded bg-red-600 text-white" onClick={()=>remove(i)}>Remove</button></div>
        </div>
      ))}
      <button type="button" className="px-3 py-1.5 rounded bg-gray-200" onClick={add}>Add Education</button>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      {children}
    </label>
  );
}
