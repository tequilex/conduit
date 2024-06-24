import { Profile } from '../../shared/utils/types';
import styles from './styles.module.scss';

interface ProfileProps {
  profile: Profile;
}

export function ProfileInfo({ profile }: ProfileProps) {
  return (
    <div className={styles.profileWrap}>
      <img
        className={styles.avatar}
        src={profile.image}
        alt={profile.username}
      />
      <div className={styles.name}>{profile.username}</div>
      <p>{profile.bio}</p>
    </div>
  );
}
