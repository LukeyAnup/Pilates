import { useEffect, useState } from "react";
import type { Asset, Entry, EntrySkeletonType } from "contentful";
import client from "../../contentfulClient";

type LinkItemFields = {
  label: string;
  url: string;
};

type AboutFields = {
  aboutHeading?: string;
  aboutDescription?: string;
  aboutImg?: Asset;
  aboutBtn?: Entry<EntrySkeletonType<LinkItemFields, "linkItem">>;
};

type AboutSkeleton = EntrySkeletonType<AboutFields, "aboutUs">;

export default function About() {
  const [aboutData, setAboutData] = useState<AboutFields | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await client.getEntries<AboutSkeleton>({
          content_type: "aboutUs",
          limit: 1,
          include: 2,
        });

        if (res.items.length > 0) {
          setAboutData(res.items[0].fields);
        } else {
          console.warn("No About entry found");
        }
      } catch (error) {
        console.error("Failed to fetch About section:", error);
      }
    }
    fetchAbout();
  }, []);

  if (!aboutData) return null;

  const imgUrl = aboutData.aboutImg?.fields.file?.url
    ? `https:${aboutData.aboutImg.fields.file?.url}`
    : null;

  return (
    <div className="relative mb-36">
      {/* //Desktop view */}
      <section className="max-w-6xl hidden md:block mx-auto pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="space-y-10 bg-[#F3F0E7CC] p-12">
            <h1 className="capitalize text-primary font-playfair">
              {aboutData.aboutHeading}
            </h1>

            <p className="font-montserrat">{aboutData.aboutDescription}</p>
            <button className="px-20 py-2 text-primary cursor-pointer border">
              <p className="font-montserrat">Learn More</p>
            </button>
          </div>

          {imgUrl && (
            <img
              src={imgUrl}
              alt={aboutData.aboutHeading || "About image"}
              className="shadow-md h-[600px] w-full"
            />
          )}
        </div>
      </section>
      {/* //Mobile view */}
      <section className="relative md:hidden max-w-6xl mx-auto">
        <h1 className="md:hidden py-8 px-9 font-playfair capitalize text-primary">
          {aboutData.aboutHeading}
        </h1>
        <div className="relative">
          {imgUrl && (
            <img
              src={imgUrl}
              alt={aboutData.aboutHeading || "About image"}
              className="shadow-md"
            />
          )}
          <div className="absolute top-97 right-9 space-y-6 bg-[#F3F0E7] md:bg-[#F3F0E7CC] p-12">
            <p className="hidden md:block font-bold capitalize text-primary">
              {aboutData.aboutHeading}
            </p>
            <p className="font-montserrat">{aboutData.aboutDescription}</p>
            <button className="px-20 py-2 text-primary cursor-pointer border">
              <p className="font-montserrat">Learn More</p>
            </button>
          </div>
        </div>
      </section>
      <p className="absolute uppercase font-bold text-6xl -left-3 -bottom-54 md:text-9xl md:-left-7 text-primary opacity-40">
        Balance
      </p>
    </div>
  );
}
