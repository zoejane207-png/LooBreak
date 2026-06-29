import { useState, useEffect } from "react";
import { getLootip } from "../services/lootips";
import styles from "./Footer.module.css";

export default function Footer() {
  const [lootip, setLootip] = useState(null);

  useEffect(() => {
    getLootip()
      .then((data) => setLootip(data.looTip))
      .catch((err) => console.error("Could not fetch loo tip:", err));
  }, []);

  return (
    <footer
      className={styles.banner}
      data-testid="lootip-banner"
      aria-label="Loo tip of the day"
    >
      <span className={styles.label}>💡 Loo tip of the day: </span>
      <span className={styles.tip} aria-live="polite">
        {lootip ? lootip.lootip : "Loading today's loo tip…"}
      </span>
    </footer>
  );
}
