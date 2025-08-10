import type { PricingFields } from "./types";

const PricingOffers = ({ data }: { data: PricingFields }) => {
  return (
    <section className="py-20 md:py-0 md:px-6">
      <div className="md:max-w-4/5 px-6 md:px-0 mx-auto">
        <h3 className="font-playfair text-primary pb-5 text-4xl uppercase">
          {data.title4}
        </h3>

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
                <h3 className="text-xl font-semibold leading-7 text-primary mb-3 font-montserrat">
                  {service.title}
                </h3>
                <p className="mb-4 font-montserrat text-text-tertiary text-base tracking-normal leading-7">
                  {service.description}
                </p>
                <button className="relative overflow-hidden px-20 py-2 border border-primary cursor-pointer group">
                  {/* Sliding background */}
                  <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 group-hover:w-full" />

                  {/* Text content above background */}
                  <p className="relative z-10 font-montserrat text-primary transition-colors duration-300 group-hover:text-white">
                    {data.button}
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingOffers;
