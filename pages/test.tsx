import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Input from '@/components/Input';
import Paragraph from '@/components/Paragraph';
import Timer from '@/components/Timer';
import { useCountdown } from 'hooks/useCountdown';
import { useTyping } from 'hooks/useTyping';
import styles from '@/pages/index.module.css'

export default function Home() {
  const router = useRouter();
  const { paragragh, duration } = router.query as { paragragh: string, duration: string };
  const { seconds, stopCountDown } = useCountdown(Number(duration) * 60);

  const {
    isInputTextCorrect,
    generateParagraph,
    toNextIndex,
    currentIndex,
    words,
    currentWordStatus,
    calResult,
    result,
  } = useTyping();

  const [text, setText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const calculateResult = (timeused: number) => {
    calResult(timeused);
    stopCountDown();
  }

  useEffect(() => {
    generateParagraph(paragragh);
  }, []);

  useEffect(() => {
      if (seconds === 0) {
        calculateResult(Number(duration) * 60 - seconds)
        setShowResult(true);
      }
  }, [seconds, calResult]);

  useEffect(() => {
      if (currentIndex === words.length) {
        console.log('hello', currentIndex, words.length)
        calculateResult(Number(duration) * 60 - seconds);
        setShowResult(true);
      }
  }, [words, currentIndex])

  return (
    <div className={styles.container}>
      <Head>
        <title>Typing App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='contaianer'>
        <div>
          {
            showResult ?
              <div className={styles.card}>
                <h1>Result</h1>
                <ul>
                  <li>Net Speed: {result.netSpeed} (WPM)</li>
                  <li>Accuracy: {result.accuracy} %</li>
                </ul>
                <div className={styles.tryAgainBtnContainer}>
                <button onClick={() => router.push('/')}>Try again</button>
                  </div>
              </div>
              :
              (<div>
                <Timer seconds={seconds} />
                <Paragraph words={words} currentIndex={currentIndex} currentWordStatus={currentWordStatus} />
                <Input value={text} name="text-input" placeholder={"Start Typing!"} toNextIndex={toNextIndex} isInputTextCorrect={isInputTextCorrect} />
              </div>)
          }


        </div>

      </main>

    </div>
  )
}
