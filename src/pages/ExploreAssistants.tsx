
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { assistants, getAssistantCategories, type Assistant } from '@/data/assistants';
import AssistantCard from '@/components/AssistantCard';

const ExploreAssistants = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAssistants, setFilteredAssistants] = useState<Assistant[]>(assistants);
  const [categories, setCategories] = useState<Record<string, Assistant[]>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    // Get categories with their assistants
    setCategories(getAssistantCategories());
  }, []);

  useEffect(() => {
    // Apply search and category filters
    let result = [...assistants];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        assistant => 
          assistant.name.toLowerCase().includes(query) || 
          assistant.description.toLowerCase().includes(query) ||
          assistant.category.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected category
    if (selectedCategory) {
      result = result.filter(assistant => assistant.category === selectedCategory);
    }
    
    setFilteredAssistants(result);
  }, [searchQuery, selectedCategory]);

  const handleAssistantSelect = (assistant: Assistant) => {
    console.log(`Selected assistant: ${assistant.name}`);
    // Here we would typically update some context or state and redirect
    // For now, we'll just navigate to the main page with the assistant as a parameter
    window.location.href = `/?assistant=${assistant.id}`;
  };

  const renderAssistantsByCategory = () => {
    if (selectedCategory) {
      // If a category is selected, only show those assistants
      return (
        <div key={selectedCategory} className="mb-12">
          <div className="mb-4">
            <h2 className="text-lg font-medium">{selectedCategory}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssistants.map(assistant => (
              <AssistantCard 
                key={assistant.id} 
                assistant={assistant} 
                onClick={handleAssistantSelect}
              />
            ))}
          </div>
        </div>
      );
    }
    
    // If no category is selected or we're showing search results
    if (searchQuery) {
      return (
        <div className="mb-12">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Resultados de búsqueda</h2>
            <p className="text-xs text-gray-400">{filteredAssistants.length} asistentes encontrados</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAssistants.map(assistant => (
              <AssistantCard 
                key={assistant.id} 
                assistant={assistant} 
                onClick={handleAssistantSelect}
              />
            ))}
          </div>
        </div>
      );
    }
    
    // Default view: show all categories
    return Object.entries(categories).map(([category, categoryAssistants]) => (
      <div key={category} className="mb-12">
        <div className="mb-4">
          <h2 className="text-lg font-medium">{category}</h2>
          <p className="text-xs text-gray-400">{categoryAssistants.length} asistentes en esta categoría</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryAssistants.map(assistant => (
            <AssistantCard 
              key={assistant.id} 
              assistant={assistant} 
              onClick={handleAssistantSelect}
            />
          ))}
        </div>
        
        {categoryAssistants.length > 3 && (
          <div className="mt-2 text-center">
            <button 
              onClick={() => setSelectedCategory(category)}
              className="text-sm text-gray-400 hover:text-white"
            >
              Ver más en {category}
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-chatgpt-main text-white pb-10">
      {/* Header with search */}
      <div className="sticky top-0 z-10 bg-chatgpt-main/95 backdrop-blur border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <Link to="/" className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Explorar Asistentes</h1>
          </div>
          
          <p className="text-sm text-gray-400 mb-4">
            Navega por nuestra colección curada de asistentes, o crea uno tú mismo. Los asistentes son versiones personalizadas de Nexus AI especializadas en diferentes temas.
          </p>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar Asistentes por nombre, descripción o categoría"
                className="w-full pl-10 py-2 bg-chatgpt-secondary/50 rounded-md border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-transparent border-white/10 hover:bg-chatgpt-secondary/50"
                onClick={() => setSelectedCategory(null)}
              >
                <Filter className="h-4 w-4" />
                <span>Categorías</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              {/* We could add a dropdown menu here for categories */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        {renderAssistantsByCategory()}
      </div>
    </div>
  );
};

export default ExploreAssistants;
