import { describe, expect, it } from 'vitest';
import {
  generateWaveform,
  rms,
  sampleWaveform,
  toSvgPath,
  WAVEFORM_TYPES,
  type WaveformParams,
} from './signal';

describe('sampleWaveform', () => {
  it('produces the expected sine values at key phases', () => {
    expect(sampleWaveform('sine', 0)).toBeCloseTo(0);
    expect(sampleWaveform('sine', 0.25)).toBeCloseTo(1);
    expect(sampleWaveform('sine', 0.75)).toBeCloseTo(-1);
  });

  it('produces a bipolar square wave', () => {
    expect(sampleWaveform('square', 0.1)).toBe(1);
    expect(sampleWaveform('square', 0.9)).toBe(-1);
  });

  it('ramps a sawtooth from -1 to 1', () => {
    expect(sampleWaveform('sawtooth', 0)).toBeCloseTo(-1);
    expect(sampleWaveform('sawtooth', 0.5)).toBeCloseTo(0);
  });

  it('peaks a triangle at the midpoint', () => {
    expect(sampleWaveform('triangle', 0)).toBeCloseTo(-1);
    expect(sampleWaveform('triangle', 0.5)).toBeCloseTo(1);
  });

  it('wraps phase into a single cycle', () => {
    expect(sampleWaveform('sine', 1.25)).toBeCloseTo(sampleWaveform('sine', 0.25));
  });

  it('stays within [-1, 1] for every waveform type', () => {
    for (const type of WAVEFORM_TYPES) {
      for (let phase = 0; phase < 1; phase += 0.01) {
        const value = sampleWaveform(type, phase);
        expect(value).toBeGreaterThanOrEqual(-1);
        expect(value).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe('generateWaveform', () => {
  const base: WaveformParams = {
    type: 'sine',
    frequencyHz: 2,
    amplitude: 0.5,
    sampleCount: 128,
    durationSeconds: 1,
  };

  it('returns the requested number of samples', () => {
    expect(generateWaveform(base)).toHaveLength(128);
  });

  it('scales output by amplitude', () => {
    const samples = generateWaveform({ ...base, type: 'square', amplitude: 0.5 });
    for (const value of samples) {
      expect(Math.abs(value)).toBeLessThanOrEqual(0.5 + 1e-9);
    }
  });

  it('throws when asked for fewer than two samples', () => {
    expect(() => generateWaveform({ ...base, sampleCount: 1 })).toThrow();
  });
});

describe('rms', () => {
  it('returns 0 for an empty buffer', () => {
    expect(rms([])).toBe(0);
  });

  it('computes the root-mean-square level', () => {
    expect(rms([3, 4])).toBeCloseTo(Math.sqrt((9 + 16) / 2));
  });
});

describe('toSvgPath', () => {
  it('returns an empty string for degenerate input', () => {
    expect(toSvgPath([], 100, 100)).toBe('');
    expect(toSvgPath([0.5], 100, 100)).toBe('');
  });

  it('starts with a move command and maps amplitude to the vertical center', () => {
    const path = toSvgPath([0, 1, -1], 200, 100);
    expect(path.startsWith('M0.00,50.00')).toBe(true);
    expect(path).toContain('L100.00,0.00');
    expect(path).toContain('L200.00,100.00');
  });
});
