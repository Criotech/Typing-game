import React, { FC, useState} from 'react';
import styles from './input.module.css';

interface IProps {
    name: string;
    value: string;
    placeholder: string;
    toNextIndex: (text: string) => void;
    isInputTextCorrect: (text: string) => void;
}

const Input: FC<IProps> = ({
    name,
    toNextIndex,
    isInputTextCorrect,
    placeholder,
}) => {
    const [text, setText] = useState<string>("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        if (e.target.value[e.target.value.length - 1] === " ") {
            setText("");
            toNextIndex(text);
          } else {
            isInputTextCorrect(e.target.value);
            setText(e.target.value);
          }
    }

    
    return (
            <input
                id={name}
                className={styles.input}
                type="text"
                name={name}
                value={text}
                onChange={handleChange}
                placeholder={placeholder} />
    )
}

export default Input