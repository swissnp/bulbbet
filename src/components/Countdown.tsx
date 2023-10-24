import { useState } from "react";

function getDateTimeCountdown(dateTime: string) {
  const targetDate = new Date(dateTime).getTime();
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}
const CountDown = ({ tillDateTime }: { tillDateTime: Date }) => {
  const [countdown, setCountdown] = useState(
    getDateTimeCountdown(tillDateTime.toString()),
  );
  setInterval(() => {
    setCountdown(getDateTimeCountdown(tillDateTime.toString()));
  }, 1000 * 60);
  return (
    <span className="countdown h-12 font-sans text-lg">
      <div className="grid h-12 grid-flow-col gap-5 overflow-y-visible text-center before:hidden">
        {countdown.days > 1 && (
          <div className="flex flex-col">
            <span className="countdown font-sans text-2xl">
              <span
                style={{ "--value": countdown.days } as React.CSSProperties}
              ></span>
            </span>
            days
          </div>
        )}
        {countdown.hours && (
          <div className="flex flex-col">
            <span className="countdown font-sans text-2xl">
              <span
                style={{ "--value": countdown.hours } as React.CSSProperties}
              ></span>
            </span>
            hours
          </div>
        )}
        {countdown.minutes && (
          <div className="flex flex-col">
            <span className="countdown font-sans text-2xl">
              <span
                style={{ "--value": countdown.minutes } as React.CSSProperties}
              ></span>
            </span>
            min
          </div>
        )}
        {/* {countdown.seconds && (
          <div className="flex flex-col">
            <span className="countdown font-sans text-2xl">
              <span
                style={{ "--value": countdown.seconds } as React.CSSProperties}
              ></span>
            </span>
            sec
          </div>
        )} */}
      </div>
    </span>
  );
};
export default CountDown;
