import React from 'react';
import AccountService from '../../adapters/accountService';
import {
    Button,
    Typography,
} from "@material-ui/core";

const viewDriverStatus = {
    "AVAILABLE": "You are checked-in and ready to start delivering orders.",
    "BUSY": "You are currently delivering an order.",
    "CHECKED_OUT": "You are checked-out. Please check-in to start accepting orders.",
    "UNVALIDATED": "Your account has not yet been confirmed by our Crumbs Team. We will let you know once we have managed to confirm your account."
}

const DriverStatus = ({driverStatus, rerender}) => {
    

    const checkIn = () => {
        AccountService.checkInDriver().then((res) => {
            rerender(true);
        })
    }
    const checkOut = () => {
        AccountService.checkOutDriver().then((res) => {
            rerender(false);
        })
    }

    return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    Account Status:
                </Typography>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    {viewDriverStatus[driverStatus]}
                </Typography>
                <br />
                {driverStatus === "AVAILABLE" ? 
                    <Button variant="contained" color="secondary" onClick={() => { checkOut() }}>
                        Check-Out
                    </Button> : null
                }
                {driverStatus === "CHECKED_OUT" ? 
                    <Button variant="contained" color="primary" onClick={() => { checkIn() }}>
                        Check-In
                    </Button> : null
                }
            </React.Fragment>
    )
}
export default DriverStatus;
