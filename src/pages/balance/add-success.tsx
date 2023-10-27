import Link from "next/link";

const AddBulbSuccess =() => {
    return (
        <div className="hero h-screen w-full select-none">
          <div className="hero-content text-center">
            <div className="relative py-0 lg:py-10 flex-col flex">
                <h1 className="items-center justify-center text-3xl font-extrabold sm:text-7xl whitespace-nowrap">
                  Top up successful
                </h1>
                <h1 className="items-center justify-center text-xl sm:text-xl whitespace-nowrap py-5">
                  Thank you for your top up <div className="inline text-primary font-bold">Current Amount : 1000</div>
                </h1>
                <div className="flex w-full justify-center">
                <Link href="/" className="btn btn-primary mt-2 w-fit">Back</Link>
                </div>
              </div>
            </div>
        </div>
    )
}

export default AddBulbSuccess;