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
import { useTranslation } from "react-i18next";

export default function GameSettings() {
  const [settings, setSettings] = useGameSettings();

  const [categories, setCategories] = useState<TriviaCategory[]>([]);
  const [settingsFormState, setSettingsFormState] = useState(settings);
  const { t } = useTranslation(["gameSettings"]);

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
          <h1 className="main-title title">{t("title")}</h1>

          <StyledSettingsForm onSubmit={handleSaveSettings}>
            <div className="selects-wrapper">
              <Select
                id="categories"
                name="categoryId"
                label={t("category.label")}
                onChange={handleSettingsFormChange}
                value={settingsFormState.categoryId}
              >
                <option value={-1}>{t("category.any")}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <Select
                label={t("difficulty.label")}
                id="difficulties"
                name="difficulty"
                onChange={handleSettingsFormChange}
                value={settingsFormState.difficulty}
              >
                <option value="any">{t("difficulty.any")}</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {t(`difficulty.${difficulty}`)}
                  </option>
                ))}
              </Select>

              <Select
                label={t("type.label")}
                id="types"
                name="type"
                onChange={handleSettingsFormChange}
                value={settingsFormState.type}
              >
                <option value="any">{t("type.any")}</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </div>

            <div className="buttons-wrapper">
              <Button color="green" type="submit">
                {t("save")}
              </Button>
              <LinkButton color="cyan" to="/">
                {t("goBack")}
              </LinkButton>
            </div>
          </StyledSettingsForm>
        </StyledSettingsContent>
      )}
      <Toast />
    </StyledSettings>
  );
}
