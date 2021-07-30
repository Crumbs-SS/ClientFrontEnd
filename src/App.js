import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import RestaurantPage from './components/pages/RestaurantPage';
import LandingPage from './components/pages/LandingPage';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import {useDispatch, useSelector} from 'react-redux';
//import {useEffect} from 'react';
import {loadUser} from './actions/authActions'
import RestaurantOwnerPage from './components/pages/RestaurantOwnerPage';
import DriverPage from './components/DriverPage/DriverPage';
import UpdateRestaurantForm from './components/forms/UpdateRestaurantForm';
import EmailConfirmationPage from './components/EmailConfirmation';

const App = () => {
    const loggedIn = useSelector(state => state.auth.user !== null);
    const currentRole = useSelector(state => state.auth.role);
    const id = useSelector(state => state.auth.id);
    const dispatch = useDispatch();

    dispatch(loadUser());

    const isCustomer = (role) => 'customer' === role;
    const isOwner = (role) => 'owner' === role;
    const isDriver = (role) => 'driver' === role;

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {loggedIn && isCustomer(currentRole) ? <Redirect to='search'/> : <LandingPage/>}
                        {loggedIn && isOwner(currentRole) ? <Redirect to={`/owner/${id}/homePage`}/> : <LandingPage/>}
                        {loggedIn && isDriver(currentRole) ? <Redirect to={`/driver/${id}/homePage`}/> : <LandingPage/>}
                    </Route>
                    <Route exact path='/search' component={SearchPage}/>
                    <Route exact path='/login'> {loggedIn ? <Redirect to='/'/> : <LoginPage/>} </Route>
                    <Route exact path='/profile'> {!loggedIn ? <Redirect to='/'/> : <ProfilePage/>} </Route>
                    <Route exact path='/restaurants/:id' component={RestaurantPage}/>
                    <Route exact path='/owner/:id/homePage' >{!loggedIn ? <Redirect to='/'/> : <RestaurantOwnerPage/>} </Route>
                    <Route exact path='/driver/:id/homePage' >{!loggedIn ? <Redirect to='/'/> : <DriverPage/>} </Route>
                    <Route exact path='/owner/updateRestaurant/:id' component={UpdateRestaurantForm}/>
                    <Route exact path='/email/verification/:token' component={EmailConfirmationPage}/>
                </Switch>
            </Router>
        </div>
    );

}

export default App;
