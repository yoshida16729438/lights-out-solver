import { FC, ReactNode, createContext, useContext, useState } from "react";
import { loadEnvironmentSettings } from "../utils/EnvironmentSettingsUtil";

type RealTimeContextType = {
  realTime: boolean;
  setRealTime: (value: boolean) => void;
};

const RealTimeContext = createContext({} as RealTimeContextType);

const RealTimeContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [realTime, setRealTime] = useState(loadEnvironmentSettings().realTime);
  return <RealTimeContext.Provider value={{ realTime, setRealTime }}>{children}</RealTimeContext.Provider>;
};

export const useRealTimeContext = () => useContext(RealTimeContext);

export default RealTimeContextProvider;
