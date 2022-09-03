import { FC } from "react";
import { slide as Menu } from "react-burger-menu";
import "./MenuBar.css"
import { pages } from "../../pages/Pages";

export const MenuBar: FC = () => {
  return (
    <Menu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
      {pages.map((page) => {
        return (
          <a key={page.path} className="menu-item" href={`#/${page.path}`}>
            {page.title}
          </a>
        );
      })}
    </Menu>
  );
};
