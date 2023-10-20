import { Route, Routes } from "react-router-dom";

import "./App.css";
import LoginForm from "./components/loginform";
import SignupForm from "./components/signupform";
import Home from "./components/home";
import MoviesDetailsPage from "./components/moviesDetails";
import MoviePlayer from "./components/moviewatch";
import SportWatch from "./components/sportwatch";
import NewsWatch from "./components/newswatch";
import ShowDetailsPage from "./components/showDetails";
import ShowPlayer from "./components/showWatch";
import MoviesPage from "./components/moviesPage";
import ShowsPage from "./components/showsPage";
import SportsPage from "./components/sportsPage";
import NewsPage from "./components/newsPage";
import SearchPage from "./components/searchPage";

function App() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/signup" element={<SignupForm />} />
      <Route exact path="/" element={<Home />} />
      <Route
        exact
        path="/movie-details/:movieId"
        element={<MoviesDetailsPage />}
      />
      <Route exact path="/movie-watch/:movieId" element={<MoviePlayer />} />
      <Route exact path="/sport-watch/:sportId" element={<SportWatch />} />
      <Route exact path="/news-watch/:newsId" element={<NewsWatch />} />
      <Route exact path="/show-details/:showId" element={<ShowDetailsPage />} />
      <Route
        exact
        path="/show-watch/:showId/:seasonNumber/:seasonId/:episodeId"
        element={<ShowPlayer />}
      />
      <Route exact path="/movies" element={<MoviesPage />} />
      <Route exact path="/tv-shows" element={<ShowsPage />} />
      <Route exact path="/sports" element={<SportsPage />} />
      <Route exact path="/news" element={<NewsPage />} />
      <Route exact path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
