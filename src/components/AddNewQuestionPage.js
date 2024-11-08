import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddNewPoll } from "../actions/questions";

const AddNewQuestionPage = ({ dispatch }) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleAddNewPoll({ optionOne, optionTwo }));

    setOptionOne("");
    setOptionTwo("");

    navigate("/");
  };
  const handleOptionOneInputChange = (e) => {
    const text = e.target.value;

    setOptionOne(text);
  };
  const handleOptionTwoInputChange = (e) => {
    const text = e.target.value;

    setOptionTwo(text);
  };

  const hasValidToSubmit = optionOne && optionTwo;

  return (
    <Fragment>
      <h1 className="center">Would You Rather</h1>

      <div>
        <span className="center title-new-poll">Create Your Own Poll</span>
        <form className="session-login" onSubmit={handleSubmit}>
          <div className="item">
            <span className="center">First Option</span>
            <div className="item-input">
              <input
                type="text"
                required
                maxLength={280}
                placeholder="Option One"
                value={optionOne}
                onChange={handleOptionOneInputChange}
              />
            </div>
          </div>
          <div className="item">
            <span className="center">Second Option</span>
            <div className="item-input">
              <input
                className="item-input"
                required
                placeholder="Option Two"
                value={optionTwo}
                onChange={handleOptionTwoInputChange}
                maxLength={280}
                type="text"
              />
            </div>
          </div>
          <div className="login-btn">
            <button className="btn" type="submit" disabled={!hasValidToSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(AddNewQuestionPage);
