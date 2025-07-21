import { useEffect, useState } from "react";
import type { Asset } from "contentful";
import client from "../../contentfulClient";

type HeroFields = {
  heroImg?: Asset;
  heroLogo?: Asset;
};
type HeroSectionSkeleton = {
  fields: HeroFields;
  contentTypeId: "heroSection";
};

export default function Hero() {
  const [heroUrl, setHeroUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHeroSection() {
      try {
        const res = await client.getEntries<HeroSectionSkeleton>({
          content_type: "heroSection",
        });

        const hero = res.items[0];
        if (!hero) {
          console.warn("No hero entry found.");
          return;
        }

        const fields = hero.fields as HeroFields;
        const bgUrl = fields.heroImg?.fields?.file?.url;
        const logoImgUrl = fields.heroLogo?.fields?.file?.url;

        if (bgUrl) setHeroUrl(`https:${bgUrl}`);
        if (logoImgUrl) setLogoUrl(`https:${logoImgUrl}`);
      } catch (err) {
        console.error("Failed to fetch hero:", err);
      }
    }

    fetchHeroSection();
  }, []);

  return (
    <section className="relative overflow-hidden h-screen">
      {heroUrl && (
        <img
          src={heroUrl}
          alt="Hero Background"
          className="absolute inset-0 w-full h-screen object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[#6B4C3B]/40 "></div>
      {logoUrl && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={logoUrl} alt="Logo" className="h-auto w-auto " />
        </div>
      )}
    </section>
  );
}
