import ReactPlayer from "react-player";
import { BsDot } from "react-icons/bs";

import "./index.css";
import Header from "../header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import { getYear } from "date-fns";
import SimilarSportCard from "../similarsportcard";
import Footer from "../footer";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const SportWatch = () => {
  const params = useParams();
  const { sportId } = params;
  const navigate = useNavigate();

  const [sportDetailsObject, setSportDetailsObject] = useState({
    responseObject: {},
    similarSportList: [],
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

  //sport details api
  useEffect(() => {
    getSportDetails();
    //eslint-disable-next-line
  }, [sportId]);

  //sport details api
  const getSportDetails = async () => {
    setSportDetailsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const sportDetailsUrl = `http://localhost:5555/api/sports-details/${sportId}`;
    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const sportDetailsRes = await fetch(sportDetailsUrl, options);

    if (sportDetailsRes.ok) {
      const sportDetailsResJson = await sportDetailsRes.json();
      setSportDetailsObject((prevState) => ({
        ...prevState,
        responseObject: sportDetailsResJson.matchDetails,
        similarSportList: sportDetailsResJson.similarMatches,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const sportDetailsResJson = await sportDetailsRes.json();
      setSportDetailsObject((prevState) => ({
        ...prevState,
        responseObject: {},
        similarSportList: [],
        resStatus: apiConstants.failure,
        errMsg: sportDetailsResJson.message,
      }));
    }
  };

  //loader view
  const displayLoaderView = () => {
    return (
      <div className="mt-4 loader-container-sport-player">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  //failure view
  const displayFailureView = () => {
    return (
      <div className="failure-view-container-sport-player mt-3 mb-3">
        <h1 className="sport-player-failure-text">
          {sportDetailsObject.errMsg}
        </h1>
      </div>
    );
  };

  //displaying similar sports
  const displaySimilarSports = () => {
    if (sportDetailsObject.similarSportList.length === 0) {
      return (
        <div className="row">
          <p className="similar-sport-empty-text col-12">No Data Found</p>
        </div>
      );
    }

    return (
      <div className="row mt-3 mb-2">
        {sportDetailsObject.similarSportList.map((eachSport) => (
          <SimilarSportCard key={eachSport._id} sportItem={eachSport} />
        ))}
      </div>
    );
  };

  //success view
  const displaySuccessView = () => {
    const { responseObject } = sportDetailsObject;

    const matchYear = getYear(new Date(responseObject.matchDate));

    return (
      <>
        <div className="container-fluid sport-player-inner-container mt-3 mb-2">
          <div className="row sport-player-row-container mt-3 mb-3">
            <div className="col-12 sport-player-video-container">
              <ReactPlayer
                url={responseObject.videoUrl}
                controls
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
          <div className="row mt-3 mb-2">
            <h3 className="col-12 sport-player-title">
              {responseObject.title}
            </h3>
            <div className="col-12 mt-1 mb-2 d-flex align-items-center">
              <p className="sport-player-genre">{responseObject.category}</p>
              <BsDot className="sport-player-dot-genre" />
              <p className="sport-player-genre">{matchYear}</p>
              <BsDot className="sport-player-dot-genre" />
              <p className="sport-player-genre">
                {responseObject.certificateType}
              </p>
            </div>
            <div className="col-12 mt-2 mb-2">
              <hr className="hr-line-sport-player" />
            </div>
            <p className="sport-player-description col-12 mt-2 mb-2">
              {responseObject.description}
            </p>
            <p className="sport-player-cast-text col-12 mb-2 mt-2">
              Cast: No Cast Available
            </p>
          </div>
        </div>
        <div className="container-fluid mt-3 mb-2">
          <div className="row">
            <div className="col-12">
              <hr className="sport-player-similar-hr-line" />
            </div>
          </div>
        </div>
        <div className="container-fluid mt-2 mb-2">
          <div className="row">
            <h2 className="similar-sports-heading col-12">Similar Sports</h2>
          </div>
          {displaySimilarSports()}
        </div>
      </>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (sportDetailsObject.resStatus) {
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
    <div className="sport-player-bg-container">
      <Header />
      <div className="sport-player-main-container">
        {checkingWhatToDisplay()}
      </div>
      <Footer />
    </div>
  );
};

export default SportWatch;
