import { useState } from "react";
import { IceBreakerRevealButton } from "./icebreakerButton";
import { getIcebreaker } from "../services/icebreaker";
import styles from "./icebreaker.module.css";

export default function Icebreaker () {
    const [icebreakers, setIcebreakers] = useState([]);
    const [show, setShow] = useState(false);
    const [error, setError] = useState(null);
    
    const handleClick = async () => {
        if (show) {
            setShow(false)
        } else {
            try {
                const icebreakerData = await getIcebreaker();
                setIcebreakers(icebreakerData.iceBreakers);
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

            {show && icebreakers.length > 0 && (
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