const Tutorial = () => {
  return (
    <div className="flex flex-col items-center py-12 px-24 gap-5">
      <div className="font-semibold text-2xl">How to use</div>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        <div className="">
          <div className="font-semibold text-lg text-center">Tutorial#1</div>
          <div className="text-base text-center mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo soluta pariatur vel placeat,</div>
        </div>
        <div className="">
          <div className="font-semibold text-lg text-center">Tutorial#2</div>
          <div className="text-base text-center mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo soluta pariatur vel placeat, Lorem ipsum dolor sit amet</div>
        </div>
        <div className="">
          <div className="font-semibold text-lg text-center">Tutorial#3</div>
          <div className="text-base text-center mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo soluta pariatur vel placeat,</div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial;