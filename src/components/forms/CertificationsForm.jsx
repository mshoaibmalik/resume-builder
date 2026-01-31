import { useState } from 'react';

export default function CertificationsForm({ value = [], onChange }) {
  const [items, setItems] = useState(value);
  const add = () => { const n=[...items,{ name:'', issuer:'', year:'' }]; setItems(n); onChange(n); };
  const update = (i,k,val)=>{ const n=items.map((it,idx)=> idx===i?{...it,[k]:val}:it); setItems(n); onChange(n); };
  const remove = (i)=>{ const n=items.filter((_,idx)=> idx!==i); setItems(n); onChange(n); };
  return (
    <div className="space-y-4">
      {items.map((c,i)=> (
        <div key={i} className="border rounded p-3 grid md:grid-cols-3 gap-3">
          <Field label="Name"><input className="w-full border rounded px-3 py-2" value={c.name} onChange={e=>update(i,'name',e.target.value)} /></Field>
          <Field label="Issuer"><input className="w-full border rounded px-3 py-2" value={c.issuer} onChange={e=>update(i,'issuer',e.target.value)} /></Field>
          <Field label="Year"><input className="w-full border rounded px-3 py-2" value={c.year} onChange={e=>update(i,'year',e.target.value)} /></Field>
          <div className="md:col-span-3 text-right"><button type="button" className="px-3 py-1.5 rounded bg-red-600 text-white" onClick={()=>remove(i)}>Remove</button></div>
        </div>
      ))}
      <button type="button" className="px-3 py-1.5 rounded bg-gray-200" onClick={add}>Add Certification</button>
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
