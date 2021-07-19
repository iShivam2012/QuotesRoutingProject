import { useReducer } from "react";

const reducerFunc = (state, action) => {
  if (action.type === "SEND") {
    return {
      ...state,
      status: "Pending",
    };
  } else if (action.type === "ERROR") {
    return {
      ...state,
      error: action.payload,
      status: "Completed",
    };
  } else if (action.type === "SUCCESS") {
    return {
      ...state,
      data: action.payload,
      status: "Completed",
    };
  }
  return state;
};

const useHttp = (reqData, applyData, startWithPending = false) => {
  const [state, actionDispatch] = useReducer(reducerFunc, {
    data: null,
    error: null,
    status: startWithPending ? "Pending" : null,
  });
  const sendRequest = async (body) => {
    actionDispatch({
      type: "SEND",
    });

    try {
      const response = await fetch(reqData.url, {
        method: reqData.method ? reqData.method : "GET",
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await response.json();
      const resp = await applyData(responseData, reqData.param);
      actionDispatch({
        type: "SUCCESS",
        payload: resp,
      });
    } catch (error) {
      actionDispatch({
        type: "ERROR",
        payload: error.message || "Error",
      });
    }
  };

  return { sendRequest, ...state };
};

export default useHttp;
