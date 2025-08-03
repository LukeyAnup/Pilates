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

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  if (!data) return <div className="p-4 text-center">No data available</div>;

  return (
    <div className="container mx-auto space-y-4 grid grid-cols-3">
      <div className="col-span-2">
        {/* Tab Title */}
        {data.tabTitle && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="">{data.tabTitle}</h1>
          </div>
        )}

        {/* Class Title */}
        {data.classTitle && (
          <div>
            <h4 className="font-playfair text-primary">{data.classTitle}</h4>
          </div>
        )}

        {/* Class Description */}
        {data.classDesc && (
          <div>
            <p className="text-gray-700">{data.classDesc}</p>
          </div>
        )}

        <ul className="list-disc">
          <li>
            <span className="text-primary">{data.classQuota}:</span>
            <span> {data.quotaLeft}</span>
          </li>
          <li>
            <span className="text-primary">{data.durationTitle}:</span>
            <span> {data.durationTime}</span>
          </li>
          <li>
            <span className="text-primary">{data.level}:</span>
            <span> {data.levelDesc}</span>
          </li>
        </ul>

        <div className="flex w-full">
          {/* Image 1 */}
          {data.img1 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <img
                src={`https:${data.img1.fields?.file?.url}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Image 2 */}
          {data.img2 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <img
                src={`https:${data.img2.fields?.file?.url}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Learn What */}
        {data.learnWhat && (
          <div>
            <h4 className="text-primary font-playfair">{data.learnWhat}</h4>
          </div>
        )}

        <ul className="list-disc">
          <li>
            <span className="font-semibold font-montserrat">
              {" "}
              {data.fundamentalTitle}:
            </span>
            <span className="font-montserrat"> {data.fundamentalDesc}</span>
          </li>
          <li>
            <span className="font-semibold font-montserrat">
              {" "}
              {data.coreTitle}:
            </span>
            <span className="font-montserrat"> {data.coreDesc}</span>
          </li>
          <li>
            <span className="font-semibold font-montserrat">
              {" "}
              {data.breathingTitle}:
            </span>
            <span className="font-montserrat"> {data.breathingDesc}</span>
          </li>
          <li>
            <span className="font-semibold font-montserrat">
              {data.balanceTitle}:
            </span>
            <span className="font-montserrat"> {data.balanceDesc}</span>
          </li>
        </ul>

        <div className="flex gap-5">
          <ul className="list-disc">
            <h4 className="font-playfair text-primary"> {data.whatToBring}</h4>
            <li>
              <span>{data.point1}</span>
            </li>
            <li>
              <span>{data.point2}</span>
            </li>
            <li>
              <span>{data.point3}</span>
            </li>
          </ul>
          <ul className="list-disc">
            <h4 className="font-playfair text-primary">
              {" "}
              {data.classBenefits}
            </h4>
            <li>
              <span>{data.classPoint1}</span>
            </li>
            <li>
              <span>{data.classPoint2}</span>
            </li>
            <li>
              <span>{data.classPoint3}</span>
            </li>
            <li>
              <span>{data.classPoint4}</span>
            </li>
          </ul>
        </div>

        <div>
          <ul className="list-disc">
            <h4 className="font-playfair text-primary">
              {" "}
              {data.additionalInformation}
            </h4>
            <li>
              <span>{data.additionalPoint1}</span>
            </li>
            <li>
              <span>{data.additionalPoint2}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-primary">
        {data.instructorImg && (
          <div className=" p-4 rounded-lg">
            <img
              src={`https:${data.instructorImg.fields?.file?.url}`}
              className=" object-cover rounded-tl-full rounded-tr-full h-96  mx-auto"
            />
          </div>
        )}

        {/* Instructor Name */}
        {data.instructorName && (
          <h4 className="text-white text-center font-playfair">
            {data.instructorName}
          </h4>
        )}

        {/* Instructor Position */}
        {data.instructorPosition && (
          <p className="text-white text-center">{data.instructorPosition}</p>
        )}

        {/* Instructor Description */}
        {data.instructorDescription && (
          <p className="text-white text-center">{data.instructorDescription}</p>
        )}
      </div>
    </div>
  );
}
