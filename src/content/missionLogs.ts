/**
 * ATUL-1 — Mission Logs Data
 *
 * Represents Atul Chauhan's learning journey as mission logs.
 * Instead of "I learned Java," we show "Mission Log 001: JAVA CORE SYSTEMS ONLINE."
 */

import type { MissionLog } from '@/types';

export const missionLogs: MissionLog[] = [
  {
    id: 'ml-001',
    title: 'JAVA CORE SYSTEMS',
    description: 'Core Java systems successfully activated. Object-oriented programming, data structures, and algorithms initialized.',
    status: 'completed',
    date: '2023-01',
    xp: 50,
  },
  {
    id: 'ml-002',
    title: 'SPRING BOOT FRAMEWORK',
    description: 'Spring Boot framework activated. Dependency injection, auto-configuration, and starter modules deployed.',
    status: 'completed',
    date: '2023-03',
    xp: 50,
  },
  {
    id: 'ml-003',
    title: 'DATABASE CONNECTION',
    description: 'Database connection established. MySQL and PostgreSQL integrated. JPA/Hibernate ORM synchronized.',
    status: 'completed',
    date: '2023-04',
    xp: 50,
  },
  {
    id: 'ml-004',
    title: 'REST API NETWORK',
    description: 'REST API network deployed. CRUD operations, request validation, exception handling, and API documentation online.',
    status: 'completed',
    date: '2023-05',
    xp: 50,
  },
  {
    id: 'ml-005',
    title: 'MICROSERVICES ARCHITECTURE',
    description: 'Microservices architecture under development. Service discovery, API gateway, and inter-service communication protocols being established.',
    status: 'in-progress',
    date: '2023-08',
    xp: 30,
  },
  {
    id: 'ml-006',
    title: 'DOCKER ENVIRONMENT',
    description: 'Docker environment ready. Containerization, Docker Compose, and image management systems operational.',
    status: 'completed',
    date: '2023-09',
    xp: 50,
  },
  {
    id: 'ml-007',
    title: 'CLOUD COMPUTING INITIATIVE',
    description: 'Cloud computing research initiated. AWS services, cloud architecture patterns, and deployment strategies being explored.',
    status: 'in-progress',
    date: '2024-01',
    xp: 30,
  },
  {
    id: 'ml-008',
    title: 'FRONTEND EXPLORATION',
    description: 'Frontend technologies exploration: React, Next.js, TypeScript, Three.js, and interactive UI systems.',
    status: 'in-progress',
    date: '2024-06',
    xp: 30,
  },
  {
    id: 'ml-009',
    title: 'AI INTEGRATION RESEARCH',
    description: 'Artificial intelligence integration research. Exploring machine learning APIs, NLP models, and intelligent automation.',
    status: 'in-progress',
    date: '2024-09',
    xp: 20,
  },
  {
    id: 'ml-010',
    title: 'SYSTEM DESIGN MASTERY',
    description: 'Advanced system design studies. Scalable architectures, distributed systems, caching strategies, and performance optimization.',
    status: 'in-progress',
    date: '2025-01',
    xp: 20,
  },
];