import { logo } from "@/assets/images";
import { StyledSettings } from "./style";
import { GreenButton } from "@/components";
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
      <img src={logo} alt="trivia logo" />
      <h1>Settings</h1>

      <div>
        {!isLoading && (
          <form>
            <label htmlFor="categories">Category</label>
            <select name="categories" id="categories">
              <option value={-1}>Any category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="difficulties">Difficulty</label>
            <select name="difficulties" id="difficulties">
              <option value="any">Any difficulty</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>

            <label htmlFor="types">Type</label>
            <select name="types" id="types">
              <option value="any">Any type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <GreenButton>Save</GreenButton>
          </form>
        )}
      </div>
    </StyledSettings>
  );
}
