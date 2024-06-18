import { useNavigate } from 'react-router-dom'
import { authFetch } from '../../../shared/api/apiAuth'
import styles from './styles.module.scss'

interface DeleteArticleProps {
  slug?: string 
}

export function DeleteArticle({slug}: DeleteArticleProps) {
const navigate = useNavigate()

  const handleDelete = () => {
    console.log(slug);

    authFetch(`/articles/${slug}`, {
      method: 'DELETE'
    })
    .then(() => navigate('/'))
    
  }

  return <button onClick={handleDelete} className={styles.deleteButton}>Delete Article</button>
}