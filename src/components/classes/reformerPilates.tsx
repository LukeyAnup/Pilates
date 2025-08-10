import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";

type ReformerPilatesFields = {
  tabTitle?: string;
  classTitle?: string;
  classDesc?: string;
  classQuota?: string;
  quotaLeft?: string;
  durationTitle?: string;
  durationTime?: string;
  level?: string;
  levelDesc?: string;
  img1?: Asset;
  img2?: Asset;
  learnWhat?: string;
  fundamentalTitle?: string;
  fundamentalDesc?: string;
  coreTitle?: string;
  coreDesc?: string;
  breathingTitle?: string;
  breathingDesc?: string;
  balanceTitle?: string;
  balanceDesc?: string;
  whatToBring?: string;
  point1?: string;
  point2?: string;
  point3?: string;
  classBenefits?: string;
  classPoint1?: string;
  classPoint2?: string;
  classPoint3?: string;
  classPoint4?: string;
  additionalInformation?: string;
  additionalPoint1?: string;
  additionalPoint2?: string;
  instructorImg?: Asset;
  instructorName?: string;
  instructorPosition?: string;
  instructorDescription?: string;
};

type ReformerPilatesSkeleton = {
  fields: ReformerPilatesFields;
  contentTypeId: "reformerPilates";
};

interface ReformerPilatesProps {
  entryId?: string; // Optional: Use this to fetch by specific entry ID
}

