import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";
import navImg from "../../assets/navImg.jpg";

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
        <div>
          <h2 className="font-playfair text-white">
            Explore our pilates Classes
          </h2>
          <p className="text-white">
            Find the perfect class to match your fitness level and goals.
          </p>
        </div>
      </div>
      <div className="flex relative">
        <div className="w-full">
          {heroBgUrl && (
            <img
              src={heroBgUrl}
              alt="Pilates Studio"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="-ml-40 w-full my-10">
          <div className="bg-secondary">
            <div className="flex min-h-screen w-full items-center justify-center">
              {/* Right side - Content */}
              <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                {/* Title */}
                {data.heroTitle && (
                  <h2 className="font-playfair text-primary">
                    {data.heroTitle}
                  </h2>
                )}

                {/* Description */}
                {data.heroDesc && <p className="max-w-lg">{data.heroDesc}</p>}

                {/* Button */}
                {data.button && (
                  <div>
                    <button className="inline-flex items-center px-6 sm:px-8 py-2 border border-primary bg-transparent text-primary font-medium hover:bg-secondary hover:text-black transition-colors duration-300 text-sm sm:text-base cursor-pointer">
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
      </div>

      {/* Instructor Section */}
      <section className="bg-[#829488] py-10 h-full hidden md:block">
        <div>
          {/* Section Title */}
          {data.titleTwo && (
            <div className="text-center">
              <h2 className="text-white font-playfair">{data.titleTwo}</h2>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="relative col-span-1 flex">
              <div className="bg-white px-20 shadow-lg flex flex-col justify-center h-[550px] w-full">
                {data.instructorName && (
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-serif text-primary mb-2">
                    {data.instructorName}
                  </h4>
                )}

                {data.classInstructor && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium mb-4">
                    {data.classInstructor}
                  </p>
                )}

                {data.instructorDesc && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed max-w-96">
                    {data.instructorDesc}
                  </p>
                )}
              </div>

              <div className="absolute flex justify-center lg:justify-end -right-50 bottom-14">
                {instructorImgUrl && (
                  <div className="border p-4 border-white rounded-bl-full rounded-br-full ">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-bl-full rounded-br-full overflow-hidden ">
                      <img
                        src={instructorImgUrl}
                        alt={data.instructorName || "Instructor"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-1">
              {data.titleThree && (
                <h3 className="text-5xl font-serif text-right text-[#FFFFFF80]">
                  {data.titleThree}
                </h3>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* //Mobile */}
      <section className="bg-primary md:hidden">
        <div className="flex justify-center lg:justify-end -right-50 bottom-14">
          {instructorImgUrl && (
            <div className="border p-4 border-white rounded-bl-[165px] rounded-br-[165px] ">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-bl-[165px] rounded-br-[165px] overflow-hidden ">
                <img
                  src={instructorImgUrl}
                  alt={data.instructorName || "Instructor"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
