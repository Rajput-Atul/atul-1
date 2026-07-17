/**
 * ATUL-1 — Featured Projects Data
 *
 * Every project is represented as a discovered planet.
 */

import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'ems-01',
    name: 'Employee Management System',
    planetName: 'EMS-01',
    description: 'A comprehensive backend system for managing employee records, departments, and organizational workflows.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'REST API'],
    githubUrl: 'https://github.com/atulchauhan/ems',
    features: [
      'Employee CRUD operations',
      'Department management',
      'Attendance tracking',
      'Salary management',
      'RESTful API endpoints',
      'Input validation and exception handling',
    ],
    challenges: [
      'Designing normalized database schema',
      'Implementing complex relationships',
      'Ensuring data integrity',
    ],
    lessons: [
      'Database design is foundational',
      'Spring Boot simplifies rapid development',
      'API documentation is essential',
    ],
  },
  {
    id: 'lms-02',
    name: 'Library Management System',
    planetName: 'LMS-02',
    description: 'A digital library platform for managing books, members, borrowing operations, and inventory.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JPA/Hibernate'],
    githubUrl: 'https://github.com/atulchauhan/lms',
    features: [
      'Book catalog management',
      'Member registration',
      'Issue and return tracking',
      'Fine calculation',
      'Search functionality',
      'Dashboard analytics',
    ],
    challenges: [
      'Managing book availability state',
      'Fine calculation logic',
      'Optimizing search queries',
    ],
    lessons: [
      'State management is critical',
      'JPA simplifies database operations',
      'User experience matters even in backend',
    ],
  },
  {
    id: 'ecom-03',
    name: 'E-Commerce Backend API',
    planetName: 'ECOM-03',
    description: 'A scalable e-commerce backend with product management, cart operations, and order processing.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Docker'],
    githubUrl: 'https://github.com/atulchauhan/ecom-api',
    features: [
      'Product catalog',
      'Shopping cart',
      'Order management',
      'Payment integration',
      'Inventory tracking',
      'Redis caching',
    ],
    challenges: [
      'Handling concurrent orders',
      'Implementing caching strategies',
      'Ensuring data consistency',
    ],
    lessons: [
      'Redis improves performance dramatically',
      'Docker simplifies deployment',
      'Microservices require careful planning',
    ],
  },
  {
    id: 'acn-04',
    name: 'AC Nova Technologies',
    planetName: 'ACN-04',
    description: 'A microservices-based platform demonstrating scalable architecture patterns and cloud-native design.',
    technologies: ['Spring Boot', 'Microservices', 'Docker', 'Kubernetes', 'AWS'],
    githubUrl: 'https://github.com/atulchauhan/ac-nova',
    features: [
      'Microservices architecture',
      'API Gateway',
      'Service Discovery',
      'Docker containerization',
      'Kubernetes orchestration',
      'Cloud deployment',
    ],
    challenges: [
      'Service communication',
      'Data consistency across services',
      'Deployment complexity',
    ],
    lessons: [
      'Microservices solve some problems but create others',
      'Kubernetes is powerful but complex',
      'Cloud skills are essential for modern development',
    ],
  },
];