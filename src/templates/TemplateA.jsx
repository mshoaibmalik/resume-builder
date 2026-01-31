import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

export default function TemplateA({ resume }) {
  const {
    title = '',
    summary = '',
    personal = {},
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    languages = [],
    skills = [],
  } = resume || {};

  const initials = (personal?.fullName || 'Your Name')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  const Accent = 'text-sky-700';
  const AccentBg = 'bg-sky-700';

  return (
    <div className="w-[210mm] mx-auto bg-white text-gray-900 print:w-[210mm]">
      {/* Header */}
      <div className="flex items-center gap-5 border-b p-6">
        {personal?.imageUrl ? (
          <img src={personal.imageUrl} alt="profile" className="w-24 h-24 object-cover rounded" />
        ) : (
          <div className={`w-24 h-24 rounded flex items-center justify-center text-white text-2xl font-semibold ${AccentBg}`}>
            {initials}
          </div>
        )}
        <div className="flex-1">
          <h1 className={`text-4xl font-bold leading-tight`}>{personal?.fullName || 'Your Name'}</h1>
          <p className={`text-base mt-0.5 ${Accent}`}>{title}</p>
          <div className="text-[13px] text-gray-700 flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {personal?.email && <Contact icon={<Mail size={14} />} text={personal.email} />}
            {personal?.phone && <Contact icon={<Phone size={14} />} text={personal.phone} />}
            {personal?.location && <Contact icon={<MapPin size={14} />} text={personal.location} />}
            {personal?.website && <Contact icon={<Globe size={14} />} text={personal.website} href={personal.website} />}
            {personal?.linkedin && <Contact icon={<Linkedin size={14} />} text={personal.linkedin} href={personal.linkedin} />}
            {personal?.github && <Contact icon={<Github size={14} />} text={personal.github} href={personal.github} />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 p-6">
        {/* Left column */}
        <div className="col-span-1 space-y-6">
          {/* Summary */}
          {summary && (
            <Section title="Profile">
              <p className="text-sm leading-relaxed whitespace-pre-line text-gray-800">{summary}</p>
            </Section>
          )}

          {/* Skills */}
          {!!skills?.length && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className={`px-2.5 py-1 rounded-full text-xs font-medium bg-sky-50 ${Accent} border border-sky-100`}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* Languages */}
          {!!languages?.length && (
            <Section title="Languages">
              <ul className="list-disc ml-5 text-sm space-y-1">
                {languages.map((l, i) => (
                  <li key={i}>{l.name} {l.level ? `– ${l.level}` : ''}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        {/* Right column */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {!!experience?.length && (
            <Section title="Experience">
              <div className="space-y-4">
                {experience.map((ex, i) => (
                  <div key={i} style={{ breakInside: 'avoid' }}>
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        {ex.role || 'Role'}{ex.company ? ` @ ${ex.company}` : ''}
                      </div>
                      <div className="text-xs text-gray-500">{[ex.start, ex.end].filter(Boolean).join(' – ')}</div>
                    </div>
                    {!!ex.bullets?.length && (
                      <ul className="list-disc ml-5 text-sm mt-1 space-y-1">
                        {ex.bullets.filter(Boolean).map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
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
                {education.map((ed, i) => (
                  <div key={i} style={{ breakInside: 'avoid' }}>
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

          {/* Projects */}
          {!!projects?.length && (
            <Section title="Projects">
              <div className="space-y-3">
                {projects.map((p, i) => (
                  <div key={i} style={{ breakInside: 'avoid' }}>
                    <div className="font-semibold">
                      {p.link ? (
                        <a href={p.link} className={`hover:underline ${Accent}`} target="_blank" rel="noreferrer">{p.name}</a>
                      ) : p.name}
                    </div>
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
                {certifications.map((c, i) => (
                  <li key={i}>{c.name} {c.issuer ? `– ${c.issuer}` : ''} {c.year ? `(${c.year})` : ''}</li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-[13px] tracking-wide uppercase font-semibold flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-700" />
        <span>{title}</span>
      </h2>
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
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="hover:underline">
      {content}
    </a>
  ) : (
    content
  );
}
