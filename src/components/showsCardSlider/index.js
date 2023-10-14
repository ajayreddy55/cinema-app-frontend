import { Link } from "react-router-dom";

import "./index.css";

const ShowsCardSlider = (props) => {
  const { eachShow } = props;

  const { title, thumbnailUrl, _id } = eachShow;

  return (
    <div className="shows-card-slider-main-container">
      <Link to={`/show-details/${_id}`} className="shows-card-link-item">
        <img
          src={thumbnailUrl}
          alt={title}
          className="shows-card-image-slider"
        />
      </Link>
    </div>
  );
};

export default ShowsCardSlider;
