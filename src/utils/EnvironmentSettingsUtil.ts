export type EnvironmentValues = {
  cellSize: number;
  colors: string[];
  showValue: boolean;
  realTime: boolean;
};

export const defaultEnvironmentValues: EnvironmentValues = {
  cellSize: 50,
  colors: ["#ffffff", "#000000", "#ff4b00", "#fff100", "#03af7a", "#005aff", "#4dc4ff"],
  showValue: false,
  realTime: true,
};

const SETTINGS_KEY = "settings";
const TARGET_ID = "#variableStyle";

export const loadEnvironmentSettings = (): EnvironmentValues => {
  const currentSettings = loadFromStorage();
  reflectEnvironmentSettings(currentSettings, currentSettings);
  return currentSettings;
};

const loadFromStorage = (): EnvironmentValues => {
  const currentSettingsJson = localStorage.getItem(SETTINGS_KEY);
  if (currentSettingsJson) {
    try {
      const currentSettings = JSON.parse(currentSettingsJson) as EnvironmentValues;
      return currentSettings;
    } catch (error) {
      return defaultEnvironmentValues;
    }
  } else {
    return defaultEnvironmentValues;
  }
};

export const saveEnvironmentSettings = (settings: EnvironmentValues): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const reflectEnvironmentSettings = (currentSettings: EnvironmentValues, tempSettings: EnvironmentValues): void => {
  let cssString = `.cell,.row-header-cell,.column-header-cell{--cell-size:${currentSettings.cellSize}px;} .cell-preview,.row-header-cell-preview,.column-header-cell-preview{--cell-size:${tempSettings.cellSize}px;}`;
  const createFormat = (classNamePrefix: string) => (value: string, index: number) => {
    const r = parseInt(value.substring(1, 3), 16);
    const g = parseInt(value.substring(3, 5), 16);
    const b = parseInt(value.substring(5, 7), 16);
    cssString += ` .${classNamePrefix}${index}{--cell-color:${value}; --cell-text-color:${255 * 3 - (r + g + b) * 2 > 0 ? "#ffffff" : "#000000"};}`;
  };

  currentSettings.colors.forEach(createFormat("cell-color-"));
  tempSettings.colors.forEach(createFormat("cell-color-preview-"));

  (document.querySelector(TARGET_ID)! as HTMLStyleElement).innerText = cssString;
};
