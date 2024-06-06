import { Outlet, Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className="header">
        <div className="container">
          <Link to="/">conduit</Link>
          <ul className="header-list">
            <li className="header-item">
              <Link to="/">Home</Link>
              <Link to="/signIn">Sign in</Link>
              <Link to="/signUp">Sign up</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
