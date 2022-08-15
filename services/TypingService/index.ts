import { Status, IWords } from "../../types";

const generateParagraph = (paragragh: string): IWords[] => {
    const generatedWords = paragragh.split(" ");
    return generatedWords.map((word) => { return { word, status: Status.Pending }  });
}

const isInputCorrect = (word: string, inputText: string): boolean => {
    return inputText === word.slice(0, inputText.length)
}

const calWPM = (words: IWords[], seconds: number): number => {
    const totalWordsTyped = words.filter(word => word.status !== Status.Pending).length;
    const mins = seconds / 60;
    let speed = ((totalWordsTyped / 5) / mins)

    return Number(speed.toFixed(2));
}

const calAccuracy = (words: IWords[], seconds: number): number => {
    const totalCorrectWordsTyped = words.filter(word => word.status === Status.Right).length;
    const totalWordsTyped = words.filter(word => word.status !== Status.Pending).length;

    let accuracyVal = ((totalCorrectWordsTyped / totalWordsTyped) * 100);

    return Math.round(accuracyVal);
}

const ParagraphService = {
    generateParagraph,
    isInputCorrect,
    calAccuracy,
    calWPM,
}
 
export default ParagraphService;