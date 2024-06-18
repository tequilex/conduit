import { Link } from "react-router-dom";
import formatDate from "../../utils/dateFormatter";
import styles from "./styles.module.scss";

interface FooterProps {
  avatar?: string;
  button: JSX.Element;
  username?: string,
  date?: string 
}

export function CommentFooter({ avatar, button, username, date = '' }: FooterProps) {

  const formattedDate = formatDate(date)

  return (
    <div className={styles.footer}>
      <div className={styles.authorInfo}>
        <img className={styles.avatar} src={avatar} alt="user_avatar" />
        <Link to={`/profiles/${username}`}>
        <div className={styles.username}>{username}</div>
        </Link>
        <div className={styles.date}>{formattedDate}</div>
      </div>
      {button}
    </div>
  );
}
