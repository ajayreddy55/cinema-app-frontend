import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import { getYear } from "date-fns";

import "./index.css";
import Header from "../header";
import MoviesDetailsSimilarMovies from "../SimilarMoviesCard";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import Footer from "../footer";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MoviesDetailsPage = () => {
  const params = useParams();
  const { movieId } = params;
  const navigate = useNavigate();

  const [movieDetailsObject, setMovieDetailsObject] = useState({
    responseDetailsObject: {},
    resStatus: apiConstants.initial,
    similarMoviesList: [],
    errMsg: "",
  });

  useEffect(() => {
    const jwtToken = Cookies.get("cinema_jwt_token");
    if (jwtToken === undefined) {
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  //movie details useEffect
  useEffect(() => {
    getMovieDetails();
    //eslint-disable-next-line
  }, [movieId]);

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
        responseDetailsObject: movieDetailsResJson.movieDetails,
        similarMoviesList: movieDetailsResJson.similarMovies,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const movieDetailsResJson = await movieDetailsRes.json();
      setMovieDetailsObject((prevState) => ({
        ...prevState,
        responseDetailsObject: {},
        similarMoviesList: [],
        resStatus: apiConstants.failure,
        errMsg: movieDetailsResJson.message,
      }));
    }
  };

  const displayLoaderView = () => {
    return (
      <div className="mt-4 loader-container-movie-details">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  const displayFailureView = () => {
    return (
      <div className="failure-view-container-movie-details mt-3 mb-3">
        <h1 className="movie-details-failure-text">
          {movieDetailsObject.errMsg}
        </h1>
      </div>
    );
  };

  const displaySimilarMovies = () => {
    const { similarMoviesList } = movieDetailsObject;

    if (similarMoviesList.length === 0) {
      return (
        <div className="col-12 mt-3 mb-3 d-flex align-items-center justify-content-center">
          <h3 className="similar-movies-empty-text">No Data Found</h3>
        </div>
      );
    }

    return (
      <>
        {similarMoviesList.map((eachMovie) => (
          <MoviesDetailsSimilarMovies
            key={eachMovie._id}
            eachMovie={eachMovie}
          />
        ))}
      </>
    );
  };

  const displaySuccessView = () => {
    const backGroundStyle = {
      backgroundImage: `url(${movieDetailsObject.responseDetailsObject.bannerUrl})`,
    };

    const { responseDetailsObject } = movieDetailsObject;
    const releaseYear = getYear(new Date(responseDetailsObject.releaseDate));

    return (
      <>
        <div
          className="movies-details-banner-container mt-3 mb-3"
          style={backGroundStyle}
        >
          <div className="container-fluid movies-details-card-container p-0">
            <div className="row p-2 movie-details-row-container">
              <div className="col-12 col-md-2 mt-3">
                <div className="mr-2 movies-details-watch-container-item">
                  <Link
                    to={`/movie-watch/${responseDetailsObject._id}`}
                    className="d-flex align-items-center movies-details-watch-link-item"
                  >
                    <FaPlay className="movies-details-play-icon" />
                    <p className="movies-details-watch-text">WATCH</p>
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-7 mt-3">
                <div className="mr-2">
                  <h3 className="movies-details-title mb-2">
                    {responseDetailsObject.title}
                  </h3>
                  <div className="d-flex align-items-center mt-2 mb-2">
                    <p className="movies-details-info">
                      {responseDetailsObject.duration}
                    </p>
                    <BsDot className="movies-details-dot" />
                    <p className="movies-details-info">
                      {responseDetailsObject.genre}
                    </p>
                    <BsDot className="movies-details-dot" />
                    <p className="movies-details-info">{releaseYear}</p>
                    <BsDot className="movies-details-dot" />
                    <p className="movies-details-info">
                      {responseDetailsObject.certificateType}
                    </p>
                  </div>
                  <p className="movie-details-description mt-2">
                    {responseDetailsObject.description}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-3 mt-3">
                <div className="d-flex flex-column mr-2">
                  <h3 className="movies-details-cast-heading">Cast</h3>
                  <p className="movies-details-cast-text">
                    {responseDetailsObject.cast}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid mt-4 mb-4 w-100">
          <div className="row mt-2 mb-3">
            <h2 className="movies-details-similar-movies-heading col-12">
              Similar Movies
            </h2>
          </div>
          <div className="row mt-2 mb-2">{displaySimilarMovies()}</div>
        </div>
      </>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (movieDetailsObject.resStatus) {
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
    <div className="movies-details-bg-container">
      <Header />
      <div className="movies-details-content-main-container">
        {checkingWhatToDisplay()}
      </div>
      <Footer />
    </div>
  );
};

export default MoviesDetailsPage;
