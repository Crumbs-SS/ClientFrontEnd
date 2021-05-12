import SideBar from '../SideBar';
import '../../style/landing-page.css'

const LandingPage = () => {
  return(
    <div id = "landing-page">
      <div id = "title-holder">
        <h1 id="title-name"> SCRUMPTIOUS </h1>
        <div id="search-bar">
          <input className="input-text" placeholder="Enter restaurant name">
          </input>
          <div id="search-button">
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
