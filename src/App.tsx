import { FC } from "react";
import "./App.css";
import { MenuBar } from "./components/menu-bar/MenuBar";
import { MenuBarr } from "./components/menu-bar/MenuBarr";
import { PageRouter } from "./components/menu-bar/PageRouter";
import { pages } from "./pages/Pages";

export const App: FC = () => {
  return (
    <MenuBarr pages={pages}>
      <PageRouter pageInfos={pages}/>
    </MenuBarr>
    // <div className="App" id="outer-container">
    //   <MenuBar />
    //   <div id="page-wrap">
    //     <PageRouter pageInfos={pages}/>
    //   </div>
    // </div>
  );
};

export default App;
