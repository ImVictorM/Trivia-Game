import { StyledInput } from "./style";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  value: string;
};

export default function Input({
  label,
  id,
  value,
  ...defaultInputProps
}: InputProps) {
  return (
    <StyledInput $inputValue={value}>
      <input id={id} value={value} {...defaultInputProps} />
      <div className="underline" />
      <label htmlFor={id}>{label}</label>
    </StyledInput>
  );
}
