import '../../style/landing-page.css';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from '../SideBar';
import { setQuery } from '../../actions/queryActions';
import { useDispatch } from 'react-redux';
import PlacesAutocompleteForm from '../forms/PlacesAutocompleteForm';

const LandingPage = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [address, setAddress] = useState('');
  const [redirectUser, doRedirectUser] = useState(false);

  const searchForContent = (e = null) => {
    if (e) e.preventDefault();
    if (searchText) {
      dispatch(setQuery(searchText));
      doRedirectUser(true);
    }
  }

  const onAddressFieldChanged = (address) => {
    setAddress(address);
  }

  const onAddressSelectionClicked = () => {

  }

  return (
    <>
      <SideBar />
      <div id="landing-page">
        <div id="signin">
          <a>Sign Up</a>
          <a>Sign In</a>
        </div>
        <div id="title-holder">
          <h1 id="title-name"> CRUMBS </h1>
          <form id="search-bar" onSubmit={searchForContent}>
            <div className="input-text-div">
              <div className="map-marker">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <PlacesAutocompleteForm
                className="input-type"
                placeholder="Enter delivery address"
                address={address}
                onAddressFieldChanged={onAddressFieldChanged}
                onAddressSelectionClicked={onAddressSelectionClicked}
              />
            </div>
            <div id="search-button" onClick={searchForContent}>
              <i className="fas fa-angle-right"></i>
            </div>
          </form>
        </div>
      </div>
      {redirectUser ? <Redirect push to={'/search'} /> : null}
    </>
  )
}

export default LandingPage;
