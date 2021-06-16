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
import UpdateRestaurantForm from './components/forms/UpdateRestaurantForm';

const App = () => {
    const loggedIn = useSelector(state => state.auth.user !== null);
    const currentRole = useSelector(state => state.auth.role);
    const dispatch = useDispatch();

    dispatch(loadUser);

    const isCustomer = (role) => 'customer' === role;

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {loggedIn && isCustomer(currentRole) ? <Redirect to='search'/> : <LandingPage/>}
                    </Route>
                    <Route path='/search' component={SearchPage} exact={true}/>
                    <Route exact path='/login'> {loggedIn ? <Redirect to='/'/> : <LoginPage/>} </Route>
                    <Route exact path='/profile'> {!loggedIn ? <Redirect to='/'/> : <ProfilePage/>} </Route>
                    <Route exact path='/restaurants/:id' component={RestaurantPage}/>
                    <Route path='/owner/homePage' component={RestaurantOwnerPage} exact={true}/>
                    <Route exact path='/owner/updateRestaurant/:id' component={UpdateRestaurantForm}/>

                </Switch>
            </Router>
        </div>
    );

}

export default App;
