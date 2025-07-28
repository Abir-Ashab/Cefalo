import CounterControl from "./components/IncreaseCounter";
import DisplayCounter from "./components/DisplayCounter";
import { Link } from "react-router-dom";
import ResetRoute from "./components/ResetCounter";

const App = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <DisplayCounter />
      <div style={{ marginTop: "20px" }}>
          <CounterControl />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <ResetRoute />
      </div>
      <Link to="/decrease"> go there for decrement </Link>
    </div>
  );
};

export default App;
