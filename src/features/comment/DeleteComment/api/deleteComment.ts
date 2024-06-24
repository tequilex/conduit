import { authFetch } from "../../../../shared/api/apiAuth";

export const deleteComment = (slug: string, id: number) => {
  return authFetch(`/articles/${slug}/comments/${id}`, {
    method: "DELETE",
})
}