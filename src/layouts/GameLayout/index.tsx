import Header from "./Header";
import { StyledContent, StyledLayout } from "./style";

type HeaderContentLayoutProps = {
  children: React.ReactNode;
};

export const GAME_LAYOUT_ID = "game-layout";
export const GAME_LAYOUT_CONTENT_ID = "game-layout-content";

export default function GameLayout({ children }: HeaderContentLayoutProps) {
  return (
    <StyledLayout data-testid={GAME_LAYOUT_ID}>
      <Header />

      <StyledContent data-testid={GAME_LAYOUT_CONTENT_ID} id="content">
        {children}
      </StyledContent>
    </StyledLayout>
  );
}
