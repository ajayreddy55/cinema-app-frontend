import { Link } from "react-router-dom";

import "./index.css";

const MoviesCardSlider = (props) => {
  const { eachMovie } = props;

  const { title, thumbnailUrl, _id } = eachMovie;

  return (
    <div className="movies-card-slider-main-container">
      <Link to={`/movie-details/${_id}`} className="movies-card-link-item">
        <img
          src={thumbnailUrl}
          alt={title}
          className="movies-card-image-slider"
        />
      </Link>
    </div>
  );
};

export default MoviesCardSlider;
