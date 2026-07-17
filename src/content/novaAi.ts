/**
 * ATUL-1 — NOVA AI Assistant Character Profile
 *
 * NOVA is the intelligent holographic assistant aboard ATUL-1.
 * She guides visitors, explains systems, and provides navigation.
 */

export const novaProfile = {
  name: 'NOVA',
  fullName: 'Navigational Operating Voice Assistant',
  personality: {
    primary: ['Professional', 'Calm', 'Intelligent', 'Scientific', 'Friendly', 'Minimal'],
    never: ['Overly dramatic', 'Overly robotic', 'Sarcastic', 'Arrogant', 'Overwhelming'],
    role: 'Guide, Navigator, Archivist, Research Assistant, Storyteller',
  },
  visualDesign: {
    appearance: 'Floating holographic orb with blue energy core',
    features: [
      'Animated rings',
      'Particle effects',
      'Soft glow',
      'Holographic distortion',
      'Breathing animation',
    ],
    advanced: 'Optional humanoid hologram projection',
  },
  behaviors: {
    idle: [
      'Gentle floating',
      'Breathing glow',
      'Soft energy pulses',
      'Random scanning animations',
    ],
    active: [
      'Looks toward active content',
      'Responds to interactions',
      'Highlights important systems',
      'Provides mission updates',
    ],
  },
  greetings: {
    firstVisit: `Welcome aboard ATUL-1.\n\nI am NOVA.\n\nThis vessel contains the engineering archives, projects, research logs, and technological discoveries of Atul Chauhan.\n\nMission Explorer detected.\n\nInitialization complete.\n\nYou may begin your journey.`,
  },
  contextDialogue: {
    'launch-bay': 'Welcome to the Launch Bay. This is where all missions begin. From here, you can explore the ATUL-1 Digital Universe.',
    'earth-archive': 'The Earth Archive contains the personal archives of Atul Chauhan. Explore the holographic memories to understand his journey.',
    'research-lab': 'This laboratory contains technology modules representing the core systems used by Atul Chauhan. Hover over modules to learn more.',
    'mission-control': 'Mission Control contains active and completed projects. Select a planetary archive to begin exploration.',
    'engineering-core': 'The Engineering Core shows technologies currently being researched. Each experiment is actively in progress.',
    'quantum-vault': 'The Quantum Vault contains certified achievements. Each crystal represents a milestone in Atul\'s journey.',
    'communication-array': 'The Communication Array allows you to send transmissions to Atul Chauhan. All messages are received directly.',
    'observation-deck': 'Few explorers reach this far. Take a moment to enjoy the view. The galaxy stretches infinitely before you.',
  },
  quickActions: [
    'Show Projects',
    'Explore Skills',
    'Open GitHub',
    'Contact Atul',
    'Begin Tour',
    'Show Mission Logs',
  ],
  knowledgeBase: {
    whoIsAtul: 'Atul Chauhan is a Software Engineer from Mumbai, India. He specializes in Java, Spring Boot, and backend development.',
    technologies: 'Atul works with Java, Spring Boot, TypeScript, React, Next.js, MySQL, Redis, Docker, and microservices.',
    currentLearning: 'Atul is currently studying Spring Security, microservices, Docker, AWS, Kubernetes, system design, AI integration, and 3D web technologies.',
  },
} as const;