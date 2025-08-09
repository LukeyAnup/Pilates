import { useEffect, useState } from "react";
import client from "../../contentfulClient";

// Define the fields for the CheckClasses content type
interface CheckClassesFields {
  title?: string;
  title1?: string;
  subTitle1?: string;
  title2?: string;
  subTitle2?: string;
  title3?: string;
  title4?: string;
  button?: string;
  image1?: any;
  image2?: any;
}

interface CheckClassesSkeleton {
  fields: CheckClassesFields;
  contentTypeId: "checkClasses";
}

function getImageUrl(imageField: any): string | undefined {
  // Contentful Asset fields have a structure like { fields: { file: { url: string } } }
  return imageField?.fields?.file?.url
    ? `https:${imageField.fields.file.url}`
    : undefined;
}

export default function CheckClasses() {
  const [fields, setFields] = useState<CheckClassesFields>({});

  useEffect(() => {
    async function fetchCheckClasses() {
      try {
        const res = await client.getEntries<CheckClassesSkeleton>({
          content_type: "checkClasses",
          limit: 1,
          include: 2, // Ensure linked assets are included
        });
        const entry = res.items[0];
        if (!entry) return;
        setFields(entry.fields || {});
      } catch (err) {
        console.error("Failed to fetch checkClasses:", err);
      }
    }
    fetchCheckClasses();
  }, []);

  const image1Url = getImageUrl(fields.image1);
  const image2Url = getImageUrl(fields.image2);

  return (
    <div className="md:max-w-4/5 px-6 md:px-0 mx-auto">
      <section className="bg-white hidden md:flex py-12 px-4 flex-col mt-12">
        {fields.title && (
          <div className="mb-8">
            <h2 className="mb-2 font-playfair text-primary">{fields.title}</h2>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
          <div className="relative">
            {image2Url && (
              <img
                src={image2Url}
                alt={fields.title1 || "Image 1"}
                className="mx-auto object-contain w-full h-auto"
              />
            )}
            {/* Brown overlay */}
            <div className="absolute inset-0 bg-[#637E6CCC]/80" />
            {(fields.title1 || fields.subTitle1) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                <h3 className="font-playfair">{fields.title1}</h3>
                <p className="text-base mt-2">{fields.subTitle1}</p>
              </div>
            )}
          </div>
          <div className="relative">
            <div className="flex">
              <div className="relative">
                {image1Url && (
                  <img
                    src={image1Url}
                    alt={fields.title2 || "Image 2"}
                    className="object-contain w-auto h-96"
                  />
                )}

                <div className="absolute inset-0 bg-[#637E6CCC]/80 w-full h-full" />

                {(fields.title2 || fields.subTitle2) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-white px-4 w-full h-full">
                    <h3 className="font-playfair">{fields.title2}</h3>
                    <p className="text-base mt-2">{fields.subTitle2}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-4">
              <h3 className="font-playfair text-primary mb-2">
                {fields.title3}
              </h3>

              {fields.button && (
                <button className="relative overflow-hidden px-20 py-2 text-primary border border-primary cursor-pointer transition-colors duration-300 group">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {fields.button}
                  </span>
                  <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile */}
      <section className="bg-white md:hidden flex flex-col items-center md:text-center py-10">
        {fields.title && (
          <div className="md:mb-8">
            <h3 className=" mb-2 font-playfair text-primary">{fields.title}</h3>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 w-full">
          {/* Image 1 block */}
          <div className="relative">
            {image1Url && (
              <img
                src={image1Url}
                alt={fields.title1 || "Image 1"}
                className="mx-auto object-contain w-full h-auto"
              />
            )}
            {/* Brown overlay */}
            <div className="absolute inset-0 bg-[#637E6CCC]/80" />
            {(fields.title1 || fields.subTitle1) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                <div className="text-[24px] font-playfair">{fields.title1}</div>
                <div className="font-montserrat mt-5 text-center">
                  {fields.subTitle1}
                </div>
              </div>
            )}
          </div>

          {/* Image 2 block */}
          <div className="relative">
            {image2Url && (
              <img
                src={image2Url}
                alt={fields.title2 || "Image 2"}
                className="mx-auto object-contain w-full h-auto"
              />
            )}
            <div className="absolute inset-0 bg-[#637E6CCC]/80" />
            {(fields.title2 || fields.subTitle2) && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
                <div className="text-[24px] font-playfair">{fields.title2}</div>
                <div className="mt-5 font-montserrat text-center">
                  {fields.subTitle2}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="md:mb-8 mb-3">
          <h2 className="text-2xl font-bold mb-2 text-primary">
            {fields.title3}
          </h2>
        </div>

        {/* Button */}
        {fields.button && (
          <button className="border boarder-[#637E6CCC] text-primary px-8 py-2 font-semibold">
            {fields.button}
          </button>
        )}
      </section>
    </div>
  );
}
