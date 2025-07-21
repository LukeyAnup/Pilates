// components/Footer.tsx
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
    <footer className="bg-secondary px-6 py-12">
      <div className="mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column (60%) */}
        <div className="w-full md:w-3/5 space-y-4">
          <h2 className="text-xl font-semibold">{data.footerHeading}</h2>
          <p className="text-sm">{data.footerDescription}</p>
          <p>{data.location}</p>
        </div>

        {/* Right Column (40%) */}
        <div className="w-full md:w-2/5 grid grid-cols-2 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-md font-semibold mb-4">{data.footerLinks1}</h3>
            <ul className="space-y-2 text-sm">
              <li>{data.about}</li>
              <li>{data.classes}</li>
              <li>{data.schedule}</li>
              <li>{data.pricing}</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-md font-semibold mb-4">{data.footerLinks2}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="font-medium">Location:</span> {data.location}
              </li>
              <li>
                <span className="font-medium">Email:</span> {data.footerEmail}
              </li>
              <li>
                <span className="font-medium">Phone:</span> {data.contactNumber}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 text-xs text-gray-500 text-center">
        <p>{`© ${new Date().getFullYear()} ${data.footerInfo}`}</p>
      </div>
    </footer>
  );
}
