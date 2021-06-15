import OrderService from '../../adapters/orderService';
import mockAxios from 'axios';

it('calls loadOrders and returns orders', async () => {
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({
    data: {orders: [1,2,3,4]}
  }))

  const { data:{ orders } } = await OrderService.loadOrders();

  expect(orders).toEqual([1, 2, 3, 4]);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
})
