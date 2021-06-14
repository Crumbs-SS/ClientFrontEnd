import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import RestaurantPage from './components/pages/RestaurantPage';
import LandingPage from './components/pages/LandingPage';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import {useDispatch, useSelector} from 'react-redux';
//import {useEffect} from 'react';
import {loadUser} from './actions/authActions';

const App = () => {
    const loggedIn = useSelector(state => state.auth.user !== null);
    const currentRole = useSelector(state => state.auth.role);
    const dispatch = useDispatch();

    dispatch(loadUser());

    const isCustomer = (role) => 'customer' === role;


    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path='/'>
                        {loggedIn && isCustomer(currentRole) ? <Redirect to='search'/> : <LandingPage/>}
                    </Route>
                    <Route exact path='/search' component={SearchPage}/>
                    <Route exact path='/login'> {loggedIn ? <Redirect to='/'/> : <LoginPage/>} </Route>
                    <Route exact path='/profile'> {!loggedIn ? <Redirect to='/'/> : <ProfilePage/>} </Route>
                    <Route exact path='/restaurants/:id' component={RestaurantPage} />
                </Switch>
            </Router>
        </div>
    );

}

export default App;
