// components/GetInTouch.tsx
import { useEffect, useState } from "react";
import client from "../../contentfulClient";
import type {
  GetInTouchFields,
  GetInTouchSkeleton,
} from "../../types/GetInTouch";

export default function GetInTouch() {
  const [data, setData] = useState<GetInTouchFields | null>(null);

  useEffect(() => {
    client
      .getEntries<GetInTouchSkeleton>({
        content_type: "getInTouch",
        limit: 1,
      })
      .then((res) => {
        const entry = res.items[0];
        setData(entry.fields);
      })
      .catch(console.error);
  }, []);

  if (!data) return <p>Loading...</p>;

  const img = data.getInTouchImg?.fields as {
    file: {
      url: string;
    };
    title: string;
  };

  return (
    <section className="relative text-center">
      <div
        style={{ backgroundImage: `url(${img.file.url})` }}
        className="w-full h-[300px] object-cover opacity-80"
      />

      <div className="absolute inset-0 flex flex-col space-y-4 items-center justify-center px-4">
        <h2 className="hidden md:block font-playfair text-primary">
          {data.heading}
        </h2>
        <div className="md:hidden text-white text-2xl font-bold font-playfair">
          Want to join the Pilates Community?
        </div>
        <p className="max-w-2xl hidden md:block ">{data.description}</p>

        <button className="relative md:hidden overflow-hidden px-20 py-2 border border-white cursor-pointer group">
          {/* Sliding background */}
          <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />

          {/* Text content above background */}
          <p className="relative z-10 font-montserrat text-white transition-colors duration-300 group-hover:text-white">
            Contact us
          </p>
        </button>

        <button className="relative hidden md:block overflow-hidden px-20 py-2 border border-primary cursor-pointer group">
          {/* Sliding background */}
          <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />

          {/* Text content above background */}
          <p className="relative z-10 font-montserrat text-primary transition-colors duration-300 group-hover:text-white">
            Get in Touch
          </p>
        </button>
      </div>

      <footer className="bg-primary text-white text-lg hidden md:block font-playfair tracking-[15px]">
        {data.getInTouchFooter}
      </footer>
    </section>
  );
}
