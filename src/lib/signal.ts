export type WaveformType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export const WAVEFORM_TYPES: readonly WaveformType[] = [
  'sine',
  'square',
  'sawtooth',
  'triangle',
];

/**
 * Sample a single-cycle waveform at a given phase.
 * Phase is wrapped to [0, 1); the return value is normalized to [-1, 1].
 */
export function sampleWaveform(type: WaveformType, phase: number): number {
  const p = phase - Math.floor(phase);
  switch (type) {
    case 'sine':
      return Math.sin(2 * Math.PI * p);
    case 'square':
      return p < 0.5 ? 1 : -1;
    case 'sawtooth':
      return 2 * p - 1;
    case 'triangle':
      return p < 0.5 ? -1 + 4 * p : 3 - 4 * p;
    default: {
      // Exhaustiveness guard: adding a new WaveformType without handling it
      // here becomes a compile-time error.
      const exhaustive: never = type;
      throw new Error(`Unsupported waveform type: ${String(exhaustive)}`);
    }
  }
}

export interface WaveformParams {
  type: WaveformType;
  frequencyHz: number;
  amplitude: number;
  sampleCount: number;
  durationSeconds: number;
}

/**
 * Generate a series of amplitude-scaled samples for the given waveform over a
 * fixed time window. Deterministic and side-effect free so it can be unit tested.
 */
export function generateWaveform(params: WaveformParams): number[] {
  const { type, frequencyHz, amplitude, sampleCount, durationSeconds } = params;
  if (sampleCount < 2) {
    throw new Error('sampleCount must be at least 2');
  }
  const samples: number[] = new Array<number>(sampleCount);
  for (let i = 0; i < sampleCount; i += 1) {
    const t = (i / (sampleCount - 1)) * durationSeconds;
    const phase = frequencyHz * t;
    samples[i] = amplitude * sampleWaveform(type, phase);
  }
  return samples;
}

/** Root-mean-square level of a sample buffer, a common signal-strength metric. */
export function rms(samples: number[]): number {
  if (samples.length === 0) {
    return 0;
  }
  const sumSquares = samples.reduce((acc, value) => acc + value * value, 0);
  return Math.sqrt(sumSquares / samples.length);
}

/** Convert samples into an SVG path string mapped into a width x height box. */
export function toSvgPath(
  samples: number[],
  width: number,
  height: number,
): string {
  if (samples.length < 2) {
    return '';
  }
  const stepX = width / (samples.length - 1);
  const midY = height / 2;
  return samples
    .map((value, i) => {
      const x = i * stepX;
      const y = midY - value * midY;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}
