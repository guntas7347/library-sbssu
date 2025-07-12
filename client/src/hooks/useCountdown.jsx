import { useEffect, useState } from "react";

export function useCountdown(expiryTimeString) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    if (!expiryTimeString) {
      setTimeLeft(null);
      setIsExpired(false);
      return;
    }

    const expiryTime = new Date(expiryTimeString).getTime();
    if (isNaN(expiryTime)) {
      setTimeLeft(null);
      setIsExpired(true);
      return;
    }

    let timer;

    const tick = () => {
      const now = Date.now();
      const diff = Math.floor((expiryTime - now) / 1000);

      if (diff <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
        clearInterval(timer);
      } else {
        setTimeLeft(diff);
      }
    };

    tick(); // run immediately
    timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [expiryTimeString]);

  return { timeLeft, isExpired };
}
