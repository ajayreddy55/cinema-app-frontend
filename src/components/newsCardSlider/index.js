import { Link } from "react-router-dom";

import "./index.css";

const NewsCardSlider = (props) => {
  const { newsItem } = props;

  const { thumbnailUrl, title, _id } = newsItem;

  return (
    <div className="news-card-slider-main-container">
      <Link to={`/news-watch/${_id}`} className="news-card-link-item">
        <img
          src={thumbnailUrl}
          alt={title}
          className="news-card-image-slider"
        />
      </Link>
    </div>
  );
};

export default NewsCardSlider;
