import { useEffect, useState } from 'react';
import OrderService from '../../adapters/orderService';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';

const OrderAcceptancePage = () => {

    const [response, setResponse] = useState();
    const [doRedirect, setRedirect] = useState(null);
    const username = useSelector(state => state.auth.username);

    useEffect(() => {
        const ids = window.location.pathname.split("/orders/")[1].split("/drivers/");
        const ordersId = ids[1];
        const driverId = ids[0];

        OrderService.acceptOrder(driverId, ordersId)
            .then(() => setRedirect(`/driver/${username}/dashboard`))
            .catch((e) =>  { 
                console.log(e);
                setResponse("This order is no longer available");
            })
    }, [username]);

    return (
        <>
        {doRedirect ? <Redirect to={doRedirect} /> : null}
            <div className="container p-3 my-3 "><h1 >{response}</h1></div>
        </>
    )

}
export default OrderAcceptancePage;