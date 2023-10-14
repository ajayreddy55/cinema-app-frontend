import Header from "../header";

import Slider from "react-slick";
import { IoIosArrowForward } from "react-icons/io";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import SportsCardSlider from "../sportsCardSlider";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import MoviesCardSlider from "../movieCardSlider";
import NewsCardSlider from "../newsCardSlider";
import ShowsCardSlider from "../showsCardSlider";

const carouselList = [
  {
    id: 1,
    title: "RRR",
    imageUrl:
      "https://www.koimoi.com/wp-content/new-galleries/2023/07/rrr-2-ss-rajamouli-might-not-direct-ram-charan-jr-ntr-led-sequel-001.jpg",
  },
  {
    id: 2,
    title: "Avatar",
    imageUrl:
      "https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/9546/1369546-i-2752f084c8ed",
  },
  {
    id: 3,
    title: "House Of The Dragon",
    imageUrl: "https://static.hbo.com/2022-06/house-of-the-dragon-ka-1920.jpg",
  },
  {
    id: 4,
    title: "The Outsider",
    imageUrl: "https://flxt.tmsimg.com/assets/p17518238_b_h8_ac.jpg",
  },
  {
    id: 5,
    title: "Game Of Thrones",
    imageUrl: "https://images.soco.id/717-Seri-Novel-Game-of-Thrones-2.jpg.jpg",
  },
  {
    id: 6,
    title: "The Dark Knight",
    imageUrl:
      "https://assets.gqindia.com/photos/5cdc19cd54004319c73c4e01/16:9/w_2560%2Cc_limit/Batman-movie.jpg",
  },
];

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const navigate = useNavigate();

  const [topSportsPicksObject, setTopSportsPicksObject] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [topMoviesObject, setTopMoviesObject] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [topShowsObject, setTopShowsObject] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [topNewsObject, setTopNewsObject] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  //navigate to login
  useEffect(() => {
    const jwtToken = Cookies.get("cinema_jwt_token");
    if (jwtToken === undefined) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  //top sports use effect
  useEffect(() => {
    getTopSportsPicks();
  }, []);

  //top movies use effect
  useEffect(() => {
    getTopMovies();
  }, []);

  //top shows use effect
  useEffect(() => {
    getTopShows();
  }, []);

  //top news use effect
  useEffect(() => {
    getTopNews();
  }, []);

  //top sports api
  const getTopSportsPicks = async () => {
    setTopSportsPicksObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const sportsPicksUrl =
      "http://localhost:5555/api/sports?matchDate=&sportType=&tournamentName=&team1=&team2=&votes=40000000";

    const jwtToken = Cookies.get("cinema_jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topSportsPicksRes = await fetch(sportsPicksUrl, options);

    if (topSportsPicksRes.ok) {
      const topSportsPicksJson = await topSportsPicksRes.json();
      setTopSportsPicksObject((prevState) => ({
        ...prevState,
        responseList: topSportsPicksJson.sportsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topSportsPicksJson = await topSportsPicksRes.json();
      setTopSportsPicksObject((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topSportsPicksJson.message,
      }));
    }
  };

  //top movies api
  const getTopMovies = async () => {
    setTopMoviesObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const topMoviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=8000000&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(topMoviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setTopMoviesObject((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setTopMoviesObject((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //top shows api
  const getTopShows = async () => {
    setTopShowsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const topShowsUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=8000000&languages=&original_language=&category=tv-shows&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const showsRes = await fetch(topShowsUrl, options);

    if (showsRes.ok) {
      const showsResJson = await showsRes.json();
      setTopShowsObject((prevState) => ({
        ...prevState,
        responseList: showsResJson.movies_shows,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const showsResJson = await showsRes.json();
      setTopShowsObject((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: showsResJson.message,
      }));
    }
  };

  //top news api
  const getTopNews = async () => {
    setTopNewsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const topNewsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=&news_type=&news_tag=israel&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(topNewsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setTopNewsObject((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setTopNewsObject((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  //displaying error message
  const displayErrorMessage = (object) => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-home">
        <h3 className="home-empty-list-text">{object.errMsg}</h3>
      </div>
    );
  };

  //displaying loader
  const displayLoader = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-home">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = (objectToCheck, successFun) => {
    switch (objectToCheck.resStatus) {
      case apiConstants.success:
        return successFun(objectToCheck);

      case apiConstants.inProgress:
        return displayLoader();

      case apiConstants.failure:
        return displayErrorMessage(objectToCheck);

      default:
        return null;
    }
  };

  //display text if list length 0
  const displayTextLengthZero = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4">
        <h3 className="home-empty-list-text">No Data Found</h3>
      </div>
    );
  };

  //top sports picks
  const displayTopSportsPicks = (object) => {
    if (object.responseList.length === 0) {
      return (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <h3 className="home-empty-list-text">No Data Found</h3>
        </div>
      );
    }

    return (
      <Slider {...sliderSettings} className="home-categories-slider mt-4">
        {object.responseList.map((eachItem) => (
          <SportsCardSlider key={eachItem._id} item={eachItem} />
        ))}
      </Slider>
    );
  };

  //top movies displaying
  const displayTopMovies = (object) => {
    if (object.responseList.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="home-categories-slider mt-4">
        {object.responseList.map((eachMovie) => (
          <MoviesCardSlider key={eachMovie._id} eachMovie={eachMovie} />
        ))}
      </Slider>
    );
  };

  //top shows displaying
  const displayTopShows = (object) => {
    if (object.responseList.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="home-categories-slider mt-4">
        {object.responseList.map((eachShow) => (
          <ShowsCardSlider key={eachShow._id} eachShow={eachShow} />
        ))}
      </Slider>
    );
  };

  //top news displaying
  const displayTopNews = (object) => {
    if (object.responseList.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="home-categories-slider mt-4">
        {object.responseList.map((eachNews) => (
          <NewsCardSlider key={eachNews._id} newsItem={eachNews} />
        ))}
      </Slider>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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

  return (
    <div className="home-bg-container">
      <div>
        <Header />
        <div className="home-content-main-container p-3">
          <div className="container-fluid">
            <div className="row">
              {/* carousel */}
              <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <Slider {...settings} className="carousel-slider-home">
                  {carouselList.map((eachItem) => {
                    return (
                      <div
                        className="carousel-list-item-home"
                        key={eachItem.id}
                      >
                        <div className="carousel-main-item">
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.title}
                            className="carousel-image-home"
                          />
                          <div className="carousel-title-container-home">
                            <h3 className="carousel-title-home">
                              {eachItem.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              {/* Banner */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="banner-home-container">
                  <img
                    src="https://collider.com/wp-content/uploads/inception_movie_poster_banner_04.jpg"
                    alt="banner"
                    className="home-banner-image"
                  />
                </div>
              </div>
              {/* top sports picks */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Top Sports Picks</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(
                    topSportsPicksObject,
                    displayTopSportsPicks
                  )}
                  {/* <Slider
                    {...sliderSettings}
                    className="home-categories-slider mt-4"
                  >
                    {checkingWhatToDisplay(
                      topSportsPicksObject,
                      displayTopSportsPicks
                    )}
                    {carouselList.map((eachItem) => (
                       <SportsCardSlider key={eachItem._id} item={eachItem} />
                     ))}
                  </Slider> */}
                </div>
              </div>
              {/* top movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Top Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(topMoviesObject, displayTopMovies)}
                </div>
              </div>
              {/* top shows */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Top Shows</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(topShowsObject, displayTopShows)}
                </div>
              </div>
              {/* top news */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Top News</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(topNewsObject, displayTopNews)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
