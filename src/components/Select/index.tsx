import { StyledSelect } from "./style";

type SelectProps = {
  label: string;
  id: string;
  name: string;
  children: React.ReactNode;
};

export default function Select({ label, id, name, children }: SelectProps) {
  return (
    <StyledSelect>
      <label htmlFor={id}>{label}</label>
      <div className="select-wrapper">
        <select name={name} id={id}>
          {children}
        </select>
      </div>
    </StyledSelect>
  );
}
