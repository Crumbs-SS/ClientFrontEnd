import React, { useEffect, useState } from 'react';
import {
    Typography
} from "@material-ui/core";
import AccountService from '../../adapters/accountService';

const DriverMetrics = ({username}) => {

    const [driverPay, setDriverPay] = useState(null);
    useEffect(() => {
        AccountService.getDriverPay(username)
        .then((res) => {
            setDriverPay(res.data);
        })
        .catch();
    })


    return (
        <>
            <React.Fragment>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    Your Metrics:
                </Typography>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    {JSON.stringify(driverPay) === '""' ? "Please make your first delivery" :
                    ["Pay to this day: ", driverPay]
                    }
                </Typography>
            </React.Fragment>
        </>
    )
}

export default DriverMetrics;