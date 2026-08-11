import { useId, useMemo, useState } from 'react';
import {
  generateWaveform,
  rms,
  toSvgPath,
  WAVEFORM_TYPES,
  type WaveformType,
} from '../lib/signal';
import './SignalLab.css';

const VIEW_WIDTH = 600;
const VIEW_HEIGHT = 220;
const SAMPLE_COUNT = 512;
const WINDOW_SECONDS = 1;

const WAVEFORM_LABELS: Record<WaveformType, string> = {
  sine: 'Sine',
  square: 'Square',
  sawtooth: 'Sawtooth',
  triangle: 'Triangle',
};

export default function SignalLab() {
  const [waveform, setWaveform] = useState<WaveformType>('sine');
  const [frequencyHz, setFrequencyHz] = useState(3);
  const [amplitude, setAmplitude] = useState(0.8);

  const frequencyId = useId();
  const amplitudeId = useId();

  const { path, level } = useMemo(() => {
    const samples = generateWaveform({
      type: waveform,
      frequencyHz,
      amplitude,
      sampleCount: SAMPLE_COUNT,
      durationSeconds: WINDOW_SECONDS,
    });
    return {
      path: toSvgPath(samples, VIEW_WIDTH, VIEW_HEIGHT),
      level: rms(samples),
    };
  }, [waveform, frequencyHz, amplitude]);

  return (
    <section className="lab" id="signal-lab" aria-label="Signal Lab">
      <header className="lab__head">
        <h2>Signal Lab</h2>
        <p>
          Shape a waveform in real time. Everything you see is computed by the
          same deterministic DSP core that powers our analysis pipeline.
        </p>
      </header>

      <div className="lab__scope" role="img" aria-label={`${WAVEFORM_LABELS[waveform]} waveform preview`}>
        <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="none">
          <line
            className="lab__axis"
            x1={0}
            y1={VIEW_HEIGHT / 2}
            x2={VIEW_WIDTH}
            y2={VIEW_HEIGHT / 2}
          />
          <path className="lab__trace" d={path} />
        </svg>
      </div>

      <div className="lab__waveforms" role="group" aria-label="Waveform type">
        {WAVEFORM_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            className={type === waveform ? 'lab__wave lab__wave--active' : 'lab__wave'}
            aria-pressed={type === waveform}
            onClick={() => setWaveform(type)}
          >
            {WAVEFORM_LABELS[type]}
          </button>
        ))}
      </div>

      <div className="lab__controls">
        <label className="lab__control" htmlFor={frequencyId}>
          <span>Frequency</span>
          <input
            id={frequencyId}
            type="range"
            min={1}
            max={12}
            step={1}
            value={frequencyHz}
            onChange={(event) => setFrequencyHz(Number(event.target.value))}
          />
          <output>{frequencyHz} Hz</output>
        </label>

        <label className="lab__control" htmlFor={amplitudeId}>
          <span>Amplitude</span>
          <input
            id={amplitudeId}
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={amplitude}
            onChange={(event) => setAmplitude(Number(event.target.value))}
          />
          <output>{amplitude.toFixed(2)}</output>
        </label>
      </div>

      <dl className="lab__metrics">
        <div>
          <dt>RMS level</dt>
          <dd data-testid="rms-value">{level.toFixed(3)}</dd>
        </div>
        <div>
          <dt>Window</dt>
          <dd>{WINDOW_SECONDS.toFixed(0)} s / {SAMPLE_COUNT} samples</dd>
        </div>
      </dl>
    </section>
  );
}
