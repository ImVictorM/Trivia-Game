import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledHamburgerButton, StyledMenu } from "./style";
import { Button } from "@/components";
import { exitDoorIcon, surrenderFlagIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";

export const MENU_COMPONENT_ID = "menu-element";
export const MENU_COMPONENT_HAMBURGER_ID = "menu-element-hamburger";
export const MENU_COMPONENT_SIDEBAR_ID = "menu-element-sidebar";
export const MENU_COMPONENT_END_MATCH_ID = "menu-element-end-match";
export const MENU_COMPONENT_SURRENDER_ID = "menu-element-surrender";

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
    <div data-testid={MENU_COMPONENT_ID}>
      <StyledHamburgerButton
        onClick={toggleMenu}
        $menuOpen={menuOpen}
        data-testid={MENU_COMPONENT_HAMBURGER_ID}
      >
        <div className="line" />
      </StyledHamburgerButton>

      <StyledMenu $menuOpen={menuOpen} data-testid={MENU_COMPONENT_SIDEBAR_ID}>
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
            data-testid={MENU_COMPONENT_END_MATCH_ID}
          >
            {t("endMatch.buttonText", { ns: "game" })}
          </Button>
          <Button
            data-testid={MENU_COMPONENT_SURRENDER_ID}
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
    </div>
  );
}
