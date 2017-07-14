import * as React from "react";
import * as ReactDOM from "react-dom";
import { Body } from "./components/body";
import { todoListId } from "./read";
import "./site.css";

if (!window.indexedDB) {
  window.alert("Your browser doesn't support IndexedDB (the browser feature this app uses to store your To-dos). Update your browser to its latest version.");
}

todoListId()
  .then(id => {
    ReactDOM.render(
      <Body todoListId={id} />,
      document.getElementById("app"),
    );
  }).catch(console.log);
