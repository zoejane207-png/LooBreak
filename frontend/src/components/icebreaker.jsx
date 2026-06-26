import { useState } from "react";
import { IceBreakerRevealButton } from "./icebreakerButton";
import { getIcebreaker } from "../services/icebreaker";
import styles from "./icebreaker.module.css";

export default function Icebreaker () {
    const [icebreaker, setIcebreaker] = useState(null);
    const [show, setShow] = useState(false);
    
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
            } catch (err) {
                console.error("Could not fetch icebreaker:", err);
            }
        }
    };
    return (
        <div className={styles.container}>
            <IceBreakerRevealButton 
            show={show}
            handleClick={handleClick} />
            {icebreaker && show && (
                <div style={{ marginTop: "1rem" }}>
                    <p className={styles.icebreaker}>{icebreaker.icebreaker}</p>
                </div>
            )}
        </div>
    );
}