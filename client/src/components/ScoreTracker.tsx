import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ScoreTrackerProps {
  score: number;
  total: number;
  correctAnswers: number;
  incorrectAnswers: number;
  onReset: () => void;
}

export default function ScoreTracker({ 
  score, 
  total, 
  correctAnswers, 
  incorrectAnswers, 
  onReset 
}: ScoreTrackerProps) {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <span className="font-semibold">Puntuació:</span>{" "}
            <span>{score}</span> / <span>{total}</span>
          </div>
          <div>
            <span className="font-semibold">Encerts:</span>{" "}
            <span className="text-green-600">{correctAnswers}</span>
          </div>
          <div>
            <span className="font-semibold">Errors:</span>{" "}
            <span className="text-red-600">{incorrectAnswers}</span>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onReset}
          >
            Reiniciar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
