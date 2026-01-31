import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

// Minimalist single-column template
export default function TemplateC({ resume }) {
  const { title='', summary='', personal={}, education=[], experience=[], projects=[], certifications=[], languages=[], skills=[] } = resume || {};
  return (
    <div className="w-[210mm] mx-auto bg-white text-gray-900 print:w-[210mm] p-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">{personal?.fullName || 'Your Name'}</h1>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-[13px] text-gray-700 mt-2">
          {personal?.email && <Contact icon={<Mail size={14}/>} text={personal.email} />}
          {personal?.phone && <Contact icon={<Phone size={14}/>} text={personal.phone} />}
          {personal?.location && <Contact icon={<MapPin size={14}/>} text={personal.location} />}
          {personal?.website && <Contact icon={<Globe size={14}/>} text={personal.website} href={personal.website} />}
          {personal?.linkedin && <Contact icon={<Linkedin size={14}/>} text={personal.linkedin} href={personal.linkedin} />}
          {personal?.github && <Contact icon={<Github size={14}/>} text={personal.github} href={personal.github} />}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <Section title="Profile">
          <p className="text-sm text-gray-800 whitespace-pre-line">{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {!!experience?.length && (
        <Section title="Experience">
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
        </Section>
      )}

      {/* Education */}
      {!!education?.length && (
        <Section title="Education">
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
        </Section>
      )}

      {/* Skills */}
      {!!skills?.length && (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {skills.map((s,i)=> (<span key={i} className="px-2 py-1 rounded bg-gray-100 text-xs">{s}</span>))}
          </div>
        </Section>
      )}

      {/* Projects */}
      {!!projects?.length && (
        <Section title="Projects">
          <div className="space-y-3">
            {projects.map((p,i)=> (
              <div key={i} style={{ breakInside:'avoid' }}>
                <div className="font-semibold">{p.link? (<a href={p.link} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">{p.name}</a>): p.name}</div>
                {p.details && <div className="text-sm text-gray-600 whitespace-pre-line">{p.details}</div>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {!!certifications?.length && (
        <Section title="Certifications">
          <ul className="list-disc ml-5 text-sm space-y-1">
            {certifications.map((c,i)=>(<li key={i}>{c.name} {c.issuer?`– ${c.issuer}`:''} {c.year?`(${c.year})`:''}</li>))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {!!languages?.length && (
        <Section title="Languages">
          <ul className="list-disc ml-5 text-sm space-y-1">
            {languages.map((l,i)=>(<li key={i}>{l.name} {l.level?`– ${l.level}`:''}</li>))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-8 first:mt-10">
      <h2 className="text-xs tracking-wider uppercase font-semibold text-gray-700">{title}</h2>
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
