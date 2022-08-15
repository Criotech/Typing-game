import React, { FC, useState, useEffect } from 'react';
import styles from './generateParagraghInput.module.css';

interface IProps {
    paragragh: string,
    setParagragh: (value: string) => void
}

const GenerateParagraghInput: FC<IProps> = ({paragragh, setParagragh}) => {
    const [paragraphText, setParagraphText] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${e.target.scrollHeight}px`;
        setParagraphText(e.target.value);
        setParagragh(e.target.value);
    }

    useEffect(() => {
        if (paragragh) {
            setParagraphText(paragragh)
        }
    }, [paragragh])

    return (
        <textarea
            className={styles.generateParagraghInput}
            name="paragraph-input"
            placeholder={"Paste Paragragh here..."}
            onChange={handleChange}
            value={paragraphText}
            autoFocus
        />
    )
}

export default GenerateParagraghInput;

