import { useParams, Link, useNavigate } from 'react-router-dom';
import { Author } from '../../../entities/user/ui/Author';
import styles from './styles.module.scss';
import { Tag } from '../../../shared/ui/Tag';
import { Container } from '../../../shared/ui/Container';
import { Loader } from '../../../shared/ui/Loader';
import { DeleteArticle } from '../../../features/article/deleteArticle/ui';
import { LikerToggleArticle } from '../../../features/article/likerToggleArticle/ui';
import { ToggleFollowProfile } from '../../../features/profile/toggleFollowProfile/ui';
import { FormCreateComment } from '../../../widgets/FormCreateComment/ui';
import { useStores } from '../../../app/RootStore.context';
import { likerToggleArticle } from '../../../features/article/likerToggleArticle/lib/likerToggleArticle';
import { toggleFollowProfile } from '../../../features/profile/toggleFollowProfile/api/toggleFollowProfile';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const Article = observer(() => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    userStore: { user },
    articlesStore: { article, fetchArticle, clearArticle, setArticle },
  } = useStores();

  useEffect(() => {
    if (!slug) return;
    fetchArticle(slug, {
      onError: () => navigate('/'),
    });
    return () => {
      clearArticle();
    };
  }, [slug, fetchArticle, navigate, clearArticle]);

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
    if (!slug) return;
    likerToggleArticle(slug, article)
      .then((response) => response.json())
      .then((response) => setArticle(response.article));
  };

  const toggleFollow = () => {
    toggleFollowProfile(username, article)
      .then((response) => response.json())
      .then((response) =>
        setArticle({
          ...article,
          author: {
            ...response.profile,
          },
        }),
      );
  };

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <Container>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.userInfo}>
            <Link to={`/profiles/${username}`}>
              <Author
                date={article.createdAt}
                author={article.author}
              />
            </Link>
            {!user ? null : isCreater ? (
              <div className={styles.groupButtons}>
                <Link
                  className={styles.editButton}
                  to={`/editor/${slug}`}>
                  Edit Article
                </Link>
                <DeleteArticle slug={slug} />
              </div>
            ) : (
              <div className={styles.groupButtons}>
                <ToggleFollowProfile
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
            <Tag
              key={tag}
              tag={tag}
            />
          ))}
        </ul>
        <hr />
        <div className={styles.articleFooter}>
          <div className={styles.userInfo}>
            <Link to={`/profiles/${username}`}>
              <Author author={article.author} />
            </Link>
            {!user ? null : isCreater ? (
              <div className={styles.groupButtons}>
                <Link
                  className={styles.editButton}
                  to={`/editor/${slug}`}>
                  Edit Article
                </Link>
                <DeleteArticle slug={slug} />
              </div>
            ) : (
              <div className={styles.groupButtons}>
                <ToggleFollowProfile
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
              <Link
                className={styles.footerLinks}
                to='/signIn'>
                Sign in
              </Link>{' '}
              or{' '}
              <Link
                className={styles.footerLinks}
                to='/signUp'>
                sign up
              </Link>{' '}
              to add comments on this article.
            </span>
          ) : (
            <FormCreateComment slug={slug} />
          )}
        </div>
      </Container>
    </div>
  );
});

export default Article;
