import { useState } from "react";
import {traineesData} from '../trainee-data'



function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Group</th>
            <th>Company</th>
            <th>EP1</th>
            <th>EP2</th>
          </tr>
          {traineesData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.group}</td>
              <td>{item.company}</td>
              <td>{item.ep1}</td>
              <td>{item.ep2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
