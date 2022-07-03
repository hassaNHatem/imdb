import "./App.css";
function More({ reviews }: { reviews: any }) {
  console.log(reviews);
  return (
    <>
      {" "}
      {reviews !== undefined && (
        <div className="reviews">
          <h1>Related Reviews</h1>
          {reviews.results !== null ? (
            reviews.results.map((el: any, index: number) => {
              return (
                <div className="articles">
                  <h2>{el.headline}</h2>
                  <h3>Movie rating : {el.mpaa_rating}</h3>
                  <h4>
                    <a target="_blank" href={el.link.url}>
                      read the article here
                    </a>
                  </h4>
                </div>
              );
            })
          ) : (
            <h2>no Reviews for this movie</h2>
          )}
        </div>
      )}
    </>
  );
}

export default More;
