// components/GetGlimpse.tsx
import { useEffect, useState } from "react";
import client from "../../contentfulClient";
import type { Asset } from "contentful";
import type { EntrySkeletonType } from "contentful";

export type GetGlimpseFields = {
  glimpseHeading?: string;
  firstImg?: Asset;
  secondImg?: Asset;
  thirdImg?: Asset;
  fourImg?: Asset;
  fifthImg?: Asset;
};

export type GetGlimpseSkeleton = EntrySkeletonType<
  GetGlimpseFields,
  "getGlimpse"
>;

export default function GetGlimpse() {
  const [heading, setHeading] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entries = await client.getEntries<GetGlimpseSkeleton>({
          content_type: "getGlimpse", // Replace with your content type ID
        });

        if (entries.items.length > 0) {
          const fields = entries.items[0].fields as GetGlimpseFields;

          setHeading(fields.glimpseHeading || "Get a Glimpse");

          const imageUrls = [
            fields.firstImg?.fields.file?.url,
            fields.secondImg?.fields.file?.url,
            fields.thirdImg?.fields.file?.url,
            fields.fourImg?.fields.file?.url,
            fields.fifthImg?.fields.file?.url,
          ]
            .filter((url): url is string => typeof url === "string")
            .map((url) => `https:${url}`);

          setImages(imageUrls);
        }
      } catch (err) {
        console.error("Error fetching GetGlimpse data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12 px-4 md:px-12 bg-white">
      <p className="text-3xl font-bold mb-8 text-primary">{heading}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Large Left Image */}
        {images[0] && (
          <img
            src={images[0]}
            alt="glimpse-1"
            className="w-full h-[500px] object-cover rounded-bl-[190px] rounded-tl-none rounded-tr-none rounded-br-none"
          />
        )}

        {/* 2x2 Grid on the Right */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((src, index) => (
            <img
              key={index + 1}
              src={src}
              alt={`glimpse-${index + 2}`}
              className="w-full h-60 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
