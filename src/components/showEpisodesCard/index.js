import { Link } from "react-router-dom";

import "./index.css";
import { BsDot } from "react-icons/bs";

const ShowEpisodesCard = (props) => {
  const { eachEpisode, seasonObject, seasonDetails } = props;
  const { _id, episodeTitle, episodeNumber, duration, episodeThumbnail } =
    eachEpisode;

  return (
    <div className="show-episodes-card-main-container">
      <Link className="show-episodes-link-item">
        <img
          src={episodeThumbnail}
          alt={episodeTitle}
          className="show-episodes-image"
        />
        <p className="show-episodes-title">{episodeTitle}</p>
        <div className="d-flex align-items-center mt-2 mb-1">
          <p className="show-episodes-info">
            S{seasonObject.seasonNumber}E{episodeNumber}
          </p>
          <BsDot className="show-episodes-dot" />
          <p className="show-episodes-info">{duration}</p>
          <BsDot className="show-episodes-dot" />
          <p className="show-episodes-info">{seasonDetails.originalLanguage}</p>
        </div>
      </Link>
    </div>
  );
};

export default ShowEpisodesCard;
