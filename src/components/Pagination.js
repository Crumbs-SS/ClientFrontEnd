import '../style/pagination.css';
import { Pagination } from '@material-ui/lab';

const PaginationComp = ({ totalPages, setCurrentPage, currentPage }) => {
  console.log(currentPage);
  return(
    <Pagination 
      className = "pagination-comp"
      count={totalPages + 1} 
      page={parseInt(currentPage) + 1} 
      onChange={(_, page) => setCurrentPage(page - 1)}
     />
  )
}

export default PaginationComp;
