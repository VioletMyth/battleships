import React from "react";
import styles from "./ShipCounter.module.css";
import carrierShape from "../../assets/carrierShape.png";
import battleshipShape from "../../assets/battleshipShape.png";
import cruiserShape from "../../assets/cruiserShape.png";
import destroyerShape from "../../assets/destroyerShape.png";
import submarineShape from "../../assets/submarineShape.png";
import missSmall from "../../assets/missSmall.png";
import hitSmall from "../../assets/hitSmall.png";
import { ShipType } from "../../enums/shipType";

export default function ShipCounter({ shipType, hitData }) {
  const { shipImage, shipContainer, hitIndicator } = styles;

  const shipRenderer = (type) => {
    switch (type) {
      case ShipType.DESTROYER:
        return (
          <img className={shipImage} src={destroyerShape} alt="destroyer" />
        );
      case ShipType.CRUISER:
        return <img className={shipImage} src={cruiserShape} alt="cruiser" />;
      case ShipType.CARRIER:
        return <img className={shipImage} src={carrierShape} alt="carrier" />;
      case ShipType.SUBMARINE:
        return (
          <img className={shipImage} src={submarineShape} alt="submarine" />
        );
      case ShipType.BATTLESHIP:
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
      {hitData.map((isHit, i) =>
        isHit ? (
          <img className={hitIndicator} src={hitSmall} alt="hit" key={i} />
        ) : (
          <img className={hitIndicator} src={missSmall} alt="miss" key={i} />
        )
      )}
    </div>
  );
}
