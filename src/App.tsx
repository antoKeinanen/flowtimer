import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Time } from "./types/time";
import { TimerMode } from "./types/mode";
import Clock from "./components/Clock";
import Controls from "./components/Controls";
import { calculateBreakLength } from "./util/calculateTime";
import { askNotificationPermission } from "./util/handlePermissions";
import endSound from "./assets/end.mp3";
import UIFx from "uifx";

function App() {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [displayTime, setDisplayTime] = useState<Time>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerMode, setTimerMode] = useState<TimerMode>(TimerMode.COUNTUP);
  const paused = useRef(false);
  const end = new UIFx(endSound);

  useEffect(() => {
    askNotificationPermission();

    const timer = setInterval(() => {
      if (timerMode == TimerMode.COUNTUP) {
        const currentTime = new Date();
        const timeDiff = currentTime.getTime() - startTime.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor(timeDiff / (1000 * 60)) - hours * 60;
        const seconds =
          Math.floor(timeDiff / 1000) - minutes * 60 - hours * 60 * 60;
        setDisplayTime({ hours, minutes, seconds });
      } else if (timerMode == TimerMode.COUNTDOWN) {
        const currentTime = new Date();
        const timeDiff = endTime.getTime() - currentTime.getTime();

        if (timeDiff <= 0) {
          if (!paused.current) {
            new Notification("Break ended!");
            end.play();
            paused.current = true;
          }
          return;
        }

        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor(timeDiff / (1000 * 60)) - hours * 60;
        const seconds =
          Math.floor(timeDiff / 1000) - minutes * 60 - hours * 60 * 60;
        setDisplayTime({ hours, minutes, seconds });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [endTime, startTime, timerMode]);

  const onBreak = () => {
    const breakLenght = calculateBreakLength(
      new Date().getTime() - startTime.getTime()
    );
    setEndTime(new Date(new Date().getTime() + breakLenght));
    console.log(displayTime);
    setTimerMode(TimerMode.COUNTDOWN);
  };

  const onContinue = () => {
    setStartTime(new Date());
    paused.current = false;
    setTimerMode(TimerMode.COUNTUP);
  };

  return (
    <>
      <Clock time={displayTime} />
      <Controls onBreak={onBreak} onContinue={onContinue} mode={timerMode} />
    </>
  );
}

export default App;
