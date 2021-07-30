import React from 'react';
import {
    Typography
} from "@material-ui/core";

const DriverMetrics = () => {

    return (
        <>
            <React.Fragment>
                <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                    Your Metrics:
                </Typography>
               {/* Add driver statistics, rating and payment information */}
            </React.Fragment>
        </>
    )
}

export default DriverMetrics;