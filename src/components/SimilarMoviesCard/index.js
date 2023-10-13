import { Link } from "react-router-dom";
import "./index.css";

const MoviesDetailsSimilarMovies = (props) => {
  const { eachMovie } = props;
  const { thumbnailUrl, title, _id } = eachMovie;

  return (
    <div className="similar-movies-container col-12 col-md-4 col-lg-3 col-xl-2 mt-3 mb-3">
      <Link
        to={`/movie-details/${_id}`}
        className="similar-movies-link-item mr-3"
      >
        <img src={thumbnailUrl} alt={title} className="similar-movies-image" />
      </Link>
    </div>
  );
};

export default MoviesDetailsSimilarMovies;
