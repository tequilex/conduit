import { IoHeart } from 'react-icons/io5';
import styles from './styles.module.scss';

interface LikeArticleProp {
  count: number;
  isLiked?: boolean;
  toggleLike: () => void;
}

export function LikerToggleArticle({
  count,
  isLiked,
  toggleLike,
}: LikeArticleProp) {
  return (
    <>
      {isLiked ? (
        <button
          onClick={toggleLike}
          className={styles.dislikeButton}>
          <IoHeart size={16} /> Dislike ({count})
        </button>
      ) : (
        <button
          onClick={toggleLike}
          className={styles.likeButton}>
          <IoHeart size={16} /> Like ({count})
        </button>
      )}
    </>
  );
}
