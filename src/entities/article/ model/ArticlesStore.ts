import { authFetch } from '../../../shared/api/apiAuth';
import { Article } from '../../../shared/utils/types';
import { makeAutoObservable } from 'mobx';

interface Data {
  articles: Article[];
  articlesCount: number;
}

const API_ENDPOINTS = {
  ALL_ARTICLES: '/articles',
  FEED_ARTICLES: '/articles/feed',
  ARTICLE: (slug: string) => `/articles/${slug}`,
};

class ArticlesStore {
  data: Data = { articles: [], articlesCount: 0 };
  article: Article | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  totalPages = (count: number) => Math.ceil(this.data.articlesCount / count);

  setArticle = (article: Article) => {
    this.article = article;
  };

  clearArticle = () => {
    this.article = null;
  };

  setData = (data: Data) => {
    this.data = data;
    this.isLoading = false;
  };

  setIsLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  fetchArticles = async (url: string) => {
    this.setIsLoading(true);
    try {
      const response = await authFetch(url);
      if (!response.ok) throw new Error('Ошибка запроса');
      const data = await response.json();
      this.setData(data);
    } catch (error) {
      this.setIsLoading(false);
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchAllArticles = (count: number, page: number) => {
    const offset = (page - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}`;
    this.fetchArticles(url);
  };

  fetchFeedArticles = (count: number, page: number) => {
    const offset = (page - 1) * count;
    const url = `${API_ENDPOINTS.FEED_ARTICLES}?limit=${count}&offset=${offset}`;
    this.fetchArticles(url);
  };

  fetchFilteredArticles = (count: number, tag: string, page: number) => {
    const offset = (page - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}&tag=${tag}`;
    this.fetchArticles(url);
  };

  fetchUserArticles = (
    count: number,
    username: string | undefined,
    page: number,
  ) => {
    const offset = (page - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}&author=${username}`;
    this.fetchArticles(url);
  };

  fetchFavoritedArticles = (
    count: number,
    username: string | undefined,
    page: number,
  ) => {
    const offset = (page - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}&favorited=${username}`;
    this.fetchArticles(url);
  };

  fetchArticle = async (
    slug: string,
    { onError }: { onError?: () => void },
  ) => {
    const url = API_ENDPOINTS.ARTICLE(slug);
    try {
      const response = await authFetch(url);
      if (!response.ok) throw new Error('Ошибка запроса');
      const data = await response.json();
      this.setArticle(data.article);
    } catch (error) {
      if (onError) onError();
    }
  };
}

export default new ArticlesStore();
