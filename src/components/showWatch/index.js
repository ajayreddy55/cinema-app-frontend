import ReactPlayer from "react-player";
import { BsDot } from "react-icons/bs";

import "./index.css";
import Header from "../header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import { getYear } from "date-fns";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ShowPlayer = () => {
  const params = useParams();
  const { showId, seasonId, episodeId } = params;
  const navigate = useNavigate();

  const [showDetailsObject, setShowDetailsObject] = useState({
    responseObject: {},
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  useEffect(() => {
    const jwtToken = Cookies.get("cinema_jwt_token");
    if (jwtToken === undefined) {
      navigate();
    }
    //eslint-disable-next-line
  }, []);

  //show details api
  useEffect(() => {
    getShowDetails();
    //eslint-disable-next-line
  }, []);

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
        responseObject: showDetailsResJson.showDetails,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const showDetailsResJson = await showDetailsRes.json();
      setShowDetailsObject((prevState) => ({
        ...prevState,
        responseObject: {},
        resStatus: apiConstants.failure,
        errMsg: showDetailsResJson.message,
      }));
    }
  };

  //loader view
  const displayLoaderView = () => {
    return (
      <div className="mt-4 loader-container-show-player">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  //failure view
  const displayFailureView = () => {
    return (
      <div className="failure-view-container-show-player mt-3 mb-3">
        <h1 className="show-player-failure-text">{showDetailsObject.errMsg}</h1>
      </div>
    );
  };

  //success view
  const displaySuccessView = () => {
    const { responseObject } = showDetailsObject;
    const seasonRequired = responseObject.seasons.find(
      (eachSeason) => eachSeason._id === seasonId
    );
    const episodeRequired = seasonRequired.episodes.find(
      (eachEpisode) => eachEpisode._id === episodeId
    );

    const releaseYear = getYear(new Date(responseObject.releaseDate));

    return (
      <div className="container-fluid show-player-inner-container mt-3 mb-2">
        <div className="row show-player-row-container mt-3 mb-3">
          <div className="col-12 show-player-video-container">
            <ReactPlayer
              url={episodeRequired.episodeVideoUrl}
              controls
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
        <div className="row mt-3 mb-2">
          <h3 className="col-12 show-player-title">
            {episodeRequired.episodeTitle}
          </h3>
          <div className="col-12 mt-1 mb-2 d-flex align-items-center">
            <p className="show-player-genre">{episodeRequired.duration}</p>
            <BsDot className="show-player-dot-genre" />
            <p className="show-player-genre">{releaseYear}</p>
            <BsDot className="show-player-dot-genre" />
            <p className="show-player-genre">
              {responseObject.certificateType}
            </p>
          </div>
          <div className="col-12 mt-2 mb-2">
            <hr className="hr-line-show-player" />
          </div>
          <p className="show-player-description col-12 mt-2 mb-2">
            {responseObject.description}
          </p>
          <p className="show-player-cast-text col-12 mb-2 mt-2">
            Cast: {responseObject.cast}
          </p>
        </div>
      </div>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (showDetailsObject.resStatus) {
      case apiConstants.inProgress:
        return displayLoaderView();

      case apiConstants.failure:
        return displayFailureView();

      case apiConstants.success:
        return displaySuccessView();

      default:
        return null;
    }
  };

  return (
    <div className="show-player-bg-container">
      <Header />
      <div className="show-player-main-container">
        {checkingWhatToDisplay()}
      </div>
    </div>
  );
};

export default ShowPlayer;
