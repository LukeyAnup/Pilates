import { useEffect, useState } from "react";
import navImg from "../../assets/navImg.jpg";
import client from "../../contentfulClient";
// import About from "../home/about";
import type { Asset, Entry, EntrySkeletonType } from "contentful";

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

export default function AboutUsPage() {
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
          <h2 className="font-playfair text-white">About Us</h2>
          <p className="text-white">
            Find the perfect class to match your fitness level and goals.
          </p>
        </div>
      </div>
      <div className="mb-36">
        {/* //Desktop view */}
        <section className="max-w-6xl hidden md:block mx-auto pt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="space-y-10 bg-[#F3F0E7CC] p-12">
              <h1 className="capitalize text-primary font-playfair">
                {aboutData.aboutHeading}
              </h1>

              <p className="font-montserrat">{aboutData.aboutDescription}</p>
              <button className="relative overflow-hidden px-20 py-2 border border-primary cursor-pointer group">
                {/* Sliding background */}
                <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />

                {/* Text content above background */}
                <p className="relative z-10 font-montserrat text-primary transition-colors duration-300 group-hover:text-white">
                  Learn More
                </p>
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
          <div className="md:hidden text-3xl font-bold py-8 px-9 font-playfair capitalize text-primary">
            {aboutData.aboutHeading}
          </div>
          <div className="relative">
            {imgUrl && (
              <img
                src={imgUrl}
                alt={aboutData.aboutHeading || "About image"}
                className="pr-4 pl-16"
              />
            )}
            <div className="absolute top-80 right-9 left-6 space-y-6 bg-[#F3F0E7] md:bg-[#F3F0E7CC] p-8">
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
      </div>
    </div>
  );
}
