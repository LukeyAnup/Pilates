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
  title4Des1?: string;
  subTitle2?: string;
  subTitleImg2?: any;
  title4Des2?: string;
  subTitle3?: string;
  subTitleImg3?: any;
  title4Des3?: string;
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
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${data.photoOne?.fields?.file?.url})`,
          }}
        />
        <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {data.titleOne}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {data.descOne}
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {data.titleTwo}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {data.descTwo}
              </p>

              {/* Schedule Table */}
              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  <div>Monday</div>
                  <div>Tuesday</div>
                  <div>Wednesday</div>
                  <div>Thursday</div>
                  <div>Friday</div>
                </div>
                <hr className="border-border" />
                <div className="space-y-3">
                  {[
                    {
                      time: "09:00 AM - 10:00 AM",
                      classes: [
                        "REFORMER",
                        "BEGINNERS",
                        "BEGINNERS",
                        "BEGINNERS",
                        "BARRE",
                      ],
                    },
                    {
                      time: "11:00 AM - 12:00 PM",
                      classes: [
                        "REFORMER",
                        "BEGINNERS",
                        "REFORMER",
                        "VINYAKHOT PILATES",
                        "BARRE",
                      ],
                    },
                    {
                      time: "01:00 PM - 02:00 PM",
                      classes: [
                        "REFORMER",
                        "BEGINNERS",
                        "BEGINNERS",
                        "BEGINNERS",
                        "BARRE",
                      ],
                    },
                    {
                      time: "03:00 PM - 04:00 PM",
                      classes: [
                        "VINYAKHOT PILATES",
                        "BEGINNERS",
                        "REFORMER",
                        "VINYAKHOT PILATES",
                        "BARRE",
                      ],
                    },
                  ].map((row, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-6 gap-4 text-sm items-center"
                    >
                      <div className="text-muted-foreground font-medium">
                        {row.time}
                      </div>
                      {row.classes.map((className, i) => (
                        <div key={i} className="text-foreground">
                          {className}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Group fitness class"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            {data.titleThree}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Group Classes */}
            <div className="bg-card border border-border rounded-lg shadow-sm h-fit">
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  {data.groupClasses}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.groupItem1}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.groupPrice1}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.groupItem2}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.groupPrice2}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.groupItem3}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.groupPrice3}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal Classes */}
            <div className="bg-card border border-border rounded-lg shadow-sm h-fit">
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  {data.personalClasses}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.personalItem1}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.personalPrice1}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.personalItem2}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.personalPrice2}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.personalItem3}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.personalPrice3}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Extra Package */}
            <div className="bg-card border border-border rounded-lg shadow-sm h-fit">
              <div className="p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  {data.extraPackage}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.extraItem1}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.extraPrice1}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.extraItem2}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.extraPrice2}
                    </span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      {data.extraItem3}
                    </span>
                    <span className="font-semibold text-foreground">
                      {data.extraPrice3}
                    </span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
            {data.title4}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: data.subTitle1,
                image: data.subTitleImg1?.fields?.file?.url,
                description: data.title4Des1,
              },
              {
                title: data.subTitle2,
                image: data.subTitleImg2?.fields?.file?.url,
                description: data.title4Des2,
              },
              {
                title: data.subTitle3,
                image: data.subTitleImg3?.fields?.file?.url,
                description: data.title4Des3,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-video bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
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
