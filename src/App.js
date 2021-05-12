import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' component={LandingPage} exact={true}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
