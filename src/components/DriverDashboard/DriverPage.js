//React Imports
import React , { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
//Material-UI Imports
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Button,
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
} from "@material-ui/core";
//Project Imports
import AccountService from '../../adapters/accountService';
import { logout } from "../../actions/authActions";
import AvailableOrders from './AvailableOrders';
import DriverMetrics from './DriverMetrics';
import DriverStatus from './DriverStatus';
import DriverOrder from './DriverOrder';

const useStyles = makeStyles((theme) => (
    {
        root: {
            display: 'flex',
        },
        flexGrow: {
            flexGrow: 1,
        },
        appBarSpacer: theme.mixins.toolbar, 
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(8),
        },
        topLeftPaper: {
            height: 200,
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
        },
        bottomLeftPaper: {
            height: 460,
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
        },
        rightHeight: {
            height : '100%',
            padding: theme.spacing(2),
        },
    }));


const DriverPage = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const [driverStatus, setDriverStatus] = useState(null);
    const id = window.location.pathname.split('/driver/')[1].split('/homePage')[0];
    const [dummyState, rerender] = useState(null);
    
    useEffect(() => {
        AccountService.getDriverStatus(id).then((res) => {
            setDriverStatus(res.data);
        })
    }, [dummyState, id])

    return (
        <>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed">
                    <Toolbar >
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.flexGrow}>
                            Dashboard
                        </Typography>
                        <Button color="inherit" onClick={() => dispatch(logout())} >Logout</Button>
                        <IconButton>
                            <Link to={`/profile`}><AccountCircle /></Link>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <main className={classes.flexGrow}>
                    <div className={classes.appBarSpacer} />
                    <Container className={classes.container}>

                        <Grid container spacing={3}>

                            <Grid item xs={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper className={classes.topLeftPaper}>
                                            <DriverStatus id={id} driverStatus={driverStatus} rerender={rerender}></DriverStatus>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.bottomLeftPaper} >
                                            <DriverMetrics id={id}/>
                                        </Paper>
                                    </Grid>
                                    
                                </Grid>

                            </Grid>

                            <Grid item xs={6}>
                                <Grid style={{ height: "100%" }}>
                                    <Paper className={classes.rightHeight}>
                                        {driverStatus === "AVAILABLE" ? <AvailableOrders id={id} rerender={rerender}/> : null}
                                        {driverStatus === "BUSY" ? <DriverOrder id={id} rerender={rerender}/> : null}
                                    </Paper>
                                </Grid>

                            </Grid>

                        </Grid>

                    </Container>
                </main>

            </div>

        </>
    );
}
export default DriverPage;