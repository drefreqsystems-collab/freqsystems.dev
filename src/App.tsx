import SignalLab from './components/SignalLab';
import './App.css';

const FEATURES = [
  {
    title: 'Real-time analysis',
    body: 'Stream millions of samples per second through a deterministic DSP core with sub-millisecond latency budgets.',
  },
  {
    title: 'Composable pipelines',
    body: 'Chain filters, transforms, and detectors as pure functions. Test every stage in isolation, ship with confidence.',
  },
  {
    title: 'Runs anywhere',
    body: 'The same TypeScript primitives run in the browser, at the edge, and on the server — no native rebuilds required.',
  },
] as const;

export default function App() {
  return (
    <div className="page">
      <header className="topbar">
        <a className="brand" href="#top">
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__name">Freq Systems</span>
        </a>
        <nav className="topbar__nav">
          <a href="#signal-lab">Signal Lab</a>
          <a href="#features">Platform</a>
          <a className="topbar__cta" href="#signal-lab">
            Try it live
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <p className="hero__eyebrow">Signal infrastructure</p>
          <h1 className="hero__title">
            Frequency analysis,
            <br />
            engineered for the web.
          </h1>
          <p className="hero__subtitle">
            Freq Systems gives engineering teams a deterministic, fully testable
            toolkit for generating, transforming, and visualizing signals — from
            prototype to production.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#signal-lab">
              Launch Signal Lab
            </a>
            <a className="btn btn--ghost" href="#features">
              Explore the platform
            </a>
          </div>
        </section>

        <SignalLab />

        <section className="features" id="features">
          <h2 className="features__title">Built for signal teams</h2>
          <div className="features__grid">
            {FEATURES.map((feature) => (
              <article className="feature" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Freq Systems</span>
        <span>freqsystems.dev</span>
      </footer>
    </div>
  );
}
