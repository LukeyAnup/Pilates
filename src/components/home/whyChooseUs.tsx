import { useEffect, useState } from "react";
import type { Asset, EntrySkeletonType } from "contentful";
import client from "../../contentfulClient";

type WhyChooseUsFields = {
  whyImg?: Asset;
  whyHeading?: string;
  whyDescription?: string;
};

type WhyChooseUsSkeleton = EntrySkeletonType<WhyChooseUsFields, "whyUs">;

export default function WhyChooseUs() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries<WhyChooseUsSkeleton>({
          content_type: "whyUs",
          limit: 1,
        });

        const item = response.items[0].fields as WhyChooseUsFields;
        setHeading(item.whyHeading || "");
        setDescription(item.whyDescription || "");
        setImageUrl(
          typeof item.whyImg?.fields.file?.url === "string"
            ? item.whyImg.fields.file.url
            : ""
        );
      } catch (error) {
        console.error("Failed to fetch Why Choose Us content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="px-9 md:px-20 pt-16 md:pt-20 pb-5 md:pb-20 my-10 md:my-64 grid md:grid-cols-5 gap-8 items-center bg-primary">
      <div className="col-span-5 md:col-span-2">
        {imageUrl && (
          <div className="relative md:w-[411px]">
            <div className="absolute -top-16 md:-top-20 w-full flex justify-center">
              <div className="h-16 md:h-20 border-l border-white"></div>
            </div>
            <img
              src={`https:${imageUrl}`}
              alt="Why Choose Us"
              className="shadow-lg h-[547px] md:w-[411px] object-cover rounded-t-full border border-white p-6"
            />
          </div>
        )}
      </div>

      <div className="text-white space-y-10 col-span-5 md:col-span-3 mt-5 md:mt-0">
        <h1 className="">{heading}</h1>
        <p>{description}</p>
        <button className="hidden md:block px-20 py-2 cursor-pointer border">
          <p>Learn More</p>
        </button>
      </div>
    </section>
  );
}
