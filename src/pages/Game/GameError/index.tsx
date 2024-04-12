import { LinkButton } from "@/components";
import { StyledGameError } from "./style";

export default function GameError() {
  return (
    <StyledGameError>
      <h1>
        Sorry, but it was not possible to fetch questions for your trivia game.
        Try again later.
      </h1>
      <LinkButton color="green" to="/">
        Try again
      </LinkButton>
    </StyledGameError>
  );
}
