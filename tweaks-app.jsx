/* YWdesign — Tweaks island. Renders the panel and applies values to :root. */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "oklch(0.84 0.185 152)",
  "displayFont": "Bricolage",
  "theme": "Dark",
  "surface": "Solid",
  "animations": true,
  "grid": true,
  "glow": 55,
  "work": "Stack"
}/*EDITMODE-END*/;

const FONT_MAP = {
  "Bricolage": '"Bricolage Grotesque"',
  "Unbounded": '"Unbounded"',
  "Grotesk":   '"Space Grotesk"'
};

const ACCENTS = [
  "oklch(0.84 0.185 152)", // spring green
  "oklch(0.82 0.13 205)",  // cyan
  "oklch(0.72 0.17 292)",  // violet
  "oklch(0.83 0.16 78)"    // amber
];

function App(){
  // Merge any previously-saved choices over the on-disk defaults so the home
  // page stays in sync with what the user last picked (and matches detail pages).
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem('yw-tweaks') || '{}'); } catch(e){}
  const [t, setTweak] = useTweaks({ ...TWEAK_DEFAULTS, ...saved });

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent', t.accent);
    root.style.setProperty('--display', FONT_MAP[t.displayFont] || FONT_MAP.Bricolage);
    root.style.setProperty('--glow', (t.glow / 100).toFixed(2));
    document.body.setAttribute('data-motion', t.animations ? 'full' : 'off');
    document.body.setAttribute('data-grid', t.grid ? 'on' : 'off');
    const themeVal = t.theme === 'Light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', themeVal);
    document.documentElement.setAttribute('data-theme', themeVal);
    document.body.setAttribute('data-surface', t.surface === 'Glass' ? 'glass' : 'solid');
    document.documentElement.setAttribute('data-surface', t.surface === 'Glass' ? 'glass' : 'solid');
    document.body.setAttribute('data-work', t.work === 'Grid' ? 'grid' : 'stack');
    if(window.__ywWork) setTimeout(window.__ywWork.apply, 0);
    try { localStorage.setItem('yw-tweaks', JSON.stringify(t)); } catch(e){}
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Appearance" />
      <TweakRadio label="Theme" value={t.theme}
                  options={['Dark', 'Light']}
                  onChange={(v) => setTweak('theme', v)} />
      <TweakRadio label="Surface" value={t.surface}
                  options={['Solid', 'Glass']}
                  onChange={(v) => setTweak('surface', v)} />

      <TweakSection label="Accent" />
      <TweakColor label="Color" value={t.accent} options={ACCENTS}
                  onChange={(v) => setTweak('accent', v)} />
      <TweakSlider label="Glow" value={t.glow} min={0} max={100} unit="%"
                   onChange={(v) => setTweak('glow', v)} />

      <TweakSection label="Type" />
      <TweakRadio label="Display font" value={t.displayFont}
                  options={['Bricolage', 'Unbounded', 'Grotesk']}
                  onChange={(v) => setTweak('displayFont', v)} />

      <TweakSection label="Layout" />
      <TweakRadio label="Work section" value={t.work}
                  options={['Stack', 'Grid']}
                  onChange={(v) => setTweak('work', v)} />

      <TweakSection label="Motion" />
      <TweakToggle label="Animations" value={t.animations}
                   onChange={(v) => setTweak('animations', v)} />
      <TweakToggle label="Grid backdrop" value={t.grid}
                   onChange={(v) => setTweak('grid', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweak-root')).render(<App />);
