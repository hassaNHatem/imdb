import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Movies({
  Movies,
  setRecent,
}: {
  Movies: Array<any>;
  setRecent: (el: any) => void;
}) {
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [distance, setDistance] = useState(0);
  const [movieDetails, setMovieDetails] = useState<any>();
  useEffect(() => {
    let element: any = document.getElementsByClassName("selected");
    if (element.length > 0) {
      setDistance(
        window.pageYOffset + element[0].getBoundingClientRect().top + 440
      );
    }
  }, [selectedMovie]);
  const callGetMovieDetails = (id: number) => {
    axios
      .get(`https://www.omdbapi.com/?i=${id}&apiKey=5b9bd435`)
      .then((res) => {
        setMovieDetails(res.data);
      });
  };
  console.log(movieDetails);
  return (
    <>
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
                    setRecent(el);
                    setSelectedMovie(el.imdbID);
                  }}
                  key={index}
                  className={`movie ${
                    el.imdbID === selectedMovie ? "selected" : ""
                  }`}
                >
                  <img width={350} height={400} src={el.Poster}></img>
                  <h2>{el.Title}</h2>
                </div>
              </>
            );
          })}
      </div>
      {Movies !== undefined &&
        movieDetails &&
        selectedMovie !== 0 &&
        Movies.map((el: any, index: number) => {
          return (
            selectedMovie === el.imdbID && (
              <div
                key={index}
                className="info"
                style={{
                  position: "absolute",
                  top: distance,
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
                <Link to={"/More"}>
                  <button className="more-btn">More Info</button>
                </Link>
              </div>
            )
          );
        })}
    </>
  );
}

export default Movies;
