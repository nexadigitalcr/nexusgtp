
export interface Assistant {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: "Featured" | "Trending" | "Specialized";
  author?: string;
}

export const assistants: Assistant[] = [
  {
    id: "nexus-ai",
    name: "Nexus AI",
    description: "El primer Chat autónomo de Costa Rica",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100",
    category: "Featured"
  },
  {
    id: "axel-eleven",
    name: "Axel Eleven Labs Expert",
    description: "Asistente especializado en soporte técnico y creación de scripts de audio personalizados.",
    avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=100&h=100",
    category: "Trending"
  },
  {
    id: "amara-divi",
    name: "Amara Divi Expert",
    description: "Experto en Divi que ofrece soporte detallado paso a paso.",
    avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=100&h=100",
    category: "Specialized"
  },
  {
    id: "salomon-lawyer",
    name: "Salomón Tico-Lawyer",
    description: "Asesor legal especializado en leyes de Costa Rica.",
    avatar: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=100&h=100",
    category: "Specialized"
  },
  {
    id: "joe-biodiversity",
    name: "Joe, The Biodiversity Partner",
    description: "Guía naturalista multilingüe para explorar la biodiversidad de Costa Rica.",
    avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=100&h=100",
    category: "Trending"
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
