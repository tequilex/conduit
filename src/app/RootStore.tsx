import UserStore from '../entities/user/model/UserStore';
import ProfileStore from '../entities/user/model/ProfileStore';
import ArticlesStore from '../entities/article/ model/ArticlesStore';
import TagsStore from '../entities/tag/model/TagsStore';
import CommentsStore from '../entities/comment/model/CommentsStore';

class RootStore {
  userStore = UserStore;
  articlesStore = ArticlesStore;
  tagsStore = TagsStore;
  profileStore = ProfileStore;
  commentsStore = CommentsStore;
}

export default RootStore;
