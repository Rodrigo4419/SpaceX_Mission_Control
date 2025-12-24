export type SVGProps = {
  height: string;
  width: string;
  color?: string;
  className?: string;
};

export type LinksDocs={
flickr: {
small: string[];
original: string[]
},
presskit: string;
webcast: string;
youtube_id: string;
article: string;
wikipedia: string;
meta?: Record<string, unknown>;
}

export type RocketDocs = {
  id: string;
  active: boolean;
  cost_per_launch: number;
  description: string;
  first_flight: string;
  success_rate: number;
  name: string;
  type: string;
  company: string;
  flickr_images: string[];
  meta?: Record<string, unknown>;
};

export type LaunchpadDocs = {
  name: string;
  full_name: string;
  locality: string;
  region: string;
  status: string;
  details: string;
  images: {
    large: string[];
  };
};

export type ApiDocs = {
  id: string;
  name: string;
  date_utc: string;
  details:string;
  success: boolean | undefined;
  flight_number: number;
  rocket: RocketDocs;
  launchpad: LaunchpadDocs;
  links:LinksDocs,
  meta?: Record<string, unknown>;
};

export type ApiResponse = {
  docs: ApiDocs[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  offset: number;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

export type TSnackBar = {
  active: boolean;
  message: string;
  title: string;
  type: "warning" | "error" | "success" | "neutral" | "";
};

export type Success<T> = {
  ok: true;
  data: T;
};

export type Failure<E> = {
  ok: false;
  error: E;
};

export type Result<ApiResponse, E> = Success<ApiResponse> | Failure<E>;
