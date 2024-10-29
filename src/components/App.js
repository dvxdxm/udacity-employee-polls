import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";
import Nav from "./Nav";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import LoginPage from "./LoginPage";

const App = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    props.dispatch(handleInitialData());
    if (props.authedUser === null) {
      navigate("/login");
    }
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.authedUser === null ? (
          <Routes>
            <Route path="/login" exact element={<LoginPage />} />
          </Routes>
        ) : (
          <div>
            <Nav />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/tweet/:id" element={<TweetPage />} />
              <Route path="/new" element={<NewTweet />} />
            </Routes>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
