import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledHamburgerButton, StyledMenu } from "./style";
import { Button } from "@/components";
import { exitDoorIcon, surrenderFlagIcon } from "@/assets/icons";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <>
      <StyledHamburgerButton onClick={toggleMenu} $menuOpen={menuOpen}>
        <div className="line" />
      </StyledHamburgerButton>

      <StyledMenu $menuOpen={menuOpen}>
        <h2 className="main-title">Game options</h2>
        <div className="buttons-wrapper">
          <Button
            color="yellow"
            icon={{ src: exitDoorIcon, alt: "exit door" }}
            dialog={{
              bodyMessage:
                "Are you sure you want to end the match? ending the match will save your points and redirect you to the feedback screen.",
              title: "End match",
              onConfirm: () => {
                navigate("/feedback");
              },
            }}
          >
            End match
          </Button>
          <Button
            color="red"
            icon={{ src: surrenderFlagIcon, alt: "surrender flag" }}
            dialog={{
              bodyMessage:
                "Are you sure you want to surrender? surrendering will make you lose all your points.",
              title: "Surrender",
              onConfirm: () => {
                navigate("/");
              },
            }}
          >
            Surrender
          </Button>
        </div>
      </StyledMenu>
    </>
  );
}
