import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Movies({
  Movies,
  setRecent,
  setReviews,
}: {
  Movies: Array<any>;
  setReviews: (el: any) => void;
  setRecent: (el: any) => void;
}) {
  const fetchReview = async (name: string) => {
    await axios
      .get(
        `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${name}&api-key=XmzV6DDJ8mWzfiiVpEJ6RtNBdh3NesL5`
      )
      .then((res) => {
        setReviews(res.data);
      });
  };
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [distance, setDistance] = useState(0);
  const [movieDetails, setMovieDetails] = useState<any>();
  const [isShown, setisShown] = useState(true);
  useEffect(() => {
    let element: any = document.getElementsByClassName("selected");
    let parent: any = document.getElementsByClassName("movies-container");
    if (element.length > 0) {
      setDistance(300);
    }
  }, [selectedMovie, distance]);
  const callGetMovieDetails = (id: number) => {
    axios
      .get(`https://www.omdbapi.com/?i=${id}&apiKey=5b9bd435`)
      .then((res) => {
        setMovieDetails(res.data);
      });
  };
  return (
    <div className="movies-container">
      {" "}
      <div className="Movies">
        {Movies !== undefined &&
          Movies.map((el: any, index: number) => {
            return (
              <>
                {" "}
                <div
                  onClick={() => {
                    callGetMovieDetails(el.imdbID);
                    setSelectedMovie(el.imdbID);
                    setisShown(true);
                  }}
                  key={index}
                  className={`movie ${
                    el.imdbID === selectedMovie ? "selected" : ""
                  }`}
                >
                  <img width={330} height={400} src={el.Poster}></img>
                  <h2>{el.Title}</h2>
                </div>
              </>
            );
          })}
      </div>
      {Movies !== undefined &&
        movieDetails &&
        selectedMovie !== 0 &&
        isShown &&
        Movies.map((el: any, index: number) => {
          return (
            selectedMovie === el.imdbID && (
              <div
                key={index}
                className="info"
                style={{
                  position: "fixed",
                  top: distance,
                  bottom: 0,
                  background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)) , url(${el.Poster})top center / cover no-repeat`,
                }}
              >
                <h2 className="title">{movieDetails.Title}</h2>
                <h5 className="info-plot">{movieDetails.Plot}</h5>
                <div className="info-addionat">
                  <div className="rating">
                    <h2>Rating</h2>
                    <p>{movieDetails.imdbRating}</p>
                  </div>
                  <div className="genere">
                    <h2>Genre</h2>
                    <p>{movieDetails.Genre}</p>
                  </div>
                  <div className="Directors">
                    <h2>Directors</h2>
                    <p>{movieDetails.Director}</p>
                  </div>
                  <div className="Language">
                    <h2>Language</h2>
                    <p>{movieDetails.Language}</p>
                  </div>
                </div>
                <div className="btns">
                  <Link to={"/More"}>
                    <button
                      onClick={() => {
                        setRecent(el);
                        fetchReview(el.Title);
                      }}
                      className="more-btn"
                    >
                      More Info
                    </button>
                  </Link>
                  <button
                    className="more-btn"
                    onClick={() => setisShown(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}

export default Movies;
