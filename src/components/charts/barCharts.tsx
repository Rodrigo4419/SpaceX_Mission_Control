"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

export default function BarCharts({ data, dataKeys }: Tprops){
    return (
    <BarChart
      style={{ width: '100%', height:'16rem', maxHeight: '16rem',aspectRatio: 1.618  }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="4 2" vertical={false}/>
      <XAxis dataKey="name" hide={true}/>
      <YAxis width="auto" />
      <Tooltip content={<CustomTooltip />} cursor={{fill: '#155dfc33'}}/>
      {dataKeys.map((key, i)=>(
        <Bar key={'bar-'+key.key} dataKey={key.key} stackId="a" fill={key.color} radius={i === dataKeys.length-1 ? [12, 12, 0, 0] : [0, 0, 0, 0]}/>
      ))}
    </BarChart>
  );
}