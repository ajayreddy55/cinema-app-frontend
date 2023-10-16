import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { getYear } from "date-fns";

import "./index.css";
import Header from "../header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import ShowDetailsSimilarShows from "../similarShowsCard";
import ShowSeasonsTabs from "../showSeasonsTabs";
import Slider from "react-slick";
import ShowEpisodesCard from "../showEpisodesCard";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ShowDetailsPage = () => {
  const params = useParams();
  const { showId } = params;
  const navigate = useNavigate();

  const [showDetailsObject, setShowDetailsObject] = useState({
    responseDetailsObject: {},
    resStatus: apiConstants.initial,
    similarShowsList: [],
    errMsg: "",
  });

  const [activeSeason, setActiveSeason] = useState({});

  useEffect(() => {
    const jwtToken = Cookies.get("cinema_jwt_token");
    if (jwtToken === undefined) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  //show details useEffect
  useEffect(() => {
    getShowDetails();
    //eslint-disable-next-line
  }, [showId]);

  //show details api
  const getShowDetails = async () => {
    setShowDetailsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const showDetailsUrl = `http://localhost:5555/api/movies-shows-details/${showId}`;
    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const showDetailsRes = await fetch(showDetailsUrl, options);

    if (showDetailsRes.ok) {
      const showDetailsResJson = await showDetailsRes.json();
      setShowDetailsObject((prevState) => ({
        ...prevState,
        responseDetailsObject: showDetailsResJson.showDetails,
        similarShowsList: showDetailsResJson.similarShows,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
      setActiveSeason(showDetailsResJson.showDetails.seasons[0]);
    } else {
      const showDetailsResJson = await showDetailsRes.json();
      setShowDetailsObject((prevState) => ({
        ...prevState,
        responseDetailsObject: {},
        similarShowsList: [],
        resStatus: apiConstants.failure,
        errMsg: showDetailsResJson.message,
      }));
    }
  };

  const displayLoaderView = () => {
    return (
      <div className="mt-4 loader-container-show-details">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  const displayFailureView = () => {
    return (
      <div className="failure-view-container-show-details mt-3 mb-3">
        <h1 className="show-details-failure-text">
          {showDetailsObject.errMsg}
        </h1>
      </div>
    );
  };

  const displaySimilarShows = () => {
    const { similarShowsList } = showDetailsObject;

    if (similarShowsList.length === 0) {
      return (
        <div className="col-12 mt-3 mb-3 d-flex align-items-center justify-content-center">
          <h3 className="similar-show-empty-text">No Data Found</h3>
        </div>
      );
    }

    return (
      <>
        {similarShowsList.map((eachShow) => (
          <ShowDetailsSimilarShows key={eachShow._id} eachShow={eachShow} />
        ))}
      </>
    );
  };

  const changeToAnotherSeason = (seasonId) => {
    const seasonClicked = showDetailsObject.responseDetailsObject.seasons.find(
      (eachSeason) => eachSeason._id === seasonId
    );
    setActiveSeason(seasonClicked);
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    slidesToShow: 4,
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

  const displaySuccessView = () => {
    const backGroundStyle = {
      backgroundImage: `url(${showDetailsObject.responseDetailsObject.bannerUrl})`,
    };

    const { responseDetailsObject } = showDetailsObject;
    const releaseYear = getYear(new Date(responseDetailsObject.releaseDate));

    return (
      <>
        <div
          className="show-details-banner-container mt-3 mb-3"
          style={backGroundStyle}
        >
          <div className="container-fluid show-details-card-container p-0">
            <div className="row p-2 show-details-row-container">
              <div className="col-12 col-md-2 mt-3">
                <div className="mr-2 show-details-watch-container-item">
                  <Link
                    to={`/show-watch/${responseDetailsObject._id}/${activeSeason.seasonNumber}/${activeSeason._id}/${activeSeason.episodes[0]._id}`}
                    className="d-flex align-items-center show-details-watch-link-item"
                  >
                    <FaPlay className="movies-details-play-icon" />
                    <p className="show-details-watch-text">WATCH</p>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-7 mt-3">
                <div className="mr-2">
                  <h3 className="show-details-title mb-2">
                    {responseDetailsObject.title}
                  </h3>
                  <div className="d-flex align-items-center mt-2 mb-2">
                    <p className="show-details-info">
                      {responseDetailsObject.genre}
                    </p>
                    <BsDot className="show-details-dot" />
                    <p className="show-details-info">{releaseYear}</p>
                    <BsDot className="show-details-dot" />
                    <p className="show-details-info">
                      {responseDetailsObject.certificateType}
                    </p>
                  </div>
                  <p className="show-details-description mt-2">
                    {responseDetailsObject.description}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-3 mt-3">
                <div className="d-flex flex-column mr-2">
                  <h3 className="show-details-cast-heading">Cast</h3>
                  <p className="show-details-cast-text">
                    {responseDetailsObject.cast}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-3 mb-3">
          <div className="row">
            <h2 className="show-details-episodes-heading mt-3 col-12">
              Episodes
            </h2>
            <div className="col-12 show-seasons-main-container mt-2 mb-2">
              {showDetailsObject.responseDetailsObject.seasons.map(
                (eachSeason) => (
                  <ShowSeasonsTabs
                    eachSeason={eachSeason}
                    key={eachSeason._id}
                    activeSeasonId={activeSeason._id}
                    changeToAnotherSeason={changeToAnotherSeason}
                  />
                )
              )}
            </div>
            <div className="col-12 mt-3 mb-2">
              <div className="show-details-episodes-slider-container">
                <Slider
                  {...sliderSettings}
                  className="show-details-episodes-slider"
                >
                  {activeSeason.episodes.map((eachEpisode) => (
                    <ShowEpisodesCard
                      key={eachEpisode._id}
                      eachEpisode={eachEpisode}
                      seasonObject={activeSeason}
                      seasonDetails={showDetailsObject.responseDetailsObject}
                    />
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-4 mb-4 w-100">
          <div className="row mt-2 mb-3">
            <h2 className="show-details-similar-show-heading col-12">
              Similar Shows
            </h2>
          </div>
          <div className="row mt-2 mb-2">{displaySimilarShows()}</div>
        </div>
      </>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (showDetailsObject.resStatus) {
      case apiConstants.inProgress:
        return displayLoaderView();

      case apiConstants.success:
        return displaySuccessView();

      case apiConstants.failure:
        return displayFailureView();

      default:
        return null;
    }
  };

  return (
    <div className="show-details-bg-container">
      <Header />
      <div className="show-details-content-main-container">
        {checkingWhatToDisplay()}
      </div>
    </div>
  );
};

export default ShowDetailsPage;
