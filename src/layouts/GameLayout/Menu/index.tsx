import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledHamburgerButton, StyledMenu } from "./style";
import { Button } from "@/components";
import { exitDoorIcon, surrenderFlagIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(["game", "common"]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("blur");
    } else {
      document.body.classList.remove("blur");
    }

    return () => document.body.classList.remove("blur");
  }, [menuOpen]);

  return (
    <>
      <StyledHamburgerButton onClick={toggleMenu} $menuOpen={menuOpen}>
        <div className="line" />
      </StyledHamburgerButton>

      <StyledMenu $menuOpen={menuOpen}>
        <h2 className="main-title">{t("gameOptions", { ns: "game" })}</h2>

        <div className="buttons-wrapper">
          <Button
            color="yellow"
            icon={{ src: exitDoorIcon, alt: t("exitDoor", { ns: "common" }) }}
            dialog={{
              bodyMessage: t("endMatch.dialog.body", { ns: "game" }),
              title: t("endMatch.dialog.title", { ns: "game" }),
              onConfirm: () => {
                navigate("/feedback");
              },
            }}
          >
            {t("endMatch.buttonText", { ns: "game" })}
          </Button>
          <Button
            color="red"
            icon={{
              src: surrenderFlagIcon,
              alt: t("surrenderFlag", { ns: "common" }),
            }}
            dialog={{
              bodyMessage: t("surrender.dialog.body", { ns: "game" }),
              title: t("surrender.dialog.title", { ns: "game" }),
              onConfirm: () => {
                navigate("/");
              },
            }}
          >
            {t("surrender.buttonText", { ns: "game" })}
          </Button>
        </div>
      </StyledMenu>
    </>
  );
}
