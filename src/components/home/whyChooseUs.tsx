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
    <section className="px-9 md:px-20 pt-16 md:pt-20 pb-5 grid md:grid-cols-5 gap-8 items-center bg-primary">
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

      <div className="text-white space-y-6 md:space-y-10 col-span-5 md:col-span-3">
        <h1 className="hidden md:block">{heading}</h1>
        <div className="md:hidden text-3xl font-playfair">{heading}</div>
        <p>{description}</p>
        <button className="relative hidden md:block overflow-hidden px-20 py-2 border border-white cursor-pointer group">
          {/* Sliding background */}
          <span className="absolute inset-0 w-0 bg-white transition-all duration-300 group-hover:w-full" />

          {/* Text content above background */}
          <p className="relative z-10 font-montserrat text-white transition-colors duration-300 group-hover:text-primary">
            Learn More
          </p>
        </button>
      </div>
    </section>
  );
}
