import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function TemplateB({ resume }) {
  const { title='', summary='', personal={}, education=[], experience=[], projects=[], certifications=[], languages=[], skills=[] } = resume || {};
  const initials = (personal?.fullName || 'Your Name').split(' ').filter(Boolean).slice(0,2).map(s=>s[0]?.toUpperCase()).join('');

  return (
    <div className="w-[210mm] mx-auto bg-white text-gray-900 print:w-[210mm] grid grid-cols-[70mm_1fr]">
      {/* Sidebar */}
      <aside className="bg-slate-900 text-white min-h-[297mm] p-6 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          {personal?.imageUrl ? (
            <img src={personal.imageUrl} alt="profile" className="w-16 h-16 object-cover rounded" />
          ) : (
            <div className="w-16 h-16 rounded bg-slate-700 flex items-center justify-center text-xl font-semibold">{initials}</div>
          )}
          <div>
            <div className="text-lg font-semibold leading-tight">{personal?.fullName || 'Your Name'}</div>
            <div className="text-slate-300 text-xs">{title}</div>
          </div>
        </div>

        <Section title="Contact">
          <div className="space-y-1 text-sm">
            {personal?.email && <Contact icon={<Mail size={14} />} text={personal.email} dark />}
            {personal?.phone && <Contact icon={<Phone size={14} />} text={personal.phone} dark />}
            {personal?.location && <Contact icon={<MapPin size={14} />} text={personal.location} dark />}
            {personal?.website && <Contact icon={<Globe size={14} />} text={personal.website} href={personal.website} dark />}
            {personal?.linkedin && <Contact icon={<Linkedin size={14} />} text={personal.linkedin} href={personal.linkedin} dark />}
            {personal?.github && <Contact icon={<Github size={14} />} text={personal.github} href={personal.github} dark />}
          </div>
        </Section>

        {!!skills?.length && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {skills.map((s,i)=>(<span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-100 text-xs border border-slate-700">{s}</span>))}
            </div>
          </Section>
        )}

        {!!languages?.length && (
          <Section title="Languages">
            <ul className="list-disc ml-5 text-sm space-y-1 text-slate-200">
              {languages.map((l,i)=>(<li key={i}>{l.name} {l.level?`– ${l.level}`:''}</li>))}
            </ul>
          </Section>
        )}
      </aside>

      {/* Main */}
      <main className="p-8 space-y-6">
        {summary && (
          <MainSection title="Profile">
            <p className="text-sm text-gray-800 whitespace-pre-line">{summary}</p>
          </MainSection>
        )}

        {!!experience?.length && (
          <MainSection title="Experience">
            <div className="space-y-4">
              {experience.map((ex,i)=> (
                <div key={i} style={{ breakInside:'avoid' }}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{ex.role || 'Role'}{ex.company?` @ ${ex.company}`:''}</div>
                    <div className="text-xs text-gray-500">{[ex.start, ex.end].filter(Boolean).join(' – ')}</div>
                  </div>
                  {!!ex.bullets?.length && (
                    <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                      {ex.bullets.filter(Boolean).map((b,bi)=>(<li key={bi}>{b}</li>))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {!!education?.length && (
          <MainSection title="Education">
            <div className="space-y-3">
              {education.map((ed,i)=> (
                <div key={i} style={{ breakInside:'avoid' }}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{ed.degree}</div>
                    <div className="text-xs text-gray-500">{[ed.start, ed.end].filter(Boolean).join(' – ')}</div>
                  </div>
                  <div className="text-sm text-gray-700">{ed.school}</div>
                  {ed.details && <div className="text-sm text-gray-600 mt-1 whitespace-pre-line">{ed.details}</div>}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {!!projects?.length && (
          <MainSection title="Projects">
            <div className="space-y-3">
              {projects.map((p,i)=> (
                <div key={i} style={{ breakInside:'avoid' }}>
                  <div className="font-semibold">
                    {p.link? (<a href={p.link} target="_blank" rel="noreferrer" className="text-slate-700 hover:underline">{p.name}</a>): p.name}
                  </div>
                  {p.details && <div className="text-sm text-gray-600 whitespace-pre-line">{p.details}</div>}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {!!certifications?.length && (
          <MainSection title="Certifications">
            <ul className="list-disc ml-5 text-sm space-y-1">
              {certifications.map((c,i)=> (<li key={i}>{c.name} {c.issuer?`– ${c.issuer}`:''} {c.year?`(${c.year})`:''}</li>))}
            </ul>
          </MainSection>
        )}
      </main>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="uppercase tracking-wide text-[12px] font-semibold text-slate-200">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
function MainSection({ title, children }) {
  return (
    <section>
      <h2 className="uppercase tracking-wide text-[12px] font-semibold text-slate-700">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
function Contact({ icon, text, href, dark }) {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      <span className={dark? 'text-slate-300':'text-gray-500'}>{icon}</span>
      <span>{text}</span>
    </span>
  );
  return href? <a href={href} target="_blank" rel="noreferrer" className="hover:underline">{content}</a> : content;
}
