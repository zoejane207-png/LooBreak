import styles from "./icebreaker.module.css";

export const IceBreakerRevealButton = ({ handleClick, show }) => {

    return (
        <button 
        data-testid="icebreaker-reveal-btn"
        className={styles.revealBtn} 
        onClick={handleClick}>
            {show ? "Hide the icebreakers 🧊 " : "Show me the icebreakers! 🧊 "}
        </button>
    );
};