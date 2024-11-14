import { render, screen } from "@testing-library/react";
import LeaderBoardPage from "../../components/LeaderBoardPage";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

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

describe("LeaderBoardPage component", () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    users: mockUsers,
  });

  it("should render the correct number question answered of user1", () => {
    render(
      <Provider store={store}>
        <LeaderBoardPage />
      </Provider>
    );

    const cells = screen.getAllByTestId("answered");
    const cell = cells[0];
    expect(cell.innerHTML).toEqual("2");
  });
});
