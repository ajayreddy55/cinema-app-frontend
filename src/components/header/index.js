import { Link, useLocation, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { IoCloseSharp } from "react-icons/io5";
import "./index.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profileObject, setProfileObject] = useState({
    profileDetails: {},
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = async () => {
    setProfileObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const profileUrl = "http://localhost:5555/auth/profile";
    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const profileRes = await fetch(profileUrl, options);

    if (profileRes.ok) {
      const profileResJson = await profileRes.json();
      setProfileObject((prevState) => ({
        ...prevState,
        profileDetails: profileResJson,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      setProfileObject((prevState) => ({
        ...prevState,
        profileDetails: {},
        resStatus: apiConstants.failure,
        errMsg: "Oops! Something Went Wrong.",
      }));
    }
  };

  const displayLoaderView = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  const displayProfileDetails = () => {
    return (
      <>
        <img
          src="https://www.jiocinema.com/images/profile/profile_avatar-v2.svg"
          alt="profileIcon"
          className="popup-profile-icon-header"
        />
        <h3 className="header-popup-profile-name">
          {profileObject.profileDetails.name}
        </h3>
        <p className="header-popup-profile-email">
          {profileObject.profileDetails.email}
        </p>
      </>
    );
  };

  const displayFailureView = () => {
    return (
      <div className="d-flex align-items-center justify-content-center mt-2 mb-2">
        <h3 className="header-profile-error-message">{profileObject.errMsg}</h3>
      </div>
    );
  };

  const logoutFromPage = () => {
    Cookies.remove("cinema_jwt_token");
    navigate("/login");
  };

  const checkWhatToDisplay = () => {
    switch (profileObject.resStatus) {
      case apiConstants.inProgress:
        return displayLoaderView();

      case apiConstants.success:
        return displayProfileDetails();

      case apiConstants.failure:
        return displayFailureView();

      default:
        return null;
    }
  };

  const homePageActive = location.pathname === "/" ? "header-active-page" : "";
  const moviesPageActive =
    location.pathname === "/movies" ? "header-active-page" : "";
  const showPageActive =
    location.pathname === "/tv-shows" ? "header-active-page" : "";
  const sportsPageActive =
    location.pathname === "/sports" ? "header-active-page" : "";
  const newsPageActive =
    location.pathname === "/news" ? "header-active-page" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-container-main sticky-top">
      <Link to={"/"} className="navbar-brand navbar-link-item">
        <div className="d-flex align-items-center">
          <img
            className="navbar-logo-image"
            src="https://cdn-icons-png.flaticon.com/512/164/164596.png"
            alt="website logo"
          />
          <p className="navbar-logo-name">CinemaPlay</p>
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <button className="navbar-profile-button d-lg-none mt-2 mb-2">
          <img
            src="https://www.jiocinema.com/images/profile/profile_avatar-v2.svg"
            alt="profileIcon"
            className="navbar-profile-icon"
          />
        </button>
        <ul className="navbar-nav mr-auto ml-1">
          <li className="nav-item ml-2">
            <Link to={"/"} className="nav-link nav-link-item-style">
              <p className={`nav-tab-item ${homePageActive}`}>Home</p>
            </Link>
          </li>
          <li className="nav-item ml-2">
            <Link to={"/movies"} className="nav-link nav-link-item-style">
              <p className={`nav-tab-item ${moviesPageActive}`}>Movies</p>
            </Link>
          </li>

          <li className="nav-item ml-2">
            <Link to={"/tv-shows"} className="nav-link nav-link-item-style">
              <p className={`nav-tab-item ${showPageActive}`}>TV Shows</p>
            </Link>
          </li>

          <li className="nav-item ml-2">
            <Link to={"/sports"} className="nav-link nav-link-item-style">
              <p className={`nav-tab-item ${sportsPageActive}`}>Sports</p>
            </Link>
          </li>

          <li className="nav-item ml-2">
            <Link to={"/news"} className="nav-link nav-link-item-style">
              <p className={`nav-tab-item ${newsPageActive}`}>News</p>
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <Popup
          trigger={
            <button className="navbar-profile-button d-none d-lg-block">
              <img
                src="https://www.jiocinema.com/images/profile/profile_avatar-v2.svg"
                alt="profileIcon"
                className="navbar-profile-icon"
              />
            </button>
          }
          modal="true"
          className="popup-content"
        >
          {(close) => (
            <div className="header-popup-main-container">
              <button
                className="header-popup-cross-button"
                onClick={() => close()}
              >
                <IoCloseSharp className="header-popup-close-icon" />
              </button>
              <div className="header-popup-content-container">
                {checkWhatToDisplay()}
                <button
                  className="header-popup-logout-button"
                  onClick={logoutFromPage}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  );
};

export default Header;
