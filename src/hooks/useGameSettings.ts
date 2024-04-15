import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";
import { QuestionDifficulty, QuestionType } from "@/services/triviaApi";
import { constants } from "@/utils/";

type Settings = {
  categoryId: number;
  difficulty: QuestionDifficulty;
  type: QuestionType;
};

export default function useGameSettings(): [
  Settings,
  (settings: Settings) => void
] {
  const [settings, setSettings] = useLocalStorage<Settings>("settings", {
    categoryId: constants.ANY_CATEGORY_ID,
    difficulty: "any",
    type: "any",
  });

  const updateSettings = useCallback(
    (settings: Settings) => {
      setSettings(settings);
    },
    [setSettings]
  );

  return [settings, updateSettings];
}
