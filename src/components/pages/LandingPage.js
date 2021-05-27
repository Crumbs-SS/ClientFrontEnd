import '../../style/landing-page.css';
import {useState} from 'react';
import {Redirect} from 'react-router-dom';
import SideBar from '../SideBar';

const LandingPage = () => {

  const [searchText, setSearchText] = useState('');
  const [redirectUser, doRedirectUser] = useState(false);

  const searchForContent = (e = null) => {
    if (e) e.preventDefault();
    if (searchText) {
      doRedirectUser(true);
    }
  }

  return(
    <>
      <SideBar />
      <div id="landing-page">
        <div id="title-holder">
          <h1 id="title-name"> CRUMBS </h1>
          <form id="search-bar" onSubmit={searchForContent}>
            <input
                className="input-text"
                onChange={e => setSearchText(e.target.value)}
                placeholder="Enter restaurant name"
            ></input>
            <div id="search-button" onClick={searchForContent}>
              <i className="fas fa-angle-right"></i>
            </div>
          </form>
          <div id='all-restaurants' onClick={doRedirectUser}>
            See All Restaurants
          </div>
        </div>
      </div>
      { redirectUser ? <Redirect push to={`/search?query=${searchText}`}/> : null }
    </>
  )
}

export default LandingPage;
