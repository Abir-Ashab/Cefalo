import useCounter from "./UseCounter";

const CounterControl = () => {
  const incrCounter = useCounter((state) => state.incrCounter);

  return (
    <div>
      <button onClick={incrCounter}> Increase </button>
    </div>
  );
};

export default CounterControl;
