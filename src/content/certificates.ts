/**
 * ATUL-1 — Certificates Data
 *
 * Certificates represented as floating holographic vaults.
 */

import type { Certificate } from '@/types';

export const certificates: Certificate[] = [
  {
    id: 'cert-001',
    title: 'Java Programming Certification',
    issuer: 'Oracle',
    date: '2023-01',
    skills: ['Java', 'OOP', 'Data Structures'],
    url: 'https://example.com/cert/java',
  },
  {
    id: 'cert-002',
    title: 'Spring Boot Developer Certification',
    issuer: 'VMware',
    date: '2023-04',
    skills: ['Spring Boot', 'REST API', 'Microservices'],
    url: 'https://example.com/cert/spring',
  },
  {
    id: 'cert-003',
    title: 'MySQL Database Administration',
    issuer: 'Oracle',
    date: '2023-05',
    skills: ['MySQL', 'Database Design', 'SQL'],
    url: 'https://example.com/cert/mysql',
  },
  {
    id: 'cert-004',
    title: 'Docker Containerization',
    issuer: 'Docker Inc.',
    date: '2023-09',
    skills: ['Docker', 'Containerization', 'DevOps'],
    url: 'https://example.com/cert/docker',
  },
  {
    id: 'cert-005',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024-02',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure'],
    url: 'https://example.com/cert/aws',
  },
];

export const currentLearning = [
  {
    id: 'learn-001',
    name: 'Spring Security',
    category: 'frameworks',
    status: 'in-progress',
    description: 'Advanced security configurations, JWT, OAuth2, and role-based access control.',
  },
  {
    id: 'learn-002',
    name: 'Microservices Architecture',
    category: 'architecture',
    status: 'in-progress',
    description: 'Service mesh, API gateway patterns, event-driven architecture, and distributed systems.',
  },
  {
    id: 'learn-003',
    name: 'AWS Advanced',
    category: 'cloud',
    status: 'in-progress',
    description: 'EC2, S3, RDS, Lambda, IAM, VPC, and cloud-native application patterns.',
  },
  {
    id: 'learn-004',
    name: 'Kubernetes',
    category: 'devops',
    status: 'in-progress',
    description: 'Container orchestration, deployments, services, and cluster management.',
  },
  {
    id: 'learn-005',
    name: 'System Design',
    category: 'architecture',
    status: 'in-progress',
    description: 'Scalable architectures, caching strategies, load balancing, and distributed systems design.',
  },
  {
    id: 'learn-006',
    name: 'AI Integration',
    category: 'other',
    status: 'in-progress',
    description: 'Machine learning APIs, NLP models, and intelligent automation in enterprise applications.',
  },
  {
    id: 'learn-007',
    name: 'Three.js & 3D Web',
    category: 'frameworks',
    status: 'in-progress',
    description: 'WebGL, React Three Fiber, shaders, particle systems, and immersive experiences.',
  },
  {
    id: 'learn-008',
    name: 'React Three Fiber',
    category: 'frameworks',
    status: 'in-progress',
    description: 'Declarative 3D graphics, scene composition, and interactive 3D UI components.',
  },
];