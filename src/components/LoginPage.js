import { Fragment, useState } from "react";
import { connect } from "react-redux";
import { handleLoginUser } from "../actions/authedUser";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ dispatch }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(handleLoginUser({ user, password }));

    setUser("");
    setPassword("");

    navigate("/");
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
      <h1 className="center" data-testid={"login-page-title"}>Employee Polls</h1>
      <div className="avartar-login">
        <img
          className="img-login"
          src="../images/avatar_login.jpg"
          alt="Avatar"
        />
      </div>
      <div>
        <h3 className="center">Login</h3>
        <form className="session-login" onSubmit={handleSubmit}>
          <div className="item">
            <span className="center">User</span>
            <div className="item-input">
              <input
                type="text"
                required
                maxLength={280}
                placeholder="User"
                value={user}
                onChange={handleUserInputChange}
              />
            </div>
          </div>
          <div className="item">
            <span className="center">Password</span>
            <div className="item-input">
              <input
                className="item-input"
                placeholder="Password"
                value={password}
                onChange={handlePasswordInputChange}
                maxLength={280}
                type="password"
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

export default connect()(LoginPage);
