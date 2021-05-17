import ReactDOM from 'react-dom';
import SearchResult from '../components/SearchResult';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchResult result={{}}/>, div);
})

it('renders search-result correctly', () => {
  const { getByTestId } = render(<SearchResult result={{name: 'hello'}} />)
  expect(getByTestId('search-result')).toHaveTextContent('hello');
})
