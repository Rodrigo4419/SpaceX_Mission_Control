import Link from "next/link";
import {
  getAllLaunches,
  getPaginatedLaunches,
  getLineChartsData,
  getBarChartData,
} from "@/lib/spacex/launches";
import { getAllRockets } from "@/lib/spacex/rockets";
import {
  formatLineChart,
  formatBarChart,
  getLaunchData,
  getActiveRockets,
} from "@/utils";
import { BarCharts, LineChart } from "@/components/charts";
import { DashboardTable } from "@/components/ui";
import {
  ChevronRightIcon,
  RocketIcon,
  CrashIcon,
  LaunchPadIcon,
} from "@/components/svg";

const DATA_KEYS = [
  { key: "2020", color: "#0092b8", gradient: "#00b8db" },
  { key: "2021", color: "#0084d1", gradient: "#00a6f4" },
  { key: "2022", color: "#155dfc", gradient: "#2b7fff" },
];

const DATA_KEYS_BAR = [
  { key: "failed", color: "#0084d1" },
  { key: "success", color: "#155dfc" },
];

export default async function Dashboard() {
  const allLaunches = await getAllLaunches();
  const tableData = await getPaginatedLaunches();
  const lineData = await getLineChartsData();
  const barData = await getBarChartData();
  const rockets = await getAllRockets();
  //@ts-expect-error the data validation is inside the function
  const { successful, failed } = getLaunchData(allLaunches.data);
  //@ts-expect-error the data validation is inside the function
  const { active, total } = getActiveRockets(rockets.data);

  return (
    <>
      <section className="max-w-425 mt-24 m-auto sm:mt-auto">
        <div className="flex flex-col gap-4 h-fit items-center mt-6 sm:flex-row sm:h-32">

          <div className="relative h-full p-4 grow w-full border rounded-lg border-zinc-800 sm:w-0">
            <h2 className="flex gap-2 text-sm font-semibold text-zinc-300">
              <RocketIcon height="1rem" width="1rem" color="#05df72" />
              Successful Launches
            </h2>
            <p className="text-2xl font-semibold text-zinc-50 mt-2 mb-1">
              {allLaunches.ok ? successful : <span>Error</span>}
            </p>
            <p className="text-xs text-zinc-500">{allLaunches.ok ? 'Since 2006' : allLaunches.error.message}</p>
            {allLaunches.ok && <span className="absolute right-4 top-1/2 translate-y-[-50%] pt-0.5 pb-0.5 pl-4 pr-4 rounded-3xl text-xs font-bold border border-green-900 bg-green-500/20 text-green-500">
              {((successful / (successful + failed)) * 100).toFixed(1)}%
            </span>}
          </div>

          <div className="relative h-full p-4 grow w-full border rounded-lg border-zinc-800 sm:w-0">
            <h2 className="flex gap-2 text-sm font-semibold text-zinc-300">
              <CrashIcon height="1rem" width="1rem" color="#fb2c36" />
              Unsuccessful Launches
            </h2>
            <p className="text-2xl font-semibold text-zinc-50 mt-2 mb-1">
              {allLaunches.ok ? failed : <span>Error</span>}
            </p>
            <p className="text-xs text-zinc-500">{allLaunches.ok ? 'Since 2006' : allLaunches.error.message}</p>
            {allLaunches.ok && <span className="absolute right-4 top-1/2 translate-y-[-50%] pt-0.5 pb-0.5 pl-4 pr-4 rounded-3xl text-xs font-bold border border-red-900 bg-red-500/20 text-red-300">
              {((failed / (successful + failed)) * 100).toFixed(1)}%
            </span>}
          </div>

          <div className="relative h-full p-4 grow w-full border rounded-lg border-zinc-800 sm:w-0">
            <h2 className="flex gap-2 text-sm font-semibold text-zinc-300">
              <RocketIcon height="1rem" width="1rem" color="#2b7fff" />
              Active Rockets
            </h2>
            <p className="text-2xl font-semibold text-zinc-50 mt-2 mb-1">
              {rockets.ok ? active : <span>Error</span>}
            </p>
            <p className="text-xs text-zinc-500">{rockets.ok ? 'Since 2006' : rockets.error.message}</p>
            {rockets.ok && <span className="absolute right-4 top-1/2 translate-y-[-50%] pt-0.5 pb-0.5 pl-4 pr-4 rounded-3xl text-xs font-bold border border-blue-900 bg-blue-500/20 text-blue-300">
              {(active / total) * 100}%
            </span>}
          </div>

          <div className="relative h-full p-4 w-full border rounded-lg border-zinc-800 bg-zinc-800/20 grow 2xl:w-0 sm:w-[12%]">
            <h2 className="flex gap-2 items-center text-sm font-semibold text-zinc-50 mb-2">
              <LaunchPadIcon width="1rem" height="1rem" />
              Explore all the data
            </h2>
            <p className="text-sm font-medium text-zinc-400 mt-2 mb-2">
              {`View the most recent SpaceX missions in the app’s History section.`}
            </p>
            <Link
              href="/dashboard/history"
              className="flex items-end w-fit text-blue-400 rounded-lg font-semibold text-sm cursor-pointer duration-150 ease-in-out hover:text-blue-600"
            >
              Go to Historic
              <ChevronRightIcon height="1rem" width="1rem" />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center mt-4 mb-4 sm:flex-row">

          <div className="relative p-4 grow w-full border rounded-lg border-zinc-800 sm:w-0">
            <h2 className="flex gap-2 text-sm font-semibold text-zinc-300">
              Launches
            </h2>
            <p className="text-2xl font-semibold text-zinc-50 mt-2 mb-1">{lineData.ok ? lineData.data.length : '-----'}</p>
            <p className="text-xs text-zinc-500">
              Launches in the last 3 years
            </p>
            {!lineData.ok && (
              <p className="absolute grid max-w-60 top-4 right-4 text-xs text-red-400">
                Error{" "}
                <span className="text-red-200">{lineData.error.message}</span>
              </p>
            )}
            <LineChart
              data={lineData.ok ? formatLineChart(lineData.data) : []}
              dataKeys={DATA_KEYS}
            />
          </div>
          <div className="relative p-4 grow w-full border rounded-lg border-zinc-800 sm:w-0">
            <h2 className="flex gap-2 text-sm font-semibold text-zinc-300">
              Succesful and unsuccessful launches
            </h2>
            <p className="text-2xl font-semibold text-zinc-50 mt-2 mb-1">{barData.ok ? barData.data.length : '-----'}</p>
            <p className="text-xs text-zinc-500">
              Launches in the last 7 years
            </p>
            {!barData.ok && (
              <p className="absolute grid max-w-60 top-4 right-4 text-xs text-red-400">
                Error{" "}
                <span className="text-red-200">{barData.error.message}</span>
              </p>
            )}
            <BarCharts
              data={barData.ok ? formatBarChart(barData.data) : []}
              dataKeys={DATA_KEYS_BAR}
            />
          </div>
        </div>

        <h2 className="font-bold">Launch Details</h2>
        {tableData.ok ? (
          <DashboardTable data={tableData.data} />
        ) : (
          <div className="flex gap-4 h-80 w-full mt-4">
            <div className="relative bg-zinc-800/40 rounded-xl h-full w-0 grow">
              <p className="absolute right-4 bottom-4 text-zinc-400 text-sm">
                There is an error with SpaceX API...
              </p>
            </div>
            <div className="relative bg-zinc-800/40 rounded-xl h-full basis-sm">
              <p className="absolute right-4 bottom-4 text-zinc-400 text-sm">
                There is an error with SpaceX API...
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
