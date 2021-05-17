import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import SearchPage from './components/pages/SearchPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={LandingPage} exact={true}/>
          <Route path='/search' component={SearchPage} exact={true}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
