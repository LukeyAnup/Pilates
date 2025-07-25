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
    <section className="px-9 md:px-4 pt-20 md:pt-40 my-10 md:my-64 grid md:grid-cols-2 gap-8 items-center bg-primary">
      {imageUrl && (
        <img
          src={`https:${imageUrl}`}
          alt="Why Choose Us"
          className="shadow-lg h-[400px] object-cover rounded-t-full border-2 border-white p-4"
        />
      )}

      <div className="text-white space-y-10">
        <h1 className="font-playfair">{heading}</h1>
        <p className="font-montserrat">{description}</p>
        <button className="hidden md:block px-20 py-2 cursor-pointer border">
          <p>Learn More</p>
        </button>
      </div>
    </section>
  );
}
