import { Link } from "react-router-dom";
import "./index.css";

const ShowDetailsSimilarShows = (props) => {
  const { eachShow } = props;
  const { thumbnailUrl, title, _id } = eachShow;

  return (
    <div className="similar-shows-container col-12 col-md-4 col-lg-3 col-xl-2 mt-3 mb-3">
      <Link
        to={`/show-details/${_id}`}
        className="similar-shows-link-item mr-3"
      >
        <img src={thumbnailUrl} alt={title} className="similar-shows-image" />
      </Link>
    </div>
  );
};

export default ShowDetailsSimilarShows;
