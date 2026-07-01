import { Button } from "@/components/ui/button";

export const IceBreakerRevealButton = ({ handleClick, show, ...props }) => {
  return (
    <Button
      type="button"
      variant="secondary"
      // data-testid="icebreaker-reveal-btn"
      // className={styles.revealBtn}
      onClick={handleClick}
      {...props}
    >
      {show ? "Hide the icebreakers 🧊 " : "Show me the icebreakers! 🧊 "}
    </Button>
  );
};
