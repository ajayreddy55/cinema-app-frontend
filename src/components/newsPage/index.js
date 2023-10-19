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
import NewsCardSlider from "../newsCardSlider";
import Footer from "../footer";

const carouselList = [
  {
    id: 1,
    title: "France And Spain Oppose Suspension Of Aide For Palestinians",
    imageUrl:
      "https://v3img.voot.com/resizeMedium,w_960,h_540/jioimage/newcpp/652502967fad336afc1c5497/652502967fad336afc1c5497_1696924312494_aa.jpg?imformat=chrome",
  },
  {
    id: 2,
    title: "Delhi Liquor Scam News",
    imageUrl:
      "https://v3img.voot.com/resizeMedium,w_960,h_540/jioimage/newcpp/6525293a0893d8a59e4799dc/6525293a0893d8a59e4799dc_1696934204349_aa.jpg?imformat=chrome",
  },
  {
    id: 3,
    title: "Surya Kumar Yadav hits 100 off 49 balls against New Zealand",
    imageUrl:
      "https://i.ytimg.com/vi/QEbTG7ALjC4/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARh_IBMoFDAP&rs=AOn4CLAidNMFOQrd0VLfvbAwMoZ4dJsXHw",
  },
  {
    id: 4,
    title: "Asia Cup 2023 Final : Siraj takes six wickets",
    imageUrl:
      "https://i.ytimg.com/vi/UpZRAg4B4dw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAc7_uBmCiJ0_XOJr3VXUL3VR8QoQ",
  },
  {
    id: 5,
    title: "Apple touches $3 trillion market value WION",
    imageUrl:
      "https://i.ytimg.com/vi/0pehTYxjO7o/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDN967OuXUSKIIsZYcU8qnpEvZtSw",
  },
  {
    id: 6,
    title: "How BlackRock Became The World's Largest Asset Manager",
    imageUrl:
      "https://i.ytimg.com/vi/ga_we_sOopk/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAuhROOayf1cUOjHCzCOrE8QoZu_w",
  },
];

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const NewsPage = () => {
  const navigate = useNavigate();

  const [topNewsObject, setTopNewsObject] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [businessNews, setBusinessNews] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [sportsNews, setSportsNews] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [politicalNews, setPoliticalNews] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [newsByNews18, setNewsByNews18] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [newsByTv9, setNewsByTv9] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [newsByNTV, setNewsByNTV] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [newsByWION, setNewsByWION] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [newsInTelugu, setNewsInTelugu] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [newsInEnglish, setNewsInEnglish] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [allNewsVideos, setAllNewsVideos] = useState({
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

  //top news use effect
  useEffect(() => {
    getTopNews();
  }, []);

  //business news use effect
  useEffect(() => {
    getBusinessNews();
  }, []);

  //sports news use effect
  useEffect(() => {
    getSportsNews();
  }, []);

  //political news use effect
  useEffect(() => {
    getPoliticalNews();
  }, []);

  // news by cnn use effect
  useEffect(() => {
    getNewsByCNN18();
  }, []);

  // news by tv9 use effect
  useEffect(() => {
    getNewsByTv9();
  }, []);

  // news by ntv use effect
  useEffect(() => {
    getNewsByNTV();
  }, []);

  // news by wion use effect
  useEffect(() => {
    getNewsByWION();
  }, []);

  // news in telugu use effect
  useEffect(() => {
    getNewsInTelugu();
  }, []);

  // news in english use effect
  useEffect(() => {
    getNewsInEnglish();
  }, []);

  // all news use effect
  useEffect(() => {
    getAllNewsVideos();
  }, []);

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

  //business news api
  const getBusinessNews = async () => {
    setBusinessNews((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=business&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setBusinessNews((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setBusinessNews((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  //sports news api
  const getSportsNews = async () => {
    setSportsNews((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=sport&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setSportsNews((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setSportsNews((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  //political news api
  const getPoliticalNews = async () => {
    setPoliticalNews((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=political&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setPoliticalNews((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setPoliticalNews((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // news by cnn 18 api
  const getNewsByCNN18 = async () => {
    setNewsByNews18((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=news 18&news_category=&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setNewsByNews18((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setNewsByNews18((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // news by tv9 api
  const getNewsByTv9 = async () => {
    setNewsByTv9((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=tv9&news_category=&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setNewsByTv9((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setNewsByTv9((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // news by ntv api
  const getNewsByNTV = async () => {
    setNewsByNTV((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=ntv&news_category=&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setNewsByNTV((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setNewsByNTV((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // news by wion api
  const getNewsByWION = async () => {
    setNewsByWION((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=wion&news_category=&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setNewsByWION((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setNewsByWION((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // news in telugu api
  const getNewsInTelugu = async () => {
    setNewsInTelugu((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=&news_type=&news_tag=&language=telugu";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setNewsInTelugu((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setNewsInTelugu((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // news in english api
  const getNewsInEnglish = async () => {
    setNewsInEnglish((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=&news_type=&news_tag=&language=english";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setNewsInEnglish((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setNewsInEnglish((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: topNewsResJson.message,
      }));
    }
  };

  // all news videos api
  const getAllNewsVideos = async () => {
    setAllNewsVideos((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const newsUrl =
      "http://localhost:5555/api/news?channel_name=&news_category=&news_type=&news_tag=&language=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const topNewsRes = await fetch(newsUrl, options);

    if (topNewsRes.ok) {
      const topNewsResJson = await topNewsRes.json();
      setAllNewsVideos((prevState) => ({
        ...prevState,
        responseList: topNewsResJson.newsList,
        resStatus: apiConstants.success,
        errMsg: "",
      }));
    } else {
      const topNewsResJson = await topNewsRes.json();
      setAllNewsVideos((prevState) => ({
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
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-news">
        <h3 className="news-empty-list-text">{object.errMsg}</h3>
      </div>
    );
  };

  //displaying loader
  const displayLoader = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-news">
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
        <h3 className="news-empty-list-text">No Data Found</h3>
      </div>
    );
  };

  //top news displaying
  const displayTopNews = (object) => {
    if (object.responseList.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="news-categories-slider mt-4">
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
    <div className="news-bg-container">
      <div>
        <Header />
        <div className="news-content-main-container p-3">
          <div className="container-fluid">
            <div className="row">
              {/* carousel */}
              <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <Slider {...settings} className="carousel-slider-news">
                  {carouselList.map((eachItem) => {
                    return (
                      <div
                        className="carousel-list-item-news"
                        key={eachItem.id}
                      >
                        <div className="carousel-main-item-news">
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.title}
                            className="carousel-image-news"
                          />
                          <div className="carousel-title-container-news">
                            <h3 className="carousel-title-news">
                              {eachItem.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              {/* top news */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="news-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="news-topics-heading">Top News</h2>
                    <Link className="news-explore-link">
                      <p className="news-explore-text">Explore more</p>
                      <IoIosArrowForward className="news-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(topNewsObject, displayTopNews)}
                </div>
              </div>
              {/* Business news */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Business News</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(businessNews, displayTopNews)}
                </div>
              </div>
              {/* Sports news */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Sports News</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(sportsNews, displayTopNews)}
                </div>
              </div>
              {/* Political news */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Political News</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(politicalNews, displayTopNews)}
                </div>
              </div>
              {/* news by cnn 18 */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">News by CNN News 18</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(newsByNews18, displayTopNews)}
                </div>
              </div>
              {/* news by tv9 */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">News by TV9</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(newsByTv9, displayTopNews)}
                </div>
              </div>
              {/* news by ntv */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">News by NTV</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(newsByNTV, displayTopNews)}
                </div>
              </div>
              {/* news by WION */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">News by WION</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(newsByWION, displayTopNews)}
                </div>
              </div>
              {/* news in telugu */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">News in Telugu</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(newsInTelugu, displayTopNews)}
                </div>
              </div>
              {/* news in english */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">News in English</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(newsInEnglish, displayTopNews)}
                </div>
              </div>
              {/* All News Videos */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">All News Stories</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(allNewsVideos, displayTopNews)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsPage;
