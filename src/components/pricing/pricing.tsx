import { useEffect, useState } from "react";
import client from "../../contentfulClient";

type PricingFields = {
  titleOne?: string;
  descOne?: string;
  photoOne?: any;
  titleTwo?: string;
  descTwo?: string;
  titleThreeImg?: any;
  titleThree?: string;
  groupClasses?: string;
  groupItem1?: string;
  groupPrice1?: string;
  groupItem2?: string;
  groupPrice2?: string;
  groupItem3?: string;
  groupPrice3?: string;
  personalClasses?: string;
  personalItem1?: string;
  personalPrice1?: string;
  personalItem2?: string;
  personalPrice2?: string;
  personalItem3?: string;
  personalPrice3?: string;
  extraPackage?: string;
  extraItem1?: string;
  extraPrice1?: string;
  extraItem2?: string;
  extraPrice2?: string;
  extraItem3?: string;
  extraPrice3?: string;
  title4?: string;
  subTitle1?: string;
  subTitleImg1?: any;
  title4des1?: string;
  subTitle2?: string;
  subTitleImg2?: any;
  title4des2?: string;
  subTitle3?: string;
  subTitleImg3?: any;
  title4des3?: string;
  button?: string;
};

const Pricing = () => {
  const [data, setData] = useState<PricingFields | null>(null);

  useEffect(() => {
    client
      .getEntries({ content_type: "pricing" }) // use your actual content type ID
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
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-semibold font-playfair text-primary">
          {data.titleOne}
        </h1>
        <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
          {data.descOne}
        </p>
        <img src={data.photoOne?.fields?.file?.url} alt="" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold font-playfair text-primary">
          {data.titleTwo}
        </h1>
        <p className="text-lg text-gray-700 font-montserrat leading-relaxed">
          {data.descTwo}
        </p>
      </div>
      {/* Pricing Section */}"
      <section className="py-20 px-6 bg-primary">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            {data.titleThree}
          </h1>

          <div className="grid md:grid-cols-4 gap-8">
            <img
              className="rounded-tl-full rounded-tr-full"
              src={data?.titleThreeImg?.fields?.file?.url}
              alt=""
            />
            {/* Group Classes */}
            <div className="bg-card h-fit">
              <div className="p-8 text-white">
                <h3 className="text-xl font-bold mb-6 text-center">
                  {data.groupClasses}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{data.groupItem1}</span>
                    <span>{data.groupPrice1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{data.groupItem2}</span>
                    <span>{data.groupPrice2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{data.groupItem3}</span>
                    <span>{data.groupPrice3}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal Classes */}
            <div className="bg-card  h-fit">
              <div className="p-8 text-white">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  {data.personalClasses}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{data.personalItem1}</span>
                    <span>{data.personalPrice1}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>{data.personalItem2}</span>
                    <span>{data.personalPrice2}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.personalItem3}
                    </span>
                    <span>{data.personalPrice3}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Package */}
            <div className="bg-card rounded-lg h-fit">
              <div className="p-8 text-white">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  {data.extraPackage}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{data.extraItem1}</span>
                    <span>{data.extraPrice1}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.extraItem2}
                    </span>
                    <span>{data.extraPrice2}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.extraItem3}
                    </span>
                    <span>{data.extraPrice3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-primary">{data.title4}</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: data.subTitle1,
                image: data.subTitleImg1?.fields?.file?.url,
                description: data.title4des1,
              },
              {
                title: data.subTitle2,
                image: data.subTitleImg2?.fields?.file?.url,
                description: data.title4des2,
              },
              {
                title: data.subTitle3,
                image: data.subTitleImg3?.fields?.file?.url,
                description: data.title4des3,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="py-6 px-2">
                  <h3 className="text-xl font-bold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="leading-relaxed mb-4">{service.description}</p>
                  <button className="inline-flex items-center justify-center border border-primary px-5 py-1.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                    {data.button}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
