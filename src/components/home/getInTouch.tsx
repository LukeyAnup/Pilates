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
      {img && (
        <div>
          <img
            src={`https:${img.file.url}`}
            alt={img.title}
            className="w-full h-[300px] object-cover opacity-60"
          />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col space-y-4 items-center justify-center px-4">
        <h2 className="hidden md:block font-playfair text-primary">
          {data.heading}
        </h2>
        <p className="text-sm md:hidden font-bold text-primary drop-shadow">
          Want to join the Pilates Community?
        </p>
        <p className="max-w-2xl hidden md:block ">{data.description}</p>

        <button className="block md:hidden mx-auto px-20 py-2 text-primary cursor-pointer border">
          Contact Us
        </button>

        <button className="hidden md:block mx-auto px-20 py-2 text-primary cursor-pointer border">
          Get in touch
        </button>
      </div>

      <footer className="bg-primary text-white text-lg hidden md:block font-playfair tracking-[15px]">
        {data.getInTouchFooter}
      </footer>
    </section>
  );
}
