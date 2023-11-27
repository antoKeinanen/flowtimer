import { Time } from "../types/time";
import { leftPad } from "../util/leftPad";

interface ClockProps {
  time: Time;
}

function Clock({ time }: ClockProps) {
  const paddedTime = [
    leftPad(time.hours),
    leftPad(time.minutes),
    leftPad(time.seconds),
  ].join(":");

  return (
    <h1 className="text-center text-5xl text-stone-50 font-plex">
      {paddedTime}
    </h1>
  );
}

export default Clock;
