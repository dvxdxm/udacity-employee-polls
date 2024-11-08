import { connect } from "react-redux";
import { handleVotedQuestion } from "../actions/questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionDetailPage = (props) => {
  const { dispatch, question, authedUser } = props;
  const { id, author, optionOne, optionTwo } = question;
  const { avatarURL } = props.users[author];
  const users = Object.keys(props.users);

  const handleVoteQuestion = (e, newAnswer, currentAnswer) => {
    e.preventDefault();
    dispatch(handleVotedQuestion({ questionId: id, newAnswer, currentAnswer }));
  };

  if (props.question === null) {
    return (
      <div className="error-404">
        <h2>404 - Poll Not Found</h2>
        <p>Sorry, the poll you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="poll">
      <div className="poll-author">Poll by {author}</div>
      <div className="poll-avatar">
        <img
          src={avatarURL}
          alt="Avatar"
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      </div>
      <div className="poll-title">Would You Rather</div>

      <div className="options">
        <div
          className={
            optionOne?.votes.includes(authedUser) ? "option selected" : "option"
          }
        >
          <div className="option-text">
            <p>{optionOne.text}</p>
            <div className="vote-info">
              <p>
                <strong>Votes:</strong>{" "}
                <span className="vote-count">{optionOne?.votes?.length}</span>
              </p>
              <p>
                <strong>Percentage:</strong>{" "}
                <span className="vote-percentage">
                  {((optionOne?.votes.length / users.length) * 100).toFixed(0) +
                    "%"}
                </span>
              </p>
            </div>
          </div>
          <div className="option-btn">
            <button
              onClick={(e) => handleVoteQuestion(e, "optionOne", "optionTwo")}
            >
              Click
            </button>
          </div>
        </div>
        <div
          className={
            optionTwo?.votes.includes(authedUser) ? "option selected" : "option"
          }
        >
          <div className="option-text">
            <p>{optionTwo.text}</p>
            <div className="vote-info">
              <p>
                <strong>Votes:</strong>{" "}
                <span className="vote-count">{optionTwo?.votes?.length}</span>
              </p>
              <p>
                <strong>Percentage:</strong>{" "}
                <span className="vote-percentage">
                  {((optionTwo?.votes.length / users.length) * 100).toFixed(0) +
                    "%"}
                </span>
              </p>
            </div>
          </div>
          <div className="option-btn">
            <button
              onClick={(e) => handleVoteQuestion(e, "optionTwo", "optionOne")}
            >
              Click
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { question_id } = props.router.params;
  const question = questions[question_id] ?? null;

  return {
    authedUser,
    users,
    question,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetailPage));
