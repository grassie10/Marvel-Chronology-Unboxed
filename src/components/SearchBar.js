import { Movie } from "@mui/icons-material";
import React, { useState } from "react";
import "../App.css";
import { setData } from "../firebase";
import { Dropdown, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <button
      className="btn btn-outline-secondary"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </button>
  );
});

const CustomMenu = React.forwardRef(
  ({ children, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");
    return (
      <div
        style={{ marginTop: "15px", width: "300px" }}
        ref={ref}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value ||
              child.props.children.toLowerCase().startsWith(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);
const SearchBar = ({ data, character, setCharacter }) => {
  return (
    <Dropdown style={{ position: "inherit" }}>
      <div style={{ left: "0px", padding: "30px" }}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          Select Character
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {data.map(
            (movie, index) => (
              <Dropdown.Item
                key={index}
                //  onClick={(e) => setCharacter(e.target.value)}
              >
                {movie.characters[0]}
              </Dropdown.Item>
            )
            // !Object.keys(character).includes(index.toString()) ? (
            //   <Dropdown.Item
            //     key={index}
            //     onClick={(e) => setCharacter(e.target.value)}
            //   >
            //     {item.characters}
            //   </Dropdown.Item>
            // ) : (
            //   <Dropdown.Item
            //     key={index}
            //     onClick={() => setFoods(handleSetFoods(index, item))}
            //     disabled
            //   >
            //     {item.name}
            //   </Dropdown.Item>
            // )
          )}
        </Dropdown.Menu>
        <button
          style={{ marginLeft: "10px" }}
          type="button"
          className="btn btn-outline-secondary"
          data-testid="clear-button"
          onClick={() => {
            setCharacter({});
          }}
        >
          clear
        </button>
      </div>
    </Dropdown>
  );
};

export default SearchBar;
