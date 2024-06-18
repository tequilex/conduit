import { useEffect, useState } from "react";
import { Article } from "../../shared/utils/types";
import { authFetch } from "../../shared/api/apiAuth";

interface Data {
  articles: Article[];
  articlesCount: number;
}

const useGetArticlesQuery = (params: string, itemsPerPage: number) => {
  const [data, setData] = useState<Data>({ articles: [], articlesCount: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [feed, setFeed] = useState("");
  const [tag, setTag] = useState("");
  const { articles, articlesCount } = data;

  useEffect(() => {
    const getAllArticles = () => {
      const offset = (currentPage - 1) * itemsPerPage;
      setIsLoading(true);

      const url = feed
        ? `/articles${feed}limit=${itemsPerPage}&offset=${offset}`
        : `/articles?${params}&limit=${itemsPerPage}&offset=${offset}${
            tag ? `&tag=${tag}` : ""
          }`;

      authFetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch(() => {
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    };
    getAllArticles();
  }, [currentPage, params, itemsPerPage, tag, feed]);

  const totalPages = Math.ceil(articlesCount / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterByTag = (tag: string, page: number = 1) => {
    setTag(tag);
    setCurrentPage(page);
  };

  const deleteTag = () => {
    setTag("");
    setFeed("");
  };

  const getFeed = () => {
    setFeed("/feed?");
    setTag("");
  };

  const getFavoritedArticles = (username: string) => {
    if (username) {
      setFeed(`?favorited=${username}&`);
      setTag("");
    }
  };

  return {
    articles,
    isLoading,
    totalPages,
    currentPage,
    tag,
    feed,
    handlePageChange,
    filterByTag,
    deleteTag,
    getFeed,
    getFavoritedArticles,
  };
};

export default useGetArticlesQuery;
