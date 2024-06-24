import { authFetch } from '../../../shared/api/apiAuth';
import { Profile } from '../../../shared/utils/types';
import { makeAutoObservable } from 'mobx';

class ProfileStore {
  profile: Profile | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setProfile = (profile: Profile) => {
    this.profile = profile;
  };

  clearProfile = () => {
    this.profile = null;
  };

  fetchProfile = (username: string, { onError }: { onError?: () => void }) => {
    authFetch(`/profiles/${username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса');
        }
        return response.json();
      })
      .then((data) => this.setProfile(data.profile))
      .catch(() => {
        if (onError) onError();
      });
  };
}

export default new ProfileStore();
