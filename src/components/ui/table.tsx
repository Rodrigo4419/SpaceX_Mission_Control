"use client";
import { useState, useEffect } from "react";
import { getPaginatedLaunches } from "@/lib/spacex/launches";
import { parseDate } from "@/utils";
import Select from "react-select";
import { ApiDocs, ApiResponse, TSnackBar } from "@/types";
import { SnackBar} from "@/components/ui";
import { ChevronRightIcon, ChevronLeftIcon, LoadingIcon } from "@/components/svg";

const successClasses =
  "pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-green-900 bg-green-500/20 text-green-500";
const failedClasses =
  "pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-red-900 bg-red-500/20 text-red-300";

const rocketOptions = [
  { value: "5e9d0d95eda69955f709d1eb", label: "Falcon 1" },
  { value: "5e9d0d95eda69973a809d1ec", label: "Falcon 9" },
  { value: "5e9d0d95eda69974db09d1ed", label: "Falcon Heavy" },
  //{ value: "Starship", label: "Starship" },
];

const successOptions = [
  { value: 'true', label: "Successful" },
  { value: 'false', label: "Failed" },
];

const dateOptions = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Desc" },
];

const customStyles = {
  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: "transparent",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#fafafa",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    fontWeight: 500,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#2b7fff" // hover
      : state.isFocused
      ? "#2b7fff33 " // selected
      : "transparent",
  }),
  menu: (base: any) => ({
    ...base,
    borderWidth: "1px",
    borderColor: "#3f3f46",
    backgroundColor: "#09090b",
    fontSize: "0.875rem",
    fontFamily: "Inter, sans-serif",
  }),
  control: (base: any, state: any) => ({
    ...base,
    color: "#fafafa",
    width: "10rem",
    height: "1.875rem",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    borderColor: state.isFocused ? "#2b7fff" : "#3f3f46",
    backgroundColor: "transparent",
  }),
};

type TProps = {
  data: ApiResponse;
  filters: boolean;
  setSelected: React.Dispatch<React.SetStateAction<ApiDocs | undefined>>;
};

type SelectType = {
  value: string;
  label: string;
};

