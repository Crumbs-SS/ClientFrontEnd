import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
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
    Container,
    Grid,
    Paper,
} from "@material-ui/core";
import OwnerRestaurants from './OwnerRestaurants';
import Chart from './Chart';
import RecentOrders from './RecentOrders';

const useStyles = makeStyles((theme) => (
  {
      root: {
          display: 'flex',
          height : '100%',
          width : '100%'
      },
      flexGrow: {
          flexGrow: 2,
          padding: '20px'
      },
      appBarSpacer: theme.mixins.toolbar, 
      container: {
          paddingTop: theme.spacing(4),
        //   paddingBottom: theme.spacing(3),
          margin: '10px 10px 10px 10px',
          height : '100%',
          width : '100%'
      },
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
          width : 500,
          padding: theme.spacing(2),
      },
  }));

const RestaurantOwnerPage = () => {
  
  const dispatch = useDispatch();
  const classes = useStyles();
  const username = window.location.pathname.split('/owner/')[1].split('/dashboard')[0];
  const token = useSelector(state => state.auth.token);
 
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
                    

                        <Grid container spacing={3}>

                            <Grid item xs={6} container spacing={3}>
                                
                                    <Grid item xs={12}>
                                        <Paper className={classes.topLeftPaper}>
                                        <OwnerRestaurants username={username} token={token}></OwnerRestaurants>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper className={classes.bottomLeftPaper} >
                                            <Chart></Chart>
                                        </Paper>
                                    </Grid>
                                    
                                

                            </Grid>

                            <Grid item xs={6} container spacing={3}>
                                
                                <Grid item xs={12}>
                                    <Paper className={classes.topLeftPaper}>
                                      <RecentOrders></RecentOrders>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper className={classes.bottomLeftPaper}>
                                      <RecentOrders></RecentOrders>
                                    </Paper>
                                </Grid>

                            </Grid>

                        </Grid>

                   
                </main>

            </div>
      
    </>
  )


}
export default RestaurantOwnerPage;