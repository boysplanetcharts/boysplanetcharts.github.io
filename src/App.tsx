import { useEffect, useMemo, useState } from "react";
import { traineesData } from "../trainee-data";
import { RankingChart } from "./components/ranking-chart";
import { ITraineeInfo, ITraineeInfoWithImage } from "./types";
import bpLogo from "./assets/boys-planet-logo.png";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { Footer } from "./components/Footer";
import { BiSearchAlt, BiLinkExternal } from "react-icons/bi";
import { RiWeiboFill } from "react-icons/ri";
import { MdStars } from "react-icons/md";
import { BsArrowRightShort } from "react-icons/bs";

import * as amplitude from "@amplitude/analytics-browser";

const LATEST_EP_WITH_RANKINGS = "ep12";

function getImageUrl(traineeId: number) {
  return new URL(`./assets/trainees-jpeg/${traineeId}.jpg`, import.meta.url)
    .href;
}

function App() {
  const { isMobileOrTablet } = useWindowDimensions();

  // const [supertopicFollowers, setSupertopicFollowers] = useState();
  // const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    amplitude.init(import.meta.env.VITE_AMPLITUDE_KEY);
  }, []);

  const addImgToTraineeArray = (trainees: ITraineeInfo[]) => {
    return trainees.map((trainee) => ({
      ...trainee,
      image: getImageUrl(trainee.id),
    }));
  };

  const renderTraineeEmojiAccordingToRank = (rank: number) => {
    if (rank === 1) {
      return "👑";
    }
    if (rank > 1 && rank < 10) {
      return "⭐";
    }

    return "";
  };

  const traineesSortedByMostRecentRank = useMemo(() => {
    const ep5eliminatedTrainees = traineesData.filter(
      (trainee) => trainee.ep5 === -1
    );

    const ep8eliminatedTrainees = traineesData
      .filter((trainee) => trainee.ep8 > 28)
      .sort((item1, item2) => item1.ep8 - item2.ep8);

    const ep11eliminatedTrainees = traineesData
      .filter((trainee) => trainee.ep11 > 18)
      .sort((item1, item2) => item1.ep11 - item2.ep11);

    const survivedTrainees = traineesData.filter(
      (trainee) => trainee[LATEST_EP_WITH_RANKINGS] !== -1
    );

    survivedTrainees.sort(
      (item1, item2) =>
        item1[LATEST_EP_WITH_RANKINGS] - item2[LATEST_EP_WITH_RANKINGS]
    );

    return [
      ...survivedTrainees,
      ...ep11eliminatedTrainees,
      ...ep8eliminatedTrainees,
      ...ep5eliminatedTrainees,
    ];
  }, [traineesData]);

  const traineesWithImage: ITraineeInfoWithImage[] = useMemo(
    () => addImgToTraineeArray(traineesSortedByMostRecentRank),
    [traineesSortedByMostRecentRank]
  );

  const [currentTrainee, setCurrentTrainee] = useState<ITraineeInfoWithImage>(
    traineesWithImage[0]
  );

  const [filteredTrainees, setFilteredTrainees] = useState(traineesWithImage);

  const generateRankDifference = (rank1: number, rank2: number) => {
    const isRankUnavailable = rank2 === -1;
    const difference = rank1 - rank2;
    const noDifference = difference === 0;
    const higher = difference > 0;

    if (isRankUnavailable) {
      return "";
    }

    if (noDifference) {
      return <p style={{ color: "#9eada3", fontSize: 14 }}>{`(-) `}</p>;
    }
    if (higher) {
      return (
        <p style={{ color: "#37f075", fontSize: 14 }}>{`(▲ ${difference})`}</p>
      );
    }

    return (
      <p style={{ color: "#fc1c03", fontSize: 14 }}>{`(▼ ${difference})`}</p>
    );
  };

  const handleSearchTrainee = (input: string) => {
    const formattedInput = input.replace(" ", "").toLowerCase();

    if (formattedInput) {
      const newTrainees = traineesWithImage.filter((trainee) => {
        const formattedTraineeName = trainee.name
          .replace(/\s/g, "")
          .toLowerCase();

        return formattedTraineeName.includes(formattedInput);
      });
      setFilteredTrainees(newTrainees);
    } else {
      setFilteredTrainees(traineesWithImage);
    }
  };

  const TRAINEE_RANK_ARRAY = useMemo(
    () => [
      currentTrainee.ep1,
      currentTrainee.ep2,
      currentTrainee.ep3,
      -1,
      currentTrainee.ep5,
      currentTrainee.ep6,
      -1,
      currentTrainee.ep8,
      currentTrainee.ep9,
      -1,
      currentTrainee.ep11,
      currentTrainee.ep12,
    ],
    [currentTrainee]
  );

  // const getWeiboInfo = async (url?: string) => {
  //   setLoading(true);
  //   if (url) {
  //     axios
  //       .get(`https://boys-planet-api.onrender.com/wb_followers?url=${url}`, {})
  //       .then((response) => {
  //         setSupertopicFollowers(response.data.wb_supertopic);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         setLoading(false);
  //       });
  //   }
  // };

  const handleClickTraineeRow = (trainee: ITraineeInfoWithImage) => {
    setCurrentTrainee(trainee);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleMouseEnterTraineeRow = (trainee: ITraineeInfoWithImage) => {
    !isMobileOrTablet && setCurrentTrainee(trainee);
    amplitude.track("Trainee Row Mouse Enter", trainee);
  };

  const generateTraineeStarRanks = (
    rank1?: number,
    rank2?: number,
    isGlobal?: boolean
  ) => {
    const iconColor = isGlobal ? "#e6497c" : "#383d9e";

    if (rank1 !== undefined && rank2 !== undefined) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 20,
          }}
        >
          {rank1 === 0 ? (
            <strong
              style={{ color: iconColor, fontSize: isMobileOrTablet ? 12 : 16 }}
            >
              0 STAR
            </strong>
          ) : (
            Array(rank1)
              .fill(0)
              .map(() => <MdStars size={18} color={iconColor} />)
          )}
          <BsArrowRightShort size={18} />
          {rank2 === 0 ? (
            <strong
              style={{ color: iconColor, fontSize: isMobileOrTablet ? 12 : 16 }}
            >
              0 STAR
            </strong>
          ) : (
            Array(rank2)
              .fill(0)
              .map(() => <MdStars size={18} color={iconColor} />)
          )}
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5825ae",
          background:
            "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
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
            rankings={TRAINEE_RANK_ARRAY}
            isGlobal={currentTrainee.group === "G"}
          />
          <div
            className="trainee_card"
            style={{
              boxShadow: `0px 0px 29px 5px ${
                currentTrainee.group === "K" ? "#7fcbeb3d" : "#dc7cb03d"
              }`,
            }}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    margin: 0,
                    padding: 0,
                    fontSize: isMobileOrTablet ? 16 : 20,
                  }}
                >
                  {currentTrainee.name}
                </p>
                <div
                  style={{
                    backgroundColor:
                      currentTrainee.group === "G" ? "#dc7cb0" : "#7fcaeb",
                  }}
                  className="trainee_group_circle"
                >
                  <p>{currentTrainee.group}</p>
                </div>
                <p>
                  {renderTraineeEmojiAccordingToRank(
                    currentTrainee[LATEST_EP_WITH_RANKINGS]
                  )}
                </p>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "flex-end",
                    gap: 10,
                  }}
                >
                  {currentTrainee.wb_supertopic && (
                    <a
                      className="external_link_icon"
                      href={currentTrainee.wb_supertopic}
                      onClick={() =>
                        amplitude.track(
                          "Weibo Supertopic Clicked",
                          currentTrainee
                        )
                      }
                      target="_blank"
                      style={{ fontSize: isMobileOrTablet ? 12 : 18 }}
                    >
                      <RiWeiboFill size={isMobileOrTablet ? 18 : 24} />
                      超话
                    </a>
                  )}
                  <a
                    href={`https://service.mnetplus.world/boysplanet/en/artist/${currentTrainee.id}`}
                    target="_blank"
                    onClick={() =>
                      amplitude.track(
                        "Trainee Mnet Profile Clicked",
                        currentTrainee
                      )
                    }
                  >
                    <BiLinkExternal
                      size={isMobileOrTablet ? 18 : 24}
                      className="external_link_icon"
                    />
                  </a>
                </div>
              </div>
              {generateTraineeStarRanks(
                currentTrainee?.star_rank1,
                currentTrainee?.star_rank2,
                currentTrainee.group === "G"
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: 16,
                }}
              >
                <p
                  style={{
                    width: "70%",
                    textAlign: "center",
                    fontSize: isMobileOrTablet ? 10 : 15,
                  }}
                >
                  <em>"{currentTrainee.phrase}"</em>
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    style={{
                      borderRadius: 10,
                      width: isMobileOrTablet ? "5rem" : "12rem",
                    }}
                    src={currentTrainee.image}
                  />
                </div>
                <div className="trainee_card_column">
                  <p style={{ fontSize: isMobileOrTablet ? 11 : 16 }}>
                    <b style={{ color: "#5a5a5a" }}>Birthdate:</b>{" "}
                    {currentTrainee.dob}
                  </p>
                  <p style={{ fontSize: isMobileOrTablet ? 11 : 16 }}>
                    <b style={{ color: "#5a5a5a" }}>Height:</b>{" "}
                    {currentTrainee.height}cm
                  </p>
                  <p style={{ fontSize: isMobileOrTablet ? 11 : 16 }}>
                    <b style={{ color: "#5a5a5a" }}>Hobby:</b>{" "}
                    {currentTrainee.hobby}
                  </p>
                  <p style={{ fontSize: isMobileOrTablet ? 11 : 16 }}>
                    <b style={{ color: "#5a5a5a" }}>Specialty:</b>{" "}
                    {currentTrainee.good_at}
                  </p>
                  {currentTrainee.eliminated_ep !== -1 && (
                    <p style={{ fontSize: isMobileOrTablet ? 11 : 16 }}>
                      <b style={{ color: "#5a5a5a" }}>Eliminated in EP:</b>{" "}
                      {currentTrainee.eliminated_ep}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 24,
            flex: 1,
          }}
        >
          <div className="search_bar_container">
            <div className="search_bar">
              <div
                className="pop-in"
                style={{
                  display: "flex",
                }}
              >
                <BiSearchAlt color="#b4b4b4" />
              </div>
              <input
                className="search_bar_input"
                type="text"
                onChange={(evt) => handleSearchTrainee(evt.target.value)}
                placeholder="Search for your trainee!"
              />
            </div>
          </div>
          <div className="fixed_header">
            <table>
              <div className="fade_div" />
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>GROUP</th>
                  <th>COMPANY</th>
                  <th>EP 1</th>
                  <th>EP 2</th>
                  <th>EP 3</th>
                  <th>EP 5</th>
                  <th>EP 6</th>
                  <th>EP 8</th>
                  <th>EP 9</th>
                  <th>EP 11</th>
                  <th>EP 12</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrainees.map((item) => (
                  <tr
                    onMouseEnter={() => handleMouseEnterTraineeRow(item)}
                    onClick={() => handleClickTraineeRow(item)}
                    key={item.id}
                    style={{
                      position: "relative",
                      zIndex:
                        item[LATEST_EP_WITH_RANKINGS] === 93 ? 1 : "inherit",
                    }}
                  >
                    <td>
                      {renderTraineeEmojiAccordingToRank(
                        item[LATEST_EP_WITH_RANKINGS]
                      )}

                      {item.name}
                    </td>
                    <td>{item.group}</td>
                    <td>{item.company}</td>
                    <td>{item.ep1}</td>
                    <td>
                      <div className="ranking_div">
                        {generateRankDifference(item.ep1, item.ep2)}
                        <p>{item.ep2}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ranking_div">
                        {generateRankDifference(item.ep2, item.ep3)}
                        <p>{item.ep3 === -1 ? "-" : item.ep3}</p>
                      </div>
                    </td>

                    <td>
                      <div className="ranking_div">
                        {generateRankDifference(
                          item.ep3 === -1 ? item.ep2 : item.ep3,
                          item.ep5
                        )}
                        <p>{item.ep5 === -1 ? "-" : item.ep5}</p>
                      </div>
                    </td>

                    <td>
                      <div className="ranking_div">
                        {generateRankDifference(item.ep5, item.ep6)}
                        <p>{item.ep6 === -1 ? "-" : item.ep6}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ranking_div">
                        {generateRankDifference(item.ep6, item.ep8)}
                        <p>{item.ep8 === -1 ? "-" : item.ep8}</p>
                      </div>
                    </td>

                    <td>
                      <div className="ranking_div">
                        {item.ep9 !== -1 &&
                          generateRankDifference(item.ep8, item.ep9)}
                        <p>{item.ep9 === -1 ? "-" : item.ep9}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ranking_div">
                        {item.ep11 !== -1 &&
                          generateRankDifference(
                            item.ep9 !== -1 ? item.ep9 : item.ep8,
                            item.ep11
                          )}
                        <p>{item.ep11 === -1 ? "-" : item.ep11}</p>
                      </div>
                    </td>
                    <td>
                      <div className="ranking_div">
                        {item.ep12 !== -1 &&
                          generateRankDifference(item.ep11, item.ep12)}
                        <p>{item.ep12 === -1 ? "-" : item.ep12}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
