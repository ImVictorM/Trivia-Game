import { StyledLanguageSelector } from "./style";
import { useLanguage } from "@/hooks";

type LanguageSelectorProps = {
  className: string;
};

export default function LanguageSelector({ className }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === "pt-BR" || value === "en") {
      setLanguage(value);
    } else {
      console.error(`invalid language code: ${value}`);
    }
  };

  return (
    <StyledLanguageSelector
      name="languages"
      onChange={handleChange}
      value={language}
      className={className || ""}
    >
      <option value="pt-BR">🇧🇷 PT-BR</option>
      <option value="en">🇺🇸 EN-US</option>
    </StyledLanguageSelector>
  );
}
