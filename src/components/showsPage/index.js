import Header from "../header";

import Slider from "react-slick";
import { IoIosArrowForward } from "react-icons/io";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";
import ShowsCardSlider from "../showsCardSlider";

const carouselList = [
  {
    id: 1,
    title: "Lovecraft Country",
    imageUrl:
      "https://images.jacobinmag.com/wp-content/uploads/2020/08/28044320/https-_cdn.cnn_.com_cnnnext_dam_assets_200810103513-lovecraft-country-hbo.jpg",
  },
  {
    id: 2,
    title: "Carnivale",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/75/Carnivale_Season_1_Cast_Promo.jpg/350px-Carnivale_Season_1_Cast_Promo.jpg",
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
    title: "Bates Motel",
    imageUrl:
      "https://i0.wp.com/streamondemandathome.com/wp-content/uploads/2016/02/batesmotelS3.jpg?fit=625%2C352&ssl=1",
  },
];

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const ShowsPage = () => {
  const navigate = useNavigate();

  const [topShowsObject, setTopShowsObject] = useState({
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

  //top shows use effect
  useEffect(() => {
    getTopShows();
  }, []);

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
    <div className="shows-bg-container">
      <div>
        <Header />
        <div className="shows-content-main-container p-3">
          <div className="container-fluid">
            <div className="row">
              {/* carousel */}
              <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <Slider {...settings} className="carousel-slider-shows">
                  {carouselList.map((eachItem) => {
                    return (
                      <div
                        className="carousel-list-item-shows"
                        key={eachItem.id}
                      >
                        <div className="carousel-main-item-shows">
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.title}
                            className="carousel-image-shows"
                          />
                          <div className="carousel-title-container-shows">
                            <h3 className="carousel-title-shows">
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
                <div className="banner-shows-container">
                  <img
                    src="https://nviz-studio.com/images/uploads/projects/House%20of%20the%20Dragon/NVIZ_House_of_the_Dragon_Previs.jpeg"
                    alt="banner"
                    className="shows-banner-image"
                  />
                </div>
              </div>
              {/* top shows */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="shows-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="shows-topics-heading">Top Shows</h2>
                    <Link className="shows-explore-link">
                      <p className="shows-explore-text">Explore more</p>
                      <IoIosArrowForward className="shows-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(topShowsObject, displayTopShows)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowsPage;
