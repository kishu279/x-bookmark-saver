import FeaturesSection from "../Section/FeatureSection";
import HeroSection from "../Section/HeroSection";
import NavBar from "../Section/NavBar";

export default function LandingPage() {
  return (
    <section className="container mx-auto max-w-full flex flex-col ">
      {/* Nav Bar */}
      <NavBar />

      <div className="flex container mx-auto relative top-30 left-0 right-0 flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection/>
      </div>
    </section>
  );
}
