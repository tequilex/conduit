import { observer } from "mobx-react-lite";
import { Loader } from "../../../shared/ui/Loader";
import styles from "./styles.module.scss";

interface TagsProps {
  tags: string[];
  handleFilter: (tag: string) => void;
}

const PopularTags = observer(({ tags, handleFilter }: TagsProps) => {
  return (
    <div className={styles.tagsWrap}>
      <div className={styles.tagsMenu}>
        <p className={styles.title}>Popular tags</p>
        <ul className={styles.tagsList}>
          {tags.length ? (
            tags.map((tag) => (
              <li
                onClick={() => handleFilter(tag)}
                key={tag}
                className={styles.tag}
              >
                {tag}
              </li>
            ))
          ) : (
            <div className={styles.loaderWrap}>
              <Loader />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
})

export default PopularTags