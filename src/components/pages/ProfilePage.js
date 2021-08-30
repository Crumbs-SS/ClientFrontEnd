import '../../style/profile-page.css';
import Header from '../Header';
import { useDispatch, useSelector } from "react-redux";
import OrderHistory from "../OrderHistory";
import { useState } from "react";
import AccountDeleteForm from "../forms/AccountDeleteForm";
import ProfileUpdateForm from "../forms/ProfileUpdateForm";
import ProfilePageModal from "../modals/ProfilePageModal";
import { clearErrors } from "../../actions/errorActions";
import { Link } from 'react-router-dom';
import LoyalPointsImage from '../../assets/loyal-points-red.png';
import { isEmpty } from 'lodash';


const ProfilePage = () => {
    const user = useSelector(state => state.auth.user);
    const role = useSelector(state => state.auth.role);
    const username = useSelector(state => state.auth.username);
    const { customer } = user;
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalComp, setModalComp] = useState(null);

    const openModal = (comp) => {
        setModalOpen(true);
        setModalComp(comp);
    }
    const closeModal = () => {
        dispatch(clearErrors());
        setModalOpen(false);
        setModalComp(null);
    }

    return (
        <>
            <Header />
            <ProfilePageModal show={modalOpen} onHide={closeModal} comp={modalComp} />
            <div id="profile-page">

                <div className='buttons-pp'>
                    <div className="button-pp"
                        onClick={() => openModal(<ProfileUpdateForm user={user} close={closeModal} />)}>
                        Edit Profile
                    </div>
                    <div className="button-pp"
                        onClick={() => openModal(<AccountDeleteForm username={user.username} close={closeModal} />)}>
                        Delete Account
                    </div>
                    {role === 'owner' ? <div className="button-pp"><Link to={`/owner/${username}/dashboard`}>Go to Restaurant Page</Link></div> : null}
                    {role === 'driver' ? <div className="button-pp"><Link to={`/driver/${username}/dashboard`}>Back</Link></div> : null}
                </div>

                <div className="inner-content-pp">
                    <div className="lp-payment">
                        <div className="loyalty-points gray-pp">
                            <div className="loyalty-points-img">
                                <img src={LoyalPointsImage} alt="loyal points" />
                            </div>
                            <div className="loyalty-points-counter">
                                <h4> Loyal Points </h4>
                                <h4><b> {customer ? customer.loyaltyPoints : null} </b></h4>
                            </div>
                        </div>
                        <div className="payment-information gray-pp">
                            <h4> Payment Information </h4>
                        </div>
                    </div>


                    <div className="details-orders">
                        <div className="details-pp gray-pp">
                            <DetailColumn title={"Full Name"} field={user.firstName + " " + user.lastName} />
                            <div className='inline-pp' />
                            <DetailColumn title={"Username"} field={user.username} />
                            <div className='inline-pp' />
                            <DetailColumn title={"Email"} field={user.email} />
                            <div className='inline-pp' />
                            <DetailColumn title={"Phone"} field={formatPhoneNumber(user.phone)} />
                            <div className='inline-pp' />
                            <DetailColumn title={"Address"} field={isEmpty(user.locations) ? "No location available" : user.location[0].street} disabled={isEmpty(user.locations)} />
                        </div>
                        {role === 'customer' ?
                            <div className="orders-pp">
                                <div className="orders gray-pp">
                                    <h4> Active Orders </h4>
                                    <div className="order-history">
                                        <OrderHistory orderType={"active"} />
                                    </div>
                                </div>
                                <div className="orders gray-pp">
                                    <h4> Past Orders </h4>
                                    <div className="order-history">
                                        <OrderHistory orderType={"inactive"} />
                                    </div>
                                </div>
                            </div> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;


const DetailColumn = (props) => {

    return (
        <div className="detail-column">
            <span className="title-dc">{props.title}</span>
            <span className={props.disabled ? "disabled" : null}> {props.field} </span>
        </div>
    );
}

const formatPhoneNumber = number => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match)
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];

    return null;
}