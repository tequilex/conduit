import { authFetch } from '../../../../shared/api/apiAuth';

interface CreateCommentRequest {
  body: string;
}

export const createComment = (
  slug: string,
  bodyComment: CreateCommentRequest,
) => {
  return authFetch(`/articles/${slug}/comments`, {
    body: JSON.stringify({ comment: bodyComment }),
    method: 'POST',
  });
};
