import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
function Header() {
  return (
    <div className="header">
      <h2>
        Movies<span>DB</span>
      </h2>
      <div className="search">
        <AiOutlineSearch className="searchicon" />
        <input placeholder="Search" type={"search"}></input>
      </div>
    </div>
  );
}

export default Header;
