import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setPlayer } from "@/redux/slices/playerSlice";
import { getTriviaToken } from "@/services/triviaApi";

export default function Login() {
  const [loginFormState, setLoginFormState] = useState({
    name: "",
    gravatarEmail: "",
  });
  const [canPlay, setCanPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setCanPlay(
      loginFormState.name.length > 0 && loginFormState.gravatarEmail.length > 0
    );
  }, [loginFormState]);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const { token, response_code: tokenResponseCode } =
        await getTriviaToken();

      if (tokenResponseCode === 0) {
        localStorage.setItem("token", token);

        dispatch(
          setPlayer({
            gravatarEmail: loginFormState.gravatarEmail,
            name: loginFormState.name,
          })
        );

        navigate("/game");
      } else {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("There was an unexpected error, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <form>
        <input
          type="name"
          name="name"
          data-testid="input-player-name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="email"
          name="gravatarEmail"
          data-testid="input-gravatar-email"
          placeholder="Email"
          onChange={handleChange}
        />

        {errorMessage && <span>{errorMessage}</span>}

        <button
          type="button"
          data-testid="btn-play"
          disabled={!canPlay || isLoading}
          onClick={handleSubmit}
        >
          Play
        </button>

        <Link to="/settings" data-testid="btn-settings">
          Settings
        </Link>
      </form>
    </div>
  );
}
