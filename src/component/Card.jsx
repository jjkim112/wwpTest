import { useState } from "react";
import CardSetDialog from "./CardSetDialog";
import basic from "../utils/basic.json";

const Card = (props) => {
  return (
    <div className="disable-blur">
      <img
        className="object-cover"
        src={getCardImgRoute(props.card)}
        alt="card"
        width={props.width ?? "100px"}
        height={props.height ?? "150px"}
      />
    </div>
  );
};

const getCardImgRoute = (value) => {
  try {
    const shape = value.charAt(0);
    const num = value.charAt(1);

    if (basic.shapeList.includes(shape) && basic.numList.includes(num)) {
      return `/assets/images/card/${shape}${num}.png`;
    }
    return "/assets/images/card/empty.png";
  } catch (e) {
    console.log(e);
    return "/assets/images/card/empty.png";
  }
};

export default Card;
