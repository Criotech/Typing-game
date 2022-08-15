import React, { FC } from 'react'
import styles from './paragraph.module.css'
import { IWords, Status } from "../../types";

interface IProps {
    words: IWords[];
    currentIndex: number,
    currentWordStatus: Status,
}

const Paragraph: FC<IProps> = ({ words, currentIndex, currentWordStatus }) => {
    const getCurrentWordBg = (): string => {
        let bg = "#dddddd";
        if (currentWordStatus === Status.Right || currentWordStatus === Status.Pending) {
            bg = "#dddddd"
        } else {
            bg = "red"
        }
        return bg;
    }

    const getWordColor = (wordStatus: string): string => {
        let color = "#000000";
        if (wordStatus === Status.Right) {
            color = "green"
        } else if (wordStatus === Status.Pending) {
            color = "#000000"
        } else if (wordStatus === Status.Wrong) {
            color = "red"
        }
        return color;
    }

    return (
        <div className={styles.card}>
            {
                words.map((item, i) => {
                    return <span
                    className={styles.word}
                        style={{
                            backgroundColor: (currentIndex === i) ? getCurrentWordBg() : 'transparent',
                            color: (currentIndex === i) ? '#000' : getWordColor(item.status)
                        }} key={i}>
                        {item.word}
                    </span>
                })
            }
        </div>
    )
}

export default Paragraph