import { useState } from 'react';

export default function ExperienceForm({ value = [], onChange }) {
  const [items, setItems] = useState(value);

  const add = () => {
    const next = [...items, { company: '', role: '', start: '', end: '', bullets: [''] }];
    setItems(next); onChange(next);
  };
  const update = (i, k, val) => {
    const next = items.map((it, idx) => idx === i ? { ...it, [k]: val } : it);
    setItems(next); onChange(next);
  };
  const updateBullet = (i, bi, val) => {
    const next = items.map((it, idx) => idx === i ? { ...it, bullets: it.bullets.map((b, jj)=> jj===bi? val : b) } : it);
    setItems(next); onChange(next);
  }
  const addBullet = (i) => {
    const next = items.map((it, idx) => idx === i ? { ...it, bullets: [...it.bullets, ''] } : it);
    setItems(next); onChange(next);
  }
  const remove = (i) => {
    const next = items.filter((_, idx) => idx !== i);
    setItems(next); onChange(next);
  };

  return (
    <div className="space-y-4">
      {items.map((ex, i) => (
        <div key={i} className="border rounded p-3 grid md:grid-cols-2 gap-3">
          <Field label="Company"><input className="w-full border rounded px-3 py-2" value={ex.company} onChange={e=>update(i,'company',e.target.value)} /></Field>
          <Field label="Role"><input className="w-full border rounded px-3 py-2" value={ex.role} onChange={e=>update(i,'role',e.target.value)} /></Field>
          <Field label="Start"><input className="w-full border rounded px-3 py-2" value={ex.start} onChange={e=>update(i,'start',e.target.value)} /></Field>
          <Field label="End"><input className="w-full border rounded px-3 py-2" value={ex.end} onChange={e=>update(i,'end',e.target.value)} /></Field>
          <div className="md:col-span-2 space-y-2">
            <span className="block text-sm font-medium">Bullets</span>
            {ex.bullets.map((b, bi)=> (
              <input key={bi} className="w-full border rounded px-3 py-2" value={b} onChange={e=>updateBullet(i,bi,e.target.value)} placeholder={`Bullet ${bi+1}`} />
            ))}
            <button type="button" className="px-3 py-1.5 rounded bg-gray-200" onClick={()=>addBullet(i)}>Add Bullet</button>
          </div>
          <div className="md:col-span-2 text-right"><button type="button" className="px-3 py-1.5 rounded bg-red-600 text-white" onClick={()=>remove(i)}>Remove</button></div>
        </div>
      ))}
      <button type="button" className="px-3 py-1.5 rounded bg-gray-200" onClick={add}>Add Experience</button>
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
