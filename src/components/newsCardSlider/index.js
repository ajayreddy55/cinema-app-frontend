import { Link } from "react-router-dom";

import "./index.css";

const NewsCardSlider = (props) => {
  const { newsItem } = props;

  const { thumbnailUrl, title } = newsItem;

  return (
    <div className="news-card-slider-main-container">
      <Link className="news-card-link-item">
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
