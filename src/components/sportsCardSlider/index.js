import { Link } from "react-router-dom";

import "./index.css";

const SportsCardSlider = (props) => {
  const { item } = props;

  const { imageUrl, title, _id } = item;

  return (
    <div className="sports-card-slider-main-container">
      <Link to={`/sport-watch/${_id}`} className="sports-card-link-item">
        <img src={imageUrl} alt={title} className="sports-card-image-slider" />
      </Link>
    </div>
  );
};

export default SportsCardSlider;
