// Frequency Systems — locked constants (BARGE-402). NEVER alter these numbers.
window.FREQ = window.FREQ || {};

window.FREQ.BARGE = {
  id: 'BARGE-402',
  length: '45m',
  beam: '10m',
  maxCargo: '1,482.6',      // T
  meanDraft: '12.45',       // ft
  accuracy: '±0.02',        // ft
  runtime: '14',            // minutes
  stations: ['FP', 'FS', 'MP', 'MS', 'AP', 'AS'],
};

window.FREQ.EMAIL = 'frequency.systems@outlook.com';

// Resolve an image to its inlined data-URI (deploy-safe) or fall back to the
// on-disk relative path. Accepts a bare filename or a '../../assets/x' path.
window.freqImg = function (ref) {
  var name = String(ref).replace(/^.*\//, '');
  return (window.FREQ_IMG && window.FREQ_IMG[name]) || ('assets/' + name);
};

// Six locked simulation phases. Telemetry drives the stage 1:1.
// `op` = what is physically happening this phase (kinetic caption on the stage).
window.FREQ.PHASES = [
  { name: 'Pre-Survey',        draft: '11.80', list: '0.0', fill: 0,   lidar: 'SCANNING', crane: 'STOWED',  stability: 'NOMINAL',    op: 'LiDAR sweeps the empty hull to fix the baseline draft across all six stations.' },
  { name: 'Ballast Adjustment',draft: '12.05', list: '0.4', fill: 8,   lidar: 'IDLE',     crane: 'STOWED',  stability: 'ADJUSTING',  op: 'Fore and aft ballast transfer levels the hull to even keel before loading.' },
  { name: 'Crane Position',    draft: '12.10', list: '0.6', fill: 14,  lidar: 'IDLE',     crane: 'SLEWING', stability: 'HOLD',       op: 'The crane slews into position and the hook descends over the open holds.' },
  { name: 'Cargo Load',        draft: '12.30', list: '1.1', fill: 64,  lidar: 'IDLE',     crane: 'LOADING', stability: 'DYNAMIC',    op: 'Cargo lowers into the holds — draft rises and list is tracked in real time.' },
  { name: 'Trim Correction',   draft: '12.42', list: '0.3', fill: 92,  lidar: 'IDLE',     crane: 'STOWED',  stability: 'CORRECTING', op: 'Trim converges toward zero as load distribution is balanced fore-to-aft.' },
  { name: 'Final Survey',      draft: '12.45', list: '0.0', fill: 100, lidar: 'SCANNING', crane: 'STOWED',  stability: 'LOCKED',     op: 'A full LiDAR sweep confirms and locks the final mean draft to ±0.02 ft.' },
];
