import { connect } from "react-redux";
import { handleToggleTweet } from "../actions/tweets";
import { Fragment } from "react";
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
  const handleVote = (e) => {
    e.preventDefault();

    const { dispatch, tweet, authedUser } = props;

    // dispatch(
    //   handleToggleTweet({
    //     id: tweet.id,
    //     hasLiked: tweet.hasLiked,
    //     authedUser,
    //   })
    // );
  };

  if (props.question === null) {
    return <p>This Poll doesn't exist</p>;
  }

  const { author, optionOne, optionTwo } = props.question;
  const { avatarURL } = props.author;

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
        <div className="option">
          <div className="option-text">
            <p>{optionOne.text}</p>
          </div>
          <div className="option-btn">
            <button>Click</button>
          </div>
        </div>
        <div className="option">
          <div className="option-text">
            <p>{optionTwo.text}</p>
          </div>
          <div className="option-btn">
            <button>Click</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { question_id } = props.router.params;
  const question = questions[question_id];
  
  const author = users[question.author];
  return {
    authedUser,
    author,
    question,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionDetailPage));
