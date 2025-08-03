import { useEffect, useState } from "react";
import navImg from "../../assets/navImg.jpg";
import PilatesTabs from "../classes/pilatesTabs";
import ReformerPilates from "../classes/reformerPilates";
import PricingCheckout from "../pricing/checkout";
import type { PricingFields } from "../pricing/types";
import client from "../../contentfulClient";

export default function SchedulePage() {
  const [data, setData] = useState<PricingFields | null>(null);

  useEffect(() => {
    client
      .getEntries({ content_type: "pricing" }) // use your actual content type ID
      .then((res) => {
        if (res.items.length > 0) {
          setData(res.items[0].fields);
        }
      });
  }, []);

  if (!data) return <div>Loading...</div>;
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
            Explore our pilates Schedule
          </h2>
          <p className="text-white">
            Find the perfect class to match your fitness level and goals.
          </p>
        </div>
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
      <div>
        <PricingCheckout data={data} />
      </div>
      <PilatesTabs />
      {/* <ReformerPilates entryId="7wSAOVmN4R0jyvkQzWBuRO" />
      <ReformerPilates entryId="4BwAfdE9rijmGxG9AK1LNQ" />
      <ReformerPilates entryId="5ditJCXyIHQjUTGn1dwCqb" /> */}
    </div>
  );
}
const ScheduleTableRowItem = ({ content }: { content: string }) => {
  return (
    <td className="py-4 font-montserrat text-base leading-7 text-text-tertiary uppercase">
      {content}
    </td>
  );
};
