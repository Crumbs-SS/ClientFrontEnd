import ReactDOM from 'react-dom';
import FilterOption from '../components/FilterOption';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FilterOption />, div);
})

it('renders filter-option correctly', () => {
  const { getByTestId } = render(<FilterOption text={'hello'} />);
  expect(getByTestId('filter-option')).toHaveTextContent('hello');
})
