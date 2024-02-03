import { useCallback, useReducer } from "react";
import { HttpDataStatus } from "../constants";
import { ActionType } from "../types";
import {
  DeleteRequestData,
  SendRequestData,
  UpdateRequestData,
} from "../interfaces";

interface InitialState {
  isLoading: boolean;
  error: null | string;
  data: any;
}

const initialState: InitialState = {
  isLoading: false,
  error: null,
  data: [],
};

//prettier-ignore
const reducerFn = (state: InitialState = initialState, action: ActionType) => {
  if(action.type === HttpDataStatus.FETCHING) {
    return {...state, isLoading: true}
  }
  if(action.type === HttpDataStatus.SUCCESS) {
    return {...state, isLoading: false, data: action.payload.data}
  }
  if(action.type === HttpDataStatus.ERROR) {
    return {...state, error: action.payload.error}
  }
  return state;
};

const useHttp = (requestData: Function) => {
  const [httpData, dispatch] = useReducer(reducerFn, initialState);

  const sendHttpRequest = useCallback(
    async (
      queryData: SendRequestData | UpdateRequestData | DeleteRequestData
    ) => {
      try {
        //prettier-ignore
        dispatch({ type: HttpDataStatus.FETCHING});
        const data = await requestData(queryData);
        //prettier-ignore
        dispatch({ type: HttpDataStatus.SUCCESS, payload: { data: data } });
      } catch (err: any) {
        //prettier-ignore
        dispatch({ type: HttpDataStatus.ERROR, payload: { error: err.msg } });
      }
    },
    [requestData]
  );

  return {
    isLoading: httpData.isLoading,
    data: httpData.data,
    error: httpData.error,
    sendHttpRequest,
  };
};

export default useHttp;
