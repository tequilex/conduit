import { authFetch } from "../../../shared/api/apiAuth";
import { Article } from "../../../shared/utils/types";
import { makeAutoObservable } from "mobx";

interface Data {
  articles: Article[];
  articlesCount: number;
}

const API_ENDPOINTS = {
  ALL_ARTICLES: "/articles",
  FEED_ARTICLES: "/articles/feed",
  ARTICLE: (slug: string) => `/articles/${slug}`,
};

class ArticlesStore {
  data: Data = { articles: [], articlesCount: 0 };
  article: Article | null = null;
  currentPage = 1;
  isLoading = false;
  tag = "";

  constructor() {
    makeAutoObservable(this);
  }

  totalPages = (count: number) => Math.ceil(this.data.articlesCount / count);

  setArticle = (article: Article) => {
    this.article = article;
  }

  clearArticle = () => {
    this.article = null;
  }

  setData = (data: Data) => {
    this.data = data;
    this.isLoading = false;
  }

  setPage = (page: number) => {
    this.currentPage = page;
  }

  setIsLoading = (loading: boolean) => {
    this.isLoading = loading;
  }

  setTag = (tag: string) => {
    this.tag = tag;
    this.currentPage = 1;
  }

  fetchArticles = async (url: string) => {
    this.setIsLoading(true);
    try {
      const response = await authFetch(url);
      if (!response.ok) throw new Error("Ошибка запроса");
      const data = await response.json();
      this.setData(data);
    } catch (error) {
      this.setIsLoading(false);
    } finally {
      this.setIsLoading(false);
    }
  }

  fetchAllArticles = (count: number) => {
    const offset = (this.currentPage - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}`;
    this.fetchArticles(url);
  }

  fetchFeedArticles = (count: number) => {
    const offset = (this.currentPage - 1) * count;
    const url = `${API_ENDPOINTS.FEED_ARTICLES}?limit=${count}&offset=${offset}`;
    this.fetchArticles(url);
  }

  fetchFilteredArticles = (count: number, tag: string) => {
    const offset = (this.currentPage - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}&tag=${tag}`;
    this.fetchArticles(url);
  }

  fetchUserArticles = (count: number, username: string | undefined) => {
    const offset = (this.currentPage - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}&author=${username}`;
    this.fetchArticles(url);
  }

  fetchFavoritedArticles = (count: number, username: string | undefined) => {
    const offset = (this.currentPage - 1) * count;
    const url = `${API_ENDPOINTS.ALL_ARTICLES}?limit=${count}&offset=${offset}&favorited=${username}`;
    this.fetchArticles(url);
  }

  fetchArticle = async (slug: string, { onError }: { onError?: () => void }) => {
    const url = API_ENDPOINTS.ARTICLE(slug);
    try {
      const response = await authFetch(url);
      if (!response.ok) throw new Error("Ошибка запроса");
      const data = await response.json();
      this.setArticle(data.article);
    } catch (error) {
      if (onError) onError();
    }
  }
}

export default new ArticlesStore();


// import { authFetch } from "../../../shared/api/apiAuth";
// import { Article } from "../../../shared/utils/types";
// import { makeAutoObservable } from "mobx";

// interface Data {
//   articles: Article[];
//   articlesCount: number;
// }

// class ArticlesStore {
//   data: Data = { articles: [], articlesCount: 0 };
//   article: Article | null = null
//   currentPage = 1;
//   isLoading = false;
//   tag = "";

//   constructor() {
//     makeAutoObservable(this);
//   }

//   totalPages = (count: number) => {
//     return Math.ceil(this.data.articlesCount / count)
//   }

//   setArticle = (article: Article) => {
//     this.article = article
//   }

//   clearArticle = () => {
//     this.article = null;
//   };

//   setData = (data: Data) => {
//     this.data = data;
//     this.isLoading = false
//   };

//   setPage = (page: number) => {
//     this.currentPage = page;
    
//   };

//   setIsLoading = (loading: boolean) => {
//     this.isLoading = loading;
//   };

//   setTag = (tag: string) => {
//     this.tag = tag;
//     this.currentPage = 1;
//   };

//   fetchAllArticles = (count: number) => {
//     const offset = (this.currentPage - 1) * count;
//     this.setIsLoading(true);

//     const url = `/articles?limit=${count}&offset=${offset}`

//     authFetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setData(data);
//       })
//       .catch(() => {
//         this.setIsLoading(false);
//       })
//       .finally(() => this.setIsLoading(false));
//   };

//   fetchFeedArticles = (count: number) => {
//     const offset = (this.currentPage - 1) * count;
//     this.setIsLoading(true);

//     const url = `/articles/feed?limit=${count}&offset=${offset}`

//     authFetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setData(data);
//       })
//       .catch(() => {
//         this.setIsLoading(false);
//       })
//       .finally(() => this.setIsLoading(false));
//   };

//   fetchFilteredArticles = (count: number, tag: string) => {
//     const offset = (this.currentPage - 1) * count;
//     this.setIsLoading(true);

//     const url = `/articles?limit=${count}&offset=${offset}&tag=${tag}`
//     authFetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setData(data);
//       })
//       .catch(() => {
//         this.setIsLoading(false);
//       })
//       .finally(() => this.setIsLoading(false));
//   };

//   fetchUserArticles = (count: number, username: string | undefined) => {
//     const offset = (this.currentPage - 1) * count;
//     this.setIsLoading(true);

//     const url = `/articles?limit=${count}&offset=${offset}&author=${username}`
//     authFetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setData(data);
//       })
//       .catch(() => {
//         this.setIsLoading(false);
//       })
//       .finally(() => this.setIsLoading(false));
//   };


//   fetchFavoritedArticles = (count: number, username: string | undefined) => {
//     const offset = (this.currentPage - 1) * count;
//     this.setIsLoading(true);

//     const url = `/articles?limit=${count}&offset=${offset}&favorited=${username}`
//     authFetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         this.setData(data);
//       })
//       .catch(() => {
//         this.setIsLoading(false);
//       })
//       .finally(() => this.setIsLoading(false));
//   };

//   fetchArticle = (slug: string, {onError}: { onError?: () => void }) => {
//     authFetch(`/articles/${slug}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Ошибка запроса");
//         }
//         return response.json();
//       })
//       .then((data) => this.setArticle(data.article))
//       .catch(() => {if (onError) onError()});
//   }
// }

// export default new ArticlesStore();
