import ReactDOM from 'react-dom';
import SideBar from '../components/SideBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Router>
      <SideBar />
    </ Router>
    , div);
})
