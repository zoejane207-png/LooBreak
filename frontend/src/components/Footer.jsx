import { useState, useEffect } from "react";
import { getLootip } from "../services/lootips";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./Footer.module.css";
import flushLong from "../assets/loobreak-flush-long.svg";
import flushTall from "../assets/loobreak-flush-tall.svg";

// Keep in sync with the lootipFlushDown duration in Footer.module.css so the
// fetch and the swirl-away animation finish together.
const FLUSH_MS = 600;

export default function Footer() {
  const [lootip, setLootip] = useState(null);
  const [phase, setPhase] = useState("idle"); // "idle" | "flush" | "fill"
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getLootip()
      .then((data) => setLootip(data.looTip))
      .catch((err) => console.error("Could not fetch loo tip:", err));
  }, []);

  const handleFlush = async () => {
    if (busy || !lootip) return;
    setBusy(true);
    setPhase("flush"); // swirl the current tip away

    // Fetch the next tip while the flush animation plays; wait for both so the
    // new text only swirls back in once it's actually retrieved.
    const [data] = await Promise.all([
      getLootip().catch((err) => {
        console.error("Could not fetch loo tip:", err);
        return null;
      }),
      new Promise((resolve) => setTimeout(resolve, FLUSH_MS)),
    ]);

    if (data) setLootip(data.looTip);
    setPhase("fill"); // reverse animation brings the new tip back up
    setBusy(false);
  };

  // Reset to idle once the reverse animation has finished (no-op under
  // prefers-reduced-motion, where the button is already re-enabled via `busy`).
  const handleAnimationEnd = () => {
    if (phase === "fill") setPhase("idle");
  };

  const tipTextClass = [
    styles.tipText,
    phase === "flush" && styles.flushing,
    phase === "fill" && styles.filling,
  ]
    .filter(Boolean)
    .join(" ");

  // Swap to the "tall" flush graphic mid-flush to sell the swirl; the wider
  // "long" graphic is the resting state.
  const flushSrc = phase === "flush" ? flushTall : flushLong;

  return (
    <footer
      className={styles.banner}
      data-testid="lootip-banner"
      aria-label="Loo tip of the day"
    >
      <span className={styles.label}>💡 Loo tip: </span>
      <span className={styles.tip} aria-live="polite">
        {lootip ? (
          <span className={tipTextClass} onAnimationEnd={handleAnimationEnd}>
            {lootip.lootip}
          </span>
        ) : (
          <Skeleton
            data-testid="lootip-skeleton"
            className="inline-block h-4 w-48 max-w-full align-middle"
          />
        )}
      </span>
      <button
        type="button"
        className={styles.flushButton}
        onClick={handleFlush}
        disabled={busy || !lootip}
        aria-label="Flush for a new loo tip"
        data-testid="lootip-flush"
      >
        <img src={flushSrc} alt="" className={styles.flushImg} />
      </button>
    </footer>
  );
}
