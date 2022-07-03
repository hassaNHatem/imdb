import axios from "axios";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Movies from "./Movies";
import Recent from "./Recent";
import More from "./More";

function App() {
  const [currentTab, setCurrentTab] = useState("movie");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("avengers");
  const [page, setPage] = useState(1);
  const [recent, setRecent] = useState<Array<any>>([]);
  const APIKEY = "5b9bd435";
  const fetchData = async (searchword: string, page: number) => {
    setLoading(true);
    axios
      .get(
        `https://www.omdbapi.com/?s=${searchword}&page=${page}&apiKey=${APIKEY}&type=${currentTab}`
      )
      .then((res) => {
        setData(res.data.Search);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData(searchTerm, page);
  }, [currentTab, searchTerm]);

  const setRec = (movie: any) => {
    const newRecent: Array<any> = [movie];
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
            <div className="App">
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
                  <Movies setRecent={setRec} Movies={data}></Movies>
                )}
              </div>
            </div>
          }
        />
        <Route path="More" element={<More />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
