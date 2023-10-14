import { Link } from "react-router-dom";

import "./index.css";

const SimilarNewsCard = (props) => {
  const { newsItem } = props;
  const { _id, title, thumbnailUrl } = newsItem;

  return (
    <div className="similar-news-container col-12 col-md-4 col-lg-3 col-xl-2 mt-3 mb-3">
      <Link to={`/news-watch/${_id}`} className="similar-news-link-item mr-3">
        <img src={thumbnailUrl} alt={title} className="similar-news-image" />
      </Link>
    </div>
  );
};

export default SimilarNewsCard;
