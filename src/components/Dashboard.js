import { connect } from "react-redux";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helpers";

const isUnanswered = (question, answerKeys) =>
  !answerKeys.includes(question.id);

const isAnswered = (question, answerKeys) => answerKeys.includes(question.id);

const Dashboard = (props) => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const questions = Object.values(props.questions);
  const answerKeys = Object.keys(props.currentQuestionAnswers);
  const answered = questions
    .filter((f) => isAnswered(f, answerKeys))
    .sort((preQuestion, nextQuestion) => {
      let sum = nextQuestion.timestamp - preQuestion.timestamp;

      return sum;
    });
  const unanswered = questions
    .filter((f) => isUnanswered(f, answerKeys))
    .sort((preQuestion, nextQuestion) => {
      let sum = nextQuestion.timestamp - preQuestion.timestamp;

      return sum;
    });

  const handleShowDetail = (e, question_id) => {
    e.preventDefault();

    navigate(`/questions/${question_id}`);
  };

  return (
    <Fragment>
      <button
        className={`toggle-btn ${toggle ? "toggled" : ""}`}
        onClick={() => setToggle(!toggle)}
      >
        <div className="thumb"></div>
      </button>
      {unanswered.length > 0 && !toggle && (
        <div className="section">
          <div className="section-title">New Questions</div>
          <div className="card-container">
            {unanswered.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <div className="card-body">
                    <div className="username">{item.author}</div>
                    <div className="timestamp">
                      {formatDate(item.timestamp)}
                    </div>
                  </div>
                  <button
                    className="show-btn"
                    onClick={(e) => handleShowDetail(e, item.id)}
                  >
                    Show
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {answered.length > 0 && toggle && (
        <div className="section">
          <div className="section-title">Done</div>
          <div className="card-container">
            {answered.length > 0 &&
              answered.map((item) => {
                return (
                  <div className="card" key={item.id}>
                    <div className="card-body">
                      <div className="username">{item.author}</div>
                      <div className="timestamp">
                        {formatDate(item.timestamp)}
                      </div>
                    </div>
                    <button
                      className="show-btn"
                      onClick={(e) => handleShowDetail(e, item.id)}
                    >
                      Show
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => {
  const currentQuestionAnswers = authedUser ? users[authedUser].answers : [];

  return {
    authedUser,
    questions,
    currentQuestionAnswers,
  };
};

export default connect(mapStateToProps)(Dashboard);
