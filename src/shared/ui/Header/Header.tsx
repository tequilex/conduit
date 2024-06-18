import { useContext } from "react";
import { UserContext } from "../../../entities/User/user.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container } from "../Container";
import styles from "./styles.module.scss";

export function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const logOut = () => {
    localStorage.removeItem('userInfo');
    setUser(null)
    navigate(0)
  }

  return (
    <>
      <div className={styles.header}>
        <Container>
          <div className={styles.container}>
            <Link className={styles.home} to="/">
              conduit
            </Link>
            <ul className={styles.headerList}>
              <li className={styles.headerItem}>
                <Link className={styles.headerLink} to="/">
                  Home
                </Link>
              </li>
              {user ? (
                <>
                  <li className={styles.headerItem}>
                    <Link className={styles.headerLink} to="/editor">
                      New article
                    </Link>
                  </li>
                  <li className={styles.headerItem}>
                    <Link className={styles.headerLink} to="/settings">
                      Settings
                    </Link>
                  </li>
                  <li className={styles.headerItem}>
                    <Link className={styles.headerLink} to={`/profiles/${user.username}`}>
                    <img className={styles.avatar} src={user.image} alt={user.username} />
                      {user.username}
                    </Link>
                  </li>
                  <Link to={'/'}>
                  <li onClick={logOut} className={styles.headerLink}>
                      Log out
                  </li>
                  </Link>
                </>
              ) : (
                <>
                  <li className={styles.headerItem}>
                    <Link className={styles.headerLink} to="/signIn">
                      Sign in
                    </Link>
                  </li>
                  <li className={styles.headerItem}>
                    <Link className={styles.headerLink} to="/signUp">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </Container>
      </div>
      <Outlet />
    </>
  );
}
