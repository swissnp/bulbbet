import { useEffect, useState } from "react";
import Header from "~/components/Header";
import { AnimateOnScroll } from "~/utils/hooks/VisibilityHook";
import Carousel from "~/components/Carousel";
import Tutorial from "~/components/Tutorial";

export default function Home() {
  return (
    <div className="pt-28">
      <div className="fixed top-0 z-50">
        <Header />
      </div>
      <Hero />
      <div className="ml-4 text-2xl font-bold">Trending events</div>
      <div className="mt-5 w-full">
        <Carousel
          // img={[
          // "https://www.cnet.com/a/img/resize/20d6844768bd3f5f0df41deee97897423bcaf3c5/hub/2021/11/03/3c2a7d79-770e-4cfa-9847-66b3901fb5d7/c09.jpg?auto=webp&fit=crop&height=1200&width=1200",
          // "https://community-lens.storage.googleapis.com/preview-media/thumbnail_poster/a8892413-3bec-4f3d-b4ef-02e56cc540bc.jpg",
          // "https://m.media-amazon.com/images/I/31GEsNVK8dL._AC_UF1000,1000_QL80_.jpg",
          // "https://m.media-amazon.com/images/I/51XISp6ViuL._AC_UF894,1000_QL80_.jpg",
          // "https://i.chzbgr.com/full/9743959040/h39973DB8/dog-inside-now-my-dog",
          // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDp6C_WCdCnXGwObacXyxQNpLtxf1eMZxuA&usqp=CAU"
          // ]}
          img={[
            "https://www.cnet.com/a/img/resize/20d6844768bd3f5f0df41deee97897423bcaf3c5/hub/2021/11/03/3c2a7d79-770e-4cfa-9847-66b3901fb5d7/c09.jpg?auto=webp&fit=crop&height=1200&width=1200",
            "https://community-lens.storage.googleapis.com/preview-media/thumbnail_poster/a8892413-3bec-4f3d-b4ef-02e56cc540bc.jpg",
            "https://m.media-amazon.com/images/I/31GEsNVK8dL._AC_UF1000,1000_QL80_.jpg",
            "https://m.media-amazon.com/images/I/51XISp6ViuL._AC_UF894,1000_QL80_.jpg",
            "https://i.chzbgr.com/full/9743959040/h39973DB8/dog-inside-now-my-dog",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDp6C_WCdCnXGwObacXyxQNpLtxf1eMZxuA&usqp=CAU",
            "https://m.media-amazon.com/images/I/31GEsNVK8dL._AC_UF1000,1000_QL80_.jpg",
            "https://www.cnet.com/a/img/resize/20d6844768bd3f5f0df41deee97897423bcaf3c5/hub/2021/11/03/3c2a7d79-770e-4cfa-9847-66b3901fb5d7/c09.jpg?auto=webp&fit=crop&height=1200&width=1200",
          ]}
        />
      </div>
      {/* <div className="ml-4 text-2xl font-bold">Ongoing events</div>
      <div className="w-full mt-5">
        <Collection img={[
        "https://www.cnet.com/a/img/resize/20d6844768bd3f5f0df41deee97897423bcaf3c5/hub/2021/11/03/3c2a7d79-770e-4cfa-9847-66b3901fb5d7/c09.jpg?auto=webp&fit=crop&height=1200&width=1200",
        "https://community-lens.storage.googleapis.com/preview-media/thumbnail_poster/a8892413-3bec-4f3d-b4ef-02e56cc540bc.jpg",
        "https://m.media-amazon.com/images/I/31GEsNVK8dL._AC_UF1000,1000_QL80_.jpg",
        "https://m.media-amazon.com/images/I/51XISp6ViuL._AC_UF894,1000_QL80_.jpg",
        "https://i.chzbgr.com/full/9743959040/h39973DB8/dog-inside-now-my-dog",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZDp6C_WCdCnXGwObacXyxQNpLtxf1eMZxuA&usqp=CAU"
      ]} />
      </div> */}
      <div className="mt-8 w-full bg-base-200">
        <Tutorial />
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
              <span className="block h-[calc(theme(fontSize.5xl)*theme(lineHeight.tight))] flex-col overflow-hidden text-secondary-focus md:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))]">
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
          {/* </AnimateOnScroll> */}
          {/* <button className="btn btn-primary">Install Our App</button> */}
        </div>
      </div>
    </div>
    // </div>
  );
};
