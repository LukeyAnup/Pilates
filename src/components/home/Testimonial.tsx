import { useEffect, useState } from "react";
import client from "../../contentfulClient";

// Define the fields for the Testimonial content type
interface TestimonialFields {
  heading?: string;
  subHeading?: string;
  reviewerName?: string;
}

interface TestimonialSkeleton {
  fields: TestimonialFields;
  contentTypeId: "testimonial";
}

export default function Testimonial() {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  useEffect(() => {
    async function fetchTestimonial() {
      try {
        const res = await client.getEntries<TestimonialSkeleton>({
          content_type: "testimonial",
          limit: 1,
        });
        const testimonial = res.items[0];

        if (!testimonial) return;
        setHeading(testimonial.fields.heading || "");
        setSubHeading(testimonial.fields.subHeading || "");
        setReviewerName(testimonial.fields.reviewerName || "");
      } catch (err) {
        console.error("Failed to fetch testimonial:", err);
      }
    }
    fetchTestimonial();
  }, []);

  return (
    <section className="relative py-46 px-4 flex flex-col items-center text-center justify-center rounded-lg  mx-auto mt-12 bg-[#F8F7F3]">
      <h2 className="text-3xl font-bold mb-4 ">{heading}</h2>
      <p className="text-lg mb-6">{subHeading}</p>
      <div className="mt-4">
        <span className="font-semibold text-primary">- {reviewerName}</span>
      </div>

      <div className="absolute flex flex-col gap-5">
        <div className="flex gap-5">
          <div className=" bg-[#8294880D] rounded-tr-[110px] rounded-bl-[110px] p-32"></div>
          <div className="bg-[#8294880D] rounded-tl-[110px] rounded-br-[110px] p-32"></div>
        </div>
        <div className="flex gap-5">
          <div className="bg-[#8294880D] rounded-tl-[110px] rounded-br-[110px] p-32"></div>
          <div className="bg-[#8294880D] rounded-tr-[110px] rounded-bl-[110px] p-32"></div>
        </div>
      </div>
    </section>
  );
}
