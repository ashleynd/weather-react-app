import React from "react";
import ReactDOM from "react-dom";
import SearchEngine from "./SearchEngine";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <SearchEngine city="New York" temperature={19} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

