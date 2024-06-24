import { makeAutoObservable } from "mobx";
import { Comment } from "../../../shared/utils/types";
import { authFetch } from "../../../shared/api/apiAuth";

class CommentsStore {
  comments: Comment[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setComments = (comments: Comment[] ) => {
    this.comments = comments
  }

  fetchComments = (slug: string) => {
    authFetch(`/articles/${slug}/comments`)
      .then((response) => response.json())
      .then((response) => this.setComments(response.comments));
  }

  cleanComments = () => {
    this.comments = []
  }
}

export default new CommentsStore()