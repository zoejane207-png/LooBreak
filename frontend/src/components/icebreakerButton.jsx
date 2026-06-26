export const IceBreakerRevealButton = ({ handleClick, show }) => {

    return (
        // <>
        <button onClick={handleClick}>
            {show ? "Hide the icebreaker" : "Show me an icebreaker!"}
        </button>
        // </>
    );
};