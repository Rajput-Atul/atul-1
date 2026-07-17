/**
 * ATUL-1 — Personal Profile Data
 *
 * Central repository for Atul Chauhan's personal information.
 * All components should reference this data for consistency.
 */

export const profile = {
  name: 'Atul Chauhan',
  knownAs: 'Commander Atul',
  digitalIdentity: 'Founder of ATUL-1',
  title: 'Software Engineer',
  roles: [
    'Software Engineer',
    'Java Backend Developer',
    'Spring Boot Developer',
    'Creative Technologist',
    'System Architect',
    'Technology Explorer',
  ],
  nationality: 'Indian',
  location: 'Mumbai, Maharashtra, India',
  email: 'atul@example.com',
  social: {
    github: 'https://github.com/atulchauhan',
    linkedin: 'https://linkedin.com/in/atulchauhan',
    email: 'mailto:atul@example.com',
  },
  motto: {
    line1: 'Code with Purpose.',
    line2: 'Design with Imagination.',
    line3: 'Build Experiences that Inspire.',
  },
  mission: {
    statement: 'Build software that is scalable. Create experiences that people remember.',
    values: [
      'Never stop learning.',
      'Never stop experimenting.',
      'Always improve.',
      'Always build something better than yesterday.',
    ],
  },
  vision: [
    'Enterprise Platforms',
    'Cloud Native Systems',
    'AI Applications',
    'Modern SaaS Products',
    'Interactive Web Experiences',
    'High Performance Applications',
    'Beautiful User Interfaces',
    'Immersive Digital Worlds',
  ],
  personality: [
    'Confidence',
    'Curiosity',
    'Intelligence',
    'Creativity',
    'Precision',
    'Engineering',
    'Innovation',
    'Professionalism',
    'Calmness',
    'Attention to Detail',
  ],
  brandPersonality: {
    engineer: 70,
    designer: 20,
    explorer: 10,
  },
  philosophy: [
    'Software should solve problems.',
    'Design should create emotions.',
    'Technology should inspire curiosity.',
    'Learning should never stop.',
    'Every project should teach something new.',
  ],
  whoAmI: `I am not simply a software developer. I am an engineer who enjoys solving problems, building scalable systems, and creating experiences that combine technology with creativity. My interests extend beyond backend development. I enjoy exploring modern web technologies, interactive design, 3D graphics, AI, cloud computing, and software architecture. This portfolio represents both my technical work and my curiosity to experiment with new ideas.`,
} as const;