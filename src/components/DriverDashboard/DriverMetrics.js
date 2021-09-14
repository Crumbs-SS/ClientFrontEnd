import React, { useEffect, useState } from 'react';
import {
    Typography,
    Button
} from "@material-ui/core";
import AccountService from '../../adapters/accountService';
import DriverRatingsModal from './DriverRatingsModal';

const DriverMetrics = () => {

    const [driverPay, setDriverPay] = useState(null);
    const[driverRating, setDriverRating] = useState(null);
    const [driverRatings, setDriverRatings] = useState(null);

    const [showDriverRatinsModal, setShowDriverRatingsModal] = useState(false);
    const hideDriverRatingsModal = () => setShowDriverRatingsModal(false);


    useEffect(() => {
        AccountService.getDriverPay()
        .then((res) => {
            setDriverPay(res.data);
        })
        .catch();

        AccountService.getDriverRatings()
        .then((res) => {
            setDriverRatings(res.data);
        })

        AccountService.getDriverRating()
        .then((res) => {
            setDriverRating(res.data);
        })

    },[])
    
    return (
        <>
            <React.Fragment>
                <DriverRatingsModal show={showDriverRatinsModal} onHide={hideDriverRatingsModal} driverRatings={driverRatings}></DriverRatingsModal>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    Your Metrics:
                </Typography>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    {JSON.stringify(driverPay) === '""' ? "Please make your first delivery" :
                    ["Pay to this day: ", driverPay, "$"]
                    }
                </Typography>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    {driverRating === -1 ? "No ratings yet." : ["Your average rating: " , driverRating, "/5"]}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => { setShowDriverRatingsModal(true) }}>
                    View your ratings
                </Button>
                
            </React.Fragment>
        </>
    )
}

export default DriverMetrics;