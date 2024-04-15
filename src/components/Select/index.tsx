import { StyledSelect } from "./style";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  id: string;
  name: string;
  children: React.ReactNode;
};

export default function Select({
  label,
  id,
  name,
  children,
  ...defaultSelectAttr
}: SelectProps) {
  return (
    <StyledSelect>
      <label htmlFor={id}>{label}</label>
      <div className="select-wrapper">
        <select name={name} id={id} {...defaultSelectAttr}>
          {children}
        </select>
      </div>
    </StyledSelect>
  );
}
