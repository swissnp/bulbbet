const Tutorial = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-24 py-12">
      <div className="text-2xl font-semibold">How to use</div>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
        <div className="">
          <div className="flex w-full items-center justify-center py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-calendar-check-2"
            >
              <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="m16 20 2 2 4-4" />
            </svg>
          </div>
          <div className="text-center text-lg font-semibold">Choose Event</div>
          <div className="mt-2 text-center text-base">
            If finding the right event is daunting, just CREATE you own!.
          </div>
        </div>
        <div className="">
          <div className="flex w-full items-center justify-center py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pin"
            >
              <line x1="12" x2="12" y1="17" y2="22" />
              <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z" />
            </svg>
          </div>
          <div className="text-center text-lg font-semibold">Place Bets</div>
          <div className="mt-2 text-center text-base">
            Buy some shares! The more you have, the more you get.
          </div>
        </div>
        <div className="">
          <div className="flex w-full items-center justify-center py-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-coins"
            >
              <circle cx="8" cy="8" r="6" />
              <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
              <path d="M7 6h1v4" />
              <path d="m16.71 13.88.7.71-2.82 2.82" />
            </svg>
          </div>
          <div className="text-center text-lg font-semibold">Earn Some 💡</div>
          <div className="mt-2 text-center text-base">
            Choose wisely and you will win some 💡. Convert 💡 to real cash!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
