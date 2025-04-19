import { Element, QuizMode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface PeriodicTableProps {
  elements: Element[];
  onElementSelect: (element: Element) => void;
  quizMode: QuizMode;
  answeredCorrectly: string[];
  answeredIncorrectly: string[];
}

export default function PeriodicTable({ 
  elements, 
  onElementSelect, 
  quizMode,
  answeredCorrectly,
  answeredIncorrectly
}: PeriodicTableProps) {
  // Helper function to find an element by symbol
  const findElement = (symbol: string): Element | undefined => {
    return elements.find(e => e.symbol === symbol);
  };
  
  // Helper to determine if an element has been answered
  const getElementStatus = (symbol: string) => {
    if (answeredCorrectly.includes(symbol)) return "correct";
    if (answeredIncorrectly.includes(symbol)) return "incorrect";
    return "unanswered";
  };
  
  // Helper function to render element cells
  function renderElement(symbol: string | null, number?: number) {
    if (!symbol) return <div className="empty-cell" key={`empty-${number || Math.random()}`}></div>;
    
    const element = findElement(symbol);
    if (!element) return <div className="empty-cell" key={`empty-${symbol}`}></div>;
    
    const status = getElementStatus(symbol);
    
    // Colors based on the element groups according to image
    const getTypeColor = () => {
      // Alkaline metals - light blue
      if (["H", "Li", "Na", "K", "Rb", "Cs", "Fr"].includes(symbol)) {
        return "bg-[#e3f2fd]";
      }
      // Alkaline earth metals - light pink/coral
      else if (["Be", "Mg", "Ca", "Sr", "Ba", "Ra"].includes(symbol)) {
        return "bg-[#ffcdd2]";
      }
      // Transition metals - light purple
      else if (["Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Pd", "Ag", "Cd", "Pt", "Au", "Hg"].includes(symbol)) {
        return "bg-[#e1bee7]";
      }
      // Group 13 - green
      else if (["B", "Al", "Ga", "In", "Tl"].includes(symbol)) {
        return "bg-[#c8e6c9]";
      }
      // Group 14 - brown/amber
      else if (["C", "Si", "Ge", "Sn", "Pb"].includes(symbol)) {
        return "bg-[#ffe0b2]";
      }
      // Group 15 - tan
      else if (["N", "P", "As", "Sb", "Bi"].includes(symbol)) {
        return "bg-[#d7ccc8]";
      }
      // Group 16 - light blue
      else if (["O", "S", "Se", "Te", "Po"].includes(symbol)) {
        return "bg-[#b3e5fc]";
      }
      // Group 17 - light green
      else if (["F", "Cl", "Br", "I", "At"].includes(symbol)) {
        return "bg-[#dcedc8]";
      }
      // Group 18 - light red/pink
      else if (["He", "Ne", "Ar", "Kr", "Xe", "Rn"].includes(symbol)) {
        return "bg-[#f8bbd0]";
      }
      return "bg-gray-100";
    };
    
    return (
      <div 
        key={symbol}
        className={cn(
          "element border border-gray-300 rounded-md p-1 text-center aspect-square relative flex flex-col justify-center cursor-pointer transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-md",
          getTypeColor(),
          status === "correct" && "border-green-400 bg-green-50",
          status === "incorrect" && "border-red-400 bg-red-50"
        )}
        onClick={() => {
          if (status === "unanswered") {
            onElementSelect(element);
          }
        }}
      >
        <div className="absolute top-1 left-1 text-xs text-gray-600">{element.number}</div>
        <div className="font-bold text-base">
          {status !== "unanswered" || quizMode === "names" ? element.symbol : "?"}
        </div>
        <div className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
          {status !== "unanswered" || quizMode === "symbols" ? element.name : "?"}
        </div>
      </div>
    );
  }
  
  // Function to render a grid row
  function renderRow(elements: (string | null)[]) {
    return elements.map((symbol, index) => renderElement(symbol, index));
  }
  
  return (
    <div className="overflow-x-auto mb-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Taula Periòdica</h2>
        
        {/* Main Periodic Table Grid - Exactament com a la imatge */}
        <div className="grid grid-cols-[repeat(18,minmax(45px,1fr))] gap-1 min-w-[900px]" id="periodic-table">
          {/* Fila 1 */}
          {renderRow([
            "H", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, "He"
          ])}

          {/* Fila 2 */}
          {renderRow([
            "Li", "Be", null, null, null, null, null, null, null, null, null, null, "B", "C", "N", "O", "F", "Ne"
          ])}

          {/* Fila 3 */}
          {renderRow([
            "Na", "Mg", null, null, null, null, null, null, null, null, null, null, "Al", "Si", "P", "S", "Cl", "Ar"
          ])}

          {/* Fila 4 */}
          {renderRow([
            "K", "Ca", null, null, null, "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr"
          ])}

          {/* Fila 5 */}
          {renderRow([
            "Rb", "Sr", null, null, null, "Pd", "Ag", "Cd", null, null, null, null, "In", "Sn", "Sb", "Te", "I", "Xe"
          ])}

          {/* Fila 6 */}
          {renderRow([
            "Cs", "Ba", null, null, null, "Pt", "Au", "Hg", null, null, null, null, "Tl", "Pb", "Bi", "Po", "At", "Rn"
          ])}

          {/* Fila 7 */}
          {renderRow([
            "Fr", "Ra", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null
          ])}
        </div>
      </div>
    </div>
  );
}
