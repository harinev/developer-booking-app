import React from "react";
import DeveloperCount from "./DeveloperCount";
import Header from "./Header";
import Developer from "./Developer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <DeveloperCount />
      <div className="container">
        <Developer name="Sue Moron-Garcia" skills={["TDD", "Debugging"]} />
        <Developer name="Fiona Castillo" skills={["HTML", "CSS"]} />
        <Developer name="Harine Vijay" skills={["Java"]} />
        <Developer name="Ilga Koko" skills={["HTML", "TDD", "React"]} />
        <Developer name="Nichola Evans" skills={["CSS", "Ruby", "Python"]} />
      </div>
    </div>
  );
}

export default App;
