import type { PricingFields } from "./types";
import navImg from "../../assets/navImg.jpg";

const PricingHero = ({ data }: { data: PricingFields }) => {
  return (
    <div className="-mt-20">
      <div
        className="relative"
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)), url(${navImg})`,
          width: "100%",
          height: "288px",
          backgroundSize: "cover",
          backgroundPosition: "bottom",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center">
          <h2 className="font-playfair text-white">
            Explore our pilates Pricing
          </h2>
          <p className="text-white">
            Find the perfect class to match your fitness level and goals.
          </p>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex flex-col gap-5 md:max-w-4/5 mx-auto mt-8">
          <h2 className="font-playfair text-primary font-extrabold text-[40px]">
            {data.titleOne}
          </h2>
          <p className="font-montserrat text-xl font-normal text-[#4d4d4d]">
            {data.descOne}
          </p>
          <img src={data.photoOne?.fields?.file?.url} alt="" />
        </div>
        <div className="pt-10 pb-6 max-w-4/5 mx-auto">
          <h3 className="font-playfair text-primary uppercase text-[36px] font-bold">
            {data.titleTwo}
          </h3>
          <p className="font-montserrat max-w-3/5 mt-7 text-xl font-normal text-[#4d4d4d] tracking-normal leading-7">
            {data.descTwo}
          </p>

          <div className="flex justify-between items-center gap-16">
            <table className="w-2/3   ">
              <thead className="py-8">
                <tr className="py-8 border-b border-tertiary">
                  <th></th>
                  <th className="py-8 font-montserrat text-base leading-7 uppercase font-normal text-primary ">
                    Monday
                  </th>
                  <th className="py-8 font-montserrat text-base leading-7 uppercase font-normal text-primary ">
                    Tuesday
                  </th>
                  <th className="py-8 font-montserrat text-base leading-7 uppercase font-normal text-primary ">
                    Wednesday
                  </th>
                  <th className="py-8 font-montserrat text-base leading-7 uppercase font-normal text-primary ">
                    Thursday
                  </th>
                  <th className="py-8 font-montserrat text-base leading-7 uppercase font-normal text-primary ">
                    Friday
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-tertiary">
                  <ScheduleTableRowItem content="7:00 AM - 8:00 AM" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="Barre" />
                </tr>
                <tr className="border-b border-tertiary">
                  <ScheduleTableRowItem content="7:00 AM - 8:00 AM" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="Barre" />
                </tr>
                <tr className="border-b border-tertiary">
                  <ScheduleTableRowItem content="8:00 AM - 9:00 AM" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="Barre" />
                </tr>

                <tr className="border-b border-tertiary">
                  <ScheduleTableRowItem content="8:00 AM - 9:00 AM" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="Barre" />
                </tr>

                <tr className="border-b border-tertiary">
                  <ScheduleTableRowItem content="8:00 AM - 9:00 AM" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="REFORMERS" />
                  <ScheduleTableRowItem content="Barre" />
                </tr>
              </tbody>
            </table>

            <img
              src={data.photoOne?.fields?.file?.url}
              alt=""
              className="object-cover hidden md:block w-1/3 min-h-[300px] h-full rounded-3xl"
            />
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-6 py-6 bg-secondary">
        <div className="md:hidden text-3xl font-bold py-8 font-playfair capitalize text-primary">
          {data.titleTwo}
        </div>
        <div className="uppercase">
          <div className="flex justify-between space-y-6">
            <div className="font-semibold font-montserrat">Monday</div>
            <div className="font-montserrat">Reformers</div>
          </div>
          <div className="flex justify-between space-y-6">
            <div className="font-semibold font-montserrat">Tuesday</div>
            <div className="font-montserrat">Reformers</div>
          </div>
          <div className="flex justify-between space-y-6">
            <div className="font-semibold font-montserrat">Wednesday</div>
            <div className="font-montserrat">Reformers</div>
          </div>
          <div className="flex justify-between space-y-6">
            <div className="font-semibold font-montserrat">Thursday</div>
            <div className="font-montserrat">Mat pilates/yoga</div>
          </div>
          <div className="flex justify-between space-y-6">
            <div className="font-semibold font-montserrat">Friday</div>
            <div className="font-montserrat">Barre</div>
          </div>
        </div>

        <div className="uppercase flex justify-between font-montserrat">
          {/* Left Column */}
          <div className="flex gap-2 items-center">
            <div className="font-semibold text-sm">Time:</div>
            <div className="flex flex-col text-sm">
              <div>7:00 AM - 9:00 AM</div>
              <div>5:00 PM - 7:00 PM</div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div className="font-semibold text-sm">Break:</div>
                <div className="text-sm">1:00 PM - 4:00 PM</div>
              </div>
              <div className="flex gap-2">
                <div className="font-semibold text-sm">Close:</div>
                <div className="text-sm">7:30 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleTableRowItem = ({ content }: { content: string }) => {
  return (
    <td className="py-4 font-montserrat text-base leading-7 text-text-tertiary uppercase">
      {content}
    </td>
  );
};

export default PricingHero;
