import { useMemo, useState } from "react";
import { traineesData } from "../trainee-data";
import { RankingChart } from "./components/ranking-chart";
import { ITraineeInfo, ITraineeInfoWithImage } from "./types";
import bpLogo from "./assets/boys-planet-logo.png";
import { useWindowDimensions } from "./hooks/useWindowDimensions";

function getImageUrl(traineeId: number) {
  return new URL(`./assets/trainees-jpeg/${traineeId}.jpg`, import.meta.url)
    .href;
}

function App() {
  const { isMobileOrTablet } = useWindowDimensions();

  const addImgToTraineeArray = (trainees: ITraineeInfo[]) => {
    return trainees.map((trainee) => ({
      ...trainee,
      image: getImageUrl(trainee.id),
    }));
  };

  const traineesSortedByMostRecentRank = useMemo(
    () => traineesData.sort((item1, item2) => item1.ep2 - item2.ep2),
    [traineesData]
  );

  const traineesWithImage: ITraineeInfoWithImage[] = useMemo(
    () => addImgToTraineeArray(traineesSortedByMostRecentRank),
    [traineesSortedByMostRecentRank]
  );

  const [currentTrainee, setCurrentTrainee] = useState<ITraineeInfoWithImage>(
    traineesWithImage[0]
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
        <img key={currentTrainee.id} style={{ height: "75%" }} src={bpLogo} />
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div style={{ margin: 24 }}>
              <img
                style={{
                  borderRadius: 10,
                  width: isMobileOrTablet ? "5rem" : "12rem",
                }}
                src={currentTrainee.image}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 24,
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p style={{ fontWeight: "bold", margin: 0, padding: 0 }}>
                  {currentTrainee.name}
                </p>
                <div
                  style={{
                    height: 32,
                    width: 32,
                    backgroundColor:
                      currentTrainee.group === "G" ? "#dc7cb0" : "#7fcaeb",
                    display: "flex",
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    margin: 8,
                  }}
                >
                  <p>{currentTrainee.group}</p>
                </div>
              </div>
              <p>{currentTrainee.phrase}</p>
              <p>{currentTrainee.dob}</p>
              <p>{currentTrainee.height}</p>
              <p>Hobby: {currentTrainee.hobby}</p>
              <p>Specialty: {currentTrainee.good_at}</p>
            </div>
          </div>
        </div>
        <div className="fixed_header">
          <thead>
            <tr>
              <th>Name</th>
              <th>Group</th>
              <th>Company</th>
              <th>EP1</th>
              <th>EP2</th>
              <th>EP3</th>
            </tr>
          </thead>
          <table>
            <tbody>
              {traineesWithImage.map((item) => (
                <tr onMouseEnter={() => setCurrentTrainee(item)} key={item.id}>
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
