import { useState } from "react";
 
function SourceTable({ numbers, onTransfer }) {
  return (
    <div className="columns-1 justify-center flex flex-col">
      <table>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={`source-${index}`}>
              <td>{number}</td>
              <td>
                <button onClick={() => onTransfer(index)}>↶</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
function TargetTable({ numbers, onDelete }) {
  return (
    <div className="text-green-600">
      <table>
        <tbody>
          {numbers.map((number, index) => (
            <tr key={`target-${index}`}>
              <td>{number}</td>
              <td>
                <button onClick={() => onDelete(index)}> x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default function App() {
  const [sourceNumbers, setSourceNumbers] = useState([]);
  const [targetNumbers, setTargetNumbers] = useState([]);
 
  function handleAddNumber(newNumber) {
    const newSourceNumbers = [...sourceNumbers, newNumber];
    setSourceNumbers(newSourceNumbers);
  }
 
  function handleTransfer(index) {
    const newSourceNumbers = [...sourceNumbers];
    newSourceNumbers.splice(index, 1);
    setSourceNumbers(newSourceNumbers);
 
    const newTargetNumbers = [...targetNumbers, sourceNumbers[index]];
    setTargetNumbers(newTargetNumbers);
  }
 
  function handleDelete(index) {
    const newTargetNumbers = [...targetNumbers];
    newTargetNumbers.splice(index, 1);
    setTargetNumbers(newTargetNumbers);
  }
 
  return (
    <div className="bg-white h-screen text-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const numberInput = event.target.elements.number;
          const newNumber = parseInt(numberInput.value, 10);
          numberInput.value = "";
          handleAddNumber(newNumber);
        }}
      >
        <label>
          <input className="border" type="number" name="number" />
        </label>
        <button class="h-8 px-4 m-2 text-sm text-white transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-600" type="submit">Add</button>
      </form>

      <div className='flex place-items-center justify-center'>
      <h2 className='bg-green-500 h-7 w-40 text-white col-span-1'>Now Serving</h2>
      <TargetTable numbers={targetNumbers} onDelete={handleDelete}  />
      <h2 className=' bg-gray-700 h-7 w-40 text-white'>Now Preparing</h2>
      <SourceTable numbers={sourceNumbers} onTransfer={handleTransfer}/>
      </div>
    </div>
  );
}