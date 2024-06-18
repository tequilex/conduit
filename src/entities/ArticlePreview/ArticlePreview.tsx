import { IoHeart } from 'react-icons/io5';
import { Link } from "react-router-dom";
import { Author } from "../Author";
import styles from "./styles.module.scss";
import { Article } from "../../shared/utils/types";
import { Tag } from "../../shared/ui/Tag";
import { authFetch } from '../../shared/api/apiAuth';
import { useState } from 'react';

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const [newArticle, setNewArticle] = useState(article)
  const { username } = article.author;
  const { author, slug, tagList, createdAt } = article;

  const toggleLike = () => {
    authFetch(`/articles/${slug}/favorite`, {
      method: newArticle.favorited ? "DELETE" : "POST",
    })
      .then((response) => response.json())
      .then((response) => setNewArticle(response.article));
};

  return (
    <div className={styles.articleCard}>
      <div className={styles.group}>
        <Link to={`/profiles/${username}`}>
          <Author date={createdAt} author={author} />
        </Link>
        <div onClick={toggleLike} className={newArticle.favorited ? styles.likeWrapActive : styles.likeWrap}>
        <IoHeart size={16} /> {newArticle.favoritesCount}
        </div>
      </div>
      <Link to={`/articles/${slug}`}>
        <div className={styles.articleInfo}>
          <h2 className={styles.title}>{article.title}</h2>
          <p className={styles.description}>{article.description}</p>
        </div>
      </Link>
      <div className={styles.articleBottom}>
        <Link className={styles.cardLink} to={`/articles/${slug}`}>
          Read more...
        </Link>
        <ul className={styles.tagList}>
          {tagList.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
      </div>
    </div>
  );
}
