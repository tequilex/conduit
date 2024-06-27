import { ArticlePreview } from '../../../entities/article/ui/ArticlePreview.tsx';
import { Pagination } from '../../../shared/ui/Pagination/index.ts';
import { Container } from '../../../shared/ui/Container/index.ts';
import { PopularTags } from '../../../entities/tag/ui/index.ts';
import { Loader } from '../../../shared/ui/Loader/index.ts';
import { Tabs } from '../../../shared/ui/Tabs/index.ts';
import { useMemo, useState, useEffect } from 'react';
import { useStores } from '../../../app/RootStore.context.ts';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router-dom';
import styles from './styles.module.scss';

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
      totalPages,
      fetchAllArticles,
      fetchFeedArticles,
      fetchFilteredArticles,
    },
  } = useStores();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const tagParam = searchParams.get('tag') || '';
  const activeTabFromParams = searchParams.get('tab') || defaultTabs[0].key;
  const [activeTab, setActiveTab] = useState(activeTabFromParams);

  useEffect(() => {
    fetchTags();
  }, [fetchTags, page, searchParams, setSearchParams]);

  useEffect(() => {
    if (!tagParam && activeTab === '3') {
      setActiveTab(defaultTabs[0].key);
    } else {
      if (activeTab === '1') fetchAllArticles(10, page);
      if (activeTab === '2') fetchFeedArticles(10, page);
      if (activeTab === '3') fetchFilteredArticles(10, tagParam, page);
    }
  }, [
    searchParams,
    activeTab,
    page,
    tagParam,
    fetchAllArticles,
    fetchFeedArticles,
    fetchFilteredArticles,
  ]);

  const tabsWithTags = useMemo(() => {
    const tabs = user
      ? defaultTabs
      : defaultTabs.filter((tab) => tab.key !== '2');
    if (tagParam) {
      return [
        ...tabs,
        {
          key: '3',
          name: tagParam,
        },
      ];
    }

    return tabs;
  }, [tagParam, user]);

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: String(page),
      tab: activeTab,
      ...(tagParam && { tag: tagParam }),
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleTabs = (key: string) => {
    setSearchParams({ page: '1', tab: key });
    setActiveTab(key);
  };

  const handleTagClick = (tag: string) => {
    setSearchParams({ page: '1', tab: '3', tag });
    setActiveTab('3');
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
          <PopularTags tags={tags} handleFilter={handleTagClick} />
          <div className={styles.articlesWrap}>
            <div className={styles.feedNav}>
              <Tabs
                items={tabsWithTags}
                handleTabs={handleTabs}
                activeKey={activeTab}
                onChange={setActiveTab}
              />
            </div>
            {!isLoading ? (
              data.articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} />
              ))
            ) : (
              <div className={styles.loaderWrap}>
                <Loader />
              </div>
            )}
            <Pagination
              currentPage={page}
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
