import { logo } from "@/assets/images";
import {
  StyledSettings,
  StyledSettingsContent,
  StyledSettingsForm,
} from "./style";
import { Button, LinkButton, Select, Toast } from "@/components";
import { useState } from "react";
import { QuestionDifficulty, QuestionType } from "@/services/triviaApi";
import { useGameSettings } from "@/hooks";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { constants } from "@/utils";

export default function GameSettings() {
  const [settings, setSettings] = useGameSettings();

  const [settingsFormState, setSettingsFormState] = useState(settings);
  const { t } = useTranslation(["gameSettings", "common"]);

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

  return (
    <StyledSettings>
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
              <option value={constants.ANY_CATEGORY_ID}>
                {t("category.any")}
              </option>
              {constants.TRIVIA_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {t(`categories.${category.id}`, { ns: "common" })}
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
                  {t(`type.${type}`)}
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

      <Toast />
    </StyledSettings>
  );
}
