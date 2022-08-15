import React, { FC, useState, useEffect } from 'react';
import styles from './durationInput.module.css';

interface IProps {
    setDuration: (seconds: number) => void
}

const DurationInput: FC<IProps> = ({ setDuration }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(Number(e.target.value));
    }

    return (
        <div>
            <input onChange={handleChange} className={styles.durationInput} type="number" list="cars" />
            <datalist id="cars">
                <option key={1} value={1} />
                <option key={2} value={2}/>
                <option key={3} value={3}/>
                <option key={4} value={4} />
                <option key={5} value={5} />
            </datalist>
            <small style={{color: "red"}}>Note time duration is in minutes</small>
        </div>
    )
}

export default DurationInput;