export default function ReformerPilates({ entryId }: ReformerPilatesProps) {
  const [data, setData] = useState<ReformerPilatesFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReformerPilates() {
      try {
        setLoading(true);
        setError(null);

        let entry;

        if (entryId) {
          // Method 1: Fetch by specific entry ID
          console.log(`Fetching entry by ID: ${entryId}`);
          entry = await client.getEntry<ReformerPilatesSkeleton>(entryId);
        } else {
          // Fallback - fetch the first entry (original behavior)
          console.log("No entryId provided, fetching first entry");
          const res = await client.getEntries<ReformerPilatesSkeleton>({
            content_type: "reformerPilates",
            limit: 1,
          });
          entry = res.items[0];
        }

        if (!entry) {
          const identifier = entryId || "default query";
          setError(`No ReformerPilates entry found for: ${identifier}`);
          return;
        }
        await new Promise((resolve) => setTimeout(resolve, 700)); // ← Add delay here

        setData(entry.fields);
      } catch (err) {
        console.error("Failed to fetch ReformerPilates data:", err);
        setError("Failed to fetch data from Contentful");
      } finally {
        setLoading(false);
      }
    }

    fetchReformerPilates();
  }, [entryId]); // Re-run effect when entryId changes

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );

  if (error)
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  if (!data) return <div className="p-4 text-center">No data available</div>;

  return (
    <div className="container mx-auto space-y-4 grid md:grid-cols-3">
      <div className="col-span-0 md:col-span-2">
        <div className="flex flex-col gap-4">
          <h4 className="font-playfair text-primary">{data.classTitle}</h4>
          <p className="text-gray-700">{data.classDesc}</p>
        </div>

        <ul className="list-disc marker:text-primary list-inside space-y-2 px-3 py-5 small-marker">
          <li>
            <span className="text-primary font-semibold">
              {data.classQuota}:
            </span>
            <span className="text-gray-800"> {data.quotaLeft}</span>
          </li>
          <li>
            <span className="text-primary font-semibold">
              {data.durationTitle}:
            </span>
            <span className="text-gray-800"> {data.durationTime}</span>
          </li>
          <li>
            <span className="text-primary font-semibold">{data.level}:</span>
            <span className="text-gray-800"> {data.levelDesc}</span>
          </li>
        </ul>

        <div className="flex w-full">
          {/* Image 1 */}
          {data.img1 && (
            <div className="p-4 rounded-lg">
              <img
                src={`https:${data.img1.fields?.file?.url}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Image 2 */}
          {data.img2 && (
            <div className="p-4">
              <img
                src={`https:${data.img2.fields?.file?.url}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="pt-4">
          <h4 className="text-primary font-playfair">{data.learnWhat}</h4>
        </div>

        <ul className="list-disc list-inside marker:text-primary space-y-2 px-3 py-4 small-marker">
          <li className="text-gray-800 font-montserrat">
            <span className="font-semibold">{data.fundamentalTitle}:</span>
            <span> {data.fundamentalDesc}</span>
          </li>
          <li className="text-gray-800 font-montserrat">
            <span className="font-semibold">{data.coreTitle}:</span>
            <span> {data.coreDesc}</span>
          </li>
          <li className="text-gray-800 font-montserrat">
            <span className="font-semibold">{data.breathingTitle}:</span>
            <span> {data.breathingDesc}</span>
          </li>
          <li className="text-gray-800 font-montserrat">
            <span className="font-semibold">{data.balanceTitle}:</span>
            <span> {data.balanceDesc}</span>
          </li>
        </ul>

        <div className="flex flex-col md:flex-row gap-8 py-8">
          <div>
            <h4 className="text-primary font-playfair mb-3">
              {data.whatToBring}
            </h4>
            <ul className="list-disc small-marker marker:text-primary list-inside space-y-2 text-gray-800 font-montserrat">
              <li>{data.point1}</li>
              <li>{data.point2}</li>
              <li>{data.point3}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-playfair text-primary mb-3">
              {data.classBenefits}
            </h4>
            <ul className="list-disc list-inside marker:text-primary small-marker space-y-2 text-gray-800 font-montserrat">
              <li>{data.classPoint1}</li>
              <li>{data.classPoint2}</li>
              <li>{data.classPoint3}</li>
              <li>{data.classPoint4}</li>
            </ul>
          </div>
        </div>
        <hr className="my-8 hidden md:block text-gray-600" />
        <div>
          <ul className="list-disc">
            <h4 className="font-playfair text-primary mb-3">
              {" "}
              {data.additionalInformation}
            </h4>
            <ul className="list-disc list-inside marker:text-primary small-marker space-y-2 text-gray-800 font-montserrat">
              <li>{data.additionalPoint1}</li>
              <li>{data.additionalPoint2}</li>
            </ul>
          </ul>
        </div>
      </div>

      <div>
        <div className="bg-primary hidden md:block py-5">
          <div className="max-w-fit mx-auto px-4 rounded-lg">
            <div className="flex flex-col gap-3">
              {/* Instructor Image */}
              {data.instructorImg && (
                <div>
                  <img
                    src={`https:${data.instructorImg.fields?.file?.url}`}
                    className="object-cover rounded-tl-full rounded-tr-full h-96 mx-auto"
                    alt="Instructor"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                {/* Instructor Name */}
                {data.instructorName && (
                  <h4 className="text-white text-center font-playfair">
                    {data.instructorName}
                  </h4>
                )}

                {/* Instructor Position */}
                {data.instructorPosition && (
                  <p className="text-white text-center">
                    {data.instructorPosition}
                  </p>
                )}
              </div>

              {/* Instructor Description */}
              {data.instructorDescription && (
                <p className="text-white text-center">
                  {data.instructorDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="bg-primary py-5">
          <div className="rounded-lg">
            <div className="flex flex-col gap-3">
              {/* Instructor Image */}
              {data.instructorImg && (
                <div>
                  <img
                    src={`https:${data.instructorImg.fields?.file?.url}`}
                    className="object-cover rounded-tl-full rounded-tr-full h-96 mx-auto"
                    alt="Instructor"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                {/* Instructor Name */}
                {data.instructorName && (
                  <h4 className="text-white text-center font-playfair">
                    {data.instructorName}
                  </h4>
                )}

                {/* Instructor Position */}
                {data.instructorPosition && (
                  <p className="text-white text-center">
                    {data.instructorPosition}
                  </p>
                )}
              </div>

              {/* Instructor Description */}
              {data.instructorDescription && (
                <p className="text-white text-center">
                  {data.instructorDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
