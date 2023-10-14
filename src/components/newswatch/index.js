import ReactPlayer from "react-player";
import { BsDot } from "react-icons/bs";

import "./index.css";
import Header from "../header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import { getYear } from "date-fns";
import SimilarNewsCard from "../similarnewscard";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const NewsWatch = () => {
  const params = useParams();
  const { newsId } = params;
  const navigate = useNavigate();

  const [newsDetailsObject, setNewsDetailsObject] = useState({
    responseObject: {},
    similarNewsList: [],
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

  //news details api
  useEffect(() => {
    getNewsDetails();
    //eslint-disable-next-line
  }, [newsId]);

  //news details api
  const getNewsDetails = async () => {
    setNewsDetailsObject((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsDetailsUrl = `http://localhost:5555/api/news-details/${newsId}`;
    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const newsDetailsRes = await fetch(newsDetailsUrl, options);

    if (newsDetailsRes.ok) {
      const newsDetailsResJson = await newsDetailsRes.json();
      setNewsDetailsObject((prevState) => ({
        ...prevState,
        responseObject: newsDetailsResJson.newsDetails,
        similarNewsList: newsDetailsResJson.similarNews,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const newsDetailsResJson = await newsDetailsRes.json();
      setNewsDetailsObject((prevState) => ({
        ...prevState,
        responseObject: {},
        similarNewsList: [],
        resStatus: apiConstants.failure,
        errMsg: newsDetailsResJson.message,
      }));
    }
  };

  //loader view
  const displayLoaderView = () => {
    return (
      <div className="mt-4 loader-container-news-player">
        <InfinitySpin width="200" color="#ffffff" />
      </div>
    );
  };

  //failure view
  const displayFailureView = () => {
    return (
      <div className="failure-view-container-news-player mt-3 mb-3">
        <h1 className="news-player-failure-text">{newsDetailsObject.errMsg}</h1>
      </div>
    );
  };

  //displaying similar news
  const displaySimilarNews = () => {
    if (newsDetailsObject.similarNewsList.length === 0) {
      return (
        <div className="row">
          <p className="similar-news-empty-text col-12">No Data Found</p>
        </div>
      );
    }

    return (
      <div className="row mt-3 mb-2">
        {newsDetailsObject.similarNewsList.map((eachNews) => (
          <SimilarNewsCard key={eachNews._id} newsItem={eachNews} />
        ))}
      </div>
    );
  };

  //success view
  const displaySuccessView = () => {
    const { responseObject } = newsDetailsObject;

    const newsYear = getYear(new Date(responseObject.newsDate));

    return (
      <>
        <div className="container-fluid news-player-inner-container mt-3 mb-2">
          <div className="row news-player-row-container mt-3 mb-3">
            <div className="col-12 news-player-video-container">
              <ReactPlayer
                url={responseObject.videoUrl}
                controls
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
          <div className="row mt-3 mb-2">
            <h3 className="col-12 news-player-title">{responseObject.title}</h3>
            <div className="col-12 mt-1 mb-2 d-flex align-items-center">
              <p className="news-player-genre">{responseObject.category}</p>
              <BsDot className="news-player-dot-genre" />
              <p className="news-player-genre">{newsYear}</p>
              <BsDot className="news-player-dot-genre" />
              <p className="news-player-genre">
                {responseObject.certificateType}
              </p>
            </div>
            <div className="col-12 mt-2 mb-2">
              <hr className="hr-line-news-player" />
            </div>
            <p className="news-player-description col-12 mt-2 mb-2">
              {responseObject.description}
            </p>
            <p className="news-player-cast-text col-12 mb-2 mt-2">
              Cast: {responseObject.cast}
            </p>
          </div>
        </div>
        <div className="container-fluid mt-3 mb-2">
          <div className="row">
            <div className="col-12">
              <hr className="news-player-similar-hr-line" />
            </div>
          </div>
        </div>
        <div className="container-fluid mt-2 mb-2">
          <div className="row">
            <h2 className="similar-news-heading col-12">Similar News</h2>
          </div>
          {displaySimilarNews()}
        </div>
      </>
    );
  };

  //checking what to display
  const checkingWhatToDisplay = () => {
    switch (newsDetailsObject.resStatus) {
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
    <div className="news-player-bg-container">
      <Header />
      <div className="news-player-main-container">
        {checkingWhatToDisplay()}
      </div>
    </div>
  );
};

export default NewsWatch;
