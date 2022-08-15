import { useCallback, useEffect, useState } from "react";

export const useTimer = (interval: number = 1000) => {
	const [counter, setCounter] = useState(0);
	const [timerRunning, toggleTimer] = useState<boolean>(true);

	const forceRender = useCallback(
		() => setCounter(counter + 1),
		[setCounter, counter]
	);

	useEffect(() => {
		if (timerRunning) {
			const intervalId = setInterval(forceRender, interval);

			return () => {
				clearInterval(intervalId);
			};
		}
	});

	const startTimer = useCallback(() => {
		toggleTimer(true);
	}, [toggleTimer, timerRunning]);

	const stopTimer = useCallback(() => {
		toggleTimer(false);
	}, [toggleTimer, timerRunning]);

	const reset = useCallback(() => {
		setCounter(0);
		toggleTimer(false);
	}, [setCounter, toggleTimer]);

	return { time: counter, reset, startTimer, stopTimer };
};
