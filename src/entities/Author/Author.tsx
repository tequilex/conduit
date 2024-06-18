import formatDate from "../../shared/utils/dateFormatter";
import styles from "./styles.module.scss";

interface Author {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface AuthorProps {
  author: Author;
  date?: string
}

export function Author({ author, date = '' }: AuthorProps) {
  const formattedDate = formatDate(date)

  return (
    <div className={styles.author}>
      <img
        className={styles.authorAvatar}
        src={author.image}
        alt={author.username}
      />
      <div className={styles.info}>
      <h3 className={styles.authorName}>{author.username}</h3>
      <div className={styles.date}>{date ? formattedDate : ''}</div>
      </div>
    </div>
  );
}
