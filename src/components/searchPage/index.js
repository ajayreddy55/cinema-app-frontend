import Slider from "react-slick";
import { Link } from "react-router-dom";

import Header from "../header";
import "./index.css";
import { IoIosArrowForward } from "react-icons/io";
import { InfinitySpin } from "react-loader-spinner";
import ShowsCardSlider from "../showsCardSlider";
import Footer from "../footer";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MoviesCardSlider from "../movieCardSlider";
import SportsCardSlider from "../sportsCardSlider";
import NewsCardSlider from "../newsCardSlider";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const SearchPage = () => {
  const [searchResultsObject, setSearchResultsObject] = useState({
    moviesResults: [],
    showsResults: [],
    sportsResults: [],
    newsResults: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  useEffect(() => {
    getSearchResults();
  }, []);

  const getSearchResults = async (searchInput = "") => {
    setSearchResultsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const searchUrl = `http://localhost:5555/api/search?title=${searchInput}`;
    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const resultsRes = await fetch(searchUrl, options);

    if (resultsRes.ok) {
      const resultsResJson = await resultsRes.json();
      console.log(resultsResJson);
      setSearchResultsObject((prevState) => ({
        ...prevState,
        moviesResults: resultsResJson.moviesResults,
        showsResults: resultsResJson.showsResults,
        sportsResults: resultsResJson.sportsResults,
        newsResults: resultsResJson.newsResults,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const resultsResJson = await resultsRes.json();
      setSearchResultsObject((prevState) => ({
        ...prevState,
        moviesResults: [],
        showsResults: [],
        sportsResults: [],
        newsResults: [],
        resStatus: apiConstants.failure,
        errMsg: resultsResJson.message,
      }));
    }
  };

  //displaying error message
  const displayErrorMessage = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-search">
        <h3 className="search-empty-list-text">{searchResultsObject.errMsg}</h3>
      </div>
    );
  };

  //displaying loader
  const displayLoader = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-search">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  const displayContent = () => {
    return (
      <div className="container-fluid mt-2 mb-2">
        <div className="row">
          <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
            <div className="search-slides-main-container">
              <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                <h2 className="search-topics-heading">Results for Movies</h2>
                <Link className="search-explore-link">
                  <p className="search-explore-text">Explore more</p>
                  <IoIosArrowForward className="search-explore-more-arrow" />
                </Link>
              </div>
              {displayingMovies()}
            </div>
          </div>
          <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
            <div className="search-slides-main-container">
              <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                <h2 className="search-topics-heading">Results for Shows</h2>
                <Link className="search-explore-link">
                  <p className="search-explore-text">Explore more</p>
                  <IoIosArrowForward className="search-explore-more-arrow" />
                </Link>
              </div>
              {displayingShows()}
            </div>
          </div>
          <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
            <div className="search-slides-main-container">
              <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                <h2 className="search-topics-heading">Results for Sports</h2>
                <Link className="search-explore-link">
                  <p className="search-explore-text">Explore more</p>
                  <IoIosArrowForward className="search-explore-more-arrow" />
                </Link>
              </div>
              {displayingSports()}
            </div>
          </div>
          <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
            <div className="search-slides-main-container">
              <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                <h2 className="search-topics-heading">Results for News</h2>
                <Link className="search-explore-link">
                  <p className="search-explore-text">Explore more</p>
                  <IoIosArrowForward className="search-explore-more-arrow" />
                </Link>
              </div>
              {displayingNews()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (searchResultsObject.resStatus) {
      case apiConstants.success:
        return displayContent();

      case apiConstants.inProgress:
        return displayLoader();

      case apiConstants.failure:
        return displayErrorMessage();

      default:
        return null;
    }
  };

  //display text if list length 0
  const displayTextLengthZero = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <h3 className="search-empty-list-text">No Data Found</h3>
      </div>
    );
  };

  //top movies displaying
  const displayingMovies = () => {
    if (searchResultsObject.moviesResults.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="search-categories-slider mt-4">
        {searchResultsObject.moviesResults.map((eachMovie) => (
          <MoviesCardSlider key={eachMovie._id} eachMovie={eachMovie} />
        ))}
      </Slider>
    );
  };

  //top shows displaying
  const displayingShows = (object) => {
    if (searchResultsObject.showsResults.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="search-categories-slider mt-4">
        {searchResultsObject.showsResults.map((eachShow) => (
          <ShowsCardSlider key={eachShow._id} eachShow={eachShow} />
        ))}
      </Slider>
    );
  };

  //top sports picks
  const displayingSports = (object) => {
    if (searchResultsObject.sportsResults.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="search-categories-slider mt-4">
        {searchResultsObject.sportsResults.map((eachItem) => (
          <SportsCardSlider key={eachItem._id} item={eachItem} />
        ))}
      </Slider>
    );
  };

  //top news displaying
  const displayingNews = (object) => {
    if (searchResultsObject.newsResults.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="search-categories-slider mt-4">
        {searchResultsObject.newsResults.map((eachNews) => (
          <NewsCardSlider key={eachNews._id} newsItem={eachNews} />
        ))}
      </Slider>
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    slidesToShow: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const changeSearchInput = (searchInput) => {
    getSearchResults(searchInput);
  };

  return (
    <div className="search-main-bg-container">
      <Header changeSearchInput={changeSearchInput} />
      <div className="search-content-main-container">
        {checkingWhatToDisplay()}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
