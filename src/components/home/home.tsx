import About from "./about";
import CheckClasses from "./CheckClasses";
import GetGlimpse from "./getGlimpse";
import GetInTouch from "./getInTouch";
import Hero from "./hero";
import JoinOurClass from "./joinOurClass";
import WhyChooseUs from "./whyChooseUs";

const Home = () => (
  <div className="-mt-20">
    <Hero />
    <About />
    <WhyChooseUs />
    <JoinOurClass />
    <GetInTouch />
    {/* <Testimonial /> */}
    <CheckClasses />
    <GetGlimpse />
  </div>
);

export default Home;
