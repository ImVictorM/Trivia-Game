import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setPlayer } from "@/redux/slices/playerSlice";
import { getTriviaToken } from "@/services/triviaApi";
import { logo } from "@/assets/images";
import { StyledLoginSection } from "./style";
import { Button, Input, LinkButton, Toast } from "@/components";
import { settingsCog } from "@/assets/icons";
import { useToken } from "@/hooks";
import { getAvatarImg } from "@/services/gravatarApi";
import { toast } from "react-toastify";

export default function Login() {
  const [loginFormState, setLoginFormState] = useState({
    name: "",
    gravatarEmail: "",
  });
  const [canPlay, setCanPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { clearToken, setToken, tokenIsEmpty } = useToken();

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
      const { token, response_code: tokenResponseCode } =
        await getTriviaToken();

      if (tokenResponseCode === 0) {
        setToken(token);

        const gravatarImageSrc = await getAvatarImg(
          loginFormState.gravatarEmail
        );

        dispatch(
          setPlayer({
            gravatarImgSrc: gravatarImageSrc,
            name: loginFormState.name,
          })
        );

        setShouldNavigate(true);
      } else {
        clearToken();
        setShouldNavigate(true);
      }
    } catch (error) {
      toast.error("There was an unexpected error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCanPlay(
      loginFormState.name.length > 0 && loginFormState.gravatarEmail.length > 0
    );
  }, [loginFormState]);

  useEffect(() => {
    if (shouldNavigate) {
      if (!tokenIsEmpty) {
        navigate("/game");
      } else {
        navigate("/");
      }
    }
  }, [shouldNavigate, navigate, tokenIsEmpty]);

  return (
    <StyledLoginSection>
      <img className="logo" src={logo} alt="trivia" />

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="inputs-wrapper">
          <Input
            value={loginFormState.name}
            type="name"
            name="name"
            id="name"
            required
            data-testid="input-player-name"
            label="Enter your name"
            onChange={handleChange}
            maxLength={20}
          />

          <Input
            value={loginFormState.gravatarEmail}
            type="email"
            id="email"
            required
            name="gravatarEmail"
            data-testid="input-gravatar-email"
            label="Enter your email or gravatar email"
            onChange={handleChange}
            maxLength={320}
          />
        </div>

        <div className="buttons-wrapper">
          <Button
            color="green"
            type="submit"
            data-testid="btn-play"
            isLoading={isLoading}
            loadingText="Getting ready..."
            disabled={!canPlay || isLoading}
          >
            Start game
          </Button>

          <LinkButton color="cyan" to="/ranking">
            Ranking
          </LinkButton>
        </div>

        <Link className="settings" to="/settings" data-testid="btn-settings">
          <img src={settingsCog} alt="settings cog" />
        </Link>
      </form>

      <Toast />
    </StyledLoginSection>
  );
}
