import React from "react";
import Routing from "./routing/Routing";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Routing />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
