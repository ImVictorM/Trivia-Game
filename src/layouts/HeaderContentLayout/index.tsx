import Header from "./Header";
import { StyledContent, StyledLayout } from "./style";

type HeaderContentLayoutProps = {
  children: React.ReactNode;
};

export default function HeaderContentLayout({
  children,
}: HeaderContentLayoutProps) {
  return (
    <StyledLayout>
      <Header />

      <StyledContent id="content">{children}</StyledContent>
    </StyledLayout>
  );
}
