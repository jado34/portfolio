export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  gradient: string;
  visualType: 'chart' | 'audio' | 'tokens' | 'audit';
  needId: 'design-tokens' | 'high-performance' | 'optimization' | 'creative';
}

export const projects: Project[] = [
  {
    id: 'tokens-pipeline',
    title: 'Figma to Code Design System',
    role: 'Product Designer & Frontend Developer',
    description: 'Setting up shared design libraries in Figma and automatically converting design variables into production-ready React styles.',
    longDescription: 'Created an automated system that extracts colors, spacing, typography, and theme tokens directly from Figma design files and translates them into CSS custom properties and React components. This keeps the design and codebase in perfect sync, reducing manual handoff time from hours to seconds.',
    tags: ['Figma', 'React', 'CSS Variables', 'Design Systems', 'JavaScript'],
    year: '2025',
    gradient: '#FAF3EE',
    visualType: 'tokens',
    needId: 'design-tokens'
  },
  {
    id: 'real-estate-os',
    title: 'The Real Estate Operating System',
    role: 'Product Engineer (Expert)',
    description: 'A unified, high-fidelity real estate workspace replacing a dozen CRMs, calendars, and spreadsheets with a single quiet, premium surface.',
    longDescription: 'Designed and engineered a frosted-glass workspace that unifies CRM data, agent metrics, showing calendars, and custom AI tools. Resolved complex navigation overlaps and source design collisions to deliver a quiet, high-conversion broker experience using Albert Sans and an action-focused electric blue theme.',
    tags: ['SaaS', 'Systems Architecture', 'TypeScript', 'Analytics', 'UX Optimization'],
    year: '2025',
    gradient: '#FAF8F5',
    visualType: 'audit',
    needId: 'high-performance'
  },
  {
    id: 'ux-telemetry',
    title: 'User Experience Analytics Tool',
    role: 'Product Designer Designer & Developer',
    description: 'A custom dashboard tracking how users navigate web pages, identifying layout bugs, and pinpointing slow loading elements.',
    longDescription: 'Designed and built an internal analytics application that monitors page performance and user interactions. Developed interactive chart visualizations to display Cumulative Layout Shift (CLS) and input delays, allowing teams to quickly find and resolve visual layout bugs.',
    tags: ['Figma', 'TypeScript', 'CSS Grid', 'Data Charts', 'Product Designer Design'],
    year: '2024',
    gradient: '#F4EEFA',
    visualType: 'audit',
    needId: 'optimization'
  },
  {
    id: 'gesture-audio',
    title: 'Interactive Music & Sound App',
    role: 'Frontend Developer & Designer',
    description: 'An interactive web-based music experience featuring custom audio visualization and smooth, mouse-reactive gestures.',
    longDescription: 'Developed an audio playground app experimenting with micro-interactions, canvas-rendered sound waves, and smooth motion effects. Implemented responsive gesture tracking to create custom visual feedback as users control playback and volume.',
    tags: ['HTML Canvas', 'Web Audio', 'GSAP', 'CSS Transitions', 'Product Designer Design'],
    year: '2023',
    gradient: '#EDFAF0',
    visualType: 'audio',
    needId: 'creative'
  },
  {
    id: 'aunty-elewa',
    title: 'Aunty Elewa: Build-Your-Plate',
    role: 'Product Engineer & Systems Architect',
    description: 'From WhatsApp voice notes to a high-fidelity, build-your-plate catering ordering experience for busy Lagos corporate workers.',
    longDescription: 'Designed and engineered a dark, moody ordering experience that replaces manual WhatsApp back-and-forth negotiations with a frictionless, category-based plate builder. Solved complex additive pricing and visual navigation loops to deliver a quiet, high-conversion food checkout.',
    tags: ['Interaction Design', 'TypeScript', 'State Management', 'Tailored Commerce', 'UX Optimization'],
    year: '2025',
    gradient: 'linear-gradient(135deg, #16120e 0%, #25170d 100%)',
    visualType: 'audit',
    needId: 'high-performance'
  }
];
