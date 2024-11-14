import { render, screen } from "@testing-library/react";
import LoginPage from "../../components/LoginPage";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LoginPage component", () => {
  const mockStore = configureMockStore();
  const store = mockStore({});
  
  it("should render success when access login to app", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    const title = screen.getByTestId("login-page-title");
    expect(title.innerHTML).toEqual("Employee Polls");

    const button = screen.getByText("Submit");
    expect(button.hasAttribute("disabled")).toBe(true);
  });
});
