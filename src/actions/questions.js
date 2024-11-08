import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { updateUser } from "../actions/users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleVotedQuestion({ questionId, newAnswer, currentAnswer }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser,
      questionId,
      newAnswer,
      currentAnswer,
    })
      .then(({ question, user }) => {
        dispatch(addQuestion(question));
        dispatch(updateUser(user));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddNewPoll({ optionOne, optionTwo }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser,
    })
      .then((questions) => {
        dispatch(receiveQuestions(questions));
      })
      .then(() => dispatch(hideLoading()));
  };
}
