import React, { FC } from "react";
import './Card.css'

export type CardInfo = {
  title: string,
  content: string,
}

export const Card: FC<CardInfo> = (props) => {
  return (
    <>
      <div className="card">
        <h1 className="card-title">{props.title}</h1>
        <p className="card-content">{props.content}</p>
      </div>
    </>
  );
}