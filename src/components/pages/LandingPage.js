import '../../style/landing-page.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import RestaurantService from '../../adapters/restaurantService';
import SideBar from '../SideBar';

const LandingPage = () => {

  const dispatch = useDispatch();
  const [ searchText, setSearchText ] = useState('');
  const [ redirectUser, doRedirectUser ] = useState(false);

  const searchForContent = (e) => {
    if(e) e.preventDefault();
    if(searchText){
      RestaurantService.getRestaurants(searchText)
      .then(response => response.json())
      .then(searchResults => dispatch({
        type: "SET_SEARCH_RESULTS",
        searchResults
      }));

      doRedirectUser(true);
    }
  }

  return(
    <>
      <SideBar />
      <div id="landing-page">
        <div id="title-holder">
          <h1 id="title-name"> SCRUMPTIOUS </h1>
          <form id="search-bar" onSubmit={searchForContent} >
            <input
              className="input-text"
              onChange={e => setSearchText(e.target.value)}
              placeholder="Enter restaurant name"
            ></input>
            <div id="search-button" onClick={searchForContent}>
              <i className="fas fa-angle-right"></i>
            </div>
          </form>
        </div>
      </div>
      { redirectUser ? <Redirect push to={`/search?query=${searchText}`}/> : null }
    </>
  )
}

export default LandingPage;
