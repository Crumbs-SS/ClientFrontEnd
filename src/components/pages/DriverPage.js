import { useEffect, useState } from 'react';
import OrderService from '../../adapters/orderService';
import AccountService from '../../adapters/accountService';
import React from 'react';
import Header from '../Header';
import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { logout } from "../../actions/authActions";
import { Redirect } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    Link,
    Badge,
    Nav
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Title } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { green, purple } from '@material-ui/core/colors';
import AvailableOrders from '../AvailableOrders';
import AcceptOrderModal from '../modals/AcceptOrderModal';

const useStyles = makeStyles((theme) => (
    {
        root: {
            display: 'flex',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },
        title: {
            flexGrow: 1,
        }
    }));

const viewDriverStatus = {
    "AVAILABLE": "You are checked-in and ready to start delivering orders.",
    "BUSY": "You are currently delivering an order.",
    "CHECKED_OUT": "You are checked-out. Please check-in to be able to start accepting orders.",
    "UNVALIDATED": "Your account has not yet been confirmed by our Crumbs Team. We will let you know once we have managed to confirm your account."
}

const DriverPage = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [driverStatus, setDriverStatus] = useState(null);
    const id = window.location.pathname.split('/driver/')[1].split('/homePage')[0];
    const [checkedIn, setCheckedIn] = useState(true);
    const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
    const openAcceptOrderModal = () => setShowAcceptOrderModal(true);
    const hideAcceptOrderModal = () => setShowAcceptOrderModal(false);

    useEffect(() => {
        AccountService.getDriverStatus(id).then((res) => {
            setDriverStatus(res.data);
        })
    }, [checkedIn])

    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
    }))(Button);

    const checkIn = (id) => {
        AccountService.checkInDriver(id).then((res) => {
            setCheckedIn(true);
        })
    }
    const checkOut = (id) => {
        AccountService.checkOutDriver(id).then((res) => {
            setCheckedIn(false);
        })
    }


    return (
        <>
            <div className={classes.root}>
                <CssBaseline />

                <AppBar position="fixed">
                    <Toolbar >
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        <Button color="inherit" onClick={() => dispatch(logout())} >Logout</Button>
                        <IconButton color="inherit" onClick={() => <Redirect to='/search' />}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} md={4} lg={3}>
                                <Paper className={fixedHeightPaper}>
                                    <React.Fragment>
                                        <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                                            Account Status:
                                        </Typography>
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                            {viewDriverStatus[driverStatus]}
                                        </Typography>
                                        <br />
                                        {driverStatus === "BUSY" || driverStatus === "UNVALIDATED" ? null :
                                            [driverStatus === "AVAILABLE" ?
                                                <>
                                                    <br />
                                                    <Button variant="contained" color="secondary" onClick={() => { checkOut(id) }}>
                                                        Check-Out
                                                    </Button >
                                                </>
                                                :
                                                <ColorButton variant="contained" color="primary" onClick={() => { checkIn(id) }}>
                                                    Check-In
                                                </ColorButton>
                                            ]}


                                    </React.Fragment>

                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={fixedHeightPaper}>
                                    <React.Fragment>
                                        <Typography component="h2" variant="h6" color="inherit" gutterBottom>
                                            Your Metrics:
                                        </Typography>
                                    </React.Fragment>

                                </Paper>
                            </Grid>
                            {driverStatus !== "AVAILABLE" ? null :
                                <Grid item xs={12}>
                                    <Paper className={fixedHeightPaper}>
                                        <AvailableOrders modalShow={openAcceptOrderModal} />
                                    </Paper>
                                </Grid>
                            }
                        </Grid>
                    </Container>
                </main>
            </div>
            <AcceptOrderModal show={showAcceptOrderModal} onHide={hideAcceptOrderModal} ></AcceptOrderModal>
        </>
    );
}
export default DriverPage;