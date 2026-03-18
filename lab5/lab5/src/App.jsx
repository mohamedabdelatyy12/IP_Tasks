import { useState } from "react";
import "./App.css";

export default function App() {
  const [movieName, setMovieName] = useState("");
  const [movieReview, setMovieReview] = useState("");
  const [movieStars, setMovieStars] = useState(0);

  const [movieList, setMovieList] = useState([]);

  function addMovie(event) {
    event.preventDefault();

    if (movieName.trim() === "") {
      alert("Please enter a movie name");
      return;
    }

    const movieObject = {
      id: Date.now(),
      name: movieName,
      review: movieReview,
      stars: movieStars,
    };

    setMovieList([movieObject, ...movieList]);

    setMovieName("");
    setMovieReview("");
    setMovieStars(0);
  }

  function deleteMovie(id) {
    const newList = movieList.filter(function (movie) {
      return movie.id !== id;
    });

    setMovieList(newList);
  }

  function showStars(number) {
    if (number === 0) {
      return "No stars";
    }

    return "⭐".repeat(number);
  }

  return (
    <div className="container">
      <h1>Movies Watch List</h1>

      <form onSubmit={addMovie} className="form-box">
        <label>Movie Name</label>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
        />

        <label>Comment / Review</label>
        <textarea
          value={movieReview}
          onChange={(e) => setMovieReview(e.target.value)}
          placeholder="Write your review"
        ></textarea>

        <label>Star Rating</label>
<div className="stars">
  {[1, 2, 3, 4, 5].map((star) => {
    return (
      <span
        key={star}
        onClick={() => setMovieStars(star)}
        className={movieStars >= star ? "star active" : "star"}
      >
        ★
      </span>
    );
  })}
</div>

        <p className="star-text">{showStars(movieStars)}</p>

        <button type="submit" className="add-btn">
          Add Movie
        </button>
      </form>

      <div className="list-box">
        <h2>Saved Movies</h2>

        {movieList.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          movieList.map(function (movie) {
            return (
              <div className="movie-card" key={movie.id}>
                <h3>{movie.name}</h3>
                <p>
                  <b>Review:</b> {movie.review === "" ? "No review" : movie.review}
                </p>
                <p>
                  <b>Rating:</b> {movie.stars} / 5
                </p>
                <p>
                  <b>Emoji Stars:</b> {showStars(movie.stars)}
                </p>

                <button
                  className="delete-btn"
                  onClick={() => deleteMovie(movie.id)}
                >
                  Remove
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}