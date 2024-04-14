import { logo } from "@/assets/images";
import {
  StyledSettings,
  StyledSettingsContent,
  StyledSettingsForm,
} from "./style";
import { GreenButton, Select } from "@/components";
import { useEffect, useRef, useState } from "react";
import {
  QuestionDifficulty,
  QuestionType,
  TriviaCategory,
  getTriviaCategories,
} from "@/services/triviaApi";

export default function Settings() {
  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const difficulties: QuestionDifficulty[] = ["easy", "medium", "hard"];
  const types: QuestionType[] = ["multiple", "boolean"];

  useEffect(() => {
    async function fetchTriviaCategories() {
      setIsLoading(true);

      try {
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        const categoriesResponse = await getTriviaCategories({
          signal: abortControllerRef.current.signal,
        });

        setCategories(categoriesResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTriviaCategories();
  }, []);

  return (
    <StyledSettings>
      {!isLoading && (
        <StyledSettingsContent>
          <img className="logo" src={logo} alt="trivia logo" />
          <h1 className="main-title">Game Settings</h1>

          <StyledSettingsForm>
            <div className="selects-wrapper">
              <Select id="categories" name="categories" label="Category">
                <option value={-1}>Any category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <Select label="Difficulty" id="difficulties" name="difficulties">
                <option value="any">Any difficulty</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </Select>

              <Select label="Type" id="types" name="types">
                <option value="any">Any type</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <GreenButton>Save</GreenButton>
          </StyledSettingsForm>
        </StyledSettingsContent>
      )}
    </StyledSettings>
  );
}
