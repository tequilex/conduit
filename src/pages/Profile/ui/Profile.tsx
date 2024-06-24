import { ProfileInfo } from '../../../entities/user/ui/ProfileInfo/index.ts';
import { ArticlePreview } from '../../../entities/article/ui/ArticlePreview.tsx';
import { Pagination } from '../../../shared/ui/Pagination/index.ts';
import { Container } from '../../../shared/ui/Container/index.ts';
import { Tabs } from '../../../shared/ui/Tabs/Tabs.tsx';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader } from '../../../shared/ui/Loader/Loader.tsx';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { useStores } from '../../../app/RootStore.context.ts';
import { observer } from 'mobx-react-lite';

const defaultTabs = [
  {
    key: '1',
    name: 'My articles',
  },
  {
    key: '2',
    name: 'Favorited Articles',
  },
];

const Profile = observer(() => {
  const {
    userStore: { user },
    profileStore: { profile, fetchProfile, clearProfile },
    articlesStore: {
      data,
      currentPage,
      totalPages,
      setPage,
      fetchUserArticles,
      fetchFavoritedArticles,
    },
  } = useStores();

  const [activeTab, setActiveTab] = useState(defaultTabs[0].key);
  const { username } = useParams<{ username: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;
    fetchProfile(username, {
      onError: () => navigate('/'),
    });
    return () => {
      clearProfile();
    };
  }, [fetchProfile, navigate, username, clearProfile]);

  useEffect(() => {
    setPage(1);
    if (activeTab === '1') fetchUserArticles(5, username);
    if (activeTab === '2') fetchFavoritedArticles(5, username);
  }, [activeTab, fetchUserArticles, fetchFavoritedArticles, username, setPage]);

  const isLoginProfile = username === user?.username;

  if (!profile) {
    return (
      <div className={styles.loaderWrap}>
        <Loader />
      </div>
    );
  }

  const handlePageChange = (page: number) => {
    setPage(page);
    if (activeTab === '1') {
      fetchUserArticles(5, username);
    } else if (activeTab === '2') {
      fetchFavoritedArticles(5, username);
    }
  };

  const handleTabs = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.userInfo}>
        <Container>
          <ProfileInfo profile={profile} />
        </Container>
      </div>
      <Container>
        {isLoginProfile ? (
          <Tabs
            items={defaultTabs}
            handleTabs={handleTabs}
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key)}
          />
        ) : null}
        {data.articles.map((article) => (
          <ArticlePreview
            key={article.slug}
            article={article}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages(5)}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
});

export default Profile;
