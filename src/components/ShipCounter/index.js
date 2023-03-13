import React from "react";
import styles from "./ShipCounter.module.css";
import carrierShape from "../../assets/carrierShape.png";
import battleshipShape from "../../assets/battleshipShape.png";
import cruiserShape from "../../assets/cruiserShape.png";
import destroyerShape from "../../assets/destroyerShape.png";
import submarineShape from "../../assets/submarineShape.png";
import missSmall from "../../assets/missSmall.png";
import hitSmall from "../../assets/hitSmall.png";
import { ShipType } from "../../shipType";

export default function ShipCounter({ shipType, hitData }) {
  const { shipImage, shipContainer, hitIndicator } = styles;
  console.log(shipType);

  const shipRenderer = (type) => {
    switch (type) {
      case ShipType.Destroyer:
        return (
          <img className={shipImage} src={destroyerShape} alt="destroyer" />
        );
      case ShipType.Cruiser:
        return <img className={shipImage} src={cruiserShape} alt="cruiser" />;
      case ShipType.Carrier:
        return <img className={shipImage} src={carrierShape} alt="carrier" />;
      case ShipType.Submarine:
        return (
          <img className={shipImage} src={submarineShape} alt="submarine" />
        );
      case ShipType.Battleship:
        return (
          <img className={shipImage} src={battleshipShape} alt="battleship" />
        );
      default:
        break;
    }
  };

  return (
    <div className={shipContainer}>
      {shipRenderer(shipType)}
      {hitData.map((isHit) =>
        isHit ? (
          <img className={hitIndicator} src={hitSmall} alt="hit" />
        ) : (
          <img className={hitIndicator} src={missSmall} alt="miss" />
        )
      )}
    </div>
  );
}
