import { useEffect, useState } from 'react';
import OrderService from '../../adapters/orderService';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const OrderAcceptancePage = () => {

    const [response, setResponse] = useState();
    const [doRedirect, setRedirect] = useState(null);
    const id = useSelector(state => state.auth.id);

    useEffect(() => {
        const ids = window.location.pathname.split("/orders/")[1].split("/drivers/");
        const ordersId = ids[0];
        const driverId = ids[1];

        OrderService.acceptOrder(driverId, ordersId)
            .then(() => setRedirect(`/driver/${id}/homePage`))
            .catch(() =>  setResponse("This order is no longer available"))
    }, [id]);

    return (
        <>
        {doRedirect ? <Redirect to={doRedirect} /> : null}
            <div className="container p-3 my-3 "><h1 >{response}</h1></div>
        </>
    )

}
export default OrderAcceptancePage;