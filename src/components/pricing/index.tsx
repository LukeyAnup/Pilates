import { useEffect, useState } from "react";
import client from "../../contentfulClient";
import PricingHero from "./hero";
import type { PricingFields } from "./types";
import PricingCheckout from "./checkout";
import PricingOffers from "./offers";
import Loading from "../loading/loading";

const Pricing = () => {
  const [data, setData] = useState<PricingFields | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .getEntries({ content_type: "pricing" })
      .then((res) => {
        if (res.items.length > 0) {
          setData(res.items[0].fields);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {data && <PricingHero data={data} />}
      {/* Pricing Section */}
      {data && <PricingCheckout data={data} />}
      {/* Services Section */}
      {data && <PricingOffers data={data} />}
    </div>
  );
};

export default Pricing;
