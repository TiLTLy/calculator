import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation, x: parseFloat(x), y: parseFloat(y) }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    }
  };

  return (
    <div className="app">
      <h1>Calculator</h1>
      <div className="input-group">
        <label>First Number:</label>
        <input
          type="number"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Second Number:</label>
        <input
          type="number"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Operation:</label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
      {error && <p className="error">Error: {error}</p>}
    </div>
  );
};

export default App;

