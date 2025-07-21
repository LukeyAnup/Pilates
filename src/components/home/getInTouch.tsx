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
    <section className="relative bg-gray-50 my-6 text-center">
      {img && (
        <img
          src={`https:${img.file.url}`}
          alt={img.title}
          className="w-full h-[20vh] object-cover opacity-90"
        />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <p className="text-3xl hidden md:block font-bold text-white drop-shadow">
          {data.heading}
        </p>
        <p className="text-sm md:hidden font-bold text-primary drop-shadow">
          Want to join the Pilates Community?
        </p>
        <p className="max-w-2xl hidden md:block text-white mt-4 drop-shadow">
          {data.description}
        </p>
      </div>

      <footer className="bg-primary text-white text-lg mt-6 hidden md:block">
        {data.getInTouchFooter}
      </footer>
    </section>
  );
}
