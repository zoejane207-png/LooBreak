import { useState } from "react";
import { LooTipsRevealButton } from "./lootipsButton";
import { getLootip } from "../services/lootips";
import styles from "./lootips.module.css";

export default function LooTips() {
  const [lootip, setLootip] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = async () => {
    console.log("Button clicked!");
    if (show) {
      setShow(false);
    } else {
      try {
        const lootipData = await getLootip();
        console.log("Data received:", lootipData);
        setLootip(lootipData.looTip);
        setShow(!show);
      } catch (err) {
        console.error("Could not fetch lootip:", err);
      }
    }
  };
  return (
    <div className={styles.container} data-testid="lootips-component">
      <LooTipsRevealButton show={show} handleClick={handleClick} />
      {lootip && show && (
        <div style={{ marginTop: "1rem" }}>
          <p className={styles.lootip}>{lootip.lootip}</p>
        </div>
      )}
    </div>
  );
}
