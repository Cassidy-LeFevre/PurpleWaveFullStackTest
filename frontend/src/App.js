import React from "react";
import "./App.css";
import Form from "./Form.js";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
        <Form />
    </div>
  );
}

export default App;
