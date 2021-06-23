// import ReactDOM from 'react-dom';
// import UpdateRestaurantForm from '../components/forms/UpdateRestaurantForm';
// import { render, cleanup , screen} from '@testing-library/react';


// describe('UpdateRestaurantForm', () => {
//   test('renders restaurants if request succeeds',  async() => {

//     window.fetch = jest.fn();
//     window.fetch.mockResolvedValueOnce({
//       json : async () => [{id: '1', name: 'KFC'}]
//     });

//     render(<UpdateRestaurantForm />);

//    const restaurants =  screen.findAllByRole('restaurant');
//    expect(restaurants).not.toHaveLength(0);

//   });

// });

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UpdateRestaurantForm from '../components/forms/UpdateRestaurantForm';

describe('Async component', () => {

  test('rendering and submitting a basic Formik form', async () => {

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json : async () => [{id: '1', name:'testName'}]
    })

    const handleSubmit = jest.fn()
    render(<UpdateRestaurantForm onSubmit={handleSubmit} />)

    userEvent.type(screen.getByLabelText(/name/i), 'TestName')
    userEvent.type(screen.getByLabelText(/categories/i), 'TestCategory')
    userEvent.type(screen.getByLabelText(/email/i), 'test@email.com')


    userEvent.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() =>
      expect(handleSubmit).toHaveBeenCalledWith({
        email: 'john.dee@someemail.com',
        firstName: 'John',
        lastName: 'Dee',
      }, expect.anything())
    )
  });
});