const jestFn = jest.fn(() => Promise.resolve({data: {} }));


const mockAxios =  {
  get: jestFn,
  post: jestFn,
  put: jestFn,
  delete: jestFn
}

export default mockAxios;
