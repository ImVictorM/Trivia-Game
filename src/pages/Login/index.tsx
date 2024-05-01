import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setPlayer, setToken } from "@/redux/slices/playerSlice";
import { getTriviaToken } from "@/services/triviaApi";
import { logo } from "@/assets/images";
import { StyledLoginSection } from "./style";
import { Button, Input, LinkButton, Toast } from "@/components";
import { settingsCog } from "@/assets/icons";
import { getAvatarImg } from "@/services/gravatarApi";
import { toast } from "react-toastify";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

export const LOGIN_PAGE_ID = "login-page";
export const LOGIN_PAGE_PLAY_BUTTON_ID = "login-page-button-play";
export const LOGIN_PAGE_SETTINGS_BUTTON_ID = "login-page-button-settings";
export const LOGIN_PAGE_RANKING_BUTTON_ID = "login-page-button-ranking";
export const LOGIN_PAGE_NAME_INPUT_ID = "login-page-input-name";
export const LOGIN_PAGE_EMAIL_INPUT_ID = "login-page-input-email";

export default function Login() {
  const [loginFormState, setLoginFormState] = useState({
    name: "",
    gravatarEmail: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { t } = useTranslation(["login", "common"]);

  const canPlay = useMemo(() => {
    return (
      loginFormState.name.length > 0 &&
      loginFormState.gravatarEmail.length > 0 &&
      !isLoading
    );
  }, [
    isLoading,
    loginFormState.gravatarEmail.length,
    loginFormState.name.length,
  ]);

  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.player.token);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { token } = await getTriviaToken();
      dispatch(setToken({ value: token }));

      const gravatarImageSrc = await getAvatarImg(loginFormState.gravatarEmail);

      dispatch(
        setPlayer({
          gravatarImgSrc: gravatarImageSrc,
          name: loginFormState.name,
        })
      );

      setShouldNavigate(true);
    } catch (error) {
      dispatch(setToken({ value: undefined }));
      toast.error("There was an unexpected error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldNavigate && token) {
      navigate("/game");
    }
  }, [shouldNavigate, navigate, token]);

  return (
    <StyledLoginSection data-testid={LOGIN_PAGE_ID}>
      <img className="logo" src={logo} alt="trivia" />

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="inputs-wrapper">
          <Input
            value={loginFormState.name}
            type="name"
            name="name"
            id="name"
            required
            data-testid={LOGIN_PAGE_NAME_INPUT_ID}
            label={t("nameLabel")}
            onChange={handleChange}
            maxLength={20}
          />

          <Input
            value={loginFormState.gravatarEmail}
            type="email"
            id="email"
            required
            name="gravatarEmail"
            data-testid={LOGIN_PAGE_EMAIL_INPUT_ID}
            label={t("emailLabel")}
            onChange={handleChange}
            maxLength={320}
          />
        </div>

        <div className="buttons-wrapper">
          <Button
            color="green"
            type="submit"
            data-testid={LOGIN_PAGE_PLAY_BUTTON_ID}
            isLoading={isLoading}
            loadingText={t("starting")}
            disabled={!canPlay}
          >
            {t("start")}
          </Button>

          <LinkButton
            color="cyan"
            to="/ranking"
            data-testid={LOGIN_PAGE_RANKING_BUTTON_ID}
          >
            {t("ranking", { ns: "common" })}
          </LinkButton>
        </div>

        <LanguageSelector className="language-selector" />

        <Link
          className="settings"
          to="/settings"
          data-testid={LOGIN_PAGE_SETTINGS_BUTTON_ID}
        >
          <img src={settingsCog} alt="settings cog" />
        </Link>
      </form>

      <Toast />
    </StyledLoginSection>
  );
}
