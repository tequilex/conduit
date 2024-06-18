import { useContext } from "react";
import { ArticlePreview } from "../../../entities/ArticlePreview";
import { Pagination } from "../../../shared/ui/Pagination";
import { Container } from "../../../shared/ui/Container";
import { PopularTags } from "../../../entities/PopularTags";
import { Loader } from "../../../shared/ui/Loader";
import { Tabs } from "../../../shared/ui/Tabs";
import { UserContext } from "../../../entities/User/user.context.tsx";
import useGetArticlesQuery from "../../../entities/hooks/useGetArticlesQuery.ts";
import useGetTagsQuery from "../../../entities/hooks/useGetTagsQuery.ts";
import styles from "./styles.module.scss";
import { useMemo, useState } from "react";

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

export function HomePage() {
  const { user } = useContext(UserContext);

  const {
    articles,
    isLoading,
    totalPages,
    currentPage,
    tag,
    handlePageChange,
    filterByTag,
    deleteTag,
    getFeed,
  } = useGetArticlesQuery("limit=10", 10);

  const [activeTab, setActiveTab] = useState(defaultTabs[0].key);

  const tags = useGetTagsQuery();

  const tabsWithTags = useMemo(() => {
    const tabs = user ? defaultTabs : defaultTabs.filter(tab => tab.key !== '2');
    if (tag) {
      setActiveTab('3');
      return [
        ...tabs,
        {
          key: '3',
          name: tag,
        }
      ]
    }

    return tabs;
  }, [tag, user]);

  const handleTabs = (key: string) => {
    if(key === "1") {deleteTag()}
    if(key === "2") {getFeed()}
  }

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
          <PopularTags tags={tags} handleFilter={filterByTag} />
          <div className={styles.articlesWrap}>
            <div className={styles.feedNav}>
              <Tabs items={tabsWithTags} handleTabs={handleTabs} activeKey={activeTab} onChange={(key) => setActiveTab(key)} />
            </div>
            {!isLoading ? (
              articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} />
              ))
            ) : (
              <div className={styles.loaderWrap}>
                <Loader />
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
