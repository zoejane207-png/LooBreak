import { useState } from "react";
import { IceBreakerRevealButton } from "./icebreakerButton";
import { getIcebreaker } from "../services/icebreaker";
import styles from "./icebreaker.module.css";

export default function Icebreaker () {
    const [icebreaker, setIcebreaker] = useState(null);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    
    const handleClick = async () => {
        console.log("Button clicked!");
        if (show) {
            setShow(false)
        } else {
            try {
                const icebreakerData = await getIcebreaker();
                console.log("Data received:", icebreakerData);  
                setIcebreaker(icebreakerData.iceBreaker);
                setShow(!show);
                setError(null);
            } catch (err) {
                console.error("Could not fetch icebreaker:", err);
                setError("Could not fetch icebreaker");
            }
        }
    };
    return (
        <div className={styles.container} data-testid="icebreaker-component">
            <IceBreakerRevealButton 
            show={show}
            handleClick={handleClick} />
            {error && <p>{error}</p>}

            {icebreaker && show && (
                <div style={{ marginTop: "1rem" }}>
                    <p className={styles.icebreakerText}>{icebreaker.icebreaker}</p>
                </div>
            )}
        </div>
    );
}