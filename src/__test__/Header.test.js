import ReactDOM from 'react-dom';
import Header from '../components/Header';

import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store = { store }>
      <Router>
        <Header />
      </ Router>
    </Provider>
    , div);
})
