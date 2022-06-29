import "./App.css";

function Movies({ Movies }: { Movies: Array<any> }) {
  return (
    <div className="Movies">
      {Movies.map((el: any, index: number) => {
        return (
          <div key={index} className="movie">
            <img width={"100%"} height={400} src={el.Poster}></img>
            <h2>{el.Title}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default Movies;
