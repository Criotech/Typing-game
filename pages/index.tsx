import React, { FC, useState, useEffect } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
    sentence
} from 'txtgen'
import GenerateParagraghInput from '@/components/GenerateParagraphInput';
import DurationInput from '@/components/DurationInput';
import styles from '@/pages/index.module.css'

const Welcome: FC = () => {
    const router = useRouter();
    const [paragragh, setParagragh] = useState<string>("");
    const [duration, setDuration] = useState<number>(0);
    const [disableStartBtn, toggleEnableStartBtn] = useState<boolean>(true);

    const generateParagraph = () => {
        const paragragh = sentence();
        setParagragh(paragragh);
    }

    useEffect(() => {
        if (paragragh !== "" && duration !== 0) {
            toggleEnableStartBtn(false);
        } else {
            toggleEnableStartBtn(true);
        }
    }, [disableStartBtn, toggleEnableStartBtn, paragragh, duration])

    const startTest = () => {
        router.push({pathname: '/test', query: { paragragh, duration }})
    }

    return (
        <div>
            <Head>
                <title>Typing App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.container}>
                <h2>Welcome to typing game...</h2>

                <p>Paste paragragh you want to practice below.</p>
                <GenerateParagraghInput paragragh={paragragh} setParagragh={setParagragh} />
                <button onClick={generateParagraph}>Generate Random Paragraph</button>

                <p style={{ marginTop: 30 }}>Select Duration of test</p>
                <DurationInput setDuration={setDuration} />

                <div className={styles.startBtnContainer}>
                    <button onClick={startTest} disabled={disableStartBtn}>Start Test</button>
                </div>
            </main>
        </div>
    )
}

export default Welcome;