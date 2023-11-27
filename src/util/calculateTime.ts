import { Time } from "../types/time";

export const calculateTime = (time: number): Time => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = Math.floor(time - hours * 3600 - minutes * 60);

  return {
    hours,
    minutes,
    seconds,
  };
};

const breaks = [
  {
    start: 0,
    end: 1_500_000,
    length: 300_000,
  },
  {
    start: 1_500_001,
    end: 3_000_000,
    length: 480_000,
  },
  {
    start: 3_000_001,
    end: 5_400_000,
    length: 600_000,
  },
  {
    start: 5_400_001,
    end: Infinity,
    length: 900_000,
  },
];

export const calculateBreakLength = (time: number): number => {
  const breakLength = breaks.find((b) => time >= b.start && time <= b.end);
  return breakLength ? breakLength.length : 0;
};
