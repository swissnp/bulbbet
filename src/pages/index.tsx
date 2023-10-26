import { useEffect, useState } from "react";
import Header from "~/components/Header";
import { AnimateOnScroll } from "~/utils/hooks/VisibilityHook";
import Carousel from "~/components/Carousel";
import Tutorial from "~/components/Tutorial";
import Link from "next/link";
import { api } from "~/utils/api";

export default function Home() {
  const { data } = api.event.getTrending.useQuery(undefined);
  return (
    <div className="pt-28">
      <div className="fixed top-0 z-50">
        <Header />
      </div>
      <Hero />
      <div>
        <div className="flex justify-between px-12 text-4xl font-bold">
          <div>📈 Trending events</div>
          <Link href="/listings">
            <div className="btn btn-secondary btn-outline">View all</div>
          </Link>
        </div>
        <div className="w-full pt-5">
          <div className="mx-10 overflow-scroll rounded-lg bg-neutral py-10">
            {data && <Carousel trendingData={data} />}
          </div>
        </div>
      </div>
      <div className="w-full items-center justify-center pt-10">
        <div className="bg-base-200">
          <Tutorial />
        </div>
      </div>
    </div>
  );
}

const generate4RandomUniqueEmoji = (emoji_list: string[]) => {
  const emoji: string[] = [];
  while (emoji.length < 4) {
    const randomEmoji =
      emoji_list[Math.floor(Math.random() * emoji_list.length)] ?? "";
    if (!emoji.includes(randomEmoji)) {
      emoji.push(randomEmoji);
    }
  }
  return emoji;
};

const Hero = () => {
  const [emoji, setEmoji] = useState<string[]>([]);
  const emoji_list = [
    "🎲",
    "🎰",
    "🏇",
    "🎫",
    "💹",
    "💰",
    "💸",
    "💡",
    "💡",
    "💡",
    "💡",
    "🪀",
    "🃏",
    "🤞",
    "💵",
    "🥇",
    "🍻",
    "⚽️",
  ];
  useEffect(() => {
    setEmoji(generate4RandomUniqueEmoji(emoji_list));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="hero h-screen w-full select-none">
      <div className="hero-content text-center">
        <div className="relative max-w-md py-0 lg:py-10">
          <AnimateOnScroll reappear={true}>
            <h1 className="items-center justify-center text-5xl sm:text-7xl">
              Bet on
              <span className="block h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] flex-col overflow-hidden text-secondary md:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))]">
                <ul className="block animate-text-slide text-center leading-tight [&_li]:block">
                  <li>
                    Futures
                    <div className="inline align-middle text-4xl sm:text-6xl">
                      ⏳
                    </div>
                  </li>
                  <li>
                    Grades
                    <div className="inline text-error">{"🇫"}</div>
                  </li>
                  <li>
                    Events
                    <div className="inline align-middle text-4xl sm:text-6xl">
                      📅
                    </div>
                  </li>
                  <li>
                    Predictions
                    <div className="inline align-middle text-4xl sm:text-6xl">
                      🔮
                    </div>
                  </li>
                  <li>
                    Trends
                    <div className="inline align-middle text-4xl sm:text-6xl">
                      📈
                    </div>
                  </li>
                  <li aria-hidden="true">
                    Futures
                    <div className="inline align-middle text-4xl sm:text-6xl">
                      ⏳
                    </div>
                  </li>
                </ul>
              </span>
              with
            </h1>
          </AnimateOnScroll>
          <h1 className="inline whitespace-nowrap text-6xl font-bold sm:text-8xl">
            Bulbbet
          </h1>
          <AnimateOnScroll
            reappear={true}
            className="absolute -top-14 right-2 text-7xl sm:-right-16 sm:-top-28 lg:-right-32 lg:-top-20 lg:text-9xl"
            classNameOnEnd="rotate-12"
          >
            {/* top right */}
            {emoji[0]}
          </AnimateOnScroll>
          <AnimateOnScroll
            reappear={true}
            className="absolute -top-14 left-2 text-7xl sm:-left-10 sm:-top-28 lg:-left-20 lg:-top-20 lg:text-9xl"
            classNameOnEnd="-rotate-[12deg]"
          >
            {/* top left */}
            {emoji[1]}
          </AnimateOnScroll>
          <AnimateOnScroll
            reappear={true}
            className="absolute -bottom-24 -left-0 hidden rotate-12 text-7xl sm:-bottom-24 sm:-left-5 lg:-left-52 lg:top-1/2 lg:-mt-16 lg:flex lg:text-9xl"
            classNameOnStart="rotate-[10deg]"
            classNameOnEnd="-rotate-[10deg]"
          >
            {/* bottom left or mid left */}
            {emoji[2]}
          </AnimateOnScroll>
          <AnimateOnScroll
            reappear={true}
            className="absolute -bottom-24 -right-0 hidden rotate-12 text-7xl sm:-bottom-24 sm:-right-5 lg:-right-52 lg:top-1/2 lg:-mt-16 lg:flex lg:text-9xl"
            classNameOnStart="-rotate-[10deg]"
            classNameOnEnd="rotate-[10deg]"
          >
            {/* bottom right or mid right */}
            {emoji[3]}
          </AnimateOnScroll>
          <p className="py-6 text-3xl">Put your 💡 where your mouth is</p>
          <Link className="btn btn-primary" href={"/listings"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-sticky-note text-primary-content"
            >
              <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
              <path d="M15 3v6h6" />
            </svg>
            See Our Listings
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};
