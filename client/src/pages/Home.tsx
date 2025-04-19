import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Element, QuizMode } from "@/lib/types";
import PeriodicTable from "@/components/PeriodicTable";
import QuizModeSelector from "@/components/QuizModeSelector";
import ScoreTracker from "@/components/ScoreTracker";
import Legend from "@/components/Legend";
import Instructions from "@/components/Instructions";
import AnswerModal from "@/components/AnswerModal";

export default function Home() {
  // State for the quiz
  const [quizMode, setQuizMode] = useState<QuizMode>("symbols");
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [isResultModal, setIsResultModal] = useState(false);
  
  // Fetch elements from the backend
  const { data: elements, isLoading, error } = useQuery({
    queryKey: ["/api/elements"],
  });
  
  const totalElements = elements?.length || 0;
  
  // Reset the quiz
  const resetQuiz = () => {
    setScore(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setIsGameComplete(false);
    setIsResultModal(false);
  };
  
  // Handle element selection
  const handleElementSelect = (element: Element) => {
    setSelectedElement(element);
    setIsModalOpen(true);
    setFeedback(null);
    setIsResultModal(false);
  };
  
  // Check the answer
  const checkAnswer = (input: { symbol?: string; name?: string }) => {
    if (!selectedElement) return;
    
    let isCorrect = true;
    let feedbackMessage = "";
    
    // Check symbol if in symbol or both mode
    if ((quizMode === "symbols" || quizMode === "both") && input.symbol !== undefined) {
      if (input.symbol.toLowerCase() !== selectedElement.symbol.toLowerCase()) {
        isCorrect = false;
        feedbackMessage += `Símbol incorrecte. El símbol correcte és: ${selectedElement.symbol}. `;
      } else {
        feedbackMessage += "Símbol correcte! ";
      }
    }
    
    // Check name if in name or both mode
    if ((quizMode === "names" || quizMode === "both") && input.name !== undefined) {
      if (input.name.toLowerCase() !== selectedElement.name.toLowerCase()) {
        isCorrect = false;
        feedbackMessage += `Nom incorrecte. El nom correcte és: ${selectedElement.name}. `;
      } else {
        feedbackMessage += "Nom correcte! ";
      }
    }
    
    // Update stats
    if (isCorrect) {
      setScore(prev => prev + 1);
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => prev + 1);
    }
    
    // Set feedback
    setFeedback({ isCorrect, message: feedbackMessage });
    
    // Check if game is complete
    const total = correctAnswers + incorrectAnswers + 1;
    if (total >= totalElements) {
      setIsGameComplete(true);
    }
  };
  
  // Show the final result modal
  const showResultModal = () => {
    setIsResultModal(true);
    setIsModalOpen(true);
  };
  
  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    
    if (isGameComplete && !isResultModal) {
      showResultModal();
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Carregant elements...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error carregant els elements. Si us plau, recarrega la pàgina.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">Practica la Taula Periòdica</h1>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        {/* Quiz Mode Selector */}
        <QuizModeSelector 
          quizMode={quizMode} 
          onModeChange={setQuizMode} 
          resetQuiz={resetQuiz}
        />
        
        {/* Score Tracker */}
        <ScoreTracker 
          score={score} 
          total={totalElements} 
          correctAnswers={correctAnswers} 
          incorrectAnswers={incorrectAnswers} 
          onReset={resetQuiz}
        />
        
        {/* Periodic Table */}
        <PeriodicTable 
          elements={elements || []} 
          onElementSelect={handleElementSelect} 
          quizMode={quizMode}
          answeredCorrectly={elements?.filter((element: Element) => 
            element.id <= correctAnswers
          ).map((element: Element) => element.symbol) || []}
          answeredIncorrectly={elements?.filter((element: Element) => 
            element.id > correctAnswers && element.id <= correctAnswers + incorrectAnswers
          ).map((element: Element) => element.symbol) || []}
        />
        
        {/* Legend */}
        <Legend />
        
        {/* Instructions */}
        <Instructions />
        
        {/* Answer Modal */}
        <AnswerModal 
          isOpen={isModalOpen} 
          onClose={closeModal}
          element={selectedElement}
          quizMode={quizMode}
          onSubmit={checkAnswer}
          feedback={feedback}
          isResultModal={isResultModal}
          gameStats={{
            score,
            total: totalElements,
            correctAnswers,
            incorrectAnswers
          }}
        />
      </main>
    </div>
  );
}
