import '../style/sidebar.css';
import { NavLink, Link } from 'react-router-dom';
const SideBar = () => {
  const selectColor = {color: "red"};

  return(
    <div id="side-bar">

      <div className="head">
        <NavLink
          to='/'
          activeStyle={selectColor}>
            <i className="fas fa-home"></i> Home
        </NavLink>

        <div className="line"></div>

        <NavLink
          to='/login'
          activeStyle={selectColor}>
            <i className="fas fa-user"></i> Sign Up or Sign In
        </NavLink>
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
