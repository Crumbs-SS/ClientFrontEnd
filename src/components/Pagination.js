import '../style/pagination.css';

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  const links = [];

  for (let i = 0; i < (totalPages + 1); i++) {
    links.push(<li key={i} className="page-item">
      <button style={ currentPage===i ? {"color": "rgb(255, 0, 0)"} : null} onClick={() => setCurrentPage(i)} className="page-link">{i+1}</button>
    </li>)
  }

  return(
    <div className='pagination-comp'>
        <ul className="pagination">
          <li className="page-item"><button onClick={() => setCurrentPage(currentPage<=0 ? 0 : currentPage - 1)} className="page-link">Previous</button></li>
          {links}
          <li className="page-item"><button onClick={() => setCurrentPage(currentPage>=totalPages ? totalPages : currentPage + 1)} className="page-link">Next</button></li>
        </ul>
    </div>
  )
}

export default Pagination;
