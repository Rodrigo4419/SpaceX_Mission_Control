import { ApiDocs, RocketDocs } from "@/types";

export function parseDate(dateString: string) {
  try {
    const date = new Date(dateString);

    const formatted = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);

    return formatted;
  } catch (error) {
    return "";
  }
}

function getDate(dateString: string, get: string) {
  const date = new Date(dateString);
  if (get === "year") {
    const formatted = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
    }).format(date);
    return formatted;
  }
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
  return formatted;
}

//I would dynamically set the dates for the last tree years but, the API only has data til 2022
export function formatLineChart(data: ApiDocs[]) {
  let ordered: any = {};
  data.forEach((launch) => {
    const year = getDate(launch.date_utc, "year");
    const month = getDate(launch.date_utc, "month");
    if (!ordered[month]) {
      ordered[month] = {
        "2020": 0,
        "2021": 0,
        "2022": 0,
      };
    }
    ordered[month][year] += 1;
  });
  const result = Object.keys(ordered).map((month) => {
    return {
      name: month,
      2020: ordered[month]["2020"],
      2021: ordered[month]["2021"],
      2022: ordered[month]["2022"],
    };
  });
  return result;
}

//I would dynamically set the dates for the last tree years but, the API only has data til 2022
export function formatBarChart(data: ApiDocs[]) {
  let ordered: any = {};
  data.forEach((launch) => {
    const year = getDate(launch.date_utc, "year");
    if (!ordered[year]) {
      ordered[year] = {
        failed: 0,
        success: 0,
      };
    }
    launch.success === false
      ? (ordered[year]["failed"] += 1)
      : (ordered[year]["success"] += 1);
  });
  const result = Object.keys(ordered).map((yr) => {
    return {
      name: yr,
      success: ordered[yr]["success"],
      failed: ordered[yr]["failed"],
    };
  });
  return result;
}

export function getLaunchData(data: ApiDocs[]) {
  let successful = 0;
  let failed = 0;
if(data){
  for (const item of data) {
    if (item.success === false) {
      failed += 1;
    } else {
      successful += 1;
    }
  }}

  return { successful, failed };
}

export function getActiveRockets(data: RocketDocs[]) {
  let active = 0;
  const total = data ? data.length : 0;
  if(data){
  for (const item of data) {
    if (item.active) {
      active += 1;
    }
  }}
  return { active, total };
}
