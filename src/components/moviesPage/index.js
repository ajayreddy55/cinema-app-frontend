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
import MoviesCardSlider from "../movieCardSlider";
import Footer from "../footer";

const carouselList = [
  {
    id: 1,
    title: "Annabelle Comes Home",
    imageUrl:
      "https://assets1.ignimgs.com/thumbs/userUploaded/2019/6/21/g2zea2im-1561135965571.jpeg",
  },
  {
    id: 2,
    title: "Spirit Untamed",
    imageUrl: "https://flxt.tmsimg.com/assets/p19096431_v_h8_ai.jpg",
  },
  {
    id: 3,
    title: "Bahubali",
    imageUrl:
      "https://img.onmanorama.com/content/dam/mm/en/entertainment/entertainment-news/images/2023/6/3/baahubali-movie.jpg",
  },
  {
    id: 4,
    title: "Avatar",
    imageUrl:
      "https://img10.hotstar.com/image/upload/f_auto/sources/r1/cms/prod/9546/1369546-i-2752f084c8ed",
  },
  {
    id: 5,
    title: "The Dark Knight",
    imageUrl:
      "https://assets.gqindia.com/photos/5cdc19cd54004319c73c4e01/16:9/w_2560%2Cc_limit/Batman-movie.jpg",
  },
  {
    id: 6,
    title: "RRR",
    imageUrl:
      "https://www.koimoi.com/wp-content/new-galleries/2023/07/rrr-2-ss-rajamouli-might-not-direct-ram-charan-jr-ntr-led-sequel-001.jpg",
  },
];

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const MoviesPage = () => {
  const navigate = useNavigate();

  const [topMoviesObject, setTopMoviesObject] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [blockbusterMovies, setBlockBusterMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [actionMovies, setActionMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [thrillerMovies, setThrillerMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [comedyMovies, setComedyMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [horrorMovies, setHorrorMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [dramaMovies, setDramaMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [crimeMovies, setCrimeMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [romanticMovies, setRomanticMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [moviesInTelugu, setMoviesInTelugu] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [moviesInHindi, setMoviesInHindi] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [hollywoodMovies, setHollywoodMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [tollywoodMovies, setTollywoodMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [bollywoodMovies, setBollywoodMovies] = useState({
    responseList: [],
    resStatus: apiConstants.initial,
    errMsg: "",
  });

  const [allMovies, setAllMovies] = useState({
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

  //top movies use effect
  useEffect(() => {
    getTopMovies();
  }, []);

  //blockbuster movies useEffect
  useEffect(() => {
    getBlockBusterMovies();
  }, []);

  //action movies useEffect
  useEffect(() => {
    getActionMovies();
  }, []);

  //thriller movies useEffect
  useEffect(() => {
    getThrillerMovies();
  }, []);

  //comedy movies useEffect
  useEffect(() => {
    getComedyMovies();
  }, []);

  //horror movies useEffect
  useEffect(() => {
    getHorrorMovies();
  }, []);

  //Drama movies useEffect
  useEffect(() => {
    getDramaMovies();
  }, []);

  //Crime movies useEffect
  useEffect(() => {
    getCrimeMovies();
  }, []);

  //romantic movies useEffect
  useEffect(() => {
    getRomanticMovies();
  }, []);

  // movies in telugu useEffect
  useEffect(() => {
    getMoviesInTelugu();
  }, []);

  // movies in Hindi useEffect
  useEffect(() => {
    getMoviesInHindi();
  }, []);

  // hollywood movies useEffect
  useEffect(() => {
    getHollywoodMovies();
  }, []);

  // tollywood movies useEffect
  useEffect(() => {
    getTollywoodMovies();
  }, []);

  // bollywood movies useEffect
  useEffect(() => {
    getBollywoodMovies();
  }, []);

  // all movies useEffect
  useEffect(() => {
    getAllMovies();
  }, []);

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

  //blockbuster movies API
  const getBlockBusterMovies = async () => {
    setBlockBusterMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const topMoviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=9.0&views=20000000&languages=&original_language=&category=movies&studio=&director=";

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
      setBlockBusterMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setBlockBusterMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //action movies api
  const getActionMovies = async () => {
    setActionMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=action&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setActionMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setActionMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //thriller movies api
  const getThrillerMovies = async () => {
    setThrillerMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=thriller&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setThrillerMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setThrillerMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //comedy movies api
  const getComedyMovies = async () => {
    setComedyMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=comedy&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setComedyMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setComedyMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //horror movies api
  const getHorrorMovies = async () => {
    setHorrorMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=horror&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setHorrorMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setHorrorMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //drama movies api
  const getDramaMovies = async () => {
    setDramaMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=drama&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setDramaMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setDramaMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //Crime movies api
  const getCrimeMovies = async () => {
    setCrimeMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=crime&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setCrimeMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setCrimeMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //romantic movies api
  const getRomanticMovies = async () => {
    setRomanticMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=romance&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setRomanticMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setRomanticMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  // movies in telugu api
  const getMoviesInTelugu = async () => {
    setMoviesInTelugu((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=&languages=telugu&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setMoviesInTelugu((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setMoviesInTelugu((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  // movies in hindi api
  const getMoviesInHindi = async () => {
    setMoviesInHindi((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=&languages=hindi&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setMoviesInHindi((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setMoviesInHindi((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  // hollywood movies api
  const getHollywoodMovies = async () => {
    setHollywoodMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=&languages=&original_language=english&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setHollywoodMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setHollywoodMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  // tollywood movies api
  const getTollywoodMovies = async () => {
    setTollywoodMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=&languages=&original_language=telugu&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setTollywoodMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setTollywoodMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  // bollywood movies api
  const getBollywoodMovies = async () => {
    setBollywoodMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=&languages=&original_language=hindi&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setBollywoodMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setBollywoodMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  // all movies api
  const getAllMovies = async () => {
    setAllMovies((prevState) => ({
      ...prevState,
      resStatus: apiConstants.inProgress,
    }));

    const moviesUrl =
      "http://localhost:5555/api/movies-show?genre=&rating=&views=&languages=&original_language=&category=movies&studio=&director=";

    const jwtToken = Cookies.get("cinema_jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const moviesRes = await fetch(moviesUrl, options);

    if (moviesRes.ok) {
      const moviesResJson = await moviesRes.json();
      setAllMovies((prevState) => ({
        ...prevState,
        responseList: moviesResJson.movies_shows,
        resStatus: apiConstants.success,
      }));
    } else {
      const moviesResJson = await moviesRes.json();
      setAllMovies((prevState) => ({
        ...prevState,
        responseList: [],
        resStatus: apiConstants.failure,
        errMsg: moviesResJson.message,
      }));
    }
  };

  //displaying error message
  const displayErrorMessage = (object) => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-movies">
        <h3 className="movies-empty-list-text">{object.errMsg}</h3>
      </div>
    );
  };

  //displaying loader
  const displayLoader = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-4 loader-container-movies">
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
        <h3 className="movies-empty-list-text">No Data Found</h3>
      </div>
    );
  };

  //top movies displaying
  const displayTopMovies = (object) => {
    if (object.responseList.length === 0) {
      return displayTextLengthZero();
    }

    return (
      <Slider {...sliderSettings} className="movies-categories-slider mt-4">
        {object.responseList.map((eachMovie) => (
          <MoviesCardSlider key={eachMovie._id} eachMovie={eachMovie} />
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
    <div className="movies-bg-container">
      <div>
        <Header />
        <div className="movies-content-main-container p-3">
          <div className="container-fluid">
            <div className="row">
              {/* carousel */}
              <div className="col-12 mt-4 mb-3 d-flex justify-content-center">
                <Slider {...settings} className="carousel-slider-movies">
                  {carouselList.map((eachItem) => {
                    return (
                      <div
                        className="carousel-list-item-movies"
                        key={eachItem.id}
                      >
                        <div className="carousel-main-item-movies">
                          <img
                            src={eachItem.imageUrl}
                            alt={eachItem.title}
                            className="carousel-image-movies"
                          />
                          <div className="carousel-title-container-movies">
                            <h3 className="carousel-title-movies">
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
                <div className="banner-movies-container">
                  <img
                    src="https://collider.com/wp-content/uploads/inception_movie_poster_banner_04.jpg"
                    alt="banner"
                    className="movies-banner-image"
                  />
                </div>
              </div>
              {/* top movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="movies-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="movies-topics-heading">Top Movies</h2>
                    <Link className="movies-explore-link">
                      <p className="movies-explore-text">Explore more</p>
                      <IoIosArrowForward className="movies-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(topMoviesObject, displayTopMovies)}
                </div>
              </div>
              {/* Blockbuster movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="movies-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="movies-topics-heading">
                      Blockbuster Movies
                    </h2>
                    <Link className="movies-explore-link">
                      <p className="movies-explore-text">Explore more</p>
                      <IoIosArrowForward className="movies-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(blockbusterMovies, displayTopMovies)}
                </div>
              </div>
              {/* Action movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Action Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(actionMovies, displayTopMovies)}
                </div>
              </div>
              {/* Thriller movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Thriller Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(thrillerMovies, displayTopMovies)}
                </div>
              </div>
              {/* Comedy movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Comedy Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(comedyMovies, displayTopMovies)}
                </div>
              </div>
              {/* Horror movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Horror Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(horrorMovies, displayTopMovies)}
                </div>
              </div>
              {/* Drama movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Drama Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(dramaMovies, displayTopMovies)}
                </div>
              </div>
              {/* Crime movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Crime Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(crimeMovies, displayTopMovies)}
                </div>
              </div>
              {/* Romantic movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Romantic Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(romanticMovies, displayTopMovies)}
                </div>
              </div>
              {/* Movies in Telugu */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Movies in Telugu</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(moviesInTelugu, displayTopMovies)}
                </div>
              </div>
              {/* Movies in Hindi */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Movies in Hindi</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(moviesInHindi, displayTopMovies)}
                </div>
              </div>
              {/* Hollywood Movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Hollywood Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(hollywoodMovies, displayTopMovies)}
                </div>
              </div>
              {/* Tollywood Movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Tollywood Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(tollywoodMovies, displayTopMovies)}
                </div>
              </div>
              {/* Bollywood Movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">Bollywood Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(bollywoodMovies, displayTopMovies)}
                </div>
              </div>
              {/* All Movies */}
              <div className="col-12 mt-3 mb-3 d-flex justify-content-center">
                <div className="home-slides-main-container">
                  <div className="d-flex align-items-center justify-content-between mb-3 mt-3">
                    <h2 className="home-topics-heading">All Movies</h2>
                    <Link className="home-explore-link">
                      <p className="home-explore-text">Explore more</p>
                      <IoIosArrowForward className="home-explore-more-arrow" />
                    </Link>
                  </div>
                  {checkingWhatToDisplay(allMovies, displayTopMovies)}
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

export default MoviesPage;
