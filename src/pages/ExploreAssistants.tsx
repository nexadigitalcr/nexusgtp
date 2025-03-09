
import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Assistant {
  id: string;
  name: string;
  description: string;
  avatar: string;
  author?: string;
  category?: string;
}

interface CategorySection {
  title: string;
  description: string;
  assistants: Assistant[];
}

const ExploreAssistants = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for assistants categories
  const categories: CategorySection[] = [
    {
      title: "Shared with Me",
      description: "Asistentes compartidos contigo por otros usuarios",
      assistants: [
        {
          id: "1",
          name: "GPT Tech Advisor",
          description: "Experto en tecnología y soluciones digitales",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png",
          author: "TechSolutions"
        }
      ]
    },
    {
      title: "Popular at Nexus Digital",
      description: "Los asistentes más populares este mes",
      assistants: [
        {
          id: "2",
          name: "Data Analysis Pro",
          description: "Análisis avanzado de datos y visualizaciones",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png",
          author: "DataTeam"
        },
        {
          id: "3",
          name: "Marketing Expert",
          description: "Estrategias de marketing digital y growth hacking",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png",
          author: "GrowthLab"
        },
        {
          id: "4",
          name: "UX/UI Designer",
          description: "Diseño de interfaces y experiencia de usuario",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png",
          author: "DesignStudio"
        }
      ]
    },
    {
      title: "Featured",
      description: "Asistentes destacados por nuestro equipo",
      assistants: [
        {
          id: "5",
          name: "Sporto",
          description: "Experto en deportes y entrenamiento personal",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        },
        {
          id: "6",
          name: "Cosmic Explorer",
          description: "Información sobre el universo y astronomía",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        },
        {
          id: "7",
          name: "AI Art Director",
          description: "Generación de arte digital con IA",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        }
      ]
    },
    {
      title: "Trending",
      description: "Los más populares esta semana",
      assistants: [
        {
          id: "8",
          name: "Financial Advisor",
          description: "Consejos financieros y planificación",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        },
        {
          id: "9",
          name: "Recipe Master",
          description: "Recetas y consejos culinarios",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        }
      ]
    },
    {
      title: "By NexusGPT",
      description: "Creados por nuestro equipo interno",
      assistants: [
        {
          id: "10",
          name: "Code Helper",
          description: "Asistencia para programación y desarrollo",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        },
        {
          id: "11",
          name: "Math Tutor",
          description: "Ayuda con problemas matemáticos",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        }
      ]
    },
    {
      title: "DALL-E",
      description: "Asistentes especializados en generación de imágenes",
      assistants: [
        {
          id: "12",
          name: "DALL-E Artist",
          description: "Genera imágenes artísticas con descripción",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        },
        {
          id: "13",
          name: "Product Visualizer",
          description: "Visualiza productos y diseños",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        }
      ]
    },
    {
      title: "Writing",
      description: "Asistentes para escritura y creación de contenido",
      assistants: [
        {
          id: "14",
          name: "Content Writer",
          description: "Crea contenido para blogs y redes sociales",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        },
        {
          id: "15",
          name: "Story Creator",
          description: "Crea historias y narrativas",
          avatar: "/lovable-uploads/2bafb16e-c8c8-4c27-bc34-c18e847d73d3.png"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-chatgpt-main text-white pb-10">
      {/* Header with search */}
      <div className="sticky top-0 z-10 bg-chatgpt-main/95 backdrop-blur border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-3">Explorar Asistentes</h1>
          <p className="text-sm text-gray-400 mb-4">
            Navega por nuestra colección curada de GPTs, o crea uno tú mismo. Los GPTs son versiones personalizadas de Nexus AI especializadas en diferentes temas.
          </p>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar GPTs"
                className="w-full pl-10 py-2 bg-chatgpt-secondary/50 rounded-md border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent border-white/10 hover:bg-chatgpt-secondary/50">
              <Filter className="h-4 w-4" />
              <span>Filtros</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {categories.map((category) => (
          <div key={category.title} className="mb-12">
            <div className="mb-4">
              <h2 className="text-lg font-medium">{category.title}</h2>
              <p className="text-xs text-gray-400">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.assistants.map((assistant) => (
                <div 
                  key={assistant.id}
                  className="bg-chatgpt-secondary rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex-shrink-0">
                      <img src={assistant.avatar} alt={assistant.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{assistant.name}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{assistant.description}</p>
                      {assistant.author && (
                        <p className="text-xs text-gray-500 mt-1">By {assistant.author}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-2 text-center">
              <button className="text-sm text-gray-400 hover:text-white">
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreAssistants;
