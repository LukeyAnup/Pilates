import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";

type AboutUsFields = {
  aboutHeading?: string;
  aboutSubheading?: string;
  button?: string;
  phoneNo?: string;
  emailAddress?: string;
  locationImg?: Asset;
};

type AboutUsSkeleton = {
  fields: AboutUsFields;
  contentTypeId: "aboutUsPage";
};

export default function ContactUs() {
  const [data, setData] = useState<AboutUsFields | null>(null);
  const [locationImgUrl, setLocationImgUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutUs() {
      try {
        const res = await client.getEntries<AboutUsSkeleton>({
          content_type: "aboutUsPage",
        });

        const entry = res.items[0];
        if (!entry) {
          console.warn("No AboutUsPage entry found.");
          return;
        }

        const fields = entry.fields;
        setData(fields);

        const imgUrl = (fields.locationImg as Asset | undefined)?.fields?.file
          ?.url;
        if (imgUrl) setLocationImgUrl(`https:${imgUrl}`);
      } catch (err) {
        console.error("Failed to fetch About Us data:", err);
      }
    }

    fetchAboutUs();
  }, []);

  if (!data) return null;

  return (
    <section className="py-16 px-6 md:px-12">
      <div className="mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col mx-36">
          {data.aboutHeading && (
            <h2 className="text-3xl font-semibold font-playfair text-primary">
              {data.aboutHeading}
            </h2>
          )}
          {data.aboutSubheading && (
            <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
              {data.aboutSubheading}
            </p>
          )}

          {/* Simple Contact Form */}
          <form
            className="space-y-4 mb-6"
            onSubmit={(e) => {
              e.preventDefault(); /* handle submit here */
            }}
          >
            <div className="relative w-96 mb-6">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md placeholder-transparent focus:outline-none focus:border-black"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Name
              </label>
            </div>

            {/* Email */}
            <div className="relative w-96 mb-6">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md placeholder-transparent focus:outline-none focus:border-black"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Email
              </label>
            </div>

            {/* Phone */}
            <div className="relative w-96 mb-6">
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="peer w-full border border-gray-300 px-3 pt-5 pb-2 rounded-md placeholder-transparent focus:outline-none focus:border-black"
                placeholder="Phone"
              />
              <label
                htmlFor="phone"
                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Phone Number
              </label>
            </div>

            {data.button && (
              <a
                href="#"
                className="inline-block px-20 py-2 mt-8 border border-primary font-medium hover:bg-[#6e8073] hover:text-white transition"
              >
                {data.button}
              </a>
            )}
          </form>

          <div className="text-sm flex gap-10 space-y-1">
            <label>
              Phone
              {data.phoneNo && <p>📞 {data.phoneNo}</p>}
            </label>
            <label>
              Email{data.emailAddress && <p>📧 {data.emailAddress}</p>}
            </label>
          </div>
        </div>
        {locationImgUrl && (
          <div className="relative w-full h-80 md:h-[400px]">
            <img
              src={locationImgUrl}
              alt="Location"
              className="w-full h-full object-cover shadow-md"
            />
          </div>
        )}
      </div>
    </section>
  );
}
