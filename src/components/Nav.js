import { Link } from "react-router-dom";
import { AUTHENTICATED_USER } from "../utils/constant";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

let routes = [
  {
    path: "/",
    menuName: "Home",
    active: false,
  },
  {
    path: "/leader-board",
    menuName: "Leader Board",
    active: false,
  },
  {
    path: "/new",
    menuName: "New",
    active: false,
  },
];
const Nav = (props) => {
  const navigate = useNavigate();
  const { authedUser, users } = props;
  const currentUser = users[authedUser];
  // init data
  routes.forEach((route) => {
    route.active = route.path === window.location.pathname;
  });

  const handlerClickMenuItem = (item) => {
    if (item) {
      routes.forEach((route) => {
        route.active = route.path === window.location.pathname;
      });
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTHENTICATED_USER);
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="section-header">
      <nav className="nav">
        <ul>
          {routes.map((item) => {
            return (
              <li
                className={item.active ? "active selected" : ""}
                onClick={() => handlerClickMenuItem(item)}
                key={item.path}
              >
                <Link to={item.path}>{item.menuName}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="section-profile">
        <div className="profile">
          <img src={currentUser.avatarURL} alt={currentUser.id} />
          <span>{currentUser.id}</span>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users,
});

export default connect(mapStateToProps)(Nav);
