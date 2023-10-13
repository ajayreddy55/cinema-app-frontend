import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark navbar-container-main">
      <Link class="navbar-brand navbar-link-item">
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
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <button className="navbar-profile-button d-lg-none mt-2 mb-2">
          <img
            src="https://www.jiocinema.com/images/profile/profile_avatar-v2.svg"
            alt="profileIcon"
            className="navbar-profile-icon"
          />
        </button>
        <ul class="navbar-nav mr-auto ml-1">
          <li class="nav-item ml-2">
            <Link class="nav-link nav-link-item-style">Home</Link>
          </li>
          <li class="nav-item ml-2">
            <Link class="nav-link nav-link-item-style">Movies</Link>
          </li>

          <li class="nav-item ml-2">
            <Link class="nav-link nav-link-item-style">TV Shows</Link>
          </li>

          <li class="nav-item ml-2">
            <Link class="nav-link nav-link-item-style">Sports</Link>
          </li>

          <li class="nav-item ml-2">
            <Link class="nav-link nav-link-item-style">News</Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <button className="navbar-profile-button d-none d-lg-block">
          <img
            src="https://www.jiocinema.com/images/profile/profile_avatar-v2.svg"
            alt="profileIcon"
            className="navbar-profile-icon"
          />
        </button>
      </div>
    </nav>
  );
};

export default Header;
