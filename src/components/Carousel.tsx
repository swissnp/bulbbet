import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";

const Carousel = ({
  trendingData,
}: {
  trendingData: RouterOutputs["event"]["getTrending"];
}): JSX.Element => {
  // const [idx, setidx] = useState(0);

  //translate-x = (25%+6px)*idx (md screen)
  //translate-x = (100%+24px)*idx (sm screen)

  return (
    <div className="w-full items-center justify-center px-5 md:px-10">
      <div
        className={`relative flex w-full flex-col items-center justify-center gap-6 transition md:flex-row md:items-start md:justify-start`}
      >
        {trendingData.map(({ imageUrl, id, name, nextAgreePrice }) => {
          return (
            <Link
              href={`/event/${id}`}
              key={id}
              className="card relative flex w-72 flex-none overflow-hidden rounded-xl shadow-md transition hover:scale-[1.01] hover:shadow-2xl"
            >
              <div className="relative h-72 w-72 overflow-hidden">
                <Image
                  src={imageUrl}
                  fill
                  alt={"event cover"}
                  className="object-cover object-center"
                />
              </div>
              <div className="bg-base-200">
                <progress
                  className="flex-inline progress progress-success flex w-full bg-error"
                  value={nextAgreePrice.toString()}
                  max="100"
                ></progress>
              </div>
              <div className="card-body z-10 bg-base-200">
                <div className="card-title text-lg font-semibold">{name}</div>
                <div className="flex w-full gap-2 text-base font-semibold">
                  <span className="text-success">
                    Yes {nextAgreePrice.toString()}{" "}
                  </span>
                  <span className="text-error">No {100 - nextAgreePrice}</span>
                </div>
                <div className="card-actions justify-end pt-2">
                  <div className="btn btn-primary">Purchase</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;

{
  /* <div
        onClick={() => {
          let nxt = idx - 1;
          if (nxt < 0) nxt = 2;
          setidx(nxt);
        }}
        className="btn absolute left-1 z-10 h-12 w-12 rounded-full opacity-0 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          className="fill-white"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </div> */
}
{
  /* <div
        // onClick={() => {
        //   let nxt = idx + 1;
        //   if (nxt > 2) nxt = 0;
        //   setidx(nxt);
        //   console.log(idx);
        // }}
        className="btn absolute right-1 z-20 h-12 w-12 rounded-full opacity-0 group-hover:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
          className="fill-white"
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </div> */
}
