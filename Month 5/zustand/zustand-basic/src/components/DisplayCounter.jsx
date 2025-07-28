import useCounter from "./UseCounter";

const DisplayCounter = () => {
  const counter = useCounter((state) => state.counter);
  return <div style={{ fontSize: "24px", fontWeight: "bold" }}>Counter: {counter}</div>;
};

export default DisplayCounter;