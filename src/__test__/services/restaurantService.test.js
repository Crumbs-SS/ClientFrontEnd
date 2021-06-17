import RestaurantService from '../../adapters/restaurantService';
import mockAxios from 'axios';

it('calls getRestaurants and returns restaurants', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {restaurants: [1,2,3,4]}
  }))

  const { data:{ restaurants } } = await RestaurantService.getRestaurants(null, {
    filters: []
  });

  expect(restaurants).toEqual([1, 2, 3, 4]);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
})

it('calls getCategories and returns categories', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {categories: [1,2,3,4]}
  }))

  const { data:{ categories } } = await RestaurantService.getCategories();

  expect(categories).toEqual([1, 2, 3, 4]);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
})

it('calls findRestuarant and returns restaurant', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {restaurant: [1]}
  }))

  const { data:{ restaurant } } = await RestaurantService.findRestaurant();

  expect(restaurant).toEqual([1]);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
})
