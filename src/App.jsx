import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ArrowRight, ArrowUpRight, Menu, X, Check } from 'lucide-react';

// Hantverket-palett
const c = {
  bg: '#F1E9D6',
  surface: '#EDE5D5',
  surfaceDark: '#E5DAC5',
  text: '#2A211A',
  textSecondary: '#5C4F42',
  textMuted: '#9D8E7C',
  accent: '#A24F2C',
  accentDark: '#7A3A1F',
  border: '#D4C7B0',
  borderLight: '#E5DAC5',
};


const NORDEKOR_LOGO = '/logo.jpg';

const fontCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500&family=Manrope:wght@300;400;500;600;700&display=swap');
  .nk-display { font-family: 'Fraunces', 'Times New Roman', serif; font-feature-settings: 'ss01'; }
  .nk-body { font-family: 'Manrope', system-ui, sans-serif; }
  .nk-eyebrow { font-family: 'Manrope', sans-serif; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500; }
  body { font-family: 'Manrope', system-ui, sans-serif; }
  .nk-grain {
    position: relative;
  }
  .nk-grain::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .nk-fade-up { animation: fadeUp 0.7s ease-out forwards; }
`;

const tjanster = [
  {
    nr: '01',
    titel: 'Stuckatur',
    intro: 'Vårt hjärta. Klassiska tekniker, levande hantverk.',
    beskrivning: 'Vi tillverkar och restaurerar stuckatur efter samma principer som använts i hundratals år. Varje rosett, list och ornament hanteras som det enskilda föremål det är.',
    items: [
      'Takrosetter och medaljonger',
      'Taklister och ornamentlister',
      'Ornament, reliefer, fri dekor',
      'Restaurering av befintlig stuckatur',
      'Nytillverkning efter ritning eller original',
    ],
  },
  {
    nr: '02',
    titel: 'Fasadarbeten',
    intro: 'Från enskilda sprickor till hela renoveringar.',
    beskrivning: 'Putsning, dekor och reparation av fasader på allt från villor till flerfamiljshus. Material och metod väljs efter byggnaden, inte tvärtom.',
    items: [
      'Putsning, ny och renovering',
      'Fasadutsmyckning och dekorelement',
      'Sprickor och skadereparation',
      'Murningsreparationer',
    ],
  },
  {
    nr: '03',
    titel: 'Brandtätning',
    intro: 'Säkerhet i detaljen.',
    beskrivning: 'Komplett brandtätning av genomföringar, schakt och tekniska installationer enligt gällande regelverk. Vi arbetar med flera certifierade system.',
    items: [
      'Brandtätning av genomföringar',
      'Tätning av installationsschakt',
      'Brandsäkring av kabel- och rörgenomföringar',
    ],
  },
  {
    nr: '04',
    titel: 'Inomhusarbeten',
    intro: 'Detaljerna som skapar rummet.',
    beskrivning: 'Gipsputs och inomhuslösningar för både nyproduktion och äldre byggnader.',
    items: [
      'Gipsputsning',
      'Tak- och väggputs',
      'Inredningsdetaljer',
    ],
  },
  {
    nr: '05',
    titel: 'Plattsättning',
    intro: 'På förfrågan.',
    beskrivning: 'Vi gör plattsättning som komplement till våra större uppdrag.',
    items: [],
  },
];

const placeholderProjekt = [
  { kategori: 'Stuckatur', titel: 'Takrosett, sekelskifteslägenhet', plats: 'Östermalm, Stockholm', shade: 1 },
  { kategori: 'Fasader', titel: 'Fasadrenovering, BRF-fastighet', plats: 'Vasastan, Stockholm', shade: 2 },
  { kategori: 'Stuckatur', titel: 'Ornamentlist, restaurering', plats: 'Södermalm, Stockholm', shade: 3 },
  { kategori: 'Fasader', titel: 'Putsning, villa', plats: 'Bromma, Stockholm', shade: 1 },
  { kategori: 'Brandtätning', titel: 'Genomföringar, kontorsfastighet', plats: 'Hammarby Sjöstad', shade: 2 },
  { kategori: 'Stuckatur', titel: 'Medaljong, nytillverkning', plats: 'Kungsholmen, Stockholm', shade: 3 },
];

// ────────────────────────────────────────────────────────────
// HEADER
// ────────────────────────────────────────────────────────────
function Header({ page, setPage, menuOpen, setMenuOpen }) {
  const nav = [
    { id: 'hem', label: 'Hem' },
    { id: 'tjanster', label: 'Tjänster' },
    { id: 'projekt', label: 'Projekt' },
    { id: 'om', label: 'Om oss' },
    { id: 'kontakt', label: 'Kontakt' },
  ];

  return (
    <header
      style={{ borderBottom: `1px solid ${c.border}`, background: c.bg + 'EE' }}
      className="sticky top-0 z-50 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        <button
          onClick={() => { setPage('hem'); setMenuOpen(false); }}
          style={{ display: 'flex', alignItems: 'center', padding: 0, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <img src={NORDEKOR_LOGO} alt="Nordekor" style={{ height: 'min(96px, 22vw)', width: 'auto', display: 'block' }} />
        </button>
        <nav className="hidden md:flex gap-10">
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="nk-eyebrow transition-colors"
              style={{
                color: page === item.id ? c.accent : c.text,
                fontWeight: page === item.id ? 600 : 500,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: c.text }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="md:hidden flex flex-col" style={{ borderTop: `1px solid ${c.border}` }}>
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setMenuOpen(false); }}
              className="text-left px-6 py-4 nk-eyebrow"
              style={{
                color: page === item.id ? c.accent : c.text,
                borderBottom: `1px solid ${c.borderLight}`,
                fontWeight: page === item.id ? 600 : 500,
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

// ────────────────────────────────────────────────────────────
// PLACEHOLDER MEDIA
// ────────────────────────────────────────────────────────────
function MediaPlaceholder({ aspect = 'aspect-[16/10]', label = 'Projektbild kommer', shade = 1, sublabel }) {
  const shades = [
    { from: c.surface, to: c.surfaceDark },
    { from: c.surfaceDark, to: c.border },
    { from: c.border, to: c.surface },
  ];
  const s = shades[(shade - 1) % 3];

  return (
    <div
      className={`${aspect} flex items-center justify-center relative overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${s.from} 0%, ${s.to} 100%)`, border: `1px solid ${c.border}` }}
    >
      <div className="absolute inset-0 nk-grain" />
      <div className="text-center relative z-10 px-4">
        <div className="nk-display italic" style={{ color: c.textMuted, fontSize: '0.95rem' }}>
          {label}
        </div>
        {sublabel && (
          <div className="nk-eyebrow mt-2" style={{ color: c.textMuted }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// HEM
// ────────────────────────────────────────────────────────────
function Hem({ setPage }) {
  return (
    <main>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="nk-fade-up">
          <div className="nk-eyebrow mb-6" style={{ color: c.accent }}>
            Hantverk sedan 1986
          </div>
          <h1
            className="nk-display tracking-tight max-w-5xl mb-8"
            style={{ color: c.text, fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1.05, fontWeight: 400 }}
          >
            Stuckatur och fasader{' '}
            <span style={{ fontStyle: 'italic', color: c.accent }}>med själ.</span>
          </h1>
          <p
            className="max-w-2xl leading-relaxed"
            style={{ color: c.textSecondary, fontSize: '1.15rem' }}
          >
            Nordekor är ett familjeföretag i Stockholm som arbetar med klassisk stuckatur,
            fasadarbeten och brandtätning. Drivet av hantverk, inte volym.
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-28">
        <MediaPlaceholder aspect="aspect-[16/8]" label="Hero-bild" sublabel="Plats för utvalt projektfoto" shade={2} />
      </section>

      {/* Stack: Två feature cards */}
      <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ flex: '1 1 320px' }}>
            <FeatureCard
              title="Stuckatur"
              description="Takrosetter, lister, ornament. Restaurering och nytillverkning. Det vi är mest stolta över."
              onClick={() => setPage('tjanster')}
            />
          </div>
          <div style={{ flex: '1 1 320px' }}>
            <FeatureCard
              title="Fasadarbeten"
              description="Putsning, fasadutsmyckning, sprickreparation, murverk. För både privatkunder och fastighetsägare."
              onClick={() => setPage('tjanster')}
            />
          </div>
        </div>
      </section>

      {/* Övriga tjänster */}
      <section className="max-w-7xl mx-auto px-6 mb-24 md:mb-32">
        <div className="nk-eyebrow mb-4" style={{ color: c.accent }}>
          Övriga tjänster
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
          {tjanster.slice(2).map(t => (
            <div key={t.titel} style={{ flex: '1 1 220px' }}>
              <h4 className="nk-display mb-2" style={{ color: c.text, fontSize: '1.5rem', fontWeight: 500 }}>
                {t.titel}
              </h4>
              <p style={{ color: c.textSecondary, fontSize: '0.95rem', lineHeight: 1.65 }}>
                {t.intro}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Utvalda projekt */}
      <section style={{ background: c.surface }} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="nk-eyebrow mb-3" style={{ color: c.accent }}>
                Utvalt arbete
              </div>
              <h2 className="nk-display" style={{ color: c.text, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
                Hantverk i Stockholm
              </h2>
            </div>
            <button
              onClick={() => setPage('projekt')}
              className="nk-eyebrow flex items-center gap-2 group"
              style={{ color: c.accent }}
            >
              Alla projekt
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
            {placeholderProjekt.slice(0, 3).map((p, i) => (
              <div key={i} style={{ flex: '1 1 240px' }}>
                <MediaPlaceholder aspect="aspect-[4/5]" label="Projektbild" shade={p.shade} />
                <div className="mt-4">
                  <div className="nk-eyebrow mb-2" style={{ color: c.accent }}>
                    {p.kategori}
                  </div>
                  <div className="nk-display" style={{ color: c.text, fontSize: '1.15rem', lineHeight: 1.3 }}>
                    {p.titel}
                  </div>
                  <div className="mt-1" style={{ color: c.textMuted, fontSize: '0.85rem' }}>
                    {p.plats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Om i korthet */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'flex-end' }}>
          <div style={{ flex: '0 0 200px' }}>
            <div className="nk-display" style={{ color: c.accent, fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 300, lineHeight: 1 }}>
              40
            </div>
            <div className="nk-eyebrow mt-2" style={{ color: c.textSecondary }}>
              års erfarenhet
            </div>
          </div>
          <div style={{ flex: '1 1 400px', minWidth: 0 }}>
            <h2 className="nk-display mb-6" style={{ color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.2 }}>
              Familjeföretag drivet av en passion för riktigt hantverk.
            </h2>
            <p style={{ color: c.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
              Juan Carlos började som stuckatör 1986 och grundade Nordekor 2006. Idag drivs företaget vidare
              av familjen, med samma princip: göra arbetet rätt, inte snabbt.
            </p>
            <button
              onClick={() => setPage('om')}
              className="nk-eyebrow mt-8 flex items-center gap-2 group"
              style={{ color: c.accent }}
            >
              Läs vår historia
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: c.text, color: c.bg }} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="nk-display mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, lineHeight: 1.15 }}>
            Funderar du på ett projekt?
          </h2>
          <p className="max-w-2xl mx-auto mb-10" style={{ color: c.surface, fontSize: '1.1rem', lineHeight: 1.6 }}>
            Vi pratar gärna igenom vad som är möjligt — utan kostnad, utan förbindelse.
          </p>
          <button
            onClick={() => setPage('kontakt')}
            className="px-8 py-4 nk-eyebrow inline-flex items-center gap-3 transition-transform hover:translate-y-[-1px]"
            style={{ background: c.accent, color: c.bg, fontSize: '0.85rem' }}
          >
            Kontakta oss
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left p-10 md:p-12 transition-all hover:translate-y-[-2px] group"
      style={{ background: c.surface, border: `1px solid ${c.border}`, width: '100%', display: 'block' }}
    >
      <h3 className="nk-display mb-4" style={{ color: c.text, fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 400, lineHeight: 1.15 }}>
        {title}
      </h3>
      <p className="leading-relaxed mb-8 max-w-md" style={{ color: c.textSecondary, fontSize: '0.98rem' }}>
        {description}
      </p>
      <div className="flex items-center gap-2 nk-eyebrow" style={{ color: c.accent }}>
        Läs mer
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
}

// ────────────────────────────────────────────────────────────
// TJÄNSTER
// ────────────────────────────────────────────────────────────
function Tjanster({ setPage }) {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <div className="nk-eyebrow mb-6" style={{ color: c.accent }}>
          Tjänster
        </div>
        <h1 className="nk-display max-w-4xl" style={{ color: c.text, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1.05 }}>
          Vad vi <span style={{ fontStyle: 'italic', color: c.accent }}>gör.</span>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        {tjanster.map((t, i) => (
          <div
            key={t.nr}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              padding: '4rem 0',
              borderTop: i === 0 ? 'none' : `1px solid ${c.border}`,
            }}
          >
            <div style={{ flex: '0 0 100px' }}>
              <div className="nk-display" style={{ color: c.accent, fontSize: '2.5rem', fontWeight: 300, lineHeight: 1 }}>
                {t.nr}
              </div>
            </div>
            <div style={{ flex: '1 1 400px', minWidth: 0 }}>
              <h2 className="nk-display mb-3" style={{ color: c.text, fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 400, lineHeight: 1.1 }}>
                {t.titel}
              </h2>
              <p className="nk-display italic mb-6" style={{ color: c.accent, fontSize: '1.15rem' }}>
                {t.intro}
              </p>
              <p className="mb-8" style={{ color: c.textSecondary, fontSize: '1.05rem', lineHeight: 1.7 }}>
                {t.beskrivning}
              </p>
              {t.items.length > 0 && (
                <ul className="space-y-2">
                  {t.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3" style={{ color: c.text, fontSize: '0.98rem' }}>
                      <Check size={18} style={{ color: c.accent, flexShrink: 0, marginTop: 2 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>

      <section style={{ background: c.surface }} className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="nk-display mb-6" style={{ color: c.text, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 400 }}>
            Behöver du något av detta?
          </h2>
          <p className="mb-8" style={{ color: c.textSecondary, fontSize: '1.05rem' }}>
            Hör av dig så pratar vi igenom ditt projekt.
          </p>
          <button
            onClick={() => setPage('kontakt')}
            className="px-8 py-4 nk-eyebrow inline-flex items-center gap-3 transition-transform hover:translate-y-[-1px]"
            style={{ background: c.accent, color: c.bg, fontSize: '0.85rem' }}
          >
            Kontakta oss
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

// ────────────────────────────────────────────────────────────
// PROJEKT
// ────────────────────────────────────────────────────────────
function Projekt() {
  const [filter, setFilter] = useState('Alla');
  const filters = ['Alla', 'Stuckatur', 'Fasader', 'Brandtätning', 'Inomhus'];
  const filtered = filter === 'Alla' ? placeholderProjekt : placeholderProjekt.filter(p => p.kategori === filter);

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <div className="nk-eyebrow mb-6" style={{ color: c.accent }}>
          Projekt
        </div>
        <h1 className="nk-display max-w-4xl mb-8" style={{ color: c.text, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1.05 }}>
          Hantverk <span style={{ fontStyle: 'italic', color: c.accent }}>i Stockholm.</span>
        </h1>
        <p className="max-w-2xl" style={{ color: c.textSecondary, fontSize: '1.1rem', lineHeight: 1.7 }}>
          Ett urval av projekt vi gjort genom åren. Vi fyller på galleriet allt eftersom — färdigt
          arbete dokumenteras innan det försvinner ur sikte.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="nk-eyebrow px-5 py-2.5 transition-all"
              style={{
                background: filter === f ? c.text : 'transparent',
                color: filter === f ? c.bg : c.text,
                border: `1px solid ${filter === f ? c.text : c.border}`,
                fontSize: '0.75rem',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem 1.25rem', rowGap: '3rem' }}>
          {filtered.map((p, i) => (
            <div key={i} style={{ flex: '1 1 240px', cursor: 'pointer' }} className="group">
              <MediaPlaceholder aspect="aspect-[4/5]" label="Projektbild" shade={p.shade} />
              <div className="mt-4">
                <div className="nk-eyebrow mb-2" style={{ color: c.accent }}>
                  {p.kategori}
                </div>
                <div className="nk-display" style={{ color: c.text, fontSize: '1.2rem', lineHeight: 1.3 }}>
                  {p.titel}
                </div>
                <div className="mt-1" style={{ color: c.textMuted, fontSize: '0.85rem' }}>
                  {p.plats}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ────────────────────────────────────────────────────────────
// OM OSS
// ────────────────────────────────────────────────────────────
function Om({ setPage }) {
  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-28">
        <div className="nk-eyebrow mb-6" style={{ color: c.accent }}>
          Om Nordekor
        </div>
        <h1 className="nk-display max-w-5xl" style={{ color: c.text, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1.05 }}>
          Ett familjeföretag som tror på att <span style={{ fontStyle: 'italic', color: c.accent }}>göra arbetet rätt.</span>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-20 md:mb-28">
        <MediaPlaceholder aspect="aspect-[16/8]" label="Bild på Juan Carlos / arbetsplats" shade={1} />
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-24 md:pb-32">
        <div className="space-y-8" style={{ color: c.text, fontSize: '1.1rem', lineHeight: 1.8 }}>
          <p>
            Juan Carlos började som stuckatör 1986. Han lärde sig hantverket från grunden — det långsamma,
            tålmodiga arbetet som kräver både öga och hand. När han grundade Nordekor 2006 var idén enkel:
            ett företag där hantverket alltid kommer först.
          </p>
          <p>
            Idag drivs företaget vidare av familjen. Vi tar uppdrag av alla storlekar — från ett enskilt
            takrosetts-byte i en sekelskifteslägenhet till hela fasadrenoveringar. Vi väljer projekten efter
            vad vi kan göra bra, inte efter hur många vi kan ta in.
          </p>
          <p>
            Vi är inte det största stuckatörsföretaget i Stockholm. Det är inte heller målet. Målet är att
            varje rosett, varje list, varje fasad ska se rätt ut — både dagen vi går därifrån och om
            tjugo år.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', marginTop: '5rem' }}>
          <div style={{ flex: '1 1 180px' }}>
            <div className="nk-display" style={{ color: c.accent, fontSize: '3.5rem', fontWeight: 300, lineHeight: 1 }}>
              1986
            </div>
            <div className="nk-eyebrow mt-2" style={{ color: c.textSecondary }}>
              Juan Carlos började
            </div>
          </div>
          <div style={{ flex: '1 1 180px' }}>
            <div className="nk-display" style={{ color: c.accent, fontSize: '3.5rem', fontWeight: 300, lineHeight: 1 }}>
              2006
            </div>
            <div className="nk-eyebrow mt-2" style={{ color: c.textSecondary }}>
              Nordekor grundades
            </div>
          </div>
          <div style={{ flex: '1 1 180px' }}>
            <div className="nk-display" style={{ color: c.accent, fontSize: '3.5rem', fontWeight: 300, lineHeight: 1 }}>
              Sthlm
            </div>
            <div className="nk-eyebrow mt-2" style={{ color: c.textSecondary }}>
              Vi arbetar i hela länet
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: c.surface }} className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="nk-display mb-6" style={{ color: c.text, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 400 }}>
            Vill du veta mer?
          </h2>
          <button
            onClick={() => setPage('kontakt')}
            className="px-8 py-4 nk-eyebrow inline-flex items-center gap-3 transition-transform hover:translate-y-[-1px]"
            style={{ background: c.accent, color: c.bg, fontSize: '0.85rem' }}
          >
            Hör av dig
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

// ────────────────────────────────────────────────────────────
// KONTAKT
// ────────────────────────────────────────────────────────────
function Kontakt() {
  const [form, setForm] = useState({ namn: '', telefon: '', email: '', typ: '', meddelande: '' });
  const [skickat, setSkickat] = useState(false);

  const handleSubmit = () => {
    if (form.namn && form.email && form.meddelande) {
      setSkickat(true);
      setTimeout(() => setSkickat(false), 4000);
    }
  };

  return (
    <main>
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-12 md:pt-28">
        <div className="nk-eyebrow mb-6" style={{ color: c.accent }}>
          Kontakt
        </div>
        <h1 className="nk-display max-w-4xl mb-6" style={{ color: c.text, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 400, lineHeight: 1.05 }}>
          Hör av <span style={{ fontStyle: 'italic', color: c.accent }}>dig.</span>
        </h1>
        <p className="max-w-2xl" style={{ color: c.textSecondary, fontSize: '1.1rem', lineHeight: 1.7 }}>
          Berätta kort om ditt projekt så återkommer vi inom kort.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24 md:pb-32">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem' }}>
          {/* Kontaktinfo */}
          <div style={{ flex: '1 1 240px' }} className="space-y-10">
            <div>
              <div className="nk-eyebrow mb-3" style={{ color: c.accent }}>
                Telefon
              </div>
              <a href="tel:0704712278" className="nk-display block" style={{ color: c.text, fontSize: '1.25rem' }}>
                070 47 12 278
              </a>
              <a href="tel:0884487"  className="nk-display block mt-1" style={{ color: c.textSecondary, fontSize: '1rem' }}>
                08-84 48 79
              </a>
            </div>
            <div>
              <div className="nk-eyebrow mb-3" style={{ color: c.accent }}>
                E-post
              </div>
              <a href="mailto:info@nordekor.se" className="nk-display" style={{ color: c.text, fontSize: '1.25rem' }}>
                info@nordekor.se
              </a>
            </div>
            <div>
              <div className="nk-eyebrow mb-3" style={{ color: c.accent }}>
                Adress
              </div>
              <div className="nk-display" style={{ color: c.text, fontSize: '1.1rem', lineHeight: 1.5 }}>
                Örnbacken 28<br />
                126 51 Hägersten<br />
                Stockholm
              </div>
            </div>
            <div>
              <div className="nk-eyebrow mb-3" style={{ color: c.accent }}>
                Org.nr
              </div>
              <div style={{ color: c.textSecondary, fontSize: '1rem' }}>
                556751-0572
              </div>
            </div>
          </div>

          {/* Formulär */}
          <div style={{ flex: '2 1 400px', minWidth: 0 }}>
            <div className="space-y-5" style={{ background: c.surface, padding: '2.5rem', border: `1px solid ${c.border}` }}>
              <FormField
                label="Namn"
                value={form.namn}
                onChange={v => setForm({ ...form, namn: v })}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                <div style={{ flex: '1 1 180px' }}>
                  <FormField
                    label="Telefon"
                    value={form.telefon}
                    onChange={v => setForm({ ...form, telefon: v })}
                  />
                </div>
                <div style={{ flex: '1 1 180px' }}>
                  <FormField
                    label="E-post"
                    value={form.email}
                    onChange={v => setForm({ ...form, email: v })}
                  />
                </div>
              </div>
              <FormSelect
                label="Typ av projekt"
                value={form.typ}
                onChange={v => setForm({ ...form, typ: v })}
                options={['Stuckatur', 'Fasadarbeten', 'Brandtätning', 'Inomhusarbeten', 'Annat / vet ej']}
              />
              <FormField
                label="Beskriv ditt projekt"
                value={form.meddelande}
                onChange={v => setForm({ ...form, meddelande: v })}
                multiline
              />
              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-4 nk-eyebrow inline-flex items-center gap-3 transition-transform hover:translate-y-[-1px]"
                  style={{ background: c.accent, color: c.bg, fontSize: '0.85rem' }}
                >
                  Skicka förfrågan
                  <ArrowUpRight size={16} />
                </button>
              </div>
              {skickat && (
                <div className="nk-fade-up" style={{ color: c.accent, fontSize: '0.95rem' }}>
                  Tack! Vi återkommer så snart vi kan.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: c.surface }} className="aspect-[21/9] flex items-center justify-center" >
        <div className="text-center">
          <MapPin size={32} style={{ color: c.accent, margin: '0 auto 12px' }} />
          <div className="nk-display italic" style={{ color: c.textSecondary, fontSize: '1.05rem' }}>
            Karta över Hägersten
          </div>
          <div className="nk-eyebrow mt-2" style={{ color: c.textMuted }}>
            (Plats för Google Maps eller statisk kartbild)
          </div>
        </div>
      </section>
    </main>
  );
}

function FormField({ label, value, onChange, multiline }) {
  return (
    <div>
      <label className="nk-eyebrow block mb-2" style={{ color: c.textSecondary }}>
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={5}
          className="w-full px-4 py-3 outline-none transition-colors"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            color: c.text,
            fontSize: '1rem',
            fontFamily: 'Manrope, system-ui, sans-serif',
          }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full px-4 py-3 outline-none transition-colors"
          style={{
            background: c.bg,
            border: `1px solid ${c.border}`,
            color: c.text,
            fontSize: '1rem',
            fontFamily: 'Manrope, system-ui, sans-serif',
          }}
        />
      )}
    </div>
  );
}

function FormSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="nk-eyebrow block mb-2" style={{ color: c.textSecondary }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 outline-none"
        style={{
          background: c.bg,
          border: `1px solid ${c.border}`,
          color: value ? c.text : c.textMuted,
          fontSize: '1rem',
          fontFamily: 'Manrope, system-ui, sans-serif',
        }}
      >
        <option value="">— välj —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: c.text, color: c.bg }} className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ flex: '2 1 280px' }}>
            <div className="nk-display mb-4" style={{ fontSize: '1.75rem', fontWeight: 500 }}>
              Nordekor
            </div>
            <p style={{ color: c.surface, fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '24rem' }}>
              Familjeföretag i Stockholm. Stuckatur, fasader, brandtätning. Hantverk sedan 1986.
            </p>
          </div>
          <div style={{ flex: '1 1 160px' }}>
            <div className="nk-eyebrow mb-4" style={{ color: c.accent }}>
              Sajt
            </div>
            <div className="flex flex-col gap-3">
              {[
                { id: 'tjanster', label: 'Tjänster' },
                { id: 'projekt', label: 'Projekt' },
                { id: 'om', label: 'Om oss' },
                { id: 'kontakt', label: 'Kontakt' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setPage(item.id)}
                  className="text-left"
                  style={{ color: c.surface, fontSize: '0.95rem' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 220px' }}>
            <div className="nk-eyebrow mb-4" style={{ color: c.accent }}>
              Kontakt
            </div>
            <div className="flex flex-col gap-2" style={{ color: c.surface, fontSize: '0.95rem' }}>
              <span>070 47 12 278</span>
              <span>info@nordekor.se</span>
              <span>Örnbacken 28, 126 51 Hägersten</span>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-wrap justify-between gap-4" style={{ borderTop: `1px solid ${c.textSecondary}` }}>
          <div style={{ color: c.textMuted, fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} Nordekor AB · Org.nr 556751-0572
          </div>
          <div style={{ color: c.textMuted, fontSize: '0.85rem' }}>
            Hantverk sedan 1986
          </div>
        </div>
      </div>
    </footer>
  );
}

// ────────────────────────────────────────────────────────────
// APP
// ────────────────────────────────────────────────────────────
export default function NordekorSite() {
  const [page, setPage] = useState('hem');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,500&family=Manrope:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'hem': return <Hem setPage={setPage} />;
      case 'tjanster': return <Tjanster setPage={setPage} />;
      case 'projekt': return <Projekt setPage={setPage} />;
      case 'om': return <Om setPage={setPage} />;
      case 'kontakt': return <Kontakt setPage={setPage} />;
      default: return <Hem setPage={setPage} />;
    }
  };

  return (
    <div style={{ background: c.bg, color: c.text, minHeight: '100vh', fontFamily: 'Manrope, system-ui, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: fontCSS }} />
      <Header page={page} setPage={setPage} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {renderPage()}
      <Footer setPage={setPage} />
    </div>
  );
}
