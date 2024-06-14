import { FC, ReactNode, createContext, useContext, useState } from "react";
import { loadEnvironmentSettings } from "../utils/EnvironmentSettingsUtil";

type ShowValueContextType = {
  showValue: boolean;
  setShowValue: (value: boolean) => void;
};

const ShowValueContext = createContext({} as ShowValueContextType);

const ShowValueContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [showValue, setShowValue] = useState(loadEnvironmentSettings().showValue);
  return <ShowValueContext.Provider value={{ showValue, setShowValue }}>{children}</ShowValueContext.Provider>;
};

export const useShowValueContext = () => useContext(ShowValueContext);

export default ShowValueContextProvider;
