import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Movies from "./Movies";
import Recent from "./Recent";
import Series from "./Series";

function App() {
  const [currentTab, setCurrentTab] = useState("movie");
  const [data, getData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<String>();
  const fetchData = async (searchword: string) => {};
  useEffect(() => {});
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
