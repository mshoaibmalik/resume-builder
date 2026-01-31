export default function PersonalForm({ value, onChange }) {
  const v = value || {};
  const set = (k, val) => onChange({ ...v, [k]: val });
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Full name">
          <input className="w-full border rounded px-3 py-2" value={v.fullName||''} onChange={e=>set('fullName', e.target.value)} />
        </Field>
        <Field label="Email">
          <input className="w-full border rounded px-3 py-2" value={v.email||''} onChange={e=>set('email', e.target.value)} />
        </Field>
        <Field label="Phone">
          <input className="w-full border rounded px-3 py-2" value={v.phone||''} onChange={e=>set('phone', e.target.value)} />
        </Field>
        <Field label="Location">
          <input className="w-full border rounded px-3 py-2" value={v.location||''} onChange={e=>set('location', e.target.value)} />
        </Field>
        <Field label="Website">
          <input className="w-full border rounded px-3 py-2" value={v.website||''} onChange={e=>set('website', e.target.value)} />
        </Field>
        <Field label="LinkedIn">
          <input className="w-full border rounded px-3 py-2" value={v.linkedin||''} onChange={e=>set('linkedin', e.target.value)} />
        </Field>
        <Field label="GitHub">
          <input className="w-full border rounded px-3 py-2" value={v.github||''} onChange={e=>set('github', e.target.value)} />
        </Field>
      </div>
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
