import '../../style/search-page.css';
import { Form } from 'react-bootstrap';
import Header from '../Header';
import SortOption from '../SortOption';
import FilterOption from '../FilterOption';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';
import SearchResult from '../SearchResult';
import PaginationComp from '../Pagination';
import RestaurantService from '../../adapters/restaurantService';
import { setFoodSearchOption } from '../../actions/queryActions';


const SearchPage = () => {

  const dispatch = useDispatch();

  const [ searchResults, setSearchResults ] = useState(null);
  const [ totalPages, setTotalPages ] = useState(null);
  const [ currentPage, setCurrentPage ] = useState(0);
  const [ sortOrder, setSortOrder ] = useState(null);
  const [ selectedSort, setSelectedSort ] = useState(null);
  const [ categories, setCategories ] = useState(null);
  const [ filters, setFilters ] = useState([]);
  const [ redirectUser, setRedirectUser ] = useState(null);

  const state = useSelector(state => state.search);
  const query = state.query;
  const foodSearchOption = state.foodSearchOption;
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    RestaurantService.getRestaurants(foodSearchOption, {query, currentPage, sortOrder, filters}, token)
    .then(({ data }) => {
      if(filters.length > 0){
        setSearchResults(data.content.slice(currentPage * data.size, data.size * (currentPage + 1)));
        setTotalPages(Math.floor(data.numberOfElements/data.size));
      }else{
        setSearchResults(data.content);
        setTotalPages(data.totalPages - 1);
      }
    })
    .catch(() => {
    })

  }, [query, currentPage, sortOrder, selectedSort, filters, foodSearchOption, token])

  useEffect(() => {
    RestaurantService.getCategories(token)
    .then(({data}) => {
      setCategories(data);
    })
    .catch(() => {
    })

  }, [token])

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

  const onClick = (restaurant) => {
    setRedirectUser(restaurant);
  }

  return(
    <>
      <Header />
      <div className='search-page'>
        <div id="search-options">
            <Form.Check
              inline
              type='radio'
              id="restaurant-option"
              checked={!foodSearchOption}
              label='Search By Restaurant'
              onChange={() => dispatch(setFoodSearchOption(false))}
            />
          {(query === '') ?
            null
          : <div id="food-option1">
              <Form.Check
                inline
                type='radio'
                id="food-option"
                checked={foodSearchOption}
                label='Search By Food'
                onChange={() => dispatch(setFoodSearchOption(true))}
              />
            </div>
          }

        </div>

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

        <h5 id='result-text'>
          { query ?
            <span> Showing search results for:
               <span id = "search-query"> {query} </span>
            </span>
            : 'Showing: All Restaurants'
          }
        </h5>
        <div className='mid-section'>
          <div className='content-context'>
            {
              (searchResults && searchResults.length > 0) ?
                searchResults.map(result => <SearchResult key={result.id} result={result} onClick={onClick}/>)
                  : <h3 id='result-status'> No Results Found </h3>
            }
          </div>
          <PaginationComp
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      { redirectUser ? <Redirect push to={`/restaurants/${redirectUser.id}`} /> : null }
    </>
  )
}

export default SearchPage;
