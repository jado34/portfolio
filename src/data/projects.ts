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
    id: 'greenlume',
    title: 'GreenLume Mobile App',
    role: 'React Native & Mobile UX Developer',
    description: 'A React Native and Supabase habit tracker app designed to turn personal sustainability actions into daily rewarding habits.',
    longDescription: 'Engineered the mobile experience behind a personal sustainability habit tracker app. Built real-time gamified tracking loops, photo verification logic, and a dynamic plant growth nursery using React Native, Expo, and Supabase.',
    tags: ['React Native', 'Expo', 'Supabase', 'Mobile Dev', 'UX Decisions'],
    year: '2026',
    gradient: 'linear-gradient(135deg, #102a1e 0%, #1c4532 100%)',
    visualType: 'audit',
    needId: 'design-tokens'
  },
  {
    id: 'real-estate-os',
    title: 'The Real Estate Operating System',
    role: 'Product Designer',
    description: 'A unified, high-fidelity real estate workspace replacing a dozen CRMs, calendars, and spreadsheets with a single quiet, premium surface.',
    longDescription: 'Designed a frosted-glass workspace that unifies CRM data, agent metrics, showing calendars, and custom AI tools. Resolved complex navigation overlaps and source design collisions to deliver a quiet, high-conversion broker experience using Albert Sans and an action-focused electric blue theme.',
    tags: ['SaaS', 'Systems Architecture', 'Figma Prototyping', 'Analytics UX', 'UX Optimization'],
    year: '2025',
    gradient: '#FAF8F5',
    visualType: 'audit',
    needId: 'high-performance'
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
    role: 'Product Designer and Front-End Developer',
    description: 'From WhatsApp voice notes to a high-fidelity, build-your-plate catering ordering experience for busy Lagos corporate workers.',
    longDescription: 'Designed and engineered a dark, moody ordering experience that replaces manual WhatsApp back-and-forth negotiations with a frictionless, category-based plate builder. Solved complex additive pricing and visual navigation loops to deliver a quiet, high-conversion food checkout.',
    tags: ['Interaction Design', 'TypeScript', 'State Management', 'Tailored Commerce', 'UX Optimization'],
    year: '2026',
    gradient: 'linear-gradient(135deg, #16120e 0%, #25170d 100%)',
    visualType: 'audit',
    needId: 'high-performance'
  }
];
