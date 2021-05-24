import '../style/sidebar.css';
import {Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../actions/authActions'

const SideBar = () => {
    const selectColor = {color: "red"};
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const loginLink = () => {
        return (
            <NavLink
                to='/login'
                activeStyle={selectColor}>
                <i className="fas fa-user"></i> Sign Up or Sign In
            </NavLink>
        );
    }

    const logoutLink = () => {
        return (
            <NavLink
                to='#'
                activeStyle={selectColor}
                onClick={() => dispatch(logout())}>
                <i className="fas fa-user"></i> Sign Out
            </NavLink>
        );
    }
    const link = user ? logoutLink() : loginLink();

    return (
        <div id="side-bar">

            <div className="head">
                <NavLink
                    to='/'
                    activeStyle={selectColor}>
                    <i className="fas fa-home"></i> Home
                </NavLink>

                <div className="line"></div>
                {link}
            </div>

            <div className='inline'></div>

            <div className="body">
                <Link
                    to={{pathname: "http://localhost:4200/utopia/restaurants/addRestaurant"}}
          target="_blank">
           Add Restaurant
        </Link>
        <Link
          to={{pathname: "https://google.com/"}} target="_blank">
           Be a driver
        </Link>
        <Link
          to={{pathname: "https://google.com/"}} target="_blank">
           Company Portal
        </Link>
      </div>

    </div>
  )

}

export default SideBar;
