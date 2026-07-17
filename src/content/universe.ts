/**
 * ATUL-1 — Universe Story Data
 *
 * Narrative assets, world lore, opening sequence, and story elements.
 * The opening sequence is cinematic — visuals and minimal text only.
 */

export const universe = {
  name: 'THE ATUL-1 DIGITAL UNIVERSE',
  codename: 'ATUL-1',
  classification: 'Interactive Sci-Fi Digital Experience',
  genre: ['Science Fiction', 'Technology', 'Exploration', 'Adventure', 'Interactive Storytelling'],
  year: '2150 AD',
  setting: `Human civilization has expanded far beyond Earth. Artificial Intelligence, Quantum Computing, Space Engineering, and Autonomous Systems have reshaped society. Software engineers are no longer just developers. They are Architects of Digital Civilizations.`,
  humanity: `Earth is still humanity's home. Thousands of research stations now orbit planets. Massive space stations connect distant galaxies. Artificial Intelligence manages entire infrastructures. Knowledge is the most valuable resource in the universe.`,
  shipPurpose: `The spacecraft exists to preserve engineering knowledge. Every project becomes an archive. Every skill becomes a technology module. Every experience becomes a mission record. Every lesson becomes part of the ship's knowledge base.`,
  visitorRole: `The visitor becomes Mission Explorer. Upon entering the experience, they awaken from cryosleep aboard ATUL-1. The AI greets them. The mission begins.`,
} as const;

export const openingSequence = [
  {
    scene: 1,
    title: 'Deep Space',
    // Visual: darkness, stars appearing, distant nebula light, slow particles, ship silhouette
    duration: 5000,
  },
  {
    scene: 2,
    title: 'Approach',
    // Visual: camera flies toward ship, hangar doors open, holographic lights activate, mechanical arms move
    duration: 5000,
  },
  {
    scene: 3,
    title: 'Boot Sequence',
    // Visual: holographic interfaces appear, energy pulses, radar scans, digital maps, environment comes alive
    duration: 5000,
  },
  {
    scene: 4,
    title: 'First Contact',
    // Visual: NOVA hologram materializes, particles assemble into figure, minimal dialogue
    dialogue: [
      'Welcome aboard, Mission Explorer.',
      'I am NOVA.',
      'ATUL-1 is now online.',
      'Preparing Digital Universe...',
    ],
    duration: 6000,
  },
] as const;

export const shipPersonality = {
  feelsAlive: true,
  behaviors: [
    'Doors open automatically',
    'Lights react to presence',
    'Displays update independently',
    'Particles move continuously',
    'Reactors pulse rhythmically',
    'Engines hum softly',
    'Robotic drones patrol hallways',
  ],
  design: {
    style: 'Minimal, Elegant, Futuristic, Premium',
    inspiration: 'Deep-space research vessels rather than military ships',
    materials: ['Dark titanium', 'Carbon fiber', 'Brushed aluminum', 'Transparent glass', 'Blue holographic panels', 'White illuminated pathways', 'Soft cyan lighting'],
    windows: 'Large panoramic windows showing space',
  },
} as const;

export const emotionalJourney = {
  beginning: 'Curiosity',
  middle: ['Exploration', 'Discovery', 'Learning'],
  end: 'Inspiration',
} as const;

export const finalCinematic = {
  location: 'Observation Deck',
  description: `NOVA guides the visitor to the Observation Deck.
A giant panoramic window overlooks a vibrant galaxy.
Stars drift silently.
The engines begin to glow.

NOVA says:
"Mission Complete. Thank you for exploring ATUL-1. Knowledge grows through curiosity. Innovation begins with imagination. Safe travels, Explorer."

The camera slowly exits the spacecraft.
ATUL-1 accelerates into deep space.
A warp effect fills the screen.
Fade to black.
End credits appear.`,
} as const;

export const outsideUniverse = [
  'Infinite stars',
  'Colorful nebulae',
  'Spiral galaxies',
  'Ring planets',
  'Gas giants',
  'Asteroid fields',
  'Satellites',
  'Space stations',
  'Black holes in the far distance',
  'Comets crossing the sky',
  'Aurora-like cosmic energy',
] as const;

export const storytellingMethods = [
  'Mission Reports',
  'Research Files',
  'AI Dialogue',
  'Holographic Records',
  'Archived Logs',
  'Interactive Consoles',
  'Environmental Details',
] as const;

export const navigationFeel = [
  'Doors',
  'Elevators',
  'Corridors',
  'Observation windows',
  'Transport tubes',
  'Holographic maps',
] as const;