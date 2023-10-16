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

const carouselList = [
  {
    id: 1,
    title: "Mumbai City FC vs Kerala Blasters FC",
    imageUrl:
      "https://fantasysportsking.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/01/15195125/Mumbai-City-FC-vs-Kerala-Blasters.jpg",
  },
  {
    id: 2,
    title: "Chennaiyin FC vs Mohun Bagan Super Giant",
    imageUrl:
      "https://ticketsearch.in/wp-content/uploads/2023/09/chennaiyin-fc-vs-mohun-bagan-super-giant-tickets.webp",
  },
  {
    id: 3,
    title: "IND vs AUS - 1st ODI",
    imageUrl:
      "https://www.10cric10.com/uploads/cms/10CRIC/gallery/general/a220f249-e9fc-44b1-aa97-d3ea1a453e40.jpg",
  },
  {
    id: 4,
    title: "2022 Final - Himachal Pradesh vs Mumbai",
    imageUrl:
      "https://images.news18.com/ibnlive/uploads/2022/11/fgpvyuaaaaet-511-16675546604x3.jpg",
  },
  {
    id: 5,
    title: "Timberwolves 104-96 Mavericks",
    imageUrl:
      "https://cdn.nba.com/davinci/images/team-matchups/nba/latest/web/min-dal/1200x628.png",
  },
  {
    id: 6,
    title: "Mavericks 99-111 Timberwolves",
    imageUrl:
      "https://ats.io/wp-content/uploads/2021/02/Minnesota-Timberwolves-vs.-Dallas-Mavericks.jpg",
  },
];

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const SportsPage = () => {
  const navigate = useNavigate();

  const [topSportsPicksObject, setTopSportsPicksObject] = useState({
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

  //displaying error message
  const displayErrorMessage = (object) => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-sports">
        <h3 className="sports-empty-list-text">{object.errMsg}</h3>
      </div>
    );
  };

  //displaying loader
  const displayLoader = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-sports">
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
        <h3 className="sports-empty-list-text">No Data Found</h3>
      </div>
    );
  };

  //top sports picks
  const displayTopSportsPicks = (object) => {
    if (object.responseList.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="sports-categories-slider mt-4">
        {object.responseList.map((eachItem) => (
          <SportsCardSlider key={eachItem._id} item={eachItem} />
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
    <div className="sports-bg-container">
      <div>
        <Header />
        <div className="sports-content-main-container p-3">
          <div className="container-fluid">
            <div className="row">
              {/* carousel */}
              <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <Slider {...settings} className="carousel-slider-sports">
                  {carouselList.map((eachItem) => {
                    return (
                      <div
                        className="carousel-list-item-sports"
                        key={eachItem.id}
                      >
                        <div className="carousel-main-item-sports">
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.title}
                            className="carousel-image-sports"
                          />
                          <div className="carousel-title-container-sports">
                            <h3 className="carousel-title-sports">
                              {eachItem.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>

              {/* top sports picks */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="sports-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="sports-topics-heading">Top Sports Picks</h2>
                    <Link className="sports-explore-link">
                      <p className="sports-explore-text">Explore more</p>
                      <IoIosArrowForward className="sports-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(
                    topSportsPicksObject,
                    displayTopSportsPicks
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPage;
