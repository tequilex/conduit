import { authFetch } from "../../../../shared/api/apiAuth";
import { Article } from "../../../../shared/utils/types";

export const likerToggleArticle = (slug: string, article: Article) => {
  return authFetch(`/articles/${slug}/favorite`, {
    method: article.favorited ? "DELETE" : "POST",
  })
}