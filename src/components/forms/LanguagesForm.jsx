import { useState } from 'react';

export default function LanguagesForm({ value = [], onChange }) {
  const [items, setItems] = useState(value);
  const add = () => { const n=[...items,{ name:'', level:'' }]; setItems(n); onChange(n); };
  const update = (i,k,val)=>{ const n=items.map((it,idx)=> idx===i?{...it,[k]:val}:it); setItems(n); onChange(n); };
  const remove = (i)=>{ const n=items.filter((_,idx)=> idx!==i); setItems(n); onChange(n); };
  return (
    <div className="space-y-4">
      {items.map((l,i)=> (
        <div key={i} className="border rounded p-3 grid md:grid-cols-2 gap-3">
          <Field label="Language"><input className="w-full border rounded px-3 py-2" value={l.name} onChange={e=>update(i,'name',e.target.value)} /></Field>
          <Field label="Level"><input className="w-full border rounded px-3 py-2" value={l.level} onChange={e=>update(i,'level',e.target.value)} placeholder="Native/Fluent/Intermediate" /></Field>
          <div className="md:col-span-2 text-right"><button type="button" className="px-3 py-1.5 rounded bg-red-600 text-white" onClick={()=>remove(i)}>Remove</button></div>
        </div>
      ))}
      <button type="button" className="px-3 py-1.5 rounded bg-gray-200" onClick={add}>Add Language</button>
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
