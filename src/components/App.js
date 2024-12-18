import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import AddNewQuestionPage from "./AddNewQuestionPage";
import LeaderBoardPage from "./LeaderBoardPage";
import Nav from "./Nav";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import QuestionDetailPage from "./QuestionDetailPage";
import { useNavigate } from "react-router-dom";
import { AUTHENTICATED_USER } from "../utils/constant";

const App = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    props.dispatch(handleInitialData());
    const userAuthenticated = localStorage.getItem(AUTHENTICATED_USER);
    if (props.authedUser === null && userAuthenticated === null) {
      navigate("/login", { state: { path: location.pathname } });
    }
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      {props.authedUser !== null && <Nav />}
      <div className="container">
        {props.authedUser === null ? (
          <Routes>
            <Route path="/login" exact element={<LoginPage />} />
          </Routes>
        ) : (
          <div>
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/leader-board" element={<LeaderBoardPage />} />
              <Route path="/new" element={<AddNewQuestionPage />} />
              <Route
                path="/questions/:question_id"
                element={<QuestionDetailPage />}
              />
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
