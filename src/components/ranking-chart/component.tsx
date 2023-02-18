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
}

const CustomizedDot = ({ cx, cy, value }: ICustomizedDot) => {
  return (
    <>
      <circle cx={cx} cy={cy} r={15} fill="#fb9fcb" />
      <text fill="#fff" textAnchor="middle" x={cx} y={cy + 5}>
        {value}
      </text>
    </>
  );
};

export const RankingChart = ({ rankings }: IRankingChartData) => {

  const newRankings = rankings.filter((rank) => rank !== -1);
  const chartArr = newRankings.map((rank, index) => ({
    episode: `EP ${index + 1}`,
    ranking: rank,
  }));


  return (
    <ResponsiveContainer  width={"90%"} height={300}>
      <LineChart
        data={chartArr}
        margin={{
          top: 60,
          right: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={true} horizontal={false} />
        <XAxis tickMargin={40} axisLine={false} tickLine={false} dataKey="episode" />
        <YAxis domain={[0, 100]}  reversed tick={false} axisLine={false} />
        <Line
          animationDuration={500}
          dataKey="ranking"
          stroke="#fb9fcb"
          strokeWidth={5}
          dot={CustomizedDot}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
