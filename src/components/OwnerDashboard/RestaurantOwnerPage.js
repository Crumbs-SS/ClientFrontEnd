
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from "../../actions/authActions";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
    Button,
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Grid,
    Paper,
    Container
} from "@material-ui/core";
import OwnerRestaurants from './OwnerRestaurants';
import Chart from './Chart';
import RecentOrders from './RecentOrders';
import OrderService from "../../adapters/orderService";
import React, { useEffect , useState} from "react";

const useStyles = makeStyles((theme) => (
  {
      root: {
          display: 'flex',
      },
      flexGrow: {
          flexGrow: 1,
      },
      appBarSpacer: theme.mixins.toolbar, 
      topLeftPaper: {
          height: 360,
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
      },
      bottomLeftPaper: {
          height: 310,
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
      },
      rightHeight: {
          height : '100%',
          width: '120%',
          padding: theme.spacing(2),
      },
      container: {
          margin: '0px 0px 0px 0px',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(5),
    },
  }));

const RestaurantOwnerPage = () => {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const username = window.location.pathname.split('/owner/')[1].split('/dashboard')[0];
  const [pendingOrders, setPendingOrders] = useState(null);

  useEffect(() => {
    OrderService.getPendingOrders(username).then((response) => {
        setPendingOrders(response.data);
    })
}, [username])

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
                                        <OwnerRestaurants username={username}></OwnerRestaurants>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className={classes.bottomLeftPaper} >
                                            <Chart></Chart>
                                        </Paper>
                                    </Grid>
                                    
                                </Grid>

                            </Grid>

                            <Grid item xs={6}>
                                <Grid style={{ height: "100%"}}>
                                    <Paper className={classes.rightHeight}>
                                      <RecentOrders username={username}></RecentOrders>
                                    </Paper>
                                </Grid>

                            </Grid>

                        </Grid>
                        </Container>
                </main>

            </div>
      
    </>
  )


}
export default RestaurantOwnerPage;