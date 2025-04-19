import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuizMode, Element } from "@/lib/types";

interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  element: Element | null;
  quizMode: QuizMode;
  onSubmit: (answer: { symbol?: string; name?: string }) => void;
  feedback: { isCorrect: boolean; message: string } | null;
  isResultModal: boolean;
  gameStats: {
    score: number;
    total: number;
    correctAnswers: number;
    incorrectAnswers: number;
  };
}

export default function AnswerModal({
  isOpen,
  onClose,
  element,
  quizMode,
  onSubmit,
  feedback,
  isResultModal,
  gameStats
}: AnswerModalProps) {
  const [symbolInput, setSymbolInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  // Clear inputs when opening a new modal
  useEffect(() => {
    if (isOpen && !feedback) {
      setSymbolInput("");
      setNameInput("");
    }
  }, [isOpen, feedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const answer: { symbol?: string; name?: string } = {};
    
    if (quizMode === "symbols" || quizMode === "both") {
      answer.symbol = symbolInput;
    }
    
    if (quizMode === "names" || quizMode === "both") {
      answer.name = nameInput;
    }
    
    onSubmit(answer);
  };

  const renderAnswerForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      {(quizMode === "symbols" || quizMode === "both") && (
        <div className="mb-4">
          <Label htmlFor="symbol-input" className="block text-sm font-medium mb-1">
            Símbol:
          </Label>
          <Input
            id="symbol-input"
            value={symbolInput}
            onChange={(e) => setSymbolInput(e.target.value)}
            placeholder="Introdueix el símbol"
            className="w-full"
            autoFocus
          />
        </div>
      )}

      {(quizMode === "names" || quizMode === "both") && (
        <div className="mb-4">
          <Label htmlFor="name-input" className="block text-sm font-medium mb-1">
            Nom:
          </Label>
          <Input
            id="name-input"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Introdueix el nom"
            className="w-full"
            autoFocus={quizMode === "names"}
          />
        </div>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancel·lar
        </Button>
        <Button type="submit">Comprovar</Button>
      </div>
    </form>
  );

  const renderFeedback = () => (
    <div className="text-center mb-4">
      <div 
        className={`mb-4 ${feedback?.isCorrect ? "text-green-600" : "text-red-600"}`} 
        dangerouslySetInnerHTML={{ __html: feedback?.message || "" }} 
      />
      <Button onClick={onClose}>Tancar</Button>
    </div>
  );

  const renderResultModal = () => {
    const { score, total, correctAnswers } = gameStats;
    const accuracy = Math.round((correctAnswers / total) * 100);
    
    let message;
    if (accuracy >= 90) {
      message = "Excel·lent! Ets un mestre de la taula periòdica!";
    } else if (accuracy >= 70) {
      message = "Molt bé! Estàs dominant els elements!";
    } else if (accuracy >= 50) {
      message = "No està malament! Segueix practicant!";
    } else {
      message = "Necessites més pràctica. No et rendeixis!";
    }
    
    const messageColor = 
      accuracy >= 90 ? "text-green-600" :
      accuracy >= 70 ? "text-blue-600" :
      accuracy >= 50 ? "text-yellow-600" : "text-red-600";
    
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Joc completat!</h3>
        <p className="mb-2">Has obtingut {score} punts de {total} possibles.</p>
        <p className="mb-4">Precisió: {accuracy}%</p>
        <p className={`font-bold ${messageColor}`}>{message}</p>
        <Button onClick={onClose} className="mt-4">Tancar</Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isResultModal
              ? "Resultat final"
              : feedback
              ? feedback.isCorrect
                ? "Correcte!"
                : "Incorrecte"
              : "Introdueix la resposta"}
          </DialogTitle>
        </DialogHeader>
        
        {isResultModal 
          ? renderResultModal() 
          : feedback 
            ? renderFeedback() 
            : renderAnswerForm()}
      </DialogContent>
    </Dialog>
  );
}
