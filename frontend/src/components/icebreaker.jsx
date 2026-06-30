import { useState } from "react";
import { IceBreakerRevealButton } from "./icebreakerButton";
import { getIcebreaker } from "../services/icebreaker";
import styles from "./icebreaker.module.css";

export default function Icebreaker() {
  const [icebreakers, setIcebreakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (show) {
      setShow(false);
    } else {
      setLoading(true);
      setError(null);
      try {
        const icebreakerData = await getIcebreaker();
        setIcebreakers(icebreakerData.iceBreakers);
        setShow(true);
        // setError(null);
      } catch (err) {
        console.error("Could not fetch icebreaker:", err);
        setError("Could not fetch icebreaker");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className={styles.container} data-testid="icebreaker-component">
      <IceBreakerRevealButton show={show} handleClick={handleClick} />

      {loading && <p>Icebreakers loading...</p>}

      {error && <p>{error}</p>}

      {show && !loading && icebreakers.length > 0 && (
        <div style={{ marginTop: "1rem" }} data-testid="icebreaker-list">
          {icebreakers.map((item) => (
            <p key={item._id} className={styles.icebreakerText}>
              {item.icebreaker}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
