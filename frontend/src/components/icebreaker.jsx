import { useState } from "react";
import { IceBreakerRevealButton } from "./icebreakerButton";
import { getIcebreaker } from "../services/icebreaker";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./icebreaker.module.css";

// Co-located with the revealed list below; mirrors its shell — the same
// top margin and centered column the real `.icebreakerText` lines render in.
function IcebreakerSkeleton() {
  return (
    <div
      data-testid="icebreaker-skeleton"
      className="mt-4 flex flex-col items-center gap-3"
    >
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

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

      {loading && <IcebreakerSkeleton />}

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
