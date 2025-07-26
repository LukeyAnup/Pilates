import {useEffect, useState} from "react";
import client from "../../contentfulClient";
import PricingHero from "./hero";
import type {PricingFields} from "./types";
import PricingCheckout from "./checkout";
import PricingOffers from "./offers";

const Pricing = () => {
  const [data, setData] = useState<PricingFields | null>(null);

  useEffect(() => {
    client
      .getEntries({content_type: "pricing"}) // use your actual content type ID
      .then((res) => {
        if (res.items.length > 0) {
          setData(res.items[0].fields);
        }
      });
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PricingHero data={data} />
      {/* Pricing Section */}
      <PricingCheckout data={data} />
      {/* Services Section */}
      <PricingOffers data={data} />
    </div>
  );
};

export default Pricing;
