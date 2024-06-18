import { Profile } from '../../../shared/utils/types'
import { FaPlus } from "react-icons/fa";
import styles from './styles.module.scss'


interface FollowingAuthorProp {
  author: Profile,
  toggleFollow: () => void
}

export function FollowProfile({author, toggleFollow}: FollowingAuthorProp) {
  const {following, username} = author

  return <>
    {following ? (
        <button onClick={toggleFollow} className={styles.unfollowButton}>
          <FaPlus />  UnFollow {username}
        </button>
      ) : (
        <button onClick={toggleFollow} className={styles.followButton}>
          <FaPlus />  Follow {username}
        </button>
      )}
  </>
}