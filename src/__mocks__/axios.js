const jestFn = jest.fn(() => Promise.resolve({data: {} }));


const mockAxios =  {
  get: jestFn,
  post: jestFn,
  delete: jestFn
}

export default mockAxios;
