import {useEffect, useState} from "react";
import type {Asset, EntrySkeletonType} from "contentful";
import client from "../../contentfulClient";

type JoinClassFields = {
  tileImg1?: Asset;
  tileImg2?: Asset;
  joinClassHeading?: string;
  joinClassDescription?: string;
};

type JoinClassSkeleton = EntrySkeletonType<JoinClassFields, "joinClass">;

export default function JoinOurClass() {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getEntries<JoinClassSkeleton>({
          content_type: "joinClass",
          limit: 1,
        });

        const item = response.items[0].fields as JoinClassFields;

        setHeading(item.joinClassHeading || "");
        setDescription(item.joinClassDescription || "");
        setImage1(
          typeof item.tileImg1?.fields.file?.url === "string"
            ? item.tileImg1.fields.file.url
            : ""
        );
        setImage2(
          typeof item.tileImg2?.fields.file?.url === "string"
            ? item.tileImg2.fields.file.url
            : ""
        );
      } catch (error) {
        console.error("Failed to fetch Join Class content:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative bg-secondary">
      {/* Desktop view */}
      <section className="hidden md:block mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 ml-36 items-center">
          <div className="max-w-xl space-y-6 ">
            <h2 className="text-primary font-playfair">{heading}</h2>
            <p>{description}</p>
            <button className="inline-block px-20 py-2 text-primary cursor-pointer border">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {image1 && (
              <img
                src={`https:${image1}`}
                alt="Class 1"
                className="w-full h-auto rounded-xl shadow-lg object-cover self-stretch object-left"
              />
            )}
            {image2 && (
              <img
                src={`https:${image2}`}
                alt="Class 2"
                className="w-full h-auto rounded-xl shadow-lg object-cover self-stretch object-left
                  "
              />
            )}
          </div>
        </div>
      </section>
      <p className="absolute uppercase hidden md:block font-bold -left-[300px] top-90 text-9xl text-primary opacity-40 -rotate-90">
        Strength
      </p>
      {/* Mobile view */}
      <section className="mx-auto px-9 md:hidden">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl space-y-6 ">
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-primary">
              {heading}
            </h2>
            <p className="text-lg text-gray-700 whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-3">
              {image1 && (
                <img
                  src={`https:${image1}`}
                  alt="Class 1"
                  className="w-full h-full shadow-lg object-cover"
                />
              )}
              {image2 && (
                <img
                  src={`https:${image2}`}
                  alt="Class 2"
                  className="w-full h-full shadow-lg object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
