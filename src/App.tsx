import { createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import "./App.css";
import { MenuBar } from "./components/menu-bar/MenuBar";
import { PageRouter } from "./components/menu-bar/PageRouter";
import { pages } from "./pages/Pages";

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <MenuBar pages={pages}>
        <PageRouter pageInfos={pages} />
      </MenuBar>
    </ThemeProvider>
  );
};

export default App;
