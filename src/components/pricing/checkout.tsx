import type {PricingFields} from "./types";

const PricingCheckout = ({data}: {data: PricingFields}) => {
  return (
    <section className="flex gap-8 relative py-20 bg-primary pr-24 my-32">
      <img
        className="rounded-tl-full rounded-tr-full absolute -left-16 bottom-0 h-11/12 w-1/3 border-[40px] border-b-0 border-white object-cover"
        src={data?.titleThreeImg?.fields?.file?.url}
        alt=""
      />

      <div className=" gap-8 w-2/3  ml-auto">
        <h2 className="font-playfair text-white text-4xl font-bold tracking-wider">
          {data.titleThree}
        </h2>

        <div className="grid grid-cols-2 gap-8">
          {/* Group Classes */}
          <div className="bg-card h-fit">
            <div className="p-8 text-white">
              <h3 className="text-xl leading-7 font-semibold mb-6 text-left font-montserrat">
                {data.groupClasses}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat">
                    {data.groupItem1}
                  </span>
                  <span className="text-xl font-montserrat">
                    {data.groupPrice1}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat">
                    {data.groupItem2}
                  </span>
                  <span className="text-xl font-montserrat">
                    {data.groupPrice2}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat">
                    {data.groupItem3}
                  </span>
                  <span className="text-xl font-montserrat">
                    {data.groupPrice3}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Personal Classes */}
          <div className="bg-card  h-fit">
            <div className="p-8 text-white">
              <h3 className="text-xl leading-7 font-semibold mb-6 text-left font-montserrat">
                {data.personalClasses}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat">
                    {data.personalItem1}
                  </span>
                  <span className="text-xl font-montserrat">
                    {data.personalPrice1}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat">
                    {data.personalItem2}
                  </span>
                  <span className="text-xl font-montserrat">
                    {data.personalPrice2}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat">
                    {data.personalItem3}
                  </span>
                  <span className="text-xl font-montserrat">
                    {data.personalPrice3}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Extra Package */}
          <div className="bg-card rounded-lg h-fit">
            <div className="p-8 text-white">
              <h3 className="text-xl leading-7 font-semibold mb-6 text-left font-montserrat">
                {data.extraPackage}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat font-normal">
                    {data.extraItem1}
                  </span>
                  <span className="text-xl font-montserrat font-normal">
                    {data.extraPrice1}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat font-normal">
                    {data.extraItem2}
                  </span>
                  <span className="text-xl font-montserrat font-normal">
                    {data.extraPrice2}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-montserrat font-normal">
                    {data.extraItem3}
                  </span>
                  <span className="text-xl font-montserrat font-normal">
                    {data.extraPrice3}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCheckout;
