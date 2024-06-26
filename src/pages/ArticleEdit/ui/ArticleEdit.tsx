import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../../shared/ui/Container';
import { FormCreateArticle } from '../../../widgets/FormCreateArticle/ui';
import { FormEditArticle } from '../../../widgets/FormEditArticle/ui';
import { Loader } from '../../../shared/ui/Loader';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { useStores } from '../../../app/RootStore.context';

export function ArticleEdit() {
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const {
    articlesStore: { article, fetchArticle },
  } = useStores();

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    fetchArticle(slug, {
      onError: () => navigate('/'),
    }).finally(() => setLoading(false));
  }, [slug, fetchArticle, navigate]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.editor}>
      <Container>
        <h1 className={styles.title}>Article</h1>
        {slug && article ? (
          <FormEditArticle article={article} />
        ) : (
          <FormCreateArticle />
        )}
      </Container>
    </div>
  );
}
