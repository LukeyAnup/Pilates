import { useEffect, useState } from "react";
import client from "../contentfulClient";
import type { FooterSkeleton } from "../types/Footer";

export default function Footer() {
  const [data, setData] = useState<FooterSkeleton["fields"] | null>(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const entries = await client.getEntries<FooterSkeleton>({
          content_type: "footer", // Replace with your actual content type ID
        });

        if (entries.items.length > 0) {
          setData(entries.items[0].fields);
        }
      } catch (error) {
        console.error("Error fetching footer:", error);
      }
    };

    fetchFooter();
  }, []);

  if (!data) return null;

  return (
    <footer className="bg-secondary px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <div className="max-w-11/12 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column (60%) */}
          <div className="w-full hidden md:flex md:flex-col lg:w-3/5 space-y-3 sm:space-y-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
              {data.footerHeading}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed pr-0 lg:pr-8">
              {data.footerDescription}
            </p>
            <p className="text-sm sm:text-base font-medium">{data.location}</p>
          </div>

          {/* Right Column (40%) */}
          <div className="w-full lg:w-2/5">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Column 1 */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">
                  {data.footerLinks1}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="text-xs sm:text-sm lg:text-base hover:text-primary transition-colors cursor-pointer">
                    {data.about}
                  </li>
                  <li className="text-xs sm:text-sm lg:text-base hover:text-primary transition-colors cursor-pointer">
                    {data.classes}
                  </li>
                  <li className="text-xs sm:text-sm lg:text-base hover:text-primary transition-colors cursor-pointer">
                    {data.schedule}
                  </li>
                  <li className="text-xs sm:text-sm lg:text-base hover:text-primary transition-colors cursor-pointer">
                    {data.pricing}
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4">
                  {data.footerLinks2}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  <li className="text-xs sm:text-sm lg:text-base">
                    <span className="font-medium block sm:inline">Email:</span>
                    <span className="block sm:inline sm:ml-1">
                      {data.footerEmail}
                    </span>
                  </li>
                  <li className="text-xs sm:text-sm lg:text-base">
                    <span className="font-medium block sm:inline">Phone:</span>
                    <span className="block sm:inline sm:ml-1">
                      {data.contactNumber}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-gray-300 border-opacity-30">
          <div className="text-xs sm:text-sm text-gray-500 text-center">
            <p>{`© ${new Date().getFullYear()} ${data.footerInfo}`}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
