"use client";
import { useState, useEffect } from "react";
import { getPaginatedLaunches } from "@/lib/spacex/launches";
import { parseDate } from "@/utils";
import { SnackBar} from "@/components/ui";
import { ApiDocs, ApiResponse, TSnackBar } from "@/types";
import {
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LoadingIcon,
  LoadingLineIcon,
} from "../svg";

const successClasses =
  "absolute top-4 right-0 pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-green-900 bg-green-500/20 text-green-500";
const failedClasses =
  "absolute top-4 right-0 pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-red-900 bg-red-500/20 text-red-300";

type TProps = {
  data: ApiResponse;
  setSelected: React.Dispatch<React.SetStateAction<ApiDocs | undefined>>;
};

export default function List({ data, setSelected }: TProps) {
  const [tableData, setTableData] = useState<ApiResponse>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 0,
    nextPage: null,
    offset: 0,
    page: 0,
    pagingCounter: 0,
    prevPage: null,
    totalDocs: 0,
    totalPages: 0,
  });
  const [rocketValue, setRocketValue] = useState<string | undefined>();
  const [successValue, setSuccessValue] = useState<string | undefined>();
  const [dateValue, setDateValue] = useState<string | undefined>();
  const [query, setQuery] = useState({});
  const [sort, setSort] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackBar, setSnackbar] = useState<TSnackBar>({
    active: false,
    title: "",
    message: "",
    type: "",
  });

  useEffect(() => {
    setTableData(data);
  }, []);

  useEffect(() => {
    let queryObj:any = {};
    let sortObj:any = {};
    if (rocketValue || successValue || dateValue) {
      const filterSuccess = async () => {
        setIsLoading(true)
        const data = await getPaginatedLaunches(undefined, queryObj, sortObj);
        if (!data.ok) {
          setIsLoading(false)
          setSnackbar({
          active: true,
          message: data.error.message,
          type: "error",
          title: data.error.name,
        });
          return;
        }
        setTableData(data.data);
        setIsLoading(false)
      };
      if (rocketValue) queryObj.rocket = rocketValue;
      if (successValue) queryObj.success = successValue === 'true' ? true :false;
      if (dateValue) sortObj.date_utc = dateValue;
      setQuery(queryObj);
      setSort(sortObj);
      filterSuccess();
    }
  }, [rocketValue, successValue, dateValue]);

  const setDetails = (id: string) => {
    const document = tableData?.docs.find((launch) => launch.id === id);
    if (document) {
      setSelected(document);
    }
  };

  const changePage = async (page: number | null) => {
    if (page) {
      setIsLoading(true);
      const response = await getPaginatedLaunches(page, query, sort);
      if (!response.ok) {
        setIsLoading(false);
        setSnackbar({
          active: true,
          message: response.error.message,
          type: "error",
          title: response.error.name,
        });
        return;
      }
      setTableData(response.data);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex gap-2 mt-4">
        <input
          type="text"
          //onChange={(e) => searchName(e.target.value)}
          placeholder="Search by name"
          className="border grow rounded-sm border-zinc-700 bg-zinc-900 text-sm h-8 pl-2 focus:outline-1 focus:outline-blue-500 focus:border-blue-500"
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className=" flex items-center justify-center border rounded-sm border-zinc-700 bg-zinc-900 h-8 w-8 text-zinc-500"
        >
          <FilterIcon width="1.5rem" height="1.5rem" />
        </button>
      </div>
      {showFilters && (
        <div className="w-full flex flex-wrap gap-2 mt-4">
          <select
            className="border grow rounded-sm border-zinc-700 bg-zinc-900 text-sm h-8 w-full pl-2 focus:outline-1 focus:outline-blue-500 focus:border-blue-500"
            defaultValue="placeholder"
            onChange={(e)=>setRocketValue(e.target.value)}
          >
            <option value="placeholder"  disabled  hidden>
              Filter by Rocket
            </option>
            <option value="5e9d0d95eda69955f709d1eb">Falcon 1</option>
            <option value="5e9d0d95eda69973a809d1ec">Falcon 9</option>
            <option value="5e9d0d95eda69974db09d1ed">Falcon Heavy</option>
          </select>
          <select
            className="border grow rounded-sm border-zinc-700 bg-zinc-900 text-sm h-8  pl-2 focus:outline-1 focus:outline-blue-500 focus:border-blue-500"
            defaultValue="placeholder"
            onChange={(e)=>setSuccessValue(e.target.value)}
          >
            <option value="placeholder" disabled hidden>
              Filter by Status
            </option>
            <option value="true">Success</option>
            <option value="false">Failed</option>
          </select>
          <select
            className="border grow rounded-sm border-zinc-700 bg-zinc-900 text-sm h-8 w-[40%] pl-2 focus:outline-1 focus:outline-blue-500 focus:border-blue-500"
            defaultValue="placeholder"
            onChange={(e)=>setDateValue(e.target.value)}
          >
            <option value="placeholder" disabled hidden>
              Sort by Date
            </option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      )}
      <ul className="mt-4">
        {tableData &&
          tableData.docs.map((launch) => (
            <li key={'list-'+launch.id} className="relative pt-4 pb-4 border-b border-b-zinc-800">
              <h3 className="text-zinc-300 font-semibold text-lg max-w-56 overflow-hidden whitespace-nowrap text-ellipsis">
                {launch.name}
              </h3>
              <span
                className={
                  launch.success === false ? failedClasses : successClasses
                }
              >
                {launch.success === false ? 'Failed' : 'Successful'}
              </span>
              <p className="text-zinc-400 font-semibold text-xs mt-2">
                {launch.rocket.name}
              </p>
              <p className="text-zinc-400 font-semibold text-xs mt-1">
                {parseDate(launch.date_utc)}
              </p>
              <button
                onClick={() => setDetails(launch.id)}
                className="bg-blue-500 pt-1 pb-1 pl-4 pr-4 text-sm font-semibold rounded-lg mt-8"
              >
                Details
              </button>
            </li>
          ))}
      </ul>

      <div className="flex items-center mt-4">
        <button
          onClick={() => changePage(tableData.prevPage)}
          disabled={!tableData.hasPrevPage}
          className="h-8 w-8 rounded-md border border-zinc-700 flex items-center justify-center disabled:text-zinc-800 disabled:pointer-events-none"
        >
          <ChevronLeftIcon width="1rem" height="1rem" />
        </button>
        <p className="flex justify-center items-end gap-0.5 relative text-zinc-400 text-center font-semibold text-sm grow">
          Page&nbsp;
          {isLoading ? (
            <LoadingLineIcon height="1rem" width="1rem" />
          ) : (
            tableData.page
          )}
          &nbsp; of&nbsp; {tableData.totalPages}
        </p>
        <button
          onClick={() => changePage(tableData.nextPage)}
          disabled={!tableData.hasNextPage}
          className="h-8 w-8 rounded-md border border-zinc-700 flex items-center justify-center disabled:text-zinc-800 disabled:pointer-events-none"
        >
          <ChevronRightIcon width="1rem" height="1rem" />
        </button>
      </div>
      <SnackBar info={snackBar} updateInfo={setSnackbar}/>
    </>
  );
}
