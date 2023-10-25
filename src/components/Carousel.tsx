import { FC, useState } from "react";

type CarouselProps = {
  img: Array<string>;
}

const Carousel:FC<CarouselProps> = ({img}): JSX.Element => {
  const [idx,setidx] = useState(0);
  
  //translate-x = (25%+6px)*idx (md screen)
  //translate-x = (100%+24px)*idx (sm screen)

  return (
    <div className="flex items-center group">
      <div  
        onClick={()=>{
          let nxt = idx-1;
          if(nxt<0)
            nxt = 2
          setidx(nxt)
        }} 
        className="btn absolute z-10 left-1 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="1em" 
          viewBox="0 0 320 512"
          className="fill-white"
        >
          <path 
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
        </svg>
      </div>
      <div
        onClick={()=>{
          let nxt = idx+1;
          if(nxt>2)
            nxt = 0
          setidx(nxt)
          console.log(idx)
        }} 
        className="btn absolute z-10 right-1 rounded-full w-12 h-12 opacity-0 group-hover:opacity-100">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="1em" 
          viewBox="0 0 320 512"
          className="fill-white"
        >
          <path 
            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </div>
      <div className="w-full mx-4 overflow-x-hidden">
        <div className={`flex w-full gap-6 relative transition -translate-x-[calc((50%+12px)*${idx})]`}>
          {img.map((item,idx)=>{
            return (
              <div id={`slide${idx}`} className="flex flex-none w-[calc(50%-12px)] md:w-[calc(25%-18px)] relative card card-compact rounded-lg overflow-hidden">
                <img src={item} className="h-48 object-cover object-center" />
                <div className="card-body bg-base-200">
                  <div className="card-title text-lg font-semibold">Event #{idx+1}</div>
                  <div className="font-semibold text-base">
                    <span className="text-green-600">Yes 69thb </span>
                    <span className="text-red-600">No 10thb</span>
                  </div>
                  {/* <div className="btn bg-[rgb(180,186,194)] text-[rgb(39,41,53)] border-none hover:bg-[rgb(39,41,53)] hover:text-white">Bet</div> */}
                </div>
              </div> 
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Carousel;