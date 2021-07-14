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

it('calls updateOrder and returns orders', async () => {
  mockAxios.put.mockImplementationOnce(() => Promise.resolve({
    data: {order: {name: "Order - 1"}}
  }))

  const { data:{order} } = await OrderService.updateOrders(null, null, {});

  expect(order).toEqual({name: "Order - 1"});
  expect(mockAxios.put).toHaveBeenCalledTimes(1);
})