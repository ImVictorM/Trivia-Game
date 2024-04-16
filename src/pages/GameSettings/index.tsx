import { logo } from "@/assets/images";
import {
  StyledSettings,
  StyledSettingsContent,
  StyledSettingsForm,
} from "./style";
import { Button, LinkButton, Select, Toast } from "@/components";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  QuestionDifficulty,
  QuestionType,
  TriviaCategory,
  getTriviaCategories,
} from "@/services/triviaApi";
import { useGameSettings } from "@/hooks";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { sleep } from "@/utils";

export default function GameSettings() {
  const [settings, setSettings] = useGameSettings();

  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [settingsFormState, setSettingsFormState] = useState(settings);

  const isLoading = useMemo(() => {
    return categories.length === 0;
  }, [categories]);

  const abortControllerRef = useRef<AbortController | null>(null);

  const difficulties: QuestionDifficulty[] = ["easy", "medium", "hard"];
  const types: QuestionType[] = ["multiple", "boolean"];

  const handleSettingsFormChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSettingsFormState((prevSettings) => ({
      ...prevSettings,
      [name]: Number(value) || value,
    }));
  };

  const handleSaveSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSettings(settingsFormState);

    toast.success("Game settings saved!");
  };

  useEffect(() => {
    async function fetchTriviaCategories() {
      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const startFetchingTime = Date.now();

        const categoriesResponse = await getTriviaCategories({
          signal: abortControllerRef.current.signal,
        });

        const elapsedTime = Date.now() - startFetchingTime;

        if (elapsedTime < 1000) {
          // prevent loading flickering
          await sleep(500);
        }

        setCategories(categoriesResponse);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTriviaCategories();
  }, []);

  return (
    <StyledSettings>
      {isLoading && <Loading />}

      {!isLoading && (
        <StyledSettingsContent>
          <img className="logo" src={logo} alt="trivia logo" />
          <h1 className="main-title">Game Settings</h1>

          <StyledSettingsForm onSubmit={handleSaveSettings}>
            <div className="selects-wrapper">
              <Select
                id="categories"
                name="categoryId"
                label="Category"
                onChange={handleSettingsFormChange}
                value={settingsFormState.categoryId}
              >
                <option value={-1}>Any category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <Select
                label="Difficulty"
                id="difficulties"
                name="difficulty"
                onChange={handleSettingsFormChange}
                value={settingsFormState.difficulty}
              >
                <option value="any">Any difficulty</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </Select>

              <Select
                label="Type"
                id="types"
                name="type"
                onChange={handleSettingsFormChange}
                value={settingsFormState.type}
              >
                <option value="any">Any type</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div className="buttons-wrapper">
              <Button color="green" type="submit">
                Save
              </Button>
              <LinkButton color="cyan" to="/">
                Go back
              </LinkButton>
            </div>
          </StyledSettingsForm>
        </StyledSettingsContent>
      )}
      <Toast />
    </StyledSettings>
  );
}
