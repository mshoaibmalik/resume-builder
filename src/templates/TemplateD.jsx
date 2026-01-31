import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

// Modern bordered sections with subtle separators
export default function TemplateD({ resume }) {
  const { title='', summary='', personal={}, education=[], experience=[], projects=[], certifications=[], languages=[], skills=[] } = resume || {};
  const initials = (personal?.fullName || 'Your Name').split(' ').filter(Boolean).slice(0,2).map(s=>s[0]?.toUpperCase()).join('');

  return (
    <div className="w-[210mm] mx-auto bg-white text-gray-900 print:w-[210mm]">
      {/* Top Bar */}
      <div className="p-8 border-b">
        <div className="flex items-center gap-4">
          {personal?.imageUrl ? (
            <img src={personal.imageUrl} alt="profile" className="w-20 h-20 object-cover rounded-full ring-2 ring-gray-200" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">{initials}</div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{personal?.fullName || 'Your Name'}</h1>
            <p className="text-sm text-gray-600">{title}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-gray-700 mt-2">
              {personal?.email && <Contact icon={<Mail size={14}/>} text={personal.email} />}
              {personal?.phone && <Contact icon={<Phone size={14}/>} text={personal.phone} />}
              {personal?.location && <Contact icon={<MapPin size={14}/>} text={personal.location} />}
              {personal?.website && <Contact icon={<Globe size={14}/>} text={personal.website} href={personal.website} />}
              {personal?.linkedin && <Contact icon={<Linkedin size={14}/>} text={personal.linkedin} href={personal.linkedin} />}
              {personal?.github && <Contact icon={<Github size={14}/>} text={personal.github} href={personal.github} />}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 p-8">
        <div className="space-y-6">
          {summary && (
            <Card title="Profile">
              <p className="text-sm text-gray-800 whitespace-pre-line">{summary}</p>
            </Card>
          )}

          {!!skills?.length && (
            <Card title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((s,i)=> (<span key={i} className="px-2 py-1 rounded border text-xs">{s}</span>))}
              </div>
            </Card>
          )}

          {!!languages?.length && (
            <Card title="Languages">
              <ul className="list-disc ml-5 text-sm space-y-1">
                {languages.map((l,i)=> (<li key={i}>{l.name} {l.level?`– ${l.level}`:''}</li>))}
              </ul>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {!!experience?.length && (
            <Card title="Experience">
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
            </Card>
          )}

          {!!education?.length && (
            <Card title="Education">
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
            </Card>
          )}

          {!!projects?.length && (
            <Card title="Projects">
              <div className="space-y-3">
                {projects.map((p,i)=> (
                  <div key={i} style={{ breakInside:'avoid' }}>
                    <div className="font-semibold">{p.link? (<a href={p.link} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{p.name}</a>): p.name}</div>
                    {p.details && <div className="text-sm text-gray-600 whitespace-pre-line">{p.details}</div>}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {!!certifications?.length && (
            <Card title="Certifications">
              <ul className="list-disc ml-5 text-sm space-y-1">
                {certifications.map((c,i)=>(<li key={i}>{c.name} {c.issuer?`– ${c.issuer}`:''} {c.year?`(${c.year})`:''}</li>))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section className="border rounded-md p-4">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-700">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
function Contact({ icon, text, href }) {
  const content = (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-gray-500">{icon}</span>
      <span>{text}</span>
    </span>
  );
  return href? <a href={href} target="_blank" rel="noreferrer" className="hover:underline">{content}</a> : content;
}
