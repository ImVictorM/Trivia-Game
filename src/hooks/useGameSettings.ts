import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

type Settings = {
  categoryId: number;
  difficulty: string;
  type: string;
};

export default function useGameSettings(): [
  Settings,
  (settings: Settings) => void
] {
  const [settings, setSettings] = useLocalStorage<Settings>("settings", {
    categoryId: -1,
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
