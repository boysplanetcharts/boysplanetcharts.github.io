import React from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { IRankingChartData } from "./types";
import "./style.css";

interface ICustomizedDot {
  cx: number;
  cy: number;
  value: number;
  key: string;
  stroke: string;
}

const CustomizedDot = ({ cx, cy, value, key, stroke }: ICustomizedDot) => {
  return (
    <React.Fragment key={key}>
      <circle cx={cx} cy={cy} r={15} fill={stroke} />
      <text fill="#fff" textAnchor="middle" x={cx} y={cy + 5}>
        {value}
      </text>
    </React.Fragment>
  );
};

export const RankingChart = ({ rankings, isGlobal }: IRankingChartData) => {
  // const newRankings = rankings.filter((rank) => rank !== -1);
  const [chartData, setChartData] = React.useState([]);

  console.log("rankgg", rankings);

  React.useEffect(() => {
    const chartArr = rankings.map((rank, index) => {
      if (rank !== -1) {
        return {
          episode: `EP ${index + 1}`,
          ranking: rank,
        };
      }
    });

    setChartData(chartArr.filter((item) => item) as any);
  }, [rankings[0]]);

  return (
    <ResponsiveContainer key={rankings[0]} width={"90%"} height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 60,
          right: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} />
        <XAxis
          tickMargin={40}
          axisLine={false}
          tickLine={false}
          dataKey="episode"
        />
        <YAxis domain={[0, 100]} reversed tick={false} axisLine={false} />
        <Line
          key={rankings[0]}
          animationDuration={500}
          dataKey="ranking"
          stroke={isGlobal ? "#fb9fcb" : "#7fcaeb"}
          strokeWidth={5}
          dot={CustomizedDot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
