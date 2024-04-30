import { useDispatch, useSelector } from "react-redux";
import { StyledLanguageSelector } from "./style";
import { AppDispatch, RootState } from "@/redux/store";
import { setLanguage } from "@/redux/slices/languageSlice";
import { constants } from "@/utils";
import { LanguageCode } from "@/utils/constants";

type LanguageSelectorProps = {
  className?: string;
};

export const LANGUAGE_SELECTOR_COMPONENT_ID = "language-selector-element";

export default function LanguageSelector({ className }: LanguageSelectorProps) {
  const { LANGUAGES } = constants;
  const language = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    dispatch(setLanguage({ code: value as LanguageCode }));
  };

  return (
    <StyledLanguageSelector
      name="languages"
      onChange={handleChange}
      value={language.code}
      className={className || ""}
      data-testid={LANGUAGE_SELECTOR_COMPONENT_ID}
    >
      {LANGUAGES.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </StyledLanguageSelector>
  );
}
