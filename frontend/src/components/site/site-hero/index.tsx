import HeroImage from "@/assets/images/hero-image.png";

export default function SiteHero() {
  return (
    <section className="mx-4 pt-8 lg:mx-0 lg:pt-2 flex min-h-[45vh] items-center justify-between border-b">
      <div className="space-y-5 lg:w-1/2">
        <div className="text-2xl lg:text-5xl font-extrabold tracking-wider text-primary space-y-2">
          <h1>Hot. Fresh. </h1>
          <h1>At Your Door in No Time.</h1>
        </div>
        <p className="tracking-wider font-medium text-sm lg:text-lg pr-12 leading-6">
          Enjoy chef-crafted meals made with fresh ingredients, delivered fast to your door. Perfectly balanced flavor
          and convenience—no prep, no mess, just real food ready when you are.
        </p>
      </div>
      <div className="w-1/3 hidden lg:block">
        <img src={HeroImage} alt="hero-image" loading="lazy" className="animate-pulse" />
      </div>
    </section>
  );
}
