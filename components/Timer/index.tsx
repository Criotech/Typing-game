import React, {FC} from 'react'
import styles from "./timer.module.css";


const Timer:FC<any> = ({seconds})=> {
    const formatDigit = (number: number) => `0${number}`.slice(-2);

    const getRemainingTime = (seconds: number) => {
        const remainingMinutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds - remainingMinutes * 60;
        return `${formatDigit(remainingMinutes)}:${formatDigit(remainingSeconds)}`
    };

    return (
        <div className={styles.timerContainer}>
            <p className={styles.timer}>{getRemainingTime(seconds)}</p>
        </div>
    )
}

export default Timer