import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";

type ClassesFields = {
  classesHeroBg?: Asset;
  heroTitle?: string;
  heroDesc?: string;
  button?: string;
  titleTwo?: string;
  titleThree?: string;
  instructorImg?: Asset;
  instructorName?: string;
  classInstructor?: string;
  instructorDesc?: string;
};

type ClassesSkeleton = {
  fields: ClassesFields;
  contentTypeId: "classesPage";
};

export default function Classes() {
  const [data, setData] = useState<ClassesFields | null>(null);
  const [heroBgUrl, setHeroBgUrl] = useState<string | null>(null);
  const [instructorImgUrl, setInstructorImgUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await client.getEntries<ClassesSkeleton>({
          content_type: "classesPage",
        });

        const entry = res.items[0];
        if (!entry) {
          console.warn("No ClassesPage entry found.");
          return;
        }

        const fields = entry.fields;
        setData(fields);

        // Set hero background image URL
        const heroBgImgUrl = (fields.classesHeroBg as Asset | undefined)?.fields
          ?.file?.url;
        if (heroBgImgUrl) setHeroBgUrl(`https:${heroBgImgUrl}`);

        // Set instructor image URL
        const instructorImgUrl = (fields.instructorImg as Asset | undefined)
          ?.fields?.file?.url;
        if (instructorImgUrl) setInstructorImgUrl(`https:${instructorImgUrl}`);
      } catch (err) {
        console.error("Failed to fetch Classes data:", err);
      }
    }

    fetchClasses();
  }, []);

  if (!data) return null;

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="grid grid-cols-3">
          <div className="inset-0 z-0 col-span-2">
            {heroBgUrl && (
              <img
                src={heroBgUrl}
                alt="Pilates Studio"
                className="w-full h-full object-cover"
              />
            )}
            <div className="inset-0 bg-opacity-20"></div>
          </div>

          {/* Content Container */}
          <div className="bg-secondary w-full px-4 sm:px-6 lg:px-8">
            <div className="items-center min-h-screen">
              {/* Left side - Image area (handled by background) */}
              <div className="hidden lg:block"></div>

              {/* Right side - Content */}
              <div className="flex flex-col justify-center space-y-6 lg:space-y-8 bg-white bg-opacity-95 p-8 sm:p-10 lg:p-12 rounded-lg shadow-lg lg:bg-opacity-100 lg:shadow-none lg:bg-transparent">
                {/* Title */}
                {data.heroTitle && (
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif text-primary">
                    {data.heroTitle}
                  </h1>
                )}

                {/* Description */}
                {data.heroDesc && (
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-lg">
                    {data.heroDesc}
                  </p>
                )}

                {/* Button */}
                {data.button && (
                  <div className="pt-4">
                    <button className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 border border-primary bg-transparent text-primary font-medium hover:bg-secondary hover:text-black transition-colors duration-300 text-sm sm:text-base">
                      {data.button}
                      <svg
                        className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="bg-[#a8b5a0] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          {data.titleTwo && (
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl font-serif text-white leading-tight tracking-wide">
                {data.titleTwo}
              </h2>
            </div>
          )}

          {/* Instructor Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
              {/* Meet Our Instructor Title */}
              {data.titleThree && (
                <h3 className="text-5xl font-serif text-[#FFFFFF80]">
                  {data.titleThree}
                </h3>
              )}

              {/* Instructor Details */}
              <div className="bg-white p-6 sm:p-8 lg:p-10 shadow-lg space-y-4 lg:space-y-6">
                {/* Instructor Name */}
                {data.instructorName && (
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-serif text-gray-800 mb-2">
                    {data.instructorName}
                  </h4>
                )}

                {/* Class Instructor Role */}
                {data.classInstructor && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium mb-4">
                    {data.classInstructor}
                  </p>
                )}

                {/* Instructor Description */}
                {data.instructorDesc && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                    {data.instructorDesc}
                  </p>
                )}
              </div>
            </div>

            {/* Right side - Instructor Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              {instructorImgUrl && (
                <div className="relative">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                    <img
                      src={instructorImgUrl}
                      alt={data.instructorName || "Instructor"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative border */}
                  <div className="absolute -inset-4 rounded-full border-2 border-white border-opacity-30"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