export default function Table({
  data,
  filters,
  setSelected,
}: TProps) {
  
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
  const [rocketValue, setRocketValue] = useState<SelectType | null>(null);
  const [successValue, setSuccessValue] = useState<SelectType | null>(null);
  const [dateValue, setDateValue] = useState<SelectType | null>(null);
  const [snackBar, setSnackbar] = useState<TSnackBar>({
      active: false,
      title: "",
      message: "",
      type: "",
    });

  const [query, setQuery] = useState({});
  const [sort, setSort] = useState({});

  const [isLoading, setIsLoading]=useState(false)

  useEffect(() => {
    setTableData(data)
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
      if (rocketValue) queryObj.rocket = rocketValue.value;
      if (successValue) queryObj.success = successValue.value === 'true' ? true :false;
      if (dateValue) sortObj.date_utc = dateValue.value;
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
      setIsLoading(true)
      const response = await getPaginatedLaunches(page, query, sort);
      if (!response.ok) {
          setIsLoading(false)
          setSnackbar({
          active: true,
          message: response.error.message,
          type: "error",
          title: response.error.name,
        });
          return;
        }
      setTableData(response.data);
      setIsLoading(false)
    }
  };

  const searchName = (name: String) => {
    if(tableData){
      const filtered = tableData.docs.filter((launch) =>
      launch.name.toLowerCase().includes(name.toLowerCase())
    );
    setTableData((prev) => {
      return { ...prev, docs: filtered };
    });
    }
  };

  return (
    <>
      {filters && (
        <div className="flex gap-4 mt-6 mb-6">
          <label className="grid gap-1.5 grow text-sm">
            Search by Name
            <input
              type="text"
              onChange={(e) => searchName(e.target.value)}
              className="border rounded-sm border-zinc-700 bg-zinc-900 text-sm h-9.5 pl-2 focus:outline-1 focus:outline-blue-500 focus:border-blue-500"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            Rocket
            <Select
              styles={customStyles}
              options={rocketOptions}
              value={rocketValue}
              onChange={setRocketValue}
              placeholder="Filter by rocket"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            Success
            <Select
              styles={customStyles}
              options={successOptions}
              value={successValue}
              onChange={setSuccessValue}
              placeholder="Filter by status"
            />
          </label>
          <label className="grid gap-1.5 text-sm">
            Sort by Date
            <Select
              styles={customStyles}
              options={dateOptions}
              value={dateValue}
              onChange={setDateValue}
              placeholder="Select"
            />
          </label>
        </div>
      )}
      <div className="relative flex flex-col h-[48.6rem] overflow-x-auto w-full border rounded-t-xl border-zinc-800 overflow-hidden">
        {isLoading && <div className="absolute flex items-center justify-center w-full h-full z-10 bg-zinc-950/40"><LoadingIcon height="4rem" width="4rem" color="#2b7fff"/></div>}
        <table className="w-full border-collapse">
          <thead className="text-sm font-medium">
            <tr>
              <th
                scope="col"
                className="p-2 w-72 bg-zinc-900 border-b border-b-zinc-800"
              >
                Name
              </th>
              <th
                scope="col"
                className="p-2 text-left w-40 bg-zinc-900 border-b border-b-zinc-800"
              >
                Launch Date
              </th>
              <th
                scope="col"
                className="p-2 bg-zinc-900 border-b border-b-zinc-800"
              >
                Success
              </th>
              <th
                scope="col"
                className="p-2 w-40 bg-zinc-900 border-b border-b-zinc-800"
              >
                Rocket
              </th>
              <th
                scope="col"
                className="p-2 whitespace-nowrap bg-zinc-900 border-b border-b-zinc-800"
              >
                Rocket Type
              </th>
              <th
                scope="col"
                className="p-2 bg-zinc-900 border-b border-b-zinc-800"
              >
                Company
              </th>
              <th
                scope="col"
                className="p-2 bg-zinc-900 border-b border-b-zinc-800"
              ></th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {tableData && tableData.docs.map((launch) => (
              <tr
                key={launch.id}
                className="text-center transition duration-150 ease-in-out hover:bg-zinc-900/40 cursor-pointer"
              >
                <td className="p-2 border-b border-b-zinc-800 first: pl-4 text-left font-semibold">
                  <span className="w-72 block whitespace-nowrap overflow-hidden text-ellipsis">{launch.name}</span>
                </td>
                <td className="p-2 border-b border-b-zinc-800">
                  <span className="w-40 text-left block whitespace-nowrap overflow-hidden text-ellipsis">{parseDate(launch.date_utc)}</span>
                </td>
                <td className="p-2 border-b border-b-zinc-800">
                  <span
                    className={
                      launch.success === false ? failedClasses : successClasses
                    }
                  >
                    {launch.success === false ? "failed" : "successfull"}
                  </span>
                </td>
                <td className="p-2 border-b border-b-zinc-800">
                  <span className="w-40 block whitespace-nowrap overflow-hidden text-ellipsis">{launch.rocket.name}</span>
                </td>
                <td className="p-2 border-b border-b-zinc-800">
                  {launch.rocket.type}
                </td>
                <td className="p-2 border-b border-b-zinc-800">
                  {launch.rocket.company}
                </td>
                <td className="p-2 border-b border-b-zinc-800">
                  <button
                    onClick={() => setDetails(launch.id)}
                    className="cursor-pointer border-0 bg-transparent px-4 text-zinc-50 rounded-lg transition duration-150 ease-in-out hover:bg-blue-500/30 hover:text-blue-300 font-semibold"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-2 rounded-b-xl border border-zinc-800 border-t-0 bg-zinc-900 flex gap-4 items-center w-full mt-auto">
          <label className="font-semibold ml-auto">
            {tableData.page} - {tableData.totalPages} of {tableData.totalDocs}
          </label>
          <button
            onClick={() => changePage(tableData.prevPage)}
            disabled={!tableData.hasPrevPage}
            className="h-8 w-8 rounded-lg border border-zinc-800 flex items-center justify-center disabled:text-zinc-800 disabled:pointer-events-none hover:border-zinc-600 hover:cursor-pointer"
          >
            <ChevronLeftIcon width="1rem" height="1rem" />
          </button>
          <button
            onClick={() => changePage(tableData.nextPage)}
            disabled={!tableData.hasNextPage}
            className="h-8 w-8 rounded-lg border border-zinc-800 flex items-center justify-center disabled:text-zinc-800 disabled:pointer-events-none hover:border-zinc-600 hover:cursor-pointer"
          >
            <ChevronRightIcon width="1rem" height="1rem" />
          </button>
        </div>
        <SnackBar info={snackBar} updateInfo={setSnackbar}/>
    </>
  );
}
