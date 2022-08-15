import { useTimer } from "hooks/useTimer.ts";

export const useCountdown = (
	initialTimeInSeconds: number = 5 * 60
) => {
	const { time: timeInMs, reset: resetCountDown, stopTimer: stopCountDown, startTimer: startCountDown } = useTimer();

	const timeInSeconds = Math.floor(timeInMs);

	const seconds = initialTimeInSeconds - timeInSeconds;

	return { seconds: Math.max(seconds, 0), resetCountDown, stopCountDown, startCountDown};
};