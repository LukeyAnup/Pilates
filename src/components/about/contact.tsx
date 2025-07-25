import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";
import phoneSvg from "../../assets/icons/phone.svg";
import emailSvg from "../../assets/icons/mail.svg";

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
    <section className="py-8 md:py-16 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Content Section */}
        <div className="flex flex-col w-full max-w-lg mx-auto lg:mx-0 lg:max-w-none lg:pr-8">
          {data.aboutHeading && (
            <h2 className="text-2xl sm:text-3xl font-semibold font-playfair text-primary mb-4">
              {data.aboutHeading}
            </h2>
          )}
          {data.aboutSubheading && (
            <p className="text-base sm:text-lg text-gray-700 font-montserrat leading-relaxed mb-6">
              {data.aboutSubheading}
            </p>
          )}

          {/* Simple Contact Form */}
          <form
            className="space-y-4 mb-6 w-full"
            onSubmit={(e) => {
              e.preventDefault(); /* handle submit here */
            }}
          >
            {/* Name Input */}
            <div className="relative w-full mb-6">
              <input
                type="text"
                id="name"
                name="name"
                required
                className="peer w-full border border-gray-300 px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:border-black"
                placeholder="Name"
              />
              <label
                htmlFor="name"
                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Name
              </label>
            </div>

            {/* Email Input */}
            <div className="relative w-full mb-6">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="peer w-full border border-gray-300 px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:border-black"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Email
              </label>
            </div>

            {/* Phone Input */}
            <div className="relative w-full mb-6">
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                className="peer w-full border border-gray-300 px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:border-black"
                placeholder="Phone"
              />
              <label
                htmlFor="phone"
                className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
              >
                Phone Number
              </label>
            </div>

            {/* Submit Button */}
            {data.button && (
              <a
                href="#"
                className="inline-block w-full sm:w-auto px-12 sm:px-20 py-2 mt-8 border border-primary font-medium hover:bg-[#6e8073] hover:text-white transition text-center"
              >
                {data.button}
              </a>
            )}
          </form>

          {/* Contact Information */}
          <div className="text-sm flex flex-col sm:flex-row gap-4 sm:gap-10 space-y-1 sm:space-y-0">
            <div className="flex gap-3">
              <img src={phoneSvg} alt="" />
              <div>
                <label className="font-medium text-primary uppercase">
                  Phone
                </label>
                {data.phoneNo && <p className="mt-1"> {data.phoneNo}</p>}
              </div>
            </div>
            <div className="flex gap-3">
              <img src={emailSvg} alt="" />

              <div>
                <label className="font-medium text-primary uppercase">
                  Email
                </label>
                {data.emailAddress && (
                  <p className="mt-1"> {data.emailAddress}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        {locationImgUrl && (
          <div className="relative w-full h-64 sm:h-80 lg:h-[400px] order-first lg:order-last">
            <img
              src={locationImgUrl}
              alt="Location"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
