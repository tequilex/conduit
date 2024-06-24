import { ArticlePreview } from '../../../entities/article/ui/ArticlePreview.tsx';
import { Pagination } from '../../../shared/ui/Pagination/index.ts';
import { Container } from '../../../shared/ui/Container/index.ts';
import { PopularTags } from '../../../entities/tag/ui/index.ts';
import { Loader } from '../../../shared/ui/Loader/index.ts';
import { Tabs } from '../../../shared/ui/Tabs/index.ts';
import styles from './styles.module.scss';
import { useMemo, useState, useEffect } from 'react';
import { useStores } from '../../../app/RootStore.context.ts';
import { observer } from 'mobx-react-lite';

const defaultTabs = [
  {
    key: '1',
    name: 'Global feed',
  },
  {
    key: '2',
    name: 'Your feed',
  },
];

const HomePage = observer(() => {
  const {
    userStore: { user },
    tagsStore: { tags, fetchTags },
    articlesStore: {
      data,
      isLoading,
      tag,
      currentPage,
      totalPages,
      fetchAllArticles,
      fetchFeedArticles,
      fetchFilteredArticles,
      setPage,
      setTag,
    },
  } = useStores();

  const [activeTab, setActiveTab] = useState(defaultTabs[0].key);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (activeTab === '1') fetchAllArticles(10);
    if (activeTab === '2') fetchFeedArticles(10);
    if (activeTab === '3') fetchFilteredArticles(10, tag);
  }, [
    currentPage,
    tag,
    fetchAllArticles,
    fetchFeedArticles,
    fetchFilteredArticles,
    activeTab,
  ]);

  const tabsWithTags = useMemo(() => {
    const tabs = user
      ? defaultTabs
      : defaultTabs.filter((tab) => tab.key !== '2');
    if (tag) {
      setActiveTab('3');
      return [
        ...tabs,
        {
          key: '3',
          name: tag,
        },
      ];
    }

    return tabs;
  }, [tag, user]);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleTabs = (key: string) => {
    if (key !== '3') {
      setTag('');
    }
    setActiveTab(key);
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.banner}>
        <div className={styles.container}>
          <h1 className={styles.logo}>conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <Container>
        <div className={styles.feedWrap}>
          <PopularTags
            tags={tags}
            handleFilter={setTag}
          />
          <div className={styles.articlesWrap}>
            <div className={styles.feedNav}>
              <Tabs
                items={tabsWithTags}
                handleTabs={handleTabs}
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
              />
            </div>
            {!isLoading ? (
              data.articles.map((article) => (
                <ArticlePreview
                  key={article.slug}
                  article={article}
                />
              ))
            ) : (
              <div className={styles.loaderWrap}>
                <Loader />
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages(10)}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </Container>
    </div>
  );
});

export default HomePage;
