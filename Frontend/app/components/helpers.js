export const userId = 2;

export const colors = {
  lavender: "#CDADFF",
  lowSatLavender: "#b3b3cc",
  lightLavender: "#dfdfe8",
  pink: "#ffb3cc",
  mintGreen: "#a6ffcb",
  accent: "#ff9c6e",
  darkAccent: "#e06931",
  lightAccent: "#ffc4a8",
  background: "#f7f7fc",
  darkGray: "#333333",
  boardColors: {
    lavender: "#e3e4f2",
    salmon: "#f2e3e3",
    green: "#edf2e3",
    blue: "#e3eff2",
    violet: "#eae3f2",
    pink: "#f2e3ef",
  },
  palette: {
    primary: {
      main: "#ff9c6e",
      light: "#ffc4a8",
      dark: "#e06931",
      contrastText: "#fff",
    },
    secondary: {
      main: "#CDADFF",
      light: "#dfdfe8",
      dark: "#b3b3cc",
      contrastText: "#fff",
    },
  },
};

export function id() {
  const min = 1,
    max = 10000;
  return Math.floor(Math.random() * (max - min) + min);
}
