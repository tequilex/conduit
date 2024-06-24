import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { deleteArticle } from '../api/deleteArticle';

interface DeleteArticleProps {
  slug?: string;
}

export function DeleteArticle({ slug }: DeleteArticleProps) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!slug) return;
    deleteArticle(slug).then(() => navigate('/'));
  };

  return (
    <button
      onClick={handleDelete}
      className={styles.deleteButton}>
      Delete Article
    </button>
  );
}
