import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginUser } from "../actions/authedUser";

const LoginPage = (dispatch) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleLoginUser(user, password));

    setUser("");
    setPassword("");

    // if (!id) {
    //   navigate("/");
    // }
  };

  const handleUserInputChange = (e) => {
    const text = e.target.value;

    setUser(text);
  };

  const handlePasswordInputChange = (e) => {
    const text = e.target.value;

    setPassword(text);
  };

  const hasValidToSubmit = user && password;

  return (
    <Fragment>
      <h1 className="center">Employee Polls</h1>
      <img src="" alt="Avatar" />
      <div>
        <h3 className="center">Login</h3>
        <form className="session-login" onSubmit={handleSubmit}>
          <input
            placeholder="User"
            value={user}
            onChange={handleUserInputChange}
            maxLength={280}
          />
          <input
            placeholder="Password"
            value={password}
            onChange={handlePasswordInputChange}
            maxLength={280}
            type="password"
          />
          <button className="btn" type="submit" disabled={hasValidToSubmit}>
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect()(LoginPage);
