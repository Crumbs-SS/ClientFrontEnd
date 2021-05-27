import '../../style/search-page.css';
import Header from '../Header';
import SortOption from '../SortOption';
import FilterOption from '../FilterOption';
import { useEffect, useState } from 'react';
import SearchResult from '../SearchResult';
import Pagination from '../Pagination';
import RestaurantService from '../../adapters/restaurantService';

const SearchPage = () => {

  const [ searchResults, setSearchResults ] = useState(null);
  const [ totalPages, setTotalPages ] = useState(null);
  const [ query, setQuery ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ sortOrder, setSortOrder ] = useState(null);
  const [ selectedSort, setSelectedSort ] = useState(null);
  const [ categories, setCategories ] = useState(null);
  const [ filters, setFilters ] = useState([]);

  useEffect(() => {
    setQuery(getQuery());
    RestaurantService.getRestaurants(query, currentPage, sortOrder, filters)
    .then(({ data }) => {
      if(filters.length > 0){
        setSearchResults(data.content.slice(currentPage * data.size, data.size * (currentPage + 1)));
        setTotalPages(Math.floor(data.numberOfElements/data.size));
      }else{
        setSearchResults(data.content);
        setTotalPages(data.totalPages - 1);
      }
    })

  }, [query, currentPage, sortOrder, selectedSort, filters])

  useEffect(() => {
    RestaurantService.getCategories()
    .then(({data}) => {
      setCategories(data);
    })
  }, [])

  const getQuery = () => {
    const queryStream = window.location.search.split('?'); //returns Query Stream
    const queryParams = queryStream[1].split('&'); // returns separated query params
    const search = queryParams[0].split('=')[1];
    return search.split('%20').join(' ');
  }

  const sort = (text, timesClicked) => {
    let name = text.toString().toLowerCase();
    if(name==='$$$') name='priceRating';

    switch(timesClicked) {
      case 0:
        setSortOrder({
          sortBy: name,
          order: 'asc'
        });
        setSelectedSort(text);
        break;
      case 1:
        setSortOrder({
          sortBy: name,
          order: 'desc'
        });
        setSelectedSort(text);
        break;
      default:
        setSortOrder(null);
        setSelectedSort(null);
      }
    }

  const selectFilter = (text, selected) => {
    if(selected){
      setFilters(filters.filter(filter => filter !== text));
    }else{
      setFilters([...filters, text]);
    }
  }

  return(
    <>
      <Header setQuery={setQuery}/>
      <div className='search-page'>
        <div className='filter-options'>
          <SortOption sort={sort} text={'$$$'} selectedSort={selectedSort} />
          <SortOption sort={sort} text={'Rating'} selectedSort={selectedSort} />
          <SortOption sort={sort} text={'Name'} selectedSort={selectedSort} />
        </div>

        <div className='filter-options'>
          {
            categories ? categories.map(category =>
              <FilterOption
                key={category.name}
                text={category.name}
                selectFilter={selectFilter}
              />
            )
            :
            null
          }
        </div>

        <h5 id='result-text'> { query ? `Showing search results for "${query}"` : 'Showing: All Restaurants'} </h5>
        <div className='mid-section'>
          <div className='content-context'>
            {
              (searchResults && searchResults.length > 0) ?
                searchResults.map(result => <SearchResult key={result.id} result={result}/>)
                  : <h3 id='result-status'> No Results Found </h3>
            }
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </>
  )
}

export default SearchPage;
