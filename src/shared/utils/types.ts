export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface Params {
  slug?: string
}

export interface Profile {
    username: string,
    bio: string,
    image: string,
    following: boolean
}

export interface LocalStorage {
  email: string,
  token: string,
  username: string,
  bio: string,
  image: string
}

export interface User {
  email: string;
  password: string;
  username?: string;
  image: string
}