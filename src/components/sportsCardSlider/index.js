import { Link } from "react-router-dom";

import "./index.css";

const SportsCardSlider = (props) => {
  const { item } = props;

  const { imageUrl, title } = item;

  return (
    <div className="sports-card-slider-main-container">
      <Link className="sports-card-link-item">
        <img src={imageUrl} alt={title} className="sports-card-image-slider" />
      </Link>
    </div>
  );
};

export default SportsCardSlider;
