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

const MoviePlayer = () => {
  const params = useParams();
  const { movieId } = params;
  const navigate = useNavigate();

  const [movieDetailsObject, setMovieDetailsObject] = useState({
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

  //movie details api
  useEffect(() => {
    getMovieDetails();
    //eslint-disable-next-line
  }, []);

  //movie details api
  const getMovieDetails = async () => {
    setMovieDetailsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const movieDetailsUrl = `http://localhost:5555/api/movies-shows-details/${movieId}`;
    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const movieDetailsRes = await fetch(movieDetailsUrl, options);

    if (movieDetailsRes.ok) {
      const movieDetailsResJson = await movieDetailsRes.json();
      setMovieDetailsObject((prevState) => ({
        ...prevState,
        responseObject: movieDetailsResJson.movieDetails,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const movieDetailsResJson = await movieDetailsRes.json();
      setMovieDetailsObject((prevState) => ({
        ...prevState,
        responseObject: {},
        resStatus: apiConstants.failure,
        errMsg: movieDetailsResJson.message,
      }));
    }
  };

  //loader view
  const displayLoaderView = () => {
    return (
      <div className="mt-4 loader-container-movie-player">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  //failure view
  const displayFailureView = () => {
    return (
      <div className="failure-view-container-movie-player mt-3 mb-3">
        <h1 className="movie-player-failure-text">
          {movieDetailsObject.errMsg}
        </h1>
      </div>
    );
  };

  //success view
  const displaySuccessView = () => {
    const { responseObject } = movieDetailsObject;

    const releaseYear = getYear(new Date(responseObject.releaseDate));

    return (
      <div className="container-fluid movie-player-inner-container mt-3 mb-2">
        <div className="row movie-player-row-container mt-3 mb-3">
          <div className="col-12">
            <ReactPlayer
              url={responseObject.videoUrl}
              controls
              width={"100%"}
              height={"100%"}
            />
          </div>
        </div>
        <div className="row mt-3 mb-2">
          <h3 className="col-12 movie-player-title">{responseObject.title}</h3>
          <div className="col-12 mt-1 mb-2 d-flex align-items-center">
            <p className="movie-player-genre">{responseObject.genre}</p>
            <BsDot className="movie-player-dot-genre" />
            <p className="movie-player-genre">{releaseYear}</p>
            <BsDot className="movie-player-dot-genre" />
            <p className="movie-player-genre">
              {responseObject.certificateType}
            </p>
          </div>
          <div className="col-12 mt-2 mb-2">
            <hr className="hr-line-movie-player" />
          </div>
          <p className="movie-player-description col-12 mt-2 mb-2">
            {responseObject.description}
          </p>
          <p className="movie-player-cast-text col-12 mb-2 mt-2">
            Cast: {responseObject.cast}
          </p>
        </div>
      </div>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (movieDetailsObject.resStatus) {
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
    <div className="movie-player-bg-container">
      <Header />
      <div className="movie-player-main-container">
        {checkingWhatToDisplay()}
      </div>
    </div>
  );
};

export default MoviePlayer;
