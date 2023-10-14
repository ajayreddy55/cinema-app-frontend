import { Link } from "react-router-dom";

import "./index.css";

const SimilarSportCard = (props) => {
  const { sportItem } = props;
  const { _id, title, imageUrl } = sportItem;

  return (
    <div className="similar-sport-container col-12 col-md-4 col-lg-3 col-xl-2 mt-3 mb-3">
      <Link to={`/sport-watch/${_id}`} className="similar-sport-link-item mr-3">
        <img src={imageUrl} alt={title} className="similar-sport-image" />
      </Link>
    </div>
  );
};

export default SimilarSportCard;
