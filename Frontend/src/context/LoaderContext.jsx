import React, { createContext, useState } from "react";

export const LoaderContext = createContext();

const LoaderContextProvider = (props) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {props.children}
    </LoaderContext.Provider>
  );
};
export default LoaderContextProvider;
