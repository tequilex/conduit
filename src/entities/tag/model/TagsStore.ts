import { authFetch } from '../../../shared/api/apiAuth';
import { makeAutoObservable } from 'mobx';

class TagsStore {
  tags: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTags = (tags: string[]) => {
    this.tags = tags;
  };

  fetchTags = () => {
    authFetch('/tags')
      .then((response) => response.json())
      .then((data) => this.setTags(data.tags));
  };
}

export default new TagsStore();
