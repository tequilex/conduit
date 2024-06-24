import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = observer(({ totalPages, handlePageChange, currentPage }: PaginationProps) => {
  
  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = []
    
    const maxPagesToShow = 15
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1)
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1)
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.paginationList}>
        {currentPage === 1 ? null : <li className={styles.navBtn}>
          <GrPrevious onClick={handlePreviousPage} />
        </li>}
        {currentPage > Math.ceil(5 / 2) + 1 && (
          <li className={styles.paginationItem}>
            <button onClick={() => handlePageChange(1)} className={styles.paginationButton}>1</button>
          </li>
        )}
        {currentPage > Math.ceil(5 / 2) + 2 && <span>...</span>}
        {getPageNumbers().map((number) => (
          <li
            key={number}
            className={number === currentPage ? styles.paginationItemActive : styles.paginationItem}
            onClick={() => handlePageChange(number)}
          >
            <button className={styles.paginationButton}>{number}</button>
          </li>
        ))}
        {currentPage < totalPages - Math.ceil(5 / 2) - 1 && <span>...</span>}
        {currentPage < totalPages - Math.ceil(5 / 2) && (
          <li className={styles.paginationItem}>
            <button className={styles.paginationButton} onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
          </li>
        )}
        {currentPage === totalPages ? null : <li className={styles.navBtn}>
          <GrNext onClick={handleNextPage}/>
        </li>}
      </ul>
    </nav>
  );
})

export default Pagination