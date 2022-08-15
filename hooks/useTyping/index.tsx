import { useCallback, useState, useEffect } from "react";
import TypingService from "services/TypingService";
import { Status, IWords } from "../../types";

interface IUseTyping {
    generateParagraph: (paragragh: string) => IWords[],
    isInputTextCorrect: (inputText: string) => void;
    toNextIndex: (currentWord: string) => void;
    currentIndex: number;
    words: IWords[];
    currentWordStatus: Status;
    calResult: (secondsTaken: number) => void;
    result: any;
}

export const useTyping = (): IUseTyping => {
    const [words, setWords] = useState<IWords[]>([{
        "word": "Hello",
        "status": Status.Pending
    }]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentWordStatus, setCurrentWordStatus] = useState<Status>(Status.Pending);
    const [result, setResult] = useState<any>({ grossWPM: 0, netSpeed: 0, accuracy: 0 })


    const generateParagraph = useCallback((paragragh: string) => {
        const generatedWords = TypingService.generateParagraph(paragragh);
        setWords(generatedWords);
        return generatedWords;
    }, [])

    const updateWordStatus = (status: Status, index: number): void => {
        const paragraph = words;

        paragraph[index].status = status;

        setWords([...paragraph]);
    }

    const isInputTextCorrect = useCallback((inputText: string) => {
        const currentWord = words[currentIndex]?.word;
        const status = TypingService.isInputCorrect(currentWord, inputText);

        if (status === false) {
            setCurrentWordStatus(Status.Wrong)
        } else {
            setCurrentWordStatus(Status.Right);
        }

    }, [words, currentIndex, setCurrentWordStatus, TypingService.isInputCorrect]);

    const toNextIndex = useCallback((inputText: string) => {
        if (inputText === words[currentIndex].word) {
            updateWordStatus(Status.Right, currentIndex);
        } else {
            updateWordStatus(Status.Wrong, currentIndex);
        }

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setCurrentWordStatus(Status.Pending)

    }, [updateWordStatus, setCurrentIndex, currentIndex]);

    const calResult = useCallback((secondsTaken: number) => {
        const netSpeed = TypingService.calWPM(words, secondsTaken);
        const accuracy = TypingService.calAccuracy(words, secondsTaken);

        setResult({ netSpeed, accuracy })
    }, [words, TypingService])


    return {
        isInputTextCorrect,
        generateParagraph,
        toNextIndex,
        currentIndex,
        words,
        currentWordStatus,
        calResult,
        result,
    }
}

