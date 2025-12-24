import { Result, ApiResponse, ApiDocs } from "@/types";

const BASE_URL = "https://api.spacexdata.com/v5/launches";

export async function getAllLaunches():Promise<Result<ApiDocs[], Error>> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.status}`);
    }
    const data = await response.json() as ApiDocs[];
    return { data, ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}

export async function getLineChartsData():Promise<Result<ApiDocs[], Error>> {
  const body = {
    query: {
      date_utc: {
        $gte: "2020-01-01T00:00:00.000Z",
        $lte: "2022-12-31T00:00:00.000Z",
      },
    },
    options: {
      pagination: false,
      sort: {
        date_utc: "asc",
      },
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.status}`);
    }
    const {docs} =await response.json() as ApiResponse;
    return { data:docs as ApiDocs[], ok: true };
  } catch (error) {
    //console.error(error);
    return {
      ok: false,
      error: error as Error,
    };
  }
}

export async function getBarChartData():Promise<Result<ApiDocs[], Error>> {
  const body = {
    query: {
      date_utc: {
        $gte: "2016-01-01T00:00:00.000Z",
        $lte: "2022-12-31T00:00:00.000Z",
      },
    },
    options: {
      pagination: false,
      sort: {
        date_utc: "asc",
      },
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.status}`);
    }
    const {docs} =await response.json() as ApiResponse;
    return { data:docs as ApiDocs[], ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}

export async function getPaginatedLaunches(
  page?: number,
  query?: any,
  sort?: any
): Promise<Result<ApiResponse, Error>> {
  const body = {
    query: query ? query : {},
    options: {
      limit: 20,
      page: page ? page : 1,
      populate: ["rocket", "launchpad"],
      sort: sort
        ? sort
        : {
            date_utc: "desc",
          },
    },
  };
  try {
    const response = await fetch(`${BASE_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.status}`);
    }
    const data =await response.json() as ApiResponse;
    return { data, ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
