import {BrowserRouter as Router, Redirect, Route, Switch,} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import ProfilePage from './components/pages/ProfilePage';
import {useDispatch, useSelector} from 'react-redux';
//import {useEffect} from 'react';
import {loadUser} from './actions/authActions'


const App = () => {
    const loggedIn = useSelector(state => state.auth.user !== null);
    const dispatch = useDispatch();

    // hook in useEffect is a problem
    //useEffect(() => {
    dispatch(loadUser);
    // });

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/' component={LandingPage} exact={true}/>
                    <Route path='/search' component={SearchPage} exact={true}/>
                    <Route exact path='/login'> {loggedIn ? <Redirect to='/'/> : <LoginPage/>} </Route>
                    <Route exact path='/profile'> {!loggedIn ? <Redirect to='/'/> : <ProfilePage/>} </Route>
                </Switch>
            </Router>
        </div>
    );

}

export default App;
