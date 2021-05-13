import '../../style/search-page.css';
import Header from '../Header';
import FilterOption from '../FilterOption';
import { useSelector } from 'react-redux';
import SearchResult from '../SearchResult';

const SearchPage = () => {

  let query = window.location.search.split("=")[1]; //returns QueryParam
  const searchResults = useSelector(state => state.search).searchResults;

  return(
    <>
      <Header />
      <div className="search-page">
        <div className="filter-options">
          <FilterOption text={"$$$"} />
          <FilterOption text={"Rating"} />
          <FilterOption text={"Location"} />
        </div>

        <h5 id="result-text"> Showing search results for "{query}"</h5>

        <div className='content-context'>
          {
            (searchResults && searchResults.length > 0) ?
              searchResults.map(result => <SearchResult result={result}/>)
                : <h3 id="result-status"> No Results Found </h3>
          }
        </div>

      </div>
    </>
  )
}

export default SearchPage;
