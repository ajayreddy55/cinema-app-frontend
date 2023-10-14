import "./index.css";

const ShowSeasonsTabs = (props) => {
  const { eachSeason, activeSeasonId, changeToAnotherSeason } = props;
  const { _id, seasonNumber } = eachSeason;

  const changeSeasonAccordingly = () => {
    changeToAnotherSeason(_id);
  };

  const activeSeasonStyle = activeSeasonId === _id ? "active-season-style" : "";

  return (
    <div className="mb-2 mt-2 mr-3">
      <button
        className={`show-seasons-tab-button mr-2 ${activeSeasonStyle}`}
        onClick={changeSeasonAccordingly}
      >
        SEASON {seasonNumber}
      </button>
    </div>
  );
};

export default ShowSeasonsTabs;
