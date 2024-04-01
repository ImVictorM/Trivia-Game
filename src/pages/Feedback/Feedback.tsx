import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

type FeedbackProps = {
  assertions: number;
  score: number;
};

function Feedback({ score, assertions }: FeedbackProps) {
  const feedbackMessage = assertions > 2 ? "Well Done!" : "Could be better...";

  return (
    <div>
      <Header />
      <h1 data-testid="feedback-text">{feedbackMessage}</h1>
      <h2>
        Pontução:
        <span data-testid="feedback-total-score">{score}</span>
      </h2>
      <h2>
        Numero de acertos:
        <span data-testid="feedback-total-question">{assertions}</span>
      </h2>
      <Link to="/">
        <button data-testid="btn-play-again" type="button">
          Play Again
        </button>
      </Link>
      <Link to="/ranking">
        <button data-testid="btn-ranking" type="button">
          Ranking
        </button>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Feedback);
