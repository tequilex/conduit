import { useContext } from "react";
import { UserContext } from "../../entities/User/user.context.tsx";
import useGetProfileQuery from "../../entities/hooks/useGetProfileQuery";
import useGetArticlesOffsetQuery from "../../entities/hooks/useGetArticlesQuery.ts";
import { ProfileInfo } from "../../entities/ProfileInfo";
import { ArticlePreview } from "../../entities/ArticlePreview/index.ts";
import { Pagination } from "../../shared/ui/Pagination/Pagination.tsx";
import { Container } from "../../shared/ui/Container";
import { Tabs } from "../../shared/ui/Tabs/Tabs.tsx";
import { useParams } from "react-router-dom";
import { Loader } from "../../shared/ui/Loader/Loader.tsx";
import styles from "./styles.module.scss";
import { useState } from "react";

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

export function Profile() {
  const { user } = useContext(UserContext)
  const [activeTab, setActiveTab] = useState(defaultTabs[0].key);
  const { username } = useParams<{ username: string }>();
  const profile = useGetProfileQuery(username);
  const { articles, totalPages, handlePageChange, currentPage, deleteTag, getFavoritedArticles } =
    useGetArticlesOffsetQuery(`author=${username}&limit=5`, 5);

  const isLoginProfile = username === user?.username

  if (!profile) {
    return <div className={styles.loaderWrap}>
    <Loader />
    </div>
  }

  const handleTabs = (key: string) => {
    if(key === "1") {deleteTag()}
    if(key === "2" && username) {getFavoritedArticles(username)}
  }

  return (
    <div className={styles.profile}>
      <div className={styles.userInfo}>
        <Container>
          <ProfileInfo profile={profile} />
        </Container>
      </div>
      <Container>
        {isLoginProfile ?<Tabs items={defaultTabs} handleTabs={handleTabs} activeKey={activeTab} onChange={(key) => setActiveTab(key)} /> : null}
        {articles.map((article) => (
          <ArticlePreview key={article.slug} article={article} />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </Container>
    </div>
  );
}
