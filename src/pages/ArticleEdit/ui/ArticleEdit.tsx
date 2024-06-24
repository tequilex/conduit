import { useParams } from 'react-router-dom';
import { Container } from '../../../shared/ui/Container';
import { FormCreateArticle } from '../../../widgets/FormCreateArticle/ui';
import { FormEditArticle } from '../../../widgets/FormEditArticle/ui';
import styles from './styles.module.scss';

export function ArticleEdit() {
  const { slug } = useParams();

  return (
    <div className={styles.editor}>
      <Container>
        <h1 className={styles.title}>Article</h1>
        {slug ? <FormEditArticle /> : <FormCreateArticle />}
      </Container>
    </div>
  );
}
