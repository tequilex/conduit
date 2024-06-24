import { authFetch } from '../../../../shared/api/apiAuth';

export const deleteArticle = (slug: string) => {
  return authFetch(`/articles/${slug}`, {
    method: 'DELETE',
  });
};
