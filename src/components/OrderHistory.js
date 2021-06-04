import '../style/order-history.css';
import {Row} from "react-bootstrap";

const OrderHistory = () => {
    return (
        <>
            <div id="OrderHistoryContainer">
                <Row className="container-title justify-content-center">Recent Orders</Row>
                <Row className="justify-content-center">Placeholder</Row>
            </div>
        </>
    );
}

export default OrderHistory;