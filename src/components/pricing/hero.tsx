import type {PricingFields} from "./types";

const PricingHero = ({data}: {data: PricingFields}) => {
  return (
    <>
      <div className="flex flex-col gap-5 max-w-4/5 mx-auto">
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
            className="object-cover w-1/3 min-h-[300px] h-full rounded-3xl"
          />
        </div>
      </div>
    </>
  );
};

const ScheduleTableRowItem = ({content}: {content: string}) => {
  return (
    <td className="py-4 font-montserrat text-base leading-7 text-text-tertiary uppercase">
      {content}
    </td>
  );
};

export default PricingHero;
