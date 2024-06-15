import "./App.css";
import * as Sentry from "@sentry/react";

function App() {
  return (
    <div className="App">
      <h1>Sentry Error testing </h1>
      <button
        type="button"
        onClick={() => {
          throw new Error("Sentry Test Error");
        }}
      >
        Break the world
      </button>
      
    </div>
  );
}

export default Sentry.withProfiler(App);
