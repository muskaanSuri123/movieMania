import { debounce } from "debounce";
const Searchbox = ({ searchValue, setSearchValue }) => {
  const getText = debounce((text) => {
    setSearchValue(text);
  }, 1000);

  return (
    <div className="searchbox">
      <input
        className="searchtag"
        placeholder="eg:legally Blond"
        onChange={(event) => getText(event.target.value)} 
      ></input>
    </div>
  );
};

export default Searchbox;
