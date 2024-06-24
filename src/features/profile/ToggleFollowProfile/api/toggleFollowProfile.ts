import { authFetch } from '../../../../shared/api/apiAuth';
import { Article } from '../../../../shared/utils/types';

export const toggleFollowProfile = (username: string, article: Article) => {
  return authFetch(`/profiles/${username}/follow`, {
    method: article.author.following ? 'DELETE' : 'POST',
  });
};
