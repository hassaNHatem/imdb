import "./App.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
function Recent() {
  const [display, setDisplay] = useState(true);
  return (
    <div className="recent">
      <div className="recent-header">
        <h2>Recently Viewd Shows</h2>
        <MdArrowBackIosNew
          className={display ? "arrow" : "reverse-arrow"}
          onClick={() => {
            setDisplay(!display);
          }}
        />
      </div>
      {display && <div className="slider">some slider data</div>}
    </div>
  );
}

export default Recent;
