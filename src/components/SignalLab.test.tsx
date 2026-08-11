import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignalLab from './SignalLab';

describe('<SignalLab />', () => {
  it('renders the default sine waveform as pressed', () => {
    render(<SignalLab />);
    expect(screen.getByRole('button', { name: 'Sine' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('switches the active waveform when a type is selected', async () => {
    const user = userEvent.setup();
    render(<SignalLab />);

    const squareButton = screen.getByRole('button', { name: 'Square' });
    await user.click(squareButton);

    expect(squareButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Sine' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('recomputes the RMS metric when amplitude changes', () => {
    render(<SignalLab />);

    const before = screen.getByTestId('rms-value').textContent;
    const amplitude = screen.getByLabelText('Amplitude');

    // Drive the range slider to its minimum; RMS must fall to zero.
    fireEvent.change(amplitude, { target: { value: '0' } });

    const after = screen.getByTestId('rms-value').textContent;
    expect(after).not.toBe(before);
    expect(after).toBe('0.000');
  });
});
