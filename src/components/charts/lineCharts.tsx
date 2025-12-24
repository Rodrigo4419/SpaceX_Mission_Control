"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

type dataKeys = {
  key: string;
  color: string;
  gradient: string;
};

type Tprops = {
  data: any;
  dataKeys: dataKeys[];
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-40 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        <p className="pt-1 pb-1 pl-2 pr-2 bg-zinc-700 text-zinc-300 border-b border-zinc-800 text-sm">{`${label}`}</p>
        {payload.map((pld: any) => (
          <div
            key={pld.dataKey}
            className="pt-1 pb-1 pl-2 pr-2 flex gap-2 items-center"
          >
            <div
              style={{
                height: "4px",
                width: "16px",
                borderRadius: "1.5px",
                backgroundColor: pld.color,
              }}
            ></div>
            <p className="text-zinc-400 text-sm">{pld.dataKey}:</p>
            <p className="text-zinc-50 text-sm">{pld.value}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default function LineChart({ data, dataKeys }: Tprops) {
  return (
    <AreaChart
      style={{
        width: "100%",
        height: "16rem",
        maxHeight: "16rem",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <defs>
        {dataKeys.map((key) => (
          <linearGradient key={'gradient-'+key.key} id={`color${key.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={key.color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={key.gradient} stopOpacity={0} />
          </linearGradient>
        ))}
      </defs>
      <CartesianGrid strokeDasharray="4 2" vertical={false} />
      <XAxis dataKey="name" hide={true} />
      <YAxis width="auto" />
      <Tooltip content={<CustomTooltip />} />
      {dataKeys.map((key) => (
        <Area
          key={'line-'+key.key}
          type="monotone"
          dataKey={key.key}
          stackId="1"
          stroke={key.color}
          strokeWidth={2}
          fill={`url(#color${key.key})`}
        />
      ))}
    </AreaChart>
  );
}
