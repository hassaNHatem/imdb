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
  }, []);
  return (
    <div className="App">
      <Header></Header>
      <Recent></Recent>
      <div>
        <span
          onClick={() => {
            setCurrentTab("movie");
          }}
        >
          Movies
        </span>
        <span
          onClick={() => {
            setCurrentTab("series");
          }}
        >
          Series
        </span>
      </div>
      {currentTab === "movie" ? (
        <Movies Movies={data}></Movies>
      ) : (
        <Series Series={data}></Series>
      )}
    </div>
  );
}

export default App;
