import { authFetch } from "../../../../shared/api/apiAuth";

export const createComment = (slug: string, bodyComment: string) => {
  return authFetch(`/articles/${slug}/comments`, {
    body: JSON.stringify({ comment: { body: bodyComment } }),
    method: "POST",
  });
};
