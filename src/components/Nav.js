import { Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    menuName: "Home",
    active: "/" === window.location.pathname,
  },
  {
    path: "/leader-board",
    menuName: "Leader Board",
    active: "/leader-board" === window.location.pathname,
  },
  {
    path: "/new",
    menuName: "New",
    active: "/new" === window.location.pathname,
  },
];
const Nav = () => {
  const handlerClickMenuItem = (item) => {
    if (item) {
      routes.forEach((route) => {
        route.active = route.path === window.location.pathname;
      });
    }
  };

  const logout = () => {};
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
          <img
            src="https://img.icons8.com/?size=100&id=975TGR2GPGX1&format=png&color=000000"
            alt="sarahedo"
          />
          <span>sarahedo</span>
        </div>
        <a href="#" onClick={logout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Nav;
