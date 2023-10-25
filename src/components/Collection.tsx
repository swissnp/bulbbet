import Link from 'next/link';
import {FC, useState} from 'react'
 
type CollectionProps = {
  img: Array<string>
}

const Collection: FC<CollectionProps> = ({img}): JSX.Element => {
  const [all,setAll] = useState(false);

  return (
    <div className="flex flex-col items-center px-4 w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {img.slice(0,all?undefined:4).map((item,idx)=>{
            return (
              <Link href="/">
                <div className="relative w-full card card-compact rounded-lg overflow-hidden">
                  <img src={item} className="w-full h-48 object-cover object-center" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  </div>
                  <div className="card-body bg-base-200">
                    <div className="card-title text-lg font-semibold">Event #{idx+1}</div>
                    <div className="font-semibold text-base">
                      <span className="text-green-600">Yes 69thb </span>
                      <span className="text-red-600">No 10thb</span>
                    </div>
                    {/* <div className="btn bg-[rgb(180,186,194)] text-[rgb(39,41,53)] border-none hover:bg-[rgb(39,41,53)] hover:text-white">Bet</div> */}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      {!all && <div 
        className="btn btn-outline mt-4 normal-case px-6" 
        onClick={()=>{
          setAll(true)
        }}>View all</div>}
      
    </div>
  );
}

export default Collection;