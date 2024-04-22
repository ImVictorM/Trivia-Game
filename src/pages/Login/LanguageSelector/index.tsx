import { useDispatch, useSelector } from "react-redux";
import { StyledLanguageSelector } from "./style";
import { AppDispatch, RootState } from "@/redux/store";
import { setLanguage } from "@/redux/slices/languageSlice";

type LanguageSelectorProps = {
  className: string;
};

export default function LanguageSelector({ className }: LanguageSelectorProps) {
  const language = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "pt-BR" || value === "en") {
      dispatch(setLanguage({ code: value }));
    } else {
      console.error(`invalid language code: ${value}`);
    }
  };

  return (
    <StyledLanguageSelector
      name="languages"
      onChange={handleChange}
      value={language.code}
      className={className || ""}
    >
      <option value="pt-BR">🇧🇷 PT-BR</option>
      <option value="en">🇺🇸 EN-US</option>
    </StyledLanguageSelector>
  );
}
