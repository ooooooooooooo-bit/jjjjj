export interface Element {
  id: number;
  symbol: string;
  name: string;
  number: number;
  type: "no-metall" | "gas-noble" | "metall-alcali" | "metall-alcalino" | "metall-transicio" |
    "metall-grup13" | "metall-grup14" | "metall-grup15" | "metall-grup16" | "metal·loide" |
    "lantanid" | "actinid";
}

export type QuizMode = "symbols" | "names" | "both";

export interface GameStats {
  score: number;
  total: number;
  correctAnswers: number;
  incorrectAnswers: number;
}
