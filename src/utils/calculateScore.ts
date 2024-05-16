import { QuestionDifficulty } from "@/services/triviaApi";

export default function calculateScore(
  difficulty: QuestionDifficulty,
  countdown: number
) {
  const DEFAULT_POINTS_TO_SUM = 10;
  const EASY_POINTS = 1;
  const MEDIUM_POINTS = 2;
  const HARD_POINTS = 3;

  let difficultyPoints = null;

  switch (difficulty) {
    case "hard":
      difficultyPoints = HARD_POINTS;
      break;
    case "medium":
      difficultyPoints = MEDIUM_POINTS;
      break;
    default:
      difficultyPoints = EASY_POINTS;
      break;
  }

  const score = DEFAULT_POINTS_TO_SUM + countdown * difficultyPoints;
  return score;
}
