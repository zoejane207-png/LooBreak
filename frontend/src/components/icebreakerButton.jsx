import styles from "./icebreaker.module.css";

export const IceBreakerRevealButton = ({ handleClick, show }) => {

    return (
        // <>
        <button className={styles.revealBtn} onClick={handleClick}>
            {show ? "Hide the icebreaker" : "Show me an icebreaker!"}
        </button>
        // </>
    );
};