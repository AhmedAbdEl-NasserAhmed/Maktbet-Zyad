import { HttpDataStatus } from "../constants";

export interface HttpInitialState<T> {
  isLoading: boolean;
  error: string | null;
  data: T[];
}
export interface FetchData {
  type: HttpDataStatus.FETCHING;
}

export interface SuccessFetchData {
  type: HttpDataStatus.SUCCESS;
  payload: { data: (string | number)[] };
}

export interface FailedFetchData {
  type: HttpDataStatus.ERROR;
  payload: { error: string };
}
