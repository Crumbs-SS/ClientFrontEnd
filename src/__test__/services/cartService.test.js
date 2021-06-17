import CartService from '../../adapters/cartService';
import mockAxios from 'axios';

it('calls axios and returns cart data', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {shoppingCart: [1,2,3,4]}
  }))

  const { data:{ shoppingCart } } = await CartService.loadCart();

  expect(shoppingCart).toEqual([1, 2, 3, 4]);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
})

it('calls addToCart and adds item to cart', async () => {
  mockAxios.post.mockImplementationOnce(() => Promise.resolve({
    data: {shoppingCart: [1,2,3,4,5]}
  }))

  const { data:{ shoppingCart } } = await CartService.addToCart();

  expect(shoppingCart).toEqual([1, 2, 3, 4, 5]);
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
})

it('calls clearCart and clears cart', async () => {
  mockAxios.delete.mockImplementationOnce(() => Promise.resolve({
    data: {shoppingCart: []}
  }))

  const { data:{ shoppingCart } } = await CartService.clearCart();

  expect(shoppingCart).toEqual([]);
  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
})

it('calls checkoutCart and adds new order', async () => {
  mockAxios.post.mockImplementationOnce(() => Promise.resolve({
    data: {orders: [1, 2]}
  }))

  const { data:{ orders } } = await CartService.checkoutCart();

  expect(orders).toEqual([1, 2]);
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
})

it('calls deleteItem and deletes cart item', async () => {
  mockAxios.delete.mockImplementationOnce(() => Promise.resolve({
    data: {shoppingCart: []}
  }))

  const { data:{ shoppingCart } } = await CartService.deleteItem();

  expect(shoppingCart).toEqual([]);
  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
})
