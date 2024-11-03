import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Container = styled.div`
  background-color: tomato;
  display: flex;
  flex-direction: column;
  align-items: center;`;

const Container__item = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0px;`;

const Title = styled.div`
  font-size: 50px;
  font-weight: 900;
  color: white;
  margin: 50px 0;`;

const ScoreKeeper = styled.div`
  display: flex;
  align-items: center;
  font-size: 90px;
  font-weight: 700;
  color: tomato;
  > div:first-child, 
  > div:last-child {
    background-color: white;
    height: 250px;
    width: 160px;
    border-radius: 10px;
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 10px;
    div {
      background-color: rgba(255, 255, 255, 0.5);
      height: 12px;
      width: 12px;
      border-radius: 6px;
    }
  }`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  margin: 0 5px; 
  display: flex;
  align-items:center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  svg {
    width: 30px;
    height: 30px;
    color: white;
    outline: none;
  }`;

const Memo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin: 0px 40px;
  font-weight: 700;
  color: white;
  div:first-child {
    opacity: 0.7;
  }`;

const START_MINUTES = 25;
const START_SECOND = 0;

export default function App() {
  const [currentMinutes, setMinutes] = useState(START_MINUTES);
  const [currentSeconds, setSeconds] = useState(START_SECOND);
  const [isStop, setIsStop] = useState(false);
  const [duration, setDuration] = useState<number>();
  const [isRunning, setIsRunning] = useState(false);
  const [goal, setGoal] = useState(0);
  const [round, setRound] = useState(0);

  const startHandler = () => {
    setDuration(START_SECOND + 60 * START_MINUTES);
    setIsRunning(true);
  };
  const stopHandler = () => {
    setIsStop(true);
    setIsRunning(false);
  };
  const resetHandler = () => {
    setMinutes(START_MINUTES);
    setSeconds(START_SECOND);
    setIsRunning(false);
    setIsStop(false);
  };
  const resumeHandler = () => {
    setDuration(currentMinutes * 60 + currentSeconds);
    setIsRunning(true);
    setIsStop(false);
  };
  const resetGoalAndRound = () => {
    setGoal(0);
    setRound(0);
  };

  useEffect(() => {
    if (isRunning === true) {
      let timer: any = duration;
      const interval = setInterval(() => {
        if (--timer <= 0) {
          setRound((prev) => {
            if (prev < 3) {
              return prev + 1;
            } else {
              setGoal((prevGoal) => prevGoal + 1);
              return 0;
            }
          });
          resetHandler();
        } else {
          setMinutes(Math.floor(timer / 60));
          setSeconds(timer % 60);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);
  return (
    <Container>
      <Title>Pomodoro</Title>
      <Container__item>
        <ScoreKeeper>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMinutes}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2, type: 'spring', bounce: 0.5 }}
            >
              {currentMinutes < 10 ? '0' + currentMinutes : currentMinutes}
            </motion.div>
          </AnimatePresence>
          <div>
            <div />
            <div />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSeconds}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{
                duration: 0.2,
                type: 'spring',
                bounce: 0.5,
              }}
            >
              {currentSeconds < 10 ? '0' + currentSeconds : currentSeconds}
            </motion.div>
          </AnimatePresence>
        </ScoreKeeper>
      </Container__item>
      <Container__item>
        {!isRunning && !isStop && (
          <Button onClick={startHandler} disabled={goal == 12}>
            <motion.svg
              layoutId="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </motion.svg>
          </Button>
        )}
        {isRunning && (
          <Button onClick={stopHandler}>
            <motion.svg
              layoutId="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                clipRule="evenodd"
              />
            </motion.svg>
          </Button>
        )}
        {isStop && (
          <Button onClick={resumeHandler}>
            <motion.svg
              layoutId="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </motion.svg>
          </Button>
        )}
        <Button
          onClick={() => {
            resetHandler();
            resetGoalAndRound();
          }}
        >
          <motion.svg
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
              clipRule="evenodd"
            />
          </motion.svg>
        </Button>
      </Container__item>
      <Container__item>
        <Memo>
          <div>{round}/4</div>
          <div>ROUND</div>
        </Memo>
        <Memo>
          <div>{goal}/12</div>
          <div>GOAL</div>
        </Memo>
      </Container__item>
    </Container>
  );
}
