import EmailService from "../../adapters/emailService";
import mockAxios from 'axios';

it('calls axios and sends userDetailEmail', async () => {
    mockAxios.post.mockImplementationOnce(() => Promise.resolve({
        data: {}
    }))

    const { data } = await EmailService.sendOrderDetailsEmail(-1);

    expect(data).toEqual({});
    expect(mockAxios.post).toHaveBeenCalledTimes(1);

})