export const LooTipsRevealButton = ({ handleClick, show }) => {
  return (
    // <>
    <button onClick={handleClick}>
      {show ? "Hide the lootip" : "Show me a lootip!"}
    </button>
    // </>
  );
};
