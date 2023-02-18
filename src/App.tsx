import { useState } from "react";
import { traineesData } from "../trainee-data";
import { RankingChart } from "./components/ranking-chart";
import { ITraineeInfo } from "./types";
import bpLogo from "./assets/boys-planet-logo.png";
import { useWindowDimensions } from "./hooks/useWindowDimensions";

function App() {
  const { width, height, isMobileOrTablet } = useWindowDimensions();

  const traineesSortedByMostRecentRank = traineesData.sort(
    (item1, item2) => item1.ep2 - item2.ep2
  );

  const [count, setCount] = useState(0);
  const [currentTrainee, setCurrentTrainee] = useState<ITraineeInfo>(
    traineesSortedByMostRecentRank[0]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5825ae",
          height: 150,
          width: "100%",
        }}
      >
        <img style={{ height: "75%" }} src={bpLogo} />
      </div>
      <div
        style={{
          flexDirection: isMobileOrTablet ? "column" : "row",
          display: "flex",
          flex: 1,
          paddingTop: 32,
          width: "100%",
        }}
      >
        <div style={{ flex: 1 }}>
          <RankingChart
            rankings={[
              currentTrainee?.ep1,
              currentTrainee?.ep2,
              currentTrainee?.ep3,
            ]}
          />
        </div>
        <div style={{flex: 1, overflowX: "auto", overflowY: "scroll", maxHeight: 400, padding: 20}}>
          <table>
            <h1>Trainees</h1>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Group</th>
                <th>Company</th>
                <th>EP1</th>
                <th>EP2</th>
                <th>EP3</th>
              </tr>
              {traineesSortedByMostRecentRank.map((item, index) => (
                <tr onMouseEnter={() => setCurrentTrainee(item)} key={index}>
                  <td>{item.name}</td>
                  <td>{item.group}</td>
                  <td>{item.company}</td>
                  <td>{item.ep1}</td>
                  <td>{item.ep2}</td>
                  <td>{item.ep3 === -1 ? "-" : item.ep3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
