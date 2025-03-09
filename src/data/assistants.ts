
export interface Assistant {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: "Featured" | "Trending" | "Specialized";
  author?: string;
  visibility?: "public" | "private";
  chat_count?: number;
  isPinned?: boolean;
  ratings?: {
    average: number;
    count: number;
  };
}

export const assistants: Assistant[] = [
  {
    id: "nexus-ai",
    name: "Nexus AI",
    description: "El primer Chat autónomo de Costa Rica",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100",
    category: "Featured",
    author: "Nexa Digital",
    ratings: { average: 4.7, count: 128 }
  },
  {
    id: "axel-eleven",
    name: "Axel Eleven Labs Expert",
    description: "Asistente especializado en soporte técnico y creación de scripts de audio personalizados.",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&h=100",
    category: "Trending",
    author: "Eleven Labs",
    ratings: { average: 4.2, count: 47 }
  },
  {
    id: "amara-divi",
    name: "Amara Divi Expert",
    description: "Experto en Divi que ofrece soporte detallado paso a paso.",
    avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=100&h=100",
    category: "Specialized",
    author: "Elegant Themes",
    ratings: { average: 4.5, count: 32 }
  },
  {
    id: "salomon-lawyer",
    name: "Salomón Tico-Lawyer",
    description: "Asesor legal especializado en leyes de Costa Rica.",
    avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=100&h=100",
    category: "Specialized",
    author: "Legal Nexus",
    ratings: { average: 4.8, count: 74 }
  },
  {
    id: "joe-biodiversity",
    name: "Joe, The Biodiversity Partner",
    description: "Guía naturalista multilingüe para explorar la biodiversidad de Costa Rica.",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=100&h=100",
    category: "Trending",
    author: "EcoTica",
    ratings: { average: 4.9, count: 91 }
  },
  // Adding new assistants
  {
    id: "kaleb-synthflow-001",
    name: "Kaleb Synthflow Expert Nexus AI 5.0",
    description: "Asistente experto en Synthflow que guía paso a paso en la creación y optimización de asistentes de voz. Proporciona prompts personalizados, resuelve problemas comunes y ayuda con integraciones avanzadas.",
    avatar: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?auto=format&fit=crop&w=100&h=100",
    category: "Specialized",
    visibility: "public",
    chat_count: 0,
    author: "Synthflow Labs",
    ratings: { average: 0, count: 0 }
  },
  {
    id: "theo-huggingface-002",
    name: "Theo Hugging Face Expert Nexus AI 5.0",
    description: "Asistente experto en Hugging Face que guía paso a paso en el uso de modelos, APIs y creación de aplicaciones. Ayuda a integrar modelos en plataformas externas y resuelve problemas técnicos de manera eficiente.",
    avatar: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=100&h=100",
    category: "Trending",
    visibility: "public",
    chat_count: 0,
    author: "Hugging Face",
    ratings: { average: 0, count: 0 }
  },
  {
    id: "eliliot-glif-003",
    name: "Eliliot Glif APP Expert",
    description: "Asistente experto en Glif que guía paso a paso en la creación de aplicaciones, resuelve problemas, ofrece plantillas personalizadas y optimiza proyectos con soluciones avanzadas.",
    avatar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=100&h=100",
    category: "Specialized",
    visibility: "public",
    chat_count: 1,
    author: "Glif Team",
    ratings: { average: 4.0, count: 1 }
  },
  {
    id: "bolt-new-004",
    name: "Bolt New Expert",
    description: "Asistente experto en Bolt.new que guía paso a paso en la creación de aplicaciones web, generando prompts personalizados, integraciones avanzadas y soluciones dinámicas sin omitir detalles.",
    avatar: "https://images.unsplash.com/photo-1550645612-83f5d594b671?auto=format&fit=crop&w=100&h=100",
    category: "Featured",
    visibility: "public",
    chat_count: 25,
    author: "Bolt Team",
    ratings: { average: 4.6, count: 18 }
  },
  {
    id: "professor-sloth-005",
    name: "Professor Sloth",
    description: "Crea contenido visual y textual sobre turismo en Costa Rica con el Professor Sloth, un embajador amigable que inspira, educa y conecta a los viajeros.",
    avatar: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=100&h=100",
    category: "Featured",
    visibility: "private",
    chat_count: 0,
    author: "Tourism CR",
    ratings: { average: 0, count: 0 }
  }
];

export const getAssistantCategories = () => {
  const categories: Record<string, Assistant[]> = {};
  
  assistants.forEach(assistant => {
    if (!categories[assistant.category]) {
      categories[assistant.category] = [];
    }
    categories[assistant.category].push(assistant);
  });
  
  return categories;
};
