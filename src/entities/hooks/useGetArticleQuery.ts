import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authFetch } from "../../shared/api/apiAuth";
import { Article } from "../../shared/utils/types";

const useGetArticleQuery = (slug?: string) => {
  const [article, setArticle] = useState<Article | null>(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!slug) {
      return;
    }

    authFetch(`/articles/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка запроса");
        }
        return response.json();
      })
      .then((data) => setArticle(data.article))
      .catch(() => navigate("/"));
  }, [slug]);

  return {article, setArticle};
};

export default useGetArticleQuery;
