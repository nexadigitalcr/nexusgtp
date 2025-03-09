
import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { Assistant } from '@/data/assistants';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface AboutAssistantModalProps {
  assistant: Assistant;
  isOpen: boolean;
  onClose: () => void;
}

const AboutAssistantModal = ({ assistant, isOpen, onClose }: AboutAssistantModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  // Average rating from the assistant data (fallback to 0 if not available)
  const averageRating = assistant.ratings?.average || 0;
  const totalRatings = assistant.ratings?.count || 0;

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      toast({
        title: "Se requiere calificación",
        description: "Por favor, selecciona una calificación de 1 a 5 estrellas.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would submit this to a backend
    console.log('Submitting feedback:', { rating, feedback, assistantId: assistant.id });
    
    toast({
      title: "¡Gracias por tu comentario!",
      description: "Tu opinión nos ayuda a mejorar nuestros asistentes.",
    });
    
    setRating(0);
    setFeedback('');
    onClose();
  };

  const renderStars = (count: number, type: 'display' | 'input') => {
    return Array(5).fill(0).map((_, index) => {
      const starValue = index + 1;
      const isFilled = type === 'display' 
        ? starValue <= count 
        : starValue <= (hoverRating || rating);
      
      return (
        <Star
          key={index}
          className={`h-6 w-6 ${isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'} ${type === 'input' ? 'cursor-pointer transition-colors' : ''}`}
          onMouseEnter={type === 'input' ? () => setHoverRating(starValue) : undefined}
          onMouseLeave={type === 'input' ? () => setHoverRating(0) : undefined}
          onClick={type === 'input' ? () => setRating(starValue) : undefined}
        />
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-chatgpt-main border-chatgpt-border sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
              <img src={assistant.avatar} alt={assistant.name} className="w-full h-full object-cover" />
            </div>
            {assistant.name}
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-400">
            {assistant.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {assistant.author && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Creado por:</span>
              <span>{assistant.author || "Nexa Digital"}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Usos totales:</span>
            <span>{assistant.chat_count || 0} chats</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Categoría:</span>
            <span className="px-2 py-1 text-xs bg-chatgpt-hover rounded-full">{assistant.category}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Calificación promedio:</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {renderStars(averageRating, 'display')}
              </div>
              <span className="text-sm text-gray-400">
                ({totalRatings} {totalRatings === 1 ? 'calificación' : 'calificaciones'})
              </span>
            </div>
          </div>
          
          <div className="space-y-2 pt-4 border-t border-gray-700">
            <h4 className="font-medium">Califica este asistente:</h4>
            <div className="flex justify-center py-2">
              {renderStars(rating, 'input')}
            </div>
            
            <Textarea
              placeholder="Comparte tu experiencia con este asistente..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="bg-chatgpt-secondary border-chatgpt-border resize-none min-h-[100px]"
            />
          </div>
        </div>
        
        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmitFeedback}>
            Enviar comentario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutAssistantModal;
