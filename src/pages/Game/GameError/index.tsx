import { LinkButton } from "@/components";
import { StyledGameError } from "./style";

type GameErrorProps = {
  message: string;
};

export default function GameError({ message }: GameErrorProps) {
  return (
    <StyledGameError>
      <h1>{message}</h1>
      <LinkButton color="green" to="/">
        Try again
      </LinkButton>
    </StyledGameError>
  );
}
