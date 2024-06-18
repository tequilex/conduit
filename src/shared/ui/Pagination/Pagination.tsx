import styles from "./styles.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

export function Pagination({ totalPages, handlePageChange, currentPage }: PaginationProps) {
  return (
    <nav>
      <ul className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            onClick={() => handlePageChange(index + 1)}
            key={index + 1}
            className={ index + 1 === currentPage ? styles.paginationItemActive : styles.paginationItem}
          >
            <button className={styles.paginationButton}>{index + 1}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
