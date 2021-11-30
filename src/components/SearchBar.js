import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import "../App.css";

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
  var characterList = data.flatMap((movie) => movie.characters);
  characterList = characterList.filter((value, index, array) => {
    return array.indexOf(value) === index;
  });
  characterList.sort();

  return (
    <Dropdown style={{ position: "inherit" }}>
      <div style={{ left: "0px", padding: "30px" }}>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {character === "" ? "Select Character" : character}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          {characterList.map((character, index) => (
            <Dropdown.Item
              key={index}
              onClick={() => {
                setCharacter(character)}}
            >
              {character}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
        <button
          style={{ marginLeft: "10px" }}
          type="button"
          className="btn btn-outline-secondary"
          data-testid="clear-button"
          onClick={() => {
            setCharacter("");
          }}
        >
          clear
        </button>
      </div>
    </Dropdown>
  );
};

export default SearchBar;
