const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

function Counter({ item: { id, number }, hdlUpdate, hdlDelete }) {
  return (
    <div className="counter">
      <button onClick={() => hdlUpdate(id, -1)}> - </button>
      <h3>{number}</h3>
      <button onClick={() => hdlUpdate(id, 1)}> + </button>
      <button onClick={() => hdlUpdate(id, -number)}> C </button>
      <button onClick={() => hdlDelete(id)}> X </button>
    </div>
  );
}

function SumInfo({ counters, color, size }) {
  const totalSum = counters.reduce((sum, counter) => sum + counter.number, 0);

  const styles = {
    color: color,
    fontSize: size === "big" ? "50px" : "20px",
  };

  return (
    <div className="sumInfo">
      <h1 style={styles}>Sum = {totalSum}</h1>
    </div>
  );
}

function App() {
  const [counters, setCounters] = React.useState([{ id: 1, number: 5 }]);
//   let allCounter = Array(counters).fill(<Counter /> );

  const hdlUpdate = (id, num) => {
    const cloneCounters = [...counters];
    let idx = cloneCounters.findIndex((el) => el.id === id);
    if (cloneCounters[idx].number + num < 0) {
      return;
    }
    cloneCounters[idx].number += num;
    setCounters(cloneCounters);
  };

  const hdlAddCounter = () => {
    let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
    setCounters([...counters, { id: newId, number: 0 }]);
    //     let cloneCounters = [...counters]
//     cloneCounters.push( {id: newId,number: 0})
//     setCounters(cloneCounters)
  };

  const hdlDeleteCounter = (id) => {
    setCounters((prevCounters) =>
      prevCounters.filter((el) => el.id !== id)
    );
  };

  return (
    <>
      <h1 className="text-center">Codecamp Academy 01</h1>
      <br />
      <br />

      <button className="text-centers" onClick={hdlAddCounter}>Add Counter</button>
      <SumInfo counters={counters} color="salmon" size="big" />

      {counters.map((el) => (
        <Counter key={el.id}item={el}hdlUpdate={hdlUpdate}hdlDelete={hdlDeleteCounter}
        />
      ))}
    </>
  );
}
