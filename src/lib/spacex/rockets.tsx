import { Result, ApiResponse, RocketDocs } from "@/types";

const BASE_URL = "https://api.spacexdata.com/v4/rockets";

export async function getAllRockets(): Promise<Result<RocketDocs[], Error>> {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`SpaceX API error: ${response.status}`);
    }
    const data = (await response.json()) as RocketDocs[];
    return { data, ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error as Error,
    };
  }
}
