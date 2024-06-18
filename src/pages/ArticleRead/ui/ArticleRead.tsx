import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Author } from "../../../entities/Author";
import { UserContext } from "../../../entities/User/user.context";
import styles from "./styles.module.scss";
import { Tag } from "../../../shared/ui/Tag";
import { Container } from "../../../shared/ui/Container";
import useGetArticleQuery from "../../../entities/hooks/useGetArticleQuery";
import { Loader } from "../../../shared/ui/Loader";
import { DeleteArticle } from "../../../features/article/deleteArticle";
import { LikerToggleArticle } from "../../../features/article/LikerToggleArticle";
import { authFetch } from "../../../shared/api/apiAuth";
import { FollowProfile } from "../../../features/profile/followProfile";
import { FormCreateComment } from "../../../widgets/FormCreateComment";

export function ArticleRead() {
  const { slug } = useParams();
  const { article, setArticle } = useGetArticleQuery(slug);
  const { user } = useContext(UserContext);

  if (!article) {
    return (
      <div className={styles.loaderWrap}>
        <Loader />
      </div>
    );
  }

  const { username } = article.author;

  const isCreater = username === user?.username;
  const isLiked = article.favorited;

  const toggleLike = () => {
      authFetch(`/articles/${slug}/favorite`, {
        method: article.favorited ? "DELETE" : "POST",
      })
        .then((response) => response.json())
        .then((response) => setArticle(response.article));
  };

  const toggleFollow = () => {
    authFetch(`/profiles/${username}/follow`, {
      method: article.author.following ? "DELETE" : "POST",
    })
      .then((response) => response.json())
      .then((response) =>
        setArticle({
          ...article,
          author: {
            ...response.profile,
          },
        })
      );
  };

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <Container>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.userInfo}>
            <Link to={`/profiles/${username}`}>
              <Author date={article.createdAt} author={article.author} />
            </Link>
            {isCreater ? (
              <div className={styles.groupButtons}>
                <Link className={styles.editButton} to={`/editor/${slug}`}>
                  Edit Article
                </Link>
                <DeleteArticle slug={slug} />
              </div>
            ) : (
              <div className={styles.groupButtons}>
                <FollowProfile
                  toggleFollow={toggleFollow}
                  author={article.author}
                />
                <LikerToggleArticle
                  toggleLike={toggleLike}
                  isLiked={isLiked}
                  count={article.favoritesCount}
                />
              </div>
            )}
          </div>
        </Container>
      </div>
      <Container>
        <div className={styles.containerDescription}>
          <p>{article.body}</p>
        </div>
        <ul className={styles.tagList}>
          {article.tagList.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
        <hr />
        <div className={styles.articleFooter}>
          <div className={styles.userInfo}>
            <Link to={`/profiles/${username}`}>
              <Author author={article.author} />
            </Link>
            {isCreater ? (
              <div className={styles.groupButtons}>
                <Link className={styles.editButton} to={`/editor/${slug}`}>
                  Edit Article
                </Link>
                <DeleteArticle slug={slug} />
              </div>
            ) : (
              <div className={styles.groupButtons}>
                <FollowProfile
                  toggleFollow={toggleFollow}
                  author={article.author}
                />
                <LikerToggleArticle
                  toggleLike={toggleLike}
                  isLiked={isLiked}
                  count={article.favoritesCount}
                />
              </div>
            )}
          </div>
          {!user ? (
            <span>
              <Link className={styles.footerLinks} to="/signIn">
                Sign in
              </Link>{" "}
              or{" "}
              <Link className={styles.footerLinks} to="/signUp">
                sign up
              </Link>{" "}
              to add comments on this article.
            </span>
          ) : (
            <FormCreateComment slug={slug} />
          )}
        </div>
      </Container>
    </div>
  );
}
