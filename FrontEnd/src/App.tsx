import React from "react";
import { AppRouter } from "./Components/Global";
import { RootProvider } from "./Components/contexts/Root";

function App() {
  return (
    <div className="App">
      <RootProvider>
        <AppRouter />
      </RootProvider>
    </div>
  );
}

export default App;
