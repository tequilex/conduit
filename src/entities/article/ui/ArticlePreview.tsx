import { IoHeart } from "react-icons/io5";
import { useStores } from "../../../app/RootStore.context";
import { Link } from "react-router-dom";
import { Author } from "../../user/ui/Author";
import styles from "./styles.module.scss";
import { Article } from "../../../shared/utils/types";
import { Tag } from "../../../shared/ui/Tag";
import { useState } from "react";
import { likerToggleArticle } from "../../../features/article/LikerToggleArticle/lib/likerToggleArticle";

interface ArticlePreviewProps {
  article: Article;
}

export function ArticlePreview({ article }: ArticlePreviewProps) {
  const {
    userStore: { user },
  } = useStores();
  const [updatedArticle, setUpdatedArticle] = useState(article);
  const { username } = article.author;
  const { author, slug, tagList, createdAt } = article;

  const toggleLike = () => {
    if (!slug) return;
    likerToggleArticle(slug, updatedArticle)
      .then((response) => response.json())
      .then((response) => setUpdatedArticle(response.article));
  };

  return (
    <div className={styles.articleCard}>
      <div className={styles.group}>
        <Link to={`/profiles/${username}`}>
          <Author date={createdAt} author={author} />
        </Link>
        {!user ? null : (
          <div
            onClick={toggleLike}
            className={
              updatedArticle.favorited ? styles.likeWrapActive : styles.likeWrap
            }
          >
            <IoHeart size={16} /> {updatedArticle.favoritesCount}
          </div>
        )}
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
