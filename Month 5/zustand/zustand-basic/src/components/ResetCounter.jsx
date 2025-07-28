import useCounter from "./UseCounter";

const ResetRoute = () => {
  const incrCounter = useCounter((state) => state.incrCounter);

  return (
    <div>
      <button onClick={incrCounter}> Reset </button>
    </div>
  );
};

export default ResetRoute;
