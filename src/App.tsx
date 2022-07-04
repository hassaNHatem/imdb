import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./Header";
import Movies from "./Movies";
import Recent from "./Recent";
import More from "./More";
import { articles, movie } from "./types";

function App() {
  const [currentTab, setCurrentTab] = useState("movie");
  const [data, setData] = useState<Array<movie>>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("avengers");
  const [page, setPage] = useState(1);
  const [recent, setRecent] = useState<Array<movie>>([]);
  const [reviews, setReviews] = useState<articles | undefined>();
  const [appHieght, setappHieght] = useState(window.innerHeight);
  const APIKEY = "5b9bd435";
  const listInnerRef: any = useRef();

  const fetchData = async (searchword: string, page: number) => {
    setLoading(true);
    axios
      .get(
        `https://www.omdbapi.com/?s=${searchword}&page=${1}&apiKey=${APIKEY}&type=${currentTab}`
      )
      .then((res) => {
        setData(res.data.Search);
        console.log(res.data.Search);
        setLoading(false);
      });
  };
  const onScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setPage((page) => page + 1);
        await axios
          .get(
            `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&apiKey=${APIKEY}&type=${currentTab}`
          )
          .then((res) => {
            if (res.data.Search !== undefined) {
              let newdata: Array<movie> = [...data, ...res.data.Search];
              setData(newdata);
            }
          });
      }
    }
  };
  useEffect(() => {
    fetchData(searchTerm, page);
  }, [currentTab, searchTerm]);

  const setRec = (movie: movie) => {
    const newRecent: Array<movie> = [movie];
    setRecent(newRecent);
    let local = localStorage.getItem("recent-views");
    let localConverted = [];
    if (local !== null) {
      localConverted = JSON.parse(local);
    }
    let localData = [...localConverted, ...newRecent];
    const uniqueArray = localData.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        localData.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });
    localStorage.setItem("recent-views", JSON.stringify(uniqueArray));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App" onScroll={onScroll} ref={listInnerRef}>
              <div className="container">
                <Header setSearchTerm={setSearchTerm}></Header>
                <Recent></Recent>
                <div className="switching-tabs">
                  <span
                    className={currentTab === "movie" ? "active" : ""}
                    onClick={() => {
                      setCurrentTab("movie");
                    }}
                  >
                    Movies
                  </span>
                  <span
                    className={currentTab === "series" ? "active" : ""}
                    onClick={() => {
                      setCurrentTab("series");
                      setPage(1);
                      setData([]);
                    }}
                  >
                    Series
                  </span>
                </div>

                {loading ? (
                  <h1>Loading your movies...</h1>
                ) : data === undefined ? (
                  <h1>no Data Found!</h1>
                ) : (
                  <Movies
                    setRecent={setRec}
                    setReviews={setReviews}
                    Movies={data}
                  ></Movies>
                )}
              </div>
            </div>
          }
        />
        <Route path="More" element={<More reviews={reviews} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
