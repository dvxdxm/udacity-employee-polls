import { render, screen } from "@testing-library/react";
import AddNewQuestionPage from "../../components/AddNewQuestionPage";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("AddNewQuestionPage component", () => {
  const mockStore = configureMockStore();
  const store = mockStore({});

  it("should render success when access create question", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <AddNewQuestionPage />
      </Provider>
    );

    const title = screen.getByTestId("title-poll");
    expect(title.innerHTML).toEqual("Would You Rather");

    const button = screen.getByText("Submit");
    expect(button.hasAttribute("disabled")).toBe(true);
  });
});
