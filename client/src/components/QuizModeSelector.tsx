import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuizMode } from "@/lib/types";

interface QuizModeSelectorProps {
  quizMode: QuizMode;
  onModeChange: (mode: QuizMode) => void;
  resetQuiz: () => void;
}

export default function QuizModeSelector({ quizMode, onModeChange, resetQuiz }: QuizModeSelectorProps) {
  const handleModeChange = (mode: QuizMode) => {
    if (mode !== quizMode) {
      onModeChange(mode);
      resetQuiz();
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4">Mode de Pràctica</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <Button
            variant={quizMode === "symbols" ? "default" : "outline"}
            onClick={() => handleModeChange("symbols")}
          >
            Completa els Símbols
          </Button>
          <Button
            variant={quizMode === "names" ? "default" : "outline"}
            onClick={() => handleModeChange("names")}
          >
            Completa els Noms
          </Button>
          <Button
            variant={quizMode === "both" ? "default" : "outline"}
            onClick={() => handleModeChange("both")}
          >
            Completa Ambdós
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
