import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";
import phoneSvg from "../../assets/icons/phone.svg";
import emailSvg from "../../assets/icons/mail.svg";
import navImg from "../../assets/navImg.jpg";
import Loading from "../loading/loading";

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
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    }

    fetchAboutUs();
  }, []);

  if (loading) {
    return (
      <section className="relative overflow-hidden h-screen flex justify-center items-center">
        <Loading />
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="-mt-20">
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
          <h2 className="font-playfair text-white">Contact Us</h2>
          <p className="text-white px-2">
            Find the perfect class to match your fitness level and goals.
          </p>
        </div>
      </div>
      <div
        className="hidden md:block"
        style={{
          background: `linear-gradient(to right, white 0%, white 80%, var(--color-primary) 80%, var(--color-primary) 100%)`,
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10">
          {/* Content Section */}
          <div className="flex flex-col w-full max-w-lg mx-auto lg:mx-0 lg:max-w-none lg:pr-8">
            {data.aboutHeading && (
              <h2 className="font-playfair text-primary mb-4">
                {data.aboutHeading}
              </h2>
            )}
            {data.aboutSubheading && (
              <p className="font-montserrat mb-6">{data.aboutSubheading}</p>
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
                  className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600 font-montserrat"
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
                  className="absolute font-montserrat left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Phone Number
                </label>
              </div>

              {/* Submit Button */}
              {data.button && (
                <a
                  href="#"
                  className="inline-block w-full sm:w-auto px-12 sm:px-20 py-2 mt-8 border text-primary border-primary font-medium hover:bg-[#6e8073] hover:text-white transition text-center"
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
            <div>
              <div className="relative w-full h-64 sm:h-80 lg:h-[400px] order-first lg:order-last border-2 border-primary p-4">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9112822089314!2d85.33613571468798!3d27.720025361552075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1944e94d69ef%3A0xab6386f627d63cab!2sBody%20Love%20Pilates!5e0!3m2!1sen!2snp!4v1754841323048!5m2!1sen!2snp"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* //Mobile */}
      <div className="px-6 md:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-10">
          {/* Content Section */}
          <div className="flex flex-col w-full max-w-lg mx-auto lg:mx-0 lg:max-w-none lg:pr-8">
            {data.aboutHeading && (
              <h2 className="font-playfair text-primary mb-4">
                {data.aboutHeading}
              </h2>
            )}
            {data.aboutSubheading && (
              <p className="font-montserrat mb-6">{data.aboutSubheading}</p>
            )}

            {/* Image Section */}
            {locationImgUrl && (
              <div className="relative w-full h-64 sm:h-80 lg:h-[400px] lg:order-last border-2 border-primary p-4">
                <iframe
                  className="w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.9112822089314!2d85.33613571468798!3d27.720025361552075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1944e94d69ef%3A0xab6386f627d63cab!2sBody%20Love%20Pilates!5e0!3m2!1sen!2snp!4v1754841323048!5m2!1sen!2snp"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}

            {/* Simple Contact Form */}
            <form
              className="space-y-4 mb-6 mt-6 w-full"
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
                  className="absolute left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600 font-montserrat"
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
                  className="absolute font-montserrat left-3 top-2.5 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-600"
                >
                  Phone Number
                </label>
              </div>

              {/* Submit Button */}
              {data.button && (
                <a
                  href="#"
                  className="inline-block w-full sm:w-auto px-12 sm:px-20 py-2 mt-4 border text-primary border-primary font-medium hover:bg-[#6e8073] hover:text-white transition text-center"
                >
                  {data.button}
                </a>
              )}
            </form>

            {/* Contact Information */}
            <div className="text-sm flex gap-8 pt-6">
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
        </div>
      </div>
    </section>
  );
}
