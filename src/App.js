import { Route, Routes } from "react-router-dom";

import "./App.css";
import LoginForm from "./components/loginform";
import SignupForm from "./components/signupform";
import Home from "./components/home";
import MoviesDetailsPage from "./components/moviesDetails";
import MoviePlayer from "./components/moviewatch";

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
    </Routes>
  );
}

export default App;
