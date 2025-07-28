import DisplayCounter from "./DisplayCounter";
import useCounter from "./UseCounter";

const ChangeCounter = () => {
  const decrCounter = useCounter((state) => state.decrCounter);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <DisplayCounter />
      <button onClick={decrCounter} style={{ marginTop: "20px" }}>Decrease</button>
    </div>
  );
};

export default ChangeCounter;
