import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Movies from "./Movies";
import Recent from "./Recent";
import Series from "./Series";

function App() {
  const [currentTab, setCurrentTab] = useState("movie");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("avengers");
  const APIKEY = "5b9bd435";
  const fetchData = async (searchword: string) => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${searchword}&page=1&apiKey=${APIKEY}&type=${currentTab}`
      )
      .then((res) => {
        setData(res.data.Search);
      });
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [currentTab, searchTerm]);
  console.log(data);
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
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

        <Movies Movies={data}></Movies>
      </div>
    </div>
  );
}

export default App;
