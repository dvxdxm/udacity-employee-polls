import { render, screen, fireEvent } from "@testing-library/react";
import Dashborad from "../../components/Dashboard";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { useNavigate } from "react-router-dom";

// Mock valid data
let mockUsers = {
  user1: {
    id: "user1",
    password: "password123",
    name: "User Test Name",
    avatarURL: "https://test.com",
    answers: {
      questionId1: "optionOne",
      questionId2: "optionTwo",
    },
    questions: ["questionId1", "questionId2"],
  },
};

let mockQuestions = {
  questionId1: {
    id: "questionId1",
    author: "user1",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["user1"],
      text: "Question 1",
    },
    optionTwo: {
      votes: [],
      text: "Question 2",
    },
  },
  questionId2: {
    id: "questionId2",
    author: "user1",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["user1"],
      text: "Question 3",
    },
    optionTwo: {
      votes: [],
      text: "Question 4",
    },
  },
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Dashborad component", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    users: mockUsers,
    questions: mockQuestions,
    authedUser: "user1",
  });

  it("should render the correct number of questions answered of user1", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <Dashborad />
      </Provider>
    );

    const titleElement = screen.getByText("Done");
    expect(titleElement.innerHTML).toEqual("Done");

    const questionAnsweredElements = screen.getAllByText("user1");
    expect(questionAnsweredElements.length).toEqual(2);
  });

  it("should handle click events on questions", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <Dashborad />
      </Provider>
    );

    const buttonElements = screen.getAllByText("Show");
    expect(buttonElements.length).toEqual(2);

    const button = buttonElements[0];
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/questions/questionId1");
  });
});
