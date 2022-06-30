import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
function Header({
  setSearchTerm,
}: {
  setSearchTerm: (variable: string) => void;
}) {
  return (
    <div className="header">
      <h2>
        Movies<span>DB</span>
      </h2>
      <div className="search">
        <AiOutlineSearch className="searchicon" />
        <input
          onChange={(e) => {
            if (e.target.value === "") {
              setSearchTerm("avengers");
            } else {
              setSearchTerm(e.target.value);
            }
          }}
          placeholder="Search"
          type={"search"}
        ></input>
      </div>
    </div>
  );
}

export default Header;
